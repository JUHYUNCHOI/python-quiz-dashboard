-- ============================================================
-- new_cpp_questions.sql
-- 생성일: 2026-04-07
-- cpp-6 (조건문): +15개 (ID 10766~10780)
-- cpp-7 (반복문): +13개 (ID 10781~10793)
-- cpp-23 (sort 마스터): +14개 (ID 10794~10807)
-- 총: 42개
--
-- 사용법:
--   Supabase 대시보드 → SQL Editor → 이 파일 내용 붙여넣기 → Run
-- ============================================================

INSERT INTO questions (id, language, lesson_id, difficulty, question, code, options, correct_answer, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison)
VALUES

-- ============================================================
-- cpp-6 (조건문) +15개  [ID 10766~10780]
-- ============================================================

(10766, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 0;
    if (x) {
        cout << "참";
    } else {
        cout << "거짓";
    }
    return 0;
}', ARRAY['"참"', '"거짓"', '"0"', '"컴파일 오류"'], 1, 'C++에서 0은 false로 평가됩니다. if (x)에서 x = 0이므로 조건이 거짓이 되어 else 블록이 실행됩니다.', 'C++ 정수의 참/거짓 평가', 'C++에서 0은 false, 0이 아닌 모든 값은 true로 평가됩니다. if (x)는 if (x != 0)과 동일합니다.', ARRAY['"bool 변환"', '"조건문"', '"0 = false"'], NULL, NULL),

(10767, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int score = 72;
    if (score >= 90)
        cout << "A";
    else if (score >= 80)
        cout << "B";
    else if (score >= 70)
        cout << "C";
    else
        cout << "F";
    return 0;
}', ARRAY['"A"', '"B"', '"C"', '"F"'], 2, 'score = 72이고, 72 >= 90은 거짓, 72 >= 80은 거짓, 72 >= 70은 참이므로 "C"가 출력됩니다.', 'else if 순서 평가', 'else if 체인에서 조건은 위에서 아래로 순서대로 평가되며, 처음 참인 조건의 블록만 실행됩니다.', ARRAY['"else if"', '"순차 평가"', '"등급 판별"'], NULL, NULL),

(10768, 'cpp', 'cpp-6', '쉬움', '다음 switch 문에서 n = 2일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 2;
    switch (n) {
        case 1:
            cout << "one";
            break;
        case 2:
            cout << "two";
            break;
        case 3:
            cout << "three";
            break;
        default:
            cout << "other";
    }
    return 0;
}', ARRAY['"one"', '"two"', '"three"', '"other"'], 1, 'n = 2이므로 case 2가 매칭됩니다. break가 있으므로 "two" 출력 후 switch를 빠져나갑니다.', 'switch-case 기본', 'switch는 변수 값과 case 값을 비교합니다. 일치하는 case부터 실행하고, break를 만나면 switch를 종료합니다.', ARRAY['"switch"', '"case"', '"break"'], NULL, NULL),

(10769, 'cpp', 'cpp-6', '쉬움', '다음 코드에서 break가 없을 때 n = 1이면 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 1;
    switch (n) {
        case 1:
            cout << "A";
        case 2:
            cout << "B";
        case 3:
            cout << "C";
    }
    return 0;
}', ARRAY['"A"', '"AB"', '"ABC"', '"컴파일 오류"'], 2, 'break가 없으면 fall-through가 발생합니다. case 1에서 시작해 case 2, case 3까지 모두 실행되어 "ABC"가 출력됩니다.', 'switch fall-through', 'break가 없으면 다음 case로 계속 실행됩니다(fall-through). 이는 C++ switch의 특성입니다.', ARRAY['"fall-through"', '"switch"', '"break 생략"'], NULL, NULL),

(10770, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 10;
    int max = (a > b) ? a : b;
    cout << max;
    return 0;
}', ARRAY['"5"', '"10"', '"true"', '"false"'], 1, '삼항 연산자에서 a > b는 5 > 10으로 거짓이므로 b = 10이 max에 저장됩니다.', '삼항 연산자', '(조건) ? 참값 : 거짓값 형태의 삼항 연산자는 if-else의 축약 표현입니다.', ARRAY['"삼항 연산자"', '"? :"', '"최댓값"'], NULL, NULL),

