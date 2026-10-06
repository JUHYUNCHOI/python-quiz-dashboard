#!/usr/bin/env python3
"""CodeWalk 걸음이 **코드 상자에 물리적으로 들어갈 수 있나** — 소스에서 잰다.

왜 생겼나 (2026-10-06)
---------------------
학생(초6)이 `logicalmoos` 코드 탭에서: *"**증거가 안 보이고 주장만** 들었어요."*
그 걸음은 `hi: [3, 39]` — **37줄**을 한 번에 강조한다.
37 × 28px ≈ **1,036px** 인데 코드 상자의 **최대 높이는 560px** 이다
(`CodeWalk.jsx` 의 `Math.min(560, Math.max(140, avail))`).

⛔ **레이아웃으로 못 고친다.** 머리말을 하나도 안 두고 뷰포트를 통째로 줘도 안 들어간다.
   같은 날 `fcfac770` 로 스크롤 수식을 고쳐 **밖으로 나간 줄이 1,588 → 1,079** 로 줄었지만
   이런 걸음은 **그 32% 에 들어가지 못한다.** 고칠 자리는 코드가 아니라 **걸음을 쪼개는 일**이다.

⚠️ 왜 **소스에서** 재나 — `check-codewalk-hi-fits-box.mjs` 는 브라우저로 좌표를 잰다.
   느리고(전수 20분+) **병렬 금지**라 커밋 걸쇠로 못 쓴다. 이건 파일만 읽어 1초에 끝난다.
   ⭐ **둘은 다른 층이다.** 저건 「지금 화면에서 실제로 잘리나」(머리말·말풍선까지 포함),
   이건 「**어떤 화면에서도 들어갈 수 없나**」(걸음 자신의 크기만). 0건이어도 저건 걸린다.

잣대
----
  줄 높이 28px · 상자 최대 560px (`CodeWalk.jsx`)
  🚨 **20줄 초과** — 말풍선이 **0px 이어도** 안 들어간다. 걸음을 쪼개는 수밖에 없다.
  ⚠️ **17줄 초과** — 가장 짧은 말풍선(68px)만 얹어도 안 들어간다.

전수 실측(2026-10-06, 걸음 1,626개):
  🚨 20줄 초과 … **54건 · quest 33개** (최대 `explodingarrow` 40줄)
  ⚠️ 17줄 초과 … 98건 · quest 53개
  (참고: **실제로 재 보면** 상자가 머리말에 눌려 250px 안팎이라 6줄만 넘어도 잘린다 —
   686건 · quest 152개. 그건 이 검사기의 몫이 아니라 **범례·머리말 축**의 몫이다.)

⛔ **경고만 한다, 막지 않는다.** 이미 54건이 있어서 막으면 quest 33개가 통째로 잠긴다.
   래칫(새로 늘어난 것만 막기)으로 올릴지는 PM 판정 몫이다.
⚠️ **못 보는 것** — 말풍선 길이, 머리말이 상자를 누르는 정도, 가로 잘림. 전부 다른 축이다.
⭐ `--selftest` 로 **잣대가 사는지 먼저** 봐라.
"""
import re
import sys
import glob
import os

LINE_H = 28       # 실측 줄 높이(px) — CodeWalk 코드 줄
BOX_MAX = 560     # CodeWalk.jsx 의 상자 최대 높이
BUB_MIN = 68      # 가장 짧은 말풍선(두 줄) 실측

HARD = BOX_MAX // LINE_H                 # 20줄 — 말풍선이 0이어도 못 들어감
SOFT = (BOX_MAX - BUB_MIN) // LINE_H     # 17줄 — 가장 짧은 말풍선만 얹어도 못 들어감

BEAT = re.compile(r'\{\s*hi:\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]')


def scan(path):
    """(줄번호, 강조줄수) 목록."""
    out = []
    for i, line in enumerate(open(path, encoding="utf-8"), 1):
        for m in BEAT.finditer(line):
            lo, hi = int(m.group(1)), int(m.group(2))
            out.append((i, hi - lo + 1))
    return out


