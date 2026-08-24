const { Client } = require("@notionhq/client");
const { execFileSync } = require("child_process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const applyChanges = process.argv.includes("--apply");
const repo = process.env.GITHUB_REPOSITORY || "cjiyun/Algorithm";
const COMMIT_TABLE_HEADER = ["날짜", "커밋 번호", "실행 시간", "메모리", "언어"];

const DATA_SOURCE_IDS = {
  programmers: process.env.NOTION_PROGRAMMERS_DATA_SOURCE_ID,
  swea: process.env.NOTION_SWEA_DATA_SOURCE_ID,
  baekjoon: process.env.NOTION_BAEKJOON_DATA_SOURCE_ID,
};

const apiCallCounts = {
  query: 0,
  update: 0,
};

function getPropertyText(property) {
  const value = property?.title || property?.rich_text;

  return value
    ?.map(item => item.plain_text || item.text?.content || "")
    .join("")
    .trim() || "";
}

function getDate(page) {
  return page.properties?.날짜?.date?.start || "";
}

function hasPropertyValue(property) {
  return Boolean(
    property?.url ||
      property?.date?.start ||
      getPropertyText(property),
  );
}

function getProblemKey(page) {
  const problemNumber = getPropertyText(page.properties?.["문제 번호"]);
  return problemNumber || "";
}

function getCompletenessScore(page) {
  return [
    "날짜",
    "문제 폴더",
  ].filter(propertyName => {
    const property = page.properties?.[propertyName];
    return hasPropertyValue(property);
  }).length;
}

async function getPages(dataSourceId) {
  const pages = [];
  let startCursor;

  do {
    apiCallCounts.query += 1;

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    });

    pages.push(...response.results);
    startCursor = response.has_more ? response.next_cursor : null;
  } while (startCursor);

  return pages;
}

function chooseCanonicalPage(pages) {
  return [...pages].sort((left, right) => {
    const scoreDifference =
      getCompletenessScore(right) - getCompletenessScore(left);

    if (scoreDifference !== 0) return scoreDifference;

    return getDate(right).localeCompare(getDate(left));
  })[0];
}

function getMergedProperties(canonicalPage, pages, latestCommit) {
  const properties = {};
  if (!hasPropertyValue(canonicalPage.properties?.["문제 폴더"])) {
    const sourcePage = pages.find(page =>
      hasPropertyValue(page.properties?.["문제 폴더"]),
    );
    if (sourcePage) properties["문제 폴더"] = sourcePage.properties["문제 폴더"];
  }

  if (
    !canonicalPage.properties?.["복습 필요"]?.checkbox &&
    pages.some(page => page.properties?.["복습 필요"]?.checkbox)
  ) {
    properties["복습 필요"] = { checkbox: true };
  }
  if (latestCommit?.[0] && getDate(canonicalPage) !== latestCommit[0]) {
    properties.날짜 = { date: { start: latestCommit[0] } };
  }
  if (
    latestCommit?.[4] &&
    canonicalPage.properties?.언어?.select?.name !== latestCommit[4]
  ) {
    properties.언어 = { select: { name: latestCommit[4] } };
  }

  return properties;
}

async function updatePage(pageId, properties) {
  apiCallCounts.update += 1;

  return notion.pages.update({
    page_id: pageId,
    properties,
  });
}

function createTableCell(content = "") {
  return [{ type: "text", text: { content: String(content || "") } }];
}

function createCommitCell(sha) {
  return [{
    type: "text",
    text: {
      content: sha.slice(0, 7),
      link: { url: `https://github.com/${repo}/commit/${sha}` },
    },
  }];
}

function getCellText(cell = []) {
  return cell.map(text => text.plain_text || text.text?.content || "").join("");
}

function getCommitSha(cell = []) {
  const url = cell[0]?.href || cell[0]?.text?.link?.url || "";
  return url.split("/commit/")[1] || getCellText(cell);
}

