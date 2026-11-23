/**
 * 문제에 해당 언어의 시작 코드가 없을 때 쓸 빈 틀.
 *
 * 채점은 `lib/piston.ts` 에서 **stdin → stdout 바이트 비교**로만 한다. 함수를
 * 불러 보지도, 코드를 감싸지도 않는다. 그래서 어떤 문제든 두 언어로 풀 수
 * 있고, 언어마다 다른 건 "입력을 어떻게 읽고 출력을 어떻게 내느냐"뿐이다.
 *
 * 885문제 중 C++ 시작 코드만 있는 게 343개, Python 시작 코드만 있는 게 242개다.
 * 585개에 시작 코드를 손으로 써 넣는 대신, 없는 쪽은 이 빈 틀로 채운다.
 * 문제별 안내 주석이 사라지는 건 맞지만, 한쪽 언어를 아예 못 고르는 것보다 낫다.
 */

export type RunLang = "cpp" | "python"

const CPP_KO = `#include <iostream>
using namespace std;

int main() {
    // 입력은 cin 으로 읽고, 답은 cout 으로 출력하세요.

    return 0;
}
`

const CPP_EN = `#include <iostream>
using namespace std;

int main() {
    // Read input with cin, print your answer with cout.

    return 0;
}
`

const PY_KO = `# 입력은 input() 으로 읽고, 답은 print() 로 출력하세요.
`

const PY_EN = `# Read input with input(), print your answer with print().
`

/** 해당 언어의 빈 시작 코드. */
export function blankStarter(lang: RunLang, isEn: boolean): string {
  if (lang === "python") return isEn ? PY_EN : PY_KO
  return isEn ? CPP_EN : CPP_KO
}
