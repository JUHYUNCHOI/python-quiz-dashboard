#include <iostream>
#include <vector>
using namespace std;

int N, K;
vector<long long> have;        // have[i] = units of metal i in stock
vector<vector<int>> recipe;    // recipe[i] = ingredients to make 1 of metal i

// Try to make 1 unit of metal m using a working copy of stock.
bool make(int m, vector<long long> &stock) {
    if (stock[m] > 0) {
        stock[m]--;
        return true;   // have one ready
    }
    if (recipe[m].empty()) {
        return false;             // no stock, no recipe
    }
    for (int ing : recipe[m]) {                      // craft each ingredient
        if (!make(ing, stock)) {
            return false;
        }
    }
    return true;
}

int main() {
    cin >> N;
    have.assign(N + 1, 0);
    for (int i = 1; i <= N; i++) {
        cin >> have[i];
    }
    cin >> K;
    recipe.assign(N + 1, {});
    for (int k = 0; k < K; k++) {
        int L, M;
        cin >> L >> M;          // L = product, M = #ingredients
        recipe[L].resize(M);
        for (int j = 0; j < M; j++) {
            cin >> recipe[L][j];
        }
    }
    long long ans = 0;
    while (true) {
        vector<long long> trial = have;   // copy: failed attempt must not eat stock
        if (make(N, trial)) {
            have = trial;
            ans++;   // commit on success
        } else {
            break;
        }
    }
    cout << ans << "\n";
    return 0;
}