(10771, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    bool a = true, b = false;
    if (!a || b) {
        cout << "예";
    } else {
        cout << "아니오";
    }
    return 0;
}', ARRAY['"예"', '"아니오"', '"true"', '"컴파일 오류"'], 1, '!a = !true = false, b = false. false || false = false이므로 else 블록이 실행됩니다.', '논리 연산자 조합', '!은 NOT, ||은 OR, &&은 AND입니다. !a || b에서 a=true이면 !a=false, b=false이므로 전체가 false입니다.', ARRAY['"논리 연산자"', '"! (NOT)"', '"|| (OR)"'], NULL, NULL),

(10772, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 10;
    if (x > 5) {
        if (x > 8) {
            cout << "크다";
        } else {
            cout << "중간";
        }
    } else {
        cout << "작다";
    }
    return 0;
}', ARRAY['"크다"', '"중간"', '"작다"', '"크다중간"'], 0, 'x = 10, 10 > 5는 참이므로 안쪽으로 진입. 10 > 8도 참이므로 "크다"가 출력됩니다.', '중첩 if 문', '안쪽 if 문은 바깥 if 조건이 참일 때만 도달합니다. 들여쓰기로 구조를 파악하세요.', ARRAY['"중첩 if"', '"if-else"', '"조건 중첩"'], NULL, NULL),

(10773, 'cpp', 'cpp-6', '보통', '다음 코드에서 x = 3일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 3;
    if (x < 0)
        cout << "음수";
    else if (x == 0)
        cout << "영";
    else if (x % 2 == 0)
        cout << "양수 짝수";
    else
        cout << "양수 홀수";
    return 0;
}', ARRAY['"음수"', '"영"', '"양수 짝수"', '"양수 홀수"'], 3, 'x = 3: x < 0은 거짓, x == 0도 거짓, x % 2 == 0은 3 % 2 = 1이므로 거짓. 마지막 else에서 "양수 홀수"가 출력됩니다.', 'else if 다중 분기', '여러 else if 조건 중 처음으로 참이 되는 블록이 실행됩니다. 모두 거짓이면 else가 실행됩니다.', ARRAY['"else if"', '"나머지 연산"', '"홀수/짝수"'], NULL, NULL),

(10774, 'cpp', 'cpp-6', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 5;
    if (a == b)
        cout << "같음";
        cout << "항상";
    return 0;
}', ARRAY['"같음항상"', '"같음"', '"항상"', '"아무것도 없음"'], 0, '중괄호 없는 if는 바로 다음 문장 하나만 if 블록에 속합니다. cout << "같음"은 if에 속하고, cout << "항상"은 항상 실행됩니다. a == b이므로 둘 다 출력됩니다.', '중괄호 없는 if', 'C++에서 중괄호를 생략하면 if 다음의 단 하나의 문장만 조건부로 실행됩니다. 나머지는 항상 실행됩니다.', ARRAY['"중괄호 생략"', '"if 범위"', '"들여쓰기 주의"'], NULL, NULL),

(10775, 'cpp', 'cpp-6', '보통', '다음 코드에서 x = 7, y = 3일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 7, y = 3;
    if (x > 5 && y < 5) {
        cout << "둘 다 참";
    } else if (x > 5 || y > 5) {
        cout << "하나 이상 참";
    } else {
        cout << "둘 다 거짓";
    }
    return 0;
}', ARRAY['"둘 다 참"', '"하나 이상 참"', '"둘 다 거짓"', '"컴파일 오류"'], 0, 'x = 7 > 5는 참, y = 3 < 5는 참. 첫 번째 조건 x > 5 && y < 5가 true && true = true이므로 "둘 다 참"이 출력됩니다.', '복합 논리 조건', '&& 는 두 조건이 모두 참일 때 true입니다. 첫 번째 조건이 참이면 else if는 평가조차 되지 않습니다.', ARRAY['"&&"', '"||"', '"복합 조건"'], NULL, NULL),

(10776, 'cpp', 'cpp-6', '보통', '다음 코드에서 ch = ''c''일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    char ch = ''c'';
    switch (ch) {
        case ''a'':
        case ''e'':
        case ''i'':
        case ''o'':
        case ''u'':
            cout << "모음";
            break;
        default:
            cout << "자음";
    }
    return 0;
}', ARRAY['"모음"', '"자음"', '"모음자음"', '"컴파일 오류"'], 1, 'ch = ''c''는 모음(a, e, i, o, u)이 아니므로 default 블록이 실행되어 "자음"이 출력됩니다.', 'switch case 그룹핑', '여러 case를 break 없이 나열하면 동일한 동작을 묶을 수 있습니다. 이 패턴으로 여러 값에 같은 처리를 할 수 있습니다.', ARRAY['"switch"', '"case 그룹"', '"char 비교"'], NULL, NULL),

