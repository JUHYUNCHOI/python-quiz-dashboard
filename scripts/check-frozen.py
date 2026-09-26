#!/usr/bin/env python3
"""건드리면 안 되는 파일을 건드렸는지 검사한다 — **pre-commit 걸쇠로도 쓴다.**

왜 다시 짰나 (2026-09-25) — 이 스크립트는 원래 *자문* 도구였다. 그래서 아무 훅에도
안 걸려 있었고, 그 틈으로 동결 quest `mooin3` 의 USACO_VERIFIED 코드를 건드린 커밋
(`fb5367dd`)이 그대로 나갔다가 되돌려졌다. 걸쇠로 올리려고 검토했더니 **결함 다섯**이
나왔다 — 다섯 다 "걸쇠인 척하지만 사실 안 막는" 모양이었다. 아래는 각 결함과 이 파일이
그걸 어떻게 막는지다. **다섯을 안 읽고 이 파일을 고치면 다섯 중 하나를 다시 낸다.**

  ① fail-open — 목록이 저장소 밖(`~/.claude/…`)에 있어 못 읽으면 경고만 찍고
     "동결 없음" 으로 **통과**시켰다. 자문 도구일 땐 괜찮지만 걸쇠에선 "보호가
     있는 척하며 없는" 상태다.
     → **fail-closed.** `load_frozen_quests()` 가 실패하면 `main()` 은 무조건 1 을
       반환한다(=커밋 막힘). 그리고 1차 소스를 저장소 **안**(`scripts/frozen-quests.json`)
       으로 옮겼다 — 저장소 밖 의존을 없앴다. `memory/quest_review_progress.md` 의
       "🔒 절대 안 건드리는 quest" 절은 **사람이 읽는 이유**로 남기고, 이 JSON 이 게이트가
       읽는 **기계용 1차 소스**다. 새 동결 quest 는 **둘 다** 갱신해야 한다.
  ② `--staged` 모드가 없었다 — 워킹트리까지 봐서, 여러 세션이 동시에 quest 를 만지는
     이 저장소에서 무관한 미스테이지 편집 때문에 막히는 오탐이 났다.
     → `scripts/check-quest-polish-budget.py --staged` 가 쓰는 구조를 그대로 가져왔다:
       `git diff --cached --name-only` 로 파일 목록을, `git show :<path>`(인덱스 blob)
       로 내용을 읽는다. **워킹트리를 안 본다.** pre-commit 훅은 반드시 이 모드만 쓴다.
  ③ "승인" 단순 매칭은 **거절을 승인으로 읽는다** — 실물 반례가 `.claude/WORK.md` 에
     있었다: `## ⏸ 이번 라운드 밖 — 선생님 명시 승인 필요` 블록은 quest 이름·"선생님"·
     "승인" 을 전부 갖췄는데 **뜻은 거절**이다.
     → 자연어 근접 매칭을 버렸다. **고정 마커 한 줄**만 찾는다:
       `### ✅ 동결 승인: <quest-id> (<날짜>) — 범위: <설명>`
       이 정확한 모양이 아니면(제목·이모지·콜론 위치가 다르면) 매칭되지 않는다 —
       "필요"·"보류" 같은 말이 근처에 있어도 상관없다,애초에 그 문장을 안 본다.
  ④ 승인 "범위"(narr 한 줄 삽입 vs 구조 변경)를 게이트가 구분 못 한다 — `005fe000` 이
     별도 승인 블록을 따로 쓴 사실 자체가 이 갭의 증거다.
     → **기계화하지 않는다.** 마커의 「범위:」 뒤 설명은 **감사 기록용**이고, 이 게이트는
       "그 quest 에 유효한 마커가 있나" 만 본다. **알려진 한계**로 여기 못박아 둔다 —
       마커가 있으면 그 quest 의 그 어떤 변경도(narr 한 줄이든 구조 변경이든) 통과한다.
       범위를 벗어난 변경인지는 여전히 **사람(PM/검토자)이 diff 를 읽고 판단**해야 한다.
  ⑤ USACO_VERIFIED 승인과 섞였다 — 어젯밤 사고가 정확히 그 혼동이었다(동결 승인 문구를
     USACO 코드 수정 허가로 오인).
     → 마커 문자열(`✅ 동결 승인:`)은 `USACO_VERIFIED` 와 절대 안 겹친다. 그리고
       **USACO_VERIFIED 히트는 마커로 뚫리지 않는다** — WORK.md 에 뭐가 적혀 있든
       무조건 막는다. 우회는 **`--no-verify` 뿐**(의식적 우회, 자동 통로를 만들지 않는다).

⚠️ **`USACO_VERIFIED` 배지의 뜻을 오해하지 마라 — «채점기에 제출해 결과가 기록됨» 이지
   «정답 보장» 이 아니다. 실패한 코드도 잠긴다.** 실물 증거: `cowntact` 는 헤더가 있는데
   `USACO_VERIFICATION.md` 엔 `Python: 4/12 (WA - algorithm wrong)` 로 적혀 있다. 이건
   설계 결함이 아니라 **"몰래 손대지 말고 의도적으로 고치고 재제출하라"** 는 뜻으로
   이미 일관되게 쓰인다.

  ⑦ 헤더가 **아직 없는 채** PASS 로 문서화된 quest — `USACO_VERIFICATION.md` 에는 PASS 로
     적혀 있는데 파일에 `// 🔒 USACO_VERIFIED` 헤더가 없는 것들. 이 걸쇠는 파일에 헤더
     문자열이 실제로 있어야만 보호하므로, 그런 quest 는 재제출·헤더 추가 전까지 **아무
     보호도 없이** 자동 수정될 수 있었다(2026-09-25, CodeWalk 이관을 한 번에 36개씩
     돌리던 중 발견).
     → 저장소 안 `scripts/pending-badge-quests.json` 을 **두 번째 목록**으로 추가했다.
       PM 이 `USACO_VERIFICATION.md` 와 직접 대조해 확정한 부분집합만 우선 담는다(전체
       분류가 끝나면 갱신). 이 목록에 있는 quest 는 헤더가 없어도 **같은
       `protected_line_ranges`/`touches_protected` 로직으로 보호 변수 블록을 건드리면
       막는다.** ⚠️ 이건 `frozen-quests.json`(선생님이 손대지 말라고 한 것)과 **다른
       목록이다** — 혼동 방지로 파일을 분리했다. `frozen-quests.json` 과 달리 이 파일이
       없거나 못 읽히면 **fail-open**(경고만 찍고 빈 집합으로 진행)이다 — 이 목록은
       "이미 있던 최종 안전망(①의 fail-closed)" 위에 얹는 **추가 안전망**이라, 이 파일이
       실수로 지워졌다고 저장소 전체 커밋이 막히면 안 된다는 판단이다. 우회는 동결
       quest 와 **같은** WORK.md 마커(`### ✅ 동결 승인: <quest-id> …`)를 그대로 쓴다 —
       "이 quest 의 이 변경을 사람이 확인했다" 는 뜻은 같기 때문이다. 메시지에서는
       "동결 quest" 와 구분해 "문서상 PASS·헤더 없음" 이라고 표시한다 —
       **`USACO_VERIFIED` 라고 주장하지 않는다.**

────────────────────────────────────────────────────────────────────────
쓰는 법
────────────────────────────────────────────────────────────────────────
  python3 scripts/check-frozen.py --staged     # pre-commit 이 쓰는 모드 — 인덱스만 본다
  python3 scripts/check-frozen.py              # 자문(advisory) — 스테이지+워킹트리 둘 다,
                                                #   수동으로 미리 훑어볼 때만. 훅에선 안 쓴다.
  python3 scripts/check-frozen.py <커밋>       # 그 커밋이 그 시점 WORK.md 로 통과했을지
                                                #   재현(회귀 테스트·감사용)

종료 코드: 막혀야 하면 1, 진행해도 되면 0.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FROZEN_JSON = os.path.join(ROOT, "scripts", "frozen-quests.json")
PENDING_BADGE_JSON = os.path.join(ROOT, "scripts", "pending-badge-quests.json")
WORKMD_PATH = ".claude/WORK.md"

# 고정 마커 — 결함③④⑤ 대응. 이 정확한 모양(헤딩 #, ✅, "동결 승인:", "범위:")만 잡는다.
#   예: "### ✅ 동결 승인: mooin3 (2026-09-25) — 범위: narr 한 줄 삽입"
MARKER_RE = re.compile(
    r"^\s{0,3}#{1,6}\s*✅\s*동결\s*승인:\s*([A-Za-z0-9_-]+)\s*\([^)]*\)\s*[—\-]\s*범위:",
    re.M,
)
USACO_HEADER_RE = re.compile(r"^\s*//\s*🔒?\s*USACO_VERIFIED", re.M)

# ── 결함⑥ (2026-09-24, 이 걸쇠를 켠 당일에 드러났다) ────────────────────────────
# 처음엔 USACO_VERIFIED 를 **파일 단위**로 걸었다. 그랬더니 시뮬 자막 한 줄
# (`subtitle={...}`)만 고쳐도 커밋이 막혔다 — quest 파일 하나 안에 「검증된 코드 배열」과
# 「시뮬·화면 코드」가 **같이 살기 때문**이다. 이 저장소의 거의 모든 quest 가 그 모양이다.
#
# ⚠️ **CLAUDE.md 의 규칙은 원래 변수 단위다** — *"헤더에 USACO_VERIFIED 있는 파일의
#    `SOLUTION_CODE`, `*_CPP`, `*_PY` 변수는 절대 자동 수정 금지"*. 파일 전체가 아니다.
#    그래서 게이트를 **느슨하게가 아니라 규칙대로 정확하게** 맞춘다 —
#    **바뀐 줄이 보호 변수 블록 안에 있을 때만** 건다.
#
# 보수적으로 짠다: 옛 파일·새 파일 **양쪽**에서 블록 범위를 구해 둘 다 본다(줄이 지워진
# 경우를 놓치지 않으려고). 블록을 못 찾으면 **막는 쪽**으로 넘어진다(fail-closed 유지).
# 못 보는 것: 보호 변수를 **다른 파일에서** 조립해 넣는 경우. 그건 사람이 봐야 한다.
# ⚠️ **회귀 테스트가 내 첫 판을 잡았다.** 처음엔 `const NAME = [` 만 봤는데,
#    어젯밤 사고 커밋 `fb5367dd` 가 건드린 건 `const M3_MAP_PY = (E) => [` 였다 —
#    **화살표 함수가 배열을 돌려주는 모양.** 그래서 「보호 변수 안 건드렸다」로 통과할 뻔했다.
#    회귀 케이스를 안 돌렸으면 **걸쇠에 구멍을 내면서 고친 줄 알았을 것이다.**
# ⚠️ **두 번째 회귀 케이스 (2026-09-26).** 위 패턴은 **대문자 이름만** 본다.
#    그런데 `simplegame` 은 `const fullPy = (E) => [` 처럼 **소문자 카멜**로 쓴다 —
#    그리고 `simplegame` 은 `scripts/pending-badge-quests.json` 에 들어 있는,
#    **문서상 PASS 인데 배지가 없어서 이 걸쇠가 대신 지키기로 한** quest 다.
#    즉 **지키는 줄 알았는데 안 지키고 있었다.** 정답 코드를 고쳐도 통과했다.
#    `check-solution-code-unchanged.py` 는 이미 소문자를 보고 있었는데
#    (`[a-z][A-Za-z0-9]*(?:Py|Cpp|Code)`) **걸쇠 쪽만 좁았다** — 두 검사기가
#    같은 것을 다른 눈으로 보고 있던 것이다. 눈을 맞춘다.
PROTECTED_NAME_RE = re.compile(
    r"^(SOLUTION_CODE$"
    r"|.*_(PY|CPP)$|.*_(PY|CPP)_.*"
    r"|[a-z][A-Za-z0-9]*(Py|Cpp|Code)$)")
BLOCK_START_RE = re.compile(
    r"^\s*(?:export\s+)?const\s+([A-Za-z_][\w]*)\s*=\s*"
    r"(?:\([^)]*\)\s*=>\s*|[A-Za-z_][\w]*\s*=>\s*)?[\[`]"
)


def protected_line_ranges(text):
    """보호 변수(`SOLUTION_CODE`·`*_PY`·`*_CPP`) 선언이 차지하는 줄 범위들."""
    if not text:
        return None                      # 내용을 못 읽었다 → 호출부가 막는 쪽으로 처리
    lines = text.split("\n")
    ranges, i = [], 0
    while i < len(lines):
        m = BLOCK_START_RE.match(lines[i])
        if m and PROTECTED_NAME_RE.match(m.group(1)):
            start = i + 1
            depth = lines[i].count("[") - lines[i].count("]")
            tick = lines[i].count("`") % 2
            j = i + 1
            while j < len(lines) and (depth > 0 or tick):
                depth += lines[j].count("[") - lines[j].count("]")
                tick = (tick + lines[j].count("`")) % 2
                j += 1
            ranges.append((start, j + 1))
            i = j
        i += 1
    return ranges


HUNK_RE = re.compile(r"^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@")


def touches_protected(path, diff_text, old_text, new_text):
    """이 파일의 diff 가 보호 변수 블록을 실제로 건드리나."""
    old_r, new_r = protected_line_ranges(old_text), protected_line_ranges(new_text)
    if old_r is None or new_r is None:
        return True                      # 못 읽으면 막는다
    def hit(ranges, start, count):
        end = start + max(count, 1)
        return any(start < b and end > a for a, b in ranges)
    for line in diff_text.split("\n"):
        m = HUNK_RE.match(line)
        if not m:
            continue
        os_, oc, ns, nc = (int(m.group(1)), int(m.group(2) or 1),
                           int(m.group(3)), int(m.group(4) or 1))
        if hit(old_r, os_, oc) or hit(new_r, ns, nc):
            return True
    return False


def run(args):
    return subprocess.run(args, cwd=ROOT, capture_output=True, text=True)


def git_show(spec):
    """`git show <spec>` 의 stdout. 실패(없는 파일·삭제됨 등)하면 None."""
    r = run(["git", "show", spec])
    return r.stdout if r.returncode == 0 else None


def load_frozen_quests():
    """1차 소스 = scripts/frozen-quests.json. 결함① 대응 — 실패하면 (None, 이유) 로
    돌려주고, main() 이 이걸 fail-closed(커밋 막힘)로 처리한다. 저장소 밖 파일에
    기대지 않는다."""
    if not os.path.exists(FROZEN_JSON):
        return None, f"{FROZEN_JSON} 없음"
    try:
        data = json.loads(open(FROZEN_JSON, encoding="utf-8").read())
    except Exception as e:
        return None, f"{FROZEN_JSON} 파싱 실패: {e}"
    quests = data.get("quests")
    if not isinstance(quests, list) or not quests:
        return None, f"{FROZEN_JSON} 의 'quests' 가 배열이 아니거나 비어있음"
    return set(quests), None


def load_pending_badge_quests():
    """결함⑦ 대응 — 문서상 PASS 인데 파일에 USACO_VERIFIED 헤더가 아직 없는 quest 목록.
    frozen-quests.json 과 달리 **fail-open** 이다: 이건 이미 있는 fail-closed 안전망
    위에 얹는 추가 보호라, 이 파일 하나가 지워졌다고 저장소 전체 커밋을 막을 이유는
    없다고 판단했다. 못 읽으면 (빈 set, 경고 메시지) 를 돌려준다 — main() 이 경고만
    찍고 진행한다."""
    if not os.path.exists(PENDING_BADGE_JSON):
        return set(), f"{PENDING_BADGE_JSON} 없음"
    try:
        data = json.loads(open(PENDING_BADGE_JSON, encoding="utf-8").read())
    except Exception as e:
        return set(), f"{PENDING_BADGE_JSON} 파싱 실패: {e}"
    quests = data.get("quests")
    if not isinstance(quests, list):
        return set(), f"{PENDING_BADGE_JSON} 의 'quests' 가 배열이 아님"
    return set(quests), None


def build_mode(argv):
    """(files, content_fn, 설명) — 모드별로 "무엇이 바뀌었나" 와 "그 파일 내용을 어떻게
    읽나" 를 만든다. content_fn 은 WORK.md 를 읽을 때도 그대로 재사용한다(같은 스냅샷
    기준이어야 "이 커밋 안에서 마커를 같이 추가"하는 경우가 맞게 인정된다)."""
    if "--staged" in argv:
        # 결함② 대응 — 인덱스만 본다. 워킹트리 쳐다보지 않는다.
        files = [f for f in run(["git", "diff", "--cached", "--name-only"]).stdout.splitlines() if f.strip()]

        def content_fn(path):
            return git_show(f":{path}")

        return files, content_fn, "staged(인덱스)", ["git", "diff", "--cached", "-U0", "--"], "HEAD"

    positional = [a for a in argv if not a.startswith("--")]
    if positional:
        ref = positional[0]
        files = [f for f in run(["git", "diff", "--name-only", f"{ref}^", ref]).stdout.splitlines() if f.strip()]

        def content_fn(path, ref=ref):
            return git_show(f"{ref}:{path}")

        return files, content_fn, f"커밋 {ref} (그 시점 기준 재현)", ["git", "diff", "-U0", f"{ref}^", ref, "--"], f"{ref}^"

    # 자문(advisory) 기본값 — 스테이지 + 워킹트리 둘 다. **pre-commit 훅은 이 분기를
    # 절대 쓰지 않는다**(--staged 를 명시적으로 넘긴다). 사람이 손으로 미리 훑어볼 때만.
    staged = {f for f in run(["git", "diff", "--cached", "--name-only"]).stdout.splitlines() if f.strip()}
    worktree = {f for f in run(["git", "diff", "--name-only"]).stdout.splitlines() if f.strip()}
    files = sorted(staged | worktree)

    def content_fn(path):
        c = git_show(f":{path}")
        if c is not None:
            return c
        p = os.path.join(ROOT, path)
        return open(p, encoding="utf-8", errors="ignore").read() if os.path.exists(p) else None

    return files, content_fn, "advisory: staged+워킹트리 (훅 아님, 수동 점검용)", ["git", "diff", "HEAD", "-U0", "--"], "HEAD"


def approved_quest_ids(workmd_text):
    if not workmd_text:
        return set()
    return {m.group(1) for m in MARKER_RE.finditer(workmd_text)}


def main():
    argv = sys.argv[1:]

    frozen, err = load_frozen_quests()
    if err:
        print(f"⛔ 동결 목록을 못 읽었다 — fail-closed 로 커밋을 막는다.\n   이유: {err}")
        print("   scripts/frozen-quests.json 을 고쳐라. 정말 예외 상황이면 --no-verify (비권장, 의식적 우회만).")
        return 1

    pending_badges, pending_err = load_pending_badge_quests()
    if pending_err:
        print(f"⚠️  {pending_err} — 이 부가 보호(문서상 PASS·헤더 없는 quest)는 이번엔 건너뛴다.")

    files, content_fn, mode_desc, diff_cmd, base_ref = build_mode(argv)
    if not files:
        print(f"변경된 파일 없음 ({mode_desc})")
        return 0

    hits_frozen = {}    # quest_id -> [file, ...]
    hits_pending = {}   # quest_id -> [file, ...]  — 문서상 PASS, 헤더 없음
    hits_verified = []
    skipped_display_only = []            # USACO 파일이지만 보호 변수는 안 건드린 것
    skipped_pending_display_only = []    # pending-badge quest 지만 보호 변수는 안 건드린 것
    for f in sorted(set(files)):
        m = re.match(r"quest-problems/([^/]+)/", f)
        qid = m.group(1) if m else None
        if qid and qid in frozen:
            hits_frozen.setdefault(qid, []).append(f)
        if f.endswith((".jsx", ".tsx", ".ts")):
            content = content_fn(f)
            if content and USACO_HEADER_RE.search(content[:600]):
                # ⚠️ 결함⑥ — 파일이 아니라 **보호 변수 블록을 건드렸나**로 판정한다.
                #    (CLAUDE.md 규칙 자체가 변수 단위다. 위 protected_line_ranges 주석 참고.)
                diff_text = run(diff_cmd + [f]).stdout or ""
                old_text = git_show(f"{base_ref}:{f}")
                if touches_protected(f, diff_text, old_text, content):
                    hits_verified.append(f)
                else:
                    skipped_display_only.append(f)
            elif content and qid and qid in pending_badges:
                # 결함⑦ — 헤더는 없지만 USACO_VERIFICATION.md 엔 PASS 로 적혀 있는 quest.
                # 같은 protected_line_ranges/touches_protected 로직을 헤더 유무와 무관하게 적용한다.
                diff_text = run(diff_cmd + [f]).stdout or ""
                old_text = git_show(f"{base_ref}:{f}")
                if touches_protected(f, diff_text, old_text, content):
                    hits_pending.setdefault(qid, []).append(f)
                else:
                    skipped_pending_display_only.append(f)

    if skipped_display_only:
        print(f"ℹ️  USACO_VERIFIED 파일 {len(skipped_display_only)}개 — **보호 변수는 안 건드렸다**(표시 부분만).")
        for f in skipped_display_only:
            print(f"     {f}")
        print("   규칙은 파일이 아니라 `SOLUTION_CODE`·`*_PY`·`*_CPP` **변수** 단위다 (CLAUDE.md).")
        print("   ⚠️ 그래도 diff 는 눈으로 읽어라 — 이 판정은 줄 범위로만 본다.\n")
    if skipped_pending_display_only:
        print(f"ℹ️  문서상 PASS·헤더 없는 quest 파일 {len(skipped_pending_display_only)}개 — **보호 변수는 안 건드렸다**(표시 부분만).")
        for f in skipped_pending_display_only:
            print(f"     {f}")
        print()
    if not hits_frozen and not hits_verified and not hits_pending:
        print(f"✅ 변경 {len(files)}개 파일 ({mode_desc}) — 동결 quest·USACO_VERIFIED·문서상 PASS(헤더 없음) 해당 없음")
        return 0

    workmd_text = content_fn(WORKMD_PATH) or ""
    approved = approved_quest_ids(workmd_text)

    blocking_frozen = []
    blocking_pending = []
    passed_notes = []
    for qid, fs in hits_frozen.items():
        if qid in approved:
            passed_notes.append(f"  🔓 동결 quest {qid:<12} — WORK.md 승인 마커 확인됨: {', '.join(fs)}")
        else:
            blocking_frozen.append((qid, fs))
    for qid, fs in hits_pending.items():
        if qid in approved:
            passed_notes.append(f"  🔓 문서상 PASS quest {qid:<12} — WORK.md 승인 마커 확인됨: {', '.join(fs)}")
        else:
            blocking_pending.append((qid, fs))

    if passed_notes:
        print("\n".join(passed_notes))

    if not blocking_frozen and not blocking_pending and not hits_verified:
        print(f"✅ 동결/문서상 PASS quest {len(hits_frozen) + len(hits_pending)}개 — 전부 승인 마커로 통과 ({mode_desc})")
        return 0

    print(f"\n🔒 멈춰라 — 변경 {len(files)}개 중 건드리면 안 되는 게 있다 ({mode_desc})\n")
    for qid, fs in blocking_frozen:
        for f in fs:
            print(f"  동결 quest(승인 없음)         {qid:<12} {f}")
    for qid, fs in blocking_pending:
        for f in fs:
            print(f"  문서상 PASS·헤더 없음(승인 없음)  {qid:<12} {f}")
    for f in hits_verified:
        print(f"  USACO 검증               {f}")

    print("""
