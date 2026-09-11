#include <iostream>
#include <vector>
#include <map>
#include <tuple>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    // 같은 무브끼리 묶어요. 무브는 20만 개인데 서로 다른 건 많아야 8000개.
    map<tuple<int,int,int>, int> cnt;
    for (int i = 0; i < K; i++) {
        int x, y, z;
        cin >> x >> y >> z;
        cnt[make_tuple(x - 1, y - 1, z - 1)] += 1;
    }
    vector<tuple<int,int,int,int>> triples;
    for (map<tuple<int,int,int>, int>::iterator it = cnt.begin(); it != cnt.end(); ++it) {
        int x = get<0>(it->first);
        int y = get<1>(it->first);
        int z = get<2>(it->first);
        triples.push_back(make_tuple(x, y, z, it->second));
    }

    int best = -1;
    int ways = 0;
    for (int b = 0; b < (1 << N); b++) {
        int score = 0;
        for (int i = 0; i < (int)triples.size(); i++) {
            int x = get<0>(triples[i]);
            int y = get<1>(triples[i]);
            int z = get<2>(triples[i]);
            int c = get<3>(triples[i]);
            if (((b >> x) & 1) && !((b >> y) & 1) && !((b >> z) & 1)) {
                score += c;
            }
        }
        if (score > best) {
            best = score;
            ways = 1;
        } else if (score == best) {
            ways++;
        }
    }
    cout << best << " " << ways << "\n";
    return 0;
}