(10777, 'cpp', 'cpp-6', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 4;
    string result = (x % 2 == 0) ? "짝수" : "홀수";
    cout << result;
    return 0;
}', ARRAY['"짝수"', '"홀수"', '"4"', '"컴파일 오류"'], 0, 'x = 4, 4 % 2 = 0이므로 x % 2 == 0은 참. 삼항 연산자에서 참값인 "짝수"가 result에 저장됩니다.', '삼항 연산자와 string', '삼항 연산자의 결과를 변수에 저장할 수 있습니다. 두 결과값의 타입이 같아야 합니다.', ARRAY['"삼항 연산자"', '"string"', '"짝수/홀수"'], NULL, NULL),

(10778, 'cpp', 'cpp-6', '어려움', '다음 코드에서 a = 10, b = 0일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 0;
    if (b != 0 && a / b > 2) {
        cout << "크다";
    } else {
        cout << "안전";
    }
    return 0;
}', ARRAY['"크다"', '"안전"', '"런타임 오류"', '"컴파일 오류"'], 1, 'b != 0은 0 != 0 = false입니다. &&는 단락 평가(short-circuit evaluation)를 하므로 첫 조건이 false이면 a / b는 실행되지 않습니다. else 블록이 실행되어 "안전"이 출력됩니다.', '단락 평가 (Short-circuit Evaluation)', '&& 에서 왼쪽이 false이면 오른쪽은 평가하지 않습니다. 이를 이용해 나누기 전에 0 여부를 검사하는 안전한 코드를 작성할 수 있습니다.', ARRAY['"단락 평가"', '"&&"', '"division by zero 방지"'], NULL, NULL),

(10779, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 5;
    if (x > 3)
        if (x > 7)
            cout << "A";
        else
            cout << "B";
    else
        cout << "C";
    return 0;
}', ARRAY['"A"', '"B"', '"C"', '"AB"'], 1, 'else는 가장 가까운 if에 매칭됩니다(dangling else). x = 5: 5 > 3은 참이므로 안쪽 if로 진입. 5 > 7은 거짓이므로 안쪽 else("B")가 실행됩니다.', 'Dangling Else (매달린 else)', '중괄호 없이 if-else가 중첩될 때, else는 항상 가장 가까운(마지막) if에 매칭됩니다. 명확성을 위해 중괄호 사용을 권장합니다.', ARRAY['"dangling else"', '"중첩 if"', '"else 매칭"'], NULL, NULL),

(10780, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 3, b = 3, c = 3;
    if (a == b && b == c)
        cout << "모두 같음";
    else if (a == b || b == c || a == c)
        cout << "두 개 같음";
    else
        cout << "모두 다름";
    return 0;
}', ARRAY['"모두 같음"', '"두 개 같음"', '"모두 다름"', '"컴파일 오류"'], 0, 'a = b = c = 3이므로 a == b && b == c는 true && true = true. 첫 번째 if가 실행됩니다.', '복합 조건 평가', '&& 는 두 조건이 모두 참일 때 true입니다. 세 변수가 모두 같으면 a==b && b==c가 성립합니다.', ARRAY['"&&"', '"==비교"', '"복합 조건"'], NULL, NULL),

-- ============================================================
-- cpp-7 (반복문) +13개  [ID 10781~10793]
-- ============================================================

(10781, 'cpp', 'cpp-7', '쉬움', '다음 for 루프는 총 몇 번 실행되나요?', 'for (int i = 1; i <= 5; i++) {
    // 실행
}', ARRAY['"4번"', '"5번"', '"6번"', '"무한 반복"'], 1, 'i는 1에서 시작해 5까지 증가합니다. i=1,2,3,4,5일 때 조건 i<=5가 참이므로 총 5번 실행됩니다.', 'for 반복 횟수 계산', 'i <= n에서 1에서 n까지이면 n번 반복됩니다. i < n이면 n-1번 반복됩니다.', ARRAY['"for 루프"', '"반복 횟수"', '"i<=n vs i<n"'], NULL, NULL),

