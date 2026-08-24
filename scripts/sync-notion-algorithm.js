const { Client } = require("@notionhq/client");
const { execSync } = require("child_process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
const branch = process.env.GITHUB_REF_NAME || "main";

const DATA_SOURCE_IDS = {
  programmers: process.env.NOTION_PROGRAMMERS_DATA_SOURCE_ID,
  swea: process.env.NOTION_SWEA_DATA_SOURCE_ID,
  baekjoon: process.env.NOTION_BAEKJOON_DATA_SOURCE_ID,
};

function run(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

function normalizeSpaces(text = "") {
  return text
    .replace(/[\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function encodePath(filePath) {
  return filePath
    .split("/")
    .map(part => encodeURIComponent(part))
    .join("/");
}

function getCommitMessage() {
  return run(`git show -s --format=%B ${sha}`);
}

function getCommitDate() {
  return run(`git show -s --format=%cI ${sha}`).slice(0, 10);
}

function getChangedFiles() {
  const output = run(
    `git diff-tree --root --no-commit-id --name-only -r -z ${sha}`,
  );

  if (!output) return [];

  return output.split("\0").filter(Boolean);
}

function getSolutionFileAtCommit(commitSha, problemDir, changedFiles = []) {
  const changedSolution = changedFiles.find(isSolutionFile);
  if (changedSolution) return changedSolution;

  const files = run(
    `git -c core.quotePath=false ls-tree -rz --name-only ` +
      `${commitSha} -- "${problemDir}"`,
  ).split("\0").filter(Boolean).filter(isSolutionFile);

  return files.sort((left, right) => {
    const leftDate = run(`git log -1 --format=%cI ${commitSha} -- "${left}"`);
    const rightDate = run(`git log -1 --format=%cI ${commitSha} -- "${right}"`);
    return rightDate.localeCompare(leftDate);
  })[0] || "";
}

function parseCommitMessage(message) {
  const programmersRegex =
    /^\[level\s*(\d+)\]\s*Title:\s*(.*?),\s*Time:\s*(.*?),\s*Memory:\s*(.*?)\s*-BaekjoonHub/i;

  const programmersMatch = message.match(programmersRegex);

  if (programmersMatch) {
    return {
      difficulty: `Lv.${programmersMatch[1]}`,
      title: normalizeSpaces(programmersMatch[2]),
      time: programmersMatch[3].trim(),
      memory: programmersMatch[4].trim(),
    };
  }

  const metadataMatch = message.match(
    /Title:\s*(.*?),\s*Time:\s*(.*?),\s*Memory:\s*(.*?)\s*-BaekjoonHub/i,
  );

  if (metadataMatch) {
    return {
      difficulty: "",
      title: normalizeSpaces(metadataMatch[1]),
      time: normalizeSpaces(metadataMatch[2]),
      memory: normalizeSpaces(metadataMatch[3]),
    };
  }

  const titleMatch = message.match(/Title:\s*(.*?)(?:,|$)/i);

  return {
    difficulty: "",
    title: titleMatch
      ? normalizeSpaces(titleMatch[1])
      : "",
    time: "",
    memory: "",
  };
}

function detectPlatform(rawPlatform) {
  const platform = normalizeSpaces(rawPlatform).toLowerCase();

  if (
    rawPlatform === "프로그래머스" ||
    platform.includes("programmers")
  ) {
    return {
      key: "programmers",
      name: "프로그래머스",
    };
  }

  if (rawPlatform === "SWEA" || platform === "swea") {
    return {
      key: "swea",
      name: "SWEA",
    };
  }

  if (
    rawPlatform === "백준" ||
    platform.includes("baekjoon")
  ) {
    return {
      key: "baekjoon",
      name: "백준",
    };
  }

  return {
    key: "",
    name: rawPlatform,
  };
}

function parseProblemFolder(problemFolder) {
  const normalized = normalizeSpaces(problemFolder);
  const match = normalized.match(/^(\d+)\.\s*(.+)$/);

  if (!match) {
    return {
      problemNumber: "",
      title: normalized,
    };
  }

  return {
    problemNumber: match[1],
    title: match[2],
  };
}

function getLanguage(filePath = "") {
  const ext = filePath.split(".").pop().toLowerCase();

  const languageMap = {
    js: "JavaScript",
    mjs: "JavaScript",
    cjs: "JavaScript",
    ts: "TypeScript",
    py: "Python",
    java: "Java",
    cpp: "C++",
    cc: "C++",
    cxx: "C++",
    c: "C",
    kt: "Kotlin",
    swift: "Swift",
    sql: "SQL",
  };

  return languageMap[ext] || ext || "Unknown";
}

function isReadme(filePath) {
  return filePath.toLowerCase().endsWith("readme.md");
}

function isSolutionFile(filePath) {
  if (!filePath || isReadme(filePath)) return false;

  const ext = filePath.split(".").pop().toLowerCase();

  return [
    "js",
    "mjs",
    "cjs",
    "ts",
    "py",
    "java",
    "cpp",
    "cc",
    "cxx",
    "c",
    "kt",
    "swift",
    "sql",
  ].includes(ext);
}

function parseFilePath(filePath, allChangedFiles) {
  const parts = filePath.split("/");

  const rawPlatform = parts[0];
  const rawDifficulty = parts[1];
  const problemFolder = parts[2];

  const platform = detectPlatform(rawPlatform);

  if (
    !rawPlatform ||
    !rawDifficulty ||
    !problemFolder ||
    !platform.key
  ) {
    return null;
  }

  const { problemNumber, title } =
    parseProblemFolder(problemFolder);

  const problemDir =
    `${rawPlatform}/${rawDifficulty}/${problemFolder}/`;

  const solutionFile =
    allChangedFiles.find(
      file =>
        file.startsWith(problemDir) &&
        isSolutionFile(file),
    ) || "";

  let difficulty = normalizeSpaces(rawDifficulty);

  if (platform.key === "programmers") {
    difficulty = `Lv.${difficulty}`;
  }

  return {
    platformKey: platform.key,
    platformName: platform.name,
    difficulty,
    problemNumber,
    title,
    problemDir: problemDir.replace(/\/$/, ""),
    solutionFile,
  };
}

function githubTreeUrl(dirPath) {
  if (!dirPath) return null;

  return `https://github.com/${repo}/tree/${branch}/${encodePath(dirPath)}`;
}

function getDataSourceId(platformKey) {
  return DATA_SOURCE_IDS[platformKey] || null;
}

function createRichText(content = "") {
  return {
    rich_text: [
      {
        text: {
          content: String(content || ""),
        },
      },
    ],
  };
}

function createTitle(content = "") {
  return {
    title: [
      {
        text: {
          content: String(content || "알고리즘 문제"),
        },
      },
    ],
  };
}

function createSelect(name = "") {
  if (!name) return null;

  return {
    select: {
      name,
    },
  };
}

function createUrl(url) {
  return {
    url: url || null,
  };
}

const LEGACY_COMMIT_TABLE_HEADER = ["날짜", "커밋 번호", "실행 시간", "메모리"];
const COMMIT_TABLE_HEADER = [...LEGACY_COMMIT_TABLE_HEADER, "언어"];

function buildProperties(info, commitInfo) {
  const title =
    commitInfo.title ||
    info.title ||
    "알고리즘 문제";

  const difficulty =
    commitInfo.difficulty ||
    info.difficulty ||
    "";

  const language = commitInfo.language || getLanguage(info.solutionFile);

  const properties = {
    문제명: createTitle(title),
    날짜: { date: { start: commitInfo.date } },
    난이도: createSelect(difficulty),
    "문제 번호": createRichText(info.problemNumber),
    언어: createSelect(language),
    "문제 폴더": createUrl(githubTreeUrl(info.problemDir)),
    "복습 필요": {
      checkbox: false,
    },
  };

  Object.keys(properties).forEach(key => {
    if (properties[key] === null) {
      delete properties[key];
    }
  });

  return properties;
}

async function findExistingPage(
  dataSourceId,
  problemNumber,
  title,
) {
  if (problemNumber) {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "문제 번호",
        rich_text: {
          equals: problemNumber,
        },
      },
    });
    return response.results[0] || null;
  }

  if (!title) return null;

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "문제명",
      title: {
        equals: title,
      },
    },
  });

  return response.results[0] || null;
}

