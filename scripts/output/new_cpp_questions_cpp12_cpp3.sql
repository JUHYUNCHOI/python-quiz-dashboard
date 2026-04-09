-- ============================================================
-- new_cpp_questions_cpp12_cpp3.sql
-- cpp-12 (레퍼런스): +11개 (ID 10829~10839)
-- cpp-3 (타입시스템): +10개 (ID 10840~10849)
-- 한국어 + 영어 동시 INSERT
-- ============================================================

INSERT INTO questions (
  id, language, lesson_id, difficulty,
  question, code, options, correct_answer, explanation,
  key_concept_title, key_concept_description, related_topics, animation_key, code_comparison,
  question_en, explanation_en, key_concept_title_en, key_concept_desc_en, options_en
) VALUES

-- ============================================================
-- cpp-12 (레퍼런스) +11개  [ID 10829~10839]
-- ============================================================

(
  10829, 'cpp', 'cpp-12', '쉬움',
  '다음 코드에서 ref는 무엇인가?',
  'int x = 5;
int& ref = x;',
  ARRAY['"x의 복사본"', '"x의 별칭(alias)"', '"x의 주소"', '"새 변수"'],
  1,
  'int& ref = x는 ref를 x의 별칭으로 만듭니다. ref와 x는 동일한 메모리 위치를 가리킵니다.',
  '참조(Reference)의 의미',
  'C++ 참조는 기존 변수의 별칭입니다. int& ref = x는 x를 복사하는 것이 아니라, 같은 메모리 셀에 또 다른 이름을 붙이는 것입니다.',
  ARRAY['"참조"', '"별칭"', '"int&"'],
  NULL, NULL,
  'What is ref in the following code?',
  'int& ref = x declares ref as an alias for x. ref and x point to the same memory location.',
  'What is a Reference?',
  'A C++ reference is an alias for an existing variable. int& ref = x does not copy x — it gives another name to the same memory cell.',
  ARRAY['"copy of x"', '"alias of x"', '"address of x"', '"new variable"']
),

(
  10830, 'cpp', 'cpp-12', '쉬움',
  '다음 코드의 출력 결과는?',
  'int x = 10;
int& ref = x;
ref = 20;
cout << x;',
  ARRAY['"10"', '"20"', '"ref"', '"컴파일 오류"'],
  1,
  'ref는 x의 별칭이므로 ref = 20은 x의 값을 20으로 변경합니다. x와 ref는 같은 메모리 셀을 공유하므로 cout << x는 20을 출력합니다.',
  '참조를 통한 값 변경',
  '참조 변수에 값을 대입하면 원본 변수가 변경됩니다. ref = 20은 "ref가 가리키는 변수(x)의 값을 20으로 바꿔라"와 같습니다.',
  ARRAY['"참조 대입"', '"별칭 수정"', '"원본 변경"'],
  NULL, NULL,
  'What is the output of the following code?',
  'ref is an alias for x, so ref = 20 changes x''s value to 20. x and ref share the same memory cell, so cout << x prints 20.',
  'Modifying Value Through a Reference',
  'Assigning a value to a reference variable changes the original variable. ref = 20 means "change the value of the variable ref refers to (x) to 20".',
  NULL
),

(
  10831, 'cpp', 'cpp-12', '쉬움',
  '다음 코드 중 컴파일 오류가 발생하는 것은?',
  NULL,
  ARRAY['"int x = 5; int& r = x;"', '"int x = 5; int y = 3; int& r = x; r = y;"', '"int& r; // 초기화 없음"', '"const int x = 5; const int& r = x;"'],
  2,
  'C++에서 참조는 선언과 동시에 반드시 초기화해야 합니다. int& r;처럼 초기화 없이 선언하면 컴파일 오류가 발생합니다.',
  '참조는 반드시 초기화해야 함',
  '참조는 선언 시 반드시 어떤 변수를 가리킬지 정해야 합니다. 포인터와 달리 나중에 초기화할 수 없습니다.',
  ARRAY['"참조 초기화"', '"컴파일 오류"', '"int& 선언"'],
  NULL, NULL,
  'Which of the following causes a compile error?',
  'In C++, a reference must be initialized at the point of declaration. Declaring int& r; without initialization is a compile error.',
  'References Must Be Initialized',
  'A reference must be bound to a variable at the time of declaration. Unlike pointers, a reference cannot be initialized later.',
  NULL
),

(
  10832, 'cpp', 'cpp-12', '쉬움',
  '다음 코드에서 r = y 실행 후 x의 값은?',
  'int x = 1, y = 2;
int& r = x;
r = y;
cout << x;',
  ARRAY['"1"', '"2"', '"r은 이제 y를 가리킴"', '"컴파일 오류"'],
  1,
  'r = y는 r이 y를 가리키도록 변경하는 것이 아닙니다. r은 항상 x의 별칭입니다. r = y는 r(즉 x)의 값을 y의 값(2)으로 바꾸는 것입니다. 따라서 x = 2가 됩니다.',
  '참조는 재지정(rebind) 불가',
  'C++ 참조는 한 번 초기화된 후 다른 변수를 가리키도록 변경할 수 없습니다. r = y처럼 대입하면 r이 가리키는 변수의 값이 변경되는 것입니다.',
  ARRAY['"참조 재지정"', '"rebind 불가"', '"값 대입 vs 재지정"'],
  NULL, NULL,
  'What is the value of x after r = y?',
  'r = y does not make r point to y. r is always an alias for x. r = y copies the value of y (which is 2) into r (i.e., into x). So x becomes 2.',
  'References Cannot Be Rebound',
  'Once initialized, a C++ reference cannot be made to refer to a different variable. Writing r = y copies the value of y into the variable r refers to — it does not rebind r.',
  NULL
),

