const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PLATFORMS = ["프로그래머스", "백준", "SWEA"];
const CHECK_MODE = process.argv.includes("--check");
const requestedPlatforms = process.argv.slice(2).filter(argument => argument !== "--check");
const ACTIVE_PLATFORMS = requestedPlatforms.length ? [...new Set(requestedPlatforms)] : PLATFORMS;
const invalidPlatform = ACTIVE_PLATFORMS.find(platform => !PLATFORMS.includes(platform));
if (invalidPlatform) throw new Error(`지원하지 않는 플랫폼입니다: ${invalidPlatform}`);
const SOLUTION_EXTENSIONS = new Set([
  ".c", ".cc", ".cpp", ".cxx", ".java", ".js", ".kt", ".mjs", ".py", ".sql", ".swift", ".ts",
]);

const BADGES = {
  프로그래머스: [
    "[Lv.0]: https://img.shields.io/badge/Lv.0-9B9B9B?style=flat-square",
    "[Lv.1]: https://img.shields.io/badge/Lv.1-0078FF?style=flat-square",
    "[Lv.2]: https://img.shields.io/badge/Lv.2-6EC65D?style=flat-square",
    "[Lv.3]: https://img.shields.io/badge/Lv.3-F3AC3C?style=flat-square",
    "[Lv.4]: https://img.shields.io/badge/Lv.4-ED7436?style=flat-square",
    "[Lv.5]: https://img.shields.io/badge/Lv.5-B95FDA?style=flat-square",
  ],
  SWEA: [
    "[D7]: https://img.shields.io/badge/D7-ff6b6b?style=flat-square",
    "[D6]: https://img.shields.io/badge/D6-4d96ff?style=flat-square",
    "[D5]: https://img.shields.io/badge/D5-4d96ff?style=flat-square",
    "[D4]: https://img.shields.io/badge/D4-6bcb77?style=flat-square",
    "[D3]: https://img.shields.io/badge/D3-6bcb77?style=flat-square",
    "[D2]: https://img.shields.io/badge/D2-ffe161?style=flat-square",
    "[D1]: https://img.shields.io/badge/D1-ffe161?style=flat-square",
  ],
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function markdownText(value) {
  return String(value).replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

function markdownPath(filePath) {
  return `./${path.relative(ROOT, filePath).split(path.sep).slice(1).map(encodeURIComponent).join("/")}`;
}

function problemRoot(readmePath, platform) {
  const parts = path.relative(ROOT, readmePath).split(path.sep);
  return path.join(ROOT, ...parts.slice(0, platform === "SWEA" ? 3 : 3));
}

function readProblems(platform) {
  const platformDir = path.join(ROOT, platform);
  if (!fs.existsSync(platformDir)) return [];

  return walk(platformDir)
    .filter(file => path.basename(file) === "README.md" && file !== path.join(platformDir, "README.md"))
    .map(readmePath => {
      const body = fs.readFileSync(readmePath, "utf8");
      const heading = body.match(/^# \[([^\]]+)]\s+(.+?)(?:\s+-\s+(\d+))?\s*$/m);
      const problemNumber = heading?.[3] || body.match(/D\d+\s+-\s+(\d+)/)?.[1];
      const problemLink = body.match(/\[문제 링크]\(([^)]+)\)/);
      if (!heading || !problemNumber || !problemLink) {
        throw new Error(`문제 정보를 읽을 수 없습니다: ${path.relative(ROOT, readmePath)}`);
      }

      const root = problemRoot(readmePath, platform);
      const solutions = walk(root).filter(file => SOLUTION_EXTENSIONS.has(path.extname(file).toLowerCase()));
      const classification = body.match(/### 분류\s+([^#]+)/)?.[1]
        ?.split("\n").map(line => line.trim()).filter(Boolean)[0] || "";

      return {
        platform,
        root,
        rootRelative: path.relative(ROOT, root),
        difficulty: heading[1].replace(/^level\s*/i, platform === "프로그래머스" ? "Lv." : ""),
        title: markdownText(heading[2]),
        number: problemNumber,
        problemUrl: problemLink[1],
        classification: markdownText(classification),
        solutions,
        retried: false,
      };
    });
}

function markRetries(problems) {
  const byRoot = new Map(problems.map(problem => [problem.rootRelative, problem]));
  const platforms = [...new Set(problems.map(problem => problem.platform))];
  const log = execFileSync(
    "git",
    ["log", "--format=COMMIT:%H", "--name-only", "-z", "--", ...platforms],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 100 * 1024 * 1024 },
  );

  let sha = "";
  const touched = new Map(problems.map(problem => [problem.rootRelative, new Map()]));
  for (const rawToken of log.split("\0")) {
    const token = rawToken.replace(/^\n/, "");
    if (token.startsWith("COMMIT:")) {
      sha = token.slice(7);
      continue;
    }
    const parts = token.split("/");
    if (!sha || parts.length < 3) continue;
    const root = parts.slice(0, 3).join("/");
    const extension = path.extname(token).toLowerCase();
    if (!byRoot.has(root) || !SOLUTION_EXTENSIONS.has(extension)) continue;
    if (!touched.get(root).has(extension)) touched.get(root).set(extension, new Set());
    touched.get(root).get(extension).add(sha);
  }
  for (const problem of problems) {
    problem.retried = [...touched.get(problem.rootRelative).values()].some(commits => commits.size >= 2);
  }
}

function difficultyRank(platform, difficulty) {
  if (platform === "프로그래머스") return Number(difficulty.match(/\d+/)?.[0] || -1);
  if (platform === "SWEA") return Number(difficulty.match(/\d+/)?.[0] || -1);
  const tiers = { Bronze: 0, Silver: 1, Gold: 2, Platinum: 3, Diamond: 4, Ruby: 5 };
  const [tier, roman] = difficulty.split(/\s+/);
  const levels = { V: 1, IV: 2, III: 3, II: 4, I: 5 };
  return (tiers[tier] ?? -1) * 5 + (levels[roman] ?? 0);
}

function groupTitle(platform, difficulty) {
  if (platform === "프로그래머스") {
    const level = difficultyRank(platform, difficulty);
    return `${level}️⃣ Level ${level}`;
  }
  if (platform === "SWEA") return `${difficultyRank(platform, difficulty)}️⃣ ${difficulty}`;
  const emoji = { Bronze: "🥉", Silver: "🥈", Gold: "🥇", Platinum: "🏅", Diamond: "💎", Ruby: "♦️" };
  const tier = difficulty.split(/\s+/)[0];
  return `${emoji[tier] || ""} ${tier}`.trim();
}

function badgeName(platform, difficulty) {
  if (platform !== "백준") return difficulty;
  const [tier, roman] = difficulty.split(/\s+/);
  return `${tier}${({ I: 1, II: 2, III: 3, IV: 4, V: 5 })[roman]}`;
}

function codeLinks(problem) {
  return problem.solutions
    .map(file => `[${path.extname(file).slice(1)}](${markdownPath(file)})`)
    .join(" / ");
}

function table(platform, problems) {
  const hasType = platform === "백준";
  const columns = ["번호", "문제 이름", "문제 번호", "난이도", ...(hasType ? ["유형"] : []), "코드", "재도전"];
  const lines = [
    `| ${columns.join(" | ")} |`,
    `| ${columns.map(() => ":---:").join(" | ")} |`,
  ];
  problems.forEach((problem, index) => {
    const cells = [
      String(index + 1).padStart(2, "0"),
      problem.title,
      `[${problem.number}](${problem.problemUrl})`,
      `![${badgeName(platform, problem.difficulty)}]`,
      ...(hasType ? [problem.classification] : []),
      codeLinks(problem),
      problem.retried ? "✅" : "",
    ];
    lines.push(`| ${cells.join(" | ")} |`);
  });
  return lines.join("\n");
}

function baekjoonBadges(problems) {
  const urls = {
    Bronze: 0, Silver: 5, Gold: 10, Platinum: 15, Diamond: 20, Ruby: 25,
  };
  const tiers = [...new Set(problems.map(problem => problem.difficulty.split(/\s+/)[0]))];
  return tiers.flatMap(tier => Array.from({ length: 5 }, (_, index) =>
    `[${tier}${5 - index}]: https://static.solved.ac/tier_small/${urls[tier] + index + 1}.svg`,
  ));
}

function render(platform, problems) {
  const groups = new Map();
  for (const problem of problems) {
    const group = platform === "백준" ? problem.difficulty.split(/\s+/)[0] : problem.difficulty;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(problem);
  }
  const sections = [...groups.entries()]
    .sort(([, a], [, b]) => difficultyRank(platform, b[0].difficulty) - difficultyRank(platform, a[0].difficulty))
    .map(([group, entries]) => {
      entries.sort((a, b) => Number(a.number) - Number(b.number));
      return `### ${groupTitle(platform, group)}\n\n${table(platform, entries)}`;
    });
  const badges = platform === "백준" ? baekjoonBadges(problems) : BADGES[platform];
  return `${platform} 문제 풀이\n==============================\n<br>\n\n## 해결한 문제\n\n${sections.join("\n\n")}\n\n${badges.join("\n")}\n`;
}

const problems = ACTIVE_PLATFORMS.flatMap(readProblems);
markRetries(problems);
let stale = false;
for (const platform of ACTIVE_PLATFORMS) {
  const output = render(platform, problems.filter(problem => problem.platform === platform));
  const readmePath = path.join(ROOT, platform, "README.md");
  if (CHECK_MODE) {
    if (!fs.existsSync(readmePath) || fs.readFileSync(readmePath, "utf8") !== output) {
      console.error(`${platform}/README.md 갱신이 필요합니다.`);
      stale = true;
    }
  } else {
    fs.writeFileSync(readmePath, output);
  }
}
if (stale) process.exitCode = 1;
else console.log(`${ACTIVE_PLATFORMS.join(", ")} README ${CHECK_MODE ? "검증" : "갱신"} 완료: ${problems.length}개 문제`);