(10782, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        cout << i << " ";
    }
    return 0;
}', ARRAY['"0 1 2 3 "', '"0 1 2 "', '"1 2 3 "', '"1 2 "'], 1, 'i = 0부터 시작해 i < 3이 참인 동안 실행됩니다. i=0, 1, 2일 때 실행되고 i=3이 되면 종료됩니다. 출력: "0 1 2 "', 'for 루프 출력', 'for (int i = 0; i < n; i++)는 i가 0부터 n-1까지 변화합니다. 이 패턴은 가장 많이 사용되는 for 루프입니다.', ARRAY['"for"', '"i=0 시작"', '"i<n"'], NULL, NULL),

(10783, 'cpp', 'cpp-7', '쉬움', '다음 do-while 코드에서 조건이 처음부터 거짓이어도 실행 횟수는?', 'int i = 10;
do {
    cout << i;
    i++;
} while (i < 5);', ARRAY['"0번"', '"1번"', '"5번"', '"무한 반복"'], 1, 'do-while은 루프 본체를 먼저 실행한 후 조건을 검사합니다. i = 10으로 시작하면 10을 출력 후 i++로 11이 됩니다. while (11 < 5)는 거짓이므로 종료. 최소 1번은 실행됩니다.', 'do-while 최소 1회 실행', 'do-while은 조건 검사 전에 루프 본체를 먼저 실행합니다. 조건이 처음부터 거짓이어도 정확히 1번 실행됩니다.', ARRAY['"do-while"', '"최소 1회"', '"while vs do-while"'], NULL, NULL),

(10784, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 4; i++) {
        sum += i;
    }
    cout << sum;
    return 0;
}', ARRAY['"4"', '"8"', '"10"', '"12"'], 2, 'sum = 0 + 1 + 2 + 3 + 4 = 10. 1부터 4까지의 합입니다.', '누적합 패턴', 'sum += i는 sum = sum + i의 축약입니다. 반복문에서 값을 누적할 때 사용하는 기본 패턴입니다.', ARRAY['"누적합"', '"+= 연산자"', '"합산 패턴"'], NULL, NULL),

(10785, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 10; i >= 7; i--) {
        cout << i << " ";
    }
    return 0;
}', ARRAY['"10 9 8 7 "', '"7 8 9 10 "', '"10 9 8 "', '"7 8 9 "'], 0, 'i = 10에서 시작해 i--로 감소합니다. i >= 7인 동안 실행되므로 i = 10, 9, 8, 7이 출력됩니다.', 'for 역방향 반복', '카운터를 감소시키는 for 루프로 역방향 반복이 가능합니다. 초기값에서 시작해 종료 조건까지 감소합니다.', ARRAY['"for"', '"i--"', '"역방향 반복"'], NULL, NULL),

(10786, 'cpp', 'cpp-7', '보통', '다음 코드에서 break 후 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    cout << "끝";
    return 0;
}', ARRAY['"1 2 3 끝"', '"1 2 끝"', '"1 2 3 4 5 끝"', '"끝"'], 1, 'i=1,2는 cout으로 출력, i=3이 되면 break로 for 루프를 즉시 종료합니다. 루프 다음의 cout << "끝"은 실행됩니다.', 'break 위치와 효과', 'break는 현재 반복문을 즉시 종료합니다. 반복문 밖의 코드는 계속 실행됩니다.', ARRAY['"break"', '"루프 종료"', '"반복문 탈출"'], NULL, NULL),

(10787, 'cpp', 'cpp-7', '보통', '다음 코드에서 continue 후 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        cout << i << " ";
    }
    return 0;
}', ARRAY['"1 2 4 5 "', '"1 2 3 4 5 "', '"1 2 "', '"4 5 "'], 0, 'i=3일 때 continue가 실행되어 이번 반복의 나머지(cout)를 건너뛰고 i++로 i=4로 진행합니다. 결과: 1 2 4 5.', 'continue 효과', 'continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복으로 이동합니다. 루프 자체는 종료되지 않습니다.', ARRAY['"continue"', '"반복 건너뜀"', '"for + continue"'], NULL, NULL),

(10788, 'cpp', 'cpp-7', '보통', '다음 while 루프의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 1;
    while (n < 16) {
        n *= 2;
    }
    cout << n;
    return 0;
}', ARRAY['"8"', '"16"', '"32"', '"무한 루프"'], 1, 'n은 1→2→4→8→16으로 두 배씩 증가합니다. n=16이 되면 n < 16이 거짓이 되어 루프 종료. n = 16이 출력됩니다.', 'while 종료 조건 추적', 'while 루프의 종료 조건을 정확히 파악해야 합니다. n이 16이 되었을 때 n < 16이 false가 됩니다.', ARRAY['"while"', '"종료 조건"', '"두 배 증가"'], NULL, NULL),

