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
# 커리큘럼에서 **안 가르치는 개념**을 quest 코드가 전제하고 있나 (2026-09-08 전수 조사에서 나옴).
# 21개 quest 가 걸렸다. 손으로 세면 또 틀린다 — 여기 박아둔다.
#   비트 연산  : cpp-20 에 "📌 참고용" 으로 **미뤄둔** 개념이다
#   2차원 리스트: `[[X]*N for _ in range(N)]` — 2차원 리스트 자체를 안 가르친다
#   조합론/펜윅/모듈러역원: 레슨·algo 토픽 어디에도 없다
# ⚠️ 걸렸다고 다 결함은 아니다. **본질이면 가르치고, 수단이면 갈아치운다** —
#    판별은 사람이 한다. 이 목록은 "확인해야 할 자리" 다.
UNTAUGHT = {
    # ⚠️ 처음 짠 패턴이 **78개**를 신고했는데 대부분 헛 경보였다 (2026-09-08).
    #    `cout << -1 <<` 의 `1 <<` 가 "비트 연산" 으로 잡혔고,
    #    파일 전체를 한 덩어리로 봐서 서로 다른 줄의 `for` 두 개가 "중첩" 으로 잡혔다.
    #    → **줄 단위로** 보고, C++ 스트림(`cout <<`)은 뺀다.
    #    오늘만 이 실수를 다섯 번째 한다. 패턴을 넓게 잡으면 반드시 확인하고 좁혀라.
    "비트연산": re.compile(r"\(1 <<|1 << \w|>> *\w+ *\) *& *1|& *\(1 <<|>>= |<<= "),
    "2차원리스트": re.compile(r"\[\s*\[[^\]]*\]\s*\* *\w|\[\[[^\]]*\] +for +\w+ +in "),
    # ⚠️ 2026-09-11: 위 "2차원리스트" 는 **만드는 문법**만 본다. 그래서 moohunt 를 놓쳤다 —
    #    isAt 를 for 루프로 쌓아 만들고 isAt[x][a][b] 로 쓰는데, 만드는 쪽이 컴프리헨션이 아니라
    #    정규식에 안 걸렸다. 학생이 거기서 **그만두고 싶었다** 고 했다(2026-09-11 student-algorithm).
    #    → **쓰는 자리**로 잡는다. 세 겹 인덱싱은 흔치 않고, 걸리면 거의 진짜다.
    #    (두 겹 `a[i][j]` 는 너무 흔해서 여기 안 넣는다 — 헛경보만 쌓인다.)
    "3차원리스트": re.compile(r"\b\w+\[[^\[\]]+\]\[[^\[\]]+\]\[[^\[\]]+\]"),
    # 한 줄에 `for … in` 이 **두 번 이상** 나오는 대괄호 식 (3중·4중 dp 초기화가 여기 걸린다).
    # 실제 예: `dp = [[[[0] * (K+1) for _ in range(3)] for _ in range(N)] for _ in range(N)]`
    "중첩컴프리헨션": re.compile(r"\[.*\bfor +\w+ +in\b.*\bfor +\w+ +in\b.*\]"),
    "조합론": re.compile(r"이항|파스칼|nCr|binomial|C\[\w+\]\[\w+\] *= *C\["),
    "펜윅": re.compile(r"펜윅|[Ff]enwick|lowbit|\bBIT\b"),
    "모듈러역원": re.compile(r"역원|[Ff]ermat|페르마|pow\([^,]+, *MOD *- *2|modinv"),
}
CPP_STREAM = re.compile(r'c(out|err) *<<|<< *(endl|std::)')
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


def untaught_of(text):
    """줄 단위로 본다. C++ 출력 스트림 줄은 건너뛴다 (`cout << -1 <<` 가 비트로 잡혔다)."""
    hit = set()
    for line in text.split("\n"):
        if CPP_STREAM.search(line):
            continue
        for name, pat in UNTAUGHT.items():
            if pat.search(line):
                hit.add(name)
    return sorted(hit)


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
            "untaught": untaught_of(t) if t else [],
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
                    help="이름까지 찍기: io | codewalk | untaught | nodiff | orphan")
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
            "안 배운 개념": len([q for q in rows if q["untaught"]]),
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
               "untaught": lambda q: bool(q["untaught"]),
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
        if args.list == "untaught":
            from collections import Counter
            cnt = Counter(k for q in hit for k in q["untaught"])
            for k, v in cnt.most_common():
                names = [q["id"] for q in hit if k in q["untaught"]]
                print(f"  [{k}] {v}개")
                for i in range(0, len(names), 5):
                    print("    " + "  ".join(names[i:i + 5]))
            print("\n  ⚠️ 걸렸다고 다 결함은 아니다. **본질이면 가르치고, 수단이면 갈아치운다.**")
            print("     판별은 사람이 한다 — 이건 '확인해야 할 자리' 목록이다.")
            return 0
        for sec in sections:
            xs = [q["id"] for q in hit if q["section"] == sec]
            if xs:
                print(f"  [{sec}] {len(xs)}개")
                for i in range(0, len(xs), 6):
                    print("    " + "  ".join(xs[i:i + 6]))
        return 0

    cols = ["전체", "셀 수 있음", "입출력 카드 없음", "CodeWalk 씀", "옛 코드 표시만",
            "안 배운 개념", "난이도 감사값", "난이도 추정치"]
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
    print("  이름까지: --list io | codewalk | untaught | nodiff | orphan\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
