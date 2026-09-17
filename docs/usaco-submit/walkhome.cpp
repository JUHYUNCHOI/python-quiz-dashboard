#include <iostream>
#include <vector>
#include <string>
using namespace std;

int N, K;
vector<string> grid;
// dp[r][c][direction][changes] = # of ways from (r, c) to home
long long dp[50][50][3][4];

// direction: 0 = arrived moving right, 1 = arrived moving down, 2 = start
int main() {
    int T;
    cin >> T;
    while (T--) {
        cin >> N >> K;
        grid.assign(N, "");
        for (int i = 0; i < N; i++) {
            cin >> grid[i];
        }

        // Fill the table from home (bottom-right) BACKWARD — no recursion.
        // Right/down neighbours are already filled thanks to reverse order.
        for (int r = N - 1; r >= 0; r--)
        for (int c = N - 1; c >= 0; c--)
        for (int direction = 0; direction < 3; direction++)
        for (int changes = 0; changes <= K; changes++) {
            if (r == N - 1 && c == N - 1) {
                dp[r][c][direction][changes] = 1;   // reached home
                continue;
            }
            long long total = 0;
            // Move right
            if (c + 1 < N && grid[r][c + 1] != 'H') {
                int inc = 0;
                if (direction == 1) {
                    inc = 1;
                }
                int nc = changes + inc;
                if (nc <= K) {
                    total += dp[r][c + 1][0][nc];
                }
            }
            // Move down
            if (r + 1 < N && grid[r + 1][c] != 'H') {
                int inc = 0;
                if (direction == 0) {
                    inc = 1;
                }
                int nc = changes + inc;
                if (nc <= K) {
                    total += dp[r + 1][c][1][nc];
                }
            }
            dp[r][c][direction][changes] = total;
        }
        cout << dp[0][0][2][0] << "\n";
    }
    return 0;
}
