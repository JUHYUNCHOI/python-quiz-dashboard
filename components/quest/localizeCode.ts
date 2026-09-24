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
import { CODE_COMMENT_KO } from "./codeCommentsKo";

const HANGUL = /[가-힣]/;
/* 영어 낱말이 들어 있나 — 한국어 화면에서 **영어로만 된 주석**을 가려낼 때 쓴다.
   기호·숫자만 있는 주석(`x += K`)은 언어가 없으니 건드리지 않는다. */
const LATIN_WORD = /[A-Za-z]{3,}/;
/* 주석 시작 — 파이썬 `#` · C++ `//`. 문자열 안의 # 은 건드리지 않는다(아래 참고). */
const PY_LINE = /^(\s*)#(.*)$/;
const CPP_LINE = /^(\s*)\/\/(.*)$/;

/* 이 코드가 어느 언어인가.
   ⚠️ 왜 필요한가 (2026-09-17): 파이썬의 `//` 는 **나눗셈**이지 주석이 아니다.
      언어를 모르고 `//` 를 주석으로 보면
      `buy_up = (left + block_size - 1) // block_size    # 올림 나눗셈`
      이 `buy_up = (left + block_size - 1)` 로 **잘린다** — 영어 학생에게 깨진 코드가 간다.
      실측 7줄(buymilk 1 · explodingarrow 6)이 이 모양이었다.
   ⚠️ 이건 **폴백**이다 (2026-09-24) — 호출부가 `lang` 을 이미 알면서도 안 넘기면
      이 추측에 기댄다. **코드를 섹션별로 쪼개 보여주는 quest** 는 조각에 `#include` 가
      없어서(예: `vector<long long> used;` 로 시작하는 C++ 조각) 여기서 파이썬으로
      오판됐다 — 오판되면 `//` 주석을 못 찾아 **주석을 지우는 로직이 안 돌고
      한국어 원문이 영어 화면에 그대로 나갔다**(makedistinct 실측). 새 호출부는
      반드시 `lang` 을 넘겨라. */
function isCpp(lines: string[]): boolean {
  return lines.some((l) => /^\s*(#include|using namespace|int main|template\s*<)/.test(l));
}

/** 줄 하나를 **대상 언어**로. 번역이 없으면 주석 내용만 비운다(줄 수는 유지).
 *
 * `toEn` 이 true 면 한국어 주석 → 영어, false 면 영어 주석 → 한국어.
 * ⚠️ 두 방향 모두 **주석만** 본다. 코드는 한 글자도 안 건드린다.
 */
function one(line: string, cpp: boolean, toEn: boolean): string {
  const TABLE = toEn ? CODE_COMMENT_EN : CODE_COMMENT_KO;
  /* 번역이 없을 때 — **방향마다 다르다.** (2026-09-21 project-lead 정정)
   *
   *   한국어 → 영어 : 줄을 **비운다.** 영어 학생에게 한국어 주석은 아예 못 읽는 글자라,
   *                   빈 줄이 그보다 낫다. 없애는 게 **개선**인 방향이다.
   *   영어 → 한국어 : **원문을 그대로 둔다.** 한국어 학생에게 영어 주석은 읽기 어렵긴 해도
   *                   못 읽는 글자는 아니다(코드 안 이름도 원래 영어다).
   *                   여기서 비우면 **이미 있던 정보를 없애는 것**이라 퇴보다.
   *
   * ⚠️ 처음엔 같은 정책을 두 방향에 그대로 썼다. 표를 안 채운 채 켜면
   *    한국어 화면에서 주석 **435개가 사라진다**(실측)는 걸 세어 보고 나서 갈랐다.
   *    교훈 — **한 방향 정책을 반대 방향에 재사용할 땐, 그 방향에서 폴백이
   *    개선인지 퇴보인지부터 확인해라.** */
  const fallback = (line: string, head: string) => (toEn ? head : line);
  /* 바꿀 대상인 주석인가 — 영어로 갈 때는 한글이 있어야 하고,
     한국어로 갈 때는 **한글이 없고 영어 낱말이 있어야** 한다. */
  const isTarget = (body: string) =>
    toEn ? HANGUL.test(body) : (!HANGUL.test(body) && LATIN_WORD.test(body));
  if (toEn ? !HANGUL.test(line) : HANGUL.test(line)) return line;

  const MARKS = cpp
    ? ([[CPP_LINE, "//"]] as const)
    : ([[PY_LINE, "#"]] as const);

  /* ① 줄 전체가 주석인 경우 */
  for (const [re, mark] of MARKS) {
    const m = line.match(re);
    if (!m) continue;
    const body = m[2].trim();
    if (!isTarget(body)) return line;            // 바꿀 대상이 아니면 그대로
    const to = TABLE[body];
    if (to) return `${m[1]}${mark} ${to}`;
    return fallback(line, "");                   // 영어로 갈 땐 빈 줄, 한국어로 갈 땐 원문
  }

  /* ② 코드 뒤에 붙은 꼬리 주석. 앞의 코드는 반드시 살린다.
     ⚠️ 문자열 리터럴 안의 # / // 를 주석으로 착각하면 코드가 잘린다.
        따옴표 밖에서 처음 나오는 자리만 본다. */
  let q: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === "\\") i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    /* 파이썬에서는 `#` 만, C++ 에서는 `//` 만 주석이다 — 섞어 보면 코드가 잘린다. */
    const mark = cpp
      ? (line.startsWith("//", i) ? "//" : null)
      : (c === "#" ? "#" : null);
    if (!mark) continue;
    const head = line.slice(0, i);
    const body = line.slice(i + mark.length).trim();
    if (!isTarget(body)) return line;            // 바꿀 대상이 아니면 그대로
    const to = TABLE[body];
    if (to) return `${head}${mark} ${to}`;
    return fallback(line, head.replace(/\s+$/, ""));
  }
  return line;
}

/** 코드 배열을 화면 언어에 맞춘다 — **양방향**이다.
 *
 * 영어 화면: 한국어 주석 → 영어 (2026-09-11, quest 92개·1189줄)
 * 한국어 화면: 영어 주석 → 한국어 (2026-09-21, quest 53개·317줄)
 *
 * ⚠️ 2026-09-21 이전에는 `if (!isEn) return lines;` 였다 —
 *    한국어 화면은 **아무것도 안 했다.** 그래서 한국어 학생이
 *    `# Group indices by residue mod |K|` 를 그대로 보고 있었다.
 *
 * @param lang **호출부가 이미 알면 반드시 넘겨라.** (`"py" | "cpp"`)
 *   안 넘기면(`undefined`) `isCpp()` 추측으로 되돌아간다 — 그 추측은
 *   `#include`·`int main` 같은 줄이 배열 **안**에 있어야만 C++ 로 본다.
 *   섹션별로 쪼갠 C++ 코드 조각(헤더 없이 시작)은 이 추측에서 파이썬으로
 *   오판돼 주석이 안 지워지고 한국어가 그대로 새어 나간다 (2026-09-24, makedistinct).
 */
export function localizeCode(lines: string[], isEn: boolean, lang?: "py" | "cpp"): string[] {
  const cpp = lang ? lang === "cpp" : isCpp(lines);
  return lines.map((l) => one(l, cpp, isEn));
}
