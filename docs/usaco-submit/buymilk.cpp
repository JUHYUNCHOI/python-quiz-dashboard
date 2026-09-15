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
    for (int i = 0; i < N; i++) {
        cin >> a[i];
    }

    // Normalize: c[i] = cheapest cost for a block of 1 doubled i times
    // (buy deal i, or two smaller blocks). Then a bigger block is
    // always cheaper PER BUCKET — use big blocks first, no recursion.
    vector<ll> c(N);
    c[0] = a[0];
    for (int i = 1; i < N; i++) {
        c[i] = min(a[i], 2 * c[i - 1]);
    }

    // blockSize[i] = how many buckets block i holds: 1 doubled i times
    vector<ll> blockSize(31);   // blocks 0 through 30
    blockSize[0] = 1;
    for (int i = 1; i <= 30; i++) {
        blockSize[i] = blockSize[i - 1] * 2;
    }

    for (int q = 0; q < Q; q++) {
        ll x;
        cin >> x;
        ll ans = INF;      // best answer so far
        ll cost = 0;       // cost locked in so far
        ll rem = x;        // buckets still to cover
        for (int i = min(N - 1, 30); i >= 0; i--) {   // 30 doublings already pass x
            ll size = blockSize[i];
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
