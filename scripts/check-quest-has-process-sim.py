#!/usr/bin/env python3
"""
scripts/check-quest-has-process-sim.py (DRAFT — 2026-09-26, quest-auditor)

왜 만들었나:
  선생님이 mcc20citytour 를 보시고 "시뮬로 설명하는 부분도 없고" 라고 하셨다.
  처음 grep(`type: "sim"`)만으로 셌더니 mcc20citytour 자신이 "시뮬 없음" 목록에
  들어갔는데, 실제로는 D 슬라이더 시뮬이 있었다 — 단지 `type: "reveal"` 스텝
  안에 박혀 있었을 뿐이다. 그리고 그 시뮬조차 "최종 결과를 즉시 계산해서" 보여줄
  뿐, BFS 가 큐에서 하나씩 꺼내 이웃을 확인하는 "과정"은 한 번도 안 보여준다.
  같은 구멍이 reach·mco15trains 처럼 **quest 마다 새 type 문자열**(graphBuild,
  dijkstraTrace, auditSim …)을 자기 App.jsx 안에서 직접 dispatch 하는 곳에도 있다
  — 이런 quest 는 grep(`type: "sim"`) 으로는 절대 안 잡힌다.

세 버킷 (2026-09-26 수정 — "sim" 이라는 *라벨*을 더 이상 그대로 안 믿는다):
  A — chapters.jsx 가 쓰는 어떤 type(문자열은 "sim" 일 수도, quest 마다 지어낸
      "dijkstraTrace"/"graphBuild" 일 수도 있다) 이 실제로 매핑되는 컴포넌트를
      열어봤더니, discrete step-index(◀▶/다음, `steps[step]` 류 배열 인덱싱)로
      과정을 한 걸음씩 보여준다. 예: reach 의 dijkstraTrace → DijkstraTrace.
      ⚠️ familytree 는 `type: "sim"` 이라고 **적어놨지만** 열어보니 즉시-결과형이라
      B 로 떨어진다 — "sim" 이라는 글자만 보고 A 로 세면 또 틀린다(실측 12개).
  B — 열어본 컴포넌트가 useState 는 있는데 discrete step 없이 "결과를 즉시
      계산해" 보여준다(파라미터 슬라이더 + useMemo). 예: mcc20citytour 의 D 슬라이더,
      familytree 의 LCA(사실은 sim 라벨).
  C — A 도 B 도 못 찾았다. 과정이 곧 개념인 알고리즘(그래프·최단경로·
      유니온파인드·트리·dp·그리디 등)인데 그 과정을 한 걸음씩 보여주는 게
      전혀 없다. photoshoot 은 아예 "TODO: sim redesign — 예전 시뮬은 틀린
      문제를 애니메이션했다" 는 주석과 함께 시뮬 없이 정적 예제만 남아 있다
      (실제로 확인함 — 2026-09-26).

⚠️⚠️⚠️ 이 스크립트의 "0건" 은 결백이 아니다 — 사람이 반드시 표본을 열어봐야 한다.
  이 스크립트가 못 보는 것들 (알려진 맹점):
  1. **컴포넌트 이름을 짓는 방식이 quest 마다 다 다르다.** 이 스크립트는
     정규식으로 "function 이름(" 을 찾는데, 클래스형 컴포넌트나 화살표 함수
     (`const Foo = ({E}) => {...}`) 로 짠 곳은 놓친다.
  2. **"discrete step" 판정이 문자열 휴리스틱이다.** `setStep(s => s + 1)` 류
     패턴과 "steps[...]"/"trace[...]" 배열 인덱싱을 찾는데, 다른 이름
     (`idx`, `frame`, `tick`, `cursor`)을 쓰면 못 찾는다. → **B로 잘못 떨어진다.**
  3. **중괄호 매칭이 아니라 "다음 top-level 함수 전까지" 로 컴포넌트 몸통을
     자른다.** 몸통 안에 또 다른 top-level 스타일 함수 정의가 있으면 잘린다.
  4. **chapters.jsx 안에 직접 정의된 (import 없는) 컴포넌트**는 잡는다고
     했지만, 화살표 함수+구조분해가 섞인 형태는 놓칠 수 있다
     (acowdemia1 류 — 실측 안 해봄, PM/감사가 표본으로 확인할 것).
  5. **정적 다이어그램(예: GraphViz — 그래프를 그리기만 하고 과정은 안 보여줌)**
     을 useState 없음 → "sim 없음"으로 판정하는데, 이게 quest 의 유일한
     시각자료라면 그 자체가 이미 결함(과정을 안 보여줌)이다. 이 스크립트는
     "정적 다이어그램이 있다" 와 "sim이 전혀 없다" 를 구분하지 않는다.
  6. **useMemo 없이 그냥 렌더 중 계산하는 경우**(즉시 계산이지만 useMemo가 없는
     스타일)도 있다 — useMemo 존재 여부는 판정에 안 쓴다(참고용으로만 표시).
  7. ProgressiveCodeStepper("progressive" type)는 "코드를 조립해 가는 과정"을
     보여주지만 이건 **코드 조립 과정**이지 **알고리즘 실행 과정**이 아니다.
     이 스크립트는 이걸 A 로 안 세지만, 그 경계가 애매한 quest 가 있을 수 있다.
  8. C 버킷은 "QUEST_ALGO 토픽이 graph/shortestpath/unionfind/tree/dp/greedy 인데
     아무 process 컴포넌트도 없다" 로만 판정한다 — 토픽이 없는(none) quest는
     원래부터 process 시각화가 필요 없을 수도, 필요한데 안 붙어 있을 수도 있다.
     이 스크립트는 그런 quest를 D(=해당 없음)로 묻어 버린다. **완전탐색/애드혹
     quest 중에도 "과정이 곧 개념"인 것이 있을 수 있다 — 사람이 봐야 한다.**

사용법:
  python3 scripts/check-quest-has-process-sim.py             # 전체 표
  python3 scripts/check-quest-has-process-sim.py --list c    # C(의심) quest 이름만
  python3 scripts/check-quest-has-process-sim.py --id reach  # quest 하나만 상세히
"""
import re
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] if (Path(__file__).parent.name == "scripts") else Path(".")
QUEST_DIR = ROOT / "quest-problems"

