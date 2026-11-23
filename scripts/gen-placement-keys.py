# -*- coding: utf-8 -*-
"""
배치고사 코딩 문제의 **정답 키를 기계로 만든다**.

손으로 "이쯤 나오겠지" 적은 기대 출력은 쓰지 않는다 — 배치고사가 틀리면
학생의 티어 전체가 틀린다. 각 문제의 레퍼런스 해답을 여기에 한 번만 적고,
stdin 을 넣어 받은 stdout 을 그대로 `data/placement-code.ts` 에 옮긴다.

실행:  python scripts/gen-placement-keys.py
"""
import io, json, sys


def run(fn, stdin):
    old_in, old_out = sys.stdin, sys.stdout
    sys.stdin, buf = io.StringIO(stdin), io.StringIO()
    sys.stdout = buf
    try:
        fn()
    finally:
        sys.stdin, sys.stdout = old_in, old_out
    return buf.getvalue().rstrip("\n")


# ── 레퍼런스 해답 ──────────────────────────────────────────────────────────

def s01():
    a, b = map(int, input().split())
    print(a + b)
    print(a - b)


def s02():
    s = int(input())
    print("A" if s >= 90 else "B" if s >= 80 else "C" if s >= 70 else "D" if s >= 60 else "F")


def s03():
    input()
    print(" ".join(map(str, sorted(set(map(int, input().split()))))))


def s04():
    input()
    a = list(map(int, input().split()))
    m = max(a)
    print(m)
    print(a.index(m) + 1)


def s05():
    s = input().strip()
    print(1 if s == s[::-1] else 0)


def s06():
    input()
    a = list(map(int, input().split()))

    def prime(x):
        if x < 2:
            return False
        d = 2
        while d * d <= x:
            if x % d == 0:
                return False
            d += 1
        return True

    print(sum(1 for x in a if prime(x)))


def s07():
    n, k = map(int, input().split())
    cnt = {}
    for _ in range(n):
        w = input().strip()
        cnt[w] = cnt.get(w, 0) + 1
    order = sorted(cnt, key=lambda w: (-cnt[w], w))
    print("\n".join(order[:k]))


def s08():
    n, m = map(int, input().split())
    a = list(map(int, input().split()))
    pre = [0]
    for x in a:
        pre.append(pre[-1] + x)
    out = []
    for _ in range(m):
        i, j = map(int, input().split())
        out.append(pre[j] - pre[i - 1])
    print("\n".join(map(str, out)))


def s09():
    n = int(input())
    iv = sorted(tuple(map(int, input().split())) for _ in range(n))
    out = []
    for l, r in iv:
        if out and l <= out[-1][1]:
            out[-1][1] = max(out[-1][1], r)
        else:
            out.append([l, r])
    print(len(out))
    for l, r in out:
        print(l, r)


def s10():
    n, k = map(int, input().split())
    coins = [int(input()) for _ in range(n)]
    INF = float("inf")
    dp = [0] + [INF] * k
    for v in range(1, k + 1):
        for c in coins:
            if v >= c and dp[v - c] + 1 < dp[v]:
                dp[v] = dp[v - c] + 1
    print(-1 if dp[k] == INF else dp[k])


# ── 각 문제의 stdin 모음 ───────────────────────────────────────────────────
# 앞의 `samples` 개는 학생에게 **예제로 공개**된다. 나머지는 숨은 테스트다.

BANK = [
    ("pc01", 1, s01, 1, ["3 4\n", "-10 25\n", "0 0\n", "1000 -1000\n"]),
    ("pc02", 2, s02, 2, ["95\n", "72\n", "80\n", "60\n", "59\n", "100\n", "0\n"]),
    ("pc03", 3, s03, 1, ["5\n3 1 3 2 1\n", "1\n7\n", "4\n5 5 5 5\n",
                         "6\n-1 0 -1 2 0 3\n"]),
    ("pc04", 4, s04, 1, ["5\n3 29 38 12 57\n", "3\n-5 -2 -9\n", "1\n7\n", "4\n10 40 20 30\n"]),
    ("pc05", 5, s05, 2, ["level\n", "python\n", "a\n", "abba\n", "abca\n"]),
    ("pc06", 6, s06, 1, ["4\n1 3 5 7\n", "5\n2 4 6 8 9\n", "1\n1\n", "3\n997 999 1000\n"]),
    ("pc07", 7, s07, 1, ["6 2\napple\nbanana\napple\ncherry\nbanana\napple\n",
                         "4 2\nb\na\nb\na\n", "1 1\nhello\n",
                         "7 3\nz\ny\nz\nx\ny\nz\nw\n"]),
    ("pc08", 8, s08, 1, ["5 3\n5 4 3 2 1\n1 3\n2 4\n5 5\n",
                         "3 1\n1 2 3\n1 3\n", "4 2\n1 1 1 1\n2 2\n1 4\n"]),
    ("pc09", 9, s09, 1, ["4\n1 3\n2 6\n8 10\n15 18\n", "2\n1 4\n4 5\n", "1\n5 7\n",
                         "3\n5 6\n1 2\n3 4\n", "3\n1 10\n2 3\n4 5\n"]),
    ("pc10", 10, s10, 2, ["3 15\n1\n5\n12\n", "2 7\n3\n5\n",
                          "1 10\n3\n", "3 6\n1\n3\n4\n", "2 10\n2\n5\n"]),
]

out = []
for pid, step, fn, samples, stdins in BANK:
    out.append({
        "id": pid, "step": step, "sampleCount": samples,
        "tests": [{"stdin": s, "expected": run(fn, s)} for s in stdins],
    })

print(json.dumps(out, ensure_ascii=False, indent=2))
