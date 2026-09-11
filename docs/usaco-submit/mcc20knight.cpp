#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
using namespace std;

int dr[8] = {-2,-2,-1,-1, 1, 1, 2, 2};
int dc[8] = {-1, 1,-2, 2,-2, 2,-1, 1};

const int M = 4, LO = -M, HI = 2000 + M, SIZE = HI - LO + 1;
vector<vector<int>> best(SIZE, vector<int>(SIZE, -1));

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // BFS once: minimum knight moves to every offset
    best[0 - LO][0 - LO] = 0;
    queue<pair<int,int>> q;
    q.push(make_pair(0, 0));
    while (!q.empty()) {
        int x = q.front().first, y = q.front().second;
        q.pop();
        for (int i = 0; i < 8; i++) {
            int nx = x + dr[i], ny = y + dc[i];
            if (nx>=LO && nx<=HI && ny>=LO && ny<=HI && best[nx-LO][ny-LO]==-1) {
                best[nx-LO][ny-LO] = best[x-LO][y-LO] + 1;
                q.push(make_pair(nx, ny));
            }
        }
    }

    int T;
    cin >> T;
    while (T--) {
        int K, X, Y, A, B;
        cin >> K >> X >> Y >> A >> B;
        int dx = abs(X - A), dy = abs(Y - B);
        int need = best[dx - LO][dy - LO];
        // exactly K  <=>  K >= need and leftover (K - need) is even
        if (K >= need && (K - need) % 2 == 0) cout << "YES\n";
        else cout << "NO\n";
    }
    return 0;
}