# QUEST_ALGO 를 lib/quest-algo.ts 에서 직접 파싱 (하드코딩 금지 — 어긋나면 낡은 값이 된다)
def load_quest_algo():
    src = (ROOT / "lib" / "quest-algo.ts").read_text(encoding="utf-8")
    m = re.search(r"export const QUEST_ALGO[^=]*=\s*\{(.*?)\n\};", src, re.S)
    body = m.group(1) if m else ""
    return dict(re.findall(r'(\w+):\s*"(\w+)"', body))

PROCESS_MATTERS_TOPICS = {"graph", "shortestpath", "unionfind", "tree", "dp", "greedy", "sorting", "stackqueue", "topologicalsort"}
# ⚠️ PM/pedagogy 가 이 집합을 줄이거나 늘려야 한다 — 지금은 quest-auditor 가
#    "과정이 곧 개념" 이라고 짐작한 토픽이다. dp/greedy/sorting 은 넣고 뺄지
#    애매해서 넣었다 — 사람이 다시 판단해라.

STATIC_STEP_TYPES = {"reveal", "quiz", "input", "code", "progressive"}
# ⚠️ 2026-09-26 수정: 처음엔 "sim" 을 별도 취급해서(=항상 A) familytree 를 놓쳤다.
#   `type: "sim"` 도 quest 마다 **자기 App.jsx 안에서 직접** dispatch 한다
#   (예: familytree/FamilyTreeApp.jsx 의 `if (step.type === "sim") return <FamilyTreeSim/>`).
#   즉 "sim" 이라는 이름도 label 일 뿐, 그 컴포넌트가 진짜 step-by-step 인지는
#   똑같이 열어봐야 안다. 그래서 이제 "sim" 도 다른 custom type 과 똑같이
#   dispatch_map 으로 실제 컴포넌트를 찾아 분류한다 — label 만 보고 A 로 세지 않는다.

def find_jsx_files(qdir: Path):
    return list(qdir.glob("*.jsx"))

def step_types_in_chapters(qdir: Path):
    types = set()
    for f in qdir.glob("chapters*.jsx"):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        types.update(re.findall(r'type:\s*"([\w-]+)"', txt))
    return types

