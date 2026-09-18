#!/usr/bin/env python3
"""코드 말풍선이 **파일 순서**를 읊나, **생각의 순서**로 이끄나.

왜 (2026-09-18): 선생님이 moohunt 코드 쪽을 보시고
  *"코드 설명을 생각의 순서대로 설명해줘"*
첫 말풍선이 **"필요한 헤더를 적고, N 과 K 를 읽어요"** 였다. 생각이 0 이다.
학생은 코드를 끝까지 보고도 **왜 그렇게 짰는지**는 모른 채 나간다.

⚠️ 이건 2026-07-14 에 이미 받은 규칙이다 — `memory/feedback_quest_code_codewalk.md`
   *"설명 말풍선을 코드 줄에 붙여 **생각 순서**·입력부터 스텝별."*
   규칙은 있었는데 **검사 항목이 아니어서** 새로 쓴 말풍선이 매번 파일 순서로 돌아갔다.
   (`feedback_code_one_statement_per_line.md` 와 똑같은 실패 모양이다.)

무엇을 보나 — 두 가지다.

  ① **첫 말풍선이 목적지를 말하나.** 첫 걸음이 "읽어요 / 적어요 / 준비해요" 로만
     끝나면, 학생은 **어디로 가는지 모른 채** 코드를 따라 걷기 시작한다.
     좋은 첫 걸음은 "무엇을 내놓아야 하나요? → 그러니 이렇게 할 거예요" 다.

  ② **walk 전체에 '왜' 가 한 번이라도 있나.** 질문("~할까요?" · "왜") 이나
     이유 이음말("그래서 · 그러니 · 니까 · 때문") 이 한 번도 없으면
     그 walk 은 처음부터 끝까지 **무엇을 하는지만** 말하고 있다.

  python3 scripts/check-codewalk-thinking-order.py            # 전체
  python3 scripts/check-codewalk-thinking-order.py buymilk    # 하나만
  python3 scripts/check-codewalk-thinking-order.py --list     # quest 이름만

⚠️ 판정이 아니라 **볼 자리 표시**다. 기계는 '생각의 순서' 를 못 읽는다 —
   말버릇만 센다. 0 건이 결백이 아니고, 걸린 것이 전부 틀린 것도 아니다.
   걸린 자리를 **화면에서 눈으로** 읽어라.
"""
import glob
import io
import json
import os
import re
import sys

# beats 안의 한 걸음 — hi 범위 + 한국어 말풍선
BEAT = re.compile(
    r'hi:\s*\[\s*\d+\s*,\s*\d+\s*\]\s*,\s*bubble:\s*t\(\s*E\s*,\s*'
    r'"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)'
)

# ① 첫 걸음이 이것'만' 하고 끝나면 목적지가 없다
MECHANICS = re.compile(
    r"(읽어요|읽기|적어요|적고|받아요|불러와요|가져와요|준비해요|선언해요|만들어요|"
    r"헤더|import|입력을|빠르게 받)"
)
# 목적지·계획을 말하는 말버릇 — 하나라도 있으면 첫 걸음은 통과
DESTINATION = re.compile(
    # 목적지·계획을 말하는 말버릇
    r"(무엇을|뭘|어디|답은|답을|내놓|구할|구해야|목표|할 거예요|하려고|"
    r"세 가지|두 걸음|먼저 .*할|그러니|그래서|왜|\?|～|할까요|일까요|"
    # 앞 풀이의 **한계**를 짚고 시작하는 것도 훌륭한 목적지다
    # ("브루트는 물음마다 다시 훑어서 너무 느렸어요" → 그래서 표를 만든다)
    r"느렸|느려|다시 훑|안 바뀌|바뀌지 않|미리|같은 생각|한 번만)"
)
# ② walk 전체에 '왜' 가 있나
WHY = re.compile(r"(왜|할까요|일까요|\?|그래서|그러니|니까|때문|덕분|아니면|대신)")

SKIP_DIRS = {"node_modules"}


def walks(src):
    """파일 안의 walk 하나하나를 (이름, [(en, ko), ...]) 로 끊어 낸다.

    `return { code: ..., beats: [ ... ] }` 가 한 파일에 둘 이상 있다
    (파이썬용·C++ 용). 그래서 `beats: [` 를 경계로 나눈다.
    """
    out = []
    for m in re.finditer(r"beats:\s*\[", src):
        # 대괄호 짝을 세어 이 beats 배열의 끝을 찾는다
        i, depth = m.end() - 1, 0
        while i < len(src):
            if src[i] == "[":
                depth += 1
            elif src[i] == "]":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        chunk = src[m.end():i]
        beats = []
        for b in BEAT.finditer(chunk):
            try:
                beats.append((json.loads('"%s"' % b.group(1)),
                              json.loads('"%s"' % b.group(2))))
            except Exception:
                continue
        if beats:
            # 이 walk 이 파이썬용인지 C++ 용인지 — 바로 앞 `code:` 를 본다
            head = src[max(0, m.start() - 160): m.start()]
            lang = "cpp" if "CPP" in head else ("py" if "PY" in head else "?")
            out.append((lang, beats))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    want = set(x for a in args for x in a.split()) or None
    only_names = "--list" in sys.argv

    hits = {}
    total_walks = 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if want and quest not in want:
            continue
        try:
            src = io.open(f, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        for lang, beats in walks(src):
            total_walks += 1
            first_ko = beats[0][1]
            head = first_ko.split("\n")[0]
            problems = []
            if MECHANICS.search(first_ko) and not DESTINATION.search(first_ko):
                problems.append(("첫 걸음에 목적지가 없다", head))
            body = "\n".join(k for _, k in beats)
            if not WHY.search(body):
                problems.append((f"walk 전체({len(beats)}걸음)에 '왜' 가 한 번도 없다", head))
            if problems:
                hits.setdefault(quest, []).append((os.path.basename(f), lang, problems))

    if only_names:
        for q in sorted(hits):
            print(q)
        return 1 if hits else 0

    n = sum(len(v) for v in hits.values())
    print(f"파일 순서로 읊는 코드 설명 — walk {n}개 · quest {len(hits)}개 "
          f"(전체 walk {total_walks}개)\n")
    for q in sorted(hits, key=lambda x: (-len(hits[x]), x)):
        print(f"  ■ {q}")
        for fname, lang, problems in hits[q]:
            for why, head in problems:
                print(f"      {fname} ({lang})  {why}")
                print(f"        첫 걸음: {head[:60]}")
        print()

    print("⚠️ 판정이 아니라 **볼 자리 표시**다. 기계는 '생각의 순서' 를 못 읽는다 — 말버릇만 센다.")
    print("   좋은 첫 걸음: \"무엇을 내놓아야 하나요? → 그러니 이렇게 할 거예요\"")
    print("   나쁜 첫 걸음: \"필요한 헤더를 적고, N 과 K 를 읽어요\"  (생각이 0 이다)")
    print("   근거: memory/feedback_quest_code_codewalk.md (2026-07-14)")
    return 1 if n else 0


if __name__ == "__main__":
    sys.exit(main())