(
  10833, 'cpp', 'cpp-12', '보통',
  '다음 함수 호출 후 a의 값은?',
  '#include <iostream>
using namespace std;

void addTen(int& n) {
    n += 10;
}

int main() {
    int a = 5;
    addTen(a);
    cout << a;
    return 0;
}',
  ARRAY['"5"', '"10"', '"15"', '"컴파일 오류"'],
  2,
  'addTen()은 int&(참조)로 인수를 받으므로 n은 a의 별칭입니다. n += 10은 a의 값을 10만큼 증가시킵니다. 함수 호출 후 a = 15가 됩니다.',
  '참조 매개변수 (pass-by-reference)',
  '함수 매개변수를 int&로 선언하면 호출 측 변수를 직접 수정할 수 있습니다. 값이 복사되지 않으므로 함수 내에서의 변경이 원본에 반영됩니다.',
  ARRAY['"pass-by-reference"', '"int&"', '"원본 수정"'],
  NULL, NULL,
  'What is the value of a after the function call?',
  'addTen() takes its argument as int& (reference), so n is an alias for a. n += 10 increments a''s value by 10. After the call, a = 15.',
  'Reference Parameters (Pass-by-Reference)',
  'Declaring a function parameter as int& allows the function to directly modify the caller''s variable. No copy is made, so changes inside the function are reflected in the original.',
  NULL
),

(
  10834, 'cpp', 'cpp-12', '보통',
  '다음 두 함수 중 호출 후 main()의 x 값이 바뀌는 것은?',
  '// 함수 A
void doubleIt(int n) { n *= 2; }

// 함수 B
void doubleIt(int& n) { n *= 2; }',
  ARRAY['"함수 A"', '"함수 B"', '"둘 다 바뀜"', '"둘 다 안 바뀜"'],
  1,
  '함수 A는 값을 복사해서 받으므로(pass-by-value) 원본 x에 영향이 없습니다. 함수 B는 참조로 받으므로(pass-by-reference) n *= 2가 원본 x를 변경합니다.',
  'pass-by-value vs pass-by-reference',
  'pass-by-value: 함수에 복사본이 전달되어 원본 불변. pass-by-reference(int&): 원본의 별칭이 전달되어 함수 내 변경이 원본에 반영됩니다.',
  ARRAY['"pass-by-value"', '"pass-by-reference"', '"int& vs int"'],
  NULL, NULL,
  'Which function actually changes the value of x in main() after being called?',
  'Function A takes by value (pass-by-value), so n is a copy and the original x is unaffected. Function B takes by reference (pass-by-reference), so n *= 2 modifies the original x.',
  'Pass-by-Value vs Pass-by-Reference',
  'Pass-by-value: a copy is passed, so the original is unchanged. Pass-by-reference (int&): an alias to the original is passed, so changes inside the function affect the original.',
  ARRAY['"Function A"', '"Function B"', '"Both change"', '"Neither changes"']
),

(
  10835, 'cpp', 'cpp-12', '보통',
  '다음 swap 함수 호출 후 a, b의 값은?',
  '#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int a = 3, b = 7;
    swap(a, b);
    cout << a << " " << b;
    return 0;
}',
  ARRAY['"3 7"', '"7 3"', '"7 7"', '"3 3"'],
  1,
  'swap()은 a와 b를 참조로 받습니다. temp = a(3), a = b(7), b = temp(3)으로 값이 교환됩니다. 참조이므로 main()의 a, b가 직접 바뀝니다. 결과: a=7, b=3.',
  '참조를 이용한 swap 함수',
  '값 교환 함수는 참조 매개변수를 사용해야 원본 변수가 변경됩니다. 값으로 받으면(int a, int b) 복사본만 교환되어 원본은 그대로입니다.',
  ARRAY['"swap 함수"', '"참조 교환"', '"temp 변수"'],
  NULL, NULL,
  'What are the values of a and b after the swap() call?',
  'swap() takes a and b by reference. temp = a(3), a = b(7), b = temp(3) — the values are exchanged. Since they are references, the a and b in main() are directly changed. Result: a=7, b=3.',
  'Swap Function Using References',
  'A value-swapping function must use reference parameters to change the original variables. If you pass by value (int a, int b), only copies are swapped and the originals are unchanged.',
  NULL
),

