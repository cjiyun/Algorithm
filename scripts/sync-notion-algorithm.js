const { Client } = require("@notionhq/client");
const { execSync } = require("child_process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
const branch = process.env.GITHUB_REF_NAME || "main";

const DATABASE_IDS = {
  programmers: process.env.NOTION_PROGRAMMERS_DATABASE_ID,
  swea: process.env.NOTION_SWEA_DATABASE_ID,
  baekjoon: process.env.NOTION_BAEKJOON_DATABASE_ID,
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
  return run("git log -1 --pretty=%B");
}

function getChangedFiles() {
  const output = run(`git diff-tree --no-commit-id --name-only -r ${sha}`);
  if (!output) return [];
  return output.split("\n").filter(Boolean);
}

function parseCommitMessage(message) {
  // 예:
  // [level 1] Title: 달리기 경주, Time: 459.27 ms, Memory: 73.3 MB -BaekjoonHub
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

  // BaekjoonHub의 다른 형식이 들어와도 최소한 제목만 추출 시도
  const titleMatch = message.match(/Title:\s*(.*?)(?:,|$)/i);

  return {
    difficulty: "",
    title: titleMatch ? normalizeSpaces(titleMatch[1]) : "",
    time: "",
    memory: "",
  };
}

function detectPlatform(rawPlatform) {
  const platform = normalizeSpaces(rawPlatform).toLowerCase();

  if (rawPlatform === "프로그래머스" || platform.includes("programmers")) {
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

  if (rawPlatform === "백준" || platform.includes("baekjoon")) {
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

  // 예:
  // 12906. 같은 숫자는 싫어
  // 1208. Flatten
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

  // 예:
  // 프로그래머스/1/12906. 같은 숫자는 싫어/같은 숫자는 싫어.js
  // SWEA/D3/1208. Flatten/Flatten.java
  // 백준/Silver/1000. A＋B/A＋B.py
  const rawPlatform = parts[0];
  const rawDifficulty = parts[1];
  const problemFolder = parts[2];

  const platform = detectPlatform(rawPlatform);

  if (!rawPlatform || !rawDifficulty || !problemFolder || !platform.key) {
    return null;
  }

  const { problemNumber, title } = parseProblemFolder(problemFolder);

  const problemDir = `${rawPlatform}/${rawDifficulty}/${problemFolder}/`;

  const solutionFile =
    allChangedFiles.find(file => file.startsWith(problemDir) && isSolutionFile(file)) ||
    "";

  const readmeFile =
    allChangedFiles.find(file => file.startsWith(problemDir) && isReadme(file)) ||
    "";

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
    readmeFile,
  };
}

function githubCommitUrl() {
  return `https://github.com/${repo}/commit/${sha}`;
}

function githubBlobUrl(filePath) {
  if (!filePath) return null;
  return `https://github.com/${repo}/blob/${branch}/${encodePath(filePath)}`;
}

function githubTreeUrl(dirPath) {
  if (!dirPath) return null;
  return `https://github.com/${repo}/tree/${branch}/${encodePath(dirPath)}`;
}

function getDatabaseId(platformKey) {
  return DATABASE_IDS[platformKey] || null;
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

function buildProperties(info, commitInfo) {
  const title = commitInfo.title || info.title || "알고리즘 문제";
  const difficulty = commitInfo.difficulty || info.difficulty || "";
  const language = getLanguage(info.solutionFile);

  const properties = {
    문제명: createTitle(title),
    날짜: {
      date: {
        start: new Date().toISOString().slice(0, 10),
      },
    },
    플랫폼: createSelect(info.platformName),
    난이도: createSelect(difficulty),
    "문제 번호": createRichText(info.problemNumber),
    언어: createSelect(language),
    "실행 시간": createRichText(commitInfo.time),
    메모리: createRichText(commitInfo.memory),
    "GitHub Commit": createUrl(githubCommitUrl()),
    "문제 폴더": createUrl(githubTreeUrl(info.problemDir)),
    "풀이 파일": createUrl(githubBlobUrl(info.solutionFile)),
    README: createUrl(githubBlobUrl(info.readmeFile)),
    "복습 필요": {
      checkbox: false,
    },
  };

  // 값이 빈 select는 Notion API에서 오류가 날 수 있으므로 제거
  Object.keys(properties).forEach(key => {
    if (properties[key] === null) {
      delete properties[key];
    }
  });

  return properties;
}

async function alreadyExists(databaseId, commitUrl, problemNumber) {
  const filters = [
    {
      property: "GitHub Commit",
      url: {
        equals: commitUrl,
      },
    },
  ];

  // 커밋 하나에 여러 문제가 들어가는 경우를 대비해 문제 번호도 함께 확인
  if (problemNumber) {
    filters.push({
      property: "문제 번호",
      rich_text: {
        equals: problemNumber,
      },
    });
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: filters,
    },
  });

  return response.results.length > 0;
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

async function createNotionPage(databaseId, properties) {
  return notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties,
  });
}

async function main() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN이 설정되지 않았습니다.");
  }

  if (!repo) {
    throw new Error("GITHUB_REPOSITORY가 설정되지 않았습니다.");
  }

  if (!sha) {
    throw new Error("GITHUB_SHA가 설정되지 않았습니다.");
  }

  const commitMessage = getCommitMessage();
  const commitInfo = parseCommitMessage(commitMessage);
  const changedFiles = getChangedFiles();

  console.log("Commit message:", commitMessage);
  console.log("Changed files:", changedFiles);

  const problemGroups = groupByProblem(changedFiles);

  if (problemGroups.length === 0) {
    console.log("동기화할 알고리즘 문제 파일이 없습니다.");
    return;
  }

  const commitUrl = githubCommitUrl();

  for (const files of problemGroups) {
    const representativeFile = files.find(isSolutionFile) || files[0];
    const info = parseFilePath(representativeFile, files);

    if (!info) {
      console.log(`문제 정보를 파싱하지 못했습니다: ${representativeFile}`);
      continue;
    }

    const databaseId = getDatabaseId(info.platformKey);

    if (!databaseId) {
      console.log(`플랫폼 DB ID가 설정되지 않았습니다: ${info.platformName}`);
      continue;
    }

    const exists = await alreadyExists(databaseId, commitUrl, info.problemNumber);

    if (exists) {
      console.log(`이미 Notion에 기록된 문제입니다: ${info.title}`);
      continue;
    }

    const properties = buildProperties(info, commitInfo);

    await createNotionPage(databaseId, properties);

    console.log(`Notion 동기화 완료: [${info.platformName}] ${commitInfo.title || info.title}`);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});