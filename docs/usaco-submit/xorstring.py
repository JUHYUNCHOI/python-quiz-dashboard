MOD = 998244353
inv3 = pow(3, MOD - 2, MOD)   # 1/3 mod p

n, k = map(int, input().split())
s = input().strip()

# after k transforms, one adjacent pair's beauty depends
# ONLY on the pair type — no need to build the huge string
pow2k = pow(2, k, MOD)                 # 2^k  (k up to 1e18!)
if k % 2 == 0:
    sign  = 1
else:
    sign  = MOD - 1
f00 = pow2k % MOD                          # pair 0,0
f11 = (pow2k + 2 * sign) % MOD * inv3 % MOD  # pair 1,1
f01 = (pow2k - sign) % MOD * inv3 % MOD      # pair 0,1 / 1,0

# the pair joining positions i, i+1 sits inside i*(n-i) substrings
total = 0
for j in range(n - 1):
    i = j + 1
    w = i * (n - i) % MOD
    x, y = s[j], s[j + 1]
    if x == '0' and y == '0':
        f = f00
    elif x == '1' and y == '1':
        f = f11
    else:
        f = f01
    total = (total + w * f) % MOD

print(total % MOD)
