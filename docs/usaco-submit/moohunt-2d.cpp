#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    // 표 한 줄 = M 자리 하나. 그 안은 O 짝을 번호 하나로 합쳐서 넣어요.
    // 두 칸을 번호 하나로: 작은 쪽 * N + 큰 쪽.  (N = 5 면 1·2 → 7번. 7/5 = 몫 1·나머지 2 로 되돌아온다)
    // y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없다 → 작은 쪽·큰 쪽으로 모은다
    vector<vector<int>> count(N, vector<int>(N * N, 0));
    for (int i = 0; i < K; i++) {
        int x, y, z;
        cin >> x >> y >> z;
        x--;
        y--;
        z--;
        count[x][min(y, z) * N + max(y, z)] += 1;
    }

    // 보드는 리스트로 나타내요. 1 이면 M, 0 이면 O.
    vector<int> board(N, 0);

    int best = 0;
    int ways = 0;
    while (true) {

        // 이 보드에서 M 자리와 O 자리를 가른다
        vector<int> Ms, Os;
        for (int i = 0; i < N; i++) {
            if (board[i] == 1) {
                Ms.push_back(i);
            } else {
                Os.push_back(i);
            }
        }

        // 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이다
        int score = 0;
        for (int a = 0; a < (int)Ms.size(); a++) {
            for (int i = 0; i < (int)Os.size(); i++) {
                for (int j = i + 1; j < (int)Os.size(); j++) {
                    score += count[Ms[a]][Os[i] * N + Os[j]];
                }
            }
        }

        if (score > best) {
            best = score;
            ways = 1;
        } else if (score == best) {
            ways++;
        }

        // 다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.
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
