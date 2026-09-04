#!/usr/bin/env python3
"""레슨 능동 스텝 비율 측정.

왜 있나 — 2026-09-04 검토에서 CLAUDE.md 의 실측 표가 **레슨마다 다른 잣대로**
세어져 있던 게 드러났다. 레슨 32 는 interactive 를 능동으로 세고 quiz 를 안 세서
56.8% 로 적혔는데, 문서에 적힌 규칙대로 세면 32.4% 다. 그래서 "유지 ✅" 로 남아
가장 손봐야 할 레슨이 3개월 넘게 방치됐다.

이전 도구는 /tmp/audit2.py 였고 재부팅에 사라져서 아무도 다시 잴 수 없었다.
그래서 저장소 안에 둔다.

잣대 (CLAUDE.md 품질 기준과 동일):
  능동 = tryit · practice · mission · quiz · predict · fillblank
  수동 = explain · interactive · 그 외
  ⚠️ interactive 는 능동이 아니다. "시각화는 보조, 연습 대체 ❌" 가 기준 원칙이다.

  python3 scripts/check-active-ratio.py           # 전체
  python3 scripts/check-active-ratio.py 32 23 5   # 특정 레슨만
"""
import glob, os, re, sys

ACTIVE = {"tryit", "practice", "mission", "quiz", "predict", "fillblank"}
STEP_TYPE = re.compile(r'type:\s*"([a-zA-Z]+)"')


def lesson_files(n):
    """레슨 하나의 실제 콘텐츠 파일. 27~52 는 서브폴더로 쪼개져 있다."""
    sub = sorted(glob.glob(f"data/lessons/lesson{n}/ch*.ts"))
    if sub:
        return sub
    top = f"data/lesson{n}.ts"
    # 4줄짜리 재수출 스텁은 내용이 없다
    if os.path.exists(top) and len(open(top, encoding="utf-8").read().splitlines()) > 10:
        return [top]
    return []


def measure(n):
    files = lesson_files(n)
    if not files:
        return None
    counts = {}
    for f in files:
        for t in STEP_TYPE.findall(open(f, encoding="utf-8").read()):
            counts[t] = counts.get(t, 0) + 1
    total = sum(counts.values())
    if total == 0:
        return None
    act = sum(v for k, v in counts.items() if k in ACTIVE)
    return act, total, counts


def main():
    args = sys.argv[1:]
    nums = [int(a) for a in args] if args else range(1, 53)
    rows = []
    for n in nums:
        r = measure(n)
        if r:
            act, total, counts = r
            rows.append((100.0 * act / total, n, act, total, counts))
    if not rows:
        print("측정할 레슨을 못 찾음"); return 1

    rows.sort()
    print(f"{'레슨':>4} {'능동%':>7} {'능동/전체':>10}  구성")
    print("-" * 78)
    for pct, n, act, total, counts in rows:
        mark = "❌" if pct < 45 else ("⚠️ " if pct < 50 else "  ")
        comp = " ".join(f"{k}{v}" for k, v in sorted(counts.items(), key=lambda x: -x[1]))
        print(f"{n:>4} {pct:>6.1f}% {act:>4}/{total:<5} {mark} {comp}")

    bad = [r for r in rows if r[0] < 50]
    print("-" * 78)
    print(f"측정 {len(rows)}개 · 50% 미만 {len(bad)}개 · 45% 미만 {sum(1 for r in rows if r[0] < 45)}개")
    return 0


if __name__ == "__main__":
    sys.exit(main())