def imported_component_names(qdir: Path):
    """모든 jsx 의 `import { A, B } from "./components"` 류에서 이름을 모은다.
       (2026-09-26 수정: 처음엔 `content: <Foo` 바로 뒤만 봐서 bucketbrigade 를
       놓쳤다 — 실제로는 `content: (<div>...<BucketBrigadeGrid .../></div>)` 처럼
       한 겹 감싸여 있었다. import 목록 기준으로 바꾸면 중첩 깊이와 무관하게 잡힌다.)"""
    names = set()
    for f in find_jsx_files(qdir):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r'import\s*\{([^}]+)\}\s*from\s*["\']\./[\w-]+["\']', txt):
            for part in m.group(1).split(","):
                nm = part.strip().split(" as ")[0].strip()
                if re.match(r'^[A-Z]\w*$', nm):
                    names.add(nm)
    return names

def local_component_names(qdir: Path):
    """chapters*.jsx **안에 직접** 정의된 컴포넌트 이름
       (milkorder 처럼 import 없이 그 파일 안에서 function MilkOrderSim(){...} 로
       바로 짜는 경우 — 맹점 4 로 적어뒀던 것을 실제로 메운다, 2026-09-26)."""
    names = set()
    for f in qdir.glob("chapters*.jsx"):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        names.update(re.findall(r'(?:function|const)\s+([A-Z]\w+)\s*[=(]', txt))
    return names

def content_component_refs(qdir: Path):
    """quest 자체 컴포넌트(import 로 들여온 이름 + chapters.jsx 안에 직접 정의된
       이름) 중, chapters.jsx 어딘가에 JSX 태그로 실제로 쓰인 것만 남긴다 —
       얼마나 깊이 중첩됐든 상관없다."""
    candidates = imported_component_names(qdir) | local_component_names(qdir)
    used = set()
    for f in qdir.glob("chapters*.jsx"):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        for name in candidates:
            if re.search(r'<\s*' + re.escape(name) + r'\b', txt):
                used.add(name)
    return used

def dispatch_map(qdir: Path):
    """*App.jsx (또는 quest 안 아무 jsx) 의 `type === "X") return <Foo` 매핑."""
    mapping = {}
    for f in find_jsx_files(qdir):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r'type\s*===\s*"([\w-]+)"\s*\)\s*return\s*<\s*([A-Z]\w+)', txt):
            mapping.setdefault(m.group(1), m.group(2))
    return mapping

def extract_component_body(qdir: Path, comp_name: str):
    """느슨한 추출: `function Comp(` 뒤부터 다음 top-level 함수 정의 전까지.
       ⚠️ 중괄호 매칭이 아니다 — 맹점 3 참고."""
    pat_def = re.compile(
        r'(?:export\s+function\s+' + re.escape(comp_name) + r'\s*\(|'
        r'function\s+' + re.escape(comp_name) + r'\s*\(|'
        r'const\s+' + re.escape(comp_name) + r'\s*=\s*\()'
    )
    next_top = re.compile(r'\n(?:export\s+)?(?:function|const)\s+[A-Za-z_]\w*\s*[=(]')
    for f in find_jsx_files(qdir):
        txt = f.read_text(encoding="utf-8", errors="ignore")
        m = pat_def.search(txt)
        if not m:
            continue
        start = m.start()
        nm = next_top.search(txt, m.end())
        end = nm.start() if nm else len(txt)
        return txt[start:end], f.name
    return None, None

STEP_NAV_SIGNS = [
    r"setStep\(\s*\w*\s*=>",           # setStep(s => s+1)
    r"setStep\(\s*Math\.min",
    r"\bsteps\[",                       # steps[step] 배열 인덱싱
    r"\btrace\[",
    r"\bhistory\[",
    r"◀", r"▶",
    r"nextStep\s*\(",
    r"stepNext\s*\(",
]
INSTANT_PARAM_SIGNS = [
    r"useMemo",
    r"Math\.max\(\d,\s*\w+\s*-\s*1\)",  # D-1 슬라이더류
    r"Math\.min\(\d+,\s*\w+\s*\+\s*1\)",
]

