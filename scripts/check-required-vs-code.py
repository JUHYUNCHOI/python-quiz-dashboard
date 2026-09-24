#!/usr/bin/env python3
"""quest 코드가 **쓰는** 선수개념과 `concepts_required` 에 **적힌** 것이 어긋나나.

왜 생겼나 (2026-09-24)
──────────────────────
`mooin3` 의 🔒 코드는 `chr(c + 97)` 로 26글자를 도는데,
`lib/quest-meta.ts` 의 `concepts_required` 는 **`["loop", "string-basics"]` 뿐**이었다.

그 값은 장식이 아니라 **실제로 쓰인다** —
  · `app/quest/page.tsx` 의 `isReady()` : required 를 다 익혔으면 «지금 풀 준비됨» 으로 띄운다
  · `lib/concept-graph.ts` 의 `readyQuests()` : 같은 논리로 추천 대상에 넣는다
  · `components/quest/QuestCompletionCard.tsx` : 방금 배운 개념과 겹치면 «다음 문제» 로 민다

즉 `loop`·`string-basics` 만 익힌 학생에게 시스템이 **적극적으로 mooin3 을 추천했다.**
그 학생은 그 코드 쪽에서 **"완전히 막혔다"** 고 했다.

⚠️ **핵심 — 칸이 없어서가 아니다. 칸은 있었고 틀리게 채워져 있었다.**
   그래서 처방은 「칸을 새로 만드는 것」이 아니라 **「적힌 값이 코드와 맞는지 기계로 대조하는 것」** 이다.
   `quest-auditor`(2026-09-24): *"근본 처방은 칼럼 추가가 아니라 교차검증 스크립트다."*

무엇을 대조하나
───────────────
왼쪽: `scripts/count-quests.py` 의 `UNTAUGHT`·`UNTAUGHT_CODELINE` 이 **코드에서 실제로 찾은 것**
오른쪽: `lib/quest-meta.ts` 의 그 quest `concepts_required` 에 **사람이 적어 둔 것**

둘을 잇는 이름표는 아래 `TAG` 하나뿐이다. **이 사전이 유일한 연결점이다** —
`CONCEPT_ONTOLOGY` 에도 같은 이름이 등록돼 있어야 한다(안 그러면 `getConceptGraph()` 가
조용히 새 노드를 만들어 버리고, 타입이 `string[]` 이라 컴파일도 안 잡는다.
실제로 그 사고가 이 검사기를 만든 날 한 번 났다 — `letter-index-table`).

무엇을 못 보나 — **0건이 결백이 아니다**
────────────────────────────────────────
- **왼쪽이 아는 만큼만 본다.** `UNTAUGHT` 가 모르는 빌트인(`bisect`·`itertools`·
  `functools.reduce`·`int(x, 2)` …)은 여기서도 안 걸린다. 그 층은 아직 사람이 읽어야 한다.
- **반대 방향(적혀 있는데 코드가 안 쓰는 것)은 일부러 안 본다** — 가르치려고 일부러 적어 둘 수 있다.
- `concepts_required` 를 **정규식으로** 읽는다. 한 줄에 배열이 다 들어 있는 모양만 본다.
"""
import re
import sys
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# count-quests.py 의 한글 키 → CONCEPT_ONTOLOGY 의 영문 id. **이 둘은 반드시 짝이다.**
TAG = {
    "글자↔숫자변환": "chr-ord-conversion",
    "2차원리스트": "2d-list-build",
    "3차원리스트": "3d-plus-indexing",
    "중첩컴프리헨션": "nested-comprehension",
    "비트연산": "bit-ops",
    "조합론": "pascal-triangle-dp",
    "펜윅": "fenwick-tree",
    "모듈러역원": "modular-inverse",
}


def load_counter():
    spec = importlib.util.spec_from_file_location("cq", ROOT / "scripts/count-quests.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def required_map(meta_src: str) -> dict[str, list[str]]:
    """`  <id>: {` 블록마다 `concepts_required: [...]` 를 한 줄에서 읽는다."""
    out: dict[str, list[str]] = {}
    cur = None
    for line in meta_src.split("\n"):
        m = re.match(r"^  ([A-Za-z][\w]*):\s*\{", line)
        if m:
            cur = m.group(1)
            continue
        if cur:
            r = re.search(r"concepts_required:\s*\[([^\]]*)\]", line)
            if r:
                out[cur] = re.findall(r'"([^"]+)"', r.group(1))
                cur = None
    return out


def ontology_ids(meta_src: str) -> set[str]:
    i = meta_src.find("export const CONCEPT_ONTOLOGY")
    seg = meta_src[i:meta_src.find("} as const;", i)]
    return set(re.findall(r'^\s*"([^"]+)":', seg, re.M))


def main() -> int:
    only = set(sys.argv[1:])
    cq = load_counter()
    meta_src = (ROOT / "lib/quest-meta.ts").read_text(encoding="utf-8")
    req = required_map(meta_src)
    onto = ontology_ids(meta_src)

    # ① 이름표 사전이 온톨로지와 어긋나지 않나 — 이게 먼저다
    unknown_tag = sorted(t for t in TAG.values() if t not in onto)
    ghost = sorted({c for v in req.values() for c in v} - onto)

    quests, _orphan, _diff = cq.collect()
    rows = []
    for q in quests:
        if not q["has_folder"]:
            continue
        if only and q["id"] not in only:
            continue
        detected = [TAG[k] for k in q["untaught"] if k in TAG]
        if not detected:
            continue
        have = set(req.get(q["id"], []))
        missing = [d for d in detected if d not in have]
        if missing:
            rows.append((q["id"], q["frozen"], missing, "엔트리 없음" if q["id"] not in req else ""))

    bad = bool(rows or unknown_tag or ghost)
    if unknown_tag:
        print(f"🚨 이름표 사전이 온톨로지와 어긋난다 — {len(unknown_tag)}개")
        for t in unknown_tag:
            print(f"     TAG 가 쓰는 «{t}» 가 CONCEPT_ONTOLOGY 에 없다")
        print()
    if ghost:
        print(f"🚨 `concepts_required` 에 **등록 안 된 이름** — {len(ghost)}개")
        print("   `getConceptGraph()` 가 조용히 새 노드로 만든다. 컴파일도 안 잡는다.")
        for c in ghost:
            who = sorted(k for k, v in req.items() if c in v)
            print(f"     «{c}» — {', '.join(who)}")
        print()
    if rows:
        print(f"🚨 코드가 쓰는데 `concepts_required` 에 없다 — **quest {len(rows)}개**")
        print("   이 값은 장식이 아니다 — `isReady()` 가 이걸 보고 «지금 풀 준비됨» 을 띄운다.")
        print("   빠져 있으면 **준비 안 된 학생에게 이 문제를 추천한다.**\n")
        for qid, frozen, missing, note in rows:
            mark = "🔒" if frozen else "  "
            tail = f"  ({note})" if note else ""
            print(f"  {mark} {qid:16s} 빠진 것: {', '.join(missing)}{tail}")
    if not bad:
        print("코드와 `concepts_required` 가 어긋난 자리 — 0곳.")
    print("\n   ⚠️ 0건이 결백은 아니다 — `count-quests.py` 가 **아는 빌트인만** 본다.")
    print("      `bisect`·`itertools` 같은 층은 아직 사람이 읽어야 한다.")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
