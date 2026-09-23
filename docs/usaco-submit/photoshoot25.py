import sys

# A function runs faster than top-level code in Python —
# so we put the whole solution inside main() and call it at the end.
def main():
    # Read every number in the whole input at once —
    # much faster than reading one line at a time for 30,000 updates.
    data = sys.stdin.read().split()
    nums = map(int, data)

    N = next(nums)
    K = next(nums)
    Q = next(nums)

    # beauty[r][c] = current beauty of cow at (r,c). 0-indexed.
    beauty = [[0] * N for _ in range(N)]

    # W = number of valid top-left positions per dimension
    W = N - K + 1

    # S[i][j] = sum of K x K window with top-left (i,j)
    S = [[0] * W for _ in range(W)]

    cur_max = 0
    out = []

    for _ in range(Q):
        # the input counts from 1, our arrays count from 0
        r = next(nums) - 1
        c = next(nums) - 1
        v = next(nums)

        delta = v - beauty[r][c]
        beauty[r][c] = v

        # windows containing (r,c) have top-left (i,j) with
        # max(0, r-K+1) <= i <= min(r, W-1),  same for j
        i_lo = max(0, r - K + 1)
        i_hi = min(r, W - 1)
        j_lo = max(0, c - K + 1)
        j_hi = min(c, W - 1)

        for i in range(i_lo, i_hi + 1):
            row = S[i]  # grab the row once — cheaper than S[i][j] twice
            for j in range(j_lo, j_hi + 1):
                new_val = row[j] + delta
                row[j] = new_val
                if new_val > cur_max:
                    cur_max = new_val

        out.append(str(cur_max))

    sys.stdout.write('\n'.join(out) + '\n')

main()
