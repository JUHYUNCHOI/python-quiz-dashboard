/* 학생 코드 안의 **한국어 주석**을 영어 화면에서도 읽히게 한다.
 *
 * 왜 (2026-09-11): student-algorithm 이 moohunt 를 **영어 모드**로 따라가다 잡았다 —
 *   "Read 토글은 English 로 되어 있었는데 **코드 주석만 한국어**로 나왔다."
 * 세어 보니 quest **92개 · 715줄**이다. 말풍선(beats)·설명(why)은 전부 이중 언어인데
 * **코드 배열만 한 벌**이라 언어를 바꿔도 주석이 안 바뀐다.
 *
 * 왜 이 방식인가 — quest 파일을 안 건드린다:
 *   92개 중 다수가 🔒 USACO_VERIFIED 다. 그 파일의 코드 배열을 일괄로 손대는 건
 *   `memory/quest_review_progress.md` 의 "표준-맞추기 함정" 이 경고하는 바로 그 작업이다.
 *   (2026-05-06 rounding 2236줄 → 184줄 붕괴가 그렇게 났다.)
 *   그래서 **그리는 자리에서만** 바꾼다. 원본 배열은 그대로 둔다.
 *
 * 못 찾으면 어떻게 되나 — **주석을 지운다.**
 *   영어 학생에게 한국어 주석은 읽을 수 없는 잡음이고, 설명은 이미 말풍선이 한다.
 *   번역이 없는 줄을 한국어로 남겨 두면 "고쳤다" 고 말할 수 없다.
 *   ⚠️ 다만 **주석만 있는 줄을 지우면 줄 번호가 밀려 CodeWalk 의 hi 가 어긋난다.**
 *      그래서 지울 때도 **줄은 남기고 내용만 비운다**(빈 줄로). 줄 수는 절대 안 바뀐다.
 */
import { CODE_COMMENT_EN } from "./codeCommentsEn";

const HANGUL = /[가-힣]/;
/* 주석 시작 — 파이썬 `#` · C++ `//`. 문자열 안의 # 은 건드리지 않는다(아래 참고). */
const PY_LINE = /^(\s*)#(.*)$/;
const CPP_LINE = /^(\s*)\/\/(.*)$/;

/** 줄 하나를 영어로. 번역이 없으면 주석 내용만 비운다(줄 수는 유지). */
function one(line: string): string {
  if (!HANGUL.test(line)) return line;

  /* ① 줄 전체가 주석인 경우 */
  for (const [re, mark] of [[PY_LINE, "#"], [CPP_LINE, "//"]] as const) {
    const m = line.match(re);
    if (!m) continue;
    const body = m[2].trim();
    const en = CODE_COMMENT_EN[body];
    if (en) return `${m[1]}${mark} ${en}`;
    return "";                                   // 못 찾으면 빈 줄 — 줄 수는 그대로다
  }

  /* ② 코드 뒤에 붙은 꼬리 주석. 앞의 코드는 반드시 살린다.
     ⚠️ 문자열 리터럴 안의 # / // 를 주석으로 착각하면 코드가 잘린다.
        따옴표 밖에서 처음 나오는 자리만 본다. */
  let q: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === "\\") i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    const mark = c === "#" ? "#" : line.startsWith("//", i) ? "//" : null;
    if (!mark) continue;
    const head = line.slice(0, i);
    const body = line.slice(i + mark.length).trim();
    if (!HANGUL.test(body)) return line;         // 주석이 한국어가 아니면 그대로
    const en = CODE_COMMENT_EN[body];
    return en ? `${head}${mark} ${en}` : head.replace(/\s+$/, "");
  }
  return line;
}

/** 코드 배열을 화면 언어에 맞춘다. 한국어 화면(E=false)은 원본 그대로. */
export function localizeCode(lines: string[], isEn: boolean): string[] {
  if (!isEn) return lines;
  return lines.map(one);
}