function createCommitRow(values, linkCommit = true) {
  return {
    object: "block",
    type: "table_row",
    table_row: {
      cells: values.map((value, index) =>
        index === 1 && linkCommit
          ? createCommitCell(value)
          : createTableCell(value),
      ),
    },
  };
}

async function getAllChildren(blockId) {
  const blocks = [];
  let startCursor;

  do {
    apiCallCounts.query += 1;
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    });
    blocks.push(...response.results);
    startCursor = response.has_more ? response.next_cursor : null;
  } while (startCursor);

  return blocks;
}

async function readPageContent(page) {
  const blocks = await getAllChildren(page.id);
  const commitTables = [];
  const commitValues = [];
  const childrenByBlockId = new Map();

  for (const block of blocks.filter(block => block.type === "table")) {
    const rows = await getAllChildren(block.id);
    childrenByBlockId.set(block.id, rows);
    const header = rows[0]?.table_row?.cells?.map(getCellText);
    if (JSON.stringify(header) !== JSON.stringify(COMMIT_TABLE_HEADER)) continue;

    commitTables.push(block);
    commitValues.push(...rows.slice(1).map(row =>
      row.table_row.cells.map((cell, index) =>
        index === 1 ? getCommitSha(cell) : getCellText(cell),
      ),
    ));
  }

  const commitTableIds = new Set(commitTables.map(table => table.id));
  const userBlocks = blocks.filter(block => !commitTableIds.has(block.id));
  const userBlockTrees = [];
  for (const block of userBlocks) {
    userBlockTrees.push(await readBlockTree(block, childrenByBlockId));
  }

  return {
    page,
    commitTables,
    commitValues,
    userBlockTrees,
  };
}

const READ_ONLY_KEYS = new Set([
  "plain_text",
  "href",
]);
const UNCOPYABLE_BLOCK_TYPES = new Set([
  "child_page",
  "child_database",
  "column_list",
  "column",
  "link_preview",
  "meeting_notes",
  "synced_block",
  "unsupported",
]);

function sanitizeBlockValue(value) {
  if (Array.isArray(value)) return value.map(sanitizeBlockValue);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !READ_ONLY_KEYS.has(key))
      .map(([key, child]) => [key, sanitizeBlockValue(child)]),
  );
}

function createBlockPayload(block) {
  if (UNCOPYABLE_BLOCK_TYPES.has(block.type)) {
    throw new Error(`복제할 수 없는 본문 블록: ${block.type}`);
  }
  if (
    ["image", "video", "pdf", "file", "audio"].includes(block.type) &&
    block[block.type]?.type === "file"
  ) {
    throw new Error(`Notion 내부 파일 블록은 복제할 수 없습니다: ${block.type}`);
  }

  return {
    object: "block",
    type: block.type,
    [block.type]: sanitizeBlockValue(block[block.type]),
  };
}

async function readBlockTree(block, childrenByBlockId) {
  createBlockPayload(block);
  const children = block.has_children
    ? childrenByBlockId.get(block.id) || await getAllChildren(block.id)
    : [];
  const childTrees = [];
  for (const child of children) {
    childTrees.push(await readBlockTree(child, childrenByBlockId));
  }
  return { block, children: childTrees };
}

async function copyBlock(parentId, tree) {
  const payload = createBlockPayload(tree.block);

  if (tree.block.type === "table") {
    payload.table.children = tree.children.map(child =>
      createBlockPayload(child.block),
    );
  }

  apiCallCounts.update += 1;
  const response = await notion.blocks.children.append({
    block_id: parentId,
    children: [payload],
  });
  const copiedBlock = response.results[0];

  if (tree.block.type !== "table") {
    for (const child of tree.children) {
      await copyBlock(copiedBlock.id, child);
    }
  }
}

