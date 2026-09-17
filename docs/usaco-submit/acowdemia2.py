K, N = map(int, input().split())
names = input().split()
idx = {nm: i for i, nm in enumerate(names)}

# senior[i][j] = i is DEFINITELY more senior than j
senior = [[False] * N for _ in range(N)]

for _ in range(K):
    pub = input().split()   # decreasing effort order
    for x in range(N):
        broke = False
        for y in range(x + 1, N):
            if pub[y] < pub[y - 1]:
                broke = True       # real effort gap (not just a tie)
            if broke:
                # pub[y] has less effort => pub[y] is senior to pub[x]
                senior[idx[pub[y]]][idx[pub[x]]] = True

for i in range(N):
    row = []
    for j in range(N):
        if i == j:
            row.append('B')
        elif senior[i][j]:
            row.append('1')
        elif senior[j][i]:
            row.append('0')
        else:
            row.append('?')
    print(''.join(row))
