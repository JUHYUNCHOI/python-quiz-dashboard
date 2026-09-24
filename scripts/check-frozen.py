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
WORKMD_PATH = ".claude/WORK.md"

# 고정 마커 — 결함③④⑤ 대응. 이 정확한 모양(헤딩 #, ✅, "동결 승인:", "범위:")만 잡는다.
#   예: "### ✅ 동결 승인: mooin3 (2026-09-25) — 범위: narr 한 줄 삽입"
MARKER_RE = re.compile(
    r"^\s{0,3}#{1,6}\s*✅\s*동결\s*승인:\s*([A-Za-z0-9_-]+)\s*\([^)]*\)\s*[—\-]\s*범위:",
    re.M,
)
USACO_HEADER_RE = re.compile(r"^\s*//\s*🔒?\s*USACO_VERIFIED", re.M)


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


def build_mode(argv):
    """(files, content_fn, 설명) — 모드별로 "무엇이 바뀌었나" 와 "그 파일 내용을 어떻게
    읽나" 를 만든다. content_fn 은 WORK.md 를 읽을 때도 그대로 재사용한다(같은 스냅샷
    기준이어야 "이 커밋 안에서 마커를 같이 추가"하는 경우가 맞게 인정된다)."""
    if "--staged" in argv:
        # 결함② 대응 — 인덱스만 본다. 워킹트리 쳐다보지 않는다.
        files = [f for f in run(["git", "diff", "--cached", "--name-only"]).stdout.splitlines() if f.strip()]

        def content_fn(path):
            return git_show(f":{path}")

        return files, content_fn, "staged(인덱스)"

    positional = [a for a in argv if not a.startswith("--")]
    if positional:
        ref = positional[0]
        files = [f for f in run(["git", "diff", "--name-only", f"{ref}^", ref]).stdout.splitlines() if f.strip()]

        def content_fn(path, ref=ref):
            return git_show(f"{ref}:{path}")

        return files, content_fn, f"커밋 {ref} (그 시점 기준 재현)"

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

    return files, content_fn, "advisory: staged+워킹트리 (훅 아님, 수동 점검용)"


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

    files, content_fn, mode_desc = build_mode(argv)
    if not files:
        print(f"변경된 파일 없음 ({mode_desc})")
        return 0

    hits_frozen = {}   # quest_id -> [file, ...]
    hits_verified = []
    for f in sorted(set(files)):
        m = re.match(r"quest-problems/([^/]+)/", f)
        if m and m.group(1) in frozen:
            hits_frozen.setdefault(m.group(1), []).append(f)
        if f.endswith((".jsx", ".tsx", ".ts")):
            content = content_fn(f)
            if content and USACO_HEADER_RE.search(content[:600]):
                hits_verified.append(f)

    if not hits_frozen and not hits_verified:
        print(f"✅ 변경 {len(files)}개 파일 ({mode_desc}) — 동결 quest·USACO_VERIFIED 해당 없음")
        return 0

    workmd_text = content_fn(WORKMD_PATH) or ""
    approved = approved_quest_ids(workmd_text)

    blocking_frozen = []
    passed_notes = []
    for qid, fs in hits_frozen.items():
        if qid in approved:
            passed_notes.append(f"  🔓 동결 quest {qid:<12} — WORK.md 승인 마커 확인됨: {', '.join(fs)}")
        else:
            blocking_frozen.append((qid, fs))

    if passed_notes:
        print("\n".join(passed_notes))

    if not blocking_frozen and not hits_verified:
        print(f"✅ 동결 quest {len(hits_frozen)}개 — 전부 승인 마커로 통과 ({mode_desc})")
        return 0

    print(f"\n🔒 멈춰라 — 변경 {len(files)}개 중 건드리면 안 되는 게 있다 ({mode_desc})\n")
    for qid, fs in blocking_frozen:
        for f in fs:
            print(f"  동결 quest(승인 없음)  {qid:<12} {f}")
    for f in hits_verified:
        print(f"  USACO 검증               {f}")

    print("""
동결 quest = 선생님이 직접 polish 한 것. "명시적 변경 요청 전엔 읽기 전용" 이다.
USACO_VERIFIED = 채점기로 검증된 코드. 고치면 재제출이 필요하다.

⛔ `--no-verify` 로 그냥 넘기지 마라 — 이 걸쇠는 어젯밤 정확히 그 자리에서 사고가
   났기 때문에 생겼다.

올바른 우회:
  · 동결 quest 는 — `.claude/WORK.md` 에 아래 모양 그대로 마커를 **먼저** 추가하고
    (이 커밋 안에 같이 넣어도 된다) 다시 커밋해라. 범위는 감사 기록일 뿐 게이트가
    검증하진 않는다 — "정말 이 범위 안인지"는 PM/검토자가 diff 를 읽어야 한다.

        ### ✅ 동결 승인: <quest-id> (<오늘 날짜>) — 범위: <무엇을 허락받았나 한 줄>

  · USACO_VERIFIED 는 — 마커로 안 뚫린다. 선생님이 명시적으로 이 수정을 요청했을
    때만 `--no-verify` 로 의식적으로 넘기고, **재제출 후 헤더 주석을 갱신해라.**""")
    return 1


if __name__ == "__main__":
    sys.exit(main())