(
  10836, 'cpp', 'cpp-12', '보통',
  '다음 코드에서 함수 호출 후 v[0]의 값은?',
  '#include <iostream>
#include <vector>
using namespace std;

void setFirst(vector<int>& v, int val) {
    v[0] = val;
}

int main() {
    vector<int> v = {1, 2, 3};
    setFirst(v, 99);
    cout << v[0];
    return 0;
}',
  ARRAY['"1"', '"99"', '"3"', '"컴파일 오류"'],
  1,
  'setFirst()는 vector<int>&(참조)로 v를 받습니다. v[0] = val은 main()의 원본 벡터의 첫 번째 원소를 99로 변경합니다. 출력: 99.',
  '벡터 참조 전달',
  'vector를 함수에 참조로 전달하면 원본 벡터를 수정할 수 있습니다. 값으로 전달하면 복사본이 생성되어 원본이 바뀌지 않습니다.',
  ARRAY['"vector<int>&"', '"벡터 참조"', '"원소 수정"'],
  NULL, NULL,
  'What is the value of v[0] after the function call?',
  'setFirst() takes v as vector<int>& (reference). v[0] = val changes the first element of the original vector in main() to 99. Output: 99.',
  'Passing Vectors by Reference',
  'Passing a vector by reference lets the function modify the original vector. Passing by value creates a copy, so the original is unchanged.',
  NULL
),

(
  10837, 'cpp', 'cpp-12', '어려움',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    for (int& x : v) {
        x *= 2;
    }
    cout << v[1];
    return 0;
}',
  ARRAY['"20"', '"40"', '"10"', '"30"'],
  1,
  'for (int& x : v)는 v의 각 원소를 참조로 순회합니다. x *= 2는 원본 원소를 직접 수정합니다. 10→20, 20→40, 30→60. v[1] = 40이 출력됩니다.',
  'range-for 루프에서 참조 사용',
  'for (int x : v)는 복사본을 순회하여 원본을 수정할 수 없습니다. for (int& x : v)는 참조를 순회하여 각 원소를 직접 수정할 수 있습니다.',
  ARRAY['"range-for"', '"int& 루프"', '"원소 in-place 수정"'],
  NULL, NULL,
  'What is the output of the following code?',
  'for (int& x : v) iterates over v''s elements by reference. x *= 2 directly modifies each original element: 10→20, 20→40, 30→60. v[1] = 40 is printed.',
  'Using References in Range-for Loops',
  'for (int x : v) iterates by copy and cannot modify the originals. for (int& x : v) iterates by reference, allowing in-place modification of each element.',
  NULL
),

(
  10838, 'cpp', 'cpp-12', '어려움',
  '다음 코드가 컴파일 오류 없이 실행될 때 출력 결과는?',
  '#include <iostream>
using namespace std;

int& getRef(int& x) {
    return x;
}

int main() {
    int a = 5;
    getRef(a) = 100;
    cout << a;
    return 0;
}',
  ARRAY['"5"', '"100"', '"컴파일 오류"', '"정의되지 않은 동작"'],
  1,
  'getRef(a)는 a의 참조를 반환합니다. getRef(a) = 100은 반환된 참조(즉 a)에 100을 대입합니다. 따라서 a = 100이 됩니다.',
  '참조 반환 함수',
  '함수가 int&를 반환하면 호출 결과를 lvalue처럼 대입 대상으로 사용할 수 있습니다. getRef(a) = 100은 a = 100과 동일한 효과입니다.',
  ARRAY['"참조 반환"', '"lvalue"', '"int& 반환"'],
  NULL, NULL,
  'When the following code compiles and runs without error, what is the output?',
  'getRef(a) returns a reference to a. getRef(a) = 100 assigns 100 to the returned reference (i.e., to a). Therefore a = 100.',
  'Functions That Return References',
  'When a function returns int&, the call expression can be used as an lvalue (assignment target). getRef(a) = 100 has the same effect as a = 100.',
  NULL
),

(
  10839, 'cpp', 'cpp-12', '어려움',
  '다음 코드에서 const 참조를 사용하는 이유로 가장 적절한 것은?',
  'void printName(const string& name) {
    cout << name;
}',
  ARRAY['"name을 수정하기 위해"', '"복사 비용을 줄이면서 수정을 방지하기 위해"', '"name을 null로 초기화하기 위해"', '"name의 주소를 얻기 위해"'],
  1,
  'const string& name은 문자열을 복사하지 않고(참조) 전달하면서(비용 절감), 함수 내에서 수정하지 못하도록(const) 보호합니다. string은 크기가 클 수 있으므로 이 패턴이 권장됩니다.',
  'const 참조의 목적',
  'const T&는 복사 없이 인수를 전달하므로 성능이 좋고, const로 수정을 방지해 안전합니다. 특히 string, vector처럼 크기가 큰 타입을 함수에 전달할 때 표준적인 방식입니다.',
  ARRAY['"const&"', '"복사 방지"', '"read-only 참조"'],
  NULL, NULL,
  'What is the most appropriate reason for using a const reference in the following code?',
  'const string& name passes the string without copying (saving cost) while preventing modification inside the function (const). This pattern is recommended because string can be large.',
  'Purpose of const References',
  'const T& passes the argument without copying for performance, and const prevents modification for safety. It is the standard way to pass large types like string or vector to functions.',
  ARRAY['"To modify name"', '"To avoid copy cost while preventing modification"', '"To initialize name to null"', '"To get the address of name"']
),

