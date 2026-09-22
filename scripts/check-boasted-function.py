#!/usr/bin/env python3
"""화면이 **자랑하는 함수**를 코드가 실제로 쓰나.

왜 (2026-09-22): 학생 **둘이 각각 독립적으로** 같은 걸 짚었다.

  wordproc 학생: "'Python 은 list, map, sorted 덕분에 코드가 짧아져요' 라고 써 있는데
                  **실제 코드 어디에도 sorted() 가 없음.** 왜 나왔는지 모르겠음."
  alchemy  학생: "실제 코드에는 sorted 가 한 번도 안 나와요.
                  **이건 저도 이상하다고 느꼈어요.**"

세어 보니 **quest 88개가 이 문구를 쓰는데 그중 81개가 `sorted` 를 안 쓴다.**
한 문장이 템플릿으로 복사돼 퍼진 것이다.

이 저장소의 기준은 *"정직한 내용 — 수식과 검증된 사실만. 짐작을 적지 않는다"* 다.
그리고 **학생이 알아챈다.** 하루에 둘이 알아챘다.

검사 방법이 **순수 카운팅**이라 오탐이 구조적으로 불가능하다 —
글에서 함수 이름을 뽑고, **코드 배열 안에서** 호출 횟수를 센다.
(코드 배열 밖은 안 센다. JSX 의 `sections.map(...)` 을 파이썬 `map` 으로 세면 안 된다.)
"""
import glob
import io
import json
import re
import sys

STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
CODE_ARRAY = re.compile(r"\[\s*\n((?:[ \t]*\"(?:[^\"\\]|\\.)*\",[ \t]*\n)+)[ \t]*\]")

# 자랑 문구에 나올 만한 파이썬 내장 — 아는 것만. 새로 보이면 여기 더해라.
# ⚠️ `list`·`dict`·`set` 는 **일부러 뺐다.** 파이썬은 [...] · {...} 리터럴로 쓰기 때문에
#    `list(` 호출이 없어도 "list 를 쓴다" 는 말은 참이다. 넣었더니 바로 오탐이 났다.
WATCH = ("sorted", "map", "filter", "zip", "enumerate", "reversed",
         "sum", "min", "max", "any", "all")

# "이 언어 덕분에 짧다" 류 자랑 문장인가. 함수 이름만 스쳐도 다 잡으면 소음이 된다.
BOAST = re.compile(r"(덕분에|있어서|쓰면|make[s]?\s+\w+\s+concise|high-level|간결|짧)")


def code_text(src):
    """코드 배열 안의 글만 모은다 — 화면 글·JSX 는 뺀다."""
    out = []
    for m in CODE_ARRAY.finditer(src):
        for sm in STR.finditer(m.group(1)):
            try:
                out.append(json.loads('"%s"' % sm.group(1)))
            except Exception:
                pass
    return "\n".join(out)


def main():
    raw = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in raw for x in a.split()) or None

    hits = {}
    seen = 0
    for d in sorted(glob.glob("quest-problems/*/")):
        quest = d.strip("/").split("/")[-1]
        if want and quest not in want:
            continue
        src = "".join(io.open(f, encoding="utf-8", errors="replace").read()
                      for f in glob.glob(d + "*.jsx"))
        code = code_text(src)
        if not code:
            continue

        claims = []
        for m in STR.finditer(src):
            try:
                t = json.loads('"%s"' % m.group(1))
            except Exception:
                continue
            if not BOAST.search(t):
                continue
            named = [w for w in WATCH if re.search(r"\b" + w + r"\b", t)]
            if len(named) >= 2:          # 나열해서 자랑하는 자리만
                claims.append((t, named))
        if not claims:
            continue
        seen += 1

        for t, named in claims:
            missing = [w for w in named
                       if not re.search(r"\b" + w + r"\s*\(", code)]
            if missing:
                hits.setdefault(quest, []).append((t, named, missing))

    total = sum(len(v) for v in hits.values())
    scope = f" (quest={', '.join(sorted(want))})" if want else ""
    print(f"코드가 **안 쓰는데 화면이 자랑하는** 함수 — {total}건 · quest {len(hits)}개"
          f" (자랑 문구가 있는 quest {seen}개){scope}\n")

    for quest in sorted(hits):
        for t, named, missing in hits[quest]:
            print(f"  ■ {quest} — 안 쓰는 것: {', '.join(missing)}")
            print(f"      \"{t[:88]}\"")
            print(f"      (문구가 든 이름: {', '.join(named)})\n")

    if total:
        print("  고치는 법: **안 쓰는 이름만 문구에서 빼라.** 문장을 새로 쓰지 마라.")
        print("  ⚠️ quest 마다 쓰는 게 다르다 — 한 문장으로 일괄 치환하면 또 거짓이 된다.")
    print("\n⚠️ 코드 배열 안만 센다. JSX 의 `sections.map(...)` 은 파이썬 map 이 아니다.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
