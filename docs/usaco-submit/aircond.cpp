#include <iostream>
#include <vector>
using namespace std;

int main() {
    int N, M;
    cin >> N >> M;
    vector<int> cs(N), ce(N), cc(N);          // cow: stall range + cooling needed
    for (int i = 0; i < N; i++) {
        cin >> cs[i] >> ce[i] >> cc[i];
    }
    vector<int> as(M), ae(M), ap(M), acost(M);// AC: range, power, cost
    for (int j = 0; j < M; j++) {
        cin >> as[j] >> ae[j] >> ap[j] >> acost[j];
    }

    long long best = -1;

    // Each AC is on or off, so with M <= 10 there are at most 1024 combinations.
    int combos = 1;
    for (int j = 0; j < M; j++) {
        combos *= 2;
    }

    // Number the combinations 0, 1, 2, ... and read each number in base 2:
    // digit j says whether AC j is on.
    for (int combo = 0; combo < combos; combo++) {
        long long total = 0;
        vector<int> cool(101, 0);             // cooling at each stall 1..100
        int rest = combo;
        for (int j = 0; j < M; j++) {
            int on = rest % 2;                // 1 means AC j is on
            rest /= 2;                        // move on to the next AC
            if (on == 1) {
                total += acost[j];
                for (int pos = as[j]; pos <= ae[j]; pos++) {
                    cool[pos] += ap[j];
                }
            }
        }
        bool ok = true;
        for (int i = 0; i < N && ok; i++)
            for (int pos = cs[i]; pos <= ce[i]; pos++)
                if (cool[pos] < cc[i]) {
                    ok = false;
                    break;
                }
        if (ok && (best == -1 || total < best)) {
            best = total;
        }
    }
    cout << best << "\n";
    return 0;
}
