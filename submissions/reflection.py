import sys

# 한 묶음(거울 4칸: (i,j) 와 좌우·상하·대각 짝)을 같은 색으로 만드는 최소 뒤집기 수.
# paint[i][j] 를 기준으로 나머지 3칸이 몇 개 다른지 세고, 적은 쪽(min)만 뒤집으면 됨.
def countDifference(paint, i, j):
    count = 0
    n = len(paint)
    if paint[i][j] != paint[i][n - 1 - j]:
        count += 1
    if paint[i][j] != paint[n - 1 - i][j]:
        count += 1
    if paint[i][j] != paint[n - 1 - i][n - 1 - j]:
        count += 1
    return min(count, 4 - count)

n, u = map(int, sys.stdin.readline().split())

paint = []
for _ in range(n):
    paint.append(list(sys.stdin.readline().rstrip()))

# 처음 답 = 왼쪽 위 사분면의 각 칸(=각 묶음)마다 최소 뒤집기 수의 합
count = 0
for i in range(n // 2):
    for j in range(n // 2):
        count += countDifference(paint, i, j)

print(count)
for _ in range(u):
    r, c = map(int, sys.stdin.readline().rstrip().split())
    r -= 1
    c -= 1
    oldCount = countDifference(paint, r, c)   # 이 묶음의 옛 기여분
    count -= oldCount
    paint[r][c] = '.' if paint[r][c] == '#' else '#'   # 칸 뒤집기
    newCount = countDifference(paint, r, c)   # 새 기여분
    count += newCount
    print(count)
