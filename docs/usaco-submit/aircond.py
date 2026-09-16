N, M = map(int, input().split())
cows = []
for _ in range(N):
    s, e, c = map(int, input().split())
    cows.append((s, e, c))  # stall range, cooling needed

acs = []
for _ in range(M):
    s, e, p, cost = map(int, input().split())
    acs.append((s, e, p, cost))

best = float('inf')

# Each AC is either on or off, so with M <= 10 there are
# at most 2 ** 10 = 1024 combinations. Number them 0, 1, 2, ...
# and read a number's digits in base 2: digit j says 'is AC j on?'
for combo in range(2 ** M):
    total_cost = 0
    cooling = [0] * 101  # cooling at each stall
    rest = combo
    for j in range(M):
        on = rest % 2    # 1 means AC j is on
        rest //= 2       # move on to the next AC
        if on == 1:
            s, e, p, cost = acs[j]
            total_cost += cost
            for pos in range(s, e + 1):
                cooling[pos] += p
    # Check if all cows satisfied
    ok = True
    for s, e, c in cows:
        for pos in range(s, e + 1):
            if cooling[pos] < c:
                ok = False
                break
        if not ok:
            break
    if ok:
        best = min(best, total_cost)

print(best)
