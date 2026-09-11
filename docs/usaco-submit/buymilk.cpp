#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;

int N, Q;
const ll INF = (ll)4e18;

int main() {
    cin >> N >> Q;
    vector<ll> a(N);
    for (int i = 0; i < N; i++) cin >> a[i];

    // Normalize: c[i] = cheapest cost for a 2^i-bucket block
    // (buy deal i, or two smaller blocks). Then a bigger block is
    // always cheaper PER BUCKET — use big blocks first, no recursion.
    vector<ll> c(N);
    c[0] = a[0];
    for (int i = 1; i < N; i++) c[i] = min(a[i], 2 * c[i - 1]);

    for (int q = 0; q < Q; q++) {
        ll x; cin >> x;
        ll ans = INF, cost = 0, rem = x;   // cost locked in, buckets left
        for (int i = N - 1; i >= 0; i--) {
            ll size = 1LL << i;
            // option A: round UP with this block and stop (buy a little extra)
            ll need = (rem + size - 1) / size;   // ceil(rem / size)
            ans = min(ans, cost + need * c[i]);
            // option B: take the floor here, cover the rest with smaller blocks
            ll take = rem / size;
            cost += take * c[i];
            rem -= take * size;
        }
        ans = min(ans, cost);   // covered exactly (rem == 0)
        cout << ans << "\n";
    }
    return 0;
}