(10789, 'cpp', 'cpp-7', '보통', '다음 중첩 루프의 출력 결과는? (줄 수 포함)', '#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << "\n";
    }
    return 0;
}', ARRAY['"*** 줄 하나"', '"*\n**\n***\n"', '"***\n***\n***\n"', '"*\n*\n*\n"'], 1, 'i=1: j=1 → * 출력 후 줄바꿈. i=2: j=1,2 → ** 출력 후 줄바꿈. i=3: j=1,2,3 → *** 출력 후 줄바꿈. 삼각형 패턴이 출력됩니다.', '중첩 루프 삼각형 패턴', '안쪽 루프의 범위가 바깥 루프 변수에 의존할 때 삼각형 패턴이 만들어집니다. j <= i이므로 출력 개수가 i에 따라 증가합니다.', ARRAY['"중첩 루프"', '"삼각형 패턴"', '"j <= i"'], NULL, NULL),

(10790, 'cpp', 'cpp-7', '보통', '다음 코드에서 i += 2일 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i <= 8; i += 2) {
        cout << i << " ";
    }
    return 0;
}', ARRAY['"0 1 2 3 4 5 6 7 8 "', '"0 2 4 6 8 "', '"2 4 6 8 "', '"0 2 4 6 "'], 1, 'i = 0에서 시작해 2씩 증가합니다. i <= 8인 동안 실행: 0, 2, 4, 6, 8이 출력됩니다.', 'for 간격 증가 (i += 2)', 'for의 세 번째 파트에서 i += 2를 사용하면 짝수만 순회하거나 2씩 건너뛸 수 있습니다.', ARRAY['"i += 2"', '"간격 증가"', '"짝수 순회"'], NULL, NULL),

(10791, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int cnt = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) cnt++;
    }
    cout << cnt;
    return 0;
}', ARRAY['"2"', '"3"', '"4"', '"5"'], 1, '1부터 10 사이 3의 배수: 3, 6, 9 → 총 3개. cnt = 3이 출력됩니다.', '카운터 패턴', '조건을 만족하는 원소의 개수를 세는 카운터 패턴입니다. 반복문 안에서 조건이 참일 때 카운터를 증가시킵니다.', ARRAY['"카운터 패턴"', '"나머지 연산"', '"배수 찾기"'], NULL, NULL),

(10792, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 12;
    int result = 1;
    while (n > 1) {
        if (n % 2 == 0) n /= 2;
        else n = n * 3 + 1;
        result++;
    }
    cout << result;
    return 0;
}', ARRAY['"8"', '"9"', '"10"', '"11"'], 2, 'n=12 → 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1. result는 매 단계 1씩 증가합니다. 처음 1에서 시작해 9번 변환 후 result=10이 됩니다.', '콜라츠 수열 (while 루프 추적)', 'while 루프 내에서 조건에 따라 값이 변화할 때 각 단계를 손으로 추적해야 합니다. 복잡한 루프는 표를 만들어 추적하세요.', ARRAY['"while 추적"', '"콜라츠 수열"', '"조건 분기"'], NULL, NULL),

(10793, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    bool found = false;
    for (int i = 2; i <= 20; i++) {
        bool isPrime = true;
        for (int j = 2; j < i; j++) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            cout << i << " ";
            if (i > 10) break;
        }
    }
    return 0;
}', ARRAY['"2 3 5 7 11 "', '"2 3 5 7 11 13 "', '"2 3 5 7 "', '"11 13 17 19 "'], 0, '소수 판별 후 출력합니다. 2, 3, 5, 7은 10 이하이므로 break 없이 출력. 11이 출력된 후 11 > 10이 참이므로 break로 바깥 루프 종료. 결과: "2 3 5 7 11 "', '중첩 루프와 break 조합', '안쪽 루프의 break는 안쪽 루프만 종료합니다. 바깥 루프의 break는 바깥 루프를 종료합니다. 각 break가 어느 루프를 종료하는지 파악해야 합니다.', ARRAY['"소수 판별"', '"중첩 루프"', '"break 범위"'], NULL, NULL),

