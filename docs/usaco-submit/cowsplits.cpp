#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int T, k;
    cin >> T >> k;
    for (int t = 0; t < T; t++) {
        int N;
        cin >> N;
        string S;
        cin >> S;
        int n3 = 3 * N;
        if (N % 2 == 1) {
            cout << -1 << "\n";
            continue;
        }
        int half = n3 / 2;
        if (S.substr(0, half) == S.substr(half)) {
            cout << 1 << "\n";
            for (int i = 0; i < n3; i++) {
                cout << 1;
                cout << (i == n3 - 1 ? '\n' : ' ');
            }
            continue;
        }
        vector<int> ans(n3, 1);
        for (int i = 0; i < N / 2; i++) {
            string a = S.substr(i*3, 3);
            string b = S.substr((i + N/2)*3, 3);
            if (a != b) {
                if (a.substr(0, 2) == b.substr(1, 2)) {
                    ans[i*3 + 2] = 2;
                    ans[(i + N/2)*3] = 2;
                } else {
                    ans[i*3] = 2;
                    ans[(i + N/2)*3 + 2] = 2;
                }
            }
        }
        int M = 1;
        for (int x : ans) if (x > M) M = x;
        cout << M << "\n";
        for (int i = 0; i < n3; i++) {
            cout << ans[i] << (i == n3 - 1 ? '\n' : ' ');
        }
    }
    return 0;
}
