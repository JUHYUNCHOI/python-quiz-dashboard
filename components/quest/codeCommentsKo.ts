/* 학생 코드 안 **영어 주석**의 한국어 번역표. `localizeCode.ts` 가 쓴다.
 *
 * 왜 (2026-09-21): `codeCommentsEn.ts` 는 2026-09-11 에 생겼는데 **한 방향뿐**이었다 —
 * 영어 학생이 한국어 주석을 못 읽는 문제만 봤다. **반대는 아무도 안 봤다.**
 * `makedistinct` 재검증 학생이 잡았다:
 *   *"`# Group indices by residue mod |K|` 의 `residue` 는 뜻을 몰랐다.
 *     한국어 모드인데 주석이 번역 안 되어 있었다."*
 * 전수로 세니 **317줄 · quest 53개**다
 * (printseq 20 · photoshoot 16 · interview 15 · astral 14 · oddphotos 14 …).
 *
 * 왜 quest 파일을 안 고치나 — `codeCommentsEn.ts` 와 같은 이유다.
 *   53개 중 다수가 🔒 `USACO_VERIFIED` 이고, 코드 배열을 일괄로 손대는 건
 *   `memory/quest_review_progress.md` 의 "표준-맞추기 함정" 이 경고하는 작업이다.
 *   **원본은 그대로 두고 그리는 자리에서만** 바꾼다.
 *
 * 없는 문장은 어떻게 되나 — `localizeCode` 가 그 줄을 **비운다**(줄 수는 유지).
 *   ⚠️ 이건 "번역을 포기한다" 가 아니라 **"모르는 말을 남겨두지 않는다"** 는 쪽이다.
 *   설명은 이미 CodeWalk 말풍선이 두 언어로 한다.
 *   project-lead 판정(2026-09-21): 317줄짜리 표를 먼저 다 채울 필요는 없다.
 *   로직부터 넣고 표는 필요할 때 늘린다 — `codeCommentsEn.ts` 도 그렇게 자랐다.
 *
 * 늘리는 법 — 키는 **주석 기호(`#`/`//`)를 뗀 뒤 trim 한 그대로**.
 *   남은 목록: `python3 scripts/list-english-comments.py`
 */
export const CODE_COMMENT_KO: Record<string, string> = {
  // ── makedistinct (USACO Feb 2026 Bronze #1) ───────────────────────────────
  "Group indices by residue mod |K| (a += K never changes residue)":
    "|K| 로 나눈 나머지끼리 묶어요 (K 를 더해도 나머지는 안 바뀌어요)",
  "Group by residue mod |K|": "|K| 로 나눈 나머지끼리 묶어요",
  "K > 0 → sort ascending; K < 0 → sort descending":
    "K 가 양수면 오름차순, 음수면 내림차순으로 정렬해요",
  "first slot stays put": "첫 값은 그 자리에 그대로 둬요",
  "If next value already past cur, keep it; else push cur + K":
    "다음 값이 이미 앞서 있으면 그대로, 아니면 cur + K 로 밀어요",
};
