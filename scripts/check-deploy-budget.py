#!/usr/bin/env python3
"""오늘 이미 밀었나 — **배포는 하루 한 번**이다.

왜 (2026-09-21): 선생님이 Vercel 배포 목록을 보시고
  *"난 vercel.com에는 하루에 한번만할거고. 특별히 해야할때는 내가 얘기하겠다고 했는데"*
**이미 말씀하셨던 것**인데 내가 안 지켰다. 실측하면 9/17 에 세 번, 9/18 에 세 번 밀었다.

⚠️ 규칙은 `CLAUDE.md` 와 메모리에 적었다. 그런데 **오늘 세 번 당한 것처럼**
   (검사기가 한 모양만 봄 · 줄바꿈이 한 자리만 고쳐짐 · PDF CSS 169개)
   **규칙만 적고 검사 항목을 안 만들면 또 샌다.** 그래서 기계로 센다.

  python3 scripts/check-deploy-budget.py

나가는 값: 오늘 이미 밀었으면 1, 아직 안 밀었으면 0.
⚠️ 이건 **막는 장치가 아니라 세는 장치**다. 선생님이 "특별히" 라고 하시면 그때는 민다.
   다만 그 말씀 없이 두 번째로 미는 일이 없게 한다.
"""
import re
import subprocess
import sys
from datetime import datetime


def pushes():
    """`origin/main` 이 움직인 기록 = 푸시 기록. 한 번 움직일 때마다 배포 한 번이다."""
    try:
        out = subprocess.run(
            ["git", "reflog", "show", "origin/main", "--date=iso"],
            capture_output=True, text=True, check=False).stdout
    except OSError:
        return []
    rows = []
    for line in out.splitlines():
        m = re.search(r"\{(\d{4}-\d{2}-\d{2}) ([\d:]+)[^}]*\}.*?:\s*(.*)$", line)
        if m:
            rows.append((m.group(1), m.group(2), m.group(3).strip()))
    return rows


def main():
    rows = pushes()
    if not rows:
        print("푸시 기록을 못 읽었다 (얕은 클론이거나 origin/main 기록이 없다).")
        print("⚠️ 못 셌다고 마음대로 밀지 마라 — 선생님께 여쭤라.")
        return 0

    today = datetime.now().strftime("%Y-%m-%d")
    by_day = {}
    for d, t, _ in rows:
        by_day.setdefault(d, []).append(t)

    n = len(by_day.get(today, []))
    print(f"오늘({today}) 민 횟수 — **{n}번**\n")
    for d in sorted(by_day, reverse=True)[:6]:
        mark = "  ← 오늘" if d == today else ""
        over = "  🚨 하루 한 번을 넘겼다" if len(by_day[d]) > 1 and d != today else ""
        print(f"  {d}  {len(by_day[d])}번  ({', '.join(by_day[d])}){mark}{over}")

    unpushed = subprocess.run(["git", "rev-list", "--count", "origin/main..HEAD"],
                              capture_output=True, text=True, check=False).stdout.strip()
    print(f"\n안 밀린 커밋 — {unpushed or '?'}개")
    print("   커밋은 계속 쌓아도 된다. **문제는 푸시 횟수다.**")

    print()
    if n == 0:
        print("✅ 오늘은 아직 안 밀었다. 선생님이 지시하시면 밀 수 있다.")
        return 0
    print("🚨 **오늘 이미 밀었다. 또 밀지 마라.**")
    print("   선생님이 *\"특별히 해야할때는 내가 얘기하겠다\"* 고 하셨다 —")
    print("   그 말씀이 없으면 오늘치는 끝이다. 커밋만 쌓고 내일 묶어서 민다.")
    print("   근거: memory/feedback_deploy_frequency.md · CLAUDE.md 배포 절")
    return 1


if __name__ == "__main__":
    sys.exit(main())
