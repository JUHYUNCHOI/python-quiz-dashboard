import sys

def main():
    data = sys.stdin.read().split()
    p = 0
    T = int(data[p]); p += 1
    out = []
    for _ in range(T):
        N = int(data[p]); p += 1
        right = int(data[p]); p += 1
        down = int(data[p]); p += 1
        grid = [data[p + r] for r in range(N)]; p += N

        possibles = set()
        impossible = False
        for r in range(N - 1, -1, -1):
            if impossible: break
            for c in range(N - 1, -1, -1):
                star = grid[r][c]
                if star == 'B':
                    possibles.add((r, c))
                    if r - down >= 0 and c - right >= 0:
                        aa = grid[r - down][c - right]
                        if aa == 'G' or aa == 'B':
                            possibles.add((r - down, c - right))
                        else:
                            impossible = True
                            break
                    else:
                        impossible = True
                        break
                elif star == 'G':
                    if (r, c) in possibles:
                        continue
                    if r - down < 0 or c - right < 0:
                        possibles.add((r, c))
                    elif grid[r - down][c - right] in ('G', 'B'):
                        possibles.add((r - down, c - right))
                    else:
                        possibles.add((r, c))

        out.append('-1' if impossible else str(len(possibles)))
    print('\n'.join(out))

main()
