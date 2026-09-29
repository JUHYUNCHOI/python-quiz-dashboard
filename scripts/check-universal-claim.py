#!/usr/bin/env python3
"""화면이 **한 경우만 보여주면서** 「언제나 그렇다」고 주장하는 자리를 찾는다.

왜 생겼나 (2026-09-29) — 선생님이 `makedistinct` 5쪽에서 **같은 병을 세 번** 짚으셨다:
  1차 *"이건 k=2일떄만 서로 짝수 홀수 영향을 안주는거잖아"*
  2차 *"두 줄이 어디있으며 이 줄을 가르는 건 왜 k로 나눈 나머지이지?"*
  3차 *"아직도 k=2일때만 짝수와 홀수로 나눠지지 … **k=3일때 k=1일때는 다르잖아.**"*

화면은 **K = 2 하나만** 그려 놓고 말풍선으로 *"K 가 몇이든 똑같아요"* 라고 **주장**했다.
그리고 그 주장은 **실제로 거짓이었다** — 🔒 코드가 `m = abs(k)` 를 쓰므로
  「줄 개수는 K 개」 → K = −2 면 줄이 **2개**
  「작은 값부터」   → K < 0 이면 **큰 값부터 내려간다**
1쪽이 이미 *"K 는 음수여도 되지만 0 은 아니에요"* 라고 말하고 있었다.

⚠️ **그날 검사기 10개가 전부 0건이었다.** 기호(`check-undefined-symbol`)도 아니고
   낱말(`check-word-difficulty`)도 아니다 — **한 장의 그림과 한 문장의 주장 사이**라
   어느 그물에도 안 걸렸다. `quest-auditor` 도 놓쳤다(코드 대 코드만 봤다).

⛔ **판정 도구가 아니다. 볼 자리 표시다. 그리고 「문」 목록에 넣지 마라.**
   「언제나」가 **참인** 자리가 많다(수학적 사실·정의·불변식). 기계는 참·거짓을 모른다.

📉 **실측 정밀도 — 낮다. 만든 사람이 직접 재서 적는다(2026-09-29).**
   좁히기 전 **388곳·quest 105개**(아무도 안 읽을 수). 두 번 좁혀 **16곳·quest 8개**:
     ① 주장 문장이 매개변수 이름(K·N·M)을 말하고
     ② 같은 파일 화면이 그 이름에 **구체값**을 박아 쓰고 (`K = 2` …)
     ③ 둘이 **20자 안**에 붙어 있을 것
   그래도 16곳 중 **눈으로 열어 본 것의 태반이 오탐**이었다 — 표 머리말(`always N−1`),
   유도가 이미 끝난 참인 일반화(`어떤 수든 2^(N-1) 번`), 「입력부터 시작」처럼
   매개변수와 무관한 「언제나」. **사람 대신 못 쓴다**
   (`check-io-card-spoiler.py` 와 같은 급이다).

⭐ **이 결함을 실제로 잡는 것은 이 스크립트가 아니라 «검토자 상시 항목»이다** —
   `ux-reviewer`·`pedagogy-reviewer`·`quest-auditor` 에 배포했다(커밋 `2b1641d6`).
   이 스크립트는 그 검토를 **시작할 자리**를 주는 용도로만 써라.

물음은 늘 같다:
   **이 문장이 「언제나」라고 말하는데, 이 화면에 경우가 몇 개 있나? 하나면 쓸 자격이 없다.**

근거: `memory/feedback_one_case_cannot_claim_always.md`
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 「모든 경우에 참」을 주장하는 말. 한국어·영어 둘 다 본다 —
# 훑기 담당이 한국어만 고치고 영어를 두고 가는 일이 반복됐다.
CLAIM = re.compile(
    r"(언제나|항상|몇이든|얼마든|무엇이든|어떤\s*(값|수|경우|K|N)\s*(이든|든|라도|여도)"
    r"|어느\s*경우(에도|든)|늘\s*(같|똑같)|똑같아요|마찬가지예요|다\s*똑같"
    r"|always|any\s+(K|N|value|number|case)|no\s+matter|in\s+every\s+case|whatever\s+the)"
)

# 이 화면이 **한 경우만** 다루는 낌새. 구체 대입이 보이면 경고를 올린다.
ONE_CASE = re.compile(r"\b([KNMkn])\s*(=|==|는|가|이)\s*(-?\d+)\b|\b([KNM])\s*=\s*(-?\d+)")

# 화면 글이 아닌 것 — 주석·import·스타일은 뺀다.
SKIP_LINE = re.compile(r"^\s*(//|/\*|\*|import\s|export\s+\{|\}\s*from)")


def screen_strings(text: str):
    """t(E, "...", "...") 와 ko:/en: 문자열만 뽑는다. 줄 번호를 같이 준다."""
    out = []
    in_block_comment = False
    for i, line in enumerate(text.split("\n"), 1):
        stripped = line.strip()
        # 여러 줄 주석을 상태로 따라간다 — `check-jsx-markdown.py` 가 처음에
        # «가운데 줄»을 못 걸러 오탐이 태반이었던 그 구멍을 안 되풀이한다.
        if in_block_comment:
            if "*/" in stripped:
                in_block_comment = False
            continue
        if stripped.startswith("/*") and "*/" not in stripped:
            in_block_comment = True
            continue
        if SKIP_LINE.match(line):
            continue
        for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', line):
            s = m.group(1)
            if len(s) >= 6:
                out.append((i, s))
    return out


def scan(path: Path):
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return []
    strings = screen_strings(text)
    # 이 파일이 구체 K·N 값을 화면에 쓰고 있나 (= 한 경우만 보여줄 가능성)
    concrete = sorted({
        f"{m.group(1) or m.group(4)} = {m.group(3) or m.group(5)}"
        for _, s in strings
        for m in ONE_CASE.finditer(s)
    })
    letters = {c.split(" = ")[0] for c in concrete}
    hits = []
    for line_no, s in strings:
        m = CLAIM.search(s)
        if not m:
            continue
        # ⭐ **좁히는 잣대** — 이게 없으면 388곳이 나와 아무도 안 읽는다(실측).
        #    진짜 신호는 「언제나」 그 자체가 아니라
        #      «어떤 값 K 에 대해 언제나» 라고 말하면서 **그 K 를 하나만 그려 놓은** 것이다.
        #    그래서 둘 다 있을 때만 신고한다:
        #      ① 주장 문장이 **매개변수 이름**(K·N·M)을 말하고
        #      ② 같은 파일 화면이 그 이름에 **구체값**을 박아 쓰고 있다 (K = 2 …)
        #    ⚠️ 이 좁힘이 놓치는 것 — 「모든 소는 …」처럼 이름 없이 일반화하는 자리.
        #       그건 사람이 읽어야 한다(아래 「0건이 결백이 아니다」).
        # ⭐ **거리도 본다.** 같은 문장 안에 있다는 것만으로는 부족하다 — 실측:
        #   `printseq` 의 *"언제나 시작은 — 입력부터. main 에서 T, 그리고 케이스마다
        #   N, K, 목표 수열을 읽어요."* 가 6곳이나 걸렸다. 「언제나」는 **코드 읽는 순서**를
        #   말하는 것이고 K 와 아무 상관이 없다. 매개변수를 **그냥 나열**했을 뿐이다.
        #   → 주장하는 말과 매개변수 이름이 **20자 안**에 붙어 있을 때만 신고한다.
        span = m.span()
        said = set()
        for L in ("K", "N", "M"):
            for lm in re.finditer(rf"\b{L}\b", s):
                if min(abs(lm.start() - span[1]), abs(span[0] - lm.end())) <= 20:
                    said.add(L)
                    break
        if not (said & letters):
            continue
        hits.append((line_no, m.group(0), s, sorted(c for c in concrete
                                                    if c.split(" = ")[0] in said)))
    return hits


def main():
    argv = [a for a in sys.argv[1:] if not a.startswith("-")]
    if argv:
        files = []
        for qid in argv:
            files += sorted((ROOT / "quest-problems" / qid).glob("*.jsx"))
    else:
        files = sorted((ROOT / "quest-problems").glob("*/*.jsx"))

    total = 0
    quests = set()
    for f in files:
        hits = scan(f)
        if not hits:
            continue
        rel = f.relative_to(ROOT)
        print(f"\n── {rel}")
        for line_no, word, s, concrete in hits:
            total += 1
            quests.add(f.parent.name)
            short = s if len(s) <= 78 else s[:75] + "…"
            print(f"   {rel}:{line_no}  「{word}」")
            print(f"      {short}")
            if concrete:
                print(f"      ⚠️ 이 파일이 화면에 쓰는 구체값: {', '.join(concrete[:6])}")
                print("         → **그 경우 하나만 그려 놓고 「언제나」라고 말하고 있나?**")

    print(f"\n{'=' * 64}")
    print(f"표시된 자리: {total}곳 · quest {len(quests)}개")
    print("""
