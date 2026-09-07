#!/usr/bin/env python3
"""quest 관련 숫자를 세는 **하나뿐인 자리.** 손으로 grep 해서 세지 마라.

왜 있나 (2026-09-07):
  이 날 하루에 quest 개수를 **네 번** 틀리게 셌다. 나도, 서브에이전트도.
    ① "입출력 카드 없는 MCC 18개" — project-lead 목록에 USACO 가 섞여 있었다 → 9개
    ② 그 9개도 틀렸다. 내 grep 이 `"INPUT", "입력"` 만 봐서 📥 이모지로 쓴 카드를
       전부 "없음" 으로 셌다 → 진짜 없는 건 **2개**. 에이전트 셋을 헛돌린 뒤에야 알았다.
    ③ "Bronze→심화 어긋남" 검사기를 넓게 잡았다가 헛 경보 **18건**
    ④ "MCC 30개 · CodeWalk 0개" — 실제로는 **48개 · 6개**
  매번 "직접 세라" 고 시켰는데도 그랬다. **지시로는 안 고쳐진다.**
  세는 규칙을 여기 한 곳에 두고, 사람과 에이전트는 이걸 돌려서 인용한다.

쓰는 법:
  python3 scripts/count-quests.py              # 사람이 읽는 표
  python3 scripts/count-quests.py --list io    # 그 항목에 걸린 quest 이름까지
  python3 scripts/count-quests.py --json       # 에이전트용

⚠️ **숫자만 쓰지 말고 근거를 같이 인용해라.** 이 스크립트는 무엇을 어떤 패턴으로 셌는지
   같이 찍는다. 숫자가 이상하면 패턴을 의심하는 게 맞다 — 위 ②가 그 경우다.
"""
import argparse
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QDIR = os.path.join(ROOT, "quest-problems")

# 🔒 동결 quest — 명시적 요청 전엔 읽기 전용. 세는 데서도 뺀다(고칠 대상이 아니므로).
FROZEN = {"hps", "cowphotos", "rounding", "cheese", "moo", "mooin3", "checkups"}

# 입출력 형식 카드를 찾는 패턴. **넓게** 잡는다 — quest 마다 표기가 다르다.
#   📥/📤 이모지 · "INPUT"/"OUTPUT" 라벨 · 한국어 "입력 형식" · "Input"/"Output" 박스 제목
# 2026-09-07: 이 패턴이 좁아서 7개를 "없음" 으로 잘못 셌다. 넓히는 쪽이 안전하다 —
# 있는데 없다고 하면 헛일을 시키고, 없는데 있다고 하면 놓칠 뿐이다. 둘 다 나쁘지만
# 전자가 에이전트 셋을 헛돌린 실제 사고였다.
IO_CARD = re.compile(
    r'📥|📤|"INPUT"|"OUTPUT"|입력 형식|출력 형식|"Input"|"Output"|Input Format|입력 / 출력'
)
CODEWALK = re.compile(r"<CodeWalk\b")
PROGRESSIVE = re.compile(r"<\w*ProgressiveCode\b")


def read(path):
    with open(path, encoding="utf-8", errors="ignore") as f:
        return f.read()


def quest_text(qid):
    """그 quest 폴더의 모든 소스를 이어 붙인 것. 없으면 None."""
    d = os.path.join(QDIR, qid)
    if not os.path.isdir(d):
        return None
    out = []
    for f in sorted(os.listdir(d)):
        if f.endswith((".jsx", ".tsx", ".js", ".ts")):
            out.append(read(os.path.join(d, f)))
    return "\n".join(out) if out else None


