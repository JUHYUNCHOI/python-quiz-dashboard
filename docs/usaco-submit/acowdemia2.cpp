#include <iostream>
#include <vector>
#include <string>
#include <map>
using namespace std;

int main() {
    int K, N;
    cin >> K >> N;
    vector<string> names(N);
    map<string, int> idx;
    for (int i = 0; i < N; i++) {
        cin >> names[i];
        idx[names[i]] = i;
    }

    // senior[i][j] = i is definitely more senior than j
    vector<vector<bool> > senior(N, vector<bool>(N, false));

    for (int k = 0; k < K; k++) {
        vector<string> pub(N);                 // decreasing effort order
        for (int i = 0; i < N; i++) {
            cin >> pub[i];
        }
        for (int x = 0; x < N; x++) {
            bool broke = false;
            for (int y = x + 1; y < N; y++) {
                if (pub[y] < pub[y - 1]) {
                    broke = true;  // real effort gap
                }
                if (broke) {
                    // pub[y] has less effort => senior to pub[x]
                    senior[idx[pub[y]]][idx[pub[x]]] = true;
                }
            }
        }
    }

    for (int i = 0; i < N; i++) {
        string row = "";
        for (int j = 0; j < N; j++) {
            if (i == j) {
                row += 'B';
            } else if (senior[i][j]) {
                row += '1';
            } else if (senior[j][i]) {
                row += '0';
            } else {
                row += '?';
            }
        }
        cout << row << "\n";
    }
    return 0;
}