-- ============================================================
-- cpp-3 (타입시스템) +10개  [ID 10819~10828]
-- ============================================================

(
  10840, 'cpp', 'cpp-3', '쉬움',
  '다음 중 C++에서 정수형 변수를 선언하는 올바른 방법은?',
  NULL,
  ARRAY['"int x = 5;"', '"integer x = 5;"', '"Int x = 5;"', '"number x = 5;"'],
  0,
  'C++에서 정수형은 int로 선언합니다. integer, Int, number는 유효한 C++ 타입이 아닙니다. C++은 대소문자를 구분하므로 Int도 오류입니다.',
  'C++ 기본 정수형 타입',
  'C++의 기본 타입: int(정수), double(실수), string(문자열), bool(참/거짓), char(문자). 타입 키워드는 소문자입니다.',
  ARRAY['"int"', '"기본 타입"', '"변수 선언"'],
  NULL, NULL,
  'Which of the following is the correct way to declare an integer variable in C++?',
  'In C++, integers are declared with int. integer, Int, and number are not valid C++ types. C++ is case-sensitive, so Int is also an error.',
  'Basic Integer Type in C++',
  'C++ basic types: int (integer), double (floating-point), string (text), bool (true/false), char (character). Type keywords are lowercase.',
  NULL
),

(
  10841, 'cpp', 'cpp-3', '쉬움',
  'const 변수에 대한 설명으로 옳은 것은?',
  'const int MAX = 100;',
  ARRAY['"선언 후 언제든지 값을 변경할 수 있다"', '"선언 시 초기화해야 하며 이후 변경 불가"', '"const는 컴파일러가 무시한다"', '"const 변수는 지역 변수에만 사용 가능"'],
  1,
  'const 변수는 선언 시 반드시 초기화해야 하고, 이후 값을 변경하려 하면 컴파일 오류가 발생합니다. 상수(변하지 않는 값)를 표현할 때 사용합니다.',
  'const 키워드',
  'const는 "상수"를 의미합니다. const int MAX = 100;은 MAX를 100으로 고정합니다. 이후 MAX = 200; 같은 대입은 컴파일 오류입니다.',
  ARRAY['"const"', '"상수"', '"변경 불가"'],
  NULL, NULL,
  'Which statement about const variables is correct?',
  'A const variable must be initialized at declaration and cannot be changed afterward — any attempt to do so causes a compile error. It is used to represent constants (values that do not change).',
  'The const Keyword',
  'const means "constant". const int MAX = 100; fixes MAX at 100. Any subsequent assignment like MAX = 200; is a compile error.',
  ARRAY['"Its value can be changed any time after declaration"', '"Must be initialized at declaration and cannot be changed afterward"', '"The compiler ignores const"', '"const can only be used for local variables"']
),

(
  10842, 'cpp', 'cpp-3', '쉬움',
  '다음 코드에서 auto 키워드가 추론하는 타입은?',
  'auto x = 3.14;',
  ARRAY['"int"', '"float"', '"double"', '"string"'],
  2,
  '3.14는 기본적으로 double 리터럴입니다. C++에서 소수점이 있는 숫자는 double로 추론됩니다. float 리터럴은 3.14f처럼 f 접미사를 붙입니다.',
  'auto 타입 추론',
  'auto는 오른쪽 초기화 값에서 타입을 자동 추론합니다. auto x = 3.14는 double, auto x = 42는 int, auto x = true는 bool로 추론됩니다.',
  ARRAY['"auto"', '"타입 추론"', '"double 리터럴"'],
  NULL, NULL,
  'What type does the auto keyword deduce in the following code?',
  '3.14 is a double literal by default in C++. A floating-point literal without a suffix is double. For float, you write 3.14f.',
  'auto Type Deduction',
  'auto automatically deduces the type from the right-hand side initializer. auto x = 3.14 → double, auto x = 42 → int, auto x = true → bool.',
  ARRAY['"int"', '"float"', '"double"', '"string"']
),

(
  10843, 'cpp', 'cpp-3', '보통',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    double result = a / b;
    cout << result;
    return 0;
}',
  ARRAY['"3.5"', '"3"', '"3.0"', '"4"'],
  2,
  'a와 b가 모두 int이므로 a / b는 정수 나눗셈입니다. 7 / 2 = 3(나머지 버림). 그 결과 3이 double로 변환되어 result = 3.0이 됩니다. 3.5를 원한다면 (double)a / b 또는 7.0 / 2를 사용해야 합니다.',
  '정수 나눗셈과 암묵적 변환',
  'C++에서 int / int는 정수 나눗셈(소수점 버림)입니다. 결과를 double 변수에 저장해도 나눗셈 자체는 이미 정수 연산으로 처리됩니다.',
  ARRAY['"정수 나눗셈"', '"암묵적 변환"', '"7/2=3"'],
  NULL, NULL,
  'What is the output of the following code?',
  'Since both a and b are int, a / b is integer division. 7 / 2 = 3 (remainder discarded). The integer 3 is then converted to double, so result = 3.0. To get 3.5, use (double)a / b or 7.0 / 2.',
  'Integer Division and Implicit Conversion',
  'In C++, int / int is integer division (truncates the decimal). Storing the result in a double variable does not change the fact that the division was already performed as integer arithmetic.',
  NULL
),

