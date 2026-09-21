#!/usr/bin/env python3
"""파란 내레이션 바가 **한 문장으로 끝나나** — 한국어와 영어를 **같이** 잰다.

규칙 (2026-09-03 선생님): *"파란색 부분은 되도록 내용 길게 쓰지마."*
  → `memory/feedback_narration_short.md` : **55자 이하 한 문장.** 설명은 아래 카드·시뮬이 한다.

왜 이 검사기가 생겼나 (2026-09-21): 그동안 **한국어만** 줄였다.
오늘 수업 quest 둘(moohunt·buymilk)을 화면으로 보니 한국어는 30~38자인데
**영어가 60자·71자**였다. 전수로 세니 한국어 중앙값 34자 · **영어 중앙값 98자**였다.
`see-screen.mjs` 도 이걸 잡지만 **한 번에 한 쪽**이라, 눈에 띄는 건 늘
"지금 보고 있는 quest" 뿐이었다. 그래서 파일에서 전수로 센다.

  python3 scripts/check-narr-length.py            # 요약
  python3 scripts/check-narr-length.py moohunt    # 한 quest, 줄까지
  python3 scripts/check-narr-length.py --all      # 전부, 줄까지

## 잣대 — 2026-09-21 판정 (project-lead 에게 확인받고 메인 세션이 정했다)

**뜻은 하나다: narr 은 한 문장이다.** 다만 기계가 재는 숫자는 언어마다 다르게 둔다 —
한국어 음절과 영어 알파벳은 정보 밀도가 달라 **같은 글자 수로 비교하면 틀린다.**

  🚨 **고칠 것**
     · 한국어 — 55자를 넘는다 (선생님이 주신 값)
     · 영어  — **두 문장 이상이면서 150자를 넘는다** (= 문단이다)
  ⚠️ **표시만** (판정 아님 — 사람이 보고 정한다)
     · 영어가 두 문장 이상이지만 150자 이하
     · 영어가 150자를 넘지만 한 문장

실측(2026-09-21): 고칠 것 = 한국어 50곳 · **영어 348곳 · quest 146개.**
⚠️ **한 번에 다 고치지 마라.** 2026-05-06 `rounding` 붕괴가 일괄 작업에서 났다.
   묶음으로 나눠서, 고친 뒤 화면을 보고 다음 묶음으로 간다.
"""
import glob
import io
import json
import re
import sys

KO_MAX = 55
EN_MAX = 150

PAT = re.compile(
    r'narr:\s*t\(E,\s*\n?\s*("(?:[^"\\]|\\.)*")\s*,\s*\n?\s*("(?:[^"\\]|\\.)*")', re.S)
# 숫자 뒤 마침표(0.18초)는 문장 끝이 아니다
END = re.compile(r"(?<![0-9])[.!?](?=\s)")


def sentences(text):
    """글쓴이가 넣은 줄바꿈도 한 문장으로 센다 — 화면에서 줄이 갈리니까."""
    return max(len(text.split("\n")), 1 + len(END.findall(text)))


def scan(path):
    src = io.open(path, encoding="utf-8", errors="replace").read()
    out = []
    for m in PAT.finditer(src):
        try:
            en = json.loads(m.group(1))
            ko = json.loads(m.group(2))
        except ValueError:
            continue
        out.append((en, ko))
    return out


def judge(en, ko):
    """(고칠 것, 표시만) 두 목록"""
    fix, note = [], []
    ko_len = max(len(x) for x in ko.split("\n"))
    if ko_len > KO_MAX:
        fix.append(f"한국어 {ko_len}자 (기준 {KO_MAX}자) — {ko.splitlines()[0][:50]}")
    en_s, en_len = sentences(en), len(en)
    if en_s >= 2 and en_len > EN_MAX:
        fix.append(f"영어 {en_len}자 · {en_s}문장 — 문단이다 — {en[:60]}")
    elif en_s >= 2:
        note.append(f"영어 {en_s}문장 ({en_len}자) — {en[:50]}")
    elif en_len > EN_MAX:
        note.append(f"영어 {en_len}자 한 문장 — {en[:50]}")
    return fix, note


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    detail = bool(args) or "--all" in sys.argv

    fixes, notes = {}, {}
    total = 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if args and quest not in args:
            continue
        for en, ko in scan(f):
            total += 1
            fx, nt = judge(en, ko)
            if fx:
                fixes.setdefault(quest, []).extend(fx)
            if nt:
                notes.setdefault(quest, []).extend(nt)

    n = sum(len(v) for v in fixes.values())
    m = sum(len(v) for v in notes.values())
    print(f"내레이션 바 — **고칠 것 {n}곳 · quest {len(fixes)}개** "
          f"(표시만 {m}곳 · 전체 narr {total}개)\n")
    for q in sorted(fixes, key=lambda x: (-len(fixes[x]), x)):
        print(f"  🚨 {q:<20} {len(fixes[q])}곳")
        if detail:
            for line in fixes[q]:
                print(f"       {line}")
    if not fixes:
        print("  0곳.")
    if detail and notes:
        print("\n  ⚠️ 표시만 (판정 아님):")
        for q in sorted(notes):
            for line in notes[q]:
                print(f"       {q}: {line}")
    if not detail and fixes:
        print("\n  줄까지 보려면: python3 scripts/check-narr-length.py <quest 이름>")
    print("\n잣대: narr 은 **한 문장**이다 — 한국어 55자 · 영어는 '두 문장 이상 + 150자 초과'.")
    print("   설명은 아래 카드·시뮬이 한다. 근거: memory/feedback_narration_short.md")
    print("⚠️ 한 번에 다 고치지 마라 — 묶음으로 나눠라 (2026-05-06 rounding 붕괴).")
    return 1 if fixes else 0


if __name__ == "__main__":
    sys.exit(main())
