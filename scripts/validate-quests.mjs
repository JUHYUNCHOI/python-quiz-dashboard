#!/usr/bin/env node
/**
 * Quest validator — Phase 1 of redesign.
 *
 * Walks all 161 quests in quest-problems/ and runs three checks:
 *
 *   1. PARSE — every chapters.jsx and components.jsx must parse with
 *      esbuild. (Catches syntax errors that would crash the page.)
 *
 *   2. SYNTAX LINT — flags untaught C++ patterns inside CPP_* code
 *      arrays. The Korean curriculum teaches C++ through cpp-9
 *      (vector) + cpp-11 (string). Anything past that we mark.
 *      Reports as warnings (not errors) — student-facing impact only.
 *
 *   3. HEALTH CROSS-CHECK — every quest flagged in lib/quest-health.ts
 *      must actually exist on disk. Catches stale registry entries
 *      after fixes land.
 *
 * Run:   node scripts/validate-quests.mjs
 * Or:    npm run validate-quests
 *
 * Exit code:
 *   0 — all parses pass, registry is consistent
 *   1 — at least one parse failure or registry mismatch
 *   (warnings don't fail the build by default; pass --strict to fail)
 *
 * NOTE: This script is read-only. It never modifies quest files.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const QUEST_DIR = join(ROOT, "quest-problems");
const STRICT = process.argv.includes("--strict");

// Untaught C++ patterns — flagged inside CPP_* code arrays.
// (Detection is text-based; harmless false positives possible.)
const UNTAUGHT_PATTERNS = [
  { name: "lambda",            re: /\bauto\s+\w+\s*=\s*\[/, hint: "lambdas are cpp-23+ — replace with regular function" },
  { name: "lambda (capture)",  re: /\[(\&|=|\&\w+|=\w+)\]\s*\(/, hint: "lambda captures untaught — replace with regular function" },
  { name: "structured binding", re: /\bauto&?\s*\[\s*\w+\s*,/, hint: "auto& [v, c] is cpp-15+ structured binding — use index access" },
  { name: "bits/stdc++.h",     re: /#include\s*<bits\/stdc\+\+\.h>/, hint: "<bits/stdc++.h> is cpp-20 — use specific includes" },
  { name: "ios::sync_with_stdio", re: /ios::sync_with_stdio/, hint: "ios::sync_with_stdio is cpp-19 — drop or note as advanced" },
  { name: "while (X--)",       re: /while\s*\(\s*\w+--\s*\)/, hint: "while(X--) postfix-in-condition is confusing — prefer for-loop" },
  { name: "next_permutation",  re: /next_permutation\s*\(/, hint: "next_permutation is cpp-23 — use recursion instead" },
  { name: "iota",              re: /\biota\s*\(/, hint: "iota is cpp-17 — use plain loop" },
  { name: "range-for &",       re: /for\s*\(\s*auto\s*&\s*\w+\s*:/, hint: "range-for + reference uses cpp-12 references" },
];

const QUEST_HEALTH_FILE = join(ROOT, "lib", "quest-health.ts");
const QUEST_META_FILE = join(ROOT, "lib", "quest-meta.ts");

function listQuests() {
  return readdirSync(QUEST_DIR)
    .filter((name) => {
      const full = join(QUEST_DIR, name);
      try { return statSync(full).isDirectory(); } catch { return false; }
    })
    .sort();
}

function parseFile(path) {
  if (!existsSync(path)) return { ok: true, missing: true };
  const r = spawnSync("npx", ["esbuild", "--bundle=false", path], {
    cwd: ROOT, stdio: ["ignore", "ignore", "pipe"],
  });
  return { ok: r.status === 0, missing: false, err: r.stderr?.toString() ?? "" };
}

function lintCppPatterns(filePath) {
  if (!existsSync(filePath)) return [];
  const src = readFileSync(filePath, "utf8");
  // Extract content of CPP_*_CPP / *_CPP code blocks (rough heuristic).
  // Match anything that looks like a const NAME_CPP = [ ... ] or = (E) => [ ... ]
  const cppBlocks = [];
  const re = /const\s+\w*_CPP\s*=\s*(\(E\)\s*=>\s*)?\[([^\]]*)\]/gs;
  let m;
  while ((m = re.exec(src))) cppBlocks.push(m[2]);

  const findings = [];
  for (const block of cppBlocks) {
    for (const p of UNTAUGHT_PATTERNS) {
      if (p.re.test(block)) {
        findings.push({ pattern: p.name, hint: p.hint });
      }
    }
  }
  // Deduplicate by pattern name
  const seen = new Set();
  return findings.filter((f) => (seen.has(f.pattern) ? false : seen.add(f.pattern)));
}

function loadQuestHealthIds() {
  if (!existsSync(QUEST_HEALTH_FILE)) return new Set();
  const src = readFileSync(QUEST_HEALTH_FILE, "utf8");
  // Extract top-level keys of QUEST_HEALTH object — rough but reliable
  // for the format we control.
  const ids = new Set();
  const re = /^\s+(\w[\w\d_-]*)\s*:\s*\{/gm;
  let m;
  // Find the start of QUEST_HEALTH = { ... }
  const start = src.indexOf("QUEST_HEALTH:");
  const block = start >= 0 ? src.slice(start) : src;
  while ((m = re.exec(block))) {
    const key = m[1];
    // Skip TS field names that aren't quest IDs (category, severity, detail, etc.)
    if (["category", "severity", "detail", "detailEn"].includes(key)) continue;
    ids.add(key);
  }
  return ids;
}

/**
 * Cross-check: quests flagged "stub-cpp" in quest-health.ts should
 * have supported_languages: ["py"] in quest-meta.ts. Catches drift.
 */
