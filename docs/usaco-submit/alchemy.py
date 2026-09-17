import sys
input = sys.stdin.readline
sys.setrecursionlimit(100000)

N = int(input())
have = [0] + list(map(int, input().split()))   # have[i] = units of metal i (1-indexed)
K = int(input())
recipe = [[] for _ in range(N + 1)]             # recipe[i] = ingredients to make 1 of metal i
for _ in range(K):
    nums = list(map(int, input().split()))
    L, M = nums[0], nums[1]                      # L = product, M = #ingredients
    recipe[L] = nums[2:2 + M]

# Try to make 1 unit of metal m using a working copy of stock.
def make(m, stock):
    if stock[m] > 0:                # have one ready — use it
        stock[m] -= 1
        return True
    if not recipe[m]:              # no stock and no recipe — give up
        return False
    for ing in recipe[m]:         # craft every ingredient first
        if not make(ing, stock):
            return False
    return True

ans = 0
while True:
    trial = have[:]               # copy: a failed attempt must not eat stock
    if make(N, trial):
        have = trial              # success — commit the consumption
        ans += 1
    else:
        break
print(ans)