function groupByProblem(changedFiles) {
  const algorithmFiles = changedFiles.filter(file => {
    return (
      file.startsWith("프로그래머스/") ||
      file.startsWith("SWEA/") ||
      file.startsWith("swea/") ||
      file.startsWith("백준/") ||
      file.toLowerCase().startsWith("baekjoon/")
    );
  });

  const groups = new Map();

  for (const file of algorithmFiles) {
    const parts = file.split("/");

    if (parts.length < 3) continue;

    const key = parts.slice(0, 3).join("/");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(file);
  }

  return Array.from(groups.values());
}

async function createNotionPage(dataSourceId, properties) {
  return notion.pages.create({
    parent: {
      type: "data_source_id",
      data_source_id: dataSourceId,
    },
    properties,
  });
}

function createTableCell(content = "") {
  return [{ type: "text", text: { content: String(content || "") } }];
}

function createCommitCell(commitSha) {
  return [{
    type: "text",
    text: {
      content: commitSha.slice(0, 7),
      link: { url: `https://github.com/${repo}/commit/${commitSha}` },
    },
  }];
}

function getTableCellText(cell = []) {
  return cell
    .map(text => text.plain_text || text.text?.content || "")
    .join("");
}

function getCommitSha(cell = []) {
  const url = cell[0]?.href || cell[0]?.text?.link?.url || "";
  return url.split("/commit/")[1] || getTableCellText(cell);
}

