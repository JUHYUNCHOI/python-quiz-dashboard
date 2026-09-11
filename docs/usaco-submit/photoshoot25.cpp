#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;
    int Q;
    cin >> Q;

    // 0-indexed beauty grid
    vector<vector<int>> beauty(N, vector<int>(N, 0));

    int W = N - K + 1; // valid top-left range per dim
    vector<vector<int>> S(W, vector<int>(W, 0));

    int cur_max = 0;

    for (int q = 0; q < Q; q++) {
        int r, c, v;
        cin >> r >> c >> v;
        // the input counts from 1, our arrays count from 0
        r--;
        c--;

        int delta = v - beauty[r][c];
        beauty[r][c] = v;

        int i_lo = max(0, r - K + 1);
        int i_hi = min(r, W - 1);
        int j_lo = max(0, c - K + 1);
        int j_hi = min(c, W - 1);

        for (int i = i_lo; i <= i_hi; i++) {
            for (int j = j_lo; j <= j_hi; j++) {
                S[i][j] += delta;
                if (S[i][j] > cur_max) {
                    cur_max = S[i][j];
                }
            }
        }
        cout << cur_max << "\n";
    }
    return 0;
}
