#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 칸 (i, j) 가 속한 묶음을 한 색으로 만드는 최소 뒤집기 수
int flip_cost(vector<string> &grid, int i, int j) {
    int n = grid.size();
    int diff = 0;

    // 거울짝 3 칸과 견줘서 나와 색이 다른 칸을 센다
    if (grid[i][j] != grid[i][n - 1 - j]) {
        diff++;
    }
    if (grid[i][j] != grid[n - 1 - i][j]) {
        diff++;
    }
    if (grid[i][j] != grid[n - 1 - i][n - 1 - j]) {
        diff++;
    }

    return min(diff, 4 - diff);
}

int main() {
    int N, U;
    cin >> N >> U;

    vector<string> grid(N);
    for (int r = 0; r < N; r++) {
        cin >> grid[r];
    }

    // 처음 답 — 묶음마다 대표 한 칸씩, 곧 왼쪽 위 1/4 만 훑는다
    int total = 0;
    for (int i = 0; i < N / 2; i++) {
        for (int j = 0; j < N / 2; j++) {
            total += flip_cost(grid, i, j);
        }
    }
    cout << total << '\n';

    for (int q = 0; q < U; q++) {
        int r, c;
        cin >> r >> c;
        r--;
        c--;

        total -= flip_cost(grid, r, c);   // 이 묶음의 옛 비용을 빼고

        if (grid[r][c] == '#') {          // 칸을 뒤집고
            grid[r][c] = '.';
        } else {
            grid[r][c] = '#';
        }

        total += flip_cost(grid, r, c);   // 새 비용을 더한다
        cout << total << '\n';
    }
    return 0;
}