function isAncestor(ancestorSha, descendantSha) {
  try {
    execSync(`git merge-base --is-ancestor ${ancestorSha} ${descendantSha}`, {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function createCommitRow(commitInfo) {
  return {
    object: "block",
    type: "table_row",
    table_row: {
      cells: [
        createTableCell(commitInfo.date),
        createCommitCell(commitInfo.sha || sha),
        createTableCell(commitInfo.time),
        createTableCell(commitInfo.memory),
        createTableCell(commitInfo.language),
      ],
    },
  };
}

async function getCommitTable(pageId) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  for (const table of response.results.filter(block => block.type === "table")) {
    const rows = await notion.blocks.children.list({
      block_id: table.id,
      page_size: 1,
    });
    const header = rows.results[0]?.table_row?.cells?.map(getTableCellText);
    if (
      JSON.stringify(header) === JSON.stringify(COMMIT_TABLE_HEADER) ||
      JSON.stringify(header) === JSON.stringify(LEGACY_COMMIT_TABLE_HEADER)
    ) {
      return {
        table,
        legacy: header.length === 4,
        atStart: response.results[0]?.id === table.id,
      };
    }
  }

  return null;
}

async function addCommitRecord(pageId, commitInfo) {
  const commitTable = await getCommitTable(pageId);
  const row = createCommitRow(commitInfo);

  if (!commitTable || commitTable.legacy || !commitTable.atStart) {
    const oldRows = commitTable
      ? await notion.blocks.children.list({
        block_id: commitTable.table.id,
        page_size: 100,
      })
      : { results: [] };
    const migratedRows = oldRows.results.slice(1).map(oldRow =>
      createCommitRow({
        date: getTableCellText(oldRow.table_row.cells[0]),
        sha: getCommitSha(oldRow.table_row.cells[1]),
        time: getTableCellText(oldRow.table_row.cells[2]),
        memory: getTableCellText(oldRow.table_row.cells[3]),
        language: commitTable?.legacy
          ? commitInfo.language
          : getTableCellText(oldRow.table_row.cells[4]),
      }),
    );
    const commitNumber = commitInfo.sha || sha;
    const latest = !migratedRows.some(existingRow => {
      const existingSha = getCommitSha(existingRow.table_row.cells[1]);
      return existingSha !== commitNumber && isAncestor(commitNumber, existingSha);
    });
    const alreadyIncluded = migratedRows.some(existingRow =>
      getCommitSha(existingRow.table_row.cells[1]) === commitNumber,
    );
    const response = await notion.blocks.children.append({
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
            {
              object: "block",
              type: "table_row",
              table_row: { cells: COMMIT_TABLE_HEADER.map(createTableCell) },
            },
            ...migratedRows,
            ...(alreadyIncluded ? [] : [row]),
          ],
        },
      }],
    });

    if (commitTable) {
      await notion.blocks.delete({ block_id: commitTable.table.id });
    }
    return { table: response.results[0], added: !alreadyIncluded, latest };
  }

  const table = commitTable.table;

  const rows = await notion.blocks.children.list({
    block_id: table.id,
    page_size: 100,
  });
  const commitNumber = commitInfo.sha || sha;
  const latest = !rows.results.some(existingRow => {
    const existingSha = getCommitSha(existingRow.table_row?.cells?.[1]);
    return existingSha !== commitNumber && isAncestor(commitNumber, existingSha);
  });
  const existingRow = rows.results.find(row =>
    getCommitSha(row.table_row?.cells?.[1]) === commitNumber,
  );

  const expectedUrl = `https://github.com/${repo}/commit/${commitNumber}`;

  if (existingRow && (
    getTableCellText(existingRow.table_row.cells[1]) !==
      commitNumber.slice(0, 7) ||
    existingRow.table_row.cells[1][0]?.href !== expectedUrl
  )) {
    await notion.blocks.update({
      block_id: existingRow.id,
      table_row: row.table_row,
    });
    return { table, added: false, latest };
  } else if (!existingRow) {
    await notion.blocks.children.append({
      block_id: table.id,
      children: [row],
    });
    return { table, added: true, latest };
  }

  return { table, added: false, latest };
}