def classify_component(body: str):
    has_state = bool(re.search(r"useState", body))
    has_step_nav = any(re.search(p, body) for p in STEP_NAV_SIGNS)
    has_instant = any(re.search(p, body) for p in INSTANT_PARAM_SIGNS)
    if has_step_nav:
        return "A2"  # 과정을 한 걸음씩 보여줌 (type:"sim" 은 아니지만 실질 A)
    if has_state:
        return "B"   # useState 는 있는데 즉시-결과형 (또는 판정 불가 → 보수적으로 B)
    return None      # 정적이거나 useState 없음 — 맹점 5 참고, 사람이 봐야 함

def analyze_quest(qdir: Path, algo_map: dict):
    qid = qdir.name
    types = step_types_in_chapters(qdir)
    has_literal_sim = "sim" in types  # 참고용 라벨일 뿐 — 더 이상 그 자체로 A 판정 안 함
    custom_types = types - STATIC_STEP_TYPES  # "sim" 도 이제 여기 포함해서 실제로 열어본다

    disp = dispatch_map(qdir)
    content_refs = content_component_refs(qdir)

    candidates = set(content_refs)
    for ct in custom_types:
        if ct in disp:
            candidates.add(disp[ct])

    comp_results = {}
    for name in candidates:
        body, fname = extract_component_body(qdir, name)
        if body is None:
            comp_results[name] = ("NOT_FOUND", None)
            continue
        cls = classify_component(body)
        comp_results[name] = (cls, fname)

    bucket_a = any(c == "A2" for c, _ in comp_results.values())
    bucket_b = (not bucket_a) and any(c == "B" for c, _ in comp_results.values())
    # 라벨은 "sim" 인데 실제로는 즉시-결과형(B)으로 밝혀진 경우 — 오라벨 신호
    mislabeled_sim = has_literal_sim and bucket_b and not bucket_a

    topic = algo_map.get(qid)
    process_matters = topic in PROCESS_MATTERS_TOPICS
    bucket_c_candidate = process_matters and not bucket_a and not bucket_b

    return {
        "id": qid,
        "topic": topic,
        "step_types": sorted(types),
        "custom_types": sorted(custom_types),
        "components": comp_results,
        "bucket": "A" if bucket_a else ("B" if bucket_b else ("C" if bucket_c_candidate else "-")),
        "mislabeled_sim": mislabeled_sim,
    }

def main():
    algo_map = load_quest_algo()
    quests = sorted([d for d in QUEST_DIR.iterdir() if d.is_dir() and (d / "chapters.jsx").exists()])

    only_id = None
    list_bucket = None
    args = sys.argv[1:]
    if "--id" in args:
        only_id = args[args.index("--id") + 1]
    if "--list" in args:
        list_bucket = args[args.index("--list") + 1].upper()

    results = []
    for qdir in quests:
        if only_id and qdir.name != only_id:
            continue
        results.append(analyze_quest(qdir, algo_map))

    if only_id:
        r = results[0] if results else None
        print(json.dumps(r, indent=2, ensure_ascii=False, default=str))
        return

    if list_bucket:
        for r in results:
            if r["bucket"] == list_bucket:
                print(r["id"], "-", r["topic"])
        return

    counts = {"A": 0, "B": 0, "C": 0, "-": 0}
    for r in results:
        counts[r["bucket"]] += 1
    print("=== check-quest-has-process-sim.py (DRAFT) ===")
    print(f"quest 전체: {len(results)}")
    print(f"A (진짜 과정 시뮬 있음): {counts['A']}")
    print(f"B (useState 있지만 즉시-결과형): {counts['B']}")
    print(f"C (과정 필요한 토픽인데 A/B 둘 다 없음 — 의심): {counts['C']}")
    print(f"- (해당 토픽 아니거나 판정 보류): {counts['-']}")
    print()
    mislabeled = [r["id"] for r in results if r.get("mislabeled_sim")]
    print(f"⚠️ 라벨은 'sim' 인데 실제 컴포넌트는 즉시-결과형(B)인 quest: {len(mislabeled)} {mislabeled}")
    print("⚠️ 이 숫자는 결백의 증거가 아니다 — 위 맹점 1~8 을 반드시 읽어라.")
    print("⚠️ C 목록은 --list c 로, 반드시 사람이 하나씩 열어서 확인할 것.")
    if counts["C"] > 0:
        print()
        print("C 목록:")
        for r in results:
            if r["bucket"] == "C":
                print(f"  - {r['id']}  (topic={r['topic']})")

if __name__ == "__main__":
    main()
