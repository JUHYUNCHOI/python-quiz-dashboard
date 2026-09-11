/* ⚠️ 2026-09-11: **지금은 쓸 데가 없다.** 남은 44걸음을 재 보니
 *   SimShell 이관이 아무것도 안 바꿨다 — 상자가 max-height 에 한 번도 안 닿기 때문이다
 *   (▶ 가 가리는 이유는 내용이 자라서가 아니라 시뮬이 페이지 아래쪽에서 시작해서다).
 *   근거와 실측은 커밋 e15a3aaf · check-sim-nav.mjs 헤더 · .claude/WORK.md 에 있다.
 *   **SimShell 이 상자 top 을 스스로 재서 cap 을 정하게 고친 뒤에야** 이 도구가 값을 한다.
 *   그 전에 이걸 돌리면 헛수고다. 지우지 않고 두는 건 그때 다시 쓰려는 것이다. */

/* `padding/paddingBottom` 으로 손수 여백을 준 시뮬을 `SimShell` 로 옮긴다.
 *
 * 왜 (2026-09-10~11): 고정 숫자 여백은 **내용이 자라는 순간 다시 터진다.**
 * sumk 이 그랬다 — `paddingBottom: 110` 을 줬는데 걸음마다 표가 한 줄씩 자라
 * 그 여유를 도로 먹고 ▶ 버튼이 하단 고정 바 밑으로 내려갔다(최대 119px).
 * `SimShell`(components/quest/TraceStepper.tsx:181)이 이걸 위해 이미 있었는데
 * 시뮬 quest 27개 중 printseq 하나만 쓰고 있었다.
 *
 *   node migrate-simshell.mjs <quest-id> [--dry]
 *
 * 바꾸는 것은 딱 두 자리다:
 *   `<div style={{ padding: 16, paddingBottom: N }}>` → `<SimShell ...>`
 *   그 짝인 `<SimNav .../>` 와 닫는 `</div>`        → `</SimShell>`
 * ⚠️ SimNav 를 감싼 `<div style={{ marginTop: N }}>` 도 같이 걷어낸다 — SimShell 이 그 일을 한다.
 */
import fs from "node:fs";

const quest = process.argv[2];
const dry = process.argv.includes("--dry");
if (!quest) { console.log("사용법: node migrate-simshell.mjs <quest-id> [--dry]"); process.exit(2); }
const path = `quest-problems/${quest}/sims.jsx`;
let src = fs.readFileSync(path, "utf8");
const before = src;

// import 에 SimShell 을 넣는다
src = src.replace(/import \{([^}]*)\} from "@\/components\/quest\/TraceStepper";/, (m, inner) =>
  inner.includes("SimShell") ? m : `import {${inner.replace(/\s*$/, "")}, SimShell } from "@/components/quest/TraceStepper";`);

// 여는 태그
let opened = 0;
src = src.replace(/<div style=\{\{ padding: 16, paddingBottom: \d+ \}\}>/g, () => { opened++; return "<SimShellTMP>"; });

// SimNav (+ 감싼 div) 와 그 뒤 닫는 </div> 를 SimShell 닫기로
let closed = 0;
src = src.replace(
  /(?:<div style=\{\{ marginTop: \d+ \}\}>\s*)?<SimNav ([^/]*?)\/>\s*(?:<\/div>\s*)?<\/div>/g,
  (m, props) => { closed++; return `__SIMNAV_PROPS__${props.trim()}__\n    </SimShell>`; }
);

// 여는 태그에 props 를 옮겨 붙인다 (짝 순서대로)
const props = [];
src = src.replace(/__SIMNAV_PROPS__(.*?)__/gs, (m, p) => { props.push(p.trim()); return ""; });
let i = 0;
src = src.replace(/<SimShellTMP>/g, () => `<SimShell ${props[i++] || ""}>`);

console.log(`${quest}: 여는 태그 ${opened}곳 · 닫는 자리 ${closed}곳`);
if (opened !== closed) { console.log("⚠️ 짝이 안 맞는다 — 손으로 봐라. 안 고쳤다."); process.exit(1); }
if (!opened) { console.log("바꿀 자리가 없다."); process.exit(0); }
if (dry) { console.log("--dry: 안 썼다."); process.exit(0); }
fs.writeFileSync(path, src);
console.log("바꿨다:", path, `(${before.length} → ${src.length} bytes)`);