def collect():
    data = read(os.path.join(ROOT, "app/quest/[problemId]/data.ts"))
    # 카탈로그에 실린 quest 가 기준이다. 폴더만 있고 카탈로그에 없으면 학생은 못 본다.
    rows = re.findall(r'\{id:"([^"]+)"[^}]*?sub:"([^"]*)"[^}]*?section:"([^"]*)"', data)
    folders = {q for q in os.listdir(QDIR)
               if os.path.isdir(os.path.join(QDIR, q)) and not q.startswith(".")}

    md = read(os.path.join(ROOT, "lib/mcc-difficulty.ts"))
    diff = {k: int(v) for k, v in re.findall(r"(\w+):\s*(\d)", md)}

    quests = []
    for qid, sub, section in rows:
        t = quest_text(qid)
        quests.append({
            "id": qid,
            "section": section,
            "frozen": qid in FROZEN,
            "has_folder": t is not None,
            "io_card": bool(IO_CARD.search(t)) if t else None,
            "codewalk": bool(CODEWALK.search(t)) if t else None,
            "progressive": bool(PROGRESSIVE.search(t)) if t else None,
            # 난이도는 출처가 두 가지다 (lib/quest-difficulty.ts).
            #   감사값 = MCC 48개, 사람이 하나씩 보고 매긴 값
            #   추정치 = 그 외, 문제 번호로 유추 (Bronze #1→2, #2→3, #3→4)
            # 화면은 둘을 똑같은 Lv 뱃지로 보여준다. 세는 자리에서라도 갈라 둔다.
            "difficulty": diff.get(qid),
            "diff_source": ("감사값" if qid in diff
                            else "추정치" if re.search(r"Bronze\s*#\s*\d|\bP\d\b", sub or "")
                            else None),
        })
    orphan = sorted(folders - {r[0] for r in rows})
    return quests, orphan, diff


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true", help="에이전트용 기계 출력")
    ap.add_argument("--list", metavar="항목",
                    help="이름까지 찍기: io | codewalk | nodiff | orphan")
    args = ap.parse_args()

    quests, orphan, diff = collect()
    live = [q for q in quests if not q["frozen"] and q["has_folder"]]
    sections = sorted({q["section"] for q in quests})

    def tally(sec):
        rows = [q for q in live if q["section"] == sec]
        return {
            "전체": len([q for q in quests if q["section"] == sec]),
            "셀 수 있음": len(rows),
            "입출력 카드 없음": len([q for q in rows if not q["io_card"]]),
            "CodeWalk 씀": len([q for q in rows if q["codewalk"]]),
            "옛 코드 표시만": len([q for q in rows if q["progressive"] and not q["codewalk"]]),
            "난이도 감사값": len([q for q in rows if q["diff_source"] == "감사값"]),
            "난이도 추정치": len([q for q in rows if q["diff_source"] == "추정치"]),
        }

    if args.json:
        print(json.dumps({
            "sections": {s: tally(s) for s in sections},
            "총 quest": len(quests), "동결": len([q for q in quests if q["frozen"]]),
            "폴더 없음": [q["id"] for q in quests if not q["has_folder"]],
            "카탈로그에 없는 폴더": orphan,
            "난이도 분포": {str(k): len([q for q in live if q["difficulty"] == k])
                          for k in sorted({v for v in diff.values()})},
        }, ensure_ascii=False, indent=1))
        return 0

    if args.list:
        key = {"io": lambda q: not q["io_card"],
               "codewalk": lambda q: q["progressive"] and not q["codewalk"],
               "nodiff": lambda q: q["diff_source"] is None}.get(args.list)
        if args.list == "orphan":
            print(f"카탈로그에 없는 폴더 {len(orphan)}개:")
            for q in orphan:
                print("  ", q)
            return 0
        if not key:
            print("--list 는 io · codewalk · nodiff · orphan 중 하나")
            return 2
        hit = [q for q in live if key(q)]
        print(f"'{args.list}' 에 걸린 quest {len(hit)}개 (동결·폴더없음 제외):\n")
        for sec in sections:
            xs = [q["id"] for q in hit if q["section"] == sec]
            if xs:
                print(f"  [{sec}] {len(xs)}개")
                for i in range(0, len(xs), 6):
                    print("    " + "  ".join(xs[i:i + 6]))
        return 0

    cols = ["전체", "셀 수 있음", "입출력 카드 없음", "CodeWalk 씀", "옛 코드 표시만",
            "난이도 감사값", "난이도 추정치"]
    w = max(len(c) for c in cols) + 2
    print("\n=== quest 개수 (기준: app/quest/[problemId]/data.ts 카탈로그) ===\n")
    print("  " + "섹션".ljust(11) + "".join(c.rjust(w) for c in cols))
    print("  " + "-" * (11 + w * len(cols)))
    for sec in sections:
        t = tally(sec)
        print("  " + sec.ljust(11) + "".join(str(t[c]).rjust(w) for c in cols))
    tot = {c: sum(tally(s)[c] for s in sections) for c in cols}
    print("  " + "-" * (11 + w * len(cols)))
    print("  " + "합계".ljust(11) + "".join(str(tot[c]).rjust(w) for c in cols))

    print(f"\n  🔒 동결(세는 데서 제외): {len([q for q in quests if q['frozen']])}개")
    miss_folder = [q["id"] for q in quests if not q["has_folder"]]
    if miss_folder:
        print(f"  ⚠️ 카탈로그에 있는데 폴더가 없음: {len(miss_folder)}개 — {', '.join(miss_folder[:6])}")
    if orphan:
        print(f"  ⚠️ 폴더는 있는데 카탈로그에 없음(학생은 못 봄): {len(orphan)}개"
              f" — {', '.join(orphan[:6])}{' …' if len(orphan) > 6 else ''}")

    dist = {k: len([q for q in live if q["difficulty"] == k]) for k in sorted({v for v in diff.values()})}
    print(f"\n  난이도 분포(감사값 = MCC): " + " · ".join(f"Lv{k} {v}개" for k, v in dist.items()))
    print("  ⚠️ '추정치' 는 문제 번호로 유추한 값이다(Bronze #1→2, #2→3). 감사값과 신뢰도가 다르다.")
    print("     화면은 둘을 똑같은 Lv 뱃지로 보여준다 — 학생이 오해할 수 있는 자리다.")

    print("\n  세는 규칙 — 숫자만 인용하지 말고 이것도 같이 봐라:")
    print(f"    입출력 카드  {IO_CARD.pattern}")
    print("    ↑ 좁게 잡았다가 7개를 '없음' 으로 잘못 셌다(2026-09-07). 넓은 게 맞다.")
    print("  이름까지: --list io | codewalk | nodiff | orphan\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