function loadStubCppIds() {
  if (!existsSync(QUEST_HEALTH_FILE)) return new Set();
  const src = readFileSync(QUEST_HEALTH_FILE, "utf8");
  // Find blocks like:  questId: { category: "stub-cpp", ... }
  const ids = new Set();
  const re = /(\w[\w\d_-]*)\s*:\s*\{[^}]*category:\s*"stub-cpp"/g;
  let m;
  while ((m = re.exec(src))) ids.add(m[1]);
  return ids;
}

function loadQuestMeta() {
  if (!existsSync(QUEST_META_FILE)) return { entries: new Map(), pyOnly: new Set() };
  const src = readFileSync(QUEST_META_FILE, "utf8");
  const start = src.indexOf("QUEST_CONCEPT_META");
  const block = start >= 0 ? src.slice(start) : src;
  const entries = new Map();
  const pyOnly = new Set();
  // Match each curated entry block: id: { ... supported_languages: [...] ... }
  const re = /(\w[\w\d_-]*):\s*\{[^}]*supported_languages:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(block))) {
    const id = m[1];
    const langs = m[2].match(/"\w+"/g)?.map((s) => s.replace(/"/g, "")) ?? [];
    entries.set(id, { langs });
    if (langs.length === 1 && langs[0] === "py") pyOnly.add(id);
  }
  return { entries, pyOnly };
}

// ─── Main ────────────────────────────────────────────────────────
const quests = listQuests();
const healthIds = loadQuestHealthIds();
const stubCppIds = loadStubCppIds();
const meta = loadQuestMeta();

let parseFails = 0;
let warnTotal = 0;
let warnings = [];
let registryStale = 0;
let metaInconsistent = 0;

console.log(`▶ Scanning ${quests.length} quests in ${QUEST_DIR}\n`);

for (const id of quests) {
  const dir = join(QUEST_DIR, id);
  const chaptersFile = join(dir, "chapters.jsx");
  const componentsFile = join(dir, "components.jsx");

  // Parse check
  const cParse = parseFile(chaptersFile);
  const compParse = parseFile(componentsFile);
  let parseLine = "";
  if (cParse.missing && compParse.missing) {
    parseLine = `   ⊘ ${id} — no chapters/components (App-only quest, skipping)`;
  } else {
    const chOK = cParse.missing || cParse.ok;
    const coOK = compParse.missing || compParse.ok;
    if (!chOK) parseFails++;
    if (!coOK) parseFails++;
    if (chOK && coOK) {
      parseLine = `   ✓ ${id} parses`;
    } else {
      parseLine = `   ✗ ${id} PARSE FAIL${!chOK ? " chapters.jsx" : ""}${!coOK ? " components.jsx" : ""}`;
    }
  }

  // Lint untaught patterns
  const lintFindings = [
    ...lintCppPatterns(chaptersFile),
    ...lintCppPatterns(componentsFile),
  ];
  if (lintFindings.length) {
    warnTotal += lintFindings.length;
    warnings.push({ id, findings: lintFindings });
    parseLine += `  ⚠ ${lintFindings.length} untaught-syntax`;
  }

  console.log(parseLine);
}

// Registry cross-check
const validIds = new Set(quests);
const stale = [...healthIds].filter((id) => !validIds.has(id));
if (stale.length) {
  registryStale = stale.length;
  console.log(`\n⚠ Registry has ${stale.length} entries not on disk:`);
  for (const id of stale) console.log(`   - ${id}`);
}

// Phase 2: meta consistency — every stub-cpp quest must have a meta
// entry with supported_languages: ["py"] only.
const metaIssues = [];
for (const id of stubCppIds) {
  const m = meta.entries.get(id);
  if (!m) {
    metaIssues.push(`${id}: stub-cpp in quest-health.ts but no quest-meta.ts entry`);
  } else if (!(m.langs.length === 1 && m.langs[0] === "py")) {
    metaIssues.push(`${id}: stub-cpp but supported_languages = [${m.langs.join(", ")}] (expected ["py"])`);
  }
}
if (metaIssues.length) {
  metaInconsistent = metaIssues.length;
  console.log(`\n⚠ Meta consistency issues (${metaIssues.length}):`);
  for (const msg of metaIssues) console.log(`   - ${msg}`);
}

// Warnings detail
if (warnings.length) {
  console.log(`\n⚠ Untaught C++ syntax (${warnTotal} findings across ${warnings.length} quests):`);
  for (const w of warnings) {
    console.log(`   ${w.id}:`);
    for (const f of w.findings) console.log(`     - ${f.pattern}: ${f.hint}`);
  }
}

// Summary
console.log(`\n────────────────────────────────────────`);
console.log(`Quests scanned       : ${quests.length}`);
console.log(`Parse failures       : ${parseFails}`);
console.log(`Untaught C++ patterns: ${warnTotal} (${warnings.length} quests)`);
console.log(`Registry stale       : ${registryStale}`);
console.log(`Meta inconsistencies : ${metaInconsistent}`);
console.log(`Curated meta entries : ${meta.entries.size}`);
console.log(`────────────────────────────────────────`);

const hardFail = parseFails > 0 || registryStale > 0 || metaInconsistent > 0;
const softFail = warnTotal > 0;
if (hardFail) {
  console.log(`\n❌ FAIL — ${parseFails} parse error(s), ${registryStale} stale registry entry(ies)`);
  process.exit(1);
}
if (softFail && STRICT) {
  console.log(`\n❌ FAIL (--strict) — ${warnTotal} untaught-syntax warning(s)`);
  process.exit(1);
}
console.log(`\n✅ PASS — all parses clean, registry consistent`);
process.exit(0);
