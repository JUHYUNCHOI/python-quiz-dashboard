#!/usr/bin/env python3
"""건드리면 안 되는 파일을 건드렸는지 검사한다.

왜 있나 — 2026-09-04, 별표 393곳을 일괄로 지우다가 🔒 동결 quest 인 `rounding` 의
정답 코드(`10**pos`)와 Platinum 문제 `explodingarrow` 의 `[0]*(N+1)` 을 깨뜨렸다.
배포 검토에서 project-lead 가 잡았지만, **부르지 않았으면 그대로 나갔다.**

project-lead 제안: "부르는 걸 잊는 문제는 사람이 절대 안 잊는 스크립트로 대체하라."
LLM 판단이 필요 없는 대조는 기계가 한다. project-lead 는 '이게 좋은 방향인가' 에 집중한다.

  python3 scripts/check-frozen.py            # 아직 커밋 안 한 변경
  python3 scripts/check-frozen.py <커밋>     # 그 커밋이 건드린 파일
"""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEM = os.path.expanduser(
    "~/.claude/projects/-Users-juhyunchoi-Coding-python-quiz-dashboard/memory/quest_review_progress.md")


def frozen_quests():
    """quest_review_progress.md 의 '🔒 절대 안 건드리는 quest' 절에서 quest 이름을 뽑는다."""
    if not os.path.exists(MEM):
        return set(), "메모리 파일 없음 — 목록 확인 불가"
    s = open(MEM, encoding="utf-8").read()
    m = re.search(r"## 🔒 절대 안 건드리는 quest.*?\n(.*?)\n---", s, re.S)
    if not m:
        return set(), "동결 목록 절을 못 찾음"
    return set(re.findall(r"`([a-z0-9]+)`", m.group(1))), None


def changed(ref):
    cmd = ["git", "diff", "--name-only"] + ([ref + "^", ref] if ref else ["HEAD"])
    out = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True).stdout
    files = [f for f in out.split("\n") if f.strip()]
    if not ref:                                    # staged 도 같이
        out2 = subprocess.run(["git", "diff", "--cached", "--name-only"],
                              cwd=ROOT, capture_output=True, text=True).stdout
        files += [f for f in out2.split("\n") if f.strip()]
    return sorted(set(files))


def main():
    ref = sys.argv[1] if len(sys.argv) > 1 else None
    fro, warn = frozen_quests()
    if warn:
        print(f"⚠️  {warn}")
    files = changed(ref)
    if not files:
        print("변경된 파일 없음"); return 0

    hits_frozen, hits_verified = [], []
    for f in files:
        m = re.match(r"quest-problems/([^/]+)/", f)
        if m and m.group(1) in fro:
            hits_frozen.append((f, m.group(1)))
        p = os.path.join(ROOT, f)
        if os.path.exists(p) and f.endswith((".jsx", ".tsx", ".ts")):
            head = open(p, encoding="utf-8", errors="ignore").read(600)
            if "USACO_VERIFIED" in head:
                hits_verified.append(f)

    if not hits_frozen and not hits_verified:
        print(f"✅ 변경 {len(files)}개 파일 — 동결 quest·USACO_VERIFIED 해당 없음")
        return 0

    print(f"🔒 멈춰라 — 변경 {len(files)}개 중 건드리면 안 되는 게 있다\n")
    for f, q in hits_frozen:
        print(f"  동결 quest  {q:<12} {f}")
    for f in hits_verified:
        print(f"  USACO 검증  {f}")
    print("""
동결 quest = 선생님이 직접 polish 한 것. "명시적 변경 요청 전엔 읽기 전용" 이다.
USACO_VERIFIED = 채점기로 검증된 코드. 고치면 재제출이 필요하다.

정말 손대야 한다면:
  · 선생님께 명시적으로 확인받았는가?
  · 일괄 스크립트·정규식으로 건드리는 건 아닌가? (2026-09-04 사고가 그것이었다)
  · git diff 로 지워진 줄을 눈으로 읽었는가? stat 숫자만 보지 마라.""")
    return 1


if __name__ == "__main__":
    sys.exit(main())
