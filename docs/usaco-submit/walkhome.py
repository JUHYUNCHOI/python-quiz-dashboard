T = int(input())
for _ in range(T):
    N, K = map(int, input().split())
    grid = []
    for _ in range(N):
        grid.append(input().strip())

    # dp[r][c][direction][changes] = # of ways from (r, c) to home (N-1, N-1)
    # direction: 0 = arrived moving right, 1 = arrived moving down, 2 = start
    # Fill the table from home (bottom-right) BACKWARD — no recursion.
    # Each cell only needs the cell to its right and the cell below,
    # and those are already filled because we go in reverse order.
    dp = [[[[0] * (K + 1) for _ in range(3)] for _ in range(N)] for _ in range(N)]

    for r in range(N - 1, -1, -1):
        for c in range(N - 1, -1, -1):
            for direction in range(3):
                for changes in range(K + 1):
                    if r == N - 1 and c == N - 1:
                        dp[r][c][direction][changes] = 1   # reached home
                        continue
                    total = 0
                    # Move right
                    if c + 1 < N and grid[r][c+1] != 'H':
                        if direction == 1:
                            nc = changes + 1
                        else:
                            nc = changes
                        if nc <= K:
                            total += dp[r][c+1][0][nc]
                    # Move down
                    if r + 1 < N and grid[r+1][c] != 'H':
                        if direction == 0:
                            nc = changes + 1
                        else:
                            nc = changes
                        if nc <= K:
                            total += dp[r+1][c][1][nc]
                    dp[r][c][direction][changes] = total

    print(dp[0][0][2][0])