async function replaceCommitTable(pageId, oldTables, values) {
  if (values.length === 0) return;

  apiCallCounts.update += 1;
  await notion.blocks.children.append({
    block_id: pageId,
    position: { type: "start" },
    children: [{
      object: "block",
      type: "table",
      table: {
        table_width: 5,
        has_column_header: true,
        has_row_header: false,
        children: [
          createCommitRow(COMMIT_TABLE_HEADER, false),
          ...values.map(createCommitRow),
        ],
      },
    }],
  });

  for (const table of oldTables) {
    apiCallCounts.update += 1;
    await notion.blocks.delete({ block_id: table.id });
  }
}

function mergeCommitValues(snapshots) {
  const commits = new Map();

  for (const value of snapshots.flatMap(snapshot => snapshot.commitValues)) {
    const key = value[1]?.slice(0, 7);
    if (!key) continue;
    if (!commits.has(key) || value[1].length > commits.get(key)[1].length) {
      commits.set(key, value);
    }
  }

  const timestamps = new Map();
  for (const value of commits.values()) {
    if (!/^[0-9a-f]{7,40}$/i.test(value[1])) {
      timestamps.set(value[1], value[0]);
      continue;
    }
    try {
      timestamps.set(
        value[1],
        execFileSync("git", ["show", "-s", "--format=%cI", value[1]], {
          encoding: "utf8",
        }).trim(),
      );
    } catch {
      timestamps.set(value[1], value[0]);
    }
  }

  return [...commits.values()].sort((left, right) =>
    timestamps.get(right[1]).localeCompare(timestamps.get(left[1])),
  );
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN이 설정되지 않았습니다.");
  }

  const dataSources = Object.entries(DATA_SOURCE_IDS).filter(
    ([, dataSourceId]) => dataSourceId,
  );

  for (const [platform, dataSourceId] of dataSources) {
    const pages = await getPages(dataSourceId);
    const groups = new Map();

    for (const page of pages) {
      const problemKey = getProblemKey(page);
      if (!problemKey) continue;

      if (!groups.has(problemKey)) groups.set(problemKey, []);
      groups.get(problemKey).push(page);
    }

    for (const [problemKey, duplicatePages] of groups) {
      if (duplicatePages.length < 2) continue;

      const canonicalPage = chooseCanonicalPage(duplicatePages);
      const pagesToArchive = duplicatePages.filter(
        page => page.id !== canonicalPage.id,
      );

      console.log(
        `[${platform}] ${problemKey}: ${duplicatePages.length}개 -> 대표 1개, ` +
          `정리 ${pagesToArchive.length}개`,
      );

      if (!applyChanges) continue;

      const orderedPages = [canonicalPage, ...pagesToArchive];
      const snapshots = [];
      for (const page of orderedPages) {
        snapshots.push(await readPageContent(page));
      }
      const commitValues = mergeCommitValues(snapshots);
      const canonicalSnapshot = snapshots[0];

      for (const snapshot of snapshots.slice(1)) {
        for (const tree of snapshot.userBlockTrees) {
          await copyBlock(canonicalPage.id, tree);
        }
      }

      await replaceCommitTable(
        canonicalPage.id,
        canonicalSnapshot.commitTables,
        commitValues,
      );

      const properties = getMergedProperties(
        canonicalPage,
        duplicatePages,
        commitValues[0],
      );

      if (Object.keys(properties).length > 0) {
        await updatePage(canonicalPage.id, properties);
      }

      for (const page of pagesToArchive) {
        apiCallCounts.update += 1;
        await notion.pages.update({
          page_id: page.id,
          archived: true,
        });
      }
    }
  }

  console.log(applyChanges ? "중복 페이지 정리 완료" : "미리보기 완료");
  console.log(
    `Notion API 호출: 조회 ${apiCallCounts.query}회, ` +
      `수정 ${apiCallCounts.update}회, ` +
      `총 ${apiCallCounts.query + apiCallCounts.update}회`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
