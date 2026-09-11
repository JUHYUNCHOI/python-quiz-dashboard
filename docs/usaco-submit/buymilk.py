import sys
input = sys.stdin.readline

N, Q = map(int, input().split())
a = list(map(int, input().split()))

# Normalize: c[i] = cheapest cost for a 2^i-bucket block.
# Either buy deal i (a[i]), or two smaller blocks (2 * c[i-1]).
# After this, a bigger block is always cheaper PER BUCKET,
# so we can just use big blocks first — no recursion needed.
c = [0] * N
c[0] = a[0]
for i in range(1, N):
    c[i] = min(a[i], 2 * c[i - 1])

out = []
for _ in range(Q):
    x = int(input())
    ans = float('inf')
    cost = 0          # cost locked in so far
    rem = x           # buckets still to cover
    # biggest block (i = N-1) down to smallest (i = 0)
    for i in range(N - 1, -1, -1):
        size = 1 << i
        # option A: round UP with this block and stop (buy a little extra)
        need = (rem + size - 1) // size        # ceil(rem / size)
        ans = min(ans, cost + need * c[i])
        # option B: take the floor here, cover the rest with smaller blocks
        take = rem // size
        cost += take * c[i]
        rem -= take * size
    ans = min(ans, cost)   # covered exactly (rem == 0)
    out.append(ans)

print('\n'.join(map(str, out)))
