#!/usr/bin/env python3
"""내 코드가 **어디서** 틀렸나 — 제일 작은 반례를 찾아 준다.

왜 (2026-09-30): 선생님이 `makedistinct` 를 직접 풀어 보시고 물으셨다 —
  *"내가 이해한대로 코드를 작성해봤는데 **뭐가 틀렸는지 보고 싶은건데**"*

「틀렸다」는 말은 도움이 안 된다. 필요한 건 **제일 작은 입력 하나**다.
사람은 `N=5` 짜리 반례 하나를 손으로 따라가면 바로 안다.

    python3 scripts/find-counterexample.py <quest-id> <내코드.py>

하는 일:
  ① quest 의 🔒 정답 코드를 꺼내 「정답」으로 삼는다
  ② 제약(수는 1..N · K 는 −N..N, 0 제외)을 지키는 작은 입력을 작게부터 훑는다
  ③ 처음 갈리는 입력을 찾으면 **거기서 멈추고** 양쪽 답을 보여준다
  ④ 더 작은 반례가 있으면 줄여 준다(원소를 하나씩 빼 보면서)

⚠️ **반례를 못 찾았다고 맞는 코드가 아니다.** 작은 입력만 본다 —
   큰 입력에서만 나는 오차(오버플로·시간 초과)는 **원리상 못 잡는다.**
⚠️ 제약을 읽어 오는 게 아니라 **quest 마다 손으로 적어 둔다**(아래 `LIMITS`).
   없는 quest 는 기본값으로 돈다 — 그 경우 **존재할 수 없는 입력**이 나올 수 있으니
   반례를 받으면 제약을 먼저 확인해라(2026-09-29 에 그걸로 한 번 헛다리를 짚었다).
"""
import argparse
import itertools
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# quest 마다 「입력을 어떻게 만드나」. 원문 제약을 손으로 옮겨 적는다.
#   gen(n, k) → stdin 문자열,  ks(n) → 시험할 K 들,  vals(n) → 값이 고를 수 있는 범위
LIMITS = {
    "makedistinct": {
        "vals": lambda n: range(1, n + 1),          # 수는 1 부터 N 사이
        "ks":   lambda n: [k for k in range(-n, n + 1) if k != 0],
        "gen":  lambda n, k, a: f"1\n{n} {k}\n{' '.join(map(str, a))}\n",
    },
}


def run(path, stdin, timeout=10):
    try:
        p = subprocess.run([sys.executable, path], input=stdin,
                           capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return None, "시간 초과"
    if p.returncode != 0:
        return None, (p.stderr.strip().splitlines() or ["실행 오류"])[-1]
    return p.stdout.strip(), None


def solution_path(quest):
    """quest 의 🔒 정답 코드를 임시 파일로 꺼낸다 (run-quest-code.py 를 그대로 쓴다)."""
    # ⚠️ `run-quest-code.py --show` 는 **헤더를 stderr 로, 코드를 stdout 으로** 낸다.
    #    처음엔 stdout 첫 줄이 헤더인 줄 알고 한 줄을 버렸다가 코드가 깨졌다.
    out = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "run-quest-code.py"),
                          quest, "--show"], capture_output=True, text=True, cwd=ROOT)
    code = out.stdout.strip("\n")
    if out.returncode != 0 or not code.strip():
        sys.exit(f"🔒 정답 코드를 못 찾았다 — quest id 를 확인해라: {quest}\n   {out.stderr.strip()}")
    code += "\n"
    tmp = os.path.join(ROOT, ".sol_tmp.py")
    with open(tmp, "w") as f:
        f.write(code)
    return tmp


def shrink(quest, mine, sol, n, k, a, spec):
    """원소를 하나씩 빼 보면서 더 작은 반례를 찾는다."""
    changed = True
    while changed and len(a) > 2:
        changed = False
        for i in range(len(a)):
            b = a[:i] + a[i + 1:]
            m = len(b)
            if any(v > m for v in b) or abs(k) > m:
                continue                      # 제약(수 ≤ N, |K| ≤ N)을 깨면 버린다
            s = spec["gen"](m, k, b)
            g, _ = run(mine, s)
            e, _ = run(sol, s)
            if g != e:
                a, n, changed = b, m, True
                break
    return n, a


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("quest")
    ap.add_argument("mycode")
    ap.add_argument("--max-n", type=int, default=6, help="시험할 최대 원소 개수 (기본 6)")
    args = ap.parse_args()

    spec = LIMITS.get(args.quest)
    if spec is None:
        sys.exit(f"이 quest 의 입력 만드는 법이 아직 안 적혀 있다: {args.quest}\n"
                 f"   `LIMITS` 에 한 칸 추가해라 (원문 제약을 보고).")

    sol = solution_path(args.quest)
    print(f"🔒 {args.quest} 정답 코드와 대조한다.  내 코드: {args.mycode}\n")
    tried = 0
    try:
        for n in range(2, args.max_n + 1):
            for k in spec["ks"](n):
                for a in itertools.product(spec["vals"](n), repeat=n):
                    a = list(a)
                    tried += 1
                    stdin = spec["gen"](n, k, a)
                    got, err1 = run(args.mycode, stdin)
                    exp, err2 = run(sol, stdin)
                    if err2:
                        continue
                    if err1 or got != exp:
                        n2, a2 = shrink(args.quest, args.mycode, sol, n, k, a, spec)
                        s2 = spec["gen"](n2, k, a2)
                        g2, e1 = run(args.mycode, s2)
                        e2, _ = run(sol, s2)
                        print("❌ 갈리는 입력을 찾았다 — 제일 작게 줄인 것이다.\n")
                        print("   ── 입력 ──")
                        for line in s2.rstrip("\n").split("\n"):
                            print("   " + line)
                        print()
                        print(f"   내 코드 →  {g2 if not e1 else '(' + e1 + ')'}")
                        print(f"   정답    →  {e2}")
                        print(f"\n   여기까지 {tried:,} 개를 시험했다.")
                        print("\n⭐ 이 입력을 **손으로** 따라가 봐라 — 작아서 종이로 된다.")
                        print("   어디서 갈리는지는 「답이 몇이냐」가 아니라 **그 과정**에 있다.")
                        return 1
    finally:
        if os.path.exists(sol):
            os.remove(sol)

    print(f"✅ {tried:,} 개를 시험했는데 갈리는 입력이 없었다 (원소 {args.max_n} 개까지).")
    print("\n⚠️ **맞는 코드라는 증거가 아니다.** 작은 입력만 봤다 —")
    print("   큰 수에서만 나는 오차나 시간 초과는 **원리상 못 잡는다.**")
    print("   `--max-n` 을 올려 더 넓게 볼 수 있다(느려진다).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
