N, K = map(int, input().split())

# isAt[x][a][b] = 'x 가 M, a 와 b 가 O' 일 때 득점하는 무브의 개수 (a < b)
# y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요 → 작은 쪽·큰 쪽으로 묶어요
isAt = []
for x in range(N):
    plane = []
    for a in range(N):
        plane.append([0] * N)
    isAt.append(plane)
for _ in range(K):
    x, y, z = map(int, input().split())
    x -= 1
    y -= 1
    z -= 1
    isAt[x][min(y, z)][max(y, z)] += 1

best = -1
ways = 0
for b in range(1 << N):
    Ms = [i for i in range(N) if (b >> i) & 1]
    Os = [i for i in range(N) if not (b >> i) & 1]

    # 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요
    score = 0
    for m in Ms:
        for i in range(len(Os)):
            for j in range(i + 1, len(Os)):
                score += isAt[m][Os[i]][Os[j]]

    if score > best:
        best = score
        ways = 1
    elif score == best:
        ways += 1

print(best, ways)
