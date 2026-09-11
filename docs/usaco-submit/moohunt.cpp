#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    // isAt[x][a][b] = 'x 가 M, a 와 b 가 O' 일 때 득점하는 무브의 개수 (a < b)
    vector<vector<vector<int>>> isAt(n, vector<vector<int>>(n, vector<int>(n, 0)));
    for (int i = 0; i < k; i++) {
        int x, y, z;
        cin >> x >> y >> z;
        x--;
        y--;
        z--;
        isAt[x][min(y, z)][max(y, z)]++;
    }

    vector<int> score(1 << n, 0);
    for (int msk = 0; msk < (1 << n); msk++) {
        vector<int> mpos, opos;
        for (int i = 0; i < n; i++) {
            if ((msk >> i) & 1) mpos.push_back(i);
            else                opos.push_back(i);
        }
        // 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐
        for (int m : mpos)
            for (int i = 0; i < (int)opos.size(); i++)
                for (int j = i + 1; j < (int)opos.size(); j++)
                    score[msk] += isAt[m][opos[i]][opos[j]];
    }

    int best = *max_element(score.begin(), score.end());
    int ways = count(score.begin(), score.end(), best);
    cout << best << ' ' << ways << '\n';
}
