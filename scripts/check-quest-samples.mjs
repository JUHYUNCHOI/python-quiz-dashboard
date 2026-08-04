#!/usr/bin/env node
/**
 * quest 에 *표시된* 풀이 코드를 그대로 뽑아서 공식 샘플로 돌려본다.
 *
 * 왜 필요한가 (2026-07-30):
 *   MCC 2024 quest 두 개(cornercover, gifts)가 원문과 **완전히 다른 문제**를
 *   설명하고 있었다. 깨진 티가 안 나서 그냥 배우게 되는 게 제일 위험하다.
 *   "내가 확인했다" 는 말로는 부족하니, 기계가 확인하게 만든다.
 *
 * 쓰는 법:
 *   node scripts/check-quest-samples.mjs          # 등록된 quest 전부
 *   node scripts/check-quest-samples.mjs gifts    # 하나만
 *
 * 샘플 추가:
 *   quest-samples/<questId>/in.txt  +  out.txt  를 만들고 아래 REGISTRY 에 한 줄.
 *   in/out 은 반드시 **원문(공식 문제 PDF/사이트)** 에서 그대로 옮길 것.
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** questId → { file, varName, source }  (source = 샘플 출처, 사람이 확인용) */
const REGISTRY = {
  cornercover: { file: "quest-problems/cornercover/components.jsx", varName: "FULL_PY",
                 source: "public/problems/mcc-2024-statements.pdf p.1-2" },
  gifts:       { file: "quest-problems/gifts/components.jsx",       varName: "FULL_PY",
                 source: "public/problems/mcc-2024-statements.pdf p.3-4" },
};

/** components.jsx 의 `const NAME = [ "...", ... ];` 를 실제 코드 문자열로 복원 */
function extractCode(absFile, varName) {
  const src = readFileSync(absFile, "utf8");
  const start = src.indexOf(`const ${varName} = [`);
  if (start < 0) throw new Error(`${varName} 를 못 찾음`);
  const body = src.slice(src.indexOf("[", start) + 1);
  const end = body.indexOf("\n];");
  if (end < 0) throw new Error(`${varName} 의 끝(\\n];)을 못 찾음`);
  return body.slice(0, end).split("\n")
    .map((l) => l.trim().replace(/,$/, ""))
    .filter(Boolean)
    .map((l) => {
      // "문자열"  또는  t(E, "en", "ko")  → 실제 줄
      const m = /^t\(E,\s*("(?:[^"\\]|\\.)*")/.exec(l) || /^("(?:[^"\\]|\\.)*")$/.exec(l);
      if (!m) throw new Error(`코드 배열에 문자열이 아닌 줄: ${l.slice(0, 60)}`);
      return JSON.parse(m[1]);
    })
    .join("\n");
}

const only = process.argv[2];
const ids = only ? [only] : Object.keys(REGISTRY);
let failed = 0;

for (const id of ids) {
  const reg = REGISTRY[id];
  if (!reg) { console.log(`❓ ${id} — REGISTRY 에 없음`); failed++; continue; }

  const dir = join(ROOT, "quest-samples", id);
  const inF = join(dir, "in.txt"), outF = join(dir, "out.txt");
  if (!existsSync(inF) || !existsSync(outF)) {
    console.log(`❓ ${id} — quest-samples/${id}/in.txt · out.txt 없음`); failed++; continue;
  }

  let code;
  try { code = extractCode(join(ROOT, reg.file), reg.varName); }
  catch (e) { console.log(`❌ ${id} — 코드 추출 실패: ${e.message}`); failed++; continue; }

  const input = readFileSync(inF, "utf8");
  const expect = readFileSync(outF, "utf8").trim().split(/\s+/).join(" ");

  let got;
  try {
    got = execFileSync("python3", ["-c", code], { input, encoding: "utf8", timeout: 15000 })
      .trim().split(/\s+/).join(" ");
  } catch (e) {
    console.log(`❌ ${id} — 실행 실패: ${(e.stderr || e.message).toString().split("\n")[0]}`);
    failed++; continue;
  }

  if (got === expect) {
    console.log(`✅ ${id} — 공식 샘플 통과   (${reg.source})`);
  } else {
    console.log(`❌ ${id} — 공식 샘플 불일치   (${reg.source})`);
    console.log(`     기대: ${expect}`);
    console.log(`     결과: ${got}`);
    failed++;
  }
}

console.log(failed
  ? `\n${failed} 개 실패 — quest 가 설명하는 문제와 원문이 다를 수 있습니다.`
  : `\n${ids.length} 개 전부 통과.`);
process.exit(failed ? 1 : 0);
