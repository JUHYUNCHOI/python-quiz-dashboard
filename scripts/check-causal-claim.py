#!/usr/bin/env python3
"""화면이 **인과를 주장하는 자리**를 찾는다 — 「A 덕분에 빨라져요 / A 안 하면 틀려요」.

왜 생겼나 (2026-10-06)
---------------------
선생님이 `makedistinct` 시뮬을 수업에 쓰시다가 연달아 네 번 같은 층을 잡으셨다:

  *"199억번이라는건 뭘? 따로 나머지가 다른것끼리 묶으면 찾는게 더 빠르다는건가?
    **그럼 k=1일때는 소용이 없겠네?**"*

화면은 *"나머지로 나누면 한 번에 건너뛸 수 있어서 그 시간이 사라져요"* 라고 썼고
**거짓이었다.** 199억은 「한 칸씩 더하는」 횟수이고 그걸 없애는 건 **나눗셈 한 줄**이다.
묶기는 속도와 아무 상관이 없다 — K=1 이면 묶음이 하나라 아무 일도 안 하는데 그래도 빠르다.
**선생님이 K=1 반례 하나로 그 주장을 무너뜨리셨다.**

⚠️ **이 층을 잡는 검사기가 하나도 없었다.** `check-prose-vs-final-code.py` 는
「화면이 말한 **자료구조**를 코드가 쓰나」만 본다 — *"묶으면 빨라진다"* 는 자료구조
이름이 아니라서 **원리상 안 걸린다.** 선생님이 이 층을 **세 번** 잡으셨고
**세 번 다 사람이 먼저 찾았다.**
근거: `memory/feedback_turn_the_claim_off.md`

⛔ 이건 **판정이 아니다 — 볼 자리 표시다.**
   주장이 참인지는 **돌려 봐야** 안다. 기계는 「여기서 인과를 주장한다」까지만 말한다.
   걸린 자리마다 사람이 할 일은 하나다:

     ⭐ **그 장치를 끄고 돌려 봐라.** 안 달라지면 그 문장은 거짓이다.
     ⭐ **극단값으로 때려 봐라** — K=1 · N=1 · dom=0 · dom=N.
       선생님이 쓰신 방법이 이것이다. 주장이 무너지는 가장 싼 자리다.

잣대를 왜 이렇게 좁혔나
---------------------
주장 낱말만 보면 **230건**이 나온다(전수 실측) — 태반이 *"그래서 입력이 빨라요"*
같은 혼잣말이라 일상 점검을 못 한다. 그래서 **한 문장 안에 둘이 같이 있을 때만** 센다:

  ① 주장 낱말  — 빨라요 · 덕분에 · 사라져 · 필요 없어 · 줄어들 · 단번에 · 안 하면 …
  ② 장치 이름  — 묶 · 정렬 · 나눗셈 · 나머지 · set · 딕셔너리 · 이분 · 누적합 · 건너뛰 …

실측 **30건 · quest 17개.** 「장치 때문에 좋아진다」는 모양만 남는다.

⚠️ 못 보는 것
  - **주석은 안 본다** (`//` · `/* */`). 기록이지 학생 글이 아니다.
  - **영어는 안 본다** — `t(E, 영어, 한국어)` 의 한국어 쪽만. 영어는 낱말이 달라
    같은 그물로 못 뜬다. 한국어가 틀렸으면 영어도 같이 봐라.
  - **장치 이름을 안 쓰고 주장만 하는 문장**은 못 본다 — *"이러면 빨라져요"*.
    그물을 넓히면 230건이 되고 아무도 안 돌리게 된다. 둘 중에는 이쪽을 골랐다.
  - **참·거짓은 전혀 모른다.** 걸린 30건 중 태반은 참일 것이다(실측: `strangefn`
    5건은 전부 참이었고, 그중 하나는 2026-09-30 에 이미 고쳐진 자리였다).
"""
import re
import sys
import glob
import os

CLAIM = re.compile(
    r"(빨라[요져집]|빨라진|덕분에|사라[져집]|"
    r"필요(?:가)?\s?없|줄어들|줄어듭|훨씬\s?빠르|단번에|한 번에 구|"
    r"안 하면|하지 않으면|안 해도 (?:돼|되)|그 시간이)"
)

DEVICE = re.compile(
    r"(묶|정렬|나눗셈|나머지|set\b|집합|딕셔너리|해시|이분|누적합|"
    r"미리|한 번만|건너뛰|기억해\s?두|표로|나눠|정리해\s?두)"
)


