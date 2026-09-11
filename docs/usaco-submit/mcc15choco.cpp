#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    cin >> N;

    vector<long long> stack;   // 아직 짝을 못 찾은 바들
    long long total = 0;       // 지금까지 가져간 초콜릿 길이

    for (int i = 0; i < N; i++) {
        long long bar;
        cin >> bar;
        if (!stack.empty() && stack.back() == bar) {
            // 맨 위 바와 길이가 같아요 → 둘을 가져가요
            total += 2 * bar;
            stack.pop_back();
        } else {
            stack.push_back(bar);
        }
    }

    cout << total << "\n";
    return 0;
}
