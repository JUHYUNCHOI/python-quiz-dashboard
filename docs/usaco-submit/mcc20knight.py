from collections import deque

# 8 knight L-moves (2 in one axis, 1 in the other)
MOVES = [(-2,-1),(-2,1),(-1,-2),(-1,2),
         (1,-2),(1,2),(2,-1),(2,1)]

# minimum moves to cover any offset (dx, dy), 0 <= dx, dy <= 2000.
# BFS once from (0,0); a small negative margin lets a short path
# dip below 0 (needed to reach (1,1) in 2 moves).
M = 4
LO, HI = -M, 2000 + M
SIZE = HI - LO + 1
best = []
for _ in range(SIZE):         # 줄마다 [-1, -1, …] 하나씩
    best.append([-1] * SIZE)
best[0 - LO][0 - LO] = 0
q = deque([(0, 0)])
while q:
    x, y = q.popleft()
    for dx, dy in MOVES:
        nx, ny = x + dx, y + dy
        if LO <= nx <= HI and LO <= ny <= HI and best[nx - LO][ny - LO] == -1:
            best[nx - LO][ny - LO] = best[x - LO][y - LO] + 1
            q.append((nx, ny))

T = int(input())
out = []
for _ in range(T):
    K, X, Y, A, B = map(int, input().split())
    dx, dy = abs(X - A), abs(Y - B)
    need = best[dx - LO][dy - LO]
    # exactly K  <=>  K >= need and leftover (K - need) is even
    if K >= need and (K - need) % 2 == 0:
        out.append('YES')
    else:
        out.append('NO')
print('\n'.join(out))