-- ============================================================
-- cpp-23 (sort 마스터) +14개  [ID 10794~10807]
-- ============================================================

(10794, 'cpp', 'cpp-23', '쉬움', '다음 코드 실행 후 v[2]의 값은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 3};
    sort(v.begin(), v.end())
ON CONFLICT (id) DO NOTHING;
    cout << v[2];
    return 0;
}', ARRAY['"8"', '"2"', '"3"', '"5"'], 2, '오름차순 정렬 후 v = {1, 2, 3, 5, 8}. v[2]는 인덱스 2번 원소인 3입니다.', 'sort() 오름차순 정렬', 'sort(v.begin(), v.end())는 기본 오름차순 정렬입니다. 정렬 후 인덱스를 정확히 세어야 합니다.', ARRAY['"sort"', '"오름차순"', '"인덱스 접근"'], NULL, NULL),

(10795, 'cpp', 'cpp-23', '쉬움', '다음 코드 실행 후 v[0]의 값은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 1, 7, 2, 9};
    sort(v.begin(), v.end(), greater<int>());
    cout << v[0];
    return 0;
}', ARRAY['"1"', '"4"', '"7"', '"9"'], 3, 'greater<int>()를 사용하면 내림차순 정렬됩니다. 정렬 후 v = {9, 7, 4, 2, 1}. v[0] = 9입니다.', 'sort() 내림차순 (greater<int>)', 'sort()의 세 번째 인자로 greater<int>()를 전달하면 내림차순 정렬됩니다. v[0]이 가장 큰 값이 됩니다.', ARRAY['"greater<int>()"', '"내림차순"', '"sort 세 번째 인자"'], NULL, NULL),

(10796, 'cpp', 'cpp-23', '쉬움', 'sort()를 사용해 정수 배열을 오름차순 정렬하는 올바른 코드는? (int arr[4])', 'int arr[4] = {3, 1, 4, 2};', ARRAY['"sort(arr, arr + 4);"', '"sort(arr[0], arr[3]);"', '"sort(&arr, &arr + 4);"', '"sort(arr.begin(), arr.end());"'], 0, 'C 스타일 배열은 arr이 첫 번째 요소의 포인터입니다. sort(arr, arr+4)는 arr[0]부터 arr[3]까지 정렬합니다.', 'C 배열 sort()', 'C 스타일 배열을 sort할 때는 포인터를 사용합니다. sort(arr, arr + n)에서 arr은 시작 포인터, arr+n은 끝 포인터입니다.', ARRAY['"배열 포인터"', '"sort 배열"', '"arr + n"'], NULL, NULL),

(10797, 'cpp', 'cpp-23', '보통', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, int>> v = {{3, 2}, {1, 5}, {3, 1}, {2, 4}};
    sort(v.begin(), v.end());
    cout << v[0].first << " " << v[0].second;
    return 0;
}', ARRAY['"1 5"', '"3 1"', '"2 4"', '"3 2"'], 0, 'pair를 sort하면 first 기준 오름차순, first가 같으면 second 기준 오름차순으로 정렬됩니다. 정렬 후: {1,5}, {2,4}, {3,1}, {3,2}. v[0] = {1, 5}이므로 1 5가 출력됩니다.', 'pair 자동 정렬', 'sort()로 pair 벡터를 정렬하면 .first 기준 오름차순, 같으면 .second 기준 오름차순으로 자동 정렬됩니다.', ARRAY['"pair 정렬"', '".first 기준"', '"pair 자동 비교"'], NULL, NULL),

(10798, 'cpp', 'cpp-23', '보통', '다음 람다 비교자의 정렬 결과로 v[0]은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 3};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a > b;
    });
    cout << v[0];
    return 0;
}', ARRAY['"1"', '"3"', '"5"', '"8"'], 3, '람다 [](int a, int b){ return a > b; }는 a가 b보다 클 때 a를 앞에 놓으므로 내림차순입니다. 정렬 후 v = {8, 5, 3, 2, 1}. v[0] = 8입니다.', '람다 비교자 방향', 'return a < b이면 오름차순, return a > b이면 내림차순입니다. a > b는 "a가 앞에 와야 하면 a > b"로 이해합니다.', ARRAY['"람다 비교자"', '"a > b = 내림차순"', '"sort lambda"'], NULL, NULL),