(
  10844, 'cpp', 'cpp-3', '보통',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
using namespace std;

int main() {
    double x = 9.7;
    int n = (int)x;
    cout << n;
    return 0;
}',
  ARRAY['"9"', '"10"', '"9.7"', '"컴파일 오류"'],
  0,
  '(int)x는 명시적 캐스팅(C 스타일)입니다. double에서 int로 캐스팅하면 소수점 이하가 잘려나갑니다(버림, 반올림 아님). 9.7 → 9가 됩니다.',
  '명시적 타입 캐스팅 (C 스타일)',
  '(int)x 또는 static_cast<int>(x)로 타입을 명시적으로 변환합니다. double → int 변환 시 소수점 이하는 버림(truncation)처리됩니다.',
  ARRAY['"명시적 캐스팅"', '"(int)"', '"truncation"'],
  NULL, NULL,
  'What is the output of the following code?',
  '(int)x is an explicit C-style cast. Casting from double to int truncates (discards) the fractional part — it does NOT round. 9.7 → 9.',
  'Explicit Type Casting (C-style)',
  '(int)x or static_cast<int>(x) explicitly converts a type. When converting double → int, the fractional part is truncated (not rounded).',
  NULL
),

(
  10845, 'cpp', 'cpp-3', '보통',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
using namespace std;

int main() {
    char c = ''A'';
    cout << c + 1;
    return 0;
}',
  ARRAY['"A1"', '"B"', '"66"', '"컴파일 오류"'],
  2,
  'char c = ''A''의 ASCII 값은 65입니다. c + 1은 char와 int의 산술 연산이므로 결과는 int 66이 됩니다. 문자가 아닌 정수 66이 출력됩니다. ''B''를 출력하려면 (char)(c + 1)로 캐스팅해야 합니다.',
  'char 산술과 암묵적 승격',
  'char는 내부적으로 정수(ASCII 코드)입니다. char에 정수를 더하면 결과는 int로 승격됩니다. ''A'' = 65, ''a'' = 97, ''0'' = 48입니다.',
  ARRAY['"char 산술"', '"ASCII"', '"int 승격"'],
  NULL, NULL,
  'What is the output of the following code?',
  'The ASCII value of ''A'' is 65. c + 1 is arithmetic between char and int, so the result is int 66. The integer 66 is printed, not a character. To print ''B'', cast with (char)(c + 1).',
  'char Arithmetic and Implicit Promotion',
  'char is internally an integer (ASCII code). Adding an integer to a char promotes the result to int. ''A'' = 65, ''a'' = 97, ''0'' = 48.',
  NULL
),

(
  10846, 'cpp', 'cpp-3', '보통',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
using namespace std;

int main() {
    int a = 5;
    double b = 2.0;
    auto result = a + b;
    cout << result;
    return 0;
}',
  ARRAY['"7"', '"7.0"', '"컴파일 오류"', '"2.5"'],
  1,
  'int + double 연산에서 C++는 int를 double로 암묵적으로 승격시킵니다. 5 + 2.0 = 7.0(double). auto는 double로 추론됩니다.',
  'int + double 암묵적 승격',
  '타입이 다른 산술 연산에서 C++는 더 넓은 타입으로 승격합니다. int + double → double. int + int → int. double + double → double.',
  ARRAY['"암묵적 승격"', '"int + double"', '"auto 추론"'],
  NULL, NULL,
  'What is the output of the following code?',
  'In int + double arithmetic, C++ implicitly promotes int to double. 5 + 2.0 = 7.0 (double). auto deduces the type as double.',
  'Implicit Promotion in int + double',
  'In mixed-type arithmetic, C++ promotes to the wider type. int + double → double. int + int → int. double + double → double.',
  NULL
),

(
  10847, 'cpp', 'cpp-3', '어려움',
  '다음 코드에서 오버플로우가 발생하는 이유는?',
  '#include <iostream>
using namespace std;

int main() {
    int x = 2147483647;
    x = x + 1;
    cout << x;
    return 0;
}',
  ARRAY['"int의 최댓값을 초과했기 때문에"', '"x가 음수여야 하기 때문에"', '"+ 연산자가 int에 사용 불가해서"', '"double로 선언해야 해서"'],
  0,
  '2147483647은 int의 최댓값(2^31 - 1)입니다. 여기에 1을 더하면 최댓값을 넘어 오버플로우가 발생하고, 정의되지 않은 동작(undefined behavior)이 됩니다. 실제로는 음수(-2147483648)가 출력될 수 있습니다.',
  '정수 오버플로우',
  'C++의 int는 32비트(-2^31 ~ 2^31-1 = -2147483648 ~ 2147483647)입니다. 최댓값을 초과하면 오버플로우가 발생합니다. 큰 수가 필요하면 long long을 사용하세요.',
  ARRAY['"int 범위"', '"오버플로우"', '"2147483647"'],
  NULL, NULL,
  'Why does overflow occur in the following code?',
  '2147483647 is the maximum value of int (2^31 - 1). Adding 1 exceeds the maximum and causes overflow, resulting in undefined behavior. In practice, a negative number (-2147483648) is often printed.',
  'Integer Overflow',
  'C++ int is 32-bit (-2^31 to 2^31-1, i.e., -2147483648 to 2147483647). Exceeding the maximum causes overflow. Use long long for larger values.',
  ARRAY['"Because the maximum value of int was exceeded"', '"Because x should be negative"', '"Because + cannot be used with int"', '"Because it should be declared as double"']
),

