from collections import Counter

N, K = map(int, input().split())

# 같은 무브끼리 묶어요. 무브는 20만 개인데 서로 다른 건 많아야 8000개예요.
cnt = Counter()
for _ in range(K):
    x, y, z = map(int, input().split())
    cnt[(x - 1, y - 1, z - 1)] += 1
triples = list(cnt.items())

best = -1
ways = 0

# 가능한 보드를 전부 해봐요. 비트가 1 이면 M, 0 이면 O 예요.
for b in range(1 << N):
    score = 0
    for (x, y, z), c in triples:
        if (b >> x) & 1 and not ((b >> y) & 1) and not ((b >> z) & 1):
            score += c
    if score > best:
        best = score
        ways = 1
    elif score == best:
        ways += 1

print(best, ways)