def strip_comments(src: str) -> str:
    """주석을 **길이를 지키며** 지운다 — 줄 번호가 안 밀리게."""
    out = list(src)
    i, n = 0, len(src)
    in_s = None          # 문자열 안인가 (따옴표 문자)
    while i < n:
        c = src[i]
        if in_s:
            if c == "\\":
                i += 2
                continue
            if c == in_s:
                in_s = None
            i += 1
            continue
        if c in "\"'`":
            in_s = c
            i += 1
            continue
        if c == "/" and i + 1 < n and src[i + 1] == "/":
            while i < n and src[i] != "\n":
                out[i] = " "
                i += 1
            continue
        if c == "/" and i + 1 < n and src[i + 1] == "*":
            while i < n and not (src[i] == "*" and i + 1 < n and src[i + 1] == "/"):
                if src[i] != "\n":
                    out[i] = " "
                i += 1
            for _ in range(2):
                if i < n:
                    out[i] = " "
                    i += 1
            continue
        i += 1
    return "".join(out)


def scan(path):
    """(줄번호, 문장) 목록."""
    src = strip_comments(open(path, encoding="utf-8").read())
    hits = []
    for lineno, line in enumerate(src.split("\n"), 1):
        # 한 줄 안에서도 문장으로 쪼갠다 — 「\n」 은 화면의 줄바꿈이다.
        for sent in re.split(r"(?<=[.!?])\s|\\n", line):
            if CLAIM.search(sent) and DEVICE.search(sent):
                hits.append((lineno, sent.strip()))
    return hits


SELFTEST = '''
const a = t(E, "en", "나머지로 묶으면 그 시간이 사라져요.");   // 걸려야 한다
// 나머지로 묶으면 빨라져요 — 주석이라 걸리면 안 된다
const b = t(E, "en", "이러면 빨라져요.");                      // 장치가 없다 — 안 걸린다
const c = t(E, "en", "정렬해 두면 나눗셈 한 번으로 줄어들어요."); // 걸려야 한다
'''


def selftest():
    import tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".jsx", delete=False,
                                     encoding="utf-8") as f:
        f.write(SELFTEST)
        p = f.name
    got = scan(p)
    os.unlink(p)
    lines = {ln for ln, _ in got}
    ok = (2 in lines) and (5 in lines) and (3 not in lines) and (4 not in lines)
    for ln, s in got:
        print(f"   줄 {ln}: {s[:80]}")
    if ok:
        print("✅ 잣대가 살아 있다 — 주장+장치 둘, 주석 0, 장치 없는 주장 0")
        return 0
    print("🚨 **잣대가 죽었다.** 이 검사기의 「0건」을 믿지 마라.")
    print("   기대: 줄 2·5 만 걸린다 (줄 3 은 주석, 줄 4 는 장치 없음)")
    return 1


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if "--selftest" in sys.argv:
        sys.exit(selftest())

    if args:
        files = []
        for q in args:
            files += sorted(glob.glob(f"quest-problems/{q}/*.jsx"))
        if not files:
            print(f"그런 quest 가 없다: {' '.join(args)}")
            sys.exit(2)
    else:
        files = sorted(glob.glob("quest-problems/*/*.jsx"))

    total, quests = 0, set()
    for f in files:
        hits = scan(f)
        if not hits:
            continue
        qid = f.split(os.sep)[1]
        quests.add(qid)
        print(f"\n  📄 {f}")
        for ln, sent in hits:
            total += 1
            print(f"     {ln:>5}  {sent[:150]}")

    print(f"\n화면이 **인과를 주장하는** 자리 — {total}건 · quest {len(quests)}개")
    if not total:
        print("   ⚠️ 0건이 결백이 아니다 — 장치 이름 없이 주장만 하는 문장은 못 본다.")
    print("""
⛔ **판정이 아니다. 볼 자리 표시다.** 참인지는 돌려 봐야 안다.
   걸린 자리마다:
     ⭐ 그 장치를 **끄고 돌려 봐라.** 안 달라지면 그 문장은 거짓이다.
     ⭐ **극단값으로 때려 봐라** — K=1 · N=1 · dom=0 · dom=N.
   ⭐ `--selftest` 로 **잣대가 사는지 먼저** 봐라.
근거: memory/feedback_turn_the_claim_off.md (선생님이 이 층을 세 번 잡으셨다)""")


if __name__ == "__main__":
    main()
