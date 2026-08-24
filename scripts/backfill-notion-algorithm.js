const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const apiCallCounts = {
  query: 0,
  create: 0,
  update: 0,
};

const repo = process.env.GITHUB_REPOSITORY || "cjiyun/Algorithm";
const branch = process.env.GITHUB_REF_NAME || getCurrentBranch() || "main";

const DATA_SOURCE_IDS = {
  programmers: process.env.NOTION_PROGRAMMERS_DATA_SOURCE_ID,
  swea: process.env.NOTION_SWEA_DATA_SOURCE_ID,
  baekjoon: process.env.NOTION_BAEKJOON_DATA_SOURCE_ID,
};

const SOLUTION_EXTENSIONS = [
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".py",
  ".java",
  ".cpp",
  ".cc",
  ".cxx",
  ".c",
  ".kt",
  ".swift",
  ".sql",
];

function run(command) {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function getCurrentBranch() {
  return run("git branch --show-current");
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

function detectPlatform(rawPlatform) {
  const normalized = normalizeSpaces(rawPlatform).toLowerCase();

  if (rawPlatform === "프로그래머스" || normalized.includes("programmers")) {
    return {
      key: "programmers",
      name: "프로그래머스",
    };
  }

  if (rawPlatform === "SWEA" || normalized === "swea") {
    return {
      key: "swea",
      name: "SWEA",
    };
  }

  if (rawPlatform === "백준" || normalized.includes("baekjoon")) {
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

function normalizeDifficulty(platformKey, rawDifficulty) {
  const difficulty = normalizeSpaces(rawDifficulty);

  if (!difficulty) return "";

  if (platformKey === "programmers") {
    if (difficulty.toLowerCase().startsWith("lv.")) {
      return difficulty;
    }

    if (difficulty.toLowerCase().startsWith("level")) {
      const number = difficulty.replace(/level/i, "").trim();
      return `Lv.${number}`;
    }

    return `Lv.${difficulty}`;
  }

  return difficulty;
}

function getLanguage(filePath = "") {
  const ext = path.extname(filePath).toLowerCase();

  const languageMap = {
    ".js": "JavaScript",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",
    ".ts": "TypeScript",
    ".py": "Python",
    ".java": "Java",
    ".cpp": "C++",
    ".cc": "C++",
    ".cxx": "C++",
    ".c": "C",
    ".kt": "Kotlin",
    ".swift": "Swift",
    ".sql": "SQL",
  };

  return languageMap[ext] || "Unknown";
}

function parseCommitMessage(message) {
  const match = message.match(
    /^\[[^\]]+\]\s*Title:\s*(.*?),\s*Time:\s*(.*?),\s*Memory:\s*(.*?)\s*-BaekjoonHub/i,
  );

  if (!match) {
    return {
      time: "",
      memory: "",
    };
  }

  return {
    time: normalizeSpaces(match[2]),
    memory: normalizeSpaces(match[3]),
  };
}

function isSolutionFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return SOLUTION_EXTENSIONS.includes(ext);
}

function githubTreeUrl(dirPath) {
  if (!dirPath) return null;

  return `https://github.com/${repo}/tree/${branch}/${encodePath(dirPath)}`;
}

function getDataSourceId(platformKey) {
  return DATA_SOURCE_IDS[platformKey] || null;
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

function buildProperties(info) {
  const properties = {
    문제명: createTitle(info.title),
    날짜: { date: { start: info.date } },
    난이도: createSelect(info.difficulty),
    "문제 번호": createRichText(info.problemNumber),
    언어: createSelect(info.language),
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

function addCommitInfos(entries) {
  if (entries.length === 0) return;

  const entriesByDir = new Map(entries.map(entry => [entry.problemDir, entry]));
  const roots = [...new Set(entries.map(entry => entry.problemDir.split("/")[0]))];
  const output = run(
    `git -c core.quotePath=false log ` +
      `--format=%x1e%H%x1f%cI%x1f%B%x1d --name-only -z -- ` +
      roots.map(root => `"${root}"`).join(" "),
  );
  const latestSolutionByEntry = new Map();
  const records = output.split("\x1e").filter(Boolean).reverse();

  for (const record of records) {
    const [metadata, changedPaths = ""] = record.split("\x1d");
    const [sha, timestamp, ...messageParts] = metadata.split("\x1f");
    const commitInfo = parseCommitMessage(messageParts.join("\x1f"));
    const changedFilesByEntry = new Map();

    for (const file of changedPaths.split("\0").map(value => value.trim()).filter(Boolean)) {
      const entry = entriesByDir.get(path.posix.dirname(file));
      if (!entry) continue;
      if (!changedFilesByEntry.has(entry)) changedFilesByEntry.set(entry, []);
      changedFilesByEntry.get(entry).push(file);
    }

    for (const [entry, changedFiles] of changedFilesByEntry) {
      const changedSolution = changedFiles.find(isSolutionFile);
      if (changedSolution) latestSolutionByEntry.set(entry, changedSolution);
      const solutionFile = latestSolutionByEntry.get(entry) || entry.solutionFile;
      entry.commits.unshift({
        date: timestamp.slice(0, 10),
        time: commitInfo.time,
        memory: commitInfo.memory,
        sha,
        language: getLanguage(solutionFile),
      });
    }
  }
}

function listDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function findProblemEntries(targetProblemNumber) {
  const root = process.cwd();

  const platformDirs = listDirectories(root).filter(dirName => {
    const platform = detectPlatform(dirName);
    return Boolean(platform.key);
  });

  const entries = [];

  for (const platformDir of platformDirs) {
    const platform = detectPlatform(platformDir);
    const platformPath = path.join(root, platformDir);
    const difficultyDirs = listDirectories(platformPath);

    for (const difficultyDir of difficultyDirs) {
      const difficultyPath = path.join(platformPath, difficultyDir);
      const problemDirs = listDirectories(difficultyPath);

      for (const problemFolder of problemDirs) {
        const { problemNumber, title } =
          parseProblemFolder(problemFolder);

        if (targetProblemNumber && problemNumber !== targetProblemNumber) {
          continue;
        }

        const problemPath = path.join(difficultyPath, problemFolder);
        const files = fs.readdirSync(problemPath, {
          withFileTypes: true,
        });

        const fileNames = files
          .filter(file => file.isFile())
          .map(file => file.name);

        const solutionFileName =
          fileNames.find(fileName => isSolutionFile(fileName)) || "";

        const hasReadme = fileNames.some(
          fileName => fileName.toLowerCase() === "readme.md",
        );

        if (!solutionFileName && !hasReadme) {
          continue;
        }

        const problemDir =
          `${platformDir}/${difficultyDir}/${problemFolder}`;

        const solutionFile = solutionFileName
          ? `${problemDir}/${solutionFileName}`
          : "";

        entries.push({
          platformKey: platform.key,
          platformName: platform.name,
          difficulty: normalizeDifficulty(
            platform.key,
            difficultyDir,
          ),
          problemNumber,
          title,
          problemDir,
          solutionFile,
          language: getLanguage(solutionFile),
          date: "",
          time: "",
          memory: "",
          sha: "",
          commits: [],
        });
      }
    }
  }

  addCommitInfos(entries);

  for (const entry of entries) {
    const latestCommit = entry.commits[0] || {};
    entry.language = latestCommit.language || entry.language;
    entry.date = latestCommit.date || "";
    entry.time = latestCommit.time || "";
    entry.memory = latestCommit.memory || "";
    entry.sha = latestCommit.sha || "";
  }

  return entries;
}

function getPropertyText(property) {
  const value = property?.title || property?.rich_text;

  return normalizeSpaces(
    value?.map(item => item.plain_text || item.text?.content || "").join("") || "",
  );
}

function addExistingPage(records, page) {
  const problemNumber = getPropertyText(page.properties?.["문제 번호"]);
  const title = getPropertyText(page.properties?.["문제명"]);

  if (problemNumber) {
    records.keys.add(`number:${problemNumber}`);
    records.pages.set(`number:${problemNumber}`, page);
  }
  if (title) {
    records.keys.add(`title:${title.toLowerCase()}`);
    records.pages.set(`title:${title.toLowerCase()}`, page);
  }
}

async function getExistingRecords(dataSourceId) {
  const records = {
    keys: new Set(),
    pages: new Map(),
  };
  let startCursor;

  do {
    apiCallCounts.query += 1;

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    });

    response.results.forEach(page => addExistingPage(records, page));
    startCursor = response.has_more ? response.next_cursor : null;
  } while (startCursor);

  return records;
}

function getEntryKey(entry, records) {
  if (entry.problemNumber) {
    const key = `number:${entry.problemNumber}`;
    return records.keys.has(key) ? key : null;
  }

  if (entry.title && records.keys.has(`title:${entry.title.toLowerCase()}`)) {
    return `title:${entry.title.toLowerCase()}`;
  }

  return null;
}

async function createNotionPage(dataSourceId, properties) {
  apiCallCounts.create += 1;

  return notion.pages.create({
    parent: {
      type: "data_source_id",
      data_source_id: dataSourceId,
    },
    properties,
  });
}

async function updateNotionPage(pageId, properties) {
  apiCallCounts.update += 1;
  return notion.pages.update({ page_id: pageId, properties });
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

function getTableCellText(cell = []) {
  return cell
    .map(text => text.plain_text || text.text?.content || "")
    .join("");
}

function getCommitSha(cell = []) {
  const url = cell[0]?.href || cell[0]?.text?.link?.url || "";
  return url.split("/commit/")[1] || getTableCellText(cell);
}

function createCommitRow(entry) {
  return {
    object: "block",
    type: "table_row",
    table_row: {
      cells: [
        createTableCell(entry.date),
        createCommitCell(entry.sha),
        createTableCell(entry.time),
        createTableCell(entry.memory),
        createTableCell(entry.language),
      ],
    },
  };
}

async function getCommitTable(pageId) {
  apiCallCounts.query += 1;
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  for (const table of response.results.filter(block => block.type === "table")) {
    apiCallCounts.query += 1;
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

async function addCommitRecords(pageId, entry) {
  if (entry.commits.length === 0) return 0;

  const commitTable = await getCommitTable(pageId);

  if (!commitTable || commitTable.legacy || !commitTable.atStart) {
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
          children: [{
            object: "block",
            type: "table_row",
            table_row: { cells: COMMIT_TABLE_HEADER.map(createTableCell) },
          }, ...entry.commits.map(createCommitRow)],
        },
      }],
    });

    if (commitTable) {
      apiCallCounts.update += 1;
      await notion.blocks.delete({ block_id: commitTable.table.id });
    }
    return entry.commits.length;
  }

  const table = commitTable.table;

  apiCallCounts.query += 1;
  const rows = await notion.blocks.children.list({
    block_id: table.id,
    page_size: 100,
  });
  const existingRows = new Map(rows.results.map(row => [
    getCommitSha(row.table_row?.cells?.[1]),
    row,
  ]));
  const missingCommits = entry.commits.filter(
    commit => !existingRows.has(commit.sha),
  );
  const incorrectRows = entry.commits.filter(commit => {
    const existingRow = existingRows.get(commit.sha);
    return existingRow &&
      (
        getTableCellText(existingRow.table_row?.cells?.[1]) !==
          commit.sha.slice(0, 7) ||
        existingRow.table_row?.cells?.[1]?.[0]?.href !==
          `https://github.com/${repo}/commit/${commit.sha}` ||
        getTableCellText(existingRow.table_row?.cells?.[4]) !== commit.language
      );
  });

  if (missingCommits.length > 0) {
    apiCallCounts.update += 1;
    await notion.blocks.children.append({
      block_id: table.id,
      children: missingCommits.map(createCommitRow),
    });
  }

  for (const commit of incorrectRows) {
    apiCallCounts.update += 1;
    await notion.blocks.update({
      block_id: existingRows.get(commit.sha).id,
      table_row: createCommitRow(commit).table_row,
    });
  }

  return missingCommits.length + incorrectRows.length;
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN이 설정되지 않았습니다.");
  }

  console.log(`Repository: ${repo}`);
  console.log(`Branch: ${branch}`);

  const problemNumber = process.argv
    .find(argument => argument.startsWith("--problem="))
    ?.split("=")[1];
  const entries = findProblemEntries(problemNumber);

  console.log(`찾은 기존 문제 수: ${entries.length}`);

  if (entries.length === 0) {
    console.log("등록할 기존 문제가 없습니다.");
    return;
  }

  const existingKeysByDataSource = new Map();

  for (const dataSourceId of Object.values(DATA_SOURCE_IDS)) {
    if (!dataSourceId || existingKeysByDataSource.has(dataSourceId)) {
      continue;
    }

    existingKeysByDataSource.set(
      dataSourceId,
      await getExistingRecords(dataSourceId),
    );
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const entry of entries) {
    const dataSourceId = getDataSourceId(entry.platformKey);

    if (!dataSourceId) {
      console.log(
        `Data Source ID가 없어 건너뜀: ` +
          `${entry.platformName} / ${entry.title}`,
      );

      skippedCount += 1;
      continue;
    }

    try {
      const existingRecords = existingKeysByDataSource.get(dataSourceId);
      const entryKey = getEntryKey(entry, existingRecords);
      const exists = Boolean(entryKey);

      if (exists) {
        const page = existingRecords.pages.get(entryKey);
        const addedCount = await addCommitRecords(page.id, entry);
        const currentDate = page.properties?.날짜?.date?.start || "";
        const currentLanguage = page.properties?.언어?.select?.name || "";
        const properties = {};

        if (entry.date && currentDate !== entry.date) {
          properties.날짜 = { date: { start: entry.date } };
        }
        if (entry.language && currentLanguage !== entry.language) {
          properties.언어 = createSelect(entry.language);
        }
        if (Object.keys(properties).length > 0) {
          await updateNotionPage(page.id, properties);
        }

        if (addedCount > 0 || Object.keys(properties).length > 0) {
          updatedCount += 1;
          console.log(
            `${addedCount > 0 ? `커밋 ${addedCount}개 추가` : "메타데이터 갱신"}: ` +
              `[${entry.platformName}] ${entry.title}`,
          );
        } else {
          skippedCount += 1;
        }
        continue;
      }

      const properties = buildProperties(entry);

      const createdPage = await createNotionPage(
        dataSourceId,
        properties,
      );
      await addCommitRecords(createdPage.id, entry);

      if (entry.problemNumber) {
        existingRecords.keys.add(`number:${entry.problemNumber}`);
      }
      if (entry.title) {
        existingRecords.keys.add(`title:${entry.title.toLowerCase()}`);
      }

      console.log(
        `등록 완료: [${entry.platformName}] ${entry.title}`,
      );

      createdCount += 1;

      // Notion API rate limit 방지
      await new Promise(resolve => setTimeout(resolve, 350));
    } catch (error) {
      console.error(
        `등록 실패: [${entry.platformName}] ${entry.title}`,
      );
      console.error(error.message);

      failedCount += 1;
    }
  }

  console.log("백필 완료");
  console.log(`전체: ${entries.length}`);
  console.log(`생성: ${createdCount}`);
  console.log(`보완: ${updatedCount}`);
  console.log(`건너뜀: ${skippedCount}`);
  console.log(`실패: ${failedCount}`);
  console.log(
    `Notion API 호출: 조회 ${apiCallCounts.query}회, ` +
      `생성 ${apiCallCounts.create}회, ` +
      `수정 ${apiCallCounts.update}회, ` +
      `총 ${apiCallCounts.query + apiCallCounts.create + apiCallCounts.update}회`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
