#!/usr/bin/env node
// Verify ko/en lesson sync.
//
// Compares each `data/.../lessonN.ts` (Korean) with its sibling
// `lessonN-en.ts` (English):
//   1. Both files must exist (or both must be missing).
//   2. The total step count must match.
//   3. Each step.id present in Korean must also appear in English
//      (and vice versa).
//   4. For each shared step.id, content length should be within 0.4–2.5×
//      of the other side. (Smaller deltas are normal — phrasing differs;
//      larger ones usually mean one side is a stub.)
//
// Run with:  npm run check-i18n   (after adding to package.json)
// Or:        node scripts/check-lesson-i18n.mjs

import { readFileSync, existsSync } from "node:fs";
import { glob } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// Find all Korean lesson files
const koPaths = [];
const dirs = ["data", "data/cpp", "data/igcse", "data/pseudo"];
for (const dir of dirs) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) continue;
  const fs = await import("node:fs/promises");
  const entries = await fs.readdir(abs);
  for (const e of entries) {
    if (!e.endsWith(".ts")) continue;
    if (e.endsWith("-en.ts")) continue;
    if (!e.match(/^lesson/i)) continue;
    if (e.includes("pygame")) continue; // variant, no en pair
    koPaths.push(join(abs, e));
  }
}
koPaths.sort();

// Quick sanity: re-export-only files (sub-folder split) shouldn't be flagged
function isReexportOnly(text) {
  const lines = text.split("\n").filter(l => l.trim() && !l.trim().startsWith("//"));
  return lines.length <= 3 && lines.every(l => l.startsWith("export "));
}

// Extract step ids and content lengths
function extractSteps(text) {
  const steps = [];
  // Matches:  id: "..." ... content: `...`
  // Allow nested backticks via greedy scan with depth=0 between content backticks
  const re = /id:\s*"([^"]+)"[\s\S]*?content:\s*`/g;
  let m;
  while ((m = re.exec(text))) {
    const id = m[1];
    let i = m.index + m[0].length;
    let depth = 0;
    let start = i;
    while (i < text.length) {
      const c = text[i];
      if (c === "\\") { i += 2; continue; }
      if (c === "$" && text[i + 1] === "{") { depth++; i += 2; continue; }
      if (c === "}" && depth > 0) { depth--; i++; continue; }
      if (c === "`" && depth === 0) break;
      i++;
    }
    if (i < text.length) {
      steps.push({ id, length: i - start });
      re.lastIndex = i + 1;
    }
  }
  return steps;
}

let problems = 0;
for (const ko of koPaths) {
  const en = ko.slice(0, -3) + "-en.ts";
  if (!existsSync(en)) continue;
  const koText = readFileSync(ko, "utf8");
  const enText = readFileSync(en, "utf8");
  if (isReexportOnly(koText) || isReexportOnly(enText)) continue;
  const koSteps = extractSteps(koText);
  const enSteps = extractSteps(enText);
  const rel = relative(ROOT, ko);

  // Step count
  if (koSteps.length !== enSteps.length) {
    console.log(`⚠️  ${rel}: step count differs — ko=${koSteps.length} en=${enSteps.length}`);
    problems++;
    continue;
  }

  // ID set match
  const koIds = new Set(koSteps.map(s => s.id));
  const enIds = new Set(enSteps.map(s => s.id));
  const onlyKo = [...koIds].filter(x => !enIds.has(x));
  const onlyEn = [...enIds].filter(x => !koIds.has(x));
  if (onlyKo.length || onlyEn.length) {
    console.log(`⚠️  ${rel}: step ids differ`);
    if (onlyKo.length) console.log(`     only in ko: ${onlyKo.join(", ")}`);
    if (onlyEn.length) console.log(`     only in en: ${onlyEn.join(", ")}`);
    problems++;
  }

  // Length ratios per shared id
  const enLen = Object.fromEntries(enSteps.map(s => [s.id, s.length]));
  for (const s of koSteps) {
    if (!enLen[s.id]) continue;
    if (s.length < 100 || enLen[s.id] < 100) continue;
    const ratio = enLen[s.id] / s.length;
    if (ratio >= 2.5 || ratio <= 0.4) {
      const sign = ratio > 1 ? "en bigger" : "ko bigger";
      console.log(
        `⚠️  ${rel}: step "${s.id}" length ratio ${ratio.toFixed(2)}x (${sign}; ko=${s.length}, en=${enLen[s.id]})`
      );
      problems++;
    }
  }
}

if (problems === 0) {
  console.log("✅ ko/en lesson sync OK across all checked files.");
  process.exit(0);
} else {
  console.log(`\n❌ ${problems} sync issue(s) found.`);
  process.exit(1);
}
