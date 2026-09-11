import sys
input = sys.stdin.readline

N, K = map(int, input().split())
Q = int(input())

# beauty[r][c] = current beauty of cow at (r,c). 0-indexed.
beauty = [[0] * N for _ in range(N)]

# W = number of valid top-left positions per dimension
W = N - K + 1

# S[i][j] = sum of K x K window with top-left (i,j)
S = [[0] * W for _ in range(W)]

cur_max = 0
out = []

for _ in range(Q):
    r, c, v = map(int, input().split())
    # the input counts from 1, our arrays count from 0
    r -= 1
    c -= 1

    delta = v - beauty[r][c]
    beauty[r][c] = v

    # windows containing (r,c) have top-left (i,j) with
    # max(0, r-K+1) <= i <= min(r, W-1),  same for j
    i_lo = max(0, r - K + 1)
    i_hi = min(r, W - 1)
    j_lo = max(0, c - K + 1)
    j_hi = min(c, W - 1)

    for i in range(i_lo, i_hi + 1):
        for j in range(j_lo, j_hi + 1):
            S[i][j] += delta
            if S[i][j] > cur_max:
                cur_max = S[i][j]

    out.append(str(cur_max))

sys.stdout.write('\n'.join(out) + '\n')
