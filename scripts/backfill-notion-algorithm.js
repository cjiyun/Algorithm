const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const apiCallCounts = {
  query: 0,
  create: 0,
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

function isSolutionFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return SOLUTION_EXTENSIONS.includes(ext);
}

function githubTreeUrl(dirPath) {
  if (!dirPath) return null;

  return `https://github.com/${repo}/tree/${branch}/${encodePath(dirPath)}`;
}

function githubBlobUrl(filePath) {
  if (!filePath) return null;

  return `https://github.com/${repo}/blob/${branch}/${encodePath(filePath)}`;
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

function buildProperties(info) {
  const properties = {
    문제명: createTitle(info.title),
    날짜: {
      date: {
        start: info.date,
      },
    },
    플랫폼: createSelect(info.platformName),
    난이도: createSelect(info.difficulty),
    "문제 번호": createRichText(info.problemNumber),
    언어: createSelect(info.language),
    "실행 시간": createRichText(""),
    메모리: createRichText(""),
    "GitHub Commit": createUrl(info.lastCommitUrl),
    "문제 폴더": createUrl(githubTreeUrl(info.problemDir)),
    "풀이 파일": createUrl(githubBlobUrl(info.solutionFile)),
    README: createUrl(githubBlobUrl(info.readmeFile)),
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

function getProblemLastCommitInfo(problemDir) {
  const timestamp = run(`git log -1 --format=%cI -- "${problemDir}"`);
  const sha = run(`git log -1 --format=%H -- "${problemDir}"`);

  return {
    date: timestamp
      ? timestamp.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    commitUrl: sha
      ? `https://github.com/${repo}/commit/${sha}`
      : null,
  };
}

function listDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function findProblemEntries() {
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
        const problemPath = path.join(difficultyPath, problemFolder);
        const files = fs.readdirSync(problemPath, {
          withFileTypes: true,
        });

        const fileNames = files
          .filter(file => file.isFile())
          .map(file => file.name);

        const solutionFileName =
          fileNames.find(fileName => isSolutionFile(fileName)) || "";

        const readmeFileName =
          fileNames.find(
            fileName => fileName.toLowerCase() === "readme.md",
          ) || "";

        if (!solutionFileName && !readmeFileName) {
          continue;
        }

        const { problemNumber, title } =
          parseProblemFolder(problemFolder);

        const problemDir =
          `${platformDir}/${difficultyDir}/${problemFolder}`;

        const solutionFile = solutionFileName
          ? `${problemDir}/${solutionFileName}`
          : "";

        const readmeFile = readmeFileName
          ? `${problemDir}/${readmeFileName}`
          : "";

        const commitInfo = getProblemLastCommitInfo(problemDir);

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
          readmeFile,
          language: getLanguage(solutionFile),
          date: commitInfo.date,
          lastCommitUrl: commitInfo.commitUrl,
        });
      }
    }
  }

  return entries;
}

function getPropertyText(property) {
  const value = property?.title || property?.rich_text;

  return normalizeSpaces(
    value?.map(item => item.plain_text || item.text?.content || "").join("") || "",
  );
}

function addExistingKeys(keys, page) {
  const problemNumber = getPropertyText(page.properties?.["문제 번호"]);
  const title = getPropertyText(page.properties?.["문제명"]);

  if (problemNumber) keys.add(`number:${problemNumber}`);
  if (title) keys.add(`title:${title.toLowerCase()}`);
}

async function getExistingKeys(dataSourceId) {
  const keys = new Set();
  let startCursor;

  do {
    apiCallCounts.query += 1;

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    });

    response.results.forEach(page => addExistingKeys(keys, page));
    startCursor = response.has_more ? response.next_cursor : null;
  } while (startCursor);

  return keys;
}

function entryExists(keys, entry) {
  return (
    (entry.problemNumber && keys.has(`number:${entry.problemNumber}`)) ||
    (entry.title && keys.has(`title:${entry.title.toLowerCase()}`))
  );
}

async function createNotionPage(dataSourceId, properties) {
  apiCallCounts.create += 1;

  return notion.pages.create({
    parent: {
      data_source_id: dataSourceId,
    },
    properties,
  });
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN이 설정되지 않았습니다.");
  }

  console.log(`Repository: ${repo}`);
  console.log(`Branch: ${branch}`);

  const entries = findProblemEntries();

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
      await getExistingKeys(dataSourceId),
    );
  }

  let createdCount = 0;
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
      const existingKeys = existingKeysByDataSource.get(dataSourceId);
      const exists = entryExists(existingKeys, entry);

      if (exists) {
        skippedCount += 1;
        continue;
      }

      const properties = buildProperties(entry);

      await createNotionPage(dataSourceId, properties);

      if (entry.problemNumber) {
        existingKeys.add(`number:${entry.problemNumber}`);
      }
      if (entry.title) {
        existingKeys.add(`title:${entry.title.toLowerCase()}`);
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
  console.log(`건너뜀: ${skippedCount}`);
  console.log(`실패: ${failedCount}`);
  console.log(
    `Notion API 호출: 조회 ${apiCallCounts.query}회, ` +
      `생성 ${apiCallCounts.create}회, ` +
      `총 ${apiCallCounts.query + apiCallCounts.create}회`,
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});