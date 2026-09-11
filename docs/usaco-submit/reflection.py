import sys
input = sys.stdin.readline

# 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수
def flip_cost(grid, i, j):
    n = len(grid)
    diff = 0

    # 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다
    if grid[i][j] != grid[i][n - 1 - j]:
        diff += 1
    if grid[i][j] != grid[n - 1 - i][j]:
        diff += 1
    if grid[i][j] != grid[n - 1 - i][n - 1 - j]:
        diff += 1

    return min(diff, 4 - diff)

N, U = map(int, input().split())

grid = []
for _ in range(N):
    grid.append(list(input().rstrip()))

# 처음 답 — 묶음마다 대표 한 칸씩, 곧 왼쪽 위 1/4 만 훑는다
total = 0
for i in range(N // 2):
    for j in range(N // 2):
        total += flip_cost(grid, i, j)

answers = [total]

for _ in range(U):
    r, c = map(int, input().split())
    r -= 1
    c -= 1

    total -= flip_cost(grid, r, c)   # 이 묶음의 옛 비용을 빼고

    if grid[r][c] == '#':            # 칸을 뒤집고
        grid[r][c] = '.'
    else:
        grid[r][c] = '#'

    total += flip_cost(grid, r, c)   # 새 비용을 더한다
    answers.append(total)

print('\n'.join(map(str, answers)))
