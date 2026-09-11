#include <bits/stdc++.h>
using namespace std;
const long long MOD = 998244353;

long long pw(long long b, long long e, long long m) {
    long long r = 1 % m;
    b %= m;
    while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; }
    return r;
}

int main() {
    long long n, k;
    cin >> n >> k;
    string s;
    cin >> s;

    long long inv3  = pw(3, MOD - 2, MOD);
    long long pow2k = pw(2, k, MOD);            // 2^k  (k up to 1e18)
    long long sign;  // (-1)^k
    if (k % 2 == 0) {
        sign = 1;
    } else {
        sign = MOD - 1;
    }
    long long f00 = pow2k % MOD;
    long long f11 = (pow2k + 2 * sign) % MOD * inv3 % MOD;
    long long f01 = ((pow2k - sign) % MOD + MOD) % MOD * inv3 % MOD;

    long long total = 0;
    for (long long j = 0; j + 1 < n; j++) {
        long long i = j + 1;
        long long w = i % MOD * ((n - i) % MOD) % MOD;
        char x = s[j], y = s[j + 1];
        long long f = (x=='0' && y=='0') ? f00
                    : (x=='1' && y=='1') ? f11 : f01;
        total = (total + w * f) % MOD;
    }
    cout << total % MOD << "\n";
    return 0;
}
