#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    // count[x][a][b] = 'x 가 M, a 와 b 가 O' 면 득점하는 무브가 몇 개인가 (a < b)
    // y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없다 → 작은 쪽·큰 쪽으로 모은다
    vector<vector<vector<int>>> count(N, vector<vector<int>>(N, vector<int>(N, 0)));
    for (int i = 0; i < K; i++) {
        int x, y, z;
        cin >> x >> y >> z;
        x--;
        y--;
        z--;
        count[x][min(y, z)][max(y, z)] += 1;
    }

    // 보드를 리스트로 들고 다녀요. 1 이면 M, 0 이면 O.
    vector<int> board(N, 0);

    int best = 0;
    int ways = 0;
    while (true) {

        // 이 보드에서 M 자리와 O 자리를 갈라요
        vector<int> Ms, Os;
        for (int i = 0; i < N; i++) {
            if (board[i] == 1) {
                Ms.push_back(i);
            } else {
                Os.push_back(i);
            }
        }

        // 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요
        int score = 0;
        for (int a = 0; a < (int)Ms.size(); a++) {
            for (int i = 0; i < (int)Os.size(); i++) {
                for (int j = i + 1; j < (int)Os.size(); j++) {
                    score += count[Ms[a]][Os[i]][Os[j]];
                }
            }
        }

        if (score > best) {
            best = score;
            ways = 1;
        } else if (score == best) {
            ways++;
        }

        // 다음 보드로 — 1 을 더하는 것과 같아요.
        int i = 0;
        while (i < N && board[i] == 1) {
            board[i] = 0;
            i++;
        }
        if (i == N) {
            break;
        }
        board[i] = 1;
    }

    cout << best << " " << ways << "\n";
    return 0;
}