(10799, 'cpp', 'cpp-23', '보통', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, string>> v = {{85, "철수"}, {92, "영희"}, {85, "민수"}};
    sort(v.begin(), v.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });
    cout << v[0].second;
    return 0;
}', ARRAY['"철수"', '"영희"', '"민수"', '"85"'], 2, 'second(이름) 기준 오름차순(사전순)으로 정렬합니다. 민수 < 영희 < 철수(한글 사전순). v[0].second = "민수"입니다.', 'pair second 기준 정렬', '.second 기준으로 정렬할 때는 람다를 사용합니다. auto&를 사용하면 pair 타입을 자동 추론합니다.', ARRAY['"second 기준"', '"람다 정렬"', '"auto& 사용"'], NULL, NULL),

(10800, 'cpp', 'cpp-23', '보통', '다음 코드 실행 후 v의 크기는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}', ARRAY['"7"', '"8"', '"9"', '"10"'], 0, '원본: {3,1,4,1,5,9,2,6,5,3}. 정렬 후: {1,1,2,3,3,4,5,5,6,9}. unique()는 중복을 뒤로 밀고 고유 원소 범위의 끝 반복자를 반환. erase()로 제거하면 {1,2,3,4,5,6,9} → 크기 7입니다.', 'unique() + erase() 중복 제거', 'unique()는 정렬된 범위에서 연속 중복을 뒤로 밀고, erase()로 그 부분을 제거합니다. sort 후에 unique를 써야 모든 중복이 제거됩니다.', ARRAY['"unique()"', '"erase()"', '"중복 제거"'], NULL, NULL),

(10801, 'cpp', 'cpp-23', '보통', '학생을 성적 내림차순으로 정렬한 뒤 v[0].name을 출력하는 올바른 람다는?', 'struct Student { string name; int score; };
vector<Student> v = {{"철수", 80}, {"영희", 95}, {"민수", 88}};', ARRAY['"sort(v.begin(), v.end(), [](Student a, Student b){ return a.score < b.score; });"', '"sort(v.begin(), v.end(), [](Student& a, Student& b){ return a.score > b.score; });"', '"sort(v.begin(), v.end(), greater<Student>());"', '"sort(v.begin(), v.end(), [](Student a, Student b){ return a.name < b.name; });"'], 1, '내림차순은 return a.score > b.score입니다. Student에는 기본 비교 연산자가 없으므로 greater<Student>()는 컴파일 오류가 납니다.', '구조체 정렬 람다', '구조체는 기본 비교 연산자가 없으므로 sort 시 람다를 제공해야 합니다. 내림차순이면 return a.field > b.field입니다.', ARRAY['"구조체 정렬"', '"람다 비교자"', '"score > score"'], NULL, NULL),

(10802, 'cpp', 'cpp-23', '보통', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<string> v = {"banana", "apple", "cherry", "date"};
    sort(v.begin(), v.end(), [](const string& a, const string& b) {
        return a.length() < b.length();
    });
    cout << v[0];
    return 0;
}', ARRAY['"banana"', '"apple"', '"cherry"', '"date"'], 3, '문자열 길이 오름차순으로 정렬합니다. 길이: date=4, apple=5, banana=6, cherry=6. 가장 짧은 date가 v[0]입니다.', '문자열 길이 기준 정렬', '.length()를 비교 기준으로 사용하는 람다입니다. const string&를 사용해 불필요한 복사를 피합니다.', ARRAY['"length() 기준"', '"문자열 정렬"', '"const& 람다"'], NULL, NULL),

(10803, 'cpp', 'cpp-23', '어려움', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 3, 5, 1};
    sort(v.begin(), v.end());
    auto it = unique(v.begin(), v.end());
    cout << (it - v.begin());
    return 0;
}', ARRAY['"3"', '"4"', '"5"', '"6"'], 1, '정렬 후 v = {1, 3, 3, 5, 5, 8}. unique() 후 고유 원소는 {1, 3, 5, 8}로 4개. unique()는 고유 원소 끝의 반복자를 반환하므로 it - v.begin() = 4입니다.', 'unique() 반환값', 'unique()는 erase()와 함께 사용됩니다. 반환값은 중복 제거 후 고유 원소 범위의 끝 반복자이며, it - v.begin()으로 고유 원소 개수를 구할 수 있습니다.', ARRAY['"unique() 반환값"', '"반복자 거리"', '"it - v.begin()"'], NULL, NULL),

