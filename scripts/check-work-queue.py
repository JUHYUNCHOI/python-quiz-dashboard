#!/usr/bin/env python3
"""큐에 할 일이 남았나 — **project-lead 를 부르기 전에 항상 이걸 먼저 돌린다.**

왜 생겼나 (2026-09-25)
──────────────────────
선생님이 하루에 **다섯 번** 물으셨다 —
  *"왜 자꾸 멈추지?"* · *"계속하라니까 왜 자꾸 멈춰? 원인이 뭐야?"* · *"계획을 안세워서 그래?"*

**계획이 없어서가 아니었다.** PM 이 전체 계획을 한 번에 줬는데도 멈췄다. 원인은 다섯이다:

  ① 보고를 「턴의 마지막 행동」으로 취급했다 — 한 덩어리 끝 → 3~5줄 → 정지.
     「결론만 3~5줄」은 **보고를 짧게 하라**는 뜻이지 **보고에서 멈추라**는 뜻이 아니다.
  ② 판정 항목 하나하나를 체크포인트로 삼았다 (`feedback_dont_stop_between_items` 세 번째 위반).
  ③ 「승인 대기」를 **전면 정지**로 썼다 — 막힌 것만 빼고 돌리면 됐다.
  ④ 다음 할 일을 매 턴 새로 유추했다 — 살아있는 큐가 없었다.
  ⑤ ⭐ **PM 은 Edit/Write/Task 도구가 없다.** 조사와 판정만 하고 실행은 늘 메인 세션 몫이라,
     PM 의 턴은 **구조적으로** 「판정 끝 → 되돌림」으로 끝난다. **그건 멈추라는 뜻이 아닌데**
     메인 세션이 그걸 구별할 표시가 없었다. PM 본인이 짚은 원인이다.

왜 걸쇠(git hook)가 아닌가
──────────────────────────
훅은 **커밋**이라는 사건에 건다. 이건 커밋 사건이 아니라 **「PM 을 또 부르려 하나」** 라는
오케스트레이션 사건이라 훅이 안 걸린다. 그래서 같은 철학(기억 말고 스크립트)만 옮겼다 —
**부르기 전에 이 스크립트가 먼저 답한다.**

읽는 것
───────
`.claude/QUEUE.md` 의 표에서 상태 칸만 본다. 셋뿐이다:
  `READY`   — 지금 바로 할 수 있다 (판정 불필요)
  `BLOCKED` — 왜 막혔는지 괄호 안에 **반드시** 적는다
  `DONE`    — 끝났거나 「안 한다」로 닫힘

⚠️ **「검토자 답을 기다리는 중」은 BLOCKED 가 아니다.** 기다리는 동안 다른 READY 를 돌린다.
   BLOCKED 는 넷뿐이다 — 계정·권한 / 학생 데이터 위험 / 제품 방향 / 되돌리기 어려운 것.

무엇을 못 보나 — **0건이 결백이 아니다**
────────────────────────────────────────
- 큐에 **안 적힌 일**은 당연히 못 본다. 새 사실이 나오면 **PM 을 부르는 대신 먼저 큐에 얹어라.**
- 상태 글자만 본다. 「READY 인데 사실 막혀 있다」 같은 건 사람이 알아야 한다.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, ".claude", "QUEUE.md")
ROW = re.compile(r"^\|\s*(?!무엇\b|항목\b|-)(.+?)\s*\|\s*(READY|BLOCKED|DONE)\b([^|]*)\|", re.M)


def main() -> int:
    if not os.path.exists(QUEUE):
        print("⛔ `.claude/QUEUE.md` 가 없다 — 큐 없이 일하면 또 「다음 뭐 하지」를 매번 유추하게 된다.")
        print("   만들고 나서 다시 돌려라.")
        return 1

    text = open(QUEUE, encoding="utf-8").read()
    rows = [(m.group(1).strip(), m.group(2), m.group(3).strip()) for m in ROW.finditer(text)]
    if not rows:
        print("⛔ 큐 표를 못 읽었다 — 상태는 `READY` · `BLOCKED(사유)` · `DONE` 셋 중 하나여야 한다.")
        return 1

    ready = [r for r in rows if r[1] == "READY"]
    blocked = [r for r in rows if r[1] == "BLOCKED"]
    done = [r for r in rows if r[1] == "DONE"]

    print(f"큐 {len(rows)}줄 — READY {len(ready)} · BLOCKED {len(blocked)} · DONE {len(done)}")

    # ⭐ 2026-09-25 — **이 스크립트가 「비었다」고 거짓말한 적이 있다.**
    #   `QUEUE.md` 만 읽으니, 내가 거기 「오늘 판정 10줄」만 적어 두면 당연히 비어 보인다.
    #   그때 `.claude/WORK.md` 에는 **열린 항목이 40개** 있었다.
    #   **큐가 둘인데 서로 안 맞는 게 「다음 뭐 하지」를 매 턴 재유추하게 만든 진짜 이유였다.**
    #   → `QUEUE.md` 는 **오늘 도는 것**, `WORK.md` 는 **전체 대장**. 여기서 **둘 다 세고,
    #     대장에 남은 게 있으면 「큐가 빈 게 아니다」라고 크게 떠든다.**
    backlog = 0
    wp = os.path.join(ROOT, ".claude", "WORK.md")
    if os.path.exists(wp):
        wt = open(wp, encoding="utf-8").read()
        backlog = len(re.findall(r"`(대기|진행|선생님)`", wt))
    if backlog:
        print(f"전체 대장(.claude/WORK.md) 에 아직 열린 항목 — **{backlog}개**")
    print()

    if ready:
        print("🚦 **project-lead 를 부르지 마라. 바로 이걸 해라:**\n")
        for i, (what, _, note) in enumerate(ready, 1):
            print(f"   {i}. {what}" + (f"  {note}" if note else ""))
        print("\n   ⚠️ 보고하고 멈추지 마라 — 이 줄들이 다 DONE 이 될 때까지가 **하나의 작업**이다.")
        if blocked:
            print(f"   ⚠️ BLOCKED {len(blocked)}줄이 있어도 **전면 정지가 아니다.** 위 READY 부터 돌려라.")
        return 0

    if blocked:
        print("⏸ READY 가 없다. 막힌 것만 남았다:\n")
        for what, _, note in blocked:
            print(f"   · {what}  {note or '⚠️ 사유가 안 적혀 있다 — 적어라'}")
        print("\n   사유가 「계정·권한 / 학생 데이터 / 제품 방향 / 되돌리기 어려움」이 아니면")
        print("   그건 BLOCKED 가 아니다 — READY 로 고치고 그냥 해라.")
        # ⚠️ 여기서 그냥 끝내면 **「막힌 것만 남았다 = 다 끝났다」로 읽힌다.**
        #    실제로 그 실수를 했다 — 대장에 39개가 열려 있는데 「READY 0」만 보고 멈췄다.
        if backlog:
            print(f"\n   ⛔ **그런데 「다 끝난」 게 아니다** — 대장에 **{backlog}개**가 열려 있다.")
            print("      막힌 둘은 선생님 몫이고, **나머지는 네가 할 수 있는 것들이다.**")
            print("      project-lead 에게 **그중 다음 것을 달라고** 해라. 멈추지 마라.")
        else:
            print("\n   **PM 을 부르는 건 위 사유가 풀렸을 때뿐이다.**")
        return 0

    if backlog:
        print(f"⚠️ **오늘 큐는 비었지만 「다 끝난」 게 아니다** — 대장에 {backlog}개가 열려 있다.")
        print("   project-lead 에게 **그 40여 개 중 다음 것을 달라고** 해라.")
        print("   ⛔ 「할 일이 없다」고 보고하지 마라 — 그건 큐가 작아서 그렇게 보이는 것뿐이다.")
        return 0
    print("✅ 큐도 대장도 비었다 — **이제 project-lead 를 불러 다음 계획을 받아라.**")
    return 0


if __name__ == "__main__":
    sys.exit(main())