(
  10848, 'cpp', 'cpp-3', '어려움',
  '다음 코드에서 경고(narrowing conversion)가 발생하는 이유는?',
  'double d = 9.99;
int n = d;  // 암묵적 변환',
  ARRAY['"double이 int보다 작아서"', '"double에서 int로 변환 시 소수 부분이 손실되어서"', '"int는 음수를 저장할 수 없어서"', '"d의 값이 너무 커서"'],
  1,
  'd = 9.99에서 int로 암묵적 변환 시 0.99가 버려지고 n = 9가 됩니다. 정보 손실(narrowing)이 발생합니다. 컴파일러가 경고를 발생시킵니다. 명시적으로 하려면 int n = (int)d; 또는 static_cast<int>(d)를 사용합니다.',
  '암묵적 내로잉 변환 (Narrowing Conversion)',
  '더 넓은 타입(double)에서 좁은 타입(int)으로 암묵적 변환 시 데이터 손실이 발생합니다. 이를 narrowing conversion이라 합니다. C++11의 중괄호 초기화 {}는 narrowing을 금지합니다.',
  ARRAY['"narrowing conversion"', '"암묵적 변환"', '"데이터 손실"'],
  NULL, NULL,
  'Why does a narrowing conversion warning occur in the following code?',
  'Converting d = 9.99 to int implicitly drops 0.99, giving n = 9. This is a loss of information (narrowing). The compiler warns about it. For explicit conversion, use int n = (int)d; or static_cast<int>(d).',
  'Implicit Narrowing Conversion',
  'Converting from a wider type (double) to a narrower type (int) implicitly causes data loss — this is called narrowing conversion. C++11 brace-initialization {} prohibits narrowing.',
  ARRAY['"Because double is smaller than int"', '"Because the fractional part is lost when converting double to int"', '"Because int cannot store negative numbers"', '"Because the value of d is too large"']
),