(10804, 'cpp', 'cpp-23', '어려움', '점수 내림차순, 점수가 같으면 이름 오름차순으로 정렬할 때 올바른 람다는?', 'struct Student { string name; int score; };', ARRAY['"[](auto& a, auto& b){ return a.score > b.score || a.name < b.name; }"', '"[](auto& a, auto& b){ if (a.score != b.score) return a.score > b.score; return a.name < b.name; }"', '"[](auto& a, auto& b){ return a.score > b.score && a.name < b.name; }"', '"[](auto& a, auto& b){ return a.score > b.score; }"'], 1, '다중 조건 정렬에서는 첫 번째 기준이 같을 때만 두 번째 기준을 적용합니다. if (a.score != b.score)로 먼저 점수가 다른지 확인하고, 같으면 이름 비교로 넘어갑니다.', '다중 조건 정렬 람다', '다중 기준 정렬은 "첫 번째 기준이 같으면 두 번째 기준"입니다. if (a.key1 != b.key1) return a.key1 > b.key1; return a.key2 < b.key2; 패턴을 사용합니다.', ARRAY['"다중 조건 정렬"', '"if-else 람다"', '"tie-breaking"'], NULL, NULL),

(10805, 'cpp', 'cpp-23', '어려움', '다음 코드 실행 후 v의 내용은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {4, 2, 4, 1, 2, 3};
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    for (int x : v) cout << x << " ";
    return 0;
}', ARRAY['"1 2 3 4 "', '"4 2 4 1 2 3 "', '"1 2 2 3 4 4 "', '"4 4 3 2 2 1 "'], 0, '정렬 후: {1, 2, 2, 3, 4, 4}. unique()로 연속 중복 제거 후 erase: {1, 2, 3, 4}. 출력: "1 2 3 4 "', 'sort + unique + erase 패이프라인', '중복 제거의 3단계: 1) sort로 같은 값을 인접하게 만들기, 2) unique()로 중복을 뒤로 밀기, 3) erase()로 불필요한 부분 제거.', ARRAY['"sort + unique + erase"', '"중복 제거 파이프라인"', '"3단계 패턴"'], NULL, NULL),

(10806, 'cpp', 'cpp-23', '어려움', '버블 정렬에서 배열 {4, 2, 7, 1}의 첫 번째 패스(i=0) 완료 후 배열 상태는?', '// 버블 정렬 코드:
for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-1-i; j++) {
        if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);
    }
}', ARRAY['"{2, 4, 1, 7}"', '"{1, 2, 4, 7}"', '"{2, 7, 1, 4}"', '"{4, 2, 7, 1}"'], 0, '첫 번째 패스(i=0, j=0,1,2): j=0: 4>2 swap → {2,4,7,1}. j=1: 4<7 유지 → {2,4,7,1}. j=2: 7>1 swap → {2,4,1,7}. 첫 패스 후 최댓값 7이 맨 끝으로 이동합니다.', '버블 정렬 첫 패스', '버블 정렬의 각 패스에서 현재 범위의 최댓값이 맨 뒤로 이동합니다. 첫 패스에서 전체 최댓값이 마지막 자리로 이동합니다.', ARRAY['"버블 정렬"', '"패스"', '"swap 과정"'], NULL, NULL),

(10807, 'cpp', 'cpp-23', '어려움', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int, int>> intervals = {{1, 4}, {2, 6}, {1, 2}, {3, 5}};
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second;
    });
    cout << intervals[0].first << " " << intervals[0].second << endl;
    cout << intervals[1].first << " " << intervals[1].second;
    return 0;
}', ARRAY['"1 4\n1 2"', '"1 2\n1 4"', '"1 2\n2 6"', '"2 6\n1 4"'], 1, 'first 오름차순, 같으면 second 오름차순 정렬. first=1인 것: {1,2}와 {1,4}. second 기준으로 {1,2}가 앞. 정렬 후: {1,2}, {1,4}, {2,6}, {3,5}. intervals[0]={1,2}, intervals[1]={1,4}.', '구간 정렬 (시작점, 끝점 기준)', 'USACO/경쟁 프로그래밍에서 구간 정렬은 시작점 기준 오름차순, 같으면 끝점 기준으로 정렬하는 패턴이 자주 나옵니다.', ARRAY['"구간 정렬"', '"다중 기준"', '"USACO 패턴"'], NULL, NULL)
ON CONFLICT (id) DO NOTHING;
