#!/usr/bin/env node
/**
 * Quest solution validator — Phase 1 (deferred) of redesign.
 *
 * For every quest with both `validate_io` and `solution_py` set in
 * lib/quest-meta.ts, run the Python reference solution against each
 * declared input on stdin and compare stdout (rstripped) to expected.
 *
 * Quests without both fields are skipped — opt-in by populating the
 * meta entry.
 *
 * Run:   node scripts/validate-solutions.mjs
 * Or:    npm run validate-solutions
 *
 * Exit code:
 *   0 — all populated quests pass (or there are none yet)
 *   1 — at least one mismatch or runtime error
 *
 * NOTE: Pure CI tool. Reads quest-meta.ts via a regex sniff (no TS
 * compiler dep) so it stays light. The sniff covers the small,
 * well-formed entries we control; if the file format ever changes
 * dramatically, update EXTRACT_RE below.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const META_FILE = join(ROOT, "lib", "quest-meta.ts");

if (!existsSync(META_FILE)) {
  console.error(`✗ ${META_FILE} not found`);
  process.exit(1);
}

const src = readFileSync(META_FILE, "utf8");

/**
 * Extract entries that have BOTH validate_io and solution_py.
 *
 * The regex matches the curated meta block:
 *   <id>: { ... validate_io: [ ... ], ... solution_py: [ ... ].join("\n") | "..." ... }
 *
 * Conservative parse — we only handle the shape we actually write
 * in quest-meta.ts. Unknown shapes are skipped silently.
 */
function extractEntries(src) {
  const entries = [];
  // Match each top-level curated block "id: { ... },"
  // We rely on the fact that QUEST_CONCEPT_META entries don't nest objects.
  const blockRe = /(\b\w[\w\d_-]*)\s*:\s*\{([\s\S]*?)\n\s{2}\},/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const id = m[1];
    const body = m[2];
    // Extract validate_io: [{ input: "...", expected: "..." }]
    const ioMatch = body.match(/validate_io:\s*\[([\s\S]*?)\]/);
    // Extract solution_py — either a plain quoted string or a [ ... ].join("\n")
    const pyArrayMatch = body.match(/solution_py:\s*\[([\s\S]*?)\]\.join\(["'`]\\n["'`]\)/);
    const pyStringMatch = body.match(/solution_py:\s*(["'`])([\s\S]*?)\1/);
    if (!ioMatch || (!pyArrayMatch && !pyStringMatch)) continue;

    // Parse validate_io cases
    const cases = [];
    const caseRe = /\{[\s\S]*?input:\s*(["'`])([\s\S]*?)\1[\s\S]*?expected:\s*(["'`])([\s\S]*?)\3[\s\S]*?\}/g;
    let cm;
    while ((cm = caseRe.exec(ioMatch[1]))) {
      cases.push({
        input: unescape(cm[2]),
        expected: unescape(cm[4]),
      });
    }
    if (cases.length === 0) continue;

    // Parse solution_py
    let solution;
    if (pyArrayMatch) {
      // join the literal strings inside the array
      const lines = [];
      const lineRe = /(["'`])([\s\S]*?)\1/g;
      let lm;
      while ((lm = lineRe.exec(pyArrayMatch[1]))) {
        lines.push(unescape(lm[2]));
      }
      solution = lines.join("\n");
    } else {
      solution = unescape(pyStringMatch[2]);
    }

    entries.push({ id, solution, cases });
  }
  return entries;
}

/** Unescape common JS string escapes — \n, \t, \\, \", \' */
function unescape(s) {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}

function runPython(solution, stdin) {
  const r = spawnSync("python3", ["-c", solution], {
    input: stdin,
    encoding: "utf8",
    timeout: 5000,
  });
  if (r.status !== 0 || r.error) {
    return { ok: false, output: "", err: (r.error?.message || "") + (r.stderr || "") };
  }
  return { ok: true, output: r.stdout, err: "" };
}

const entries = extractEntries(src);
console.log(`▶ Validating ${entries.length} quest solution(s)\n`);

let pass = 0;
let fail = 0;
const failures = [];

for (const e of entries) {
  for (let i = 0; i < e.cases.length; i++) {
    const c = e.cases[i];
    const r = runPython(e.solution, c.input);
    const got = r.output.replace(/\s+$/, "");
    const want = c.expected.replace(/\s+$/, "");
    const ok = r.ok && got === want;
    if (ok) {
      pass++;
      console.log(`   ✓ ${e.id} case ${i + 1}`);
    } else {
      fail++;
      const detail = !r.ok
        ? `runtime: ${r.err.slice(0, 200)}`
        : `expected:\n${want.split("\n").map(l => "      " + l).join("\n")}\n   got:\n${got.split("\n").map(l => "      " + l).join("\n")}`;
      console.log(`   ✗ ${e.id} case ${i + 1}\n      ${detail}`);
      failures.push({ id: e.id, case: i + 1, detail });
    }
  }
}

console.log(`\n────────────────────────────────────────`);
console.log(`Quests with sample I/O: ${entries.length}`);
console.log(`Cases run             : ${pass + fail}`);
console.log(`Pass                  : ${pass}`);
console.log(`Fail                  : ${fail}`);
console.log(`────────────────────────────────────────`);

if (fail > 0) {
  console.log(`\n❌ FAIL — ${fail} mismatch(es)`);
  process.exit(1);
}
console.log(`\n✅ PASS — every populated quest's reference solution matches its sample I/O`);
process.exit(0);