⛔ **판정이 아니라 볼 자리 표시다.** 「언제나」가 참인 자리가 많다 — 기계는 참·거짓을 모른다.
   한 곳씩 열어 **이 질문 하나만** 던져라:

     **이 화면에 경우가 몇 개 있나? 하나면 그 문장을 쓸 자격이 없다.**

   쓰고 싶으면 **다른 경우를 나란히 놓아라.** `makedistinct` 는 K = 1 · 2 · 3 을
   한 눈에(줄 1개 / 2개 / 3개) 놓아 풀었다 — 「다르다」와 「무엇이 같나」가 동시에 보인다.
   ⭐ 그리고 **특수한 경우의 이름을 규칙 이름으로 쓰지 마라**
     (❌「홀수 줄/짝수 줄」= K=2 전용 · ⭕「K 로 나눈 나머지」).
   ⚠️ 제약의 **끝값**(음수·0·최댓값)에서 반례를 찾아라 — 오늘 거짓이 거기 있었다.

⚠️ **0건이 결백이 아니다.** 이 검사기는 **말**만 본다. 「언제나」라고 **안 쓰고도**
   한 경우를 규칙처럼 가르칠 수 있다 — 그게 원래 더 흔한 모양이다.
   근거: memory/feedback_one_case_cannot_claim_always.md""")
    return 0


if __name__ == "__main__":
    sys.exit(main())
