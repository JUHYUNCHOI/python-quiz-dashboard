import type { LessonData } from "../types"

export const cppLessonCk6Data: LessonData = {
  id: "cpp-ck6",
  title: "🔲 2D 배열 연습 문제",
  emoji: "🔲",
  description: "2차원 배열을 활용한 실전 문제를 풀어봅니다.",
  chapters: [
    {
      id: "ck6-main",
      title: "2D 배열 코딩 연습",
      emoji: "💪",
      steps: [
        {
          id: "ck6-intro",
          type: "explain" as const,
          title: "2D 배열 연습 문제",
          content: `2차원 배열의 핵심 활용 패턴을 연습합니다.\n\n총 6문제입니다. 막히면 힌트를 활용하세요!`,
        },
        {
          id: "ck6-p1",
          type: "practice" as const,
          title: "문제 1: 2D 배열 모든 원소의 합",
          content: `3×3 격자의 모든 원소를 더해 출력하세요.\n\n**출력:** 합계를 숫자 하나로 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            sum += grid[i][j];
        }
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    // 이중 for문으로 grid[i][j]를 sum에 더하세요

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `45`,
          hint: "이중 for문으로 grid[i][j]를 sum에 더하세요. i: 0~2, j: 0~2",
        },
        {
          id: "ck6-p2",
          type: "practice" as const,
          title: "문제 2: 각 행의 합 출력",
          content: `3×4 격자에서 각 행의 합을 한 줄씩 출력하세요.\n\n**출력:** 각 행의 합을 줄바꿈으로 구분하여 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    for (int i = 0; i < 3; i++) {
        int sum = 0;
        for (int j = 0; j < 4; j++) {
            sum += grid[i][j];
        }
        cout << sum << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    for (int i = 0; i < 3; i++) {
        int sum = 0;
        // 안쪽 for문으로 j열을 순회하며 sum에 더하세요

        cout << sum << endl;
    }
    return 0;
}`,
          expectedOutput: `10
26
42`,
          hint: "바깥 for는 행(i), 안쪽 for는 열(j). 각 행마다 sum을 0으로 초기화하세요",
        },
        {
          id: "ck6-p3",
          type: "practice" as const,
          title: "문제 3: 최대값과 위치 출력",
          content: `3×3 격자에서 가장 큰 값과 그 위치(행, 열)를 출력하세요.\n\n**출력:** "최대값 행 열" 형식으로 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{3,7,2},{9,1,5},{4,8,6}};
    int max_val = grid[0][0];
    int max_r = 0, max_c = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i][j] > max_val) {
                max_val = grid[i][j];
                max_r = i;
                max_c = j;
            }
        }
    }
    cout << max_val << " " << max_r << " " << max_c << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{3,7,2},{9,1,5},{4,8,6}};
    int max_val = grid[0][0];
    int max_r = 0, max_c = 0;
    // 이중 for문으로 grid[i][j] > max_val이면 max_val, max_r, max_c를 갱신하세요

    cout << max_val << " " << max_r << " " << max_c << endl;
    return 0;
}`,
          expectedOutput: `9 1 0`,
          hint: "grid[i][j] > max_val이면 max_val, max_r, max_c를 모두 갱신하세요",
        },
        {
          id: "ck6-p4",
          type: "practice" as const,
          title: "문제 4: 주대각선 합",
          content: `4×4 격자의 주대각선(좌상→우하) 원소들의 합을 출력하세요.\n\n**출력:** 주대각선 합계`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += grid[i][i];
    }
    cout << sum << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
    int sum = 0;
    // for문 하나로 grid[i][i]를 합산하세요

    cout << sum << endl;
    return 0;
}`,
          expectedOutput: `34`,
          hint: "주대각선은 grid[i][i]입니다. for문 하나로 grid[i][i]를 합산하세요",
        },
        {
          id: "ck6-p5",
          type: "practice" as const,
          title: "문제 5: 전치행렬 출력",
          content: `3×3 행렬의 행과 열을 바꾼 전치행렬을 출력하세요.\n\n**출력:** 전치행렬을 공백 구분, 줄바꿈으로 출력`,
          code: `#include <iostream>
using namespace std;

int main() {
    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j > 0) cout << " ";
            cout << a[j][i];
        }
        cout << endl;
    }
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    // 바깥 for가 i(열 기준), 안쪽 for가 j(행 기준)
    // a[j][i]를 출력하면 전치행렬이 됩니다

    return 0;
}`,
          expectedOutput: `1 4 7
2 5 8
3 6 9`,
          hint: "전치행렬은 a[j][i]를 출력하는 것입니다. 바깥 for가 j, 안쪽 for가 i가 되도록 바꾸세요",
        },
        {
          id: "ck6-p6",
          type: "practice" as const,
          title: "문제 6: 5보다 큰 원소 개수",
          content: `3×3 격자에서 값이 5보다 큰 원소의 개수를 출력하세요.\n\n**출력:** 조건을 만족하는 원소의 개수`,
          code: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,8,3},{6,2,9},{4,7,5}};
    int count = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i][j] > 5) {
                count++;
            }
        }
    }
    cout << count << endl;
    return 0;
}`,
          initialCode: `#include <iostream>
using namespace std;

int main() {
    int grid[3][3] = {{1,8,3},{6,2,9},{4,7,5}};
    int count = 0;
    // 이중 for문으로 grid[i][j] > 5인 경우마다 count++하세요

    cout << count << endl;
    return 0;
}`,
          expectedOutput: `4`,
          hint: "이중 for문으로 grid[i][j] > 5인 경우마다 count++하세요",
        },
      ],
    },
  ],
}