SELFTEST = '''
const walk = { beats: [
  { hi: [0, 5], bubble: "짧다 — 안 걸려야 한다" },
  { hi: [3, 39], bubble: "37줄 — 🚨 로 걸려야 한다" },
  { hi: [0, 18], bubble: "19줄 — ⚠️ 로 걸려야 한다" },
] };
'''


def selftest():
    import tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".jsx", delete=False,
                                     encoding="utf-8") as f:
        f.write(SELFTEST)
        p = f.name
    got = dict(scan(p))
    os.unlink(p)
    hard = [n for n in got.values() if n > HARD]
    soft = [n for n in got.values() if SOFT < n <= HARD]
    ok = (hard == [37]) and (soft == [19]) and (6 in got.values())
    print(f"   읽은 걸음: {sorted(got.values())}  (기대 [6, 19, 37])")
    if ok:
        print(f"✅ 잣대가 살아 있다 — 37줄은 🚨, 19줄은 ⚠️, 6줄은 안 걸린다")
        return 0
    print("🚨 **잣대가 죽었다.** 이 검사기의 「0건」을 믿지 마라.")
    return 1


def main():
    argv = sys.argv[1:]
    if "--selftest" in argv:
        sys.exit(selftest())
    staged = "--staged" in argv
    ids = [a for a in argv if not a.startswith("-")]

    if staged:
        import subprocess
        out = subprocess.run(["git", "diff", "--cached", "--name-only"],
                             capture_output=True, text=True).stdout.split()
        files = [f for f in out
                 if f.startswith("quest-problems/") and f.endswith("components.jsx")
                 and os.path.exists(f)]
    elif ids:
        files = []
        for q in ids:
            files += sorted(glob.glob(f"quest-problems/{q}/components.jsx"))
    else:
        files = sorted(glob.glob("quest-problems/*/components.jsx"))

    hard, soft, quests, total = [], [], set(), 0
    for f in files:
        qid = f.split(os.sep)[1]
        for ln, n in scan(f):
            total += 1
            if n > HARD:
                hard.append((qid, f, ln, n)); quests.add(qid)
            elif n > SOFT:
                soft.append((qid, f, ln, n))

    if hard:
        print(f"\n🚨 **어떤 화면에서도 못 들어가는 걸음** — 말풍선이 0px 이어도 안 된다\n")
        for qid, f, ln, n in sorted(hard, key=lambda r: -r[3]):
            print(f"   {n:3d}줄 ({n * LINE_H:>4}px)  {f}:{ln}")
    if soft:
        print(f"\n⚠️ 가장 짧은 말풍선만 얹어도 못 들어가는 걸음 — {len(soft)}건")
        for qid, f, ln, n in sorted(soft, key=lambda r: -r[3])[:8]:
            print(f"   {n:3d}줄  {f}:{ln}")
        if len(soft) > 8:
            print(f"   … {len(soft) - 8}건 더")

    print(f"\n걸음 {total}개 중 — 🚨 **{len(hard)}건 · quest {len(quests)}개** · ⚠️ {len(soft)}건")
    print(f"""
잣대: 줄 높이 {LINE_H}px · 코드 상자 최대 {BOX_MAX}px (`CodeWalk.jsx`)
   🚨 {HARD}줄 초과 — **레이아웃으로 못 고친다. 걸음을 쪼개라.**
   ⚠️ {SOFT}줄 초과 — 가장 짧은 말풍선({BUB_MIN}px)만 얹어도 안 들어간다.
⚠️ **이게 0건이어도 화면에서는 잘린다** — 실제 상자는 머리말에 눌려 250px 안팎이다.
   그쪽은 `check-codewalk-hi-fits-box.mjs`(좌표로 잰다, 느림·병렬 금지)가 본다.
⛔ **경고만 한다.** 이미 있는 것을 막으면 quest 33개가 통째로 잠긴다.
⭐ `--selftest` 로 잣대가 사는지 먼저 봐라.""")


if __name__ == "__main__":
    main()
