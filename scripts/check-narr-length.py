#!/usr/bin/env python3
"""파란 내레이션 바가 **한 줄로 끝나나** — 한국어와 영어를 **같이** 잰다.

왜 있나 (2026-09-21): 규칙은 2026-09-03 부터 있었다 —
선생님: *"파란색 부분은 되도록 내용 길게 쓰지마."* (`memory/feedback_narration_short.md`)
그런데 그동안 **한국어만** 줄였다. 오늘 수업 quest 둘(moohunt·buymilk)을 화면으로 보니
한국어는 30~38자인데 **영어가 60자·71자**였다.

`see-screen.mjs` 는 이걸 잡지만 **한 번에 한 쪽**이고 서버가 떠 있어야 한다.
그래서 눈에 띄는 건 늘 "지금 보고 있는 quest" 뿐이었다. 이 검사기는 파일에서 전수로 센다.

  python3 scripts/check-narr-length.py            # 요약
  python3 scripts/check-narr-length.py moohunt    # 한 quest, 줄까지
  python3 scripts/check-narr-length.py --ko       # 한국어만
  python3 scripts/check-narr-length.py --en       # 영어만

⚠️ **영어 기준은 아직 정해지지 않았다.** 한국어 55자는 선생님이 주신 값이고,
   영어는 같은 뜻을 적는 데 글자가 더 든다. 여기서는 일단 한국어 55 · 영어 90 으로 잰다.
   실측(2026-09-21): 영어 55자 초과 **1098곳 · quest 179개**, 90자 초과는 아래 출력 참고.
   **어느 쪽이 맞는지는 선생님 판정 몫이다** — `.claude/WORK.md` 의 해당 항목.
"""
import glob
import io
import json
import re
import sys

KO_MAX = 55
EN_MAX = 90

PAT = re.compile(
    r'narr:\s*t\(E,\s*\n?\s*("(?:[^"\\]|\\.)*")\s*,\s*\n?\s*("(?:[^"\\]|\\.)*")', re.S)


def scan(path):
    """[(영어 최대 줄 길이, 한국어 최대 줄 길이, 영어 첫 줄, 한국어 첫 줄)]"""
    src = io.open(path, encoding="utf-8", errors="replace").read()
    out = []
    for m in PAT.finditer(src):
        try:
            en = json.loads(m.group(1))
            ko = json.loads(m.group(2))
        except ValueError:
            continue
        # 화면에서 줄이 갈리므로 **줄마다** 잰다 (author 가 넣은 \n 이 곧 줄바꿈이다)
        out.append((max(len(x) for x in en.split("\n")),
                    max(len(x) for x in ko.split("\n")),
                    en.split("\n")[0], ko.split("\n")[0]))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    only_ko = "--ko" in sys.argv
    only_en = "--en" in sys.argv
    detail = bool(args)

    rows = {}
    total = 0
    for f in sorted(glob.glob("quest-problems/*/*.jsx")):
        quest = f.split("/")[1]
        if args and quest not in args:
            continue
        for en_len, ko_len, en, ko in scan(f):
            total += 1
            bad = []
            if ko_len > KO_MAX and not only_en:
                bad.append(("한국어", ko_len, KO_MAX, ko))
            if en_len > EN_MAX and not only_ko:
                bad.append(("영어", en_len, EN_MAX, en))
            if bad:
                rows.setdefault(quest, []).append(bad)

    n = sum(len(v) for v in rows.values())
    print(f"내레이션 바가 긴 자리 — {n}곳 · quest {len(rows)}개 "
          f"(전체 narr {total}개 · 기준 한국어 {KO_MAX}자 · 영어 {EN_MAX}자)\n")
    for q in sorted(rows, key=lambda x: (-len(rows[x]), x)):
        print(f"  {q:<20} {len(rows[q])}곳")
        if not detail:
            continue
        for bad in rows[q]:
            for lang, ln, lim, text in bad:
                print(f"      [{lang}] {ln}자 (기준 {lim}) — {text[:70]}")
    if not rows:
        print("  0곳.")
    else:
        print("\n  한 quest 만 줄까지 보려면: python3 scripts/check-narr-length.py <이름>")
    print("\n⚠️ 영어 기준 90자는 **아직 선생님 판정을 못 받은 임시값**이다.")
    print("   한국어 55자만 선생님이 주신 값이다 (2026-09-03).")
    print("   설명은 아래 카드·시뮬이 한다 — 바는 한 문장이다.")
    return 1 if rows else 0


if __name__ == "__main__":
    sys.exit(main())
