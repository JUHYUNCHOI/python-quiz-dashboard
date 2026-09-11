import sys
input = sys.stdin.readline

T, k = map(int, input().split())
out = []
for _ in range(T):
    N = int(input())
    S = input().strip()
    n3 = 3 * N
    if N % 2 == 1:
        out.append('-1')
        continue
    half = n3 // 2
    if S[:half] == S[half:]:
        out.append('1')
        out.append(' '.join(['1'] * n3))
        continue
    ans = [1] * n3
    for i in range(N // 2):
        a = S[i*3 : i*3 + 3]
        b = S[(i + N//2)*3 : (i + N//2)*3 + 3]
        if a != b:
            if a[:2] == b[1:]:
                ans[i*3 + 2] = 2
                ans[(i + N//2)*3] = 2
            else:
                ans[i*3] = 2
                ans[(i + N//2)*3 + 2] = 2
    M = max(ans)
    out.append(str(M))
    out.append(' '.join(str(x) for x in ans))
print('\n'.join(out))