동결 quest = 선생님이 직접 polish 한 것. "명시적 변경 요청 전엔 읽기 전용" 이다.
문서상 PASS(헤더 없음) = USACO_VERIFICATION.md 엔 PASS 로 적혀 있는데 파일에
  // 🔒 USACO_VERIFIED 헤더가 아직 없는 quest(scripts/pending-badge-quests.json).
  ⚠️ 이건 "USACO_VERIFIED" 가 아니다 — 재제출로 헤더를 붙이기 전까지의 임시 보호다.
USACO_VERIFIED = 채점기로 검증된 코드(단, 통과를 보장하진 않는다 — 위 docstring 참고).
  고치면 재제출이 필요하다.

⛔ `--no-verify` 로 그냥 넘기지 마라 — 이 걸쇠는 어젯밤 정확히 그 자리에서 사고가
   났기 때문에 생겼다.

올바른 우회:
  · 동결 quest / 문서상 PASS quest 는 — `.claude/WORK.md` 에 아래 모양 그대로 마커를
    **먼저** 추가하고(이 커밋 안에 같이 넣어도 된다) 다시 커밋해라. 범위는 감사
    기록일 뿐 게이트가 검증하진 않는다 — "정말 이 범위 안인지"는 PM/검토자가 diff 를
    읽어야 한다.

        ### ✅ 동결 승인: <quest-id> (<오늘 날짜>) — 범위: <무엇을 허락받았나 한 줄>

  · USACO_VERIFIED 는 — 마커로 안 뚫린다. 선생님이 명시적으로 이 수정을 요청했을
    때만 `--no-verify` 로 의식적으로 넘기고, **재제출 후 헤더 주석을 갱신해라.**""")
    return 1


if __name__ == "__main__":
    sys.exit(main())