async function updateNotionPage(pageId, properties) {
  return notion.pages.update({
    page_id: pageId,
    properties,
  });
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN이 설정되지 않았습니다.");
  }

  const missingDataSourceIds = Object.entries(DATA_SOURCE_IDS)
    .filter(([, dataSourceId]) => !dataSourceId)
    .map(([platformKey]) => platformKey);

  if (missingDataSourceIds.length > 0) {
    throw new Error(
      `Notion Data Source ID가 설정되지 않았습니다: ${missingDataSourceIds.join(", ")}`,
    );
  }

  if (!repo) {
    throw new Error(
      "GITHUB_REPOSITORY가 설정되지 않았습니다.",
    );
  }

  if (!sha) {
    throw new Error("GITHUB_SHA가 설정되지 않았습니다.");
  }

  const commitMessage = getCommitMessage();
  const commitInfo = parseCommitMessage(commitMessage);
  commitInfo.sha = sha;
  commitInfo.date = getCommitDate();
  const changedFiles = getChangedFiles();

  console.log("Commit message:", commitMessage);
  console.log("Changed files:", changedFiles);

  const problemGroups = groupByProblem(changedFiles);

  if (problemGroups.length === 0) {
    console.log(
      "동기화할 알고리즘 문제 파일이 없습니다.",
    );
    return;
  }

  for (const files of problemGroups) {
    const representativeFile =
      files.find(isSolutionFile) ||
      files[0];

    const info = parseFilePath(
      representativeFile,
      files,
    );

    if (!info) {
      console.log(
        `문제 정보를 파싱하지 못했습니다: ${representativeFile}`,
      );
      continue;
    }

    commitInfo.language = getLanguage(
      getSolutionFileAtCommit(sha, info.problemDir, files),
    );

    const dataSourceId =
      getDataSourceId(info.platformKey);

    if (!dataSourceId) {
      console.log(
        `플랫폼 Data Source ID가 설정되지 않았습니다: ` +
          info.platformName,
      );
      continue;
    }

    const existingPage = await findExistingPage(
      dataSourceId,
      info.problemNumber,
      commitInfo.title || info.title,
    );

    if (existingPage) {
      const currentDate = existingPage.properties?.날짜?.date?.start || "";
      const commitResult = await addCommitRecord(existingPage.id, commitInfo);

      if (
        commitResult.added &&
        commitResult.latest &&
        commitInfo.date >= currentDate
      ) {
        await updateNotionPage(existingPage.id, {
          날짜: { date: { start: commitInfo.date } },
          언어: createSelect(commitInfo.language),
        });
      }
      console.log(
        `Notion 기존 기록 업데이트: ` +
          `[${info.platformName}] ` +
          `${commitInfo.title || info.title}`,
      );
      continue;
    }

    const properties = buildProperties(
      info,
      commitInfo,
    );

    const createdPage = await createNotionPage(
      dataSourceId,
      properties,
    );
    await addCommitRecord(createdPage.id, commitInfo);

    console.log(
      `Notion 동기화 완료: ` +
        `[${info.platformName}] ` +
        `${commitInfo.title || info.title}`,
    );
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