(
  10849, 'cpp', 'cpp-3', '어려움',
  '다음 코드의 출력 결과는?',
  '#include <iostream>
using namespace std;

int main() {
    int a = 1000000, b = 1000000;
    int result = a * b;
    cout << result;
    return 0;
}',
  ARRAY['"1000000000000"', '"1000000"', '"오버플로우로 인한 이상한 값"', '"컴파일 오류"'],
  2,
  '1,000,000 × 1,000,000 = 1,000,000,000,000 (10^12)이지만, int는 최대 약 21억(2^31-1)까지만 저장 가능합니다. int 범위를 초과하므로 오버플로우가 발생해 예상과 다른 값이 출력됩니다. long long을 사용해야 합니다.',
  '곱셈에서의 int 오버플로우',
  '큰 수의 곱셈 결과가 int 범위를 초과하면 오버플로우가 발생합니다. 이 경우 (long long)a * b 또는 변수를 long long으로 선언해야 합니다.',
  ARRAY['"int 오버플로우"', '"long long 필요"', '"10^12 > int 범위"'],
  NULL, NULL,
  'What is the output of the following code?',
  '1,000,000 × 1,000,000 = 1,000,000,000,000 (10^12), but int can only hold up to ~2.1 billion (2^31-1). The result overflows int, producing an unexpected value. Use long long instead.',
  'Integer Overflow in Multiplication',
  'When the result of a multiplication exceeds the int range, overflow occurs. Use (long long)a * b or declare the variables as long long.',
  ARRAY['"1000000000000"', '"1000000"', '"An unexpected value due to overflow"', '"Compile error"']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- English translations already included in INSERT above.
-- If you need to re-apply English-only updates:
-- ============================================================

UPDATE questions SET
  question_en = 'What is ref in the following code?',
  explanation_en = 'int& ref = x declares ref as an alias for x. ref and x point to the same memory location.',
  key_concept_title_en = 'What is a Reference?',
  key_concept_desc_en = 'A C++ reference is an alias for an existing variable. int& ref = x does not copy x — it gives another name to the same memory cell.',
  options_en = ARRAY['"copy of x"', '"alias of x"', '"address of x"', '"new variable"']
WHERE id = 10829;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = 'ref is an alias for x, so ref = 20 changes x''s value to 20. x and ref share the same memory cell, so cout << x prints 20.',
  key_concept_title_en = 'Modifying Value Through a Reference',
  key_concept_desc_en = 'Assigning a value to a reference variable changes the original variable. ref = 20 means "change the value of the variable ref refers to (x) to 20".',
  options_en = NULL
WHERE id = 10830;

UPDATE questions SET
  question_en = 'Which of the following causes a compile error?',
  explanation_en = 'In C++, a reference must be initialized at the point of declaration. Declaring int& r; without initialization is a compile error.',
  key_concept_title_en = 'References Must Be Initialized',
  key_concept_desc_en = 'A reference must be bound to a variable at the time of declaration. Unlike pointers, a reference cannot be initialized later.',
  options_en = NULL
WHERE id = 10831;

UPDATE questions SET
  question_en = 'What is the value of x after r = y?',
  explanation_en = 'r = y does not make r point to y. r is always an alias for x. r = y copies the value of y (which is 2) into r (i.e., into x). So x becomes 2.',
  key_concept_title_en = 'References Cannot Be Rebound',
  key_concept_desc_en = 'Once initialized, a C++ reference cannot be made to refer to a different variable. Writing r = y copies the value of y into the variable r refers to — it does not rebind r.',
  options_en = NULL
WHERE id = 10832;

UPDATE questions SET
  question_en = 'What is the value of a after the function call?',
  explanation_en = 'addTen() takes its argument as int& (reference), so n is an alias for a. n += 10 increments a''s value by 10. After the call, a = 15.',
  key_concept_title_en = 'Reference Parameters (Pass-by-Reference)',
  key_concept_desc_en = 'Declaring a function parameter as int& allows the function to directly modify the caller''s variable. No copy is made, so changes inside the function are reflected in the original.',
  options_en = NULL
WHERE id = 10833;

UPDATE questions SET
  question_en = 'Which function actually changes the value of x in main() after being called?',
  explanation_en = 'Function A takes by value (pass-by-value), so n is a copy and the original x is unaffected. Function B takes by reference (pass-by-reference), so n *= 2 modifies the original x.',
  key_concept_title_en = 'Pass-by-Value vs Pass-by-Reference',
  key_concept_desc_en = 'Pass-by-value: a copy is passed, so the original is unchanged. Pass-by-reference (int&): an alias to the original is passed, so changes inside the function affect the original.',
  options_en = ARRAY['"Function A"', '"Function B"', '"Both change"', '"Neither changes"']
WHERE id = 10834;

UPDATE questions SET
  question_en = 'What are the values of a and b after the swap() call?',
  explanation_en = 'swap() takes a and b by reference. temp = a(3), a = b(7), b = temp(3) — the values are exchanged. Since they are references, the a and b in main() are directly changed. Result: a=7, b=3.',
  key_concept_title_en = 'Swap Function Using References',
  key_concept_desc_en = 'A value-swapping function must use reference parameters to change the original variables. If you pass by value (int a, int b), only copies are swapped and the originals are unchanged.',
  options_en = NULL
WHERE id = 10835;

UPDATE questions SET
  question_en = 'What is the value of v[0] after the function call?',
  explanation_en = 'setFirst() takes v as vector<int>& (reference). v[0] = val changes the first element of the original vector in main() to 99. Output: 99.',
  key_concept_title_en = 'Passing Vectors by Reference',
  key_concept_desc_en = 'Passing a vector by reference lets the function modify the original vector. Passing by value creates a copy, so the original is unchanged.',
  options_en = NULL
WHERE id = 10836;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = 'for (int& x : v) iterates over v''s elements by reference. x *= 2 directly modifies each original element: 10→20, 20→40, 30→60. v[1] = 40 is printed.',
  key_concept_title_en = 'Using References in Range-for Loops',
  key_concept_desc_en = 'for (int x : v) iterates by copy and cannot modify the originals. for (int& x : v) iterates by reference, allowing in-place modification of each element.',
  options_en = NULL
WHERE id = 10837;

UPDATE questions SET
  question_en = 'When the following code compiles and runs without error, what is the output?',
  explanation_en = 'getRef(a) returns a reference to a. getRef(a) = 100 assigns 100 to the returned reference (i.e., to a). Therefore a = 100.',
  key_concept_title_en = 'Functions That Return References',
  key_concept_desc_en = 'When a function returns int&, the call expression can be used as an lvalue (assignment target). getRef(a) = 100 has the same effect as a = 100.',
  options_en = NULL
WHERE id = 10838;

UPDATE questions SET
  question_en = 'What is the most appropriate reason for using a const reference in the following code?',
  explanation_en = 'const string& name passes the string without copying (saving cost) while preventing modification inside the function (const). This pattern is recommended because string can be large.',
  key_concept_title_en = 'Purpose of const References',
  key_concept_desc_en = 'const T& passes the argument without copying for performance, and const prevents modification for safety. It is the standard way to pass large types like string or vector to functions.',
  options_en = ARRAY['"To modify name"', '"To avoid copy cost while preventing modification"', '"To initialize name to null"', '"To get the address of name"']
WHERE id = 10839;

UPDATE questions SET
  question_en = 'Which of the following is the correct way to declare an integer variable in C++?',
  explanation_en = 'In C++, integers are declared with int. integer, Int, and number are not valid C++ types. C++ is case-sensitive, so Int is also an error.',
  key_concept_title_en = 'Basic Integer Type in C++',
  key_concept_desc_en = 'C++ basic types: int (integer), double (floating-point), string (text), bool (true/false), char (character). Type keywords are lowercase.',
  options_en = NULL
WHERE id = 10840;

UPDATE questions SET
  question_en = 'Which statement about const variables is correct?',
  explanation_en = 'A const variable must be initialized at declaration and cannot be changed afterward — any attempt to do so causes a compile error. It is used to represent constants (values that do not change).',
  key_concept_title_en = 'The const Keyword',
  key_concept_desc_en = 'const means "constant". const int MAX = 100; fixes MAX at 100. Any subsequent assignment like MAX = 200; is a compile error.',
  options_en = ARRAY['"Its value can be changed any time after declaration"', '"Must be initialized at declaration and cannot be changed afterward"', '"The compiler ignores const"', '"const can only be used for local variables"']
WHERE id = 10841;

UPDATE questions SET
  question_en = 'What type does the auto keyword deduce in the following code?',
  explanation_en = '3.14 is a double literal by default in C++. A floating-point literal without a suffix is double. For float, you write 3.14f.',
  key_concept_title_en = 'auto Type Deduction',
  key_concept_desc_en = 'auto automatically deduces the type from the right-hand side initializer. auto x = 3.14 → double, auto x = 42 → int, auto x = true → bool.',
  options_en = ARRAY['"int"', '"float"', '"double"', '"string"']
WHERE id = 10842;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = 'Since both a and b are int, a / b is integer division. 7 / 2 = 3 (remainder discarded). The integer 3 is then converted to double, so result = 3.0. To get 3.5, use (double)a / b or 7.0 / 2.',
  key_concept_title_en = 'Integer Division and Implicit Conversion',
  key_concept_desc_en = 'In C++, int / int is integer division (truncates the decimal). Storing the result in a double variable does not change the fact that the division was already performed as integer arithmetic.',
  options_en = NULL
WHERE id = 10843;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = '(int)x is an explicit C-style cast. Casting from double to int truncates (discards) the fractional part — it does NOT round. 9.7 → 9.',
  key_concept_title_en = 'Explicit Type Casting (C-style)',
  key_concept_desc_en = '(int)x or static_cast<int>(x) explicitly converts a type. When converting double → int, the fractional part is truncated (not rounded).',
  options_en = NULL
WHERE id = 10844;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = 'The ASCII value of ''A'' is 65. c + 1 is arithmetic between char and int, so the result is int 66. The integer 66 is printed, not a character. To print ''B'', cast with (char)(c + 1).',
  key_concept_title_en = 'char Arithmetic and Implicit Promotion',
  key_concept_desc_en = 'char is internally an integer (ASCII code). Adding an integer to a char promotes the result to int. ''A'' = 65, ''a'' = 97, ''0'' = 48.',
  options_en = NULL
WHERE id = 10845;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = 'In int + double arithmetic, C++ implicitly promotes int to double. 5 + 2.0 = 7.0 (double). auto deduces the type as double.',
  key_concept_title_en = 'Implicit Promotion in int + double',
  key_concept_desc_en = 'In mixed-type arithmetic, C++ promotes to the wider type. int + double → double. int + int → int. double + double → double.',
  options_en = NULL
WHERE id = 10846;

UPDATE questions SET
  question_en = 'Why does overflow occur in the following code?',
  explanation_en = '2147483647 is the maximum value of int (2^31 - 1). Adding 1 exceeds the maximum and causes overflow, resulting in undefined behavior. In practice, a negative number (-2147483648) is often printed.',
  key_concept_title_en = 'Integer Overflow',
  key_concept_desc_en = 'C++ int is 32-bit (-2^31 to 2^31-1, i.e., -2147483648 to 2147483647). Exceeding the maximum causes overflow. Use long long for larger values.',
  options_en = ARRAY['"Because the maximum value of int was exceeded"', '"Because x should be negative"', '"Because + cannot be used with int"', '"Because it should be declared as double"']
WHERE id = 10847;

UPDATE questions SET
  question_en = 'Why does a narrowing conversion warning occur in the following code?',
  explanation_en = 'Converting d = 9.99 to int implicitly drops 0.99, giving n = 9. This is a loss of information (narrowing). The compiler warns about it. For explicit conversion, use int n = (int)d; or static_cast<int>(d).',
  key_concept_title_en = 'Implicit Narrowing Conversion',
  key_concept_desc_en = 'Converting from a wider type (double) to a narrower type (int) implicitly causes data loss — this is called narrowing conversion. C++11 brace-initialization {} prohibits narrowing.',
  options_en = ARRAY['"Because double is smaller than int"', '"Because the fractional part is lost when converting double to int"', '"Because int cannot store negative numbers"', '"Because the value of d is too large"']
WHERE id = 10848;

UPDATE questions SET
  question_en = 'What is the output of the following code?',
  explanation_en = '1,000,000 × 1,000,000 = 1,000,000,000,000 (10^12), but int can only hold up to ~2.1 billion (2^31-1). The result overflows int, producing an unexpected value. Use long long instead.',
  key_concept_title_en = 'Integer Overflow in Multiplication',
  key_concept_desc_en = 'When the result of a multiplication exceeds the int range, overflow occurs. Use (long long)a * b or declare the variables as long long.',
  options_en = ARRAY['"1000000000000"', '"1000000"', '"An unexpected value due to overflow"', '"Compile error"']
WHERE id = 10849;
