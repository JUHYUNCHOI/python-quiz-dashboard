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
import glob
import pathlib
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
            # ⚠️ 2026-09-25: 여기서 `continue` 만 하고 있었다 — 그래서
            #    `  word: { ...DEFAULT_META, concepts_required: [...] },` 처럼
            #    **한 줄짜리 엔트리를 통째로 못 읽었다.** 이름만 잡고 그 줄을 버린 것이다.
            #    한 줄 엔트리는 이 저장소에서 흔한 모양이라 그대로 뒀으면
            #    「채웠는데 검사기는 안 채웠다고 하는」 상태가 계속됐다. 같은 줄도 본다.
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



# ── 2026-09-25 추가: **학생이 못 보는 코드를 근거로 쓰지 마라** ────────────────
#   왜 — 오늘 `hps`·`xorstring`·`mcc21simplemath` 에서 `bit-ops` 를 **일부러 뺐다.**
#   교육·감사 담당이 각자 따로, 그리고 내가 코드로 확인한 근거:
#     · `hps`        — `HP_FULL_PY` 에 비트 **0회**. 비트마스크는 화면이 스스로
#                      **«🎁 BONUS — OPTIONAL»** 이라 부르는 `STEP_BITMASK_PY` 뿐이다.
#     · `xorstring`  — 걸린 한 줄이 **주석 안의 `2^k`**. 연산자가 아니다.
#     · `mcc21simplemath` — 파이썬이 **일부러 피해** 짰다(`(x // place) % 2`).
#   그런데 이 검사기의 왼쪽(코드 스캐너)은 **quest 텍스트 전체**를 본다 —
#   **C++ 코드와 보너스 절까지** 읽는다. `xorstring`·`mcc21simplemath` 는
#   `supported_languages: ["py"]` 라 **C++ 이 화면에 뜨지도 않는데** 그 비트를 근거로
#   «빠졌다» 고 신고했다. 고치지 않으면 **누군가 이 경고를 보고 오늘의 옳은 수정을
#   되돌린다.** 그래서 언어를 가린다.
#   ⚠️ **보너스 절은 아직 못 가린다**(`hps` 가 그 경우다) — 이름 규칙이 없다.
#      그건 `❓` 로 낮춰 찍고 **사람이 읽게** 한다.
LANG_ARRAY = re.compile(r'\b([A-Za-z][A-Za-z0-9_]*?)(_PY|_CPP|Py|Cpp)\s*=\s*'
                        r'(?:\([^)]*\)\s*=>\s*)?\[')


# ⭐ 2026-09-25: **보너스 절**을 가린다. `hps` 가 그 경우다 —
#   `STEP_BITMASK_PY` 위에 `/* Python bitmask bonus ... */` 주석이 있고,
#   화면 라벨이 **`9️⃣ (보너스) Python 비트마스크 트릭`** 이다.
#   즉 «선수 개념» 이 아니라 **다 풀고 나서 보는 덧붙임**이다. 선수로 걸면
#   그 quest 가 추천에 안 뜬다 — 오늘 그래서 `bit-ops` 를 뺐다.
#   ⚠️ 이름 규칙이 아니라 **라벨·주석의 낱말**로 판별한다(이름은 quest 마다 다르다).
#   ⚠️ 못 보는 모양이 있을 것이다 — 「보너스」라 안 쓰고 「덤」이라 쓰면 못 잡는다.
BONUS_WORD = re.compile(r"bonus|optional|보너스|심화|덤|참고용", re.I)


def _is_bonus_array(src, start):
    """그 배열 **앞 400자**(주석)와, 그 이름을 쓰는 **라벨 줄**에 「보너스」가 있나."""
    head = src[max(0, start - 400):start]
    return bool(BONUS_WORD.search(head))


def _arrays_by_lang(qid):
    """그 quest 의 배열을 **언어별로** 모은다 — (py 글자, cpp 글자).

    **보너스 절의 배열은 빼고** 모은다 — 선수 개념의 근거가 못 된다.
    """
    py, cpp = [], []
    for f in sorted(glob.glob(str(ROOT / "quest-problems" / qid / "*.jsx"))
                    + glob.glob(str(ROOT / "quest-problems" / qid / "*.tsx"))):
        src = pathlib.Path(f).read_text(encoding="utf-8", errors="replace")
        for m in LANG_ARRAY.finditer(src):
            if "KEYWORD" in m.group(1).upper():
                continue
            d, i = 0, src.index("[", m.end() - 1)
            j = i
            while j < len(src):
                if src[j] == "[":
                    d += 1
                elif src[j] == "]":
                    d -= 1
                    if d == 0:
                        break
                j += 1
            if _is_bonus_array(src, m.start()):
                continue                      # 보너스 절 — 선수 개념 근거 아님
            body = src[i:j]
            (py if m.group(2).lower() in ("_py", "py") else cpp).append(body)
    return "\n".join(py), "\n".join(cpp)


def _supported(meta_src, qid):
    """`supported_languages` — 못 찾으면 둘 다 본다(관대한 쪽)."""
    m = re.search(r'^\s*' + re.escape(qid) + r':\s*\{(.*?)(?=^\s*\w+:\s*\{|^\};)',
                  meta_src, re.S | re.M)
    if not m:
        return {"py", "cpp"}
    g = re.search(r'supported_languages:\s*\[([^\]]*)\]', m.group(1))
    return set(re.findall(r'"([^"]+)"', g.group(1))) if g else {"py", "cpp"}


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
        # ⭐ 학생이 못 보는 언어의 코드만 근거라면 **빼라.**
        if missing:
            langs = _supported(meta_src, q["id"])
            if True:                          # 언어가 둘 다여도 **보너스 제외**는 해야 한다
                py_src, cpp_src = _arrays_by_lang(q["id"])
                kept = []
                for d in missing:
                    key = next((k for k, v in TAG.items() if v == d), None)
                    pat = (cq.UNTAUGHT.get(key) or cq.UNTAUGHT_CODELINE.get(key)) if key else None
                    if pat is None:
                        kept.append(d)
                        continue
                    seen_py = bool(pat.search(py_src))
                    seen_cpp = bool(pat.search(cpp_src))
                    if "py" in langs and seen_py:
                        kept.append(d)
                    elif "cpp" in langs and seen_cpp:
                        kept.append(d)
                    # 둘 다 아니면 — 화면에 안 뜨는 언어의 코드뿐이다. 뺀다.
                missing = kept
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
