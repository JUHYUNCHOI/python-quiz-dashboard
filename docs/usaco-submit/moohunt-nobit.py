import sys
input = sys.stdin.readline

N, K = map(int, input().split())

# 무브를 세어 둘 곳. 열쇠는 (M 자리, O 자리 작은 쪽, O 자리 큰 쪽).
# y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요 → 작은 쪽·큰 쪽으로 모아요.
count = {}
for _ in range(K):
    x, y, z = map(int, input().split())
    x -= 1
    y -= 1
    z -= 1
    key = (x, min(y, z), max(y, z))
    count[key] = count.get(key, 0) + 1

# 보드를 리스트로 들고 다녀요. 1 이면 M, 0 이면 O.
board = [0] * N

best = 0
ways = 0
while True:

    # 이 보드에서 M 자리와 O 자리를 갈라요
    Ms = []
    Os = []
    for i in range(N):
        if board[i] == 1:
            Ms.append(i)
        else:
            Os.append(i)

    # 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요
    score = 0
    for m in Ms:
        for i in range(len(Os)):
            for j in range(i + 1, len(Os)):
                key = (m, Os[i], Os[j])
                score += count.get(key, 0)

    if score > best:
        best = score
        ways = 1
    elif score == best:
        ways += 1

    # 다음 보드로 넘어가요 — 1 을 더하는 것과 같아요.
    # 뒤에서부터 M(1) 이면 O(0) 로 되돌리고 한 칸 앞으로,
    # O(0) 를 만나면 그 자리를 M(1) 로 바꾸고 멈춰요.
    i = 0
    while i < N and board[i] == 1:
        board[i] = 0
        i += 1
    if i == N:
        break
    board[i] = 1

print(best, ways)
