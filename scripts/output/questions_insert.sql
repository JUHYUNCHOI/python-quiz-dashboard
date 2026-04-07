-- ============================================================
-- questions_insert.sql
-- 생성일: 2026-04-05T12:05:16.718Z
-- Python: 532개, C++: 624개
-- 총: 1156개
--
-- 사용법:
--   Supabase 대시보드 → SQL Editor → 이 파일 내용 붙여넣기 → Run
-- ============================================================

INSERT INTO questions (id, language, lesson_id, difficulty, question, code, options, correct_answer, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison)
VALUES
(1, 'python', '3', '쉬움', '다음 중 Python에서 주석을 작성하는 올바른 방법은?', '# 어떤 것이 주석일까요?', ARRAY['"# 주석"', '"// 주석"', '"/* 주석 */"', '"-- 주석"'], 0, 'Python에서 한 줄 주석은 # 기호로 시작합니다.', '주석 (Comment)', '# 뒤의 텍스트는 실행되지 않으며, 코드를 설명하는 데 사용됩니다.', ARRAY['"코드 가독성"', '"문서화"', '"docstring"'], NULL, NULL),
(2, 'python', '2', '쉬움', '다음 코드의 출력 결과는?', 'print(type(3.14))', ARRAY['"<class ''int''>"', '"<class ''float''>"', '"<class ''str''>"', '"<class ''double''>"'], 1, '3.14는 소수점이 있는 숫자이므로 float 타입입니다. Python에는 double 타입이 없습니다.', '데이터 타입', 'Python의 기본 숫자 타입은 int(정수)와 float(실수)입니다. type() 함수로 타입을 확인할 수 있습니다.', ARRAY['"int"', '"float"', '"type() 함수"'], NULL, NULL),
(3, 'python', '32', '보통', '다음 코드의 출력 결과는?', 'x = None
print(x is None)', ARRAY['"True"', '"False"', '"None"', '"오류"'], 0, 'is 연산자는 객체의 동일성을 비교합니다. None과의 비교는 is를 사용하는 것이 관례입니다.', 'None 타입과 is 연산자', 'None은 값이 없음을 나타내는 특별한 객체입니다. None 비교에는 == 대신 is를 사용합니다.', ARRAY['"None"', '"is 연산자"', '"== vs is"'], NULL, '{"wrong":"if x == None:   # 동작하지만 권장하지 않음","correct":"if x is None:   # 파이썬 권장 방식"}'::jsonb),
(4, 'python', '9', '쉬움', '다음 코드의 출력 결과는?', 'x = bool(0)
y = bool("")
z = bool(0.0)
print(x, y, z)', ARRAY['"True True True"', '"False False False"', '"True False False"', '"0 '''' 0.0"'], 1, '0, 빈 문자열, 0.0은 모두 Falsy 값이므로 bool()로 변환하면 False가 됩니다.', 'Truthy와 Falsy 값', '0, 0.0, '''', None 등은 Falsy입니다. 그 외 대부분의 값(비어있지 않은 문자열, 0이 아닌 수)은 Truthy입니다.', ARRAY['"bool 타입"', '"조건문"', '"타입 변환"'], NULL, NULL),
(5, 'python', '2', '쉬움', '다음 코드의 출력 결과는?', 'x = 5
y = 2.0
print(type(x + y))', ARRAY['"<class ''int''>"', '"<class ''float''>"', '"<class ''str''>"', '"오류"'], 1, 'int와 float를 연산하면 결과는 항상 float입니다. Python이 자동으로 더 넓은 타입으로 변환합니다.', '자동 타입 변환 (Type Promotion)', 'int와 float 연산 시 int가 자동으로 float로 변환됩니다. 이를 묵시적 타입 변환이라고 합니다.', ARRAY['"타입 변환"', '"int"', '"float"'], NULL, NULL),
(7, 'python', '9', '보통', '다음 코드의 출력 결과는?', 'a = 0.1 + 0.2
print(a == 0.3)
print(a)', ARRAY['"False\n0.30000000000000004"', '"True\n0.3"', '"False\n0.3"', '"오류"'], 0, '부동소수점 연산의 한계로 0.1+0.2는 정확히 0.3이 아닙니다. print(a)를 하면 실제 저장된 값인 0.30000000000000004가 출력되고, a == 0.3은 False가 됩니다.', '부동소수점 오차', '컴퓨터는 소수를 이진수로 저장하므로 미세한 오차가 발생합니다. 0.1 + 0.2는 0.3처럼 보이지만 실제로는 0.30000000000000004입니다.', ARRAY['"float"', '"부동소수점"', '"=="'], NULL, NULL),
(8, 'python', '9', '보통', '다음 코드의 출력 결과는?', 'print(0.1 + 0.2 == 0.3)', ARRAY['"True"', '"False"', '"0.3"', '"오류"'], 1, '부동소수점 연산의 정밀도 문제로 0.1 + 0.2는 0.30000000000000004가 됩니다. 따라서 0.3과 정확히 같지 않아 False입니다.', '부동소수점 정밀도', '컴퓨터는 실수를 이진수로 표현하므로 0.1 같은 값을 정확히 저장할 수 없습니다. math.isclose()를 사용하면 근사 비교가 가능합니다.', ARRAY['"float"', '"IEEE 754"', '"math.isclose()"'], NULL, NULL),
(10, 'python', '9', '보통', '다음 코드의 출력 결과는?', 'print(bool(""), bool(" "), bool("0"), bool(0))', ARRAY['"False True True False"', '"False False False False"', '"True True True False"', '"False True False False"'], 0, '빈 문자열 ''''만 False이고, 공백 '' ''이나 문자 ''0''은 비어있지 않으므로 True입니다. 숫자 0은 False입니다.', 'Truthy와 Falsy 값', 'Python에서 빈 문자열, 0, None, 빈 컬렉션은 False로 평가됩니다. 문자열 ''0''은 비어있지 않으므로 True입니다.', ARRAY['"bool()"', '"truthy"', '"falsy"', '"조건 평가"'], NULL, NULL),
(13, 'python', '3', '쉬움', '다음 중 Python에서 유효한 변수 이름이 아닌 것은?', '# 변수 이름 규칙을 생각해보세요', ARRAY['"my_var"', '"_count"', '"2nd_place"', '"firstName"'], 2, 'Python 변수 이름은 숫자로 시작할 수 없습니다. 문자 또는 밑줄(_)로 시작해야 합니다.', '변수 이름 규칙', '변수 이름은 문자나 _로 시작해야 하며, 숫자로 시작할 수 없고, 예약어(if, for 등)를 사용할 수 없습니다.', ARRAY['"예약어"', '"네이밍 컨벤션"', '"변수 선언"'], NULL, NULL),
(14, 'python', '3', '쉬움', '다음 코드의 출력 결과는?', 'a, b, c = 1, 2, 3
print(b)', ARRAY['"1"', '"2"', '"3"', '"(1, 2, 3)"'], 1, '여러 변수에 동시에 값을 할당할 수 있습니다. a=1, b=2, c=3이 됩니다.', '다중 할당 (Multiple Assignment)', 'Python에서는 a, b, c = 1, 2, 3처럼 한 줄에 여러 변수에 값을 할당할 수 있습니다. 변수 교환(swap)에도 유용합니다.', ARRAY['"변수 할당"', '"튜플 언패킹"', '"swap"'], NULL, NULL),
(15, 'python', '3', '쉬움', '다음 코드의 출력 결과는?', 'a = b = c = 100
print(a, b, c)', ARRAY['"100 100 100"', '"오류"', '"100"', '"a b c"'], 0, '체인 할당으로 여러 변수에 같은 값을 동시에 할당할 수 있습니다.', '체인 할당', 'a = b = c = 값 형태로 여러 변수에 같은 값을 동시에 할당합니다. 불변 타입에서는 안전하지만, 가변 타입에서는 주의가 필요합니다.', ARRAY['"변수 할당"', '"참조"', '"다중 할당"'], NULL, NULL),
(16, 'python', '3', '쉬움', '다음 코드의 출력 결과는?', 'a, b = 10, 20
a, b = b, a
print(a, b)', ARRAY['"10 20"', '"20 10"', '"오류"', '"20 20"'], 1, 'Python에서는 임시 변수 없이 a, b = b, a로 두 변수의 값을 교환할 수 있습니다.', '변수 값 교환 (Swap)', 'Python의 다중 할당을 이용하면 temp 변수 없이도 두 값을 교환할 수 있습니다.', ARRAY['"다중 할당"', '"튜플 언패킹"', '"변수"'], NULL, '{"wrong":"temp = a\na = b\nb = temp  # 다른 언어 방식","correct":"a, b = b, a  # Python 방식"}'::jsonb),
(17, 'python', '3', '보통', '다음 코드의 출력 결과는?', 'x = 10
y = x
x += 5
print(x, y)', ARRAY['"15 10"', '"15 15"', '"10 10"', '"오류"'], 0, '정수는 불변(immutable) 타입이므로 y = x는 값을 복사합니다. x를 변경해도 y에 영향이 없습니다.', '불변 타입과 변수 할당', 'int, str, tuple 같은 불변 타입은 변수 할당 시 값이 독립적으로 동작합니다. 리스트 같은 가변 타입과 다릅니다.', ARRAY['"mutable vs immutable"', '"참조"', '"id()"'], NULL, NULL),
(18, 'python', '33', '어려움', '다음 코드의 출력 결과는?', 'a, *b, c = [1, 2, 3, 4, 5]
print(b)', ARRAY['"[2, 3, 4]"', '"[1, 2, 3]"', '"[3, 4, 5]"', '"오류"'], 0, '*b는 처음(a=1)과 마지막(c=5)을 제외한 나머지를 리스트로 받습니다.', '확장 언패킹 (Extended Unpacking)', '*변수는 나머지 요소들을 리스트로 모읍니다. 위치에 따라 앞, 중간, 뒤 요소를 유연하게 분리할 수 있습니다.', ARRAY['"언패킹"', '"다중 할당"', '"리스트"'], NULL, NULL),
(19, 'python', '4', '쉬움', '다음 코드의 출력 결과는 무엇인가요?', 'x = 5
y = 3
print(x + y)', ARRAY['"5"', '"8"', '"53"', '"오류"'], 1, '문자열이 아닌 숫자를 더하면 산술 연산이 수행됩니다.', '산술 연산자', 'Python에서 + 연산자는 숫자 타입에서는 덧셈을, 문자열에서는 연결을 수행합니다.', ARRAY['"문자열 연결"', '"타입 변환"', '"연산자 우선순위"'], NULL, NULL),
(20, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'print(10 // 3)', ARRAY['"3.33"', '"3"', '"3.0"', '"4"'], 1, '// 연산자는 정수 나눗셈(몫)을 수행합니다. 10 나누기 3의 몫은 3입니다.', '정수 나눗셈 연산자 (//)', '/ 는 일반 나눗셈(float 반환), //는 정수 나눗셈(소수점 버림), %는 나머지를 반환합니다.', ARRAY['"나눗셈"', '"나머지 연산자"', '"연산자"'], NULL, '{"wrong":"10 / 3   # 3.3333... (float)","correct":"10 // 3  # 3 (정수 몫)"}'::jsonb),
(21, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'print(2 ** 3)', ARRAY['"6"', '"8"', '"5"', '"오류"'], 1, '** 연산자는 거듭제곱을 계산합니다. 2 ** 3은 2의 3제곱 = 8입니다.', '거듭제곱 연산자 (**)', '** 는 Python의 거듭제곱 연산자입니다. x ** y는 x의 y제곱을 의미합니다.', ARRAY['"산술 연산자"', '"math 모듈"', '"연산자 우선순위"'], NULL, NULL),
(22, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'print(2 + 3 * 4)', ARRAY['"20"', '"14"', '"24"', '"오류"'], 1, '곱셈(*)이 덧셈(+)보다 우선순위가 높으므로 3*4=12가 먼저 계산되고, 2+12=14가 됩니다.', '연산자 우선순위', 'Python 연산자 우선순위: ** > *, /, //, % > +, - 순입니다. 괄호()를 사용하면 우선순위를 변경할 수 있습니다.', ARRAY['"산술 연산자"', '"괄호"', '"표현식"'], NULL, '{"wrong":"2 + 3 * 4   # 14 (곱셈 우선)","correct":"(2 + 3) * 4  # 20 (괄호 우선)"}'::jsonb),
(23, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'print(type(3 / 2))
print(type(3 // 2))', ARRAY['"<class ''float''>\n<class ''int''>"', '"<class ''int''>\n<class ''int''>"', '"<class ''float''>\n<class ''float''>"', '"오류"'], 0, '/ 연산자는 항상 float를 반환하고, // 연산자는 정수 나눗셈으로 int를 반환합니다.', '나눗셈 연산자의 반환 타입', 'Python 3에서 /는 항상 float를 반환합니다. 정수 결과가 필요하면 //를 사용하세요.', ARRAY['"/와 //의 차이"', '"타입 변환"', '"연산자"'], NULL, NULL),
(24, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'x = 10
y = 3
print(x // y, x % y)', ARRAY['"3 1"', '"3.33 1"', '"3 0"', '"4 1"'], 0, '// 는 정수 나눗셈(몫)을 반환하고, % 는 나머지를 반환합니다. 10 // 3 = 3, 10 % 3 = 1입니다.', '정수 나눗셈과 나머지 연산자', '// 는 소수점 이하를 버린 몫을, % 는 나머지를 반환합니다.', ARRAY['"산술 연산자"', '"divmod()"', '"타입 변환"'], NULL, NULL),
(25, 'python', '5', '쉬움', '다음 코드의 출력 결과는?', 'print("3" + "5")', ARRAY['"8"', '"35"', '"오류"', '"3 5"'], 1, '문자열끼리 + 연산을 하면 연결(concatenation)이 됩니다. ''3''과 ''5''는 문자열이므로 ''35''가 됩니다.', '문자열 연결', '문자열에 + 를 사용하면 두 문자열이 연결됩니다. 숫자 계산을 원한다면 숫자형 변수를 사용해야 합니다.', ARRAY['"문자열 연결"', '"문자열 연산"'], NULL, NULL),
(26, 'python', '5', '쉬움', '다음 코드의 출력 결과는?', 'print("Ha" * 3)', ARRAY['"Ha3"', '"HaHaHa"', '"Ha Ha Ha"', '"오류"'], 1, '문자열에 * 연산자를 사용하면 해당 횟수만큼 반복됩니다.', '문자열 반복 연산자 (*)', '문자열 * 정수는 문자열을 지정 횟수만큼 반복합니다. 리스트에도 동일하게 적용됩니다.', ARRAY['"문자열 연산"', '"리스트 반복"', '"연산자 오버로딩"'], NULL, NULL),
(27, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'name = "Python"
print(len(name))', ARRAY['"5"', '"6"', '"7"', '"오류"'], 1, 'len() 함수는 문자열의 길이(문자 수)를 반환합니다. ''Python''은 6글자입니다.', 'len() 함수', 'len()은 문자열, 리스트, 튜플 등 시퀀스의 길이를 반환하는 내장 함수입니다.', ARRAY['"문자열 메서드"', '"내장 함수"', '"시퀀스"'], NULL, NULL),
(28, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "hello"
print(text.upper())', ARRAY['"hello"', '"HELLO"', '"Hello"', '"오류"'], 1, 'upper() 메서드는 문자열의 모든 문자를 대문자로 변환한 새 문자열을 반환합니다.', '문자열 메서드 - upper()', 'upper()는 대문자로, lower()는 소문자로, capitalize()는 첫 글자만 대문자로 변환합니다. 원본 문자열은 변경되지 않습니다.', ARRAY['"lower()"', '"capitalize()"', '"문자열 불변성"'], NULL, NULL),
(29, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'x = "hello"
print(x.replace("l", "r"))', ARRAY['"herro"', '"hello"', '"hero"', '"오류"'], 0, 'replace()는 모든 일치하는 부분을 교체합니다. ''l''이 두 개 있으므로 둘 다 ''r''로 바뀌어 ''herro''가 됩니다.', '문자열 replace() 메서드', 'replace(old, new)는 문자열에서 old를 모두 new로 교체한 새 문자열을 반환합니다. 세 번째 인자로 교체 횟수를 제한할 수 있습니다.', ARRAY['"문자열 메서드"', '"문자열 불변성"', '"replace 횟수 제한"'], NULL, NULL),
(30, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "  Python  "
print(text.strip())', ARRAY['"  Python  "', '"Python  "', '"  Python"', '"Python"'], 3, 'strip()은 문자열 양쪽 끝의 공백(whitespace)을 제거합니다.', 'strip(), lstrip(), rstrip()', 'strip()은 양쪽, lstrip()은 왼쪽, rstrip()은 오른쪽 공백을 제거합니다. 인자를 넣으면 특정 문자를 제거할 수도 있습니다.', ARRAY['"문자열 정리"', '"입력 처리"', '"공백 제거"'], NULL, NULL),
(31, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "Hello World"
print(text.startswith("Hello"))', ARRAY['"True"', '"False"', '"Hello"', '"오류"'], 0, 'startswith()는 문자열이 지정된 접두사로 시작하면 True를 반환합니다.', 'startswith()와 endswith()', 'startswith()는 문자열이 특정 접두사로 시작하는지, endswith()는 특정 접미사로 끝나는지 확인합니다.', ARRAY['"문자열 검사"', '"조건문 활용"', '"endswith()"'], NULL, NULL),
(32, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "banana"
print(text.count("a"))', ARRAY['"1"', '"2"', '"3"', '"오류"'], 2, 'count()는 문자열에서 특정 부분 문자열이 몇 번 나타나는지 셉니다. ''banana''에 ''a''는 3번 있습니다.', '문자열 count() 메서드', 'count(sub)는 부분 문자열 sub가 몇 번 등장하는지 세어 정수를 반환합니다.', ARRAY['"문자열 검색"', '"find()"', '"index()"'], NULL, NULL),
(33, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "12345"
print(text.isdigit())', ARRAY['"True"', '"False"', '"12345"', '"오류"'], 0, 'isdigit()은 문자열이 모두 숫자로만 구성되어 있으면 True를 반환합니다.', '문자열 검사 메서드', 'isdigit()은 숫자만, isalpha()는 문자만, isalnum()은 문자+숫자만으로 구성되었는지 확인합니다.', ARRAY['"isalpha()"', '"isalnum()"', '"입력 검증"'], NULL, NULL),
(34, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "Python Programming"
print(text.endswith("ing"))', ARRAY['"True"', '"False"', '"ing"', '"오류"'], 0, 'endswith()는 문자열이 지정된 접미사로 끝나면 True를 반환합니다. ''Programming''은 ''ing''로 끝납니다.', 'endswith() 메서드', 'endswith(suffix)는 문자열이 특정 접미사로 끝나는지 확인합니다. 튜플을 인자로 전달하면 여러 접미사를 동시에 확인할 수 있습니다.', ARRAY['"startswith()"', '"문자열 검사"', '"파일 확장자 검사"'], NULL, NULL),
(36, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'print(''python''.capitalize())
print(''PYTHON''.lower())', ARRAY['"Python\npython"', '"python\npython"', '"Python\nPYTHON"', '"PYTHON\npython"'], 0, 'capitalize()는 첫 글자만 대문자로, lower()는 모든 글자를 소문자로 변환합니다.', '문자열 메서드', 'capitalize()는 첫 글자를 대문자로, lower()는 전부 소문자로, upper()는 전부 대문자로 변환합니다.', ARRAY['"upper()"', '"title()"', '"swapcase()"'], NULL, NULL),
(37, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'x = "12.5"
print(x.isdigit())', ARRAY['"True"', '"False"', '"12.5"', '"오류"'], 1, 'isdigit()은 모든 문자가 숫자여야 True를 반환합니다. 소수점(.)이 포함되어 있으므로 False입니다.', 'isdigit()의 한계', 'isdigit()은 순수 정수 문자열만 True입니다. 음수(-), 소수점(.), 공백 등이 있으면 False를 반환합니다.', ARRAY['"문자열 검사"', '"isnumeric()"', '"타입 변환"'], NULL, '{"wrong":"\"12.5\".isdigit()  # False (소수점 포함)","correct":"\"12345\".isdigit()  # True (숫자만)"}'::jsonb),
(38, 'python', '6', '쉬움', '다음 코드의 출력 결과는?', 'text = "hello world"
print(text.find("world"))', ARRAY['"True"', '"5"', '"6"', '"-1"'], 2, 'find()는 부분 문자열이 시작되는 인덱스를 반환합니다. ''world''는 인덱스 6에서 시작합니다.', '문자열 find() 메서드', 'find(sub)는 부분 문자열의 첫 번째 인덱스를 반환합니다. 찾지 못하면 -1을 반환합니다. index()는 찾지 못하면 오류를 발생시킵니다.', ARRAY['"index()"', '"문자열 검색"', '"in 연산자"'], NULL, '{"wrong":"text.index(\"xyz\")  # ValueError 발생!","correct":"text.find(\"xyz\")   # -1 반환 (안전)"}'::jsonb),
(39, 'python', '6', '보통', '다음 코드의 출력 결과는?', 'text = "hello world hello python"
print(text.count("hello"))', ARRAY['"1"', '"2"', '"3"', '"오류"'], 1, 'count()는 부분 문자열의 등장 횟수를 셉니다. ''hello''는 2번 나타납니다.', '문자열에서 패턴 세기', 'count(sub, start, end)로 특정 범위 내에서 부분 문자열의 등장 횟수를 셀 수 있습니다.', ARRAY['"count()"', '"find()"', '"문자열 검색"'], NULL, NULL),
(40, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print("Hello", "World")', ARRAY['"HelloWorld"', '"Hello World"', '"Hello, World"', '"오류"'], 1, 'print()에 여러 값을 전달하면 기본적으로 공백으로 구분하여 출력합니다.', 'print() 함수의 sep 매개변수', 'print()는 여러 인자를 받을 수 있으며, 기본 구분자(sep)는 공백입니다. sep를 변경하면 다른 구분자를 쓸 수 있습니다.', ARRAY['"print 옵션"', '"sep 매개변수"', '"end 매개변수"'], NULL, NULL),
(41, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print("A", "B", "C", sep="-")', ARRAY['"A B C"', '"A-B-C"', '"A, B, C"', '"ABC"'], 1, 'sep 매개변수는 print()에서 값들 사이의 구분자를 지정합니다.', 'print()의 sep과 end', 'sep은 값 사이 구분자(기본: 공백), end는 출력 끝 문자(기본: 줄바꿈)를 설정합니다.', ARRAY['"print 옵션"', '"문자열 출력"', '"end 매개변수"'], NULL, NULL),
(43, 'python', '8', '쉬움', '다음 코드의 출력 결과는?', 'name = "철수"
age = 15
print(f"{name}는 {age}살입니다")', ARRAY['"name는 age살입니다"', '"철수는 15살입니다"', '"{name}는 {age}살입니다"', '"오류"'], 1, 'f-string은 중괄호 안의 변수를 실제 값으로 치환합니다.', 'f-string (포맷 문자열)', 'f''...''는 문자열 안에 {변수명}을 넣어 값을 삽입할 수 있는 편리한 문법입니다. Python 3.6부터 사용 가능합니다.', ARRAY['"문자열 포맷팅"', '".format()"', '"% 포맷팅"'], NULL, NULL),
(44, 'python', '8', '보통', '다음 코드의 출력 결과는?', 'price = 1234.5
print(f"{price:,.1f}원")', ARRAY['"1234.5원"', '"1,234.5원"', '"1234.50원"', '"오류"'], 1, 'f-string에서 :,.1f는 천 단위 쉼표와 소수점 1자리 포맷을 지정합니다.', 'f-string 포맷 지정자', 'f-string에서 {변수:포맷} 형태로 출력 형식을 지정할 수 있습니다. ,는 천 단위 구분, .nf는 소수점 n자리를 의미합니다.', ARRAY['"f-string"', '"숫자 포맷팅"', '"문자열 포맷"'], NULL, NULL),
(45, 'python', '8', '보통', '다음 코드의 출력 결과는?', 'print(f"{42:05d}")', ARRAY['"42"', '"00042"', '"42.00"', '"오류"'], 1, ':05d는 5자리 정수로 왼쪽을 0으로 채우는 포맷입니다.', 'f-string 제로 패딩', '{변수:0Nd}는 N자리 정수로 표현하며 빈 자리를 0으로 채웁니다. 학번, 주문번호 등에 유용합니다.', ARRAY['"f-string"', '"숫자 포맷팅"', '"zfill()"'], NULL, NULL),
(46, 'python', '8', '보통', '다음 코드의 출력 결과는?', 'print(f"{''Python'':>10}")', ARRAY['"    Python"', '"Python    "', '"  Python  "', '"오류"'], 0, 'f-string에서 :>10은 총 10자리에서 오른쪽 정렬을 의미합니다. ''Python''은 6글자이므로 왼쪽에 공백 4개가 붙습니다.', 'f-string 정렬 포맷', ':>는 오른쪽 정렬, :<는 왼쪽 정렬, :^는 가운데 정렬입니다. 숫자는 전체 너비를 지정합니다.', ARRAY['"f-string"', '"문자열 포맷팅"', '"정렬"'], NULL, NULL),
(47, 'python', '8', '쉬움', '다음 중 f-string의 올바른 사용법은?', '# f-string 문법 비교', ARRAY['"f\"이름: {name}, 나이: {age}\""', '"\"이름: {name}, 나이: {age}\".format()"', '"f\"이름: ${name}, 나이: ${age}\""', '"f\"이름: [name], 나이: [age]\""'], 0, 'f-string은 문자열 앞에 f를 붙이고 중괄호 {} 안에 변수명을 넣어 사용합니다.', 'f-string 포매팅', 'f-string은 f''...''으로 시작하며, {} 안에 표현식을 직접 삽입할 수 있는 편리한 포매팅 방법입니다.', ARRAY['"문자열 포매팅"', '"format()"', '"% 포매팅"'], NULL, NULL),
(48, 'python', '8', '보통', '다음 코드에서 빈칸에 들어갈 알맞은 코드는?', 'x = 10
y = 3
# 결과: ''10을 3으로 나누면 3.33입니다''
print(f"____")', ARRAY['"f\"{x}을 {y}으로 나누면 {x/y:.2f}입니다\""', '"f\"{x}을 {y}으로 나누면 {x//y:.2f}입니다\""', '"f\"{x}을 {y}으로 나누면 {x/y}입니다\""', '"f\"{x}을 {y}으로 나누면 {round(x/y)}입니다\""'], 0, 'f-string에서 :.2f는 소수점 둘째 자리까지 표시합니다. x/y = 3.333...이고 :.2f로 3.33이 됩니다.', 'f-string 포맷 지정', 'f-string에서 콜론(:) 뒤에 포맷을 지정할 수 있습니다. .2f는 소수점 2자리 고정소수점, d는 정수, s는 문자열입니다.', ARRAY['"f-string"', '"format()"', '"포맷 지정자"'], NULL, NULL),
(49, 'python', '9', '쉬움', '다음 코드의 출력 결과는?', 'x = int("42")
print(x + 8)', ARRAY['"428"', '"50"', '"오류"', '"42 8"'], 1, 'int(''42'')는 문자열 ''42''를 정수 42로 변환합니다. 42 + 8 = 50입니다.', '타입 변환 (Type Casting)', 'int()는 문자열을 정수로, float()는 실수로, str()은 숫자를 문자열로 변환합니다.', ARRAY['"int()"', '"float()"', '"str()"', '"input()과 타입 변환"'], NULL, NULL),
(50, 'python', '9', '쉬움', '다음 코드에서 빈칸에 들어갈 알맞은 것은?', 'result = _____("123")
print(result + 1)  # 124', ARRAY['"int"', '"str"', '"float"', '"bool"'], 0, '문자열 ''123''을 정수로 변환하려면 int() 함수를 사용합니다. int(''123'') + 1 = 124입니다.', '타입 변환 (Type Casting)', 'int(), float(), str() 등으로 데이터 타입을 변환할 수 있습니다.', ARRAY['"자료형"', '"타입 변환"', '"내장 함수"'], NULL, NULL),
(51, 'python', '10', '쉬움', 'input() 함수가 반환하는 값의 타입은?', 'x = input("숫자를 입력하세요: ")
# 사용자가 42를 입력했을 때', ARRAY['"int"', '"float"', '"str"', '"입력 값에 따라 다름"'], 2, 'input()은 사용자가 무엇을 입력하든 항상 문자열(str)을 반환합니다.', 'input() 함수', 'input()은 항상 문자열을 반환합니다. 숫자로 사용하려면 int() 또는 float()로 변환해야 합니다.', ARRAY['"타입 변환"', '"사용자 입력"', '"str"'], NULL, '{"wrong":"x = input(\"숫자: \")\nprint(x + 1)  # 오류! str + int 불가","correct":"x = int(input(\"숫자: \"))\nprint(x + 1)  # 정상 작동"}'::jsonb),
(52, 'python', '11', '쉬움', '다음 코드의 출력 결과는?', 'x = 7
if x > 10:
    print("크다")
elif x > 5:
    print("중간")
else:
    print("작다")', ARRAY['"크다"', '"중간"', '"작다"', '"오류"'], 1, 'x는 7이므로 x > 10은 거짓, x > 5는 참이므로 ''중간''이 출력됩니다.', 'if-elif-else 조건문', '조건문은 위에서부터 순서대로 검사하며, 처음으로 참인 조건의 블록만 실행됩니다.', ARRAY['"조건문"', '"비교 연산자"', '"들여쓰기"'], 'pyIfBuilder', NULL),
(53, 'python', '11', '쉬움', '다음 코드에서 버그를 찾으세요.', 'n = 4
if n % 2 = 0:
    print("짝수")', ARRAY['"비교 연산자가 잘못됨 (= 대신 == 사용해야 함)"', '"return 위치가 잘못됨"', '"함수 이름이 잘못됨"', '"% 연산자가 잘못됨"'], 0, '조건문에서 비교는 == (등호 두 개)를 사용해야 합니다. = 는 대입 연산자입니다.', '= vs ==', '= 는 대입, == 는 비교 연산자입니다. 조건문에서 = 를 쓰면 SyntaxError가 발생합니다.', ARRAY['"대입 연산자"', '"비교 연산자"', '"SyntaxError"'], 'pyIfBuilder', NULL),
(54, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'x = 7
result = "짝수" if x % 2 == 0 else "홀수"
print(result)', ARRAY['"짝수"', '"홀수"', '"7"', '"오류"'], 1, '삼항 연산자(조건부 표현식)입니다. 7 % 2 == 0은 거짓이므로 else 뒤의 ''홀수''가 선택됩니다.', '삼항 연산자 (조건부 표현식)', '값1 if 조건 else 값2 형태로, 조건이 참이면 값1, 거짓이면 값2를 반환합니다.', ARRAY['"조건문"', '"한 줄 if"', '"표현식"'], NULL, '{"wrong":"if x % 2 == 0:\n    result = \"짝수\"\nelse:\n    result = \"홀수\"","correct":"result = \"짝수\" if x % 2 == 0 else \"홀수\""}'::jsonb),
(55, 'python', '12', '보통', '빈칸에 들어갈 코드로 올바른 것은?', 'score = 85
grade = "A" if score >= 90 ____ "B" if score >= 80 ____ "C"
print(grade)  # B', ARRAY['"else, else"', '"elif, elif"', '"or, or"', '"then, then"'], 0, '삼항 연산자를 중첩할 때는 else를 사용합니다. ''A'' if 조건 else ''B'' if 조건 else ''C'' 형태입니다.', '중첩 삼항 연산자', '삼항 연산자는 ''값1 if 조건 else 값2'' 형태이며, else 뒤에 다시 삼항 연산자를 넣어 중첩할 수 있습니다.', ARRAY['"삼항 연산자"', '"조건 표현식"', '"if-else"'], NULL, NULL),
(56, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'x = 10
result = ''양수'' if x > 0 else ''음수'' if x < 0 else ''영''
print(result)', ARRAY['"양수"', '"음수"', '"영"', '"오류"'], 0, '삼항 연산자가 체이닝되어 있습니다. x > 0이 True이므로 ''양수''가 결과입니다.', '삼항 연산자 체이닝', '조건부 표현식을 연결하여 if-elif-else와 같은 효과를 낼 수 있습니다.', ARRAY['"조건문"', '"삼항 연산자"', '"코드 가독성"'], NULL, NULL),
(58, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'x = 5
if x > 3 and x < 10:
    print("범위 안")
else:
    print("범위 밖")', ARRAY['"범위 안"', '"범위 밖"', '"True"', '"오류"'], 0, 'and 연산자는 양쪽 조건이 모두 참일 때 참입니다. 5 > 3이고 5 < 10이므로 ''범위 안''이 출력됩니다.', '논리 연산자 (and, or, not)', 'and는 둘 다 참일 때, or는 하나라도 참일 때, not은 조건을 반대로 바꿉니다.', ARRAY['"조건문"', '"비교 연산자"', '"bool 타입"'], 'pyIfBuilder', NULL),
(59, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'x = 5
if x > 3:
    if x > 10:
        print("매우 큼")
    else:
        print("약간 큼")
else:
    print("작음")', ARRAY['"매우 큼"', '"약간 큼"', '"작음"', '"오류"'], 1, 'x=5이므로 x>3은 참이지만, 내부의 x>10은 거짓이므로 내부 else의 ''약간 큼''이 출력됩니다.', '중첩 if 문', 'if 문 안에 또 다른 if 문을 넣을 수 있습니다. 들여쓰기로 어떤 if에 속하는 else인지 구분합니다.', ARRAY['"조건문"', '"들여쓰기"', '"elif"'], 'pyIfBuilder', NULL),
(60, 'python', '14', '쉬움', '다음 코드에서 break의 역할은?', 'for i in range(10):
    if i == 5:
        break
    print(i, end=" ")', ARRAY['"0 1 2 3 4 5"', '"0 1 2 3 4"', '"5 6 7 8 9"', '"0 1 2 3 4 6 7 8 9"'], 1, 'i가 5일 때 break로 반복문을 즉시 종료합니다. 따라서 0부터 4까지만 출력됩니다.', 'break 문', 'break는 가장 가까운 반복문을 즉시 종료합니다. continue는 현재 반복만 건너뛰고 다음 반복을 진행합니다.', ARRAY['"continue"', '"for 루프"', '"while 루프"'], 'pyForBuilder', NULL),
(61, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(5):
    if i == 3:
        continue
    print(i, end=" ")', ARRAY['"0 1 2 4"', '"0 1 2 3"', '"0 1 2"', '"1 2 4"'], 0, 'continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. i=3일 때 print를 건너뛰므로 3이 출력되지 않습니다.', 'continue 문', 'continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복을 시작합니다. break와 달리 반복문을 종료하지 않습니다.', ARRAY['"break"', '"반복문 제어"', '"for 루프"'], 'pyForBuilder', NULL),
(63, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(5):
    if i % 2 == 0:
        continue
    print(i, end='' '')', ARRAY['"1 3"', '"0 2 4"', '"0 1 2 3 4"', '"2 4"'], 0, 'continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. i가 짝수(0, 2, 4)일 때 건너뛰므로 홀수(1, 3)만 출력됩니다.', 'continue 문', 'continue는 현재 반복의 나머지 부분을 건너뛰고 다음 반복을 시작합니다.', ARRAY['"break"', '"for 문"', '"조건문"'], NULL, NULL),
(64, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(1, 4):
    for j in range(1, 4):
        if i * j > 4:
            break
    else:
        print(i, end=" ")', ARRAY['"1 2"', '"1 2 3"', '"1"', '"3"'], 2, 'for-else에서 else는 break 없이 내부 루프가 끝났을 때 실행됩니다. i=1일 때 모든 i*j가 최대 1×3=3≤4라서 break 없이 완료 → else 실행. i=2일 때 j=3에서 2×3=6>4로 break 발생 → else 미실행. i=3일 때 j=2에서 3×2=6>4로 break 발생 → else 미실행. 따라서 ''1''만 출력됩니다.', 'for-else와 break의 관계', 'for-else에서 else는 ''루프가 break 없이 끝났을 때'' 실행됩니다. break가 발생하면 else를 건너뜁니다.', ARRAY['"for-else"', '"break"', '"중첩 반복문"'], NULL, NULL),
(65, 'python', '13', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(3):
    print(i, end=" ")', ARRAY['"1 2 3"', '"0 1 2"', '"0 1 2 3"', '"1 2"'], 1, 'range(3)은 0, 1, 2를 생성합니다. range는 0부터 시작하고, 끝 값은 포함하지 않습니다.', 'range() 함수', 'range(n)은 0부터 n-1까지의 정수를 생성합니다. end='' ''는 print의 줄바꿈을 공백으로 바꿉니다.', ARRAY['"for 반복문"', '"range 매개변수"', '"print 옵션"'], NULL, NULL),
(66, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(5):
    if i == 3:
        break
else:
    print("완료")
print("끝")', ARRAY['"완료\n끝"', '"끝"', '"완료"', '"오류"'], 1, 'for-else에서 break로 반복이 종료되면 else 블록은 실행되지 않습니다. break가 발생했으므로 ''끝''만 출력됩니다.', 'for-else 구문', 'for-else에서 else 블록은 반복이 break 없이 정상 완료된 경우에만 실행됩니다.', ARRAY['"for 루프"', '"break"', '"while-else"'], NULL, '{"wrong":"for i in range(5):\n    if i == 3:\n        break\nelse:\n    print(\"완료\")  # break로 종료 → 실행 안 됨","correct":"for i in range(5):\n    pass\nelse:\n    print(\"완료\")  # 정상 완료 → 실행됨"}'::jsonb),
(67, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'for i, v in enumerate(["a", "b", "c"]):
    print(f"{i}:{v}", end=" ")', ARRAY['"0:a 1:b 2:c"', '"a:0 b:1 c:2"', '"1:a 2:b 3:c"', '"a b c"'], 0, 'enumerate()는 인덱스와 값을 함께 반환합니다. 기본적으로 인덱스는 0부터 시작합니다.', 'enumerate() 함수', 'enumerate(iterable, start=0)는 (인덱스, 값) 쌍을 반환합니다. start로 시작 인덱스를 변경할 수 있습니다.', ARRAY['"for 루프"', '"인덱스"', '"zip()"'], NULL, NULL),
(68, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'names = ["철수", "영희"]
scores = [90, 85]
for name, score in zip(names, scores):
    print(f"{name}:{score}", end=" ")', ARRAY['"철수:90 영희:85"', '"철수 영희 90 85"', '"(철수, 90) (영희, 85)"', '"오류"'], 0, 'zip()은 여러 이터러블을 병렬로 묶어 튜플 쌍을 반환합니다.', 'zip() 함수', 'zip()은 여러 이터러블의 같은 인덱스 요소를 튜플로 묶습니다. 길이가 다르면 짧은 쪽에 맞춰집니다.', ARRAY['"enumerate()"', '"병렬 반복"', '"튜플 언패킹"'], NULL, NULL),
(69, 'python', '13', '보통', '다음 코드의 출력 결과는?', 'for i in range(1, 4):
    for j in range(1, 4):
        if i == j:
            print(i * j, end=" ")', ARRAY['"1 2 3 4 5 6 7 8 9"', '"1 4 9"', '"1 2 3"', '"1 1 1"'], 1, 'i==j인 경우만 출력합니다. (1,1)→1, (2,2)→4, (3,3)→9가 출력됩니다.', '중첩 반복문', '반복문 안에 반복문을 넣을 수 있습니다. 외부 반복 1회당 내부 반복이 전체 수행됩니다.', ARRAY['"이중 for"', '"구구단"', '"2D 배열 순회"'], NULL, NULL),
(70, 'python', '13', '보통', '다음 코드의 출력 결과는?', 'result = ""
for i in range(1, 4):
    result += "*" * i + "\n"
print(result)', ARRAY['"***"', '"*\n**\n***\n"', '"* ** ***"', '"123"'], 1, '각 반복에서 ''*''을 i번 반복하고 줄바꿈을 추가합니다. 1줄에 *, 2줄에 **, 3줄에 ***가 됩니다.', '별 찍기 패턴', '문자열 반복(*)과 반복문을 조합하면 다양한 패턴을 만들 수 있습니다. 피라미드, 역삼각형 등이 대표적입니다.', ARRAY['"문자열 반복"', '"중첩 반복문"', '"패턴 출력"'], NULL, NULL),
(71, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(1, 6):
    if i % 2 == 0:
        continue
    print(i, end=" ")', ARRAY['"1 2 3 4 5"', '"2 4"', '"1 3 5"', '"1 3"'], 2, 'continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. 짝수일 때 건너뛰므로 홀수만 출력됩니다.', 'continue 문', 'continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복을 시작합니다. break와 달리 반복문을 종료하지 않습니다.', ARRAY['"break"', '"for 루프"', '"필터링"'], NULL, '{"wrong":"if i % 2 == 0:\n    break      # 반복문 완전 종료","correct":"if i % 2 == 0:\n    continue   # 현재 반복만 건너뜀"}'::jsonb),
(72, 'python', '13', '보통', '다음 구구단 코드에서 빈칸에 들어갈 것은?', 'for i in range(2, 10):
    for j in range(1, 10):
        print(f"{i} x {j} = {___}", end="  ")
    print()', ARRAY['"i + j"', '"i * j"', '"i ** j"', '"i / j"'], 1, '구구단은 두 수의 곱입니다. i * j가 올바른 연산입니다.', '구구단과 중첩 반복문', '2중 for 문으로 구구단을 구현합니다. 외부 반복은 단(2~9), 내부 반복은 곱할 수(1~9)입니다.', ARRAY['"중첩 반복문"', '"f-string"', '"패턴 출력"'], NULL, NULL),
(73, 'python', '19', '보통', '다음 코드의 출력 결과는?', 'result = []
for i in range(3):
    for j in range(3):
        if i != j:
            result.append((i, j))
print(len(result))', ARRAY['"3"', '"6"', '"9"', '"오류"'], 1, '3x3=9쌍 중 i==j인 3쌍을 제외하면 6쌍이 남습니다: (0,1),(0,2),(1,0),(1,2),(2,0),(2,1).', '중첩 반복문과 조건 필터링', '중첩 반복문에서 조건을 추가하여 원하는 조합만 선택할 수 있습니다.', ARRAY['"중첩 반복문"', '"조합"', '"리스트 컴프리헨션"'], NULL, NULL),
(74, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(3):
    for j in range(3):
        if j == 1:
            break
    print(i, end='' '')', ARRAY['"0 1 2"', '"0"', '"0 0 0"', '"아무것도 출력되지 않음"'], 0, 'break는 가장 안쪽 반복문(for j)만 종료합니다. 바깥 반복문(for i)은 계속 실행되므로 0, 1, 2가 모두 출력됩니다.', '중첩 반복문과 break', 'break는 자신을 직접 감싸는 가장 가까운 반복문 하나만 종료합니다.', ARRAY['"중첩 반복문"', '"break 범위"', '"flag 변수"'], NULL, NULL),
(75, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(3):
    pass
else:
    print(''완료'')', ARRAY['"완료"', '"아무것도 출력되지 않음"', '"오류"', '"None"'], 0, 'for-else에서 else 블록은 반복문이 break 없이 정상 종료되었을 때 실행됩니다. pass만 있으므로 정상 종료됩니다.', 'for-else 구문', 'for-else에서 else는 break가 실행되지 않고 반복이 완료되었을 때 실행됩니다.', ARRAY['"while-else"', '"break"', '"반복문 제어"'], NULL, NULL),
(76, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'for i in range(5):
    if i == 3:
        break
else:
    print("완료")
print(i)', ARRAY['"완료 3"', '"3"', '"완료 5"', '"4"'], 1, 'break로 루프가 종료되면 else 블록은 실행되지 않습니다. i는 3일 때 break되었으므로 3이 출력됩니다.', 'for-else와 break', 'for-else에서 else는 루프가 정상적으로 완료되었을 때만 실행됩니다. break로 빠져나오면 else는 실행되지 않습니다.', ARRAY['"for-else"', '"break"', '"continue"'], NULL, NULL),
(77, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'result = [x**2 for x in range(5) if x % 2 != 0]
print(result)', ARRAY['"[0, 1, 4, 9, 16]"', '"[1, 9]"', '"[1, 4, 9]"', '"[0, 4, 16]"'], 1, 'range(5)에서 홀수(x%2!=0)만 필터링하면 1, 3입니다. 각각 제곱하면 1, 9가 됩니다.', '조건부 리스트 컴프리헨션', '[표현식 for 변수 in 반복가능 if 조건]에서 if 조건을 만족하는 요소만 결과에 포함됩니다.', ARRAY['"리스트 컴프리헨션"', '"필터링"', '"제곱"'], NULL, NULL),
(78, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
for i, v in enumerate(nums, start=1):
    if i == 3:
        print(v)
        break', ARRAY['"3"', '"2"', '"4"', '"오류"'], 0, 'enumerate(nums, start=1)은 인덱스를 1부터 시작합니다. i=1,v=1 / i=2,v=2 / i=3,v=3에서 break됩니다. v=3이 출력됩니다.', 'enumerate의 start 매개변수', 'enumerate(iterable, start=0)에서 start를 변경하면 인덱스 시작 번호를 바꿀 수 있습니다. 리스트 값 자체는 변하지 않습니다.', ARRAY['"enumerate"', '"인덱스"', '"반복문"'], NULL, NULL),
(79, 'python', '19', '보통', '다음 코드의 출력 결과는?', 'result = []
for i in range(3):
    for j in range(3):
        if i == j:
            break
        result.append((i, j))
print(result)', ARRAY['"[(1, 0), (2, 0), (2, 1)]"', '"[(0, 1), (0, 2), (1, 2)]"', '"[(0, 0), (1, 1), (2, 2)]"', '"[]"'], 0, 'i=0일 때 j=0에서 바로 break. i=1일 때 j=0 추가 후 j=1에서 break. i=2일 때 j=0,1 추가 후 j=2에서 break.', '중첩 반복문에서의 break', 'break는 가장 안쪽 반복문만 종료합니다. 바깥 반복문은 계속 실행됩니다.', ARRAY['"break"', '"중첩 루프"', '"튜플"'], NULL, NULL),
(80, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'count = 0
while count < 3:
    count += 1
print(count)', ARRAY['"0"', '"2"', '"3"', '"무한 루프"'], 2, 'while 루프가 count를 0→1→2→3으로 증가시킵니다. count가 3이 되면 조건이 거짓이 되어 루프가 종료되고, 3이 출력됩니다.', 'while 반복문', 'while은 조건이 참인 동안 반복합니다. 조건이 영원히 참이면 무한 루프가 됩니다.', ARRAY['"while 루프"', '"break"', '"무한 루프"'], 'pyWhileBuilder', NULL),
(81, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'count = 0
while count < 3:
    print(count, end=" ")
    count += 1
else:
    print("끝")', ARRAY['"0 1 2 끝"', '"0 1 2"', '"0 1 2 3 끝"', '"끝"'], 0, 'while-else에서 else 블록은 반복문이 정상 종료(break 없이)되었을 때 실행됩니다.', 'while-else 구문', 'Python의 while/for 반복문은 else 블록을 가질 수 있으며, break 없이 정상 종료 시 실행됩니다.', ARRAY['"for-else"', '"break"', '"반복문"'], 'pyWhileBuilder', NULL),
(82, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'i = 0
while i < 5:
    i += 1
    if i == 3:
        continue
    print(i, end=" ")', ARRAY['"1 2 4 5"', '"1 2 3 4 5"', '"0 1 2 4 5"', '"1 2 4"'], 0, 'i가 3일 때 continue로 print를 건너뜁니다. i는 먼저 증가하므로 1, 2, 4, 5가 출력됩니다.', 'while문에서의 continue', 'while에서 continue 사용 시 변수 증감 위치에 따라 무한루프가 발생할 수 있으므로 주의가 필요합니다.', ARRAY['"while 문"', '"무한루프"', '"break"'], 'pyWhileBuilder', NULL),
(83, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'i = 0
while True:
    if i >= 3:
        break
    print(i, end=" ")
    i += 1', ARRAY['"0 1 2 3"', '"0 1 2"', '"무한 루프"', '"오류"'], 1, 'while True는 무한 루프지만, i가 3 이상이 되면 break로 탈출합니다. 0, 1, 2가 출력됩니다.', '무한 루프와 break', 'while True로 무한 루프를 만들고, 특정 조건에서 break로 탈출하는 패턴은 실전에서 자주 사용됩니다.', ARRAY['"while 루프"', '"break"', '"반복 제어"'], NULL, NULL),
(84, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'n = 0
while n < 5:
    n += 1
    if n == 3:
        continue
    print(n, end=" ")
else:
    print("끝")', ARRAY['"1 2 3 4 5 끝"', '"1 2 4 5 끝"', '"1 2 4 5"', '"1 2 끝"'], 1, 'n=3일 때 continue로 print를 건너뜁니다. break 없이 정상 종료되므로 else 블록의 ''끝''이 출력됩니다.', 'while-else와 continue', 'while-else에서 else는 break 없이 정상 종료될 때 실행됩니다. continue는 else 실행에 영향을 주지 않습니다.', ARRAY['"while-else"', '"continue"', '"for-else"'], NULL, NULL),
(85, 'python', '16', '쉬움', '다음 코드의 출력 결과는?', 'fruits = ["사과", "바나나", "체리"]
print("바나나" in fruits)', ARRAY['"True"', '"False"', '"1"', '"바나나"'], 0, 'in 연산자는 시퀀스에 특정 요소가 포함되어 있는지 확인합니다.', 'in 연산자', 'in 연산자는 리스트, 튜플, 문자열, 딕셔너리 등에서 요소의 존재 여부를 확인합니다. not in으로 부재를 확인할 수도 있습니다.', ARRAY['"멤버십 연산자"', '"not in"', '"조건문"'], 'pyListBuilder', NULL),
(86, 'python', '16', '보통', '리스트에서 마지막 요소를 가져오는 올바른 방법은?', 'my_list = [1, 2, 3, 4, 5]
# 마지막 요소를 가져오려면?', ARRAY['"my_list[-1]"', '"my_list[5]"', '"my_list.last()"', '"my_list[end]"'], 0, 'Python 리스트는 음수 인덱스를 지원하며, -1은 마지막 요소를 의미합니다.', '음수 인덱싱', 'Python에서 -1은 마지막 요소, -2는 마지막에서 두 번째 요소를 나타냅니다.', ARRAY['"리스트 슬라이싱"', '"인덱스 에러"', '"시퀀스 타입"'], 'pyListBuilder', '{"wrong":"my_list = [1, 2, 3, 4, 5]\nprint(my_list[5])  # IndexError!","correct":"my_list = [1, 2, 3, 4, 5]\nprint(my_list[-1])  # 5"}'::jsonb),
(87, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'fruits = ["사과", "바나나", "체리"]
fruits.append("포도")
fruits.insert(1, "오렌지")
print(len(fruits))', ARRAY['"3"', '"4"', '"5"', '"오류"'], 2, '처음 3개 + append로 1개 + insert로 1개 = 총 5개입니다.', '리스트 메서드', 'append()는 끝에 추가, insert(위치, 값)는 원하는 위치에 삽입합니다. 둘 다 리스트를 직접 변경합니다.', ARRAY['"append()"', '"insert()"', '"remove()"', '"pop()"'], 'pyListBuilder', NULL),
(88, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'nums = [3, 1, 4, 1, 5, 9]
nums.sort()
print(nums)', ARRAY['"[9, 5, 4, 3, 1, 1]"', '"[3, 1, 4, 1, 5, 9]"', '"[1, 1, 3, 4, 5, 9]"', '"오류"'], 2, 'sort()는 리스트를 오름차순으로 정렬합니다. 원본 리스트가 직접 변경됩니다.', '리스트 정렬', 'sort()는 리스트를 직접 변경하고, sorted()는 새 리스트를 반환합니다. reverse=True를 넣으면 내림차순입니다.', ARRAY['"sort()"', '"reverse"', '"key 매개변수"'], NULL, '{"wrong":"nums.sort()     # 원본 변경, None 반환\nx = nums.sort() # x는 None!","correct":"nums.sort()       # 원본 직접 정렬\nprint(nums)       # 정렬된 결과 출력"}'::jsonb),
(89, 'python', '17', '보통', '다음 2D 리스트에서 값 6에 접근하는 방법은?', 'matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]', ARRAY['"matrix[2][3]"', '"matrix[1][2]"', '"matrix[6]"', '"matrix[2][1]"'], 1, '6은 두 번째 행(인덱스 1)의 세 번째 열(인덱스 2)에 있으므로 matrix[1][2]입니다.', '2D 리스트', '2D 리스트는 리스트 안의 리스트입니다. matrix[행][열]로 접근하며, 인덱스는 0부터 시작합니다.', ARRAY['"중첩 리스트"', '"행렬"', '"인덱싱"'], NULL, NULL),
(90, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'nums = [3, 1, 4, 1, 5]
nums.extend([9, 2, 6])
print(len(nums))', ARRAY['"5"', '"6"', '"8"', '"오류"'], 2, 'extend()는 리스트의 요소들을 하나씩 추가합니다. 원래 5개 + 추가 3개 = 총 8개입니다.', '리스트 extend() vs append()', 'append()는 인자를 하나의 요소로 추가하고, extend()는 이터러블의 각 요소를 개별적으로 추가합니다.', ARRAY['"append()"', '"리스트 연결"', '"+= 연산자"'], NULL, '{"wrong":"nums.append([9, 2, 6])  # [3,1,4,1,5,[9,2,6]]","correct":"nums.extend([9, 2, 6])  # [3,1,4,1,5,9,2,6]"}'::jsonb),
(91, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'nums = [10, 20, 30, 20, 40]
print(nums.index(20))', ARRAY['"1"', '"3"', '"[1, 3]"', '"20"'], 0, 'index()는 값이 처음 나타나는 인덱스를 반환합니다. 20은 인덱스 1에서 처음 나타납니다.', '리스트 index() 메서드', 'index(value)는 첫 번째 일치 항목의 인덱스를 반환합니다. 값이 없으면 ValueError가 발생합니다.', ARRAY['"리스트 검색"', '"count()"', '"in 연산자"'], NULL, NULL),
(92, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
nums.reverse()
nums.clear()
print(nums)', ARRAY['"[5, 4, 3, 2, 1]"', '"[1, 2, 3, 4, 5]"', '"[]"', '"오류"'], 2, 'reverse()로 뒤집힌 후, clear()가 모든 요소를 제거하므로 빈 리스트가 됩니다.', '리스트 reverse()와 clear()', 'reverse()는 리스트를 제자리에서 뒤집고, clear()는 모든 요소를 제거합니다. 둘 다 원본을 변경합니다.', ARRAY['"리스트 메서드"', '"reversed()"', '"del"'], NULL, NULL),
(93, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'nums = [5, 3, 8, 1, 9]
print(nums.count(3), nums.index(8))', ARRAY['"1 2"', '"3 8"', '"1 3"', '"2 2"'], 0, 'count(3)은 3이 1번 등장하므로 1, index(8)은 8의 인덱스인 2를 반환합니다.', '리스트 count()와 index()', 'count(value)는 등장 횟수, index(value)는 첫 번째 위치를 반환합니다.', ARRAY['"리스트 메서드"', '"검색"', '"in 연산자"'], NULL, NULL),
(94, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a, b)', ARRAY['"[1, 2, 3] [1, 2, 3, 4]"', '"[1, 2, 3, 4] [1, 2, 3, 4]"', '"[1, 2, 3, 4] [1, 2, 3]"', '"오류"'], 0, 'a.copy()는 리스트의 얕은 복사를 만듭니다. b는 a와 독립적인 새 리스트이므로 b에 추가해도 a에 영향이 없습니다.', '리스트 얕은 복사', 'a[:]나 a.copy()로 리스트를 복사하면 원본과 독립적인 새 리스트가 생깁니다. 단, 내부 객체는 공유됩니다(얕은 복사).', ARRAY['"깊은 복사"', '"copy()"', '"리스트 슬라이싱"'], NULL, NULL),
(95, 'python', '16', '보통', '다음 코드의 출력 결과는?', 'a = [1, 2, 3]
b = a
b.append(4)
print(a)', ARRAY['"[1, 2, 3, 4]"', '"[1, 2, 3]"', '"[4]"', '"오류"'], 0, 'b = a는 같은 리스트 객체를 참조하는 별명(alias)을 만듭니다. b를 수정하면 a도 변경됩니다.', '리스트 참조와 복사', '= 로 리스트를 할당하면 같은 객체를 참조합니다. 독립적인 복사를 원하면 .copy()나 [:]를 사용하세요.', ARRAY['"얕은 복사"', '"깊은 복사"', '"id()"'], NULL, NULL),
(97, 'python', '17', '어려움', '다음 코드의 출력 결과는?', 'a = [1, [2, 3], 4]
b = a.copy()
b[1].append(99)
print(a)', ARRAY['"[1, [2, 3, 99], 4]"', '"[1, [2, 3], 4]"', '"[1, [2, 3, 99], 4, 99]"', '"오류"'], 0, 'copy()는 얕은 복사이므로 내부 리스트 [2,3]은 a와 b가 공유합니다. b[1]을 수정하면 a[1]도 변경됩니다.', '얕은 복사 vs 깊은 복사', '얕은 복사는 외부 리스트만 복사하고, 내부 객체는 참조를 공유합니다. 완전한 독립 복사가 필요하면 copy.deepcopy()를 사용하세요.', ARRAY['"얕은 복사"', '"깊은 복사"', '"중첩 리스트"'], NULL, NULL),
(98, 'python', '17', '어려움', '다음 코드의 출력 결과는?', 'a = [[1, 2], [3, 4]]
b = a.copy()
b[0].append(5)
print(a)', ARRAY['"[[1, 2], [3, 4]]"', '"[[1, 2, 5], [3, 4]]"', '"[[1, 2, 5], [3, 4, 5]]"', '"오류"'], 1, 'a.copy()는 얕은 복사입니다. 외부 리스트는 복사되지만 내부 리스트는 같은 객체를 참조합니다. b[0]과 a[0]은 같은 리스트이므로 a도 영향을 받습니다.', '얕은 복사 vs 깊은 복사', '얕은 복사는 최상위 객체만 복사합니다. 중첩된 가변 객체는 여전히 공유됩니다. copy.deepcopy()로 깊은 복사를 해야 완전히 독립됩니다.', ARRAY['"shallow copy"', '"deep copy"', '"copy 모듈"'], NULL, NULL),
(99, 'python', '16', '어려움', '다음 코드의 출력 결과는?', 'a = [1, 2, 3]
b = a
a = a + [4]
print(b)', ARRAY['"[1, 2, 3, 4]"', '"[1, 2, 3]"', '"[4]"', '"오류"'], 1, 'a + [4]는 새로운 리스트를 생성하여 a에 재할당합니다. b는 여전히 원래 리스트를 참조하므로 [1, 2, 3]입니다. a += [4]였다면 b도 변경됩니다.', '리스트 + vs +=', 'a + b는 새 리스트를 생성하지만, a += b는 a를 제자리에서(in-place) 수정합니다(a.extend(b)와 동일). 참조 공유 시 주의가 필요합니다.', ARRAY['"참조"', '"in-place 연산"', '"리스트 연결"'], NULL, NULL),
(100, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 'a = [1, 2, 3]
a[1:2] = [10, 20, 30]
print(a)', ARRAY['"[1, [10, 20, 30], 3]"', '"[1, 10, 20, 30, 3]"', '"[10, 20, 30]"', '"오류"'], 1, '슬라이스 대입은 해당 범위를 새 요소들로 교체합니다. a[1:2]는 [2]이고, 이를 [10, 20, 30]으로 교체하면 리스트 크기가 늘어납니다.', '슬라이스 대입', '리스트의 슬라이스에 다른 이터러블을 대입하면, 해당 구간이 새 요소들로 교체됩니다. 원래 구간과 새 요소 수가 달라도 됩니다.', ARRAY['"슬라이스 대입"', '"리스트 수정"', '"이터러블"'], NULL, NULL),
(101, 'python', '17', '쉬움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3]
for n in nums:
    print(n * 2, end=" ")', ARRAY['"2 4 6 "', '"1 2 3 "', '"[2, 4, 6]"', '"오류"'], 0, 'for 루프가 리스트의 각 요소를 순회하며 2를 곱한 값을 출력합니다.', '리스트 순회', 'for 변수 in 리스트: 구문으로 리스트의 모든 요소를 하나씩 처리할 수 있습니다.', ARRAY['"for문"', '"리스트"', '"반복"'], NULL, NULL),
(102, 'python', '17', '쉬움', '다음 코드의 출력 결과는?', 'words = ["hello", "world"]
result = []
for w in words:
    result.append(w.upper())
print(result)', ARRAY['"[''HELLO'', ''WORLD'']"', '"[''hello'', ''world'']"', '"HELLO WORLD"', '"오류"'], 0, 'for 루프로 각 문자열을 대문자로 변환하여 새 리스트에 추가합니다.', '리스트 변환 패턴', '빈 리스트를 만들고, for 루프에서 append()로 변환된 요소를 추가하는 것은 가장 기본적인 리스트 변환 패턴입니다.', ARRAY['"append"', '"upper()"', '"리스트 컴프리헨션"'], NULL, NULL),
(103, 'python', '17', '쉬움', '다음 코드의 출력 결과는?', 'nums = [10, 20, 30]
total = 0
for n in nums:
    total += n
print(total)', ARRAY['"60"', '"102030"', '"[10, 20, 30]"', '"오류"'], 0, 'for 루프로 리스트의 모든 요소를 누적 합산합니다. sum(nums)와 동일한 결과입니다.', '리스트 합계 패턴', '누적 변수를 0으로 초기화하고 for 루프에서 += 로 더하는 것은 합계를 구하는 기본 패턴입니다.', ARRAY['"누적 합계"', '"sum()"', '"for문"'], NULL, NULL),
(104, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
even = [n for n in nums if n % 2 == 0]
print(even)', ARRAY['"[2, 4]"', '"[1, 3, 5]"', '"[1, 2, 3, 4, 5]"', '"오류"'], 0, '리스트 컴프리헨션에 if 조건을 추가하면 조건을 만족하는 요소만 포함됩니다.', '조건부 리스트 컴프리헨션', '[표현식 for 변수 in 이터러블 if 조건] 형태로 필터링과 변환을 한 줄에 수행할 수 있습니다.', ARRAY['"리스트 컴프리헨션"', '"필터링"', '"조건문"'], NULL, NULL),
(105, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'matrix = [[1, 2], [3, 4]]
flat = [x for row in matrix for x in row]
print(flat)', ARRAY['"[1, 2, 3, 4]"', '"[[1, 2], [3, 4]]"', '"[1, 3, 2, 4]"', '"오류"'], 0, '중첩 리스트 컴프리헨션은 왼쪽에서 오른쪽으로 실행됩니다. 바깥 for가 먼저 실행되고 안쪽 for가 이어서 실행됩니다.', '중첩 리스트 컴프리헨션', '2중 for를 한 줄로 작성하여 2차원 리스트를 1차원으로 펼칠 수 있습니다.', ARRAY['"2차원 리스트"', '"flatten"', '"중첩 반복"'], NULL, NULL),
(106, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [3, 1, 4, 1, 5]
for i, v in enumerate(nums):
    if v == 1:
        print(i, end=" ")', ARRAY['"1 3 "', '"3 1 "', '"1 1 "', '"0 2 "'], 0, 'enumerate()는 (인덱스, 값) 쌍을 반환합니다. 값이 1인 인덱스는 1과 3입니다.', 'enumerate()로 인덱스 추적', 'enumerate(리스트)는 (인덱스, 값) 튜플을 생성합니다. for i, v in enumerate(리스트)로 인덱스와 값을 동시에 사용할 수 있습니다.', ARRAY['"enumerate"', '"인덱스"', '"튜플 언패킹"'], NULL, NULL),
(107, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3]
squared = list(map(lambda x: x**2, nums))
print(squared)', ARRAY['"[1, 4, 9]"', '"[2, 4, 6]"', '"[1, 2, 3]"', '"오류"'], 0, 'map()은 함수를 리스트의 각 요소에 적용합니다. lambda x: x**2는 제곱 함수입니다.', 'map()과 lambda', 'map(함수, 이터러블)은 각 요소에 함수를 적용한 결과를 반환합니다. list()로 감싸야 리스트가 됩니다.', ARRAY['"map"', '"lambda"', '"리스트 컴프리헨션"'], NULL, NULL),
(108, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
nums_iter = iter(nums)
for _ in range(2):
    next(nums_iter)
print(list(nums_iter))', ARRAY['"[3, 4, 5]"', '"[1, 2, 3, 4, 5]"', '"[1, 2]"', '"오류"'], 0, 'iter()로 이터레이터를 만들고 next()로 2개를 소비하면, 나머지 [3, 4, 5]만 남습니다.', '이터레이터 프로토콜', 'iter()는 이터레이터를 생성하고, next()는 다음 요소를 반환합니다. 이터레이터는 소비되면 되돌릴 수 없습니다.', ARRAY['"iter()"', '"next()"', '"이터레이터"'], NULL, NULL),
(109, 'python', '19', '어려움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3]
result = []
for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        result.append((nums[i], nums[j]))
print(result)', ARRAY['"[(1, 2), (1, 3), (2, 3)]"', '"[(1, 1), (2, 2), (3, 3)]"', '"[(1, 2), (2, 3)]"', '"오류"'], 0, '이중 반복문으로 모든 조합(combination)을 생성합니다. j가 i+1부터 시작하므로 중복 없는 쌍이 만들어집니다.', '조합 생성 패턴', '이중 for문에서 j를 i+1부터 시작하면 중복 없는 모든 2개 조합을 구할 수 있습니다.', ARRAY['"이중 반복문"', '"조합"', '"itertools.combinations"'], NULL, NULL),
(110, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4]
result = nums[:]
for i in range(len(result)//2):
    result[i], result[-(i+1)] = result[-(i+1)], result[i]
print(result)', ARRAY['"[4, 3, 2, 1]"', '"[1, 2, 3, 4]"', '"[2, 1, 4, 3]"', '"오류"'], 0, '리스트의 앞뒤를 교환하여 뒤집습니다. nums[:]로 복사본을 만들어 원본은 보존합니다.', '리스트 뒤집기 (수동)', '양쪽 끝에서 중앙으로 이동하며 swap하면 리스트를 뒤집을 수 있습니다. list.reverse()나 [::-1]도 같은 결과를 냅니다.', ARRAY['"swap"', '"reverse()"', '"슬라이싱"'], NULL, NULL),
(111, 'python', '18', '쉬움', '다음 코드의 출력 결과는?', 'text = "hello world python"
words = text.split()
print(words)', ARRAY['"[''hello'', ''world'', ''python'']"', '"[''hello world python'']"', '"hello world python"', '"오류"'], 0, 'split()은 공백을 기준으로 문자열을 나누어 리스트로 반환합니다.', 'split() 메서드', '문자열.split()은 공백 기준으로, split(구분자)는 지정한 구분자 기준으로 문자열을 나누어 리스트를 반환합니다.', ARRAY['"문자열"', '"리스트 변환"', '"파싱"'], NULL, NULL),
(112, 'python', '18', '쉬움', '다음 코드의 출력 결과는?', 'words = ["Hello", "World"]
result = " ".join(words)
print(result)', ARRAY['"Hello World"', '"HelloWorld"', '"[''Hello'', ''World'']"', '"오류"'], 0, 'join()은 리스트의 문자열들을 지정한 구분자로 연결합니다.', 'join() 메서드', '구분자.join(리스트)는 리스트의 문자열 요소들을 구분자로 연결하여 하나의 문자열을 만듭니다.', ARRAY['"문자열 결합"', '"split"', '"리스트→문자열"'], NULL, NULL),
(113, 'python', '18', '보통', '다음 코드의 출력 결과는?', 'data = "a,b,,c"
parts = data.split(",")
print(len(parts))', ARRAY['"4"', '"3"', '"5"', '"오류"'], 0, 'split('','')는 연속된 구분자 사이의 빈 문자열도 포함합니다. ''a'', ''b'', '''', ''c'' 총 4개입니다.', 'split과 빈 문자열', 'split(구분자)는 빈 문자열도 결과에 포함합니다. 반면 split()은 연속 공백을 하나로 처리합니다.', ARRAY['"split"', '"구분자"', '"데이터 파싱"'], NULL, '{"wrong":"\"a,,b\".split(\",\")   # [''a'', '''', ''b''] — 빈 문자열 포함","correct":"\"a  b\".split()      # [''a'', ''b''] — 연속 공백 무시"}'::jsonb),
(114, 'python', '18', '보통', '다음 코드의 출력 결과는?', 'text = "2024-03-15"
year, month, day = text.split("-")
print(f"{month}/{day}")', ARRAY['"03/15"', '"2024/03"', '"2024-03-15"', '"오류"'], 0, 'split(''-'')로 나눈 결과를 언패킹하여 각 변수에 할당합니다. month는 ''03'', day는 ''15''입니다.', 'split과 언패킹', 'split()의 결과를 여러 변수에 동시에 할당(언패킹)할 수 있습니다. 변수 수와 리스트 길이가 일치해야 합니다.', ARRAY['"언패킹"', '"f-string"', '"날짜 파싱"'], NULL, NULL),
(115, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'csv = "name,age,city"
header = csv.split(",")
row = "Alice,30,Seoul"
data = dict(zip(header, row.split(",")))
print(data["age"])', ARRAY['"30"', '"age"', '"Alice"', '"오류"'], 0, 'zip()으로 헤더와 값을 쌍으로 묶고 dict()로 딕셔너리를 생성합니다. data[''age'']는 ''30''입니다.', 'CSV 파싱 패턴', 'split()으로 헤더와 데이터 행을 나누고, zip()과 dict()로 딕셔너리를 만드는 것은 CSV 파싱의 기본 패턴입니다.', ARRAY['"zip"', '"dict"', '"CSV 처리"'], NULL, NULL),
(116, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 'text = "hello world"
result = "-".join(text.split()[::-1])
print(result)', ARRAY['"world-hello"', '"hello-world"', '"dlrow-olleh"', '"오류"'], 0, 'split()으로 단어 리스트를 만들고, [::-1]로 뒤집은 뒤, ''-''로 다시 결합합니다.', 'split-reverse-join 패턴', '문자열을 단어 단위로 뒤집으려면 split()→[::-1]→join() 순서로 처리합니다.', ARRAY['"split"', '"슬라이싱"', '"join"'], NULL, NULL),
(117, 'python', '19', '쉬움', '다음 코드의 출력 결과는?', 't = (1, 2, 3)
print(t[1])', ARRAY['"2"', '"1"', '"(1, 2, 3)"', '"오류"'], 0, '튜플도 리스트처럼 인덱싱이 가능합니다. t[1]은 두 번째 요소인 2입니다.', '튜플 인덱싱', '튜플은 ()로 생성하며, 리스트와 동일하게 인덱싱할 수 있습니다. 다만 요소를 변경할 수는 없습니다.', ARRAY['"인덱싱"', '"불변 시퀀스"', '"리스트와 차이"'], 'dataStructures', NULL),
(118, 'python', '19', '쉬움', '다음 중 튜플에 대한 설명으로 올바른 것은?', 't = (1, 2, 3)', ARRAY['"튜플은 수정할 수 없다"', '"튜플은 인덱싱이 안 된다"', '"튜플은 {}로 만든다"', '"튜플은 중복을 허용하지 않는다"'], 0, '튜플은 불변(immutable) 시퀀스입니다. 생성 후 요소를 추가, 삭제, 변경할 수 없습니다.', '튜플의 불변성', '튜플은 불변이므로 딕셔너리의 키나 집합의 요소로 사용할 수 있습니다. 변경이 필요 없는 데이터에 적합합니다.', ARRAY['"immutable"', '"hashable"', '"딕셔너리 키"'], 'dataStructures', NULL),
(119, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'a, b, *c = (1, 2, 3, 4, 5)
print(c)', ARRAY['"[3, 4, 5]"', '"(3, 4, 5)"', '"3"', '"오류"'], 0, '*c는 나머지 모든 요소를 리스트로 받습니다. 튜플을 언패킹해도 *변수는 리스트가 됩니다.', '확장 언패킹 (*)', '*변수는 나머지 요소를 리스트로 수집합니다. 언패킹 위치에 따라 앞, 중간, 뒤 어디든 배치할 수 있습니다.', ARRAY['"언패킹"', '"* 연산자"', '"가변 인자"'], NULL, NULL),
(120, 'python', '19', '보통', '다음 코드의 출력 결과는?', 't = (1,)
print(type(t))
s = (1)
print(type(s))', ARRAY['"<class ''tuple''>\n<class ''int''>"', '"<class ''tuple''>\n<class ''tuple''>"', '"<class ''int''>\n<class ''int''>"', '"오류"'], 0, '요소가 하나인 튜플은 반드시 쉼표가 필요합니다. (1)은 그냥 정수 1과 같습니다.', '단일 요소 튜플', '요소가 하나인 튜플은 (값,)처럼 쉼표를 붙여야 합니다. 쉼표가 없으면 괄호 안의 표현식으로 처리됩니다.', ARRAY['"튜플 생성"', '"쉼표"', '"괄호"'], NULL, '{"wrong":"t = (1)     # int 타입, 그냥 숫자 1","correct":"t = (1,)    # tuple 타입, 요소가 1개인 튜플"}'::jsonb),
(121, 'python', '19', '어려움', '다음 코드의 출력 결과는?', 't = (1, [2, 3], 4)
t[1].append(5)
print(t)', ARRAY['"(1, [2, 3, 5], 4)"', '"오류 (튜플은 수정 불가)"', '"(1, [2, 3], 4)"', '"(1, [2, 3, 5, 4])"'], 0, '튜플 자체는 불변이지만, 튜플 안의 가변 객체(리스트)는 수정할 수 있습니다. 참조가 바뀌지 않기 때문입니다.', '튜플 안의 가변 객체', '튜플의 불변성은 참조의 불변성입니다. 튜플 요소가 가리키는 객체 자체가 가변이면 그 내용은 변경될 수 있습니다.', ARRAY['"불변성"', '"참조"', '"가변 객체"'], NULL, NULL),
(122, 'python', '46', '어려움', '다음 코드의 출력 결과는?', 'from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[0])', ARRAY['"3 3"', '"3 4"', '"x 0"', '"오류"'], 0, 'namedtuple은 이름으로도, 인덱스로도 접근 가능한 튜플입니다. p.x와 p[0] 모두 첫 번째 요소입니다.', 'namedtuple', 'namedtuple은 필드 이름이 있는 튜플을 만듭니다. 클래스처럼 속성 접근이 가능하면서도 불변성을 유지합니다.', ARRAY['"collections"', '"불변 데이터"', '"클래스 대안"'], NULL, NULL),
(123, 'python', '20', '쉬움', '다음 코드의 출력 결과는?', 'd = {"name": "Alice", "age": 20}
print(d["name"])', ARRAY['"Alice"', '"name"', '"20"', '"오류"'], 0, '딕셔너리에서 키를 사용해 값을 조회합니다. d[''name'']은 ''Alice''를 반환합니다.', '딕셔너리 조회', '딕셔너리는 {키: 값} 쌍으로 데이터를 저장합니다. 대괄호에 키를 넣어 값을 조회합니다.', ARRAY['"키-값 쌍"', '"해시맵"', '"인덱싱과 차이"'], 'pyDictBuilder', NULL),
(124, 'python', '20', '쉬움', '딕셔너리에 새로운 키-값 쌍을 추가하는 방법은?', 'd = {"a": 1}
# "b": 2를 추가하려면?', ARRAY['"d[\"b\"] = 2"', '"d.add(\"b\", 2)"', '"d.insert(\"b\", 2)"', '"d.append(\"b\", 2)"'], 0, '딕셔너리에 새 키를 대입하면 자동으로 추가됩니다. add나 insert 메서드는 없습니다.', '딕셔너리 추가/수정', 'd[키] = 값으로 새 항목을 추가하거나 기존 항목을 수정합니다. 키가 없으면 추가, 있으면 수정됩니다.', ARRAY['"딕셔너리 수정"', '"키 존재 확인"', '"update()"'], 'pyDictBuilder', NULL),
(125, 'python', '20', '쉬움', '다음 코드의 출력 결과는?', 'd = {"x": 1, "y": 2}
print("x" in d)', ARRAY['"True"', '"False"', '"x"', '"오류"'], 0, 'in 연산자는 딕셔너리의 키에서 검색합니다. ''x''는 d의 키이므로 True입니다.', '딕셔너리 in 연산자', '키 in 딕셔너리는 키의 존재 여부를 확인합니다. 값이 아닌 키를 검색한다는 점에 주의하세요.', ARRAY['"in 연산자"', '"키 검색"', '"멤버십 테스트"'], 'pyDictBuilder', NULL),
(126, 'python', '20', '쉬움', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2, "c": 3}
print(list(d.keys()))', ARRAY['"[''a'', ''b'', ''c'']"', '"[1, 2, 3]"', '"[(''a'',1), (''b'',2), (''c'',3)]"', '"오류"'], 0, 'd.keys()는 딕셔너리의 모든 키를 반환합니다. list()로 감싸면 리스트가 됩니다.', 'keys(), values(), items()', 'keys()는 키들을, values()는 값들을, items()는 (키, 값) 쌍들을 반환합니다.', ARRAY['"딕셔너리 순회"', '"dict_keys"', '"뷰 객체"'], NULL, NULL),
(127, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2}
val = d.get("c", 0)
print(val)', ARRAY['"0"', '"None"', '"오류 (KeyError)"', '"c"'], 0, 'get(키, 기본값)은 키가 없으면 기본값을 반환합니다. ''c''가 없으므로 0을 반환합니다.', 'get() 메서드', 'd.get(키, 기본값)은 키가 없어도 에러 없이 기본값을 반환합니다. d[키]와 달리 KeyError가 발생하지 않습니다.', ARRAY['"get()"', '"KeyError"', '"기본값"'], NULL, '{"wrong":"val = d[\"c\"]    # KeyError 발생!","correct":"val = d.get(\"c\", 0)  # 안전하게 기본값 반환"}'::jsonb),
(128, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'words = ["apple", "banana", "apple", "cherry", "apple"]
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1
print(count["apple"])', ARRAY['"3"', '"1"', '"2"', '"오류"'], 0, 'get(w, 0)으로 없는 키는 0부터 시작하여 카운트합니다. apple은 3번 나타납니다.', '빈도 카운터 패턴', 'get(키, 0) + 1 패턴으로 요소의 출현 횟수를 세는 것은 매우 자주 사용되는 패턴입니다.', ARRAY['"카운팅"', '"collections.Counter"', '"get()"'], NULL, NULL),
(129, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2, "c": 3}
for k, v in d.items():
    if v > 1:
        print(k, end=" ")', ARRAY['"b c "', '"a "', '"1 2 3 "', '"오류"'], 0, 'items()는 (키, 값) 쌍을 반환합니다. 값이 1보다 큰 키 ''b''와 ''c''가 출력됩니다.', '딕셔너리 items() 순회', 'for k, v in d.items()로 키와 값을 동시에 순회할 수 있습니다.', ARRAY['"items()"', '"딕셔너리 순회"', '"튜플 언패킹"'], NULL, NULL),
(130, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'd1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}
d1.update(d2)
print(d1)', ARRAY['"{''a'': 1, ''b'': 3, ''c'': 4}"', '"{''a'': 1, ''b'': 2, ''c'': 4}"', '"{''b'': 3, ''c'': 4}"', '"오류"'], 0, 'update()는 다른 딕셔너리의 항목을 추가/덮어씁니다. ''b''의 값이 3으로 업데이트됩니다.', 'update() 메서드', 'd.update(other)는 other의 키-값 쌍을 d에 추가합니다. 겹치는 키는 other의 값으로 덮어씁니다.', ARRAY['"딕셔너리 병합"', '"update()"', '"|= 연산자"'], NULL, NULL),
(131, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2, "c": 3}
removed = d.pop("b")
print(removed, d)', ARRAY['"2 {''a'': 1, ''c'': 3}"', '"b {''a'': 1, ''c'': 3}"', '"2 {''a'': 1, ''b'': 2, ''c'': 3}"', '"오류"'], 0, 'pop(키)는 해당 키-값 쌍을 제거하고 값을 반환합니다.', 'pop() 메서드', 'd.pop(키)는 키에 해당하는 값을 반환하고 항목을 삭제합니다. 키가 없으면 기본값을 지정할 수 있습니다.', ARRAY['"pop()"', '"del"', '"딕셔너리 삭제"'], NULL, NULL),
(132, 'python', '20', '어려움', '다음 코드의 출력 결과는?', 'd = {}
d.setdefault("a", []).append(1)
d.setdefault("a", []).append(2)
print(d)', ARRAY['"{''a'': [1, 2]}"', '"{''a'': [2]}"', '"{''a'': [1]}"', '"오류"'], 0, 'setdefault()는 키가 없을 때만 기본값을 설정하고, 이미 있으면 기존 값을 반환합니다. 두 번째 호출에서는 이미 있는 리스트에 2를 추가합니다.', 'setdefault() 메서드', 'setdefault(키, 기본값)은 키가 없으면 기본값을 설정하고 반환하며, 있으면 기존 값을 반환합니다. 그룹화 패턴에 유용합니다.', ARRAY['"setdefault"', '"defaultdict"', '"그룹화"'], NULL, NULL),
(133, 'python', '20', '어려움', '다음 코드의 출력 결과는?', 'data = [("a", 1), ("b", 2), ("a", 3)]
d = {}
for k, v in data:
    d[k] = d.get(k, 0) + v
print(d)', ARRAY['"{''a'': 4, ''b'': 2}"', '"{''a'': 3, ''b'': 2}"', '"{''a'': 1, ''b'': 2}"', '"오류"'], 0, '''a''의 값은 1 + 3 = 4로 누적됩니다. get(k, 0)으로 없는 키는 0에서 시작합니다.', '딕셔너리 누적 패턴', '동일 키의 값을 누적하려면 get(키, 초기값) + 새값 패턴을 사용합니다.', ARRAY['"누적"', '"get()"', '"데이터 집계"'], NULL, NULL),
(134, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'd = {"b": 2, "a": 1, "c": 3}
sorted_d = dict(sorted(d.items(), key=lambda x: x[1]))
print(list(sorted_d.keys()))', ARRAY['"[''a'', ''b'', ''c'']"', '"[''b'', ''a'', ''c'']"', '"[''c'', ''b'', ''a'']"', '"오류"'], 0, '값 기준으로 정렬하면 1, 2, 3 순서이므로 키는 ''a'', ''b'', ''c'' 순서가 됩니다.', '딕셔너리 정렬', 'sorted(d.items(), key=...)로 딕셔너리를 정렬한 후 dict()로 다시 딕셔너리를 만들 수 있습니다.', ARRAY['"sorted()"', '"lambda"', '"딕셔너리 정렬"'], NULL, NULL),
(135, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2}
new = {v: k for k, v in d.items()}
print(new)', ARRAY['"{1: ''a'', 2: ''b''}"', '"{''a'': 1, ''b'': 2}"', '"{1: 1, 2: 2}"', '"오류"'], 0, '딕셔너리 컴프리헨션으로 키와 값을 뒤바꿉니다.', '딕셔너리 컴프리헨션', '{키표현식: 값표현식 for 변수 in 이터러블} 형태로 딕셔너리를 한 줄에 생성할 수 있습니다.', ARRAY['"딕셔너리 컴프리헨션"', '"키-값 역전"', '"데이터 변환"'], NULL, NULL),
(136, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'from collections import defaultdict
d = defaultdict(list)
for item in [(1,"a"), (1,"b"), (2,"c")]:
    d[item[0]].append(item[1])
print(dict(d))', ARRAY['"{1: [''a'', ''b''], 2: [''c'']}"', '"{1: ''b'', 2: ''c''}"', '"오류"', '"{(1,''a''): None, (1,''b''): None}"'], 0, 'defaultdict(list)는 없는 키에 접근하면 자동으로 빈 리스트를 생성합니다.', 'defaultdict', 'defaultdict(타입)은 없는 키에 접근할 때 자동으로 기본값을 생성합니다. 그룹화에 매우 편리합니다.', ARRAY['"collections"', '"그룹화"', '"defaultdict"'], NULL, NULL),
(137, 'python', '21', '쉬움', '다음 코드의 출력 결과는?', 's = {1, 2, 3, 2, 1}
print(len(s))', ARRAY['"3"', '"5"', '"2"', '"오류"'], 0, '집합은 중복을 허용하지 않습니다. {1, 2, 3, 2, 1}은 {1, 2, 3}이 되어 길이가 3입니다.', '집합의 중복 제거', '집합(set)은 중복 요소를 자동으로 제거합니다. 유일한 요소만 유지합니다.', ARRAY['"set"', '"중복 제거"', '"해시"'], 'dataStructures', NULL),
(138, 'python', '21', '쉬움', '리스트에서 중복을 제거하는 가장 간단한 방법은?', 'nums = [1, 2, 2, 3, 3, 3]', ARRAY['"list(set(nums))"', '"nums.unique()"', '"nums.distinct()"', '"set.remove_duplicates(nums)"'], 0, 'set()으로 변환하면 중복이 제거되고, list()로 다시 리스트로 만들 수 있습니다. 단, 순서가 보장되지 않습니다.', 'set으로 중복 제거', 'list(set(리스트))는 중복을 제거하는 가장 간단한 방법입니다. 순서 유지가 필요하면 dict.fromkeys()를 사용합니다.', ARRAY['"중복 제거"', '"순서 보존"', '"dict.fromkeys()"'], 'dataStructures', NULL),
(139, 'python', '21', '보통', '다음 코드의 출력 결과는?', 'a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)
print(a | b)', ARRAY['"{2, 3}\n{1, 2, 3, 4}"', '"{1, 4}\n{2, 3}"', '"{1, 2, 3, 4}\n{2, 3}"', '"오류"'], 0, '&는 교집합, |는 합집합입니다. a & b = {2, 3}, a | b = {1, 2, 3, 4}입니다.', '집합 연산자', '& (교집합), | (합집합), - (차집합), ^ (대칭차집합)으로 집합 연산을 수행할 수 있습니다.', ARRAY['"교집합"', '"합집합"', '"차집합"'], NULL, NULL),
(140, 'python', '21', '보통', '다음 코드의 출력 결과는?', 'a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a - b)
print(a ^ b)', ARRAY['"{1, 2}\n{1, 2, 5, 6}"', '"{1, 2}\n{1, 2, 3, 4, 5, 6}"', '"{3, 4}\n{1, 2, 5, 6}"', '"오류"'], 0, 'a - b는 a에만 있는 요소(차집합), a ^ b는 한쪽에만 있는 요소(대칭차집합)입니다.', '차집합과 대칭차집합', 'a - b는 a에는 있지만 b에는 없는 요소입니다. a ^ b는 둘 중 하나에만 있는 요소입니다.', ARRAY['"차집합"', '"대칭차집합"', '"집합 연산"'], NULL, NULL),
(141, 'python', '21', '보통', '다음 코드의 출력 결과는?', 's = {1, 2, 3}
s.add(4)
s.add(2)
s.discard(5)
print(s)', ARRAY['"{1, 2, 3, 4}"', '"{1, 2, 3, 4, 2}"', '"{1, 3, 4}"', '"오류"'], 0, 'add(4)로 4추가, add(2)는 이미 있어서 무시, discard(5)는 없어도 에러 없이 무시됩니다.', 'add()와 discard()', 'add()는 요소를 추가하고, discard()는 요소를 제거합니다. discard()는 없는 요소도 에러 없이 무시합니다.', ARRAY['"add"', '"discard"', '"remove"'], NULL, '{"wrong":"s.remove(5)    # KeyError 발생!","correct":"s.discard(5)   # 없어도 에러 없음"}'::jsonb),
(142, 'python', '21', '어려움', '다음 코드의 출력 결과는?', 'a = {1, 2, 3}
b = {1, 2}
print(b.issubset(a))
print(a.issuperset(b))', ARRAY['"True\nTrue"', '"False\nTrue"', '"True\nFalse"', '"False\nFalse"'], 0, 'b의 모든 요소가 a에 있으므로 b는 a의 부분집합이고, a는 b의 상위집합입니다.', '부분집합 검사', 'issubset()은 부분집합 여부를, issuperset()은 상위집합 여부를 확인합니다. <= 와 >= 연산자도 사용 가능합니다.', ARRAY['"부분집합"', '"상위집합"', '"집합 비교"'], NULL, NULL),
(143, 'python', '21', '어려움', '다음 코드의 출력 결과는?', 'text = "hello world"
chars = set(text)
print(len(chars))', ARRAY['"8"', '"11"', '"10"', '"7"'], 0, '''hello world''의 고유 문자는 h, e, l, o, '' '', w, r, d 총 8개입니다. 중복 l과 o는 한 번만 셉니다.', '문자열의 고유 문자 수', 'set(문자열)은 문자열의 각 문자를 집합으로 만들어 고유 문자만 남깁니다.', ARRAY['"set"', '"문자열"', '"고유 요소"'], NULL, NULL),
(144, 'python', '21', '어려움', '다음 코드의 출력 결과는?', 's = frozenset([1, 2, 3])
d = {s: "frozen"}
print(d[frozenset([1, 2, 3])])', ARRAY['"frozen"', '"오류 (unhashable)"', '"{1, 2, 3}"', '"None"'], 0, 'frozenset은 불변 집합이므로 해시 가능하여 딕셔너리 키로 사용할 수 있습니다.', 'frozenset', 'frozenset은 불변(immutable) 집합입니다. 일반 set은 딕셔너리 키로 사용할 수 없지만, frozenset은 가능합니다.', ARRAY['"frozenset"', '"hashable"', '"불변 집합"'], NULL, NULL),
(145, 'python', '22', '쉬움', '다음 코드의 출력 결과는?', 's = "Python"
print(s[1:4])', ARRAY['"yth"', '"Pyt"', '"ytho"', '"오류"'], 0, '슬라이싱 [1:4]는 인덱스 1부터 3까지(4 미포함)의 문자를 반환합니다.', '기본 슬라이싱', '시퀀스[시작:끝]은 시작 인덱스부터 끝 인덱스 직전까지의 요소를 반환합니다.', ARRAY['"인덱싱"', '"문자열"', '"리스트 슬라이싱"'], NULL, NULL),
(146, 'python', '22', '쉬움', '다음 코드의 출력 결과는?', 'nums = [0, 1, 2, 3, 4]
print(nums[:3])
print(nums[3:])', ARRAY['"[0, 1, 2]\n[3, 4]"', '"[0, 1, 2, 3]\n[4]"', '"[1, 2, 3]\n[3, 4]"', '"오류"'], 0, '[:3]은 처음부터 인덱스 2까지, [3:]은 인덱스 3부터 끝까지입니다.', '시작/끝 생략', '[:n]은 처음부터 n개, [n:]은 n번째부터 끝까지를 의미합니다.', ARRAY['"슬라이싱"', '"리스트 분할"', '"시퀀스"'], NULL, NULL),
(147, 'python', '22', '보통', '다음 코드의 출력 결과는?', 's = "abcdefgh"
print(s[::2])
print(s[1::2])', ARRAY['"aceg\nbdfh"', '"abcd\nefgh"', '"aeg\nbfh"', '"오류"'], 0, '[::2]는 0번째부터 2칸씩, [1::2]는 1번째부터 2칸씩 건너뜁니다.', '스텝 슬라이싱', '시퀀스[시작:끝:스텝]에서 스텝은 건너뛰는 간격입니다. 홀수/짝수 인덱스 요소를 분리할 때 유용합니다.', ARRAY['"스텝"', '"슬라이싱"', '"홀짝 분리"'], NULL, NULL),
(148, 'python', '22', '보통', '다음 코드의 출력 결과는?', 's = "Hello"
print(s[::-1])', ARRAY['"olleH"', '"Hello"', '"H"', '"오류"'], 0, '[::-1]은 전체 문자열을 뒤집습니다. 스텝이 -1이면 역순으로 순회합니다.', '문자열 뒤집기', '[::-1]은 시퀀스를 뒤집는 가장 파이썬다운 방법입니다. 문자열, 리스트, 튜플 모두에 사용 가능합니다.', ARRAY['"역순"', '"팰린드롬"', '"reversed()"'], NULL, NULL),
(149, 'python', '22', '보통', '다음 코드의 출력 결과는?', 'nums = [0, 1, 2, 3, 4, 5]
print(nums[-3:])', ARRAY['"[3, 4, 5]"', '"[0, 1, 2]"', '"[2, 3, 4]"', '"오류"'], 0, '[-3:]은 뒤에서 3번째부터 끝까지를 의미합니다.', '음수 인덱스 슬라이싱', '음수 인덱스를 슬라이싱에 사용하면 끝에서부터 세어 범위를 지정할 수 있습니다.', ARRAY['"음수 인덱스"', '"슬라이싱"', '"마지막 n개"'], NULL, NULL),
(150, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 'a = [1, 2, 3, 4, 5]
b = a[1:4]
b[0] = 99
print(a)', ARRAY['"[1, 2, 3, 4, 5]"', '"[1, 99, 3, 4, 5]"', '"[1, 99, 99, 4, 5]"', '"오류"'], 0, '슬라이싱은 새로운 리스트를 생성합니다(얕은 복사). b를 수정해도 a는 변경되지 않습니다.', '슬라이싱과 복사', '리스트 슬라이싱은 항상 새로운 리스트를 생성합니다. 이를 이용해 a[:]로 얕은 복사를 할 수 있습니다.', ARRAY['"얕은 복사"', '"참조"', '"리스트 복사"'], NULL, NULL),
(151, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 's = "Hello, World!"
print(s[7:12][::-1])', ARRAY['"dlroW"', '"World"', '"!dlroW"', '"오류"'], 0, 's[7:12]는 ''World''이고, [::-1]로 뒤집으면 ''dlroW''가 됩니다.', '체인 슬라이싱', '슬라이싱을 연속으로 적용할 수 있습니다. 각 슬라이싱은 새로운 시퀀스를 반환합니다.', ARRAY['"체인 연산"', '"문자열 조작"', '"슬라이싱"'], NULL, NULL),
(152, 'python', '22', '어려움', '다음 코드의 출력 결과는?', 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(a[2:8:3])', ARRAY['"[2, 5]"', '"[2, 3, 4]"', '"[2, 5, 8]"', '"오류"'], 0, '[2:8:3]은 인덱스 2에서 시작해 3씩 증가하여 8 미만까지입니다. 인덱스 2와 5의 값입니다.', '3개 인자 슬라이싱', '[시작:끝:스텝]에서 세 인자를 모두 지정하면 정밀한 범위 선택이 가능합니다.', ARRAY['"슬라이싱"', '"스텝"', '"범위 선택"'], NULL, NULL),
(153, 'python', '23', '쉬움', 'Python에서 리스트를 스택으로 사용할 때, push와 pop에 해당하는 메서드는?', 'stack = []
# push: ?
# pop: ?', ARRAY['"append() / pop()"', '"push() / pop()"', '"add() / remove()"', '"insert() / delete()"'], 0, 'Python 리스트에서 append()가 스택의 push, pop()이 스택의 pop 역할을 합니다.', '리스트로 스택 구현', '리스트의 append()와 pop()을 사용하면 LIFO(후입선출) 스택을 구현할 수 있습니다.', ARRAY['"스택"', '"LIFO"', '"append"', '"pop"'], NULL, NULL),
(154, 'python', '23', '보통', '다음 코드의 출력 결과는?', 'stack = []
stack.append(1)
stack.append(2)
stack.append(3)
stack.pop()
stack.append(4)
print(stack)', ARRAY['"[1, 2, 4]"', '"[1, 2, 3, 4]"', '"[1, 4]"', '"[2, 3, 4]"'], 0, '1, 2, 3을 push한 뒤 pop()으로 3을 제거하고, 4를 push하면 [1, 2, 4]가 됩니다.', '스택 연산 추적', '스택에서 pop()은 항상 마지막에 추가된 요소를 제거합니다. push/pop 순서를 추적하는 것이 중요합니다.', ARRAY['"스택 연산"', '"LIFO"', '"pop()"'], NULL, NULL),
(155, 'python', '23', '어려움', '다음 괄호 검증 코드에서 빈칸에 들어갈 것은?', 'stack = []
pairs = {")":"(", "]":"[", "}":"{"}
s = "([{}])"
for c in s:
    if c in "([{":
        stack.append(c)
    elif c in ")]}":
        if not stack or stack[-1] != ___:
            print("유효하지 않음")
            break
        stack.pop()', ARRAY['"pairs[c]"', '"pairs[stack[-1]]"', '"c"', '"stack[0]"'], 0, '닫는 괄호 c에 대응하는 여는 괄호는 pairs[c]입니다. 스택 최상단과 비교해야 합니다.', '괄호 검증 (스택 활용)', '스택은 괄호 매칭에 가장 대표적으로 사용됩니다. 여는 괄호는 push, 닫는 괄호는 스택 top과 비교 후 pop합니다.', ARRAY['"괄호 매칭"', '"스택 활용"', '"알고리즘"'], NULL, NULL),
(156, 'python', '23', '어려움', '다음 코드의 출력 결과는?', 's = "hello"
stack = list(s)
result = ""
while stack:
    result += stack.pop()
print(result)', ARRAY['"olleh"', '"hello"', '"h"', '"오류"'], 0, '스택에서 pop()하면 마지막 문자부터 꺼내지므로 문자열이 뒤집어집니다.', '스택으로 문자열 뒤집기', '스택의 LIFO 특성을 이용하면 문자열을 뒤집을 수 있습니다. 모두 push한 후 모두 pop하면 역순이 됩니다.', ARRAY['"스택"', '"문자열 역순"', '"[::-1]"'], NULL, NULL),
(157, 'python', '24', '쉬움', '큐(Queue)의 특성으로 올바른 것은?', '# 큐의 동작 방식은?', ARRAY['"먼저 들어간 것이 먼저 나온다 (FIFO)"', '"나중에 들어간 것이 먼저 나온다 (LIFO)"', '"랜덤으로 나온다"', '"가장 큰 것이 먼저 나온다"'], 0, '큐는 FIFO(First In, First Out) 구조입니다. 줄을 서는 것과 같은 원리입니다.', '큐의 FIFO 원칙', '큐는 먼저 넣은 요소가 먼저 나오는 자료구조입니다. 대기열, BFS 등에 사용됩니다.', ARRAY['"FIFO"', '"스택과 차이"', '"deque"'], NULL, NULL),
(158, 'python', '24', '보통', '다음 코드의 출력 결과는?', 'from collections import deque
q = deque()
q.append(1)
q.append(2)
q.append(3)
print(q.popleft())', ARRAY['"1"', '"3"', '"2"', '"오류"'], 0, 'deque의 popleft()는 왼쪽(가장 먼저 들어간) 요소를 제거하고 반환합니다.', 'deque로 큐 구현', 'collections.deque는 양쪽 끝에서 O(1) 시간에 추가/제거가 가능합니다. append()와 popleft()로 큐를 구현합니다.', ARRAY['"deque"', '"popleft"', '"큐 구현"'], NULL, NULL),
(159, 'python', '24', '어려움', '리스트의 pop(0)과 deque의 popleft()의 차이는?', '# list.pop(0) vs deque.popleft()', ARRAY['"pop(0)은 O(n), popleft()는 O(1)"', '"둘 다 O(1)"', '"둘 다 O(n)"', '"pop(0)은 O(1), popleft()는 O(n)"'], 0, '리스트의 pop(0)은 모든 요소를 한 칸씩 이동해야 하므로 O(n)이지만, deque의 popleft()는 O(1)입니다.', 'deque의 성능 이점', '리스트는 앞쪽 삽입/삭제가 O(n)이지만, deque는 양쪽 모두 O(1)입니다. 큐가 필요하면 항상 deque를 사용하세요.', ARRAY['"시간 복잡도"', '"deque"', '"성능 최적화"'], NULL, NULL),
(160, 'python', '25', '어려움', '다음 코드의 출력 결과는?', 'from collections import deque
d = deque([1, 2, 3])
d.rotate(1)
print(list(d))', ARRAY['"[3, 1, 2]"', '"[2, 3, 1]"', '"[1, 2, 3]"', '"오류"'], 0, 'rotate(1)은 오른쪽으로 1칸 회전합니다. 마지막 요소 3이 맨 앞으로 이동합니다.', 'deque.rotate()', 'rotate(n)은 양수면 오른쪽, 음수면 왼쪽으로 n칸 회전합니다.', ARRAY['"deque"', '"rotate"', '"순환 버퍼"'], NULL, NULL),
(161, 'python', '17', '쉬움', '다음 코드의 출력 결과는?', 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1][2])', ARRAY['"6"', '"5"', '"8"', '"오류"'], 0, 'matrix[1]은 두 번째 행 [4, 5, 6]이고, [2]는 세 번째 요소 6입니다.', '2D 리스트 인덱싱', '2D 리스트는 리스트의 리스트입니다. matrix[행][열]로 특정 요소에 접근합니다.', ARRAY['"2차원 배열"', '"행렬"', '"인덱싱"'], NULL, NULL),
(162, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'matrix = [[1, 2], [3, 4], [5, 6]]
col = [row[0] for row in matrix]
print(col)', ARRAY['"[1, 3, 5]"', '"[1, 2]"', '"[[1], [3], [5]]"', '"오류"'], 0, '각 행의 0번째 요소를 리스트 컴프리헨션으로 추출하면 첫 번째 열이 됩니다.', '열 추출', '2D 리스트에서 특정 열을 추출하려면 [row[열] for row in matrix] 패턴을 사용합니다.', ARRAY['"2D 리스트"', '"열 추출"', '"리스트 컴프리헨션"'], NULL, NULL),
(163, 'python', '17', '어려움', '다음 코드의 문제점은?', '# 3x3 영행렬을 만들려고 함
matrix = [[0] * 3] * 3
matrix[0][0] = 1
print(matrix)', ARRAY['"[[1,0,0],[1,0,0],[1,0,0]] — 모든 행이 같은 객체"', '"[[1,0,0],[0,0,0],[0,0,0]]"', '"오류"', '"[[1,1,1],[1,1,1],[1,1,1]]"'], 0, '[[0]*3]*3은 같은 리스트의 참조 3개를 만듭니다. 한 행을 수정하면 모든 행이 변경됩니다.', '2D 리스트 생성 함정', '[[값]*n]*m은 같은 리스트를 m번 참조합니다. [[값]*n for _ in range(m)]으로 독립적인 행을 만들어야 합니다.', ARRAY['"참조 복사"', '"얕은 복사"', '"리스트 생성"'], NULL, '{"wrong":"matrix = [[0]*3] * 3  # 같은 리스트 3개 참조","correct":"matrix = []\nfor _ in range(3):\n    matrix.append([0]*3)  # 독립적 3개"}'::jsonb),
(164, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'matrix = [[1,2,3],[4,5,6],[7,8,9]]
transposed = list(zip(*matrix))
print(transposed[0])', ARRAY['"(1, 4, 7)"', '"[1, 2, 3]"', '"(1, 2, 3)"', '"오류"'], 0, 'zip(*matrix)는 행렬을 전치합니다. 첫 번째 열 (1, 4, 7)이 첫 번째 행이 됩니다.', '행렬 전치 (zip)', 'zip(*matrix)는 *로 행을 언패킹하고 zip으로 열끼리 묶어 전치 행렬을 만듭니다.', ARRAY['"전치 행렬"', '"zip"', '"언패킹"'], NULL, NULL),
(165, 'python', '35', '쉬움', '다음 코드의 출력 결과는?', 'nums = [3, 1, 4, 1, 5]
print(sorted(nums))', ARRAY['"[1, 1, 3, 4, 5]"', '"[5, 4, 3, 1, 1]"', '"[3, 1, 4, 1, 5]"', '"오류"'], 0, 'sorted()는 새로운 정렬된 리스트를 반환합니다. 원본은 변경되지 않습니다.', 'sorted() 함수', 'sorted()는 새 리스트를 반환하고, list.sort()는 원본을 제자리에서 정렬합니다.', ARRAY['"sorted()"', '"sort()"', '"정렬"'], NULL, NULL),
(166, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'words = ["banana", "apple", "cherry"]
result = sorted(words, key=len)
print(result)', ARRAY['"[''apple'', ''banana'', ''cherry'']"', '"[''banana'', ''apple'', ''cherry'']"', '"[''cherry'', ''banana'', ''apple'']"', '"오류"'], 0, 'key=len으로 문자열 길이 기준 정렬합니다. apple(5), banana(6), cherry(6) 순서입니다.', 'key 매개변수로 정렬', 'sorted(리스트, key=함수)에서 key 함수의 반환값을 기준으로 정렬합니다.', ARRAY['"key 함수"', '"lambda"', '"커스텀 정렬"'], NULL, NULL),
(167, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'students = [("Alice", 85), ("Bob", 92), ("Charlie", 85)]
result = sorted(students, key=lambda x: (-x[1], x[0]))
print(result[0][0])', ARRAY['"Bob"', '"Alice"', '"Charlie"', '"오류"'], 0, '점수 내림차순(-x[1]), 같은 점수면 이름 오름차순(x[0])으로 정렬합니다. Bob이 92점으로 1등입니다.', '다중 기준 정렬', 'key에서 튜플을 반환하면 여러 기준으로 정렬합니다. 음수 부호로 내림차순을 구현할 수 있습니다.', ARRAY['"다중 정렬"', '"lambda"', '"튜플 비교"'], NULL, NULL),
(168, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'from functools import cmp_to_key
def compare(a, b):
    return len(a) - len(b)
words = ["hi", "hello", "hey"]
result = sorted(words, key=cmp_to_key(compare))
print(result)', ARRAY['"[''hi'', ''hey'', ''hello'']"', '"[''hello'', ''hey'', ''hi'']"', '"[''hey'', ''hi'', ''hello'']"', '"오류"'], 0, '비교 함수가 길이 차이를 반환하므로 짧은 것부터 정렬됩니다.', 'cmp_to_key', 'Python 3에서는 비교 함수 대신 key 함수를 사용합니다. cmp_to_key()로 비교 함수를 key 함수로 변환할 수 있습니다.', ARRAY['"cmp_to_key"', '"비교 함수"', '"functools"'], NULL, NULL),
(169, 'python', '32', '쉬움', '다음 코드의 출력 결과는?', 'def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))', ARRAY['"Hello, Alice!"', '"greet(Alice)"', '"None"', '"오류"'], 0, '함수가 f-string으로 인사 메시지를 만들어 반환하고, print()가 출력합니다.', '함수 정의와 호출', 'def 함수이름(매개변수): 로 함수를 정의하고, return으로 값을 반환합니다.', ARRAY['"def"', '"return"', '"함수 호출"'], 'functionStructure', NULL),
(170, 'python', '32', '쉬움', '다음 코드의 출력 결과는?', 'def add(a, b):
    return a + b

result = add(3, 5)
print(result)', ARRAY['"8"', '"35"', '"add(3, 5)"', '"오류"'], 0, 'add 함수가 3과 5를 더해 8을 반환합니다.', '매개변수와 반환값', '함수는 매개변수로 입력을 받고, return으로 결과를 반환합니다.', ARRAY['"매개변수"', '"return"', '"함수"'], 'functionVisualizer', NULL),
(171, 'python', '32', '보통', '다음 코드의 출력 결과는?', 'def process():
    print("hello")

result = process()
print(result)', ARRAY['"hello\nNone"', '"hello\nhello"', '"None"', '"오류"'], 0, 'process()는 ''hello''를 출력하지만 return이 없으므로 None을 반환합니다.', 'return 없는 함수', 'return 문이 없거나 return만 쓰면 함수는 None을 반환합니다. print()와 return을 혼동하지 마세요.', ARRAY['"None"', '"return"', '"print vs return"'], 'returnStructure', '{"wrong":"def func():\n    print(\"result\")  # 반환이 아닌 출력","correct":"def func():\n    return \"result\"  # 값을 반환"}'::jsonb),
(172, 'python', '32', '보통', '다음 코드의 출력 결과는?', 'def divide(a, b):
    if b == 0:
        return None
    return a / b

print(divide(10, 0))
print(divide(10, 2))', ARRAY['"None\n5.0"', '"오류"', '"0\n5.0"', '"None\n5"'], 0, 'b가 0이면 None을 조기 반환하고, 아니면 나눗셈 결과를 반환합니다.', '조기 반환 패턴', '함수 초반에 예외 조건을 검사하고 바로 return하는 것을 early return 패턴이라 합니다.', ARRAY['"early return"', '"가드 절"', '"None 반환"'], 'pyFunctionBuilder', NULL),
(173, 'python', '32', '어려움', '다음 코드의 출력 결과는?', 'def calc(a, b):
    return a + b, a * b

result = calc(3, 4)
print(type(result))', ARRAY['"<class ''tuple''>"', '"<class ''list''>"', '"<class ''int''>"', '"오류"'], 0, 'return으로 쉼표로 구분된 여러 값을 반환하면 튜플이 됩니다.', '다중 반환값', 'Python 함수는 return a, b로 여러 값을 튜플로 반환할 수 있습니다. sum, product = calc(3, 4)로 언패킹할 수 있습니다.', ARRAY['"다중 반환"', '"튜플"', '"언패킹"'], 'multipleReturnVisualizer', NULL),
(174, 'python', '34', '어려움', '다음 코드의 출력 결과는?', 'def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

c = counter()
print(c(), c(), c())', ARRAY['"1 2 3"', '"1 1 1"', '"0 1 2"', '"오류"'], 0, 'nonlocal로 외부 함수의 count를 수정합니다. 클로저로 상태가 유지되어 호출할 때마다 증가합니다.', '클로저와 nonlocal', '내부 함수가 외부 함수의 변수를 기억하는 것을 클로저라 합니다. nonlocal 키워드로 외부 변수를 수정할 수 있습니다.', ARRAY['"클로저"', '"nonlocal"', '"상태 유지"'], 'pyFunctionBuilder', NULL),
(175, 'python', '33', '쉬움', '다음 코드의 출력 결과는?', 'def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")', ARRAY['"Hello, Alice!"', '"Alice, Hello!"', '"오류"', '"None"'], 0, 'greeting에 기본값 ''Hello''가 설정되어 있으므로 생략 가능합니다.', '기본 매개변수', '매개변수에 기본값을 지정하면 호출 시 생략할 수 있습니다. 기본값이 있는 매개변수는 뒤쪽에 와야 합니다.', ARRAY['"기본값"', '"선택적 매개변수"', '"함수 시그니처"'], 'defaultValueVisualizer', NULL),
(176, 'python', '33', '쉬움', '다음 코드의 출력 결과는?', 'def info(name, age):
    print(f"{name} is {age}")

info(age=25, name="Bob")', ARRAY['"Bob is 25"', '"25 is Bob"', '"오류"', '"age is name"'], 0, '키워드 인자로 호출하면 순서에 관계없이 매개변수 이름으로 값을 전달합니다.', '키워드 인자', '함수 호출 시 매개변수이름=값 형태로 전달하면 순서에 관계없이 올바르게 매핑됩니다.', ARRAY['"키워드 인자"', '"위치 인자"', '"함수 호출"'], 'keywordArgVisualizer', NULL),
(177, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'def func(*args):
    print(len(args), sum(args))

func(1, 2, 3, 4)', ARRAY['"4 10"', '"(1, 2, 3, 4) 10"', '"오류"', '"1 2 3 4"'], 0, '*args는 모든 위치 인자를 튜플로 수집합니다. 4개 인자가 전달되어 길이 4, 합 10입니다.', '*args (가변 위치 인자)', '*args는 개수가 정해지지 않은 위치 인자를 튜플로 받습니다.', ARRAY['"*args"', '"가변 인자"', '"튜플"'], 'keywordArgVisualizer', NULL),
(178, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'def func(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}={v}", end=" ")

func(x=1, y=2, z=3)', ARRAY['"x=1 y=2 z=3 "', '"1 2 3 "', '"오류"', '"x y z "'], 0, '**kwargs는 모든 키워드 인자를 딕셔너리로 수집합니다.', '**kwargs (가변 키워드 인자)', '**kwargs는 개수가 정해지지 않은 키워드 인자를 딕셔너리로 받습니다.', ARRAY['"**kwargs"', '"딕셔너리"', '"가변 인자"'], 'keywordArgVisualizer', NULL),
(179, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'def func(a, b, *, c):
    print(a, b, c)

func(1, 2, c=3)', ARRAY['"1 2 3"', '"오류"', '"1 2"', '"(1, 2, 3)"'], 0, '* 뒤의 매개변수는 반드시 키워드 인자로 전달해야 합니다. c=3으로 올바르게 전달했습니다.', '키워드 전용 인자', '* 뒤에 오는 매개변수는 키워드로만 전달할 수 있습니다. func(1, 2, 3)은 오류가 됩니다.', ARRAY['"키워드 전용"', '"함수 시그니처"', '"API 설계"'], 'keywordArgVisualizer', NULL),
(180, 'python', '33', '어려움', '다음 코드의 출력 결과는?', 'def func(x=[]):
    x.append(1)
    return x

print(func())
print(func())', ARRAY['"[1]\n[1, 1]"', '"[1]\n[1]"', '"오류"', '"[1, 1]\n[1, 1]"'], 0, '가변 기본값은 함수 정의 시 한 번만 생성됩니다. 두 번째 호출에서도 같은 리스트에 추가됩니다.', '가변 기본값 함정', '리스트, 딕셔너리 등 가변 객체를 기본값으로 사용하면 호출 간 상태가 공유됩니다. None을 기본값으로 사용하세요.', ARRAY['"가변 기본값"', '"None 패턴"', '"함수 정의"'], 'defaultValueVisualizer', '{"wrong":"def func(x=[]):     # 위험!","correct":"def func(x=None):\n    if x is None:\n        x = []"}'::jsonb),
(181, 'python', '34', '어려움', '다음 코드의 출력 결과는?', 'def outer(x):
    def inner(y):
        return x + y
    return inner

add5 = outer(5)
print(add5(3), add5(10))', ARRAY['"8 15"', '"5 5"', '"오류"', '"3 10"'], 0, 'outer(5)는 x=5를 기억하는 inner 함수를 반환합니다. add5(3)은 5+3=8, add5(10)은 5+10=15입니다.', '함수 팩토리 (클로저)', '외부 함수가 내부 함수를 반환하면, 내부 함수는 외부 함수의 인자를 기억합니다. 이를 이용해 함수를 동적으로 생성할 수 있습니다.', ARRAY['"클로저"', '"고차 함수"', '"함수 팩토리"'], NULL, NULL),
(182, 'python', '34', '어려움', '다음 코드의 출력 결과는?', 'def apply(func, *args, **kwargs):
    return func(*args, **kwargs)

def add(a, b, c=0):
    return a + b + c

print(apply(add, 1, 2, c=10))', ARRAY['"13"', '"3"', '"오류"', '"12"'], 0, 'apply가 add(1, 2, c=10)을 호출합니다. 1 + 2 + 10 = 13입니다.', '함수를 인자로 전달', 'Python에서 함수는 일급 객체이므로 다른 함수의 인자로 전달할 수 있습니다. *args와 **kwargs로 인자를 전달(forwarding)합니다.', ARRAY['"일급 객체"', '"*args/**kwargs 전달"', '"고차 함수"'], NULL, NULL),
(183, 'python', '34', '쉬움', '다음 코드의 출력 결과는?', 'double = lambda x: x * 2
print(double(5))', ARRAY['"10"', '"5"', '"lambda"', '"오류"'], 0, 'lambda x: x * 2는 x를 받아 2배를 반환하는 익명 함수입니다.', 'lambda 함수', 'lambda 매개변수: 표현식으로 간단한 함수를 한 줄에 정의합니다. def 대신 짧은 함수에 사용합니다.', ARRAY['"lambda"', '"익명 함수"', '"함수형 프로그래밍"'], NULL, NULL),
(184, 'python', '35', '쉬움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
result = list(filter(lambda x: x > 3, nums))
print(result)', ARRAY['"[4, 5]"', '"[1, 2, 3]"', '"[True, True]"', '"오류"'], 0, 'filter()는 조건을 만족하는 요소만 남깁니다. x > 3인 4와 5만 남습니다.', 'filter()와 lambda', 'filter(함수, 이터러블)은 함수가 True를 반환하는 요소만 남기는 필터입니다.', ARRAY['"filter"', '"lambda"', '"리스트 컴프리헨션"'], 'mapFactory', NULL),
(185, 'python', '46', '보통', '다음 코드의 출력 결과는?', 'from functools import reduce
nums = [1, 2, 3, 4]
result = reduce(lambda a, b: a * b, nums)
print(result)', ARRAY['"24"', '"10"', '"4"', '"오류"'], 0, 'reduce는 왼쪽부터 누적 연산합니다. 1*2=2, 2*3=6, 6*4=24입니다.', 'reduce()', 'reduce(함수, 이터러블)은 두 요소씩 누적 연산하여 단일 값을 만듭니다. 합계, 곱, 최대값 등에 사용합니다.', ARRAY['"reduce"', '"functools"', '"누적 연산"'], 'mapFactory', NULL),
(186, 'python', '34', '보통', '다음 코드의 출력 결과는?', 'def make_multiplier(n):
    return lambda x: x * n

triple = make_multiplier(3)
print(triple(10))', ARRAY['"30"', '"10"', '"3"', '"오류"'], 0, 'make_multiplier(3)는 x * 3을 하는 lambda를 반환합니다. triple(10)은 10 * 3 = 30입니다.', 'lambda와 클로저', '함수가 lambda를 반환하면 외부 변수(n)를 기억하는 클로저가 생성됩니다.', ARRAY['"클로저"', '"lambda"', '"함수 팩토리"'], NULL, NULL),
(191, 'python', '35', '쉬움', '다음 코드의 출력 결과는?', 'x = 10
def func():
    x = 20
    print(x)

func()
print(x)', ARRAY['"20\n10"', '"20\n20"', '"10\n10"', '"오류"'], 0, '함수 안의 x는 지역 변수입니다. 함수 밖의 x(전역)와는 별개이므로 전역 x는 10 그대로입니다.', '지역 변수와 전역 변수', '함수 안에서 변수에 값을 할당하면 지역 변수가 생성됩니다. 전역 변수와 이름이 같아도 별개입니다.', ARRAY['"스코프"', '"지역 변수"', '"전역 변수"'], NULL, NULL),
(192, 'python', '35', '쉬움', '다음 코드의 출력 결과는?', 'x = 10
def func():
    global x
    x = 20

func()
print(x)', ARRAY['"20"', '"10"', '"오류"', '"None"'], 0, 'global 키워드로 전역 변수 x를 수정합니다. func() 호출 후 x는 20이 됩니다.', 'global 키워드', 'global 키워드를 사용하면 함수 안에서 전역 변수를 수정할 수 있습니다. 하지만 남용하면 코드 유지보수가 어려워집니다.', ARRAY['"global"', '"전역 변수"', '"부작용"'], NULL, NULL),
(193, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'print(abs(-5))
print(max(3, 1, 4))
print(min(3, 1, 4))', ARRAY['"5\n4\n1"', '"5\n3\n4"', '"-5\n4\n1"', '"오류"'], 0, 'abs()는 절댓값, max()는 최대값, min()은 최소값을 반환하는 내장 함수입니다.', '내장 함수 (abs, max, min)', 'Python은 import 없이 사용 가능한 내장 함수들을 제공합니다. abs(), max(), min(), len(), sum() 등이 있습니다.', ARRAY['"내장 함수"', '"abs"', '"max"', '"min"'], NULL, NULL),
(194, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
print(any(x > 4 for x in nums))
print(all(x > 0 for x in nums))', ARRAY['"True\nTrue"', '"False\nTrue"', '"True\nFalse"', '"False\nFalse"'], 0, 'any()는 하나라도 True면 True, all()은 모두 True여야 True입니다. 5 > 4이므로 any는 True, 모두 > 0이므로 all도 True입니다.', 'any()와 all()', 'any()는 OR 논리, all()은 AND 논리와 같습니다. 제너레이터 표현식과 함께 사용하면 효율적입니다.', ARRAY['"any"', '"all"', '"제너레이터 표현식"'], NULL, NULL),
(195, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'names = ["Alice", "Bob"]
ages = [25, 30]
result = list(zip(names, ages))
print(result)', ARRAY['"[(''Alice'', 25), (''Bob'', 30)]"', '"[[''Alice'', 25], [''Bob'', 30]]"', '"{''Alice'': 25, ''Bob'': 30}"', '"오류"'], 0, 'zip()은 여러 이터러블을 튜플로 묶습니다.', 'zip() 함수', 'zip(a, b)는 a와 b의 요소를 짝지어 튜플의 이터레이터를 반환합니다. 길이가 다르면 짧은 쪽에 맞춥니다.', ARRAY['"zip"', '"병렬 순회"', '"튜플"'], NULL, NULL),
(196, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'x = 5
def outer():
    x = 10
    def inner():
        print(x)
    inner()

outer()
print(x)', ARRAY['"10\n5"', '"5\n5"', '"10\n10"', '"오류"'], 0, 'inner()에서 x는 LEGB 규칙에 따라 enclosing scope(outer의 x=10)을 찾습니다. 전역 x는 5 그대로입니다.', 'LEGB 스코프 규칙', '변수를 찾는 순서: Local → Enclosing → Global → Built-in. 안쪽부터 바깥으로 검색합니다.', ARRAY['"LEGB"', '"스코프 체인"', '"중첩 함수"'], NULL, NULL),
(197, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'print(list(map(str, [1, 2, 3])))
print(list(map(int, ["1", "2", "3"])))', ARRAY['"[''1'', ''2'', ''3'']\n[1, 2, 3]"', '"[1, 2, 3]\n[''1'', ''2'', ''3'']"', '"오류"', '"[''1'', ''2'', ''3'']\n[''1'', ''2'', ''3'']"'], 0, 'map(str, ...)은 각 요소를 문자열로, map(int, ...)은 각 요소를 정수로 변환합니다.', 'map()으로 타입 변환', 'map(타입, 이터러블)은 일괄 타입 변환에 매우 유용합니다. input().split()의 결과를 정수로 바꿀 때 자주 사용합니다.', ARRAY['"map"', '"타입 변환"', '"input 처리"'], 'mapFactory', NULL),
(198, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'data = [3, 1, 4, 1, 5, 9]
print(sorted(set(data), reverse=True)[:3])', ARRAY['"[9, 5, 4]"', '"[9, 5, 4, 3, 1]"', '"[3, 1, 4]"', '"오류"'], 0, 'set으로 중복 제거 → sorted로 내림차순 정렬 → 슬라이싱으로 상위 3개를 가져옵니다.', '내장 함수 조합', 'set(), sorted(), 슬라이싱을 조합하면 ''고유한 상위 N개'' 같은 복잡한 로직을 한 줄에 표현할 수 있습니다.', ARRAY['"set"', '"sorted"', '"체이닝"'], NULL, NULL),
(199, 'python', '36', '쉬움', '다음 코드의 출력 결과는?', 'def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))', ARRAY['"120"', '"24"', '"5"', '"오류"'], 0, '5! = 5 × 4 × 3 × 2 × 1 = 120입니다. 재귀 호출로 n이 1이 될 때까지 곱합니다.', '재귀 함수', '자기 자신을 호출하는 함수를 재귀 함수라 합니다. 반드시 종료 조건(base case)이 있어야 합니다.', ARRAY['"재귀"', '"팩토리얼"', '"base case"'], NULL, NULL),
(200, 'python', '36', '보통', '다음 코드의 출력 결과는?', 'def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(6))', ARRAY['"8"', '"13"', '"5"', '"6"'], 0, '피보나치 수열: 0,1,1,2,3,5,8,... fib(6) = 8입니다.', '피보나치와 재귀', '피보나치 수열은 재귀의 대표적 예입니다. 단순 재귀는 중복 계산이 많아 비효율적이며, 메모이제이션으로 개선합니다.', ARRAY['"피보나치"', '"메모이제이션"', '"동적 프로그래밍"'], NULL, NULL),
(201, 'python', '36', '어려움', '다음 코드의 출력 결과는?', 'def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(flatten([1, [2, [3, 4]], 5]))', ARRAY['"[1, 2, 3, 4, 5]"', '"[[1], [2], [3, 4], [5]]"', '"[1, [2, [3, 4]], 5]"', '"오류"'], 0, '중첩된 리스트를 재귀적으로 펼칩니다. 리스트인 요소는 재귀 호출로 다시 펼칩니다.', '재귀적 리스트 펼치기', '중첩 깊이를 알 수 없는 리스트를 펼칠 때 재귀가 유용합니다. isinstance()로 리스트인지 확인합니다.', ARRAY['"재귀"', '"flatten"', '"isinstance"'], NULL, NULL),
(203, 'python', '37', '쉬움', '다음 코드의 출력 결과는?', 'try:
    print(10 / 0)
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다")', ARRAY['"0으로 나눌 수 없습니다"', '"오류 (프로그램 종료)"', '"0"', '"None"'], 0, '0으로 나누면 ZeroDivisionError가 발생하고, except 블록이 실행됩니다.', 'try-except 기본', 'try 블록에서 에러가 발생하면 except 블록이 실행됩니다. 프로그램이 중단되지 않고 에러를 처리할 수 있습니다.', ARRAY['"예외 처리"', '"ZeroDivisionError"', '"try-except"'], 'tryExceptFlow', NULL),
(204, 'python', '37', '쉬움', '다음 중 존재하지 않는 키에 접근할 때 발생하는 에러는?', 'd = {"a": 1}
print(d["b"])', ARRAY['"KeyError"', '"IndexError"', '"ValueError"', '"TypeError"'], 0, '딕셔너리에서 존재하지 않는 키에 접근하면 KeyError가 발생합니다.', 'KeyError', 'KeyError는 딕셔너리에 없는 키에 접근할 때 발생합니다. get() 메서드나 in 연산자로 예방할 수 있습니다.', ARRAY['"KeyError"', '"딕셔너리"', '"get()"'], 'errorTypesCards', NULL),
(205, 'python', '37', '쉬움', '다음 코드의 출력 결과는?', 'try:
    x = int("hello")
except ValueError:
    x = 0
print(x)', ARRAY['"0"', '"hello"', '"오류"', '"None"'], 0, '''hello''는 정수로 변환할 수 없어 ValueError가 발생하고, x에 0이 할당됩니다.', 'ValueError 처리', 'int()에 숫자가 아닌 문자열을 넣으면 ValueError가 발생합니다. try-except로 안전하게 처리합니다.', ARRAY['"ValueError"', '"int()"', '"입력 검증"'], 'tryExceptFlow', NULL),
(206, 'python', '37', '보통', '다음 코드의 출력 결과는?', 'try:
    x = 1 / 0
except ZeroDivisionError:
    print("A")
except Exception:
    print("B")
else:
    print("C")
finally:
    print("D")', ARRAY['"A\nD"', '"A\nB\nD"', '"B\nD"', '"C\nD"'], 0, 'ZeroDivisionError가 먼저 매칭되어 A 출력. else는 에러 없을 때만 실행. finally는 항상 실행되어 D 출력.', 'try-except-else-finally', 'else는 에러가 없을 때, finally는 에러 여부와 상관없이 항상 실행됩니다. 리소스 정리에 finally를 사용합니다.', ARRAY['"else"', '"finally"', '"리소스 정리"'], 'tryExceptFlow', NULL),
(207, 'python', '37', '보통', '다음 코드의 출력 결과는?', 'try:
    nums = [1, 2, 3]
    print(nums[5])
except IndexError as e:
    print(type(e).__name__)', ARRAY['"IndexError"', '"list index out of range"', '"오류"', '"5"'], 0, 'as e로 예외 객체를 받고, type(e).__name__으로 예외 클래스 이름을 출력합니다.', '예외 객체 접근', 'except 에러 as 변수: 로 예외 객체에 접근할 수 있습니다. 에러 메시지나 타입 정보를 활용할 수 있습니다.', ARRAY['"as"', '"예외 객체"', '"에러 메시지"'], 'errorTypesCards', NULL),
(208, 'python', '37', '보통', '다음 코드의 출력 결과는?', 'def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
    finally:
        print("done")

result = safe_divide(10, 0)
print(result)', ARRAY['"done\nNone"', '"None\ndone"', '"done\n0"', '"오류"'], 0, 'finally는 return 전에 실행됩니다. ''done''이 먼저 출력되고, result는 None입니다.', 'finally와 return', 'finally 블록은 return 문이 있어도 반드시 실행됩니다. 파일 닫기 등 정리 작업에 적합합니다.', ARRAY['"finally"', '"return"', '"리소스 관리"'], 'tryExceptFlow', NULL),
(209, 'python', '37', '보통', '다음 코드의 출력 결과는?', 'def validate_age(age):
    if age < 0:
        raise ValueError("나이는 음수일 수 없습니다")
    return age

try:
    validate_age(-1)
except ValueError as e:
    print(e)', ARRAY['"나이는 음수일 수 없습니다"', '"ValueError"', '"-1"', '"오류"'], 0, 'raise로 직접 예외를 발생시키고, except에서 에러 메시지를 출력합니다.', 'raise 문', 'raise 예외타입(메시지)으로 직접 예외를 발생시킬 수 있습니다. 입력 검증에 자주 사용됩니다.', ARRAY['"raise"', '"커스텀 에러"', '"입력 검증"'], 'errorTypesCards', NULL),
(211, 'python', '37', '어려움', '다음 코드의 출력 결과는?', 'def func():
    try:
        return 1
    finally:
        return 2

print(func())', ARRAY['"2"', '"1"', '"오류"', '"None"'], 0, 'finally의 return이 try의 return을 덮어씁니다. finally에서 return을 쓰는 것은 나쁜 관행입니다.', 'finally에서의 return (주의)', 'finally에서 return을 사용하면 try/except의 return을 덮어씁니다. 이는 혼란을 초래하므로 피해야 합니다.', ARRAY['"finally"', '"return 덮어쓰기"', '"안티패턴"'], 'tryExceptFlow', NULL),
(213, 'python', '37', '어려움', '다음 코드에서 여러 예외를 한 번에 잡는 올바른 방법은?', '# TypeError와 ValueError를 한 번에 잡으려면?', ARRAY['"except (TypeError, ValueError):"', '"except TypeError, ValueError:"', '"except TypeError and ValueError:"', '"except [TypeError, ValueError]:"'], 0, '여러 예외를 한 번에 잡으려면 괄호로 묶어 튜플 형태로 지정합니다.', '다중 예외 처리', 'except (에러1, 에러2): 형태로 여러 예외를 동시에 처리할 수 있습니다.', ARRAY['"다중 예외"', '"예외 그룹"', '"에러 처리"'], 'multiExceptFlow', NULL),
(214, 'python', '37', '어려움', '다음 코드의 출력 결과는?', 'try:
    try:
        raise ValueError("inner")
    except TypeError:
        print("caught TypeError")
except ValueError:
    print("caught ValueError")', ARRAY['"caught ValueError"', '"caught TypeError"', '"오류"', '"inner"'], 0, '내부 try에서 ValueError가 발생하지만 TypeError만 잡으므로, 외부 except에서 ValueError를 잡습니다.', '중첩 try-except', '내부 except에서 잡지 못한 예외는 외부 try-except로 전파됩니다.', ARRAY['"예외 전파"', '"중첩 try"', '"에러 처리"'], 'multiExceptFlow', NULL),
(215, 'python', '38', '쉬움', '파일을 읽는 가장 안전한 방법은?', '# 파일 읽기 방법', ARRAY['"with open(''file.txt'') as f:"', '"f = open(''file.txt'')"', '"read(''file.txt'')"', '"file.open(''file.txt'')"'], 0, 'with 문은 파일을 자동으로 닫아주므로 가장 안전합니다.', 'with open() 패턴', 'with open(파일) as f: 를 사용하면 블록을 벗어날 때 자동으로 파일이 닫힙니다. 에러가 발생해도 안전합니다.', ARRAY['"with문"', '"파일 닫기"', '"컨텍스트 매니저"'], 'memoryVsFile', '{"wrong":"f = open(\"file.txt\")\ndata = f.read()\nf.close()  # 에러 시 닫히지 않을 수 있음","correct":"with open(\"file.txt\") as f:\n    data = f.read()  # 자동으로 닫힘"}'::jsonb),
(216, 'python', '38', '쉬움', '파일의 모든 줄을 리스트로 읽는 메서드는?', 'with open("data.txt") as f:
    lines = f.___()', ARRAY['"readlines"', '"readline"', '"read"', '"lines"'], 0, 'readlines()는 모든 줄을 리스트로 반환합니다. 각 요소는 줄바꿈 문자를 포함합니다.', 'read vs readline vs readlines', 'read()는 전체 문자열, readline()은 한 줄, readlines()는 모든 줄의 리스트를 반환합니다.', ARRAY['"read()"', '"readline()"', '"readlines()"'], 'readMethodDemo', NULL),
(217, 'python', '38', '보통', '다음 코드에서 파일에 텍스트를 쓰는 올바른 방법은?', '# 파일에 "Hello" 쓰기', ARRAY['"with open(\"f.txt\", \"w\") as f:
    f.write(\"Hello\")"', '"with open(\"f.txt\") as f:
    f.write(\"Hello\")"', '"with open(\"f.txt\", \"r\") as f:
    f.write(\"Hello\")"', '"write(\"f.txt\", \"Hello\")"'], 0, '파일 쓰기에는 ''w'' 모드를 지정해야 합니다. 기본 모드는 ''r''(읽기)이므로 쓰기 시 에러가 발생합니다.', '파일 모드', '''r''은 읽기, ''w''는 쓰기(덮어쓰기), ''a''는 추가, ''x''는 새 파일 생성 전용 모드입니다.', ARRAY['"파일 모드"', '"write()"', '"읽기/쓰기"'], 'fileModeSimulator', NULL),
(218, 'python', '38', '보통', '다음 코드의 동작은?', 'with open("log.txt", "a") as f:
    f.write("new line\n")', ARRAY['"파일 끝에 내용을 추가한다"', '"파일 내용을 덮어쓴다"', '"파일을 읽는다"', '"오류가 발생한다"'], 0, '''a'' (append) 모드는 기존 내용을 유지하고 파일 끝에 새 내용을 추가합니다.', 'append 모드 (''a'')', '''a'' 모드는 파일이 있으면 끝에 추가하고, 없으면 새로 생성합니다. ''w''와 달리 기존 내용을 보존합니다.', ARRAY['"append"', '"write 모드"', '"로그 파일"'], 'fileModeSimulator', '{"wrong":"open(\"log.txt\", \"w\")  # 기존 내용 삭제!","correct":"open(\"log.txt\", \"a\")  # 기존 내용 유지하며 추가"}'::jsonb),
(219, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'import json
data = {"name": "Alice", "age": 25}
json_str = json.dumps(data)
print(type(json_str))', ARRAY['"<class ''str''>"', '"<class ''dict''>"', '"<class ''json''>"', '"오류"'], 0, 'json.dumps()는 딕셔너리를 JSON 형식의 문자열로 변환합니다.', 'json.dumps()와 json.loads()', 'dumps()는 Python 객체 → JSON 문자열, loads()는 JSON 문자열 → Python 객체로 변환합니다.', ARRAY['"json"', '"직렬화"', '"API"'], NULL, NULL),
(220, 'python', '45', '어려움', '다음 코드에서 CSV 파일을 올바르게 읽는 방법은?', 'import csv
with open("data.csv") as f:
    reader = csv._____(f)
    for row in reader:
        print(row)', ARRAY['"reader"', '"read"', '"load"', '"parse"'], 0, 'csv.reader()는 CSV 파일을 읽어 각 행을 리스트로 반환하는 이터레이터를 생성합니다.', 'csv 모듈', 'csv.reader()는 CSV를 읽고, csv.writer()는 CSV를 씁니다. DictReader/DictWriter는 헤더가 있는 CSV에 편리합니다.', ARRAY['"csv"', '"데이터 처리"', '"DictReader"'], NULL, NULL),
(221, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'import os
path = "/home/user/docs/file.txt"
print(os.path.basename(path))
print(os.path.dirname(path))', ARRAY['"file.txt\n/home/user/docs"', '"/home/user/docs\nfile.txt"', '"file\n.txt"', '"오류"'], 0, 'basename()은 파일 이름, dirname()은 디렉토리 경로를 반환합니다.', 'os.path 유틸리티', 'os.path 모듈은 경로 분석 함수를 제공합니다. basename, dirname, join, exists 등이 자주 사용됩니다.', ARRAY['"os.path"', '"파일 경로"', '"pathlib"'], NULL, NULL),
(222, 'python', '38', '어려움', '파일을 읽을 때 인코딩을 지정하는 올바른 방법은?', '# UTF-8 인코딩으로 파일 읽기', ARRAY['"open(\"f.txt\", encoding=\"utf-8\")"', '"open(\"f.txt\", \"utf-8\")"', '"open(\"f.txt\").encode(\"utf-8\")"', '"open(\"f.txt\", mode=\"utf-8\")"'], 0, 'encoding 키워드 인자로 파일 인코딩을 지정합니다.', '파일 인코딩', 'open()의 encoding 매개변수로 문자 인코딩을 지정합니다. 한글 파일은 ''utf-8''이나 ''euc-kr''을 사용합니다.', ARRAY['"인코딩"', '"UTF-8"', '"UnicodeDecodeError"'], NULL, NULL),
(223, 'python', '41', '쉬움', '다음 코드의 출력 결과는?', 'class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("Buddy")
print(d.name)', ARRAY['"Buddy"', '"Dog"', '"name"', '"오류"'], 0, '__init__은 생성자 메서드로, 객체가 만들어질 때 자동으로 호출됩니다. self.name에 ''Buddy''가 저장됩니다.', '__init__과 self', '__init__은 객체 초기화 메서드입니다. self는 생성된 객체 자신을 가리킵니다.', ARRAY['"클래스"', '"__init__"', '"self"'], 'classBoonguh', NULL),
(224, 'python', '41', '쉬움', '다음 중 클래스와 객체에 대한 설명으로 올바른 것은?', 'class Car:
    pass

my_car = Car()', ARRAY['"Car는 클래스, my_car는 객체(인스턴스)"', '"Car는 객체, my_car는 클래스"', '"둘 다 클래스"', '"둘 다 객체"'], 0, '클래스는 설계도, 객체(인스턴스)는 그 설계도로 만든 실제 물건입니다.', '클래스와 인스턴스', '클래스는 객체를 만드는 틀(blueprint)입니다. 클래스이름()으로 인스턴스(객체)를 생성합니다.', ARRAY['"클래스"', '"인스턴스"', '"OOP"'], 'classBoonguh', NULL),
(225, 'python', '41', '보통', '다음 코드의 출력 결과는?', 'class Counter:
    count = 0
    def __init__(self):
        Counter.count += 1

a = Counter()
b = Counter()
c = Counter()
print(Counter.count)', ARRAY['"3"', '"1"', '"0"', '"오류"'], 0, 'count는 클래스 변수로 모든 인스턴스가 공유합니다. 3개 인스턴스를 만들었으므로 3입니다.', '클래스 변수 vs 인스턴스 변수', '클래스 변수는 모든 인스턴스가 공유하고, 인스턴스 변수(self.변수)는 각 인스턴스에 고유합니다.', ARRAY['"클래스 변수"', '"인스턴스 변수"', '"공유 상태"'], 'classBoonguh', NULL),
(226, 'python', '42', '보통', '다음 코드의 출력 결과는?', 'class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(p)', ARRAY['"(3, 4)"', '"<Point object>"', '"Point(3, 4)"', '"오류"'], 0, '__str__ 메서드는 print()나 str()에서 호출되어 객체의 문자열 표현을 반환합니다.', '__str__ 매직 메서드', '__str__을 정의하면 print(객체) 시 원하는 형태로 출력됩니다. 정의하지 않으면 기본 메모리 주소가 출력됩니다.', ARRAY['"__str__"', '"__repr__"', '"매직 메서드"'], 'pyClassBuilder', NULL),
(227, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)', ARRAY['"Vector(4, 6)"', '"오류"', '"(4, 6)"', '"Vector(1, 2) + Vector(3, 4)"'], 0, '__add__를 정의하면 + 연산자를 사용할 수 있습니다. 각 좌표를 더한 새 Vector를 반환합니다.', '연산자 오버로딩', '__add__, __sub__, __eq__ 등 매직 메서드를 정의하면 연산자를 커스텀 클래스에서 사용할 수 있습니다.', ARRAY['"연산자 오버로딩"', '"__add__"', '"매직 메서드"'], 'pyClassBuilder', NULL),
(229, 'python', '42', '쉬움', '다음 코드의 출력 결과는?', 'class Circle:
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2

c = Circle(5)
print(c.area())', ARRAY['"78.5"', '"31.4"', '"15.7"', '"오류"'], 0, '3.14 × 5² = 3.14 × 25 = 78.5입니다. 인스턴스 메서드는 self를 통해 속성에 접근합니다.', '인스턴스 메서드', '클래스 안에서 def 메서드(self, ...): 로 정의하는 함수입니다. self를 통해 인스턴스 속성에 접근합니다.', ARRAY['"인스턴스 메서드"', '"self"', '"속성 접근"'], NULL, NULL),
(230, 'python', '42', '쉬움', '다음 코드의 출력 결과는?', 'class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
    def get_balance(self):
        return self.balance

acc = BankAccount(100)
acc.deposit(50)
print(acc.get_balance())', ARRAY['"150"', '"100"', '"50"', '"오류"'], 0, '초기 잔액 100에 50을 입금하면 150이 됩니다.', '캡슐화 기초', '객체의 데이터(속성)와 그를 조작하는 메서드를 하나의 클래스에 묶는 것을 캡슐화라 합니다.', ARRAY['"캡슐화"', '"getter"', '"상태 관리"'], NULL, NULL),
(234, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Stack:
    def __init__(self):
        self._items = []
    def push(self, item):
        self._items.append(item)
        return self
    def pop(self):
        return self._items.pop()
    def __len__(self):
        return len(self._items)

s = Stack()
s.push(1).push(2).push(3)
print(len(s))', ARRAY['"3"', '"1"', '"오류"', '"None"'], 0, 'push()가 self를 반환하므로 메서드 체이닝이 가능합니다. __len__으로 len()을 지원합니다.', '메서드 체이닝과 __len__', 'self를 반환하면 메서드를 연속 호출(체이닝)할 수 있습니다. __len__을 정의하면 len() 함수를 사용할 수 있습니다.', ARRAY['"메서드 체이닝"', '"__len__"', '"fluent interface"'], NULL, NULL),
(235, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    def __eq__(self, other):
        return self.grade == other.grade
    def __lt__(self, other):
        return self.grade < other.grade

students = [Student("A", 85), Student("B", 92), Student("C", 78)]
students.sort()
print([s.name for s in students])', ARRAY['"[''C'', ''A'', ''B'']"', '"[''A'', ''B'', ''C'']"', '"[''B'', ''A'', ''C'']"', '"오류"'], 0, '__lt__이 정의되어 있으므로 grade 기준으로 오름차순 정렬됩니다. 78(C) < 85(A) < 92(B).', '비교 매직 메서드', '__eq__, __lt__, __gt__ 등을 정의하면 ==, <, > 연산자와 sort()를 커스텀 클래스에서 사용할 수 있습니다.', ARRAY['"__lt__"', '"__eq__"', '"정렬 가능 클래스"'], NULL, NULL),
(236, 'python', '42', '쉬움', '다음 코드의 출력 결과는?', 'class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "멍멍!"

d = Dog()
print(d.speak())', ARRAY['"멍멍!"', '"..."', '"오류"', '"None"'], 0, 'Dog 클래스가 Animal의 speak()을 오버라이딩합니다. Dog 인스턴스는 ''멍멍!''을 반환합니다.', '상속과 오버라이딩', '자식 클래스는 부모 클래스의 메서드를 재정의(오버라이딩)할 수 있습니다. class 자식(부모): 형태로 상속합니다.', ARRAY['"상속"', '"오버라이딩"', '"다형성"'], NULL, NULL),
(237, 'python', '42', '쉬움', '다음 코드의 출력 결과는?', 'class Shape:
    def __init__(self, color):
        self.color = color

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius

c = Circle("red", 5)
print(c.color, c.radius)', ARRAY['"red 5"', '"오류"', '"None 5"', '"red None"'], 0, 'super().__init__(color)로 부모 클래스의 초기화를 호출하고, 추가 속성 radius를 설정합니다.', 'super()로 부모 호출', 'super().__init__(...)으로 부모 클래스의 __init__을 호출합니다. 부모의 속성을 상속받으면서 자식만의 속성을 추가합니다.', ARRAY['"super()"', '"__init__"', '"상속 초기화"'], NULL, NULL),
(238, 'python', '42', '보통', '다음 코드의 출력 결과는?', 'class A:
    def greet(self):
        return "A"

class B(A):
    pass

class C(B):
    pass

c = C()
print(c.greet())', ARRAY['"A"', '"오류"', '"C"', '"None"'], 0, 'C → B → A 순서로 메서드를 찾습니다. C와 B에 greet이 없으므로 A의 greet이 호출됩니다.', '메서드 해석 순서 (MRO)', '메서드를 찾을 때 자식 → 부모 → 조부모 순서(MRO)로 검색합니다. 클래스.__mro__로 확인할 수 있습니다.', ARRAY['"MRO"', '"다단계 상속"', '"메서드 검색"'], NULL, NULL),
(239, 'python', '42', '보통', '다음 코드의 출력 결과는?', 'class Animal:
    def __init__(self, name):
        self.name = name
    def info(self):
        return f"{self.name}"

class Dog(Animal):
    def info(self):
        return f"{super().info()} (개)"

d = Dog("Buddy")
print(d.info())', ARRAY['"Buddy (개)"', '"Buddy"', '"(개)"', '"오류"'], 0, 'super().info()로 부모의 info()를 호출하고, 그 결과에 '' (개)''를 추가합니다.', 'super()로 부모 메서드 확장', '오버라이딩할 때 super().메서드()로 부모의 동작을 유지하면서 추가 기능을 넣을 수 있습니다.', ARRAY['"super()"', '"메서드 확장"', '"오버라이딩"'], NULL, NULL),
(240, 'python', '42', '보통', '다음 코드의 출력 결과는?', 'class A:
    pass
class B(A):
    pass

b = B()
print(isinstance(b, A))
print(issubclass(B, A))', ARRAY['"True\nTrue"', '"False\nTrue"', '"True\nFalse"', '"False\nFalse"'], 0, 'b는 A의 인스턴스이기도 합니다(상속). B는 A의 서브클래스입니다.', 'isinstance와 issubclass', 'isinstance(객체, 클래스)는 객체가 해당 클래스의 인스턴스인지, issubclass(자식, 부모)는 상속 관계를 확인합니다.', ARRAY['"isinstance"', '"issubclass"', '"타입 검사"'], NULL, NULL),
(241, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.method())', ARRAY['"B"', '"A"', '"C"', '"오류"'], 0, '다중 상속에서 MRO는 D → B → C → A 순서입니다. B에 method가 있으므로 ''B''를 반환합니다.', '다중 상속과 MRO', 'Python은 C3 선형화 알고리즘으로 MRO를 결정합니다. class D(B, C)에서 B가 C보다 먼저 검색됩니다.', ARRAY['"다중 상속"', '"MRO"', '"다이아몬드 문제"'], NULL, NULL),
(243, 'python', '44', '쉬움', '다음 코드의 출력 결과는?', 'class Cat:
    def speak(self):
        return "야옹"

class Dog:
    def speak(self):
        return "멍멍"

for animal in [Cat(), Dog()]:
    print(animal.speak(), end=" ")', ARRAY['"야옹 멍멍 "', '"오류"', '"야옹 야옹 "', '"멍멍 멍멍 "'], 0, '같은 메서드 이름 speak()을 다른 클래스에서 다르게 구현합니다. 이것이 다형성입니다.', '다형성 (Polymorphism)', '같은 인터페이스(메서드 이름)를 가진 다른 클래스의 객체를 동일한 방식으로 사용할 수 있는 것이 다형성입니다.', ARRAY['"다형성"', '"덕 타이핑"', '"인터페이스"'], NULL, NULL),
(244, 'python', '44', '보통', 'Python의 ''덕 타이핑''의 의미는?', '# Duck Typing이란?', ARRAY['"객체의 타입보다 메서드/속성의 존재가 중요하다"', '"모든 클래스가 Duck을 상속해야 한다"', '"타입 검사를 반드시 해야 한다"', '"상속이 필수이다"'], 0, '''오리처럼 걷고 꽥꽥거리면 오리다'' — 타입이 아니라 동작(메서드)이 있으면 사용 가능합니다.', '덕 타이핑 (Duck Typing)', 'Python은 객체의 실제 타입보다 필요한 메서드/속성이 있는지를 중요시합니다. 상속 없이도 다형성이 가능합니다.', ARRAY['"덕 타이핑"', '"EAFP"', '"다형성"'], NULL, NULL),
(245, 'python', '44', '보통', '다음 코드의 출력 결과는?', 'class Logger:
    def log(self, msg):
        print(f"LOG: {msg}")

class ErrorLogger(Logger):
    def log(self, msg):
        print(f"ERROR: {msg}")

def process(logger):
    logger.log("something happened")

process(ErrorLogger())', ARRAY['"ERROR: something happened"', '"LOG: something happened"', '"오류"', '"None"'], 0, 'ErrorLogger의 log()가 호출됩니다. process()는 어떤 logger든 log() 메서드만 있으면 동작합니다.', '다형성과 의존성 주입', '함수가 특정 클래스가 아닌 인터페이스(메서드)에 의존하면, 다양한 구현을 전달할 수 있습니다.', ARRAY['"의존성 주입"', '"다형성"', '"느슨한 결합"'], NULL, NULL),
(246, 'python', '44', '어려움', '다음 코드의 출력 결과는?', 'class Base:
    def __init__(self):
        self.setup()
    def setup(self):
        self.x = 10

class Child(Base):
    def setup(self):
        self.x = 20

c = Child()
print(c.x)', ARRAY['"20"', '"10"', '"오류"', '"None"'], 0, 'Base.__init__에서 self.setup()을 호출하지만 self는 Child 인스턴스이므로 Child.setup()이 실행됩니다.', '생성자에서의 다형성', '부모 __init__에서 호출하는 메서드도 self가 자식 인스턴스면 자식의 오버라이딩된 메서드가 호출됩니다.', ARRAY['"동적 바인딩"', '"self"', '"오버라이딩"'], NULL, NULL),
(247, 'python', '44', '어려움', '다음 코드의 출력 결과는?', 'class Iterable:
    def __init__(self, data):
        self.data = data
        self.index = 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        val = self.data[self.index]
        self.index += 1
        return val

for x in Iterable([10, 20, 30]):
    print(x, end=" ")', ARRAY['"10 20 30 "', '"오류"', '"[10, 20, 30]"', '"None"'], 0, '__iter__와 __next__를 구현하면 for 루프에서 사용할 수 있는 이터러블이 됩니다.', '이터레이터 프로토콜', '__iter__와 __next__를 구현하면 for 루프에서 사용 가능합니다. StopIteration으로 종료를 알립니다.', ARRAY['"이터레이터"', '"__iter__"', '"__next__"'], NULL, NULL),
(249, 'python', '45', '쉬움', '다음 코드에서 math 모듈의 함수를 사용하는 올바른 방법은?', '# math 모듈에서 sqrt 사용', ARRAY['"import math\nmath.sqrt(16)"', '"include math\nmath.sqrt(16)"', '"using math\nmath.sqrt(16)"', '"require math\nmath.sqrt(16)"'], 0, 'Python에서는 import 키워드로 모듈을 가져옵니다.', 'import 문', 'import 모듈이름으로 모듈을 가져오고, 모듈이름.함수()로 사용합니다.', ARRAY['"import"', '"모듈"', '"네임스페이스"'], NULL, NULL),
(250, 'python', '45', '쉬움', '다음 코드의 출력 결과는?', 'from math import sqrt, pi
print(round(sqrt(16)))
print(round(pi, 2))', ARRAY['"4\n3.14"', '"4.0\n3.14159"', '"오류"', '"sqrt(16)\npi"'], 0, 'from ... import로 특정 함수/상수만 가져올 수 있습니다. sqrt(16)=4.0, round(4.0)=4, round(pi,2)=3.14.', 'from ... import', 'from 모듈 import 이름으로 특정 함수나 변수만 직접 가져올 수 있습니다. 모듈이름. 없이 사용 가능합니다.', ARRAY['"from import"', '"선택적 임포트"', '"네임스페이스"'], NULL, NULL),
(251, 'python', '45', '보통', '다음 코드에서 __name__의 역할은?', 'if __name__ == "__main__":
    print("직접 실행됨")', ARRAY['"파일이 직접 실행될 때만 코드를 실행한다"', '"항상 실행된다"', '"import될 때만 실행된다"', '"오류가 발생한다"'], 0, '__name__은 직접 실행 시 ''__main__''이고, import 시 모듈 이름입니다. 이 패턴으로 직접 실행과 import를 구분합니다.', 'if __name__ == ''__main__''', '이 관용구는 파일이 직접 실행될 때만 특정 코드를 실행하고, 다른 파일에서 import할 때는 실행하지 않게 합니다.', ARRAY['"__name__"', '"__main__"', '"모듈 실행"'], NULL, NULL),
(252, 'python', '45', '보통', '다음 코드를 실행한 결과에 대한 설명으로 올바른 것은?', 'import random
random.seed(42)
print(random.randint(1, 10))
random.seed(42)
print(random.randint(1, 10))', ARRAY['"같은 숫자 두 번"', '"다른 숫자 두 번"', '"오류"', '"42 42"'], 0, '같은 seed를 설정하면 같은 난수 시퀀스가 생성됩니다. 테스트에서 재현 가능한 결과가 필요할 때 사용합니다.', 'random.seed()', 'seed()로 난수 생성기를 초기화하면 항상 같은 결과를 얻을 수 있습니다. 디버깅과 테스트에 유용합니다.', ARRAY['"random"', '"seed"', '"재현성"'], NULL, NULL),
(253, 'python', '45', '보통', '다음 코드의 출력 결과는?', 'import os
print(os.path.join("folder", "subfolder", "file.txt"))', ARRAY['"folder/subfolder/file.txt"', '"folder\subfolder\file.txt"', '"foldersubfolderfile.txt"', '"오류"'], 0, 'os.path.join()은 OS에 맞는 경로 구분자로 경로를 결합합니다. (macOS/Linux에서는 /)', 'os.path.join()', 'os.path.join()은 운영체제에 맞는 경로 구분자를 자동으로 사용합니다. 문자열 결합 대신 이것을 사용하세요.', ARRAY['"os.path"', '"경로 결합"', '"크로스 플랫폼"'], NULL, NULL),
(254, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'import datetime
dt = datetime.datetime(2024, 3, 15)
print(dt.strftime("%Y년 %m월 %d일"))', ARRAY['"2024년 03월 15일"', '"2024-03-15"', '"March 15, 2024"', '"오류"'], 0, 'strftime()은 날짜를 지정된 형식의 문자열로 변환합니다. %Y는 4자리 연도, %m은 월, %d는 일입니다.', 'datetime과 strftime()', 'datetime 모듈로 날짜/시간을 다루고, strftime()으로 원하는 형식의 문자열로 변환합니다.', ARRAY['"datetime"', '"strftime"', '"날짜 형식"'], NULL, NULL),
(255, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'import re
text = "전화번호: 010-1234-5678"
pattern = r"\d{3}-\d{4}-\d{4}"
match = re.search(pattern, text)
print(match.group())', ARRAY['"010-1234-5678"', '"전화번호:"', '"오류"', '"None"'], 0, '정규식 \d{3}-\d{4}-\d{4}는 전화번호 패턴에 매칭됩니다. group()은 매칭된 문자열을 반환합니다.', 're 모듈 (정규식)', 're.search()는 문자열에서 패턴을 찾고, group()으로 매칭된 부분을 가져옵니다.', ARRAY['"정규식"', '"re.search"', '"패턴 매칭"'], NULL, NULL),
(256, 'python', '45', '어려움', '다음 코드의 출력 결과는?', 'from pathlib import Path
p = Path("/home/user/docs/file.txt")
print(p.suffix)
print(p.stem)', ARRAY['".txt\nfile"', '"file.txt\n/home/user/docs"', '".txt\nfile.txt"', '"오류"'], 0, 'suffix는 확장자(.txt), stem은 확장자를 뺀 파일 이름(file)입니다.', 'pathlib.Path', 'pathlib은 객체지향적 경로 처리를 제공합니다. os.path보다 직관적이고 현대적인 방법입니다.', ARRAY['"pathlib"', '"Path"', '"파일 경로"'], NULL, NULL),
(257, 'python', '46', '쉬움', '다음 코드의 출력 결과는?', 'import math
print(math.ceil(4.2))
print(math.floor(4.8))', ARRAY['"5\n4"', '"4\n5"', '"5\n5"', '"4\n4"'], 0, 'ceil()은 올림, floor()는 내림입니다. 4.2의 올림은 5, 4.8의 내림은 4입니다.', 'math.ceil()과 math.floor()', 'ceil()은 올림(천장), floor()는 내림(바닥)을 수행합니다. round()와는 다른 동작입니다.', ARRAY['"math"', '"올림"', '"내림"'], NULL, NULL),
(258, 'python', '46', '쉬움', '다음 코드의 출력 결과는?', 'from collections import Counter
colors = ["red", "blue", "red", "green", "blue", "red"]
c = Counter(colors)
print(c.most_common(1))', ARRAY['"[(''red'', 3)]"', '"red"', '"3"', '"[(''blue'', 2)]"'], 0, 'Counter는 요소의 빈도를 셉니다. most_common(1)은 가장 많은 1개를 반환합니다.', 'collections.Counter', 'Counter는 해시 가능한 객체의 빈도를 세는 딕셔너리 하위 클래스입니다. most_common()으로 상위 N개를 가져올 수 있습니다.', ARRAY['"Counter"', '"빈도 카운터"', '"collections"'], NULL, NULL),
(259, 'python', '46', '보통', '다음 코드의 출력 결과는?', 'from itertools import chain
a = [1, 2]
b = [3, 4]
c = [5, 6]
result = list(chain(a, b, c))
print(result)', ARRAY['"[1, 2, 3, 4, 5, 6]"', '"[[1,2],[3,4],[5,6]]"', '"[1, 2, [3, 4], [5, 6]]"', '"오류"'], 0, 'itertools.chain()은 여러 이터러블을 하나로 연결합니다.', 'itertools.chain()', 'chain(a, b, c)은 a, b, c를 순서대로 이어붙인 이터레이터를 반환합니다. 리스트 + 연산보다 메모리 효율적입니다.', ARRAY['"itertools"', '"chain"', '"이터레이터"'], NULL, NULL),
(260, 'python', '46', '보통', '다음 코드의 출력 결과는?', 'from collections import OrderedDict
d = OrderedDict()
d["b"] = 2
d["a"] = 1
d["c"] = 3
d.move_to_end("b")
print(list(d.keys()))', ARRAY['"[''a'', ''c'', ''b'']"', '"[''b'', ''a'', ''c'']"', '"[''a'', ''b'', ''c'']"', '"오류"'], 0, 'move_to_end(''b'')는 ''b''를 마지막으로 이동시킵니다.', 'OrderedDict', 'OrderedDict는 삽입 순서를 보장하며 move_to_end() 등 순서 조작 메서드를 제공합니다.', ARRAY['"OrderedDict"', '"collections"', '"순서 보장"'], NULL, NULL),
(261, 'python', '46', '어려움', '다음 코드의 출력 결과는?', 'from itertools import groupby
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))', ARRAY['"A [(''A'', 1), (''A'', 2)]\nB [(''B'', 3), (''B'', 4)]"', '"A [1, 2]\nB [3, 4]"', '"오류"', '"{A: [1, 2], B: [3, 4]}"'], 0, 'groupby()는 연속된 같은 키를 가진 요소를 그룹화합니다. 데이터가 이미 키 순서로 정렬되어야 합니다.', 'itertools.groupby()', 'groupby()는 연속된 동일 키 요소를 그룹화합니다. 정렬되지 않은 데이터에는 먼저 sorted()를 적용해야 합니다.', ARRAY['"groupby"', '"itertools"', '"그룹화"'], NULL, NULL),
(262, 'python', '46', '어려움', '다음 코드의 출력 결과는?', 'import heapq
nums = [5, 1, 8, 3, 2]
heapq.heapify(nums)
print(heapq.heappop(nums))
print(heapq.heappop(nums))', ARRAY['"1\n2"', '"5\n1"', '"8\n5"', '"오류"'], 0, 'heapq는 최소 힙을 구현합니다. heapify로 힙으로 만들고, heappop으로 최소값을 꺼냅니다.', 'heapq 모듈', 'heapq는 최소 힙(우선순위 큐)을 제공합니다. heappush()로 추가, heappop()으로 최솟값을 O(log n)에 추출합니다.', ARRAY['"heapq"', '"우선순위 큐"', '"최소 힙"'], NULL, NULL),
(263, 'python', '46', '쉬움', 'pip으로 패키지를 설치하는 올바른 명령어는?', '# requests 패키지 설치', ARRAY['"pip install requests"', '"pip add requests"', '"pip get requests"', '"python install requests"'], 0, 'pip install 패키지이름으로 PyPI에서 패키지를 설치합니다.', 'pip install', 'pip은 Python 패키지 관리자입니다. pip install로 설치, pip uninstall로 제거, pip list로 목록을 확인합니다.', ARRAY['"pip"', '"PyPI"', '"패키지 관리"'], NULL, NULL),
(264, 'python', '46', '쉬움', 'requirements.txt 파일의 용도는?', '# requirements.txt
requests==2.31.0
numpy>=1.24.0', ARRAY['"프로젝트에 필요한 패키지 목록을 기록한다"', '"Python 코드를 저장한다"', '"설치된 패키지를 삭제한다"', '"테스트 결과를 저장한다"'], 0, 'requirements.txt에 프로젝트의 의존 패키지를 기록하고, pip install -r requirements.txt로 일괄 설치합니다.', 'requirements.txt', '프로젝트의 의존성을 requirements.txt에 기록합니다. pip freeze > requirements.txt로 현재 환경을 저장할 수 있습니다.', ARRAY['"requirements.txt"', '"의존성 관리"', '"pip freeze"'], NULL, NULL),
(265, 'python', '46', '보통', '가상환경(venv)의 주요 목적은?', '# python -m venv myenv', ARRAY['"프로젝트별로 독립된 패키지 환경을 만든다"', '"Python 실행 속도를 높인다"', '"코드를 암호화한다"', '"자동으로 테스트를 실행한다"'], 0, '가상환경은 프로젝트마다 독립된 패키지 환경을 제공합니다. 서로 다른 버전의 패키지를 충돌 없이 사용할 수 있습니다.', '가상환경 (venv)', 'python -m venv 이름으로 가상환경을 만들고, source 이름/bin/activate로 활성화합니다. 프로젝트 간 패키지 충돌을 방지합니다.', ARRAY['"venv"', '"가상환경"', '"패키지 격리"'], NULL, NULL),
(266, 'python', '46', '보통', 'pip install requests==2.28.0 에서 ==의 의미는?', 'pip install requests==2.28.0', ARRAY['"정확히 2.28.0 버전을 설치한다"', '"2.28.0 이상을 설치한다"', '"2.28.0 이하를 설치한다"', '"최신 버전을 설치한다"'], 0, '==는 정확한 버전을 지정합니다. >=는 이상, <=는 이하, ~=는 호환 버전입니다.', '버전 지정자', '==는 정확한 버전, >=는 최소 버전, ~=는 호환 버전을 의미합니다. 프로덕션에서는 정확한 버전을 고정하는 것이 안전합니다.', ARRAY['"버전 관리"', '"pip"', '"의존성"'], NULL, NULL),
(267, 'python', '46', '어려움', '다음 중 setup.py나 pyproject.toml의 역할은?', '# pyproject.toml or setup.py', ARRAY['"Python 패키지의 메타데이터와 빌드 설정을 정의한다"', '"패키지를 자동으로 테스트한다"', '"코드를 난독화한다"', '"데이터베이스를 설정한다"'], 0, 'pyproject.toml/setup.py는 패키지 이름, 버전, 의존성, 빌드 방법 등을 정의합니다.', 'pyproject.toml', 'pyproject.toml은 Python 패키지의 빌드 설정, 메타데이터, 의존성을 정의하는 현대적 표준 파일입니다.', ARRAY['"pyproject.toml"', '"패키지 배포"', '"빌드 시스템"'], NULL, NULL),
(268, 'python', '46', '어려움', 'pip install -e . 명령의 의미는?', '# 프로젝트 루트에서 실행
pip install -e .', ARRAY['"현재 디렉토리의 패키지를 편집 가능 모드로 설치한다"', '"모든 패키지를 삭제한다"', '"환경 변수를 설정한다"', '"오류를 무시하고 설치한다"'], 0, '-e (editable) 모드는 소스 코드를 직접 참조하여 설치합니다. 코드를 수정하면 즉시 반영됩니다.', '편집 가능 설치 (-e)', 'pip install -e .는 개발 중인 패키지를 편집 가능 모드로 설치합니다. 코드 변경이 즉시 반영되어 개발에 편리합니다.', ARRAY['"editable install"', '"개발 모드"', '"패키지 개발"'], NULL, NULL),
(269, 'python', '42', '보통', '다음 코드의 출력 결과는?', 'class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def __repr__(self):
        return f"Person(''{self.name}'', {self.age})"

p = Person("Alice", 25)
print(repr(p))', ARRAY['"Person(''Alice'', 25)"', '"<Person object>"', '"Alice 25"', '"오류"'], 0, '__repr__은 개발자를 위한 문자열 표현으로, repr()이나 인터프리터에서 사용됩니다.', '__repr__ vs __str__', '__repr__은 개발자용(정확한) 표현, __str__은 사용자용(읽기 좋은) 표현입니다. __str__이 없으면 __repr__이 대신 사용됩니다.', ARRAY['"__repr__"', '"__str__"', '"객체 표현"'], NULL, NULL),
(271, 'python', '37', '보통', '다음 코드의 출력 결과는?', 'def convert(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return -1

print(convert("abc"))
print(convert(None))
print(convert("42"))', ARRAY['"-1\n-1\n42"', '"오류"', '"-1\n-1\n-1"', '"abc\nNone\n42"'], 0, '''abc''는 ValueError, None은 TypeError를 발생시켜 -1을 반환합니다. ''42''는 정상 변환되어 42를 반환합니다.', '다중 예외 한 번에 처리', 'except (에러1, 에러2): 로 여러 예외를 하나의 블록에서 처리할 수 있습니다.', ARRAY['"다중 예외"', '"타입 변환"', '"방어적 프로그래밍"'], 'multiExceptFlow', NULL),
(272, 'python', '45', '보통', '다음 코드의 출력 결과는?', 'import sys
print(type(sys.path))', ARRAY['"<class ''list''>"', '"<class ''str''>"', '"<class ''tuple''>"', '"오류"'], 0, 'sys.path는 Python이 모듈을 검색하는 경로들의 리스트입니다.', 'sys.path', 'sys.path는 모듈 검색 경로 리스트입니다. 여기에 경로를 추가하면 해당 위치의 모듈도 import할 수 있습니다.', ARRAY['"sys.path"', '"모듈 검색"', '"import 경로"'], NULL, NULL),
(273, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Mixin:
    def hello(self):
        return "Mixin"

class Base:
    def hello(self):
        return "Base"

class Child(Mixin, Base):
    pass

print(Child().hello())', ARRAY['"Mixin"', '"Base"', '"오류"', '"Child"'], 0, 'MRO에서 Mixin이 Base보다 먼저이므로 Mixin의 hello()가 호출됩니다.', '믹스인 패턴', '믹스인은 다중 상속으로 특정 기능을 추가하는 클래스입니다. 주 부모 클래스 앞에 배치합니다.', ARRAY['"믹스인"', '"다중 상속"', '"MRO"'], NULL, NULL),
(274, 'python', '20', '보통', '다음 코드의 출력 결과는?', 'd = {"a": 1, "b": 2}
new = {**d, "c": 3, "a": 10}
print(new)', ARRAY['"{''a'': 10, ''b'': 2, ''c'': 3}"', '"{''a'': 1, ''b'': 2, ''c'': 3}"', '"오류"', '"{''c'': 3, ''a'': 10}"'], 0, '**d로 딕셔너리를 펼치고 뒤의 ''a'': 10이 기존 ''a'': 1을 덮어씁니다.', '딕셔너리 언패킹 (**)', '{**d1, **d2}로 딕셔너리를 병합할 수 있습니다. 같은 키는 나중 값이 우선합니다.', ARRAY['"** 언패킹"', '"딕셔너리 병합"', '"스프레드"'], NULL, NULL),
(275, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class DataClass:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

d = DataClass(name="Alice", age=25, city="Seoul")
print(d.name, d.age)', ARRAY['"Alice 25"', '"오류"', '"name age"', '"None None"'], 0, 'setattr()로 동적으로 속성을 설정합니다. **kwargs로 받은 모든 키워드 인자가 속성이 됩니다.', '동적 속성 생성 (setattr)', 'setattr(객체, 이름, 값)으로 실행 시간에 동적으로 속성을 추가할 수 있습니다. getattr()로 안전하게 조회합니다.', ARRAY['"setattr"', '"getattr"', '"동적 속성"'], NULL, NULL),
(276, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
result = list(reversed(nums))
print(result)
print(nums)', ARRAY['"[5, 4, 3, 2, 1]\n[1, 2, 3, 4, 5]"', '"[5, 4, 3, 2, 1]\n[5, 4, 3, 2, 1]"', '"[1, 2, 3, 4, 5]\n[5, 4, 3, 2, 1]"', '"오류"'], 0, 'reversed()는 새로운 역순 이터레이터를 반환하며 원본을 변경하지 않습니다.', 'reversed() vs list.reverse()', 'reversed()는 원본을 유지하고 새 이터레이터를 반환합니다. list.reverse()는 원본을 직접 수정합니다.', ARRAY['"reversed"', '"reverse"', '"원본 보존"'], NULL, NULL),
(278, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Pipeline:
    def __init__(self):
        self.steps = []
    def add(self, func):
        self.steps.append(func)
        return self
    def run(self, data):
        for step in self.steps:
            data = step(data)
        return data

p = Pipeline()
p.add(lambda x: x * 2).add(lambda x: x + 10).add(lambda x: x ** 2)
print(p.run(5))', ARRAY['"400"', '"30"', '"20"', '"오류"'], 0, '5 * 2 = 10, 10 + 10 = 20, 20 ** 2 = 400. 파이프라인이 순서대로 실행됩니다.', '파이프라인 패턴', '데이터를 여러 변환 단계를 거치게 하는 파이프라인 패턴은 메서드 체이닝으로 깔끔하게 구현할 수 있습니다.', ARRAY['"파이프라인"', '"메서드 체이닝"', '"함수형 프로그래밍"'], NULL, NULL),
(281, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'def chunk(lst, size):
    return [lst[i:i+size] for i in range(0, len(lst), size)]

print(chunk([1,2,3,4,5,6,7], 3))', ARRAY['"[[1, 2, 3], [4, 5, 6], [7]]"', '"[[1, 2, 3], [4, 5, 6]]"', '"[[1, 2], [3, 4], [5, 6], [7]]"', '"오류"'], 0, 'range(0, 7, 3)은 0, 3, 6을 생성합니다. 각 시작점에서 3개씩 슬라이싱합니다.', '리스트 청킹', '리스트를 일정 크기로 나누는 청킹은 배치 처리, 페이지네이션 등에 사용됩니다.', ARRAY['"청킹"', '"슬라이싱"', '"배치 처리"'], NULL, NULL),
(282, 'python', '42', '어려움', '다음 코드의 출력 결과는?', 'class Loggable:
    def log(self, msg):
        print(f"[{self.__class__.__name__}] {msg}")

class Serializable:
    def to_dict(self):
        return self.__dict__

class User(Loggable, Serializable):
    def __init__(self, name):
        self.name = name

u = User("Alice")
u.log("created")
print(u.to_dict())', ARRAY['"[User] created\n{''name'': ''Alice''}"', '"[Loggable] created\n{''name'': ''Alice''}"', '"오류"', '"[User] created\nNone"'], 0, 'User는 Loggable과 Serializable을 다중 상속합니다. self.__class__.__name__은 실제 클래스 이름 ''User''입니다.', '다중 상속 활용', '독립적인 기능을 가진 클래스들을 다중 상속하면 조합(composition)처럼 사용할 수 있습니다.', ARRAY['"다중 상속"', '"믹스인"', '"__dict__"'], NULL, NULL),
(284, 'python', '38', '보통', '다음 코드에서 with 문을 사용하는 이유는?', 'with open("data.txt", "w") as f:
    f.write("hello")', ARRAY['"예외가 발생해도 파일이 자동으로 닫힌다"', '"파일을 더 빨리 열 수 있다"', '"파일 크기를 제한할 수 있다"', '"여러 파일을 동시에 열 수 있다"'], 0, 'with 문은 블록을 벗어날 때 자동으로 f.close()를 호출합니다. 에러가 발생해도 파일이 닫힙니다.', 'with 문과 자원 관리', 'with 문은 __enter__와 __exit__을 자동 호출하여 리소스의 안전한 해제를 보장합니다.', ARRAY['"with문"', '"컨텍스트 매니저"', '"리소스 해제"'], 'memoryVsFile', NULL),
(285, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = set(list1) & set(list2)
only1 = set(list1) - set(list2)
print(sorted(common))
print(sorted(only1))', ARRAY['"[4, 5]\n[1, 2, 3]"', '"[1, 2, 3]\n[4, 5]"', '"[4, 5, 6, 7, 8]\n[1, 2, 3]"', '"오류"'], 0, '교집합(&)은 둘 다에 있는 {4, 5}, 차집합(-)은 list1에만 있는 {1, 2, 3}입니다.', '집합으로 리스트 비교', '두 리스트의 공통 요소, 차이 요소를 찾을 때 집합 연산이 매우 효율적입니다.', ARRAY['"집합 연산"', '"교집합"', '"차집합"'], NULL, NULL),
(286, 'python', '22', '보통', '다음 코드의 출력 결과는?', 's = "Hello, World!"
print(s[::2])', ARRAY['"Hlo ol!"', '"Hello"', '"el,Wrd"', '"오류"'], 0, '[::2]는 인덱스 0, 2, 4, 6, 8, 10, 12의 문자를 선택합니다: H, l, o, '' ''(공백), o, l, !', '문자열 스텝 슬라이싱', '문자열에도 [::스텝]을 적용할 수 있습니다. 매 n번째 문자를 추출하거나 역순으로 만들 때 유용합니다.', ARRAY['"스텝 슬라이싱"', '"문자열"', '"패턴 추출"'], NULL, NULL),
(287, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'def is_even(n):
    return n % 2 == 0

nums = [1, 2, 3, 4, 5, 6]
result = [n for n in nums if is_even(n)]
print(result)', ARRAY['"[2, 4, 6]"', '"[1, 3, 5]"', '"[True, False, True]"', '"오류"'], 0, 'is_even()이 True를 반환하는 짝수만 리스트 컴프리헨션에 포함됩니다.', '함수를 필터 조건으로 사용', '함수를 정의하여 리스트 컴프리헨션의 if 조건에 사용하면 복잡한 필터링 로직을 깔끔하게 분리할 수 있습니다.', ARRAY['"함수"', '"리스트 컴프리헨션"', '"필터링"'], 'functionStructure', NULL),
(288, 'python', '12', '어려움', '다음 코드의 출력 결과는?', 'x = 15
result = "fizzbuzz" if x % 15 == 0 else "fizz" if x % 3 == 0 else "buzz" if x % 5 == 0 else str(x)
print(result)', ARRAY['"fizzbuzz"', '"fizz"', '"buzz"', '"15"'], 0, '15 % 15 == 0이므로 첫 번째 조건이 참이어서 ''fizzbuzz''가 됩니다.', '중첩 삼항 연산자', '삼항 연산자(값 if 조건 else 값)를 중첩하면 여러 조건을 한 줄에 처리할 수 있지만, 가독성이 떨어질 수 있습니다.', ARRAY['"삼항 연산자"', '"fizzbuzz"', '"조건 표현식"'], NULL, NULL),
(290, 'python', '32', '어려움', '다음 코드의 출력 결과는?', 'def collatz(n):
    steps = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        steps += 1
    return steps

print(collatz(6))', ARRAY['"8"', '"6"', '"10"', '"오류"'], 0, '6→3→10→5→16→8→4→2→1, 총 8단계입니다. 콜라츠 추측: 모든 양의 정수는 결국 1에 도달합니다.', '콜라츠 추측 (while 활용)', 'while 루프는 종료 조건이 언제 만족될지 모를 때 유용합니다. 콜라츠 수열은 대표적 예입니다.', ARRAY['"while"', '"콜라츠"', '"반복 조건"'], NULL, NULL),
(291, 'python', '16', '어려움', '다음 코드의 출력 결과는?', 'a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(a == b)
print(a is b)
print(a is c)', ARRAY['"True\nFalse\nTrue"', '"True\nTrue\nTrue"', '"False\nFalse\nTrue"', '"오류"'], 0, '==는 값 비교, is는 객체 동일성(같은 메모리) 비교입니다. a와 b는 값은 같지만 다른 객체, a와 c는 같은 객체입니다.', '== vs is', '==는 값의 동등성(equality)을, is는 객체의 동일성(identity)을 비교합니다.', ARRAY['"== vs is"', '"참조"', '"객체 동일성"'], NULL, NULL),
(292, 'python', '8', '어려움', '다음 코드의 출력 결과는?', 'x = 3.14159
print(f"{x:.2f}")
print(f"{1000000:,}")', ARRAY['"3.14\n1,000,000"', '"3.15\n1000000"', '"3.14\n1000000"', '"오류"'], 0, ':.2f는 소수점 2자리, :,는 천 단위 쉼표 포맷입니다.', 'f-string 포맷 지정자', 'f-string에서 {:포맷}으로 숫자 형식을 지정합니다. .2f(소수점), ,(쉼표), >10(우측정렬) 등이 가능합니다.', ARRAY['"f-string"', '"숫자 포맷"', '"형식 지정자"'], NULL, NULL),
(293, 'python', '9', '보통', '다음 코드의 출력 결과는?', 'print(int(3.9))
print(int("10", 2))
print(float("inf") > 10**100)', ARRAY['"3\n2\nTrue"', '"4\n10\nTrue"', '"3\n2\nFalse"', '"오류"'], 0, 'int(3.9)은 버림으로 3, int(''10'', 2)는 2진수 10을 정수로 변환해 2, float(''inf'')는 무한대입니다.', 'int()의 다양한 용법', 'int(문자열, 진법)으로 다른 진법의 문자열을 변환할 수 있습니다. int()는 버림(truncation)을 수행합니다.', ARRAY['"int()"', '"진법 변환"', '"float(''inf'')"'], NULL, NULL),
(294, 'python', '35', '보통', '다음 코드에서 사용자가 ''3 5 7''을 입력하면 출력은?', 'data = input("숫자 입력: ")  # 사용자가 "3 5 7" 입력
nums = list(map(int, data.split()))
print(sum(nums))', ARRAY['"15"', '"357"', '"3 5 7"', '"오류"'], 0, 'split()으로 공백 기준 분리하고, map(int, ...)으로 정수 변환 후 sum()으로 합산합니다. 3+5+7=15.', '여러 숫자 입력 받기', 'input().split()으로 공백 구분 입력을 받고, map(int, ...)으로 정수 리스트를 만드는 것은 표준 입력 패턴입니다.', ARRAY['"input()"', '"split()"', '"map()"'], 'mapFactory', NULL),
(297, 'python', '3', '보통', '다음 코드의 출력 결과는?', 'a = 10
b = 20
a, b = b, a
print(a, b)', ARRAY['"20 10"', '"10 20"', '"오류"', '"20 20"'], 0, 'Python의 동시 대입(tuple unpacking)으로 임시 변수 없이 값을 교환할 수 있습니다.', '값 교환 (swap)', 'a, b = b, a는 Python의 우아한 값 교환 방법입니다. 우변이 먼저 평가된 후 좌변에 할당됩니다.', ARRAY['"swap"', '"튜플 언패킹"', '"동시 대입"'], NULL, NULL),
(298, 'python', '12', '보통', '다음 코드의 출력 결과는?', 's = "Python"
print(s * 2 + "!")
print("th" in s)', ARRAY['"PythonPython!\nTrue"', '"Python2!\nTrue"', '"PythonPython!\nFalse"', '"오류"'], 0, '문자열 * 2는 반복, + 는 연결입니다. ''th''는 ''Python''에 포함되어 있으므로 True입니다.', '문자열 반복과 포함 검사', '문자열 * n은 n번 반복합니다. in 연산자로 부분 문자열의 존재를 확인할 수 있습니다.', ARRAY['"문자열 반복"', '"in 연산자"', '"문자열 연결"'], NULL, NULL),
(356, 'python', '16', '쉬움', '학생 100명의 이름을 저장하는 가장 적절한 자료구조는?', '# 방법 A: 변수 100개
name1 = ''철수''
name2 = ''영희''
# ... name100 = ...

# 방법 B: 리스트 하나
names = [''철수'', ''영희'', ''민수'', ...]', ARRAY['"변수를 100개 선언한다"', '"리스트를 사용한다"', '"딕셔너리를 사용한다"', '"문자열을 사용한다"'], 1, '리스트 하나로 여러 값을 순서대로 저장합니다. 변수 100개는 비실용적이며 관리가 불가능합니다.', '자료구조가 필요한 이유', '많은 데이터를 체계적으로 저장하기 위해 자료구조를 사용합니다. 리스트, 딕셔너리, 튜플, 집합이 대표적입니다.', ARRAY['"리스트"', '"자료구조"', '"데이터 저장"'], NULL, NULL),
(357, 'python', '20', '쉬움', '번호(학번)와 이름을 짝지어 저장하기에 가장 적합한 자료구조는?', '# 어떤 자료구조가 적합할까?
# 학번: 이름
# 2024001: ''철수''
# 2024002: ''영희''', ARRAY['"리스트 (list)"', '"딕셔너리 (dict)"', '"문자열 (str)"', '"정수 (int)"'], 1, '딕셔너리는 키(학번)-값(이름) 쌍으로 데이터를 저장하고 빠르게 검색할 수 있습니다.', '딕셔너리: 키-값 쌍 저장', '딕셔너리: {키: 값} 형식. 학번→이름, 단어→뜻, ID→데이터 등 짝지어 저장할 때 최적입니다.', ARRAY['"딕셔너리"', '"키-값 쌍"', '"자료구조 선택"'], NULL, NULL),
(358, 'python', '20', '보통', '리스트와 딕셔너리의 차이로 올바른 것은?', 'names = [''철수'', ''영희'', ''민수'']  # 리스트
scores = {''철수'': 90, ''영희'': 85}  # 딕셔너리

print(names[0])       # 인덱스로 접근
print(scores[''철수'']) # 키로 접근', ARRAY['"리스트는 순서가 없고, 딕셔너리는 순서가 있다"', '"리스트는 인덱스(0,1,2...)로 접근, 딕셔너리는 키로 접근"', '"리스트와 딕셔너리는 동일하다"', '"딕셔너리는 숫자만 저장 가능하다"'], 1, '리스트: 순서 있는 인덱스(0, 1, 2) 접근. 딕셔너리: 의미 있는 키(''이름'', ''학번'')로 접근.', '리스트 vs 딕셔너리', '순서대로 나열 → 리스트. 이름(키)로 찾기 → 딕셔너리. 상황에 맞는 자료구조를 선택해야 합니다.', ARRAY['"리스트"', '"딕셔너리"', '"자료구조 비교"'], NULL, NULL),
(359, 'python', '26', '보통', '다음 중 각 자료구조와 사용 예시가 올바르게 연결된 것은?', '# 어떤 자료구조가 적합할까?
A = [90, 85, 78, 92]      # 시험 점수 목록
B = {''이름'': ''철수'', ''나이'': 15}  # 학생 정보
C = (1920, 1080)           # 화면 해상도 (고정)', ARRAY['"A: 딕셔너리, B: 리스트, C: 튜플"', '"A: 리스트, B: 딕셔너리, C: 튜플"', '"A: 튜플, B: 리스트, C: 딕셔너리"', '"모두 리스트가 적합"'], 1, '순서 있는 점수 목록 → 리스트. 이름/나이 등 속성 정보 → 딕셔너리. 변경 불필요한 해상도 → 튜플.', '자료구조 선택 기준', '리스트: 순서 있는 항목. 딕셔너리: 키-값 속성. 튜플: 변경 불필요한 고정값. 집합: 중복 없는 고유값.', ARRAY['"자료구조 선택"', '"리스트"', '"딕셔너리"', '"튜플"'], NULL, NULL),
(350, 'python', '48', '쉬움', '`from math import sqrt` 후 제곱근을 사용하는 올바른 코드는?', 'from math import sqrt
print(___(16))', ARRAY['"math.sqrt(16)"', '"sqrt(16)"', '"math(sqrt(16))"', '"import.sqrt(16)"'], 1, 'from...import로 가져오면 모듈명 없이 함수 이름만 바로 사용합니다. sqrt(16) = 4.0', 'from...import 임포트 방식', '`import math` → math.sqrt() 필요. `from math import sqrt` → sqrt()만으로 사용 가능.', ARRAY['"from import"', '"math 모듈"', '"sqrt"'], NULL, NULL),
(351, 'python', '48', '쉬움', '`import math as m` 후 pi를 사용하는 올바른 코드는?', 'import math as m
print(___)', ARRAY['"math.pi"', '"m.pi"', '"pi"', '"as.pi"'], 1, 'as로 별명을 붙이면 그 별명으로 접근합니다. math → m이므로 m.pi로 사용합니다.', 'import as 별명', '`import numpy as np`, `import pandas as pd`처럼 긴 모듈명에 짧은 별명을 붙여 편리하게 사용합니다.', ARRAY['"import as"', '"별명"', '"math.pi"'], NULL, NULL),
(352, 'python', '48', '보통', '`math.ceil(3.1)`과 `math.floor(3.9)`의 결과는?', 'import math
print(math.ceil(3.1))
print(math.floor(3.9))', ARRAY['"3
4"', '"4
3"', '"4
4"', '"3
3"'], 1, 'ceil(올림) 3.1 → 4. floor(내림) 3.9 → 3. ceil은 항상 올림, floor는 항상 내림입니다.', 'math.ceil()과 math.floor()', 'ceil = 올림(천장), floor = 내림(바닥). round()와 달리 항상 한 방향으로만 반올림/내림합니다.', ARRAY['"math.ceil()"', '"math.floor()"', '"올림 내림"'], NULL, NULL),
(353, 'python', '48', '보통', '다음 중 pip install 없이 바로 사용할 수 있는 내장 모듈은?', '# 다음 중 어떤 것이 내장 모듈인가?
import math      # A
import requests  # B
import pandas    # C
import flask     # D', ARRAY['"requests"', '"pandas"', '"math"', '"flask"'], 2, 'math, json, random, datetime, string은 파이썬 내장 모듈입니다. requests, pandas, flask는 pip install이 필요합니다.', '내장 모듈 vs 외부 패키지', '내장 모듈: math, json, random, datetime 등 — 설치 불필요. 외부 패키지: requests, pandas, flask 등 — pip install 필요.', ARRAY['"내장 모듈"', '"pip install"', '"외부 패키지"'], NULL, NULL),
(354, 'python', '48', '보통', '`random.randint(1, 6)`으로 나올 수 없는 값은?', 'import random
result = random.randint(1, 6)
print(result)  # ?', ARRAY['"1"', '"3"', '"6"', '"7"'], 3, 'randint(a, b)는 a 이상 b 이하의 정수를 반환합니다. 1~6만 가능하므로 7은 나올 수 없습니다.', 'random.randint() 범위', 'randint(1, 6): 1, 2, 3, 4, 5, 6 중 하나. 양쪽 경계값 포함. range(1, 6)은 5까지지만 randint(1, 6)은 6 포함.', ARRAY['"random.randint()"', '"범위"', '"경계값 포함"'], NULL, NULL),
(355, 'python', '48', '어려움', '외부 패키지를 사용하는 올바른 순서는?', '# 단계 순서?
# A: import requests
# B: pip install requests
# C: response = requests.get(url)', ARRAY['"A → B → C"', '"B → C → A"', '"B → A → C"', '"A → C → B"'], 2, '먼저 pip install로 설치(B) → import로 불러오기(A) → 코드에서 사용(C). 설치 없이 import하면 ModuleNotFoundError 발생.', '외부 패키지 사용 순서', 'pip install(설치) → import(불러오기) → 사용. 내장 모듈은 설치 단계 없이 바로 import합니다.', ARRAY['"pip install"', '"import"', '"ModuleNotFoundError"'], NULL, NULL),
(329, 'python', '39', '쉬움', '게임 세이브 파일에 숫자(HP, 레벨 등)를 저장하려면 어떻게 해야 하는가?', 'character = {''name'': ''용사'', ''hp'': 85, ''level'': 3}
with open(''save.txt'', ''w'') as f:
    f.write(character[''name''] + ''\n'')
    f.write(___(character[''hp'']) + ''\n'')', ARRAY['"int()"', '"str()"', '"float()"', '"변환 불필요"'], 1, '파일에는 문자열만 쓸 수 있습니다. 숫자는 str()로 변환 후 write()해야 합니다.', '파일 쓰기와 타입 변환', 'f.write()는 문자열만 받습니다. 숫자를 저장하려면 str(숫자)로 변환 필요. 읽을 때는 int()로 복원합니다.', ARRAY['"str()"', '"with open"', '"파일 저장"'], NULL, NULL),
(330, 'python', '39', '보통', '게임 세이브 파일을 불러올 때 올바른 코드는?', '# save.txt 내용:
# 용사
# 85
# 3

with open(''save.txt'', ''r'') as f:
    lines = f.readlines()

character = {
    ''name'': lines[0].strip(),
    ''hp'': ___(lines[1].strip()),
    ''level'': int(lines[2].strip())
}', ARRAY['"str()"', '"int()"', '"float()"', '"lines()"'], 1, '파일에서 읽은 HP 값은 문자열 ''85''이므로 int()로 정수로 변환해야 합니다.', '파일 로드와 타입 복원', 'readlines()로 읽은 값은 모두 문자열입니다. strip()으로 줄바꿈 제거 후 int()/float()로 변환합니다.', ARRAY['"readlines()"', '"strip()"', '"int() 변환"'], NULL, NULL),
(331, 'python', '39', '보통', '저장 파일이 없을 때 try-except로 처리하는 올바른 코드는?', 'try:
    with open(''save.txt'', ''r'') as f:
        data = f.read()
    print(''세이브 로드 성공!'')
except ___:
    print(''저장 파일 없음. 새 게임 시작!'')', ARRAY['"ValueError"', '"TypeError"', '"FileNotFoundError"', '"IndexError"'], 2, '파일이 없을 때 발생하는 예외는 FileNotFoundError입니다. open()에서 파일이 없으면 이 에러가 발생합니다.', 'FileNotFoundError 처리', '파일 없음: FileNotFoundError, 타입 오류: TypeError, 값 오류: ValueError, 인덱스 오류: IndexError', ARRAY['"FileNotFoundError"', '"try-except"', '"파일 로드"'], NULL, NULL),
(332, 'python', '45', '어려움', '게임 세이브/로드 전체 흐름에서 올바른 것은?', 'import json

def save_game(char):
    with open(''save.json'', ''w'') as f:
        json.dump(char, f)
    print(''저장 완료!'')

def load_game():
    try:
        with open(''save.json'', ''r'') as f:
            return json.load(f)
    except FileNotFoundError:
        return None

saved = load_game()
if saved:
    print(f''이어하기: {saved["name"]}'')
else:
    print(''새 게임'')', ARRAY['"json.dump()와 json.load()로 딕셔너리를 그대로 저장/로드 가능"', '"json.dump()는 문자열을 반환한다"', '"파일이 없으면 프로그램이 종료된다"', '"load_game()은 항상 딕셔너리를 반환한다"'], 0, 'json.dump(data, f)는 딕셔너리를 JSON 파일로 저장, json.load(f)는 파일에서 딕셔너리로 복원합니다.', 'json.dump()와 json.load()', 'JSON 파일로 딕셔너리 그대로 저장/로드 가능. except로 파일 없음을 처리해 None을 반환합니다.', ARRAY['"json.dump()"', '"json.load()"', '"게임 세이브"'], NULL, NULL),
(333, 'python', '40', '쉬움', '다음 코드에서 출력 결과는?', 'try:
    result = 10 / 2
    print(result)
except ZeroDivisionError:
    print(''0으로 나눌 수 없음!'')', ARRAY['"5.0"', '"0으로 나눌 수 없음!"', '"오류"', '"10"'], 0, '10 / 2는 에러 없이 5.0을 반환합니다. except 블록은 실행되지 않습니다.', 'try-except 정상 실행', '에러가 없으면 try 블록만 실행되고 except 블록은 건너뜁니다.', ARRAY['"try-except"', '"ZeroDivisionError"'], NULL, NULL),
(334, 'python', '40', '보통', '다음 코드의 출력 순서는?', 'try:
    x = int(''abc'')
    print(''A'')
except ValueError:
    print(''B'')
finally:
    print(''C'')', ARRAY['"A, C"', '"B, C"', '"A, B, C"', '"C만"'], 1, 'int(''abc'')에서 ValueError 발생 → ''A'' 건너뜀 → except: ''B'' → finally: 항상 ''C''', 'finally는 항상 실행', 'finally 블록은 에러 발생 여부와 관계없이 항상 실행됩니다. 자원 정리에 사용합니다.', ARRAY['"finally"', '"ValueError"', '"try-except-finally"'], NULL, NULL),
(335, 'python', '40', '보통', '파일 ''test.txt''에 ''Hello''가 있을 때, 다음 코드 실행 후 파일 내용은?', 'with open(''test.txt'', ''a'') as f:
    f.write('' World'')', ARRAY['"World"', '"Hello World"', '" World"', '"Hello\n World"'], 1, '''a'' (append) 모드는 기존 내용 뒤에 추가합니다. ''Hello'' + '' World'' = ''Hello World''', '''a'' 모드: 파일 끝에 추가', '''w'' 모드: 덮어쓰기. ''a'' 모드: 끝에 추가. ''r'' 모드: 읽기 전용.', ARRAY['"파일 모드"', '"append 모드"', '"with open"'], NULL, NULL),
(336, 'python', '40', '어려움', '다음 코드에서 출력 결과는?', 'def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return 0

results = [safe_divide(10, 2), safe_divide(5, 0), safe_divide(9, 3)]
print(results)', ARRAY['"[5.0, 0, 3.0]"', '"[5.0, 에러, 3.0]"', '"[5, 0, 3]"', '"오류"'], 0, '10/2=5.0, 5/0은 ZeroDivisionError → 0 반환, 9/3=3.0. 결과: [5.0, 0, 3.0]', '함수 내 try-except', '함수 내부에서 try-except로 에러를 처리하면 호출자에게 안전한 값을 반환할 수 있습니다.', ARRAY['"함수 내 try-except"', '"ZeroDivisionError"', '"안전한 연산"'], NULL, NULL),
(337, 'python', '49', '쉬움', 'RPG 게임 설계에서 Character 클래스가 가져야 할 속성이 아닌 것은?', 'class Character:
    def __init__(self, name, job):
        self.name = name
        self.hp = 100
        self.atk = 15
        self.defense = 10
        self.inventory = []', ARRAY['"name"', '"hp"', '"exp_reward"', '"inventory"'], 2, 'exp_reward(경험치 보상)는 Monster 클래스의 속성입니다. Character는 경험치를 받는 쪽이고 Monster가 경험치를 제공합니다.', '클래스 책임 분리', 'Character: 이름, HP, 스탯, 레벨, 인벤토리. Monster: 스탯, exp_reward, gold_reward. 각 클래스의 역할을 명확히 분리합니다.', ARRAY['"클래스 설계"', '"책임 분리"', '"OOP"'], NULL, NULL),
(338, 'python', '49', '보통', 'Character 클래스에서 max_hp를 따로 저장하는 이유는?', 'class Character:
    def __init__(self, name):
        self.hp = 100
        self.max_hp = 100  # 왜 따로 저장?

    def heal(self, amount):
        self.hp = min(self.hp + amount, self.max_hp)', ARRAY['"파이썬 문법 요구사항이라서"', '"HP 회복 시 최대치를 넘지 않게 하려고"', '"메모리 절약을 위해"', '"몬스터도 사용하려고"'], 1, 'min(hp + amount, max_hp)로 회복량을 제한합니다. max_hp 없이는 HP 초과 회복이 가능해집니다.', 'max_hp 설계 이유', '현재 HP(hp)와 최대 HP(max_hp)를 분리해 회복 한도를 설정합니다. min()으로 한도 초과를 방지합니다.', ARRAY['"min()"', '"HP 회복"', '"속성 설계"'], NULL, NULL),
(339, 'python', '49', '어려움', '다음 3개 클래스 설계에서 올바른 설명은?', 'class Character:  # 플레이어
    def __init__(self, name, job):
        self.inventory = []  # 아이템 가방

class Monster:    # 적
    def __init__(self, name, hp, atk, defense, exp, gold):
        self.exp_reward = exp
        self.gold_reward = gold

class Item:       # 아이템
    def __init__(self, name, item_type, value, price):
        self.item_type = item_type  # ''heal'', ''atk'', ''def''', ARRAY['"Monster도 inventory를 가져야 한다"', '"Item의 item_type으로 효과 종류를 구분한다"', '"Character는 gold_reward가 필요하다"', '"Item 클래스 없이 딕셔너리만 써도 된다"'], 1, 'Item.item_type = ''heal''|''atk''|''def''로 효과 종류를 구분합니다. Monster는 인벤토리 불필요, Character는 보상이 아닌 gold를 가집니다.', 'RPG 클래스 설계 원칙', '각 클래스는 자신의 역할에 맞는 속성만 가집니다. item_type으로 아이템 동작을 분기합니다.', ARRAY['"클래스 설계"', '"item_type 분기"', '"OOP 원칙"'], NULL, NULL),
(340, 'python', '50', '쉬움', '마법사(mage)의 스탯으로 올바른 것은?', 'if job == ''warrior'':
    self.hp, self.max_hp = 120, 120
    self.atk, self.defense = 15, 12
elif job == ''mage'':
    self.hp, self.max_hp = ___, ___
    self.atk, self.defense = 25, 5', ARRAY['"120, 120"', '"100, 100"', '"80, 80"', '"90, 90"'], 2, '마법사는 공격력(ATK 25)이 높은 대신 HP가 낮습니다(80). 용사 120, 궁수 100, 마법사 80.', '직업별 스탯 균형', '용사: HP 높고 방어 높음. 마법사: HP 낮고 공격 높음(유리대포). 궁수: 균형형.', ARRAY['"직업별 스탯"', '"if/elif 분기"', '"OOP"'], NULL, NULL),
(341, 'python', '50', '보통', 'take_damage 메서드에서 실제 데미지 계산 결과는?', 'def take_damage(self, damage):
    actual = damage - self.defense
    if actual < 1:
        actual = 1
    self.hp -= actual
    return actual

# 용사(defense=12)가 8 데미지를 받으면?
hero = Character(''용사'', ''warrior'')  # defense=12
dmg = hero.take_damage(8)
print(dmg)', ARRAY['"8"', '"4"', '"1"', '"0"'], 2, '8 - 12 = -4, 최솟값 1 적용 → actual = 1. 방어력이 공격력보다 크면 최소 1의 데미지를 받습니다.', '최소 데미지 보장', '`if actual < 1: actual = 1`로 방어력이 아무리 높아도 최소 1의 데미지를 보장합니다.', ARRAY['"take_damage()"', '"최솟값"', '"전투 로직"'], NULL, NULL),
(342, 'python', '50', '보통', '경험치 100을 얻었을 때 레벨업 후 EXP 잔량은?', 'def gain_exp(self, amount):
    self.exp += amount
    while self.exp >= 100:
        self.exp -= 100
        self.level_up()

# 현재 EXP: 0, 100 경험치 획득
hero.gain_exp(100)
print(hero.exp)', ARRAY['"100"', '"0"', '"1"', '"에러"'], 1, 'exp = 0 + 100 = 100. while 조건 100 >= 100 → True. exp -= 100 → exp = 0. 레벨업 후 잔량 0.', 'while로 연속 레벨업', 'while self.exp >= 100: 로 경험치가 충분하면 계속 레벨업합니다. 200 EXP이면 2레벨 상승.', ARRAY['"while 레벨업"', '"gain_exp()"', '"잔여 경험치"'], NULL, NULL),
(343, 'python', '50', '어려움', '다음 전투 코드의 출력 결과는?', 'class Character:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.atk = 20
        self.defense = 5
        self.alive = True

    def take_damage(self, damage):
        actual = max(damage - self.defense, 1)
        self.hp -= actual
        if self.hp <= 0:
            self.hp = 0
            self.alive = False
        return actual

hero = Character(''영웅'')
monster_atk = 100
dmg = hero.take_damage(monster_atk)
print(f''데미지: {dmg}, HP: {hero.hp}, 생존: {hero.alive}'')', ARRAY['"데미지: 95, HP: 5, 생존: True"', '"데미지: 95, HP: 0, 생존: False"', '"데미지: 100, HP: 0, 생존: False"', '"데미지: 1, HP: 99, 생존: True"'], 0, '100 - 5 = 95 데미지, max(95, 1) = 95. HP = 100 - 95 = 5. 5 > 0이므로 alive = True. 결과: 데미지 95, HP 5, 생존 True.', '전투 계산 흐름', 'actual = max(damage - defense, 1)로 최소 1 보장. HP가 0 이하면 alive = False.', ARRAY['"max()"', '"alive 플래그"', '"전투 로직"'], NULL, NULL),
(344, 'python', '51', '쉬움', 'RPG 상점에서 아이템 구매 가능 여부를 확인하는 올바른 조건은?', 'def buy_item(self, item):
    if self.gold ___ item.price:
        self.gold -= item.price
        self.inventory.append(item)
        print(f''{item.name} 구매!'')
    else:
        print(''골드 부족!'')', ARRAY['"<"', '">"', '">="', '"=="'], 2, '골드가 아이템 가격 이상(>=)이어야 구매 가능합니다.', '구매 조건 확인', 'self.gold >= item.price 조건으로 충분한 골드가 있는지 확인 후 차감합니다.', ARRAY['"상점 시스템"', '"골드 비교"', '"인벤토리"'], NULL, NULL),
(345, 'python', '51', '보통', 'JSON으로 게임을 저장하는 코드에서 올바른 것은?', 'import json

def save_game(char):
    data = {
        ''name'': char.name,
        ''hp'': char.hp,
        ''level'': char.level,
        ''gold'': char.gold
    }
    with open(''save.json'', ''w'') as f:
        ___(data, f)', ARRAY['"json.load()"', '"json.dump()"', '"json.write()"', '"json.save()"'], 1, 'json.dump(data, f)는 딕셔너리를 JSON 형식으로 파일에 씁니다. json.load(f)는 읽기입니다.', 'json.dump() vs json.load()', 'dump(data, f): 쓰기. load(f): 읽기. dumps(data): 문자열 반환. loads(s): 문자열 파싱.', ARRAY['"json.dump()"', '"게임 저장"', '"JSON 파일"'], NULL, NULL),
(346, 'python', '51', '어려움', '다음 게임 루프에서 while 조건이 올바른 것은?', 'hero = Character(''용사'', ''warrior'')

___ hero.alive:
    monster = Monster(''슬라임'', 30, 8, 2, 20, 30)
    while monster.hp > 0 and hero.alive:
        hero.attack(monster)
        if monster.hp > 0:
            monster.attack(hero)
    
    if hero.alive:
        hero.gain_exp(monster.exp_reward)
    else:
        print(''게임 오버'')', ARRAY['"for"', '"while"', '"if"', '"do"'], 1, 'while hero.alive: 로 영웅이 살아있는 동안 게임이 계속됩니다.', '게임 메인 루프', 'while hero.alive: 로 게임 오버까지 계속 반복. 내부에서 전투, 경험치 획득, 게임오버를 처리합니다.', ARRAY['"게임 루프"', '"while 조건"', '"alive 플래그"'], NULL, NULL),
(347, 'python', '52', '보통', '치명타(50% 확률로 2배 데미지) 구현에서 올바른 코드는?', 'import random

def attack_with_crit(self, target):
    damage = self.atk
    if random.___(0, 1) < 0.5:  # 50% 확률
        damage *= 2
        print(''  * 치명타!'')
    target.take_damage(damage)', ARRAY['"randint()"', '"random()"', '"choice()"', '"sample()"'], 1, 'random.random()은 0.0 이상 1.0 미만의 실수를 반환합니다. < 0.5이면 50% 확률이 됩니다.', 'random.random()으로 확률 구현', 'random.random() < 0.5: 50% 확률. < 0.3: 30% 확률. randint(0,1)은 0 또는 1 정수 반환으로 다릅니다.', ARRAY['"random.random()"', '"치명타"', '"확률 로직"'], NULL, NULL),
(348, 'python', '52', '보통', '다음 퀘스트 시스템 코드에서 진행률을 올바르게 계산하는 코드는?', 'quest = {
    ''title'': ''슬라임 사냥'',
    ''target'': ''슬라임'',
    ''goal'': 5,
    ''count'': 3
}

progress = quest[''count''] / quest[''___''] * 100
print(f''진행률: {progress:.0f}%'')  # 60%', ARRAY['"count"', '"title"', '"goal"', '"target"'], 2, '진행률 = (현재 카운트 / 목표) * 100. 3 / 5 * 100 = 60%', '퀘스트 진행률 계산', '진행률(%) = count / goal * 100. :.0f로 소수점 없이 표시합니다.', ARRAY['"퀘스트 시스템"', '"진행률"', '"딕셔너리"'], NULL, NULL),
(349, 'python', '52', '어려움', '스킬 시스템에서 스킬 사용 시 MP 소모를 처리하는 올바른 코드는?', 'skills = {
    ''fireball'': {''name'': ''파이어볼'', ''mp_cost'': 20, ''power'': 2.0},
    ''heal'': {''name'': ''힐'', ''mp_cost'': 15, ''power'': 0},
}

def use_skill(self, skill_name, target):
    skill = skills[skill_name]
    if self.mp ___ skill[''mp_cost'']:
        print(''MP 부족!'')
        return False
    self.mp -= skill[''mp_cost'']
    if skill_name == ''fireball'':
        target.take_damage(int(self.atk * skill[''power'']))
    return True', ARRAY['">"', '">="', '"<"', '"<="'], 2, 'MP가 스킬 비용보다 부족(< mp_cost)하면 사용 불가. mp >= cost이어야 사용 가능하므로, 불가 조건은 mp < cost입니다.', '스킬 MP 조건 확인', 'if self.mp < skill[''mp_cost'']: return False. 불가 조건(if <)으로 먼저 걸러내는 guard clause 패턴.', ARRAY['"스킬 시스템"', '"MP 관리"', '"guard clause"'], NULL, NULL),
(299, 'python', '12', '어려움', '다음 코드의 출력 결과는?', 'x = 0
y = ""
z = 0.0
print(not x and not y and not z)
print(bool(x or y or z or "hello"))', ARRAY['"True\nTrue"', '"False\nTrue"', '"True\nFalse"', '"False\nFalse"'], 0, 'x(0), y(''''), z(0.0) 모두 Falsy이므로 not x and not y and not z는 True입니다. or 체인에서 첫 Truthy 값 ''hello''가 선택됩니다.', '단축 평가와 Falsy 값', 'and는 첫 Falsy 값을, or는 첫 Truthy 값을 반환합니다. 이를 단축 평가(short-circuit evaluation)라 합니다.', ARRAY['"단축 평가"', '"Falsy"', '"and/or"'], NULL, NULL),
(301, 'python', '27', '쉬움', '다음 코드에서 컴퓨터가 선택하는 값은?', 'choices = [''가위'', ''바위'', ''보'']
computer = choices[1]', ARRAY['"가위"', '"바위"', '"보"', '"오류"'], 1, 'choices[1]은 인덱스 1번, 즉 ''바위''입니다. 리스트 인덱스는 0부터 시작합니다.', '리스트 인덱스', '리스트[0]은 첫 번째, 리스트[1]은 두 번째, 리스트[2]는 세 번째 요소입니다.', ARRAY['"리스트 인덱스"', '"랜덤 선택"'], NULL, NULL),
(302, 'python', '27', '쉬움', '가위바위보에서 승패 판정 코드의 빈칸에 들어갈 알맞은 값은?', 'player = ''바위''
computer = ''가위''

if player == computer:
    result = ''무승부''
elif player == ''바위'' and computer == ___:
    result = ''승리!''', ARRAY['"''바위''"', '"''보''"', '"''가위''"', '"''무승부''"'], 2, '바위는 가위를 이깁니다. player가 ''바위''일 때 이기는 조건은 computer == ''가위''입니다.', 'if/elif 조건 분기', '가위바위보 승리 조건: 가위 > 보, 바위 > 가위, 보 > 바위. 각 경우를 elif로 순서대로 확인합니다.', ARRAY['"if/elif/else"', '"비교 연산자"'], NULL, NULL),
(303, 'python', '27', '보통', '5판 가위바위보 결과 집계 코드의 출력 결과는?', 'results = [''승리!'', ''패배'', ''무승부'', ''승리!'', ''승리!'']
wins = 0
losses = 0
draws = 0

for r in results:
    if r == ''승리!'':
        wins += 1
    elif r == ''패배'':
        losses += 1
    else:
        draws += 1

print(f''{wins}승 {losses}패 {draws}무'')', ARRAY['"3승 1패 1무"', '"2승 2패 1무"', '"3승 2패 0무"', '"2승 1패 2무"'], 0, 'results에서 ''승리!''가 3번, ''패배''가 1번, ''무승부''가 1번입니다. → 3승 1패 1무', 'for 반복 + 카운터', 'for문으로 리스트를 순회하며 if/elif/else로 분기하고 카운터를 증가시켜 집계합니다.', ARRAY['"for 반복문"', '"카운터 변수"', '"결과 집계"'], NULL, NULL),
(304, 'python', '27', '보통', '다음 연승 카운터 코드에서 최종 max_streak 값은?', 'results = [''승리!'', ''승리!'', ''패배'', ''승리!'', ''승리!'', ''승리!'']
streak = 0
max_streak = 0

for r in results:
    if r == ''승리!'':
        streak += 1
    else:
        streak = 0
    if streak > max_streak:
        max_streak = streak

print(max_streak)', ARRAY['"2"', '"3"', '"5"', '"6"'], 1, '2연승 후 패배로 리셋, 이후 3연승이 최대입니다. max_streak = 3.', '최대 연승 추적', 'streak은 이기면 +1, 지면 0 리셋. max_streak에 항상 최대값을 갱신합니다.', ARRAY['"연승 카운터"', '"max 값 갱신"'], NULL, NULL),
(305, 'python', '27', '어려움', '가위바위보 승패 판정에서 빈칸에 들어갈 올바른 조건 조합은?', 'player = ''보''
computer = ''바위''

if player == computer:
    result = ''무승부''
elif (player == ''가위'' and computer == ''보'') or \
     (player == ''바위'' and computer == ''가위'') or \
     ___:
    result = ''승리!''
else:
    result = ''패배''
print(result)', ARRAY['"(player == ''보'' and computer == ''바위'')"', '"(player == ''바위'' and computer == ''보'')"', '"(player == ''가위'' and computer == ''바위'')"', '"(player == ''보'' and computer == ''가위'')"'], 0, '보는 바위를 이깁니다. 세 번째 조건은 (player == ''보'' and computer == ''바위'')입니다.', '복합 조건문 (or 연결)', '여러 승리 조건을 or로 연결하면 하나라도 True이면 전체가 True입니다.', ARRAY['"논리 연산자 or"', '"복합 조건"', '"가위바위보 로직"'], NULL, NULL),
(306, 'python', '28', '쉬움', '로또 번호 생성에서 중복을 방지하기 위해 사용하는 올바른 조건은?', 'numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n ___ numbers:
        numbers.append(n)', ARRAY['"in"', '"not in"', '"not"', '"=="'], 1, '`not in`을 사용해 n이 이미 numbers 안에 없을 때만 추가합니다.', 'not in 연산자', '`x not in list`는 x가 리스트에 없으면 True, 있으면 False입니다. 중복 방지에 활용합니다.', ARRAY['"in/not in"', '"중복 방지"', '"while 반복"'], NULL, NULL),
(307, 'python', '28', '보통', '로또 번호 생성 코드에서 6개가 채워질 때까지 반복하는 조건은?', 'numbers = []
while ___ < 6:
    n = random.randint(1, 45)
    if n not in numbers:
        numbers.append(n)', ARRAY['"n"', '"len(numbers)"', '"numbers"', '"range(6)"'], 1, '`len(numbers)`는 현재 리스트의 길이를 반환합니다. 6개 미만이면 계속 반복합니다.', 'while 조건과 len()', 'while len(numbers) < 6: 는 numbers에 6개가 쌓일 때까지 반복합니다.', ARRAY['"while 반복문"', '"len()"', '"조건 반복"'], NULL, NULL),
(308, 'python', '28', '보통', '로또 번호를 오름차순으로 출력하려면 어떤 메서드를 사용해야 하는가?', 'numbers = [25, 3, 40, 14, 30, 45]
numbers.___()  # 오름차순 정렬
print(numbers)', ARRAY['"reverse()"', '"ordering()"', '"sort()"', '"order()"'], 2, '`list.sort()`는 리스트를 직접 오름차순으로 정렬합니다. 원본 리스트가 직접 변경되며 None을 반환합니다.', 'sort() vs sorted()', '`list.sort()`는 원본을 수정, `sorted(list)`는 새 리스트를 반환합니다. 로또 번호 정렬에는 sort() 사용.', ARRAY['"sort()"', '"sorted()"', '"리스트 정렬"'], NULL, NULL),
(309, 'python', '45', '어려움', '다음 코드에서 random.sample()을 사용한 로또 생성 결과가 올바른 것은?', 'import random
random.seed(1)
numbers = random.sample(range(1, 46), 6)
numbers.sort()
print(numbers)', ARRAY['"항상 6개의 중복 없는 번호가 정렬되어 출력된다"', '"1~46 중 6개를 뽑으므로 46도 포함될 수 있다"', '"sort() 없이도 자동 정렬된다"', '"오류가 발생한다"'], 0, 'random.sample(range(1,46), 6)은 1~45 중 중복 없이 6개를 뽑습니다. range(1,46)은 1~45입니다. sort()로 정렬합니다.', 'random.sample()', '`random.sample(population, k)`는 중복 없이 k개를 선택합니다. while + not in 방식과 동일한 결과를 더 간결하게 얻을 수 있습니다.', ARRAY['"random.sample()"', '"중복 없는 추출"', '"range()"'], NULL, NULL),
(310, 'python', '29', '쉬움', '단어장 딕셔너리에서 ''apple''의 뜻을 올바르게 저장하는 코드는?', 'vocab = {}
vocab[___] = ''사과''', ARRAY['"''사과''"', '"''apple''"', '"apple"', '"사과"'], 1, '딕셔너리에서 키는 문자열 ''apple'', 값은 ''사과''입니다. vocab[''apple''] = ''사과''가 올바릅니다.', '딕셔너리 키-값 저장', '딕셔너리[키] = 값 형식으로 저장합니다. 키가 존재하면 업데이트, 없으면 새로 추가됩니다.', ARRAY['"딕셔너리"', '"키-값 쌍"', '"데이터 저장"'], NULL, NULL),
(311, 'python', '29', '쉬움', '단어장에서 ''apple''이 있는지 확인하는 올바른 조건은?', 'vocab = {''apple'': ''사과'', ''banana'': ''바나나''}
word = ''apple''
if word ___ vocab:
    print(f''{word} = {vocab[word]}'')', ARRAY['"== "', '"in"', '"not in"', '"has"'], 1, '`word in vocab`은 word가 딕셔너리의 키로 존재하면 True를 반환합니다.', '딕셔너리 키 존재 확인', '`key in dict`는 key가 딕셔너리에 있으면 True입니다. KeyError를 방지하기 위해 접근 전에 확인합니다.', ARRAY['"in 연산자"', '"딕셔너리 검색"', '"KeyError 방지"'], NULL, NULL),
(312, 'python', '29', '보통', '단어장에서 ''banana''를 삭제하는 올바른 코드는?', 'vocab = {''apple'': ''사과'', ''banana'': ''바나나'', ''cherry'': ''체리''}
___ vocab[''banana'']
print(len(vocab))  # 2', ARRAY['"remove"', '"del"', '"pop()"', '"delete"'], 1, '`del vocab[''banana'']`는 딕셔너리에서 해당 키를 삭제합니다. remove()는 리스트 메서드입니다.', 'del 키워드로 딕셔너리 삭제', '딕셔너리에서 항목 삭제: `del dict[key]` 또는 `dict.pop(key)`를 사용합니다.', ARRAY['"del"', '"딕셔너리 삭제"', '"pop()"'], NULL, NULL),
(313, 'python', '29', '보통', '단어장 전체 목록을 출력하기 위해 딕셔너리를 순회하는 올바른 코드는?', 'vocab = {''apple'': ''사과'', ''banana'': ''바나나''}
for word, meaning in vocab.___():
    print(f''{word}: {meaning}'')', ARRAY['"keys()"', '"values()"', '"items()"', '"all()"'], 2, '`dict.items()`는 (키, 값) 튜플의 뷰를 반환합니다. for word, meaning in으로 각각 언패킹합니다.', 'dict.items()로 순회', 'keys()는 키만, values()는 값만, items()는 (키, 값) 쌍을 반환합니다.', ARRAY['"dict.items()"', '"딕셔너리 순회"', '"언패킹"'], NULL, NULL),
(314, 'python', '29', '어려움', '다음 단어장 프로그램의 출력 결과는?', 'vocab = {}
commands = [(''add'',''cat'',''고양이''), (''add'',''dog'',''개''), (''delete'',''cat'',''''), (''search'',''dog'','''')]

for cmd in commands:
    if cmd[0] == ''add'':
        vocab[cmd[1]] = cmd[2]
    elif cmd[0] == ''delete'':
        if cmd[1] in vocab:
            del vocab[cmd[1]]
    elif cmd[0] == ''search'':
        if cmd[1] in vocab:
            print(f''O {cmd[1]} = {vocab[cmd[1]]}'')
        else:
            print(f''X {cmd[1]} 없음'')', ARRAY['"O dog = 개"', '"O cat = 고양이
O dog = 개"', '"X dog 없음"', '"X cat 없음
O dog = 개"'], 0, 'cat 추가 → dog 추가 → cat 삭제 → dog 검색. 최종 vocab = {''dog'': ''개''}, dog 검색 → ''O dog = 개''', '딕셔너리 CRUD 순서', '명령어 순서대로 딕셔너리를 수정한 후 검색 결과가 출력됩니다.', ARRAY['"딕셔너리 CRUD"', '"del"', '"in 검색"'], NULL, NULL),
(315, 'python', '30', '쉬움', '리스트 안의 딕셔너리에서 첫 번째 학생의 이름을 가져오는 코드는?', 'students = [
    {''name'': ''철수'', ''kor'': 85, ''math'': 78},
    {''name'': ''영희'', ''kor'': 95, ''math'': 92},
]
print(students[___][''name''])', ARRAY['"1"', '"0"', '"-1"', '"2"'], 1, '리스트 인덱스 0이 첫 번째 요소입니다. students[0][''name''] = ''철수''', '리스트[인덱스][딕셔너리 키]', '리스트 안 딕셔너리 접근: list[index][key] 형식으로 2단계로 접근합니다.', ARRAY['"리스트+딕셔너리"', '"중첩 데이터 접근"'], NULL, NULL),
(316, 'python', '30', '보통', '학생의 평균 점수를 계산하고 등급을 부여하는 코드의 출력 결과는?', 'student = {''name'': ''민수'', ''kor'': 72, ''eng'': 65, ''math'': 80}
avg = (student[''kor''] + student[''eng''] + student[''math'']) / 3

if avg >= 90:
    grade = ''A''
elif avg >= 80:
    grade = ''B''
else:
    grade = ''C''

print(f''{student["name"]}: {avg:.1f} → {grade}'')', ARRAY['"민수: 72.3 → C"', '"민수: 72.3 → B"', '"민수: 65.0 → C"', '"민수: 80.0 → B"'], 0, '(72+65+80)/3 = 217/3 ≈ 72.3. 72.3 < 80이므로 grade = ''C''', '평균 계산과 등급 분기', '3과목 합산 후 3으로 나누어 평균, if/elif/else로 등급을 결정합니다.', ARRAY['"평균 계산"', '"등급 분기"', '"f-string 포매팅"'], NULL, NULL),
(317, 'python', '35', '보통', '리스트 컴프리헨션으로 국어 점수만 뽑는 올바른 코드는?', 'students = [
    {''name'': ''철수'', ''kor'': 85},
    {''name'': ''영희'', ''kor'': 95},
    {''name'': ''민수'', ''kor'': 72},
]
kor_scores = ___
print(kor_scores)  # [85, 95, 72]', ARRAY['"[s[''kor''] for s in students]"', '"[students[''kor''] for s in students]"', '"[s.kor for s in students]"', '"students[''kor'']"'], 0, '[s[''kor''] for s in students]는 각 학생 딕셔너리에서 ''kor'' 값만 추출합니다.', '리스트 컴프리헨션으로 특정 필드 추출', '[표현식 for 변수 in 리스트] 형식. 각 딕셔너리에서 특정 키 값을 뽑아 새 리스트를 만듭니다.', ARRAY['"리스트 컴프리헨션"', '"딕셔너리 필드 추출"'], NULL, NULL),
(318, 'python', '35', '어려움', '다음 과락(70점 미만) 검사 코드에서 출력 결과는?', 'students = [
    {''name'': ''철수'', ''kor'': 85, ''eng'': 92, ''math'': 78},
    {''name'': ''민수'', ''kor'': 72, ''eng'': 65, ''math'': 80},
]
for s in students:
    fails = [k for k in [''kor'',''eng'',''math''] if s[k] < 70]
    print(f''{s["name"]}: {len(fails)}과목 과락'')', ARRAY['"철수: 0과목 과락
민수: 1과목 과락"', '"철수: 1과목 과락
민수: 2과목 과락"', '"철수: 0과목 과락
민수: 2과목 과락"', '"철수: 0과목 과락
민수: 3과목 과락"'], 0, '철수: 85, 92, 78 모두 70 이상 → 0과목. 민수: 65 < 70(영어만) → 1과목 과락.', '컴프리헨션 + 조건 필터', '[k for k in list if 조건]으로 조건에 맞는 요소만 필터링합니다. len()으로 개수를 셉니다.', ARRAY['"리스트 컴프리헨션"', '"조건 필터"', '"과락 검사"'], NULL, NULL),
(319, 'python', '31', '쉬움', '다음 코드의 출력 결과는?', 'print(17 // 5)
print(17 % 5)', ARRAY['"3
2"', '"3.4
2"', '"3
1.4"', '"3.4
0.4"'], 0, '//는 몫: 17 ÷ 5 = 3...2, 몫은 3. %는 나머지: 17 ÷ 5의 나머지는 2.', '// 몫, % 나머지 연산자', '//는 정수 나눗셈(몫), %는 나머지입니다. 17 // 5 = 3, 17 % 5 = 2.', ARRAY['"몫 연산자 //"', '"나머지 연산자 %"'], NULL, NULL),
(320, 'python', '31', '쉬움', '다음 코드의 출력 결과는?', 'text = ''Hi''
print(text * 3)', ARRAY['"Hi3"', '"HiHiHi"', '"Hi Hi Hi"', '"에러"'], 1, '문자열 * 숫자는 문자열을 그 수만큼 반복합니다. ''Hi'' * 3 = ''HiHiHi''', '문자열 반복 연산', 'str * n은 문자열을 n번 반복합니다. 구분자 없이 붙어서 반복됩니다.', ARRAY['"문자열 반복"', '"* 연산자"'], NULL, NULL),
(321, 'python', '31', '보통', '다음 코드의 출력 결과는?', 'text = ''Python''
print(text[1:4])', ARRAY['"Pyt"', '"yth"', '"ytho"', '"ython"'], 1, 'text[1:4]는 인덱스 1부터 3까지(4 미포함). ''y''=1, ''t''=2, ''h''=3 → ''yth''', '문자열 슬라이싱', 'str[start:end]는 start 인덱스부터 end-1까지 추출합니다.', ARRAY['"슬라이싱"', '"문자열 인덱싱"'], NULL, NULL),
(322, 'python', '31', '보통', '다음 코드에서 출력 결과로 알맞은 것은?', 'nums = [5, 2, 8, 1, 9, 3]
nums.sort()
print(nums[0], nums[-1])', ARRAY['"5 9"', '"1 9"', '"5 3"', '"2 8"'], 1, 'sort()로 정렬하면 [1, 2, 3, 5, 8, 9]. nums[0]=1(최솟값), nums[-1]=9(최댓값)', 'sort() 후 첫/마지막 요소', 'sort() 후 [0]은 최솟값, [-1]은 최댓값입니다.', ARRAY['"sort()"', '"인덱스 -1"', '"최솟값/최댓값"'], NULL, NULL),
(323, 'python', '31', '어려움', '다음 코드의 출력 결과는?', 'result = ''''
for ch in ''Python'':
    if ch.islower():
        result += ch.upper()
    else:
        result += ch.lower()
print(result)', ARRAY['"Python"', '"pYTHON"', '"PYTHON"', '"python"'], 1, '''P''는 대문자→소문자 ''p'', ''y'',''t'',''h'',''o'',''n''은 소문자→대문자. 결과: ''pYTHON''', '문자열 대소문자 변환', 'islower()로 소문자 확인, upper()/lower()로 변환. 대소문자를 반전시킬 때 사용합니다.', ARRAY['"islower()"', '"upper()"', '"lower()"', '"문자열 순회"'], NULL, NULL),
(360, 'python', '1', '쉬움', '다음 코드의 출력 결과는?', 'print(''안녕'' + ''하세요'')', ARRAY['"안녕 하세요"', '"안녕하세요"', '"오류"', '"''안녕하세요''"'], 1, '문자열끼리 +로 연결하면 붙여쓰기가 돼요. ''안녕'' + ''하세요'' = ''안녕하세요''', '문자열 연결 (+)', 'print() 안에서 +로 문자열을 이어붙일 수 있어요. 공백을 넣으려면 직접 추가해야 해요.', ARRAY['"문자열 연결"', '"print()"'], NULL, NULL),
(361, 'python', '1', '쉬움', '다음 중 오류(에러)가 나는 코드는?', 'a. print(''Hello'')
b. print(Hello)
c. print("Hello")', ARRAY['"a"', '"b"', '"c"', '"a와 c"'], 1, 'b는 따옴표 없이 Hello를 썼어요. 파이썬은 이걸 변수로 인식하는데, Hello라는 변수가 없으니 NameError가 나요.', '문자열에는 따옴표 필수!', '글자를 출력할 때는 반드시 따옴표('' '' 또는 " ")로 감싸야 해요. 따옴표가 없으면 변수로 인식해요.', ARRAY['"print()"', '"문자열"', '"NameError"'], NULL, NULL),
(362, 'python', '1', '쉬움', '다음 코드의 출력 결과는?', 'print(''치킨'', 19000, ''원'')', ARRAY['"치킨19000원"', '"치킨 19000 원"', '"오류"', '"''치킨'' 19000 ''원''"'], 1, 'print()에서 쉼표(,)로 여러 값을 나열하면 자동으로 공백이 들어가요.', 'print() 쉼표 구분', 'print(a, b, c)처럼 쉼표로 구분하면 각 값 사이에 공백 1칸이 자동으로 들어가요.', ARRAY['"print()"', '"쉼표"', '"sep"'], NULL, NULL),
(363, 'python', '1', '쉬움', '다음 코드의 출력 결과는?', 'print(19000 + 2000)', ARRAY['"190002000"', '"21000"', '"오류"', '"19000 + 2000"'], 1, 'print() 안에서 숫자 계산이 먼저 실행돼요. 19000 + 2000 = 21000이 출력돼요.', 'print() 안에서 계산', 'print(10 + 20)처럼 괄호 안에 계산식을 넣으면 계산 결과가 출력돼요.', ARRAY['"print()"', '"산술 연산자"'], NULL, NULL),
(364, 'python', '3', '쉬움', '다음 코드 실행 후 chicken의 값은?', 'chicken = 19000
chicken = 20000
print(chicken)', ARRAY['"19000"', '"20000"', '"39000"', '"오류"'], 1, '같은 변수에 새 값을 대입하면 덮어써져요. 마지막에 대입된 20000이 chicken의 값이에요.', '변수 덮어쓰기', '변수에 새 값을 대입하면 이전 값은 사라지고 새 값으로 바뀌어요.', ARRAY['"변수 대입"', '"="'], NULL, NULL),
(365, 'python', '3', '쉬움', '다음 코드 실행 후 money의 값은?', 'money = 50000
money = money - 19000
print(money)', ARRAY['"50000"', '"19000"', '"31000"', '"오류"'], 2, 'money = money - 19000은 현재 money(50000)에서 19000을 빼서 다시 money에 저장해요. 50000 - 19000 = 31000', '변수 업데이트', '변수 = 변수 - 값 패턴으로 변수를 업데이트할 수 있어요. money -= 19000과 같은 의미예요.', ARRAY['"변수 업데이트"', '"-="', '"대입 연산자"'], NULL, NULL),
(366, 'python', '4', '쉬움', '다음 코드의 출력 결과는?', 'print(10 >= 10)', ARRAY['"True"', '"False"', '"10"', '"오류"'], 0, '>= 는 ''크거나 같다''를 의미해요. 10은 10 이상이니까 True예요.', '비교 연산자 >=', '>= 는 ''크거나 같다''를 확인하는 비교 연산자예요. 결과는 True 또는 False로 나와요.', ARRAY['"비교 연산자"', '">="', '"bool"'], NULL, NULL),
(368, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'level = 10
gold = 500
print(level >= 10 and gold >= 1000)', ARRAY['"True"', '"False"', '"오류"', '"level >= 10"'], 1, 'level >= 10은 True, gold >= 1000은 False예요. and는 둘 다 True여야 True인데, 하나가 False라 결과는 False예요.', 'and 연산자', 'and는 두 조건이 모두 True일 때만 True를 반환해요. 하나라도 False면 False예요.', ARRAY['"and"', '"논리 연산자"', '"bool"'], NULL, NULL),
(369, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'is_member = True
has_coupon = False
print(is_member or has_coupon)', ARRAY['"True"', '"False"', '"오류"', '"True False"'], 0, 'or는 둘 중 하나라도 True면 True예요. is_member가 True라서 결과는 True예요.', 'or 연산자', 'or는 두 조건 중 하나라도 True면 True를 반환해요. 둘 다 False여야만 False예요.', ARRAY['"or"', '"논리 연산자"', '"bool"'], NULL, NULL),
(370, 'python', '5', '쉬움', '다음 코드의 출력 결과는?', 'a = ''파이''
b = ''썬''
print(a + b + '' 최고!'')', ARRAY['"파이 썬 최고!"', '"파이썬 최고!"', '"오류"', '"a + b + '' 최고!''"'], 1, '''파이'' + ''썬'' + '' 최고!''를 차례로 이어붙이면 ''파이썬 최고!''가 돼요.', '문자열 연결 (+)', '변수에 저장된 문자열도 +로 이어붙일 수 있어요.', ARRAY['"문자열 연결"', '"+"', '"변수"'], NULL, NULL),
(371, 'python', '5', '쉬움', '다음 코드의 출력 결과는?', 'print(''#'' * 10)', ARRAY['"10"', '"##########"', '"# * 10"', '"오류"'], 1, '문자열 * 숫자는 문자열을 그 횟수만큼 반복해요. ''#'' * 10 = ''##########''', '문자열 반복 (*)', '문자열 * 숫자로 문자열을 반복할 수 있어요. 구분선이나 테두리 만들 때 유용해요.', ARRAY['"문자열 반복"', '"*"'], NULL, NULL),
(372, 'python', '9', '쉬움', '다음 코드의 출력 결과는?', 'print(''나이: '' + 15)', ARRAY['"나이: 15"', '"나이:15"', '"오류"', '"나이:  15"'], 2, '문자열과 숫자는 + 로 바로 연결할 수 없어요. str(15)로 변환하거나 f-string을 쓰면 돼요.', '문자열 + 숫자는 오류!', 'str + int는 TypeError가 나요. str(숫자) 또는 f''나이: {15}''처럼 변환이 필요해요.', ARRAY['"TypeError"', '"str()"', '"f-string"'], NULL, '{"wrong":"print(''나이: '' + 15)     # TypeError!","correct":"print(''나이: '' + str(15))  # OK!"}'::jsonb),
(373, 'python', '11', '쉬움', '다음 코드의 출력 결과는?', 'hp = 0
if hp > 0:
    print(''살아있음!'')
    print(''전투 계속!'')
print(''게임 진행 중...'')', ARRAY['"살아있음!
전투 계속!
게임 진행 중..."', '"게임 진행 중..."', '"살아있음!
게임 진행 중..."', '"아무것도 출력 안 됨"'], 1, 'hp가 0이라 hp > 0은 False예요. if 안의 두 줄은 건너뛰고, 들여쓰기 없는 마지막 줄만 실행돼요.', 'if 들여쓰기', '들여쓰기된 코드는 if 조건이 True일 때만 실행돼요. 들여쓰기 없는 코드는 조건과 상관없이 항상 실행돼요.', ARRAY['"if"', '"들여쓰기"', '"조건문"'], NULL, NULL),
(374, 'python', '11', '쉬움', '다음 코드의 출력 결과는?', 'followers = 1500
if followers >= 10000:
    print(''인플루언서'')
elif followers >= 1000:
    print(''인싸'')
elif followers >= 100:
    print(''일반인'')
else:
    print(''시작 단계'')', ARRAY['"인플루언서"', '"인싸"', '"일반인"', '"시작 단계"'], 1, '1500 >= 10000은 False(다음으로), 1500 >= 1000은 True! 여기서 멈추고 ''인싸''를 출력해요.', 'elif - 첫 번째 True에서 멈춤', 'elif는 위에서 순서대로 확인해서 처음으로 True인 조건만 실행해요. 나머지는 확인하지 않아요.', ARRAY['"elif"', '"if-elif-else"', '"조건문"'], NULL, NULL),
(375, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'level = 15
gold = 500
if level >= 10 and gold >= 1000:
    print(''상점 입장!'')
else:
    print(''조건 부족!'')', ARRAY['"상점 입장!"', '"조건 부족!"', '"오류"', '"아무것도 출력 안 됨"'], 1, 'level >= 10은 True지만 gold >= 1000은 False예요. and는 둘 다 True여야 해서 결과는 False → else 실행!', 'and는 둘 다 True여야', 'and 조건은 양쪽이 모두 True여야 실행돼요. 하나라도 False면 else로 가요.', ARRAY['"and"', '"논리 연산자"', '"if-else"'], NULL, NULL),
(376, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'age = 70
if age <= 12 or age >= 65:
    print(''50% 할인!'')
else:
    print(''정상 가격'')', ARRAY['"50% 할인!"', '"정상 가격"', '"오류"', '"True"'], 0, 'age <= 12는 False지만, age >= 65는 True예요. or는 하나만 True여도 True라서 할인!', 'or는 하나만 True여도', 'or 조건은 두 조건 중 하나만 True여도 실행돼요. 둘 다 False여야만 else로 가요.', ARRAY['"or"', '"논리 연산자"', '"if-else"'], NULL, NULL),
(377, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'is_raining = False
if not is_raining:
    print(''산책 가자!'')
else:
    print(''집에 있자'')', ARRAY['"산책 가자!"', '"집에 있자"', '"False"', '"오류"'], 0, 'is_raining이 False라서 not is_raining은 True예요. if가 실행돼서 ''산책 가자!''가 출력돼요.', 'not - 조건 반전', 'not은 True를 False로, False를 True로 뒤집어요. ''not 조건''은 조건이 거짓일 때 실행하고 싶을 때 써요.', ARRAY['"not"', '"논리 연산자"', '"bool"'], NULL, NULL),
(378, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(10):
    if i == 3:
        break
    print(i)', ARRAY['"0 1 2 3"', '"0
1
2
3"', '"0
1
2"', '"1
2
3"'], 2, 'i가 3일 때 break를 만나서 즉시 반복문을 탈출해요. 3은 출력 안 되고 0, 1, 2만 출력돼요.', 'break - 반복문 탈출', 'break는 반복문을 즉시 종료해요. break가 실행되는 순간 for/while을 완전히 빠져나가요.', ARRAY['"break"', '"for"', '"반복문 제어"'], NULL, NULL),
(379, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(1, 6):
    if i % 2 == 0:
        continue
    print(i)', ARRAY['"1
2
3
4
5"', '"2
4"', '"1
3
5"', '"오류"'], 2, 'i % 2 == 0은 짝수일 때 True예요. 짝수면 continue로 건너뛰어서 홀수(1, 3, 5)만 출력돼요.', 'continue - 이번만 건너뛰기', 'continue는 그 회차의 나머지 코드를 건너뛰고 다음 반복으로 넘어가요. 반복문 자체는 계속 실행돼요.', ARRAY['"continue"', '"for"', '"나머지 연산자 %"'], NULL, NULL),
(380, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print(''로딩'', end=''...'')
print(''완료!'')', ARRAY['"로딩
완료!"', '"로딩...완료!"', '"로딩... 완료!"', '"오류"'], 1, 'end=''...''로 줄바꿈 대신 ''...''이 붙어요. 다음 print()가 바로 이어서 출력되어 ''로딩...완료!''가 돼요.', 'end 옵션 — 줄바꿈 대신 다른 문자', 'print()는 기본으로 끝에 줄바꿈(\n)을 넣어요. end=''...''처럼 바꾸면 줄바꿈 없이 원하는 문자가 붙어요.', ARRAY['"end"', '"print() 옵션"', '"줄바꿈"'], NULL, NULL),
(381, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print(2024, 12, 25, sep=''/'')', ARRAY['"2024 12 25"', '"2024/12/25"', '"2024-12-25"', '"오류"'], 1, 'sep=''/''는 각 값 사이에 ''/''를 넣어요. 기본값은 공백('' '')인데 바꿀 수 있어요.', 'sep 옵션 — 값 사이 구분자 변경', 'print(a, b, c, sep=''-'')처럼 sep으로 값들 사이 구분자를 지정해요. 날짜, 경로 출력에 유용해요.', ARRAY['"sep"', '"print() 옵션"'], NULL, NULL),
(382, 'python', '8', '쉬움', '다음 코드의 출력 결과는?', 'food = ''치킨''
price = 19000
print(f''{food}: {price}원'')', ARRAY['"food: price원"', '"치킨: 19000원"', '"오류"', '"{food}: {price}원"'], 1, 'f-string의 {} 안에 변수를 넣으면 변수 값으로 바뀌어요. food=''치킨'', price=19000이니 ''치킨: 19000원''이 출력돼요.', 'f-string 기본 — 변수 넣기', 'f''텍스트 {변수} 텍스트'' 형태로 쓰면 {}안의 변수가 실제 값으로 바뀌어요. f를 앞에 붙이는 것을 잊지 마세요!', ARRAY['"f-string"', '"문자열 포매팅"'], NULL, NULL),
(383, 'python', '8', '쉬움', '다음 코드의 출력 결과는?', 'chicken = 19000
count = 3
print(f''치킨 {count}마리: {chicken * count}원'')', ARRAY['"치킨 count마리: chicken * count원"', '"치킨 3마리: 57000원"', '"오류"', '"치킨 3마리: chicken * count원"'], 1, 'f-string의 {} 안에서 계산도 돼요. {count}는 3, {chicken * count}는 19000*3=57000이에요.', 'f-string — {} 안에서 계산', 'f-string의 {} 안에 변수뿐 아니라 계산식도 넣을 수 있어요. {price * count}처럼 쓰면 자동으로 계산돼요.', ARRAY['"f-string"', '"문자열 포매팅"', '"계산식"'], NULL, NULL),
(384, 'python', '8', '쉬움', '다음 코드의 출력 결과는?', 'name = ''홍길동''
print(''안녕, {name}!'')', ARRAY['"안녕, 홍길동!"', '"안녕, {name}!"', '"오류"', '"안녕, name!"'], 1, 'f를 붙이지 않은 일반 문자열이에요. {}가 변수로 해석되지 않고 그대로 ''{name}''이 출력돼요.', 'f 빠뜨리면 {} 그대로 출력', 'f-string은 앞에 반드시 f를 붙여야 해요. 없으면 {}가 변수가 아닌 일반 텍스트로 출력돼요.', ARRAY['"f-string"', '"자주 하는 실수"'], NULL, '{"wrong":"print(''안녕, {name}!'')    # f 없음 → {name} 그대로","correct":"print(f''안녕, {name}!'')   # f 있음 → 홍길동"}'::jsonb),
(385, 'python', '9', '쉬움', '다음 코드의 출력 결과는?', 'a = ''25''
b = ''10''
print(int(a) + int(b))', ARRAY['"2510"', '"35"', '"오류"', '"''35''"'], 1, 'int(''25'')는 25, int(''10'')는 10으로 바꿔요. 25 + 10 = 35 (숫자 더하기)예요.', 'int() — 문자열을 정수로', 'int(''숫자 문자열'')로 문자를 정수로 바꿔요. 바꾸지 않으면 ''25'' + ''10'' = ''2510'' (이어붙이기)이 돼요.', ARRAY['"int()"', '"타입 변환"', '"str vs int"'], NULL, NULL),
(386, 'python', '9', '쉬움', '다음 코드의 출력 결과는?', 'num = 42
print(''정답은 '' + str(num) + ''번!'')', ARRAY['"정답은 42번!"', '"오류"', '"정답은 num번!"', '"''정답은 '' + 42 + ''번!''"'], 0, 'str(42)은 ''42''(문자열)로 바꿔요. 이제 ''정답은 '' + ''42'' + ''번!''처럼 문자열끼리 연결돼요.', 'str() — 숫자를 문자열로', 'str(숫자)로 숫자를 문자열로 바꿔요. 문자열과 숫자를 + 로 연결할 때 꼭 필요해요.', ARRAY['"str()"', '"타입 변환"', '"문자열 연결"'], NULL, NULL),
(387, 'python', '9', '쉬움', '다음 중 오류가 나는 코드는?', 'a. int(''10'')
b. int(''3.14'')
c. float(''3.14'')', ARRAY['"a"', '"b"', '"c"', '"a와 c"'], 1, 'int()는 소수점 문자열을 바로 변환할 수 없어요. ''3.14'' → float 먼저 → int 순으로 해야 해요.', 'int()는 소수점 문자열 불가', 'int(''3.14'')는 ValueError가 나요. 소수점 문자열은 float()로 바꾸거나, int(float(''3.14''))처럼 두 단계로 해야 해요.', ARRAY['"int()"', '"float()"', '"ValueError"'], NULL, '{"wrong":"int(''3.14'')          # ValueError!","correct":"float(''3.14'')        # 3.14\nint(float(''3.14''))   # 3"}'::jsonb),
(388, 'python', '10', '쉬움', '다음 코드에서 사용자가 ''15''를 입력하면 출력 결과는?', 'age = input(''나이: '')
print(type(age))', ARRAY['"<class ''int''>"', '"<class ''str''>"', '"<class ''float''>"', '"15"'], 1, 'input()은 항상 문자열(str)을 반환해요. 숫자 ''15''를 입력해도 str 타입으로 저장돼요.', 'input()은 항상 str 반환', 'input()은 숫자를 입력해도 항상 문자열로 반환해요. 계산에 쓰려면 int(input())처럼 변환이 필요해요.', ARRAY['"input()"', '"str"', '"타입 변환"'], NULL, NULL),
(389, 'python', '10', '쉬움', '다음 코드에서 사용자가 ''5''를 입력하면 출력 결과는?', 'num = int(input(''숫자: ''))
print(num + 10)', ARRAY['"510"', '"15"', '"오류"', '"''5'' + 10"'], 1, 'int(input())으로 입력받은 문자열 ''5''를 정수 5로 바꿔요. 5 + 10 = 15가 출력돼요.', 'int(input()) — 숫자 입력 패턴', '숫자를 입력받아 계산할 때는 int(input(''메시지''))처럼 감싸면 바로 정수로 저장돼요.', ARRAY['"input()"', '"int()"', '"숫자 입력"'], NULL, NULL),
(390, 'python', '18', '쉬움', '다음 코드의 출력 결과는?', 'fruits = ''사과 바나나 포도''.split()
print(fruits)', ARRAY['"사과 바나나 포도"', '"[''사과 바나나 포도'']"', '"[''사과'', ''바나나'', ''포도'']"', '"오류"'], 2, 'split()은 공백을 기준으로 나눠서 리스트를 만들어요. ''사과 바나나 포도'' → [''사과'', ''바나나'', ''포도'']', 'split() — 공백으로 나눠 리스트로', '문자열.split()은 공백을 기준으로 나눠서 리스트로 만들어요. 여러 값을 한 줄에 입력받을 때 유용해요.', ARRAY['"split()"', '"리스트"', '"문자열"'], NULL, NULL),
(391, 'python', '18', '쉬움', '다음 코드의 출력 결과는?', 'fruits = [''사과'', ''바나나'', ''포도'']
print('', ''.join(fruits))', ARRAY['"[''사과'', ''바나나'', ''포도'']"', '"사과 바나나 포도"', '"사과, 바나나, 포도"', '"오류"'], 2, ''', ''.join(리스트)는 리스트 항목들 사이에 '', ''를 넣어서 하나의 문자열로 합쳐요.', 'join() — 리스트를 문자열로', '''구분자''.join(리스트)로 리스트를 하나의 문자열로 합쳐요. split()의 반대 동작이에요.', ARRAY['"join()"', '"리스트"', '"문자열"'], NULL, NULL),
(392, 'python', '18', '쉬움', '다음 코드의 출력 결과는?', '날짜 = ''2024-12-25''.split(''-'')
print(날짜[1])', ARRAY['"2024"', '"12"', '"25"', '"[''2024'', ''12'', ''25'']"'], 1, 'split(''-'')은 ''-''를 기준으로 나눠요. [''2024'', ''12'', ''25'']가 되고, [1]은 두 번째 항목 ''12''예요.', 'split(구분자) — 특정 문자로 나누기', 'split() 안에 구분자를 넣으면 그 문자를 기준으로 나눠요. split(''-''), split('','') 등으로 다양하게 사용해요.', ARRAY['"split()"', '"구분자"', '"인덱스"'], NULL, NULL),
(393, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'numbers = list(map(int, ''10 20 30''.split()))
print(numbers[0] + numbers[1])', ARRAY['"1020"', '"30"', '"[''10'', ''20'', ''30'']"', '"오류"'], 1, 'split()으로 [''10'',''20'',''30''] (문자열)이 되고, map(int,...)으로 [10, 20, 30] (정수)가 돼요. 10 + 20 = 30.', 'map(int, split()) — 숫자 여러 개 입력', 'list(map(int, input().split()))는 공백으로 구분된 숫자들을 한 번에 정수 리스트로 받는 표준 패턴이에요.', ARRAY['"map()"', '"int()"', '"split()"', '"리스트"'], NULL, NULL),
(300, 'python', '35', '어려움', '다음 코드의 출력 결과는?', 'matrix = [[1,2,3],[4,5,6],[7,8,9]]
diag = [matrix[i][i] for i in range(len(matrix))]
anti = [matrix[i][len(matrix)-1-i] for i in range(len(matrix))]
print(diag, anti)', ARRAY['"[1, 5, 9] [3, 5, 7]"', '"[1, 4, 7] [3, 6, 9]"', '"[1, 2, 3] [7, 8, 9]"', '"오류"'], 0, '대각선은 matrix[0][0], matrix[1][1], matrix[2][2] = [1,5,9]. 반대 대각선은 matrix[0][2], matrix[1][1], matrix[2][0] = [3,5,7].', '행렬 대각선 추출', '주대각선은 matrix[i][i], 반대각선은 matrix[i][n-1-i]로 추출합니다.', ARRAY['"2D 리스트"', '"대각선"', '"행렬 연산"'], NULL, NULL),
(394, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print(''철수'', ''영희'', ''민수'', sep='', '')', ARRAY['"철수 영희 민수"', '"철수, 영희, 민수"', '"철수,영희,민수"', '"오류"'], 1, 'sep='', ''는 각 값 사이에 '', ''(쉼표+공백)을 넣어요. ''철수, 영희, 민수''가 출력돼요.', 'sep 옵션 — 쉼표 구분자', 'print(a, b, c, sep='', '')처럼 sep을 지정하면 값들 사이에 원하는 구분자를 넣을 수 있어요. 기본값은 공백('' '')이에요.', ARRAY['"sep"', '"print() 옵션"', '"구분자"'], NULL, NULL),
(395, 'python', '7', '쉬움', '다음 코드의 출력 결과는?', 'print(''A'', ''B'', ''C'', sep='''')', ARRAY['"A B C"', '"A-B-C"', '"ABC"', '"오류"'], 2, 'sep=''''(빈 문자열)은 구분자가 없다는 뜻이에요. 값들이 붙어서 ''ABC''가 출력돼요.', 'sep='''' — 구분자 없이 이어붙이기', 'sep=''''로 설정하면 값들 사이에 아무것도 없이 바로 이어 붙여요. print(''A'',''B'',''C'', sep='''')는 ''ABC''를 출력해요.', ARRAY['"sep"', '"print() 옵션"', '"이어붙이기"'], NULL, NULL),
(396, 'python', '7', '쉬움', '다음 코드를 실행하면 출력은 몇 줄인가?', 'print(''1'', end='' '')
print(''2'', end='' '')
print(''3'')', ARRAY['"3줄"', '"1줄"', '"2줄"', '"오류"'], 1, 'end='' ''는 줄바꿈 대신 공백을 붙여요. 첫 두 print가 줄바꿈 없이 이어지고, 마지막 print만 줄바꿈이 돼서 전체 1줄로 출력돼요.', 'end 옵션 — 줄바꿈 방지', 'print()는 기본으로 끝에 줄바꿈(\n)을 붙여요. end='' ''처럼 바꾸면 줄바꿈 없이 지정한 문자가 붙어서 다음 print가 이어져요.', ARRAY['"end"', '"print() 옵션"', '"줄바꿈"'], NULL, NULL),
(397, 'python', '35', '쉬움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
print(*nums)', ARRAY['"[1, 2, 3, 4, 5]"', '"1 2 3 4 5"', '"12345"', '"오류"'], 1, 'print(*리스트)는 리스트를 풀어서 각 요소를 개별 인자로 전달해요. 기본 sep이 공백이므로 ''1 2 3 4 5''가 출력돼요.', 'print(*리스트) — 리스트 언패킹 출력', '* 연산자로 리스트를 풀어서 print에 전달하면 각 요소가 공백으로 구분되어 출력돼요. for 문 없이 한 줄로 출력할 때 편리해요.', ARRAY['"언패킹"', '"print() 옵션"', '"리스트"'], NULL, NULL),
(398, 'python', '35', '보통', '다음 코드의 출력 결과는?', 'nums = [10, 20, 30]
print(*nums, sep=''-'')', ARRAY['"[10, 20, 30]"', '"10 20 30"', '"10-20-30"', '"오류"'], 2, '*nums로 리스트를 풀면 print(10, 20, 30, sep=''-'')와 같아져요. sep=''-''로 구분해서 ''10-20-30''이 출력돼요.', 'print(*리스트, sep=...)  — 조합', 'print(*리스트, sep=구분자)를 쓰면 리스트 요소들을 원하는 구분자로 한 줄에 출력할 수 있어요.', ARRAY['"언패킹"', '"sep"', '"print() 옵션"'], NULL, NULL),
(399, 'python', '7', '보통', '다음 코드의 출력 결과는?', 'print(''A'', ''B'', sep=''*'', end=''!\n'')
print(''끝'')', ARRAY['"A*B!
끝"', '"A B!
끝"', '"A*B
끝"', '"A*B!끝"'], 0, 'sep=''*''으로 ''A*B''가 되고, end=''!\n''으로 ''!''와 줄바꿈이 붙어요. 다음 줄에 ''끝''이 출력돼요.', 'sep과 end 동시 사용', 'sep과 end를 함께 쓸 수 있어요. sep은 값 사이, end는 출력 끝에 각각 적용돼요. 순서는 바뀌어도 결과는 같아요.', ARRAY['"sep"', '"end"', '"print() 옵션"'], NULL, NULL),
(400, 'python', '10', '쉬움', '다음 코드에서 사용자가 ''홍길동''을 입력했을 때 출력 결과는?', 'name = input(''이름: '')
print(''안녕,'', name + ''!'')', ARRAY['"안녕, 홍길동!"', '"안녕, name!"', '"안녕,홍길동!"', '"오류"'], 0, 'input()으로 ''홍길동''을 받아 name에 저장해요. print(''안녕,'', ''홍길동!'')은 ''안녕, 홍길동!''을 출력해요.', 'input(''메시지'') — 안내 문구와 함께 입력받기', 'input(''메시지'')처럼 괄호 안에 문자열을 넣으면 입력받기 전에 안내 문구를 보여줘요. 입력값은 항상 str로 반환돼요.', ARRAY['"input()"', '"str"', '"출력"'], NULL, NULL),
(401, 'python', '10', '쉬움', '다음 코드에서 사용자가 ''3.14''를 입력했을 때 출력 결과는?', 'pi = float(input(''파이 값: ''))
print(pi * 2)', ARRAY['"6.28"', '"3.143.14"', '"오류"', '"3.14"'], 0, 'float(input())으로 ''3.14''를 실수 3.14로 바꿔요. 3.14 * 2 = 6.28이 출력돼요.', 'float(input()) — 실수 입력 패턴', '소수점이 있는 숫자를 입력받으려면 float(input(''메시지''))를 써요. int()는 소수점 문자열을 변환할 수 없어서 오류가 나요.', ARRAY['"float()"', '"input()"', '"타입 변환"'], NULL, NULL),
(402, 'python', '10', '쉬움', '다음 코드에서 사용자가 ''10''을 입력하면 어떤 오류가 발생하는가?', 'num = input(''숫자: '')
print(num + 5)', ARRAY['"SyntaxError"', '"TypeError"', '"ValueError"', '"오류 없음, 15 출력"'], 1, 'input()은 ''10'' (문자열)을 반환해요. 문자열 + 정수는 TypeError(타입 오류)가 발생해요.', 'input() 후 형변환 필수', 'input()의 결과는 str이므로 숫자 연산 전에 반드시 int() 또는 float()로 변환해야 해요. 그렇지 않으면 TypeError가 발생해요.', ARRAY['"input()"', '"TypeError"', '"타입 변환"'], NULL, '{"wrong":"num = input(''숫자: '')  # str\nprint(num + 5)         # TypeError!","correct":"num = int(input(''숫자: ''))  # int\nprint(num + 5)              # 정상!"}'::jsonb),
(403, 'python', '18', '쉬움', '사용자가 ''3 7''을 입력했을 때 다음 코드의 출력 결과는?', 'a, b = input(''두 숫자: '').split()
print(a, b)', ARRAY['"3 7"', '"[''3'', ''7'']"', '"37"', '"오류"'], 0, '''3 7''.split()은 [''3'', ''7'']이 되고, a, b로 각각 언패킹돼요. print(a, b)는 ''3 7''을 출력해요.', 'input().split() — 여러 값 한 줄 입력', 'input().split()은 한 줄에 공백으로 구분된 여러 값을 받아 리스트로 만들어요. a, b = input().split()처럼 언패킹해서 각 변수에 저장할 수 있어요.', ARRAY['"split()"', '"input()"', '"언패킹"'], NULL, NULL),
(404, 'python', '35', '보통', '사용자가 ''10 20''을 입력했을 때 다음 코드의 출력 결과는?', 'a, b = map(int, input(''두 수: '').split())
print(a + b)', ARRAY['"1020"', '"30"', '"[''10'', ''20'']"', '"오류"'], 1, 'split()으로 [''10'', ''20'']이 되고, map(int, ...)으로 각각 정수 10, 20으로 변환돼요. a=10, b=20이므로 a+b=30이에요.', 'map(int, input().split()) — 정수 여러 개 입력', 'a, b = map(int, input().split())은 공백으로 구분된 정수 여러 개를 한 번에 받는 표준 패턴이에요. 코딩 테스트에서 자주 써요.', ARRAY['"map()"', '"split()"', '"input()"', '"언패킹"'], NULL, NULL),
(405, 'python', '10', '보통', '사용자가 ''5''를 입력했을 때 다음 코드의 출력 결과는?', 'n = int(input(''반지름: ''))
area = 3.14 * n * n
print(f''넓이: {area}'')', ARRAY['"넓이: 78.5"', '"넓이: 5"', '"오류"', '"넓이: 3.14 * 5 * 5"'], 0, 'int(input())으로 5를 받아요. 3.14 * 5 * 5 = 78.5. f-string으로 ''넓이: 78.5''가 출력돼요.', '입력값으로 계산하기', 'int(input())으로 숫자를 받아 계산식에 바로 사용할 수 있어요. 면적, 거리, 점수 등 다양한 계산에 활용해요.', ARRAY['"int(input())"', '"계산"', '"f-string"'], NULL, NULL),
(406, 'python', '19', '쉬움', '파이썬에서 수정이 불가능한(불변) 자료구조는?', 'a = [1, 2, 3]   # ?
b = (1, 2, 3)   # ?', ARRAY['"리스트 (list)"', '"튜플 (tuple)"', '"딕셔너리 (dict)"', '"집합 (set)"'], 1, '튜플은 한 번 만들면 요소를 변경할 수 없어요. 리스트, 딕셔너리, 집합은 모두 수정 가능(가변)이에요.', '튜플 — 불변(immutable) 자료구조', '튜플은 ()로 만들고 수정이 불가능해요. 좌표, RGB 색상처럼 변경하면 안 되는 값을 저장할 때 사용해요.', ARRAY['"튜플"', '"불변"', '"가변 vs 불변"'], NULL, NULL),
(407, 'python', '21', '쉬움', '중복된 값을 자동으로 제거해주는 자료구조는?', 'data = [1, 2, 2, 3, 3, 3]
unique = set(data)
print(unique)', ARRAY['"리스트 (list)"', '"튜플 (tuple)"', '"딕셔너리 (dict)"', '"집합 (set)"'], 3, '집합(set)은 중복을 허용하지 않아요. [1, 2, 2, 3, 3, 3]을 set으로 변환하면 {1, 2, 3}이 돼요.', '집합 (set) — 중복 자동 제거', '집합은 {}로 만들고 중복을 허용하지 않아요. 출석부, 방문자 목록처럼 중복 없이 고유한 값만 관리할 때 사용해요.', ARRAY['"집합"', '"중복 제거"', '"set()"'], NULL, NULL),
(408, 'python', '16', '쉬움', '다음 중 리스트의 특징으로 올바른 것은?', 'fruits = [''사과'', ''바나나'', ''포도'']
fruits.append(''망고'')
print(fruits[0])', ARRAY['"순서가 없고 수정 불가능하다"', '"순서가 있고 수정 가능하다"', '"키-값 쌍으로 저장한다"', '"중복을 허용하지 않는다"'], 1, '리스트는 순서가 있고(인덱스로 접근 가능), 수정도 가능해요(append, remove 등). 중복도 허용해요.', '리스트 — 순서 있고 수정 가능', '리스트는 []로 만들고 순서가 있어요. 인덱스(0, 1, 2...)로 접근하고 append(), pop() 등으로 수정할 수 있어요.', ARRAY['"리스트"', '"순서"', '"가변"'], NULL, NULL),
(409, 'python', '20', '보통', '다음 상황에서 가장 적합한 자료구조는? ''반 학생 30명의 이름과 각자의 점수를 저장하고, 이름으로 빠르게 점수를 찾고 싶다''', '# 어떤 자료구조가 가장 좋을까?
# (1) scores = [85, 92, 78, ...]
# (2) scores = {''철수'': 85, ''영희'': 92, ...}
# (3) scores = (85, 92, 78, ...)', ARRAY['"리스트 (1번)"', '"딕셔너리 (2번)"', '"튜플 (3번)"', '"집합"'], 1, '이름(키)으로 점수(값)를 빠르게 찾으려면 딕셔너리가 가장 적합해요. scores[''철수'']처럼 O(1)로 바로 접근할 수 있어요.', '딕셔너리 — 이름으로 빠르게 찾기', '딕셔너리는 키를 이용해 값을 O(1)로 빠르게 검색해요. ''이름으로 찾기'', ''단어장'', ''학생 정보'' 등 연관 데이터를 저장할 때 최적이에요.', ARRAY['"딕셔너리"', '"자료구조 선택"', '"키-값"'], NULL, NULL),
(410, 'python', '21', '보통', '다음 코드에서 집합의 출력 결과로 올바른 것은?', 'attendance = {''철수'', ''영희'', ''철수'', ''민수'', ''영희''}
print(len(attendance))', ARRAY['"5"', '"3"', '"2"', '"오류"'], 1, '집합은 중복을 제거해요. ''철수''와 ''영희''가 각각 2번 나오지만 1번씩만 저장돼요. 결과는 {''철수'', ''영희'', ''민수''}로 3개예요.', '집합의 중복 제거 특성', '집합에 같은 값을 여러 번 넣어도 하나만 유지돼요. len(집합)으로 고유한 항목 수를 알 수 있어요.', ARRAY['"집합"', '"중복 제거"', '"len()"'], NULL, NULL),
(411, 'python', '19', '보통', '리스트와 튜플의 차이를 묻는 질문에 올바른 답변은?', 'my_list = [1, 2, 3]
my_tuple = (1, 2, 3)

my_list[0] = 99   # 가능?
my_tuple[0] = 99  # 가능?', ARRAY['"둘 다 수정 가능하다"', '"리스트는 수정 가능, 튜플은 수정 불가능"', '"리스트는 수정 불가능, 튜플은 수정 가능"', '"둘 다 수정 불가능하다"'], 1, '리스트는 my_list[0] = 99처럼 수정 가능(가변)해요. 튜플은 TypeError가 발생해서 수정 불가능(불변)이에요.', '리스트(가변) vs 튜플(불변)', '리스트: 수정 가능(mutable). 튜플: 수정 불가능(immutable). 변경이 필요하면 리스트, 고정값이면 튜플을 써요.', ARRAY['"리스트"', '"튜플"', '"가변 vs 불변"'], NULL, '{"wrong":"my_tuple = (1, 2, 3)\nmy_tuple[0] = 99  # TypeError!","correct":"my_list = [1, 2, 3]\nmy_list[0] = 99   # OK: [99, 2, 3]"}'::jsonb),
(412, 'python', '24', '쉬움', '큐(Queue)에 A, B, C 순서로 넣고 하나씩 꺼낼 때 꺼내지는 순서는?', 'from collections import deque
q = deque()
q.append(''A'')
q.append(''B'')
q.append(''C'')
# 꺼내는 순서는?', ARRAY['"C, B, A"', '"A, B, C"', '"B, A, C"', '"랜덤"'], 1, '큐는 FIFO(First In, First Out)예요. 먼저 넣은 A가 먼저 나오고, 그 다음 B, C 순서예요.', '큐의 FIFO 순서', '큐는 줄 서기와 같아요. 먼저 온(넣은) 것이 먼저 처리(나옴)돼요. append()로 뒤에 추가하고, popleft()로 앞에서 꺼내요.', ARRAY['"FIFO"', '"큐"', '"deque"'], NULL, NULL),
(413, 'python', '24', '쉬움', '다음 코드의 출력 결과는?', 'from collections import deque
q = deque([''가'', ''나'', ''다''])
q.append(''라'')
print(q.popleft())
print(len(q))', ARRAY['"가
3"', '"라
3"', '"가
4"', '"오류"'], 0, 'append(''라'')로 [''가'',''나'',''다'',''라'']가 돼요. popleft()는 맨 앞 ''가''를 꺼내요. 남은 건 [''나'',''다'',''라'']로 len=3이에요.', 'deque enqueue/dequeue', 'deque에서 큐로 사용할 때: append()로 뒤에 추가(enqueue), popleft()로 앞에서 제거(dequeue)해요.', ARRAY['"deque"', '"append()"', '"popleft()"'], NULL, NULL),
(414, 'python', '24', '쉬움', '큐와 스택의 차이에 대한 설명으로 올바른 것은?', '# 스택: LIFO (Last In, First Out)
# 큐: FIFO (First In, First Out)', ARRAY['"스택과 큐 모두 FIFO 방식이다"', '"스택은 LIFO, 큐는 FIFO 방식이다"', '"스택은 FIFO, 큐는 LIFO 방식이다"', '"둘 다 랜덤으로 꺼낸다"'], 1, '스택은 나중에 넣은 것이 먼저 나오는 LIFO(프링글스 통), 큐는 먼저 넣은 것이 먼저 나오는 FIFO(줄 서기)예요.', '스택(LIFO) vs 큐(FIFO)', '스택: 위에서만 넣고 빼는 LIFO. 큐: 뒤에 넣고 앞에서 빼는 FIFO. 상황에 따라 적합한 자료구조를 선택해요.', ARRAY['"스택"', '"큐"', '"LIFO"', '"FIFO"'], NULL, NULL),
(415, 'python', '24', '보통', '다음 코드의 출력 결과는?', 'from collections import deque

q = deque()
for i in [1, 2, 3, 4, 5]:
    q.append(i)

result = []
while q:
    result.append(q.popleft())
print(result)', ARRAY['"[5, 4, 3, 2, 1]"', '"[1, 2, 3, 4, 5]"', '"[3, 2, 1, 4, 5]"', '"오류"'], 1, '1~5를 순서대로 append()로 넣고, popleft()로 앞에서 꺼내요. FIFO라 넣은 순서대로 [1, 2, 3, 4, 5]가 나와요.', '큐로 순서 유지하기', '큐(deque)에 append()로 순서대로 넣고 popleft()로 꺼내면 넣은 순서가 그대로 유지돼요. 순서대로 처리해야 할 때 유용해요.', ARRAY['"deque"', '"FIFO"', '"큐 순회"'], NULL, NULL),
(416, 'python', '24', '보통', '프린터 대기열을 시뮬레이션하는 코드에서 빈칸에 알맞은 것은?', 'from collections import deque

printer = deque()
printer.append(''문서A'')
printer.append(''문서B'')
printer.append(''문서C'')

# 첫 번째 문서 처리
doc = printer.___()
print(f''{doc} 인쇄 완료'')', ARRAY['"pop()"', '"popleft()"', '"append()"', '"appendleft()"'], 1, '프린터 대기열은 큐로 먼저 들어온 문서를 먼저 처리해요. 앞에서 꺼내는 popleft()를 사용해야 ''문서A 인쇄 완료''가 출력돼요.', '큐 활용: 대기열 처리', '프린터, 콜센터, 은행 줄처럼 먼저 온 것을 먼저 처리하는 상황에 큐를 써요. popleft()로 앞에서 꺼내야 FIFO 순서가 유지돼요.', ARRAY['"popleft()"', '"큐 활용"', '"대기열"'], NULL, NULL),
(417, 'python', '41', '보통', '다음 코드에서 is_empty()가 True를 반환하는 조건은?', 'class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        return self.items.pop(0) if self.items else None

    def is_empty(self):
        return len(self.items) == 0', ARRAY['"items에 요소가 1개 이상일 때"', '"items가 비어있을 때 (길이가 0)"', '"items에 요소가 정확히 1개일 때"', '"항상 True"'], 1, 'len(self.items) == 0은 deque가 비어있을 때 True가 돼요. 요소가 하나라도 있으면 len >= 1이므로 False예요.', '큐의 isEmpty 확인', '큐가 비었는지 확인할 때 len(deque) == 0 또는 not deque를 써요. dequeue 전에 isEmpty() 확인이 중요해요.', ARRAY['"is_empty()"', '"len()"', '"큐 클래스"'], NULL, NULL),
(418, 'python', '24', '어려움', '다음 큐 시뮬레이션 코드의 최종 출력 결과는?', 'from collections import deque

q = deque([1, 2, 3])
q.append(q.popleft())
q.append(q.popleft())
print(list(q))', ARRAY['"[3, 1, 2]"', '"[1, 2, 3]"', '"[2, 3, 1]"', '"[3, 2, 1]"'], 0, '시작: [1,2,3]. 1번: popleft()→1, append(1)→[2,3,1]. 2번: popleft()→2, append(2)→[3,1,2]. 결과: [3,1,2].', '앞에서 빼서 뒤로 보내기', '큐에서 앞 요소를 popleft()로 빼서 다시 append()로 뒤에 붙이면 원형 큐처럼 회전시킬 수 있어요. 요세푸스 문제 등에 활용돼요.', ARRAY['"popleft()"', '"append()"', '"원형 큐"'], NULL, NULL),
(419, 'python', '25', '쉬움', '덱(Deque)에 대한 설명으로 올바른 것은?', 'from collections import deque
d = deque([1, 2, 3])
# 덱은 어떤 자료구조인가?', ARRAY['"뒤에서만 추가/삭제 가능하다"', '"앞에서만 추가/삭제 가능하다"', '"앞과 뒤 양쪽에서 추가/삭제 가능하다"', '"중간에서만 추가/삭제 가능하다"'], 2, '덱(Deque)은 Double-Ended Queue의 약자로 양쪽 끝에서 O(1)로 추가/삭제할 수 있어요.', '덱 — 양쪽에서 추가/삭제', '덱은 앞(appendleft/popleft)과 뒤(append/pop) 양쪽에서 O(1)로 조작할 수 있어요. 스택과 큐 기능을 모두 포함해요.', ARRAY['"deque"', '"Double-Ended Queue"', '"양방향"'], NULL, NULL),
(420, 'python', '25', '쉬움', '다음 코드의 출력 결과는?', 'from collections import deque
d = deque([2, 3, 4])
d.appendleft(1)
print(list(d))', ARRAY['"[2, 3, 4, 1]"', '"[1, 2, 3, 4]"', '"[2, 1, 3, 4]"', '"오류"'], 1, 'appendleft(1)은 덱의 왼쪽(앞)에 1을 추가해요. [2,3,4]의 앞에 1이 붙어 [1,2,3,4]가 돼요.', 'appendleft() — 앞에 추가', 'appendleft(x)는 덱의 왼쪽(앞)에 x를 추가해요. 리스트의 insert(0, x)와 같은 결과지만 O(1)로 훨씬 빠르게 동작해요.', ARRAY['"appendleft()"', '"deque"', '"앞 추가"'], NULL, NULL),
(421, 'python', '25', '쉬움', '다음 코드의 출력 결과는?', 'from collections import deque
d = deque([1, 2, 3, 4])
d.pop()
d.popleft()
print(list(d))', ARRAY['"[2, 3]"', '"[1, 4]"', '"[1, 2, 3]"', '"오류"'], 0, 'pop()은 뒤에서 4를 제거해 [1,2,3], popleft()는 앞에서 1을 제거해 [2,3]이 돼요.', 'pop()과 popleft() 차이', 'pop()은 덱의 뒤(오른쪽)에서 제거하고, popleft()는 앞(왼쪽)에서 제거해요. 둘 다 O(1)이에요.', ARRAY['"pop()"', '"popleft()"', '"deque"'], NULL, NULL),
(422, 'python', '25', '쉬움', '다음 코드의 출력 결과는?', 'from collections import deque
recent = deque(maxlen=3)
recent.append(1)
recent.append(2)
recent.append(3)
recent.append(4)
print(list(recent))', ARRAY['"[1, 2, 3, 4]"', '"[2, 3, 4]"', '"[1, 2, 3]"', '"오류"'], 1, 'maxlen=3으로 최대 3개만 유지해요. 4번째 값 4가 들어오면 가장 오래된 1이 자동 제거돼 [2,3,4]가 돼요.', 'maxlen — 최대 길이 제한', 'deque(maxlen=n)으로 최대 크기를 제한할 수 있어요. 새 요소가 추가될 때 가장 오래된 요소가 자동으로 제거돼요. 최근 N개 유지에 유용해요.', ARRAY['"maxlen"', '"deque"', '"최근 N개"'], NULL, NULL),
(423, 'python', '25', '보통', '다음 코드의 출력 결과는?', 'from collections import deque
d = deque([1, 2, 3, 4, 5])
d.rotate(-1)
print(list(d))', ARRAY['"[5, 1, 2, 3, 4]"', '"[2, 3, 4, 5, 1]"', '"[1, 2, 3, 4, 5]"', '"오류"'], 1, 'rotate(-1)은 왼쪽으로 1칸 회전이에요. 맨 앞 1이 맨 뒤로 이동해 [2,3,4,5,1]이 돼요.', 'rotate(음수) — 왼쪽 회전', 'rotate(n)은 양수면 오른쪽, 음수면 왼쪽으로 회전해요. rotate(-1)은 맨 앞 요소를 맨 뒤로 보내요.', ARRAY['"rotate()"', '"deque"', '"회전"'], NULL, NULL),
(424, 'python', '25', '보통', '리스트 대신 덱(deque)을 사용하는 이유로 가장 적절한 것은?', '# 리스트
my_list = [1, 2, 3]
my_list.insert(0, 0)  # O(n) - 느림!

# 덱
from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)  # O(1) - 빠름!', ARRAY['"덱은 더 많은 메모리를 사용하기 때문"', '"앞에서의 추가/삭제가 O(1)로 리스트보다 빠르기 때문"', '"덱은 중간 삽입이 빠르기 때문"', '"덱은 인덱스 접근이 빠르기 때문"'], 1, '리스트의 앞 삽입(insert(0, x))은 모든 요소를 한 칸씩 밀어야 해서 O(n)이에요. 덱의 appendleft()는 O(1)이라 훨씬 빠르게 동작해요.', '덱 vs 리스트 성능 차이', '리스트: 앞 추가/삭제 O(n). 덱: 앞 추가/삭제 O(1). 앞뒤 조작이 많으면 덱을 사용해야 해요.', ARRAY['"성능 비교"', '"O(1) vs O(n)"', '"deque"'], NULL, '{"wrong":"my_list.insert(0, x)   # O(n) — 전체 이동","correct":"my_deque.appendleft(x) # O(1) — 바로 추가"}'::jsonb),
(425, 'python', '25', '보통', '다음 코드의 출력 결과는?', 'from collections import deque
d = deque([1, 2, 3])
d.append(4)
d.appendleft(0)
print(d[0], d[-1])', ARRAY['"1 3"', '"0 4"', '"0 3"', '"1 4"'], 1, 'append(4)로 [1,2,3,4], appendleft(0)으로 [0,1,2,3,4]가 돼요. d[0]=0, d[-1]=4예요.', '덱의 인덱스 접근', '덱은 리스트처럼 d[0], d[-1]으로 앞뒤 요소에 접근할 수 있어요. 단, 중간 인덱스 접근은 O(n)으로 리스트보다 느려요.', ARRAY['"deque"', '"인덱스 접근"', '"append/appendleft"'], NULL, NULL),
(426, 'python', '25', '어려움', '다음 코드에서 maxlen=3인 덱에 요소를 추가할 때 출력 결과는?', 'from collections import deque
d = deque([10, 20, 30], maxlen=3)
d.appendleft(5)
print(list(d))', ARRAY['"[5, 10, 20, 30]"', '"[5, 10, 20]"', '"[10, 20, 30]"', '"오류"'], 1, 'maxlen=3이고 현재 [10,20,30]인데 appendleft(5)로 앞에 5를 추가하면 가장 오른쪽(오래된 방향) 30이 제거돼 [5,10,20]이 돼요.', 'appendleft()와 maxlen의 상호작용', 'maxlen이 설정된 덱에서 appendleft()로 앞에 추가하면 반대쪽(오른쪽) 요소가 밀려 제거돼요. append()로 뒤에 추가하면 왼쪽 요소가 제거돼요.', ARRAY['"maxlen"', '"appendleft()"', '"덱 크기 제한"'], NULL, NULL),
(427, 'python', '25', '어려움', '덱으로 회문(팰린드롬)을 검사하는 코드에서 빈칸에 알맞은 코드는?', 'from collections import deque

def is_palindrome(s):
    d = deque(s)
    while len(d) > 1:
        if ___ != ___:
            return False
    return True

print(is_palindrome(''level''))   # True
print(is_palindrome(''hello''))   # False', ARRAY['"d.pop() != d.pop()"', '"d.popleft() != d.pop()"', '"d.appendleft() != d.append()"', '"d[0] != d[-1]"'], 1, '회문 검사는 앞(popleft)과 뒤(pop)에서 하나씩 꺼내 비교해요. 덱을 이용해 양쪽에서 동시에 꺼낼 수 있어요.', '덱으로 회문 검사', '덱의 양쪽 끝을 동시에 접근하는 특성을 활용해 앞뒤 문자를 비교하면 회문인지 확인할 수 있어요. popleft()와 pop()을 함께 써요.', ARRAY['"popleft()"', '"pop()"', '"회문"', '"덱 활용"'], NULL, NULL),
(428, 'python', '26', '쉬움', '다음 중 앞에서 꺼내기(dequeue) 성능이 O(1)인 자료구조는?', '# 어떤 것이 앞에서 꺼낼 때 O(1)인가?
# A. list.pop(0)
# B. deque.popleft()', ARRAY['"리스트 (list.pop(0))"', '"덱 (deque.popleft())"', '"둘 다 O(1)"', '"둘 다 O(n)"'], 1, 'list.pop(0)은 뒤의 모든 요소를 한 칸씩 당겨야 해서 O(n)이에요. deque.popleft()는 O(1)이에요.', '앞 삭제 성능: 리스트 O(n) vs 덱 O(1)', '리스트는 앞 삽입/삭제가 O(n)이고, 덱은 O(1)이에요. 큐나 앞뒤 조작이 많은 경우엔 deque를 사용해야 해요.', ARRAY['"시간 복잡도"', '"O(1)"', '"deque vs list"'], NULL, NULL),
(429, 'python', '26', '쉬움', '10만 개 데이터에서 특정 값이 있는지 검색할 때 가장 빠른 자료구조는?', 'data_list = list(range(100000))
data_set = set(range(100000))
data_dict = {}  # 딕셔너리도 O(1) 검색

# 어느 것이 가장 빠를까?
# 99999 in data_list  →  O(?)
# 99999 in data_set   →  O(?)', ARRAY['"리스트"', '"집합(set) 또는 딕셔너리"', '"튜플"', '"모두 같다"'], 1, '리스트의 ''in'' 검색은 O(n)으로 최대 10만 번 비교해요. 집합과 딕셔너리는 해시를 사용해서 O(1)이에요.', '검색 성능: 집합/딕셔너리 O(1) vs 리스트 O(n)', '리스트는 처음부터 끝까지 하나씩 확인하므로 O(n)이에요. 집합과 딕셔너리는 해시 구조 덕분에 O(1)로 바로 찾아요.', ARRAY['"시간 복잡도"', '"O(1)"', '"집합"', '"딕셔너리"'], NULL, NULL),
(430, 'python', '26', '보통', '다음 상황에서 각 자료구조 선택으로 가장 적합한 조합은?', '# 상황 A: 브라우저 뒤로가기 (방문 페이지 저장)
# 상황 B: 프린터 대기열 처리
# 상황 C: 최근 검색어 5개 유지', ARRAY['"A: 큐, B: 스택, C: 리스트"', '"A: 스택, B: 큐, C: 덱(maxlen=5)"', '"A: 리스트, B: 집합, C: 딕셔너리"', '"A: 덱, B: 덱, C: 덱"'], 1, '뒤로가기 = LIFO(스택). 프린터 대기열 = FIFO(큐, deque). 최근 N개 유지 = deque(maxlen=5).', '상황별 자료구조 선택', 'LIFO(마지막 것 먼저) → 스택. FIFO(처음 것 먼저) → 큐. 양쪽 조작/최근 N개 → 덱. 상황에 맞는 자료구조 선택이 핵심이에요.', ARRAY['"자료구조 선택"', '"스택"', '"큐"', '"덱"'], NULL, NULL),
(431, 'python', '26', '보통', '다음 코드에서 set을 사용하는 이유로 가장 적절한 것은?', 'visited = set()

def visit(url):
    if url not in visited:
        visited.add(url)
        print(f''방문: {url}'')
    else:
        print(f''이미 방문한 곳: {url}'')

visit(''naver.com'')
visit(''google.com'')
visit(''naver.com'')', ARRAY['"순서를 유지하기 위해"', '"중복 없이 O(1) 검색을 위해"', '"키-값 쌍을 저장하기 위해"', '"최대 크기를 제한하기 위해"'], 1, '방문 여부 확인은 ''in'' 연산이 자주 발생해요. 집합은 O(1)로 빠르게 검색하고 자동 중복 제거도 돼서 방문 기록 저장에 적합해요.', '집합(set) 활용: 방문 여부 확인', '중복 없이 포함 여부를 O(1)로 확인해야 할 때 집합(set)이 최적이에요. 리스트는 O(n)이라 데이터가 많을수록 느려요.', ARRAY['"집합"', '"O(1) 검색"', '"중복 제거"'], NULL, NULL),
(432, 'python', '26', '보통', '다음 중 시간 복잡도 표에서 올바른 것은?', '# 각 자료구조의 맨 앞 삽입 시간 복잡도
# A. 리스트: O(n)
# B. 덱: O(1)
# C. 집합: O(1)  (순서 없음, 앞/뒤 구분 없음)', ARRAY['"리스트 앞 삽입: O(1), 덱 앞 삽입: O(n)"', '"리스트 앞 삽입: O(n), 덱 앞 삽입: O(1)"', '"둘 다 O(1)"', '"둘 다 O(n)"'], 1, '리스트는 앞에 삽입하면 기존 모든 요소를 한 칸씩 이동해야 해서 O(n)이에요. 덱(deque)은 appendleft()가 O(1)이에요.', '리스트 vs 덱 시간 복잡도', '리스트: 뒤 추가/삭제 O(1), 앞 추가/삭제 O(n). 덱: 앞뒤 추가/삭제 모두 O(1). 앞쪽 조작이 많으면 무조건 덱을 써야 해요.', ARRAY['"시간 복잡도"', '"deque"', '"리스트 vs 덱"'], NULL, NULL),
(433, 'python', '26', '어려움', '다음 코드에서 리스트 대신 집합을 사용했을 때 성능 개선 효과가 가장 큰 연산은?', '# 리스트 버전
my_list = list(range(1000000))
result1 = 999999 in my_list   # O(n)

# 집합 버전
my_set = set(range(1000000))
result2 = 999999 in my_set    # O(1)', ARRAY['"append() — 뒤에 추가"', '"in 연산 — 포함 여부 검색"', '"len() — 길이 확인"', '"순회 — for 루프"'], 1, '리스트의 ''in'' 검색은 O(n), 집합의 ''in'' 검색은 O(1)이에요. 100만 개 데이터에서 검색 횟수가 많을수록 집합이 압도적으로 빨라요.', '집합 검색 O(1) vs 리스트 O(n)', 'in 연산의 시간 복잡도: 리스트 O(n), 집합/딕셔너리 O(1). 검색이 빈번하면 리스트 대신 집합을 쓰는 것이 성능 핵심이에요.', ARRAY['"O(1) vs O(n)"', '"집합"', '"성능 최적화"'], NULL, NULL),
(434, 'python', '36', '쉬움', '다음 함수의 반환값은?', 'def greet(name):
    return "Hello, " + name

result = greet("Alice")
print(result)', ARRAY['"Hello, Alice"', '"Hello, name"', '"greet(Alice)"', '"오류"'], 0, 'greet(''Alice'')는 ''Hello, '' + ''Alice''를 반환합니다. return문이 있으므로 호출한 쪽에서 값을 받을 수 있습니다.', '함수 반환값', 'return문은 함수의 결과를 호출한 곳으로 돌려줍니다. 반환된 값은 변수에 저장하거나 바로 사용할 수 있습니다.', NULL, NULL, NULL),
(435, 'python', '36', '쉬움', '다음 코드에서 함수를 호출했을 때 출력 결과는?', 'def add(a, b):
    return a + b

print(add(3, 5))
print(add(10, 20))', ARRAY['"8
30"', '"3 5
10 20"', '"add(3, 5)
add(10, 20)"', '"오류"'], 0, 'add(3, 5)는 3+5=8, add(10, 20)은 10+20=30을 반환합니다. print()로 각각 출력하면 8과 30이 나옵니다.', '함수 호출과 인자', '함수를 정의할 때의 a, b는 매개변수(parameter), 호출할 때의 3, 5는 인수(argument)입니다.', NULL, NULL, NULL),
(436, 'python', '36', '쉬움', '다음 코드의 출력 결과는?', 'def say_hello():
    print("Hello!")

result = say_hello()
print(result)', ARRAY['"Hello!
None"', '"Hello!"', '"None"', '"오류"'], 0, 'say_hello()는 return이 없으므로 None을 반환합니다. 함수 내부에서 print()로 ''Hello!''를 출력하고, 반환값 None이 result에 저장되어 다시 출력됩니다.', 'return이 없는 함수', 'return문이 없는 함수는 자동으로 None을 반환합니다. None은 ''값이 없음''을 나타내는 특별한 타입입니다.', NULL, NULL, NULL),
(437, 'python', '36', '보통', '다음 코드의 출력 결과는?', 'x = 10

def change():
    x = 20
    print(x)

change()
print(x)', ARRAY['"20
10"', '"20
20"', '"10
10"', '"오류"'], 0, '함수 내부의 x = 20은 새로운 지역 변수를 만듭니다. 전역 변수 x는 변경되지 않아 함수 바깥에서는 여전히 10입니다.', '변수 스코프 (scope)', '함수 내부에서 변수를 새로 대입하면 지역 변수가 됩니다. 지역 변수는 함수 밖의 동일한 이름 변수와 별개입니다.', NULL, NULL, NULL),
(438, 'python', '36', '보통', '다음 코드의 출력 결과는?', 'def power(base, exp=2):
    return base ** exp

print(power(3))
print(power(2, 3))', ARRAY['"9
8"', '"3
2"', '"6
6"', '"오류"'], 0, 'exp=2는 기본값(default parameter)입니다. power(3)은 exp=2를 사용해 3²=9, power(2, 3)은 2³=8을 반환합니다.', '기본값 매개변수 (default parameter)', '매개변수에 기본값을 설정하면 해당 인수를 생략하고 호출할 수 있습니다. 기본값이 있는 매개변수는 뒤쪽에 위치해야 합니다.', NULL, NULL, NULL),
(439, 'python', '36', '어려움', '다음 코드의 출력 결과는?', 'def make_adder(n):
    def adder(x):
        return x + n
    return adder

add5 = make_adder(5)
add10 = make_adder(10)
print(add5(3))
print(add10(3))', ARRAY['"8
13"', '"5
10"', '"3
3"', '"오류"'], 0, 'make_adder(5)는 n=5를 기억하는 adder 함수를 반환합니다(클로저). add5(3)은 3+5=8, add10(3)은 3+10=13입니다.', '클로저 (Closure)', '내부 함수가 외부 함수의 변수를 기억하는 패턴입니다. make_adder로 n이 다른 함수를 여러 개 만들 수 있습니다.', NULL, NULL, NULL),
(440, 'python', '43', '쉬움', '다음 클래스에서 인스턴스를 생성하는 올바른 방법은?', 'class Hero:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp', ARRAY['"hero = Hero(\"Alice\", 100)"', '"hero = Hero.new(\"Alice\", 100)"', '"hero = new Hero(\"Alice\", 100)"', '"hero = Hero.__init__(\"Alice\", 100)"'], 0, 'Python에서 인스턴스는 클래스이름(인수)으로 생성합니다. __init__은 자동으로 호출되므로 직접 호출하지 않습니다.', '클래스 인스턴스 생성', 'Hero(''Alice'', 100)처럼 클래스를 함수처럼 호출하면 새 인스턴스가 만들어지고 __init__이 자동으로 실행됩니다.', NULL, NULL, NULL),
(441, 'python', '43', '쉬움', '다음 코드의 출력 결과는?', 'class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def status(self):
        print(f''{self.name}: {self.hp}HP'')

hero = Character("철수", 100)
hero.status()', ARRAY['"철수: 100HP"', '"name: hp HP"', '"Character: 100"', '"오류"'], 0, 'hero.status()는 self가 hero 인스턴스를 가리키므로 self.name=''철수'', self.hp=100이 됩니다.', 'self와 인스턴스 메서드', '메서드의 첫 번째 매개변수 self는 인스턴스 자신을 가리킵니다. 메서드를 호출할 때 self는 자동으로 전달됩니다.', NULL, NULL, NULL),
(442, 'python', '43', '보통', '다음 코드의 출력 결과는?', 'class Monster:
    count = 0

    def __init__(self, name):
        self.name = name
        Monster.count += 1

m1 = Monster("슬라임")
m2 = Monster("고블린")
m3 = Monster("오크")
print(Monster.count)', ARRAY['"3"', '"1"', '"0"', '"오류"'], 0, 'count는 클래스 변수로 모든 인스턴스가 공유합니다. Monster()를 3번 호출할 때마다 Monster.count가 1씩 증가하여 최종값은 3입니다.', '클래스 변수 vs 인스턴스 변수', '클래스 변수(class variable)는 모든 인스턴스가 공유하며 클래스이름.변수로 접근합니다. self.변수는 각 인스턴스만의 인스턴스 변수입니다.', NULL, NULL, NULL),
(443, 'python', '43', '보통', '다음 코드에서 hero.attack(monster) 호출 후 monster.hp 값은?', 'class Hero:
    def __init__(self, atk):
        self.atk = atk

    def attack(self, enemy):
        enemy.hp -= self.atk

class Monster:
    def __init__(self, hp):
        self.hp = hp

hero = Hero(25)
monster = Monster(100)
hero.attack(monster)
hero.attack(monster)', ARRAY['"50"', '"75"', '"100"', '"25"'], 0, 'hero.atk=25이고 attack을 2번 호출하므로 monster.hp = 100 - 25 - 25 = 50이 됩니다.', '메서드를 통한 객체 상호작용', '메서드의 매개변수로 다른 객체를 받아 그 객체의 속성을 수정할 수 있습니다. 이것이 객체들이 상호작용하는 방식입니다.', NULL, NULL, NULL),
(444, 'python', '43', '어려움', '다음 코드의 출력 결과는?', 'class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "멍멍"

class Cat(Animal):
    def speak(self):
        return "야옹"

animals = [Dog(), Cat(), Animal()]
for a in animals:
    print(a.speak())', ARRAY['"멍멍
야옹
..."', '"...
...
..."', '"멍멍
멍멍
멍멍"', '"오류"'], 0, '각 객체의 실제 타입에 따라 speak()가 호출됩니다. Dog는 ''멍멍'', Cat은 ''야옹'', Animal은 ''...''을 반환합니다. 이것이 다형성(polymorphism)입니다.', '다형성 (Polymorphism)', '같은 메서드 이름으로 각 클래스가 다른 동작을 수행할 수 있습니다. 부모 클래스 타입의 변수로 자식 객체를 다룰 수 있습니다.', NULL, NULL, NULL),
(445, 'python', '43', '어려움', '다음 코드의 출력 결과는?', 'class Character:
    def __init__(self, name, hp):
        self.name = name
        self._hp = hp  # 캡슐화

    def get_hp(self):
        return self._hp

    def take_damage(self, amount):
        self._hp = max(0, self._hp - amount)

c = Character("영웅", 50)
c.take_damage(30)
c.take_damage(30)
print(c.get_hp())', ARRAY['"0"', '"20"', '"-10"', '"50"'], 0, '첫 공격 후 hp = max(0, 50-30) = 20, 두 번째 공격 후 hp = max(0, 20-30) = max(0, -10) = 0. max(0, ...)로 음수 방지.', '캡슐화와 max() 활용', '_hp처럼 밑줄로 시작하는 변수는 외부에서 직접 접근하지 않는 관례입니다. max(0, 값)으로 음수가 되는 것을 방지합니다.', NULL, NULL, NULL),
(446, 'python', '49', '쉬움', '텍스트 RPG의 게임 루프에서 ''계속 반복하다가 특정 조건에서 종료''를 구현하기에 가장 적합한 구조는?', '# 게임 루프 예시
while True:
    command = input("명령 입력: ")
    if command == "quit":
        break
    # 명령 처리...', ARRAY['"while True + break"', '"for i in range(100):"', '"if/elif 체인"', '"try/except 블록"'], 0, '게임 루프는 종료 조건을 알 수 없으므로 while True로 무한 반복하다가 종료 명령 시 break로 빠져나오는 패턴이 일반적입니다.', '게임 루프 패턴', 'while True + break 패턴은 종료 시점을 루프 내부에서 결정할 때 사용합니다. 게임 루프, 메뉴 시스템 등에 널리 쓰입니다.', NULL, NULL, NULL),
(447, 'python', '49', '쉬움', '다음 중 게임의 여러 방(room)을 딕셔너리로 표현하는 적절한 구조는?', '# 방 데이터 구조
rooms = {
    "시작점": {"설명": "어두운 방", "출구": ["북쪽", "동쪽"]},
    "북쪽 방": {"설명": "밝은 방", "출구": ["남쪽"]},
}', ARRAY['"딕셔너리 안에 딕셔너리 (중첩 딕셔너리)"', '"리스트 안에 리스트 (2D 배열)"', '"튜플 목록"', '"단순 문자열 변수"'], 0, '방 이름을 키로, 설명/출구 등 속성을 값으로 하는 중첩 딕셔너리가 방 데이터를 표현하기에 적합합니다. 이름으로 O(1) 접근이 가능합니다.', '중첩 딕셔너리 데이터 설계', '게임 맵, 캐릭터 속성 등 복잡한 데이터는 딕셔너리 안에 딕셔너리를 중첩하여 표현합니다. rooms[''시작점''][''설명'']으로 접근합니다.', NULL, NULL, NULL),
(448, 'python', '49', '보통', '다음 코드에서 게임 상태를 클래스로 관리할 때의 장점은?', 'class GameState:
    def __init__(self):
        self.player_hp = 100
        self.inventory = []
        self.current_room = "시작점"
        self.score = 0

    def save(self):
        return {
            ''hp'': self.player_hp,
            ''room'': self.current_room,
            ''score'': self.score,
        }', ARRAY['"관련 데이터를 하나의 객체로 묶어 관리가 쉬워진다"', '"전역 변수를 사용하는 것보다 느리다"', '"메모리를 더 많이 사용한다"', '"단순한 게임에는 클래스가 필요없다"'], 0, '클래스로 게임 상태를 묶으면 관련 데이터를 한 곳에서 관리하고, save() 같은 메서드로 일관된 방식으로 다룰 수 있습니다.', '클래스로 상태 관리', '게임 상태처럼 여러 변수가 연관된 경우 클래스로 묶으면 코드 구조가 명확해지고 저장/불러오기 등의 기능을 메서드로 캡슐화할 수 있습니다.', NULL, NULL, NULL),
(449, 'python', '49', '보통', '텍스트 RPG에서 플레이어 명령어를 처리할 때 가장 확장하기 쉬운 구조는?', '# 방법 A: if/elif 체인
if cmd == "go":
    ...
elif cmd == "attack":
    ...

# 방법 B: 딕셔너리 디스패치
commands = {
    "go": handle_go,
    "attack": handle_attack,
}
if cmd in commands:
    commands[cmd]()', ARRAY['"방법 B: 딕셔너리 디스패치 — 새 명령어를 dict에 추가하면 된다"', '"방법 A: if/elif — 읽기 쉽고 빠르다"', '"둘 다 동일하다"', '"switch/case를 사용해야 한다"'], 0, '딕셔너리 디스패치는 명령어를 추가할 때 dict에 항목만 추가하면 됩니다. if/elif 체인은 명령어가 늘어날수록 길어지고 수정이 어려워집니다.', '딕셔너리 디스패치 패턴', '명령어-함수를 딕셔너리로 매핑하면 Open/Closed 원칙을 지킬 수 있습니다. 기존 코드를 수정하지 않고 새 명령어를 추가할 수 있습니다.', NULL, NULL, NULL),
(450, 'python', '49', '어려움', '다음 코드에서 Player와 Room 클래스의 관계는?', 'class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.enemies = []

class Player:
    def __init__(self, name):
        self.name = name
        self.hp = 100
        self.current_room = None  # Room 인스턴스를 참조

    def enter_room(self, room):
        self.current_room = room
        print(f''{room.description}'')', ARRAY['"컴포지션(Composition) — Player가 Room을 참조"', '"상속(Inheritance) — Player가 Room을 상속"', '"Player와 Room은 독립적으로 관련 없음"', '"Room이 Player를 상속"'], 0, 'Player가 Room 인스턴스를 속성으로 참조하는 관계는 컴포지션(Has-A 관계)입니다. ''Player는 Room을 가진다''는 의미입니다.', '컴포지션 (Composition)', '컴포지션은 클래스가 다른 클래스의 인스턴스를 속성으로 포함하는 설계 패턴입니다. 상속(Is-A)과 대비되는 Has-A 관계입니다.', NULL, NULL, NULL),
(451, 'python', '49', '어려움', '게임의 적(Enemy)을 여러 종류로 확장할 때 올바른 상속 구조는?', 'class Enemy:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk

    def attack(self, player):
        player.hp -= self.atk

class Boss(Enemy):
    def __init__(self, name, hp, atk, special):
        super().__init__(name, hp, atk)
        self.special = special', ARRAY['"super().__init__()으로 부모 초기화 후 자식 속성 추가"', '"Boss에서 __init__을 완전히 새로 작성"', '"Enemy의 코드를 Boss에 복사"', '"Boss(Enemy)가 아닌 Boss(object)로 선언"'], 0, 'super().__init__()으로 부모 클래스의 초기화를 재사용하고, 추가 속성만 자식에서 정의합니다. 코드 중복을 방지합니다.', 'super()와 상속 초기화', 'super().__init__()은 부모 클래스의 __init__을 호출합니다. 자식 클래스에서 부모 기능을 재사용하면서 추가 기능을 덧붙일 수 있습니다.', NULL, NULL, NULL),
(452, 'python', '51', '쉬움', 'Python에서 게임 데이터를 JSON 파일로 저장하는 올바른 코드는?', 'import json

data = {"name": "영웅", "hp": 80, "level": 3}', ARRAY['"with open(''save.json'', ''w'') as f:
    json.dump(data, f)"', '"json.save(''save.json'', data)"', '"open(''save.json'').write(data)"', '"json.write(data, ''save.json'')"'], 0, 'json.dump(data, file)로 딕셔너리를 JSON 파일에 씁니다. with open()을 사용하면 파일이 자동으로 닫힙니다.', 'json.dump() — JSON 파일 저장', 'json.dump(객체, 파일)은 Python 객체를 JSON 형식으로 파일에 저장합니다. 반대로 json.load(파일)로 불러옵니다.', NULL, NULL, NULL),
(453, 'python', '51', '쉬움', '저장된 JSON 파일을 불러오는 올바른 코드는?', 'import json
# save.json 파일에 게임 데이터가 저장되어 있습니다', ARRAY['"with open(''save.json'', ''r'') as f:
    data = json.load(f)"', '"data = json.read(''save.json'')"', '"data = open(''save.json'').json()"', '"data = json.loads(''save.json'')"'], 0, 'json.load(file)로 JSON 파일을 Python 딕셔너리로 읽어옵니다. json.loads()는 파일이 아닌 문자열을 파싱할 때 사용합니다.', 'json.load() — JSON 파일 불러오기', 'json.load(파일)은 파일에서 JSON을 읽어 Python 객체로 변환합니다. dump/load 쌍을 기억하세요.', NULL, NULL, NULL),
(454, 'python', '51', '보통', '다음 코드에서 게임 저장/불러오기를 구현할 때 try/except가 필요한 이유는?', 'import json, os

def load_game():
    try:
        with open(''save.json'', ''r'') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"name": "신규", "hp": 100, "level": 1}', ARRAY['"세이브 파일이 없을 때 오류 없이 기본값을 반환하기 위해"', '"JSON 형식이 잘못됐을 때 파일을 삭제하기 위해"', '"파일 저장 속도를 높이기 위해"', '"try/except는 필수가 아니라 스타일의 문제이다"'], 0, '처음 플레이하는 경우 save.json이 없으면 FileNotFoundError가 발생합니다. try/except로 이를 처리하고 기본 캐릭터 데이터를 반환합니다.', 'FileNotFoundError 처리', '파일 읽기 전에 존재 여부를 확인하거나 try/except FileNotFoundError를 사용해야 합니다. 신규 유저를 위한 기본값 반환 패턴에 자주 쓰입니다.', NULL, NULL, NULL),
(455, 'python', '51', '보통', '다음 중 게임 상태를 저장 가능한 형태로 직렬화(serialize)할 때 주의할 점은?', 'class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

player = Player("영웅", 80)
# 아래 코드는 TypeError를 발생시킵니다
# json.dumps(player)  # 오류!

# 올바른 방법:
data = {"name": player.name, "hp": player.hp}
import json
print(json.dumps(data))', ARRAY['"클래스 인스턴스는 직접 JSON으로 변환할 수 없어 딕셔너리로 변환해야 한다"', '"json.dumps()는 정수를 처리하지 못한다"', '"클래스 인스턴스도 json.dumps()로 바로 저장할 수 있다"', '"JSON은 게임 저장에 적합하지 않다"'], 0, 'json.dumps()는 dict, list, str, int, float, bool, None만 처리합니다. 클래스 인스턴스는 {''name'': ..., ''hp'': ...}처럼 딕셔너리로 변환 후 저장해야 합니다.', 'JSON 직렬화 가능 타입', 'JSON으로 저장할 수 있는 타입: dict, list, str, int, float, bool, None. 클래스 인스턴스를 저장하려면 to_dict() 메서드를 구현하는 것이 일반적입니다.', NULL, NULL, NULL),
(456, 'python', '51', '어려움', '다음 코드의 출력 결과는?', 'import json

original = {"name": "영웅", "items": ["검", "방패"], "level": 5}
json_str = json.dumps(original, ensure_ascii=False)
loaded = json.loads(json_str)

loaded["items"].append("갑옷")
print(len(original["items"]))
print(len(loaded["items"]))', ARRAY['"2
3"', '"3
3"', '"2
2"', '"오류"'], 0, 'json.dumps → json.loads 과정에서 깊은 복사(deep copy)가 이루어집니다. loaded는 original과 독립적이므로 loaded[''items'']에 추가해도 original에 영향이 없습니다.', 'JSON 직렬화로 깊은 복사', 'json.dumps → json.loads는 객체를 깊은 복사하는 효과가 있습니다. 독립적인 복사본이 필요할 때 copy.deepcopy() 또는 이 패턴을 사용합니다.', NULL, NULL, NULL),
(457, 'python', '51', '어려움', '다음 코드에서 게임을 자동 저장(autosave)하는 올바른 구조는?', 'class Game:
    def __init__(self):
        self.player = {"name": "영웅", "hp": 100}
        self.turn = 0

    def play_turn(self, action):
        self.turn += 1
        # 액션 처리...
        if self.turn % 5 == 0:
            self.save()

    def save(self):
        import json
        with open(''autosave.json'', ''w'', encoding=''utf-8'') as f:
            json.dump({"player": self.player, "turn": self.turn}, f)', ARRAY['"5턴마다 자동으로 save() 호출 — 데이터 유실 최소화"', '"이 코드는 잘못됐다 — save()를 플레이어가 직접 호출해야 한다"', '"json.dump은 한글을 저장할 수 없다"', '"turn % 5 == 0은 항상 False이다"'], 0, 'turn % 5 == 0은 5, 10, 15... 턴마다 True가 됩니다. encoding=''utf-8''로 한글 저장이 가능하며, 자동 저장으로 데이터 유실을 최소화합니다.', '자동 저장 (Autosave) 패턴', '% 연산으로 N턴마다 자동 저장을 구현합니다. encoding=''utf-8''을 지정해야 한글 등 비ASCII 문자를 올바르게 저장합니다.', NULL, NULL, NULL),
(458, 'python', '52', '쉬움', '기존 Character 클래스에 새 기능을 추가할 때 상속을 사용하는 이유는?', 'class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

# 마법사 추가: Character를 수정하지 않고 확장
class Mage(Character):
    def __init__(self, name, hp, mp):
        super().__init__(name, hp)
        self.mp = mp

    def cast_spell(self):
        self.mp -= 10
        return 50', ARRAY['"기존 Character 코드를 수정하지 않고 새 기능을 추가할 수 있다"', '"Mage가 더 빠르게 실행된다"', '"Character를 삭제할 수 있다"', '"mp 변수를 글로벌로 사용하기 위해"'], 0, '상속으로 기존 Character 코드는 그대로 두고 Mage에만 mp와 cast_spell을 추가합니다. 기존 코드를 수정하지 않아 버그 위험이 줄어듭니다.', '상속으로 기능 확장', '기존 클래스를 변경하지 않고 상속으로 확장하는 것이 OOP의 핵심 원칙입니다(Open/Closed Principle). 기존 코드는 보존하면서 새 기능을 추가합니다.', NULL, NULL, NULL),
(459, 'python', '52', '쉬움', '다음 코드에서 Warrior가 Character의 메서드를 재사용하는 방법은?', 'class Character:
    def get_info(self):
        return f''이름: {self.name}, HP: {self.hp}''

class Warrior(Character):
    def __init__(self, name, hp, strength):
        super().__init__(name, hp) if hasattr(super(), ''__init__'') else None
        self.name = name
        self.hp = hp
        self.strength = strength

    def get_info(self):
        base = super().get_info()
        return f''{base}, 힘: {self.strength}''

w = Warrior("전사", 150, 80)
print(w.get_info())', ARRAY['"이름: 전사, HP: 150, 힘: 80"', '"힘: 80"', '"이름: 전사, HP: 150"', '"오류"'], 0, 'super().get_info()로 부모의 메서드를 호출해 기본 정보를 가져오고, 거기에 '', 힘: 80''을 붙입니다. 메서드 오버라이드 + super() 패턴입니다.', 'super()로 부모 메서드 호출', '자식 클래스에서 super().메서드()로 부모의 메서드를 호출할 수 있습니다. 부모 기능을 확장하거나 결과에 추가 정보를 덧붙일 때 유용합니다.', NULL, NULL, NULL),
(460, 'python', '52', '보통', '다음 코드의 출력 결과는?', 'class Item:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def __repr__(self):
        return f''Item({self.name}, {self.power})''

class Inventory:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def total_power(self):
        return sum(item.power for item in self.items)

inv = Inventory()
inv.add(Item("검", 30))
inv.add(Item("갑옷", 20))
print(inv.total_power())', ARRAY['"50"', '"30"', '"20"', '"오류"'], 0, '아이템 두 개의 power 합: 30 + 20 = 50. sum(item.power for item in self.items)는 제너레이터 표현식으로 각 아이템의 power를 합산합니다.', '컴포지션과 제너레이터 표현식', 'Inventory가 Item 리스트를 포함하는 컴포지션 구조입니다. sum(속성 for 객체 in 리스트)로 리스트 내 객체의 속성 합계를 쉽게 계산합니다.', NULL, NULL, NULL),
(461, 'python', '52', '보통', '게임에 새로운 직업(Archer)을 추가할 때 기존 코드 변경 없이 확장하는 올바른 방법은?', 'class Character:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def special_skill(self):
        return "기본 공격"

class Warrior(Character):
    def special_skill(self):
        return "방패 강타"

# Archer 추가 방법?', ARRAY['"class Archer(Character)를 새로 정의하고 special_skill()을 오버라이드"', '"Character에 archer_skill() 메서드를 추가"', '"Warrior를 수정해 궁수 기능 추가"', '"global 변수로 직업을 관리"'], 0, '기존 Character, Warrior를 수정하지 않고 새 클래스 Archer(Character)를 정의합니다. 이것이 개방-폐쇄 원칙(Open/Closed Principle)입니다.', '개방-폐쇄 원칙 (Open/Closed)', '클래스는 확장에는 열려있고 수정에는 닫혀있어야 합니다. 상속으로 기존 코드 수정 없이 새 기능을 추가하는 것이 올바른 OOP 설계입니다.', NULL, NULL, NULL),
(462, 'python', '52', '어려움', '다음 코드에서 __iter__와 __next__를 구현한 클래스의 출력은?', 'class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in CountDown(3):
    print(n)', ARRAY['"3
2
1"', '"1
2
3"', '"0
1
2"', '"오류"'], 0, 'CountDown(3)에서 current=3 → __next__: return 3, current=2 → return 2, current=1 → return 1, current=0 → StopIteration으로 루프 종료.', '이터레이터 프로토콜', '__iter__와 __next__를 구현하면 for 루프에서 사용할 수 있는 이터레이터가 됩니다. StopIteration 예외로 반복 종료를 알립니다.', NULL, NULL, NULL),
(463, 'python', '52', '어려움', '다음 코드에서 @property 데코레이터의 역할은?', 'class Player:
    def __init__(self, name, hp, max_hp):
        self.name = name
        self._hp = hp
        self.max_hp = max_hp

    @property
    def hp(self):
        return self._hp

    @hp.setter
    def hp(self, value):
        self._hp = max(0, min(value, self.max_hp))

p = Player("영웅", 100, 100)
p.hp = 150  # max_hp로 제한됨
print(p.hp)
p.hp = -10  # 0으로 제한됨
print(p.hp)', ARRAY['"100
0"', '"150
-10"', '"100
100"', '"오류"'], 0, 'setter에서 min(value, max_hp)로 최대값을, max(0, ...)로 최솟값을 제한합니다. 150 → min(150, 100)=100, -10 → max(0, -10)=0.', '@property와 setter', '@property로 메서드를 속성처럼 접근할 수 있습니다. setter를 정의하면 p.hp = 값 시 자동으로 검증 로직이 실행되어 캡슐화를 강화합니다.', NULL, NULL, NULL),
(464, 'python', '11', '쉬움', '다음 코드의 출력 결과는?', 'score = 75
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")', ARRAY['"A"', '"B"', '"C"', '"D"'], 2, 'score가 75이므로 score >= 90(False), score >= 80(False), score >= 70(True)이 되어 ''C''가 출력됩니다.', 'elif 체인', 'elif 조건은 위에서 아래로 순서대로 평가되며, 처음으로 True가 되는 블록 하나만 실행됩니다.', ARRAY['"조건문"', '"elif"'], NULL, NULL),
(465, 'python', '11', '쉬움', '다음 코드의 출력 결과는?', 'x = 10
if x > 5:
    print("크다")
else:
    print("작거나 같다")', ARRAY['"크다"', '"작거나 같다"', '"오류"', '"아무것도 출력되지 않음"'], 0, 'x가 10이고 10 > 5는 True이므로 if 블록이 실행되어 ''크다''가 출력됩니다.', 'if/else 기본 분기', 'if 조건이 True이면 if 블록을, False이면 else 블록을 실행합니다.', ARRAY['"조건문"', '"if/else"'], NULL, NULL),
(466, 'python', '12', '쉬움', '다음 코드의 출력 결과는?', 'a = 5
b = 3
if a > b and a != 10:
    print("참")
else:
    print("거짓")', ARRAY['"참"', '"거짓"', '"오류"', '"None"'], 0, 'a > b는 5 > 3 = True, a != 10은 True입니다. True and True = True이므로 ''참''이 출력됩니다.', '비교 연산자 조합', 'and 연산자는 양쪽 조건이 모두 True일 때만 True를 반환합니다.', ARRAY['"비교 연산자"', '"논리 연산자"'], NULL, NULL),
(467, 'python', '11', '보통', '다음 코드의 출력 결과는?', 'x = 7
if x > 5:
    if x > 10:
        print("A")
    else:
        print("B")
else:
    print("C")', ARRAY['"A"', '"B"', '"C"', '"오류"'], 1, 'x=7은 x > 5가 True이므로 안쪽 if로 진입합니다. x > 10은 7 > 10 = False이므로 else 블록의 ''B''가 출력됩니다.', '중첩 if', 'if 블록 안에 또 다른 if를 쓸 수 있습니다. 바깥 조건이 True일 때만 안쪽 조건이 평가됩니다.', ARRAY['"중첩 if"', '"조건문"'], NULL, NULL),
(468, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'age = 20
has_id = False
if age >= 18 and has_id:
    print("입장 가능")
elif age >= 18 or has_id:
    print("확인 필요")
else:
    print("입장 불가")', ARRAY['"입장 가능"', '"확인 필요"', '"입장 불가"', '"오류"'], 1, 'age >= 18은 True, has_id는 False이므로 and 조건(True and False)은 False입니다. or 조건(True or False)은 True이므로 ''확인 필요''가 출력됩니다.', 'and/or 복합 조건', 'and는 모두 True일 때, or는 하나라도 True일 때 True입니다. and가 or보다 먼저 평가됩니다.', ARRAY['"논리 연산자"', '"and"', '"or"'], NULL, NULL),
(469, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'x = 8
result = "짝수" if x % 2 == 0 else "홀수"
print(result)', ARRAY['"짝수"', '"홀수"', '"오류"', '"0"'], 0, 'x % 2 == 0은 8 % 2 == 0 → 0 == 0 = True이므로 삼항 연산자는 ''짝수''를 반환합니다.', '삼항 연산자(조건 표현식)', '`값1 if 조건 else 값2` 형태로 한 줄에 조건 분기를 표현합니다. 조건이 True이면 값1, False이면 값2가 됩니다.', ARRAY['"삼항 연산자"', '"조건 표현식"'], NULL, NULL),
(470, 'python', '11', '보통', '다음 코드의 출력 결과는?', 'n = 100
if n > 50:
    print("50 초과")
elif n > 80:
    print("80 초과")
elif n == 100:
    print("정확히 100")
else:
    print("50 이하")', ARRAY['"50 초과"', '"80 초과"', '"정확히 100"', '"50 이하"'], 0, 'n=100에서 n > 50이 True이므로 첫 번째 블록 ''50 초과''가 실행됩니다. elif는 앞 조건이 이미 True이면 평가되지 않습니다.', 'elif 순서 함정', 'elif 체인은 순서대로 평가하고 처음 True인 블록만 실행합니다. 더 구체적인 조건을 앞에 두어야 원하는 결과를 얻을 수 있습니다.', ARRAY['"elif"', '"조건문 순서"'], NULL, NULL),
(471, 'python', '12', '보통', '다음 코드의 출력 결과는?', 'x = True
y = False
if not x or not y:
    print("A")
else:
    print("B")', ARRAY['"A"', '"B"', '"오류"', '"None"'], 0, 'not x = not True = False, not y = not False = True입니다. False or True = True이므로 ''A''가 출력됩니다.', 'not 연산자와 드 모르간 법칙', '`not (A and B)`는 `not A or not B`와 동일합니다(드 모르간 법칙). not은 True/False를 반전시킵니다.', ARRAY['"not 연산자"', '"드 모르간 법칙"', '"논리 연산자"'], NULL, NULL),
(472, 'python', '12', '어려움', '다음 코드의 출력 결과는?', 'a = 5
b = 10
c = 3
if a < b and not (c > a or b == 10):
    print("X")
elif a < b:
    print("Y")
else:
    print("Z")', ARRAY['"X"', '"Y"', '"Z"', '"오류"'], 1, 'a < b는 True입니다. 괄호 안: c > a는 3 > 5 = False, b == 10은 True이므로 False or True = True. not True = False. True and False = False이므로 첫 조건은 False입니다. elif의 a < b는 True이므로 ''Y''가 출력됩니다.', '중첩 논리 연산자 복합', '복합 조건에서는 괄호 안을 먼저 계산하고, not → and → or 순으로 평가합니다.', ARRAY['"논리 연산자"', '"중첩 조건"', '"연산자 우선순위"'], NULL, NULL),
(473, 'python', '12', '어려움', '1 이상 10 이하의 수를 ''범위 내''로 판정하려 합니다. 다음 중 버그가 있는 코드는?', 'n = 10
# (A)
if 1 <= n <= 10:
    print("범위 내")
# (B)
if n >= 1 and n <= 10:
    print("범위 내")
# (C)
if n > 1 and n < 10:
    print("범위 내")
# (D)
if not (n < 1 or n > 10):
    print("범위 내")', ARRAY['"(A)"', '"(B)"', '"(C)"', '"(D)"'], 2, '(C)는 `n > 1 and n < 10`으로 경계값 1과 10을 포함하지 않습니다. n=10일 때 10 < 10은 False이므로 ''범위 내''가 출력되지 않습니다. n >= 1, n <= 10이어야 올바릅니다.', '경계값 조건 오류', '경계값(boundary value) 처리 시 >와 >=, <와 <=를 혼동하지 않아야 합니다. 포함 여부를 정확히 확인하세요.', ARRAY['"경계값"', '"비교 연산자"', '"논리 연산자"'], NULL, NULL),
(474, 'python', '11', '어려움', '다음 코드의 출력 결과는?', 'x = 5
y = 5
if x > 3:
    if y > 4:
        print("A")
    elif y == 5:
        print("B")
    else:
        print("C")
elif x == 5:
    print("D")
else:
    print("E")', ARRAY['"A"', '"B"', '"C"', '"D"'], 0, 'x > 3(True)으로 안쪽 if로 진입합니다. y > 4는 5 > 4 = True이므로 ''A''가 출력됩니다. y == 5 조건은 평가되지 않습니다.', '조건 흐름 추적', '중첩된 if/elif/else에서는 바깥 조건 → 안쪽 조건 순서로 흐름을 추적해야 합니다. 먼저 True가 된 블록만 실행됩니다.', ARRAY['"중첩 if"', '"조건 흐름"', '"elif"'], NULL, NULL),
(475, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'i = 1
while i <= 4:
    print(i)
    i += 1', ARRAY['"1
2
3
4"', '"1
2
3
4
5"', '"0
1
2
3"', '"1
2
3"'], 0, 'i가 1부터 시작해서 1씩 증가하며 i <= 4인 동안 출력됩니다. i=1,2,3,4 순서로 출력 후 i=5가 되면 조건이 False가 되어 종료됩니다.', 'while 카운터', 'while 루프는 조건이 True인 동안 반복합니다. 카운터 변수를 매 반복마다 갱신하여 무한루프를 방지합니다.', ARRAY['"while"', '"카운터"'], NULL, NULL),
(476, 'python', '14', '쉬움', '다음 코드의 출력 결과는?', 'i = 0
while True:
    if i == 3:
        break
    print(i)
    i += 1', ARRAY['"0
1
2"', '"0
1
2
3"', '"1
2
3"', '"무한 출력"'], 0, 'i=0,1,2를 출력하고 i=3이 되면 break로 루프를 탈출합니다. i=3일 때 break가 먼저 실행되어 print(3)는 실행되지 않습니다.', 'while + break', 'break는 루프를 즉시 종료합니다. while True와 함께 사용하면 특정 조건에서만 종료하는 루프를 만들 수 있습니다.', ARRAY['"while"', '"break"'], NULL, NULL),
(477, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'i = 0
while i < 5:
    i += 1
    if i % 2 == 0:
        continue
    print(i)', ARRAY['"1
3
5"', '"2
4"', '"1
2
3
4
5"', '"0
2
4"'], 0, 'i를 먼저 증가시킨 후 짝수이면 continue로 print를 건너뜁니다. i=1(홀수→출력), i=2(짝수→skip), i=3(홀수→출력), i=4(짝수→skip), i=5(홀수→출력).', 'while + continue', 'continue는 현재 반복의 나머지 코드를 건너뛰고 다음 반복으로 넘어갑니다. break와 달리 루프는 계속됩니다.', ARRAY['"while"', '"continue"'], NULL, NULL),
(478, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'i = 1
while i <= 5:
    if i == 3:
        break
    i += 1
else:
    print("완료")
print(f"i = {i}")', ARRAY['"완료
i = 6"', '"i = 3"', '"완료
i = 3"', '"오류"'], 1, 'while-else에서 else는 break 없이 루프가 정상 종료될 때만 실행됩니다. i=3에서 break로 종료되므로 else는 실행되지 않고 print(f''i = {i}'')만 실행됩니다. i는 3입니다.', 'while-else 패턴', 'while 루프의 else 블록은 break 없이 조건이 False가 되어 정상 종료될 때만 실행됩니다. break로 종료되면 else는 건너뜁니다.', ARRAY['"while-else"', '"break"'], NULL, NULL),
(479, 'python', '14', '보통', '다음 코드의 출력 결과는?', 'total = 0
n = 1
while n <= 5:
    total += n
    n += 1
print(total)', ARRAY['"10"', '"15"', '"25"', '"5"'], 1, '1+2+3+4+5 = 15입니다. n이 1에서 5까지 증가하며 total에 누적됩니다.', 'while 누적 합', '누적 변수(total=0)를 선언하고 while 루프에서 매번 더해가는 패턴입니다.', ARRAY['"while"', '"누적 합"', '"카운터"'], NULL, NULL),
(480, 'python', '14', '어려움', '다음 코드의 출력 결과는?', 'i = 0
while i < 3:
    j = 0
    while j < 3:
        if j == 1:
            break
        print(f"{i},{j}")
        j += 1
    i += 1', ARRAY['"0,0
1,0
2,0"', '"0,0
0,1
1,0
1,1
2,0
2,1"', '"0,0
0,1
0,2"', '"오류"'], 0, '안쪽 while에서 j=0을 출력 후 j=1이 되면 break로 안쪽 루프만 탈출합니다. 바깥 루프는 계속되어 i=0,1,2 각각 (i,0)만 출력됩니다. 결과: 0,0 / 1,0 / 2,0.', '중첩 while + break 탈출', 'break는 자신이 속한 가장 가까운 루프만 탈출합니다. 중첩 루프에서 안쪽 break는 바깥 루프에 영향을 주지 않습니다.', ARRAY['"중첩 while"', '"break"'], NULL, NULL),
(481, 'python', '14', '어려움', '다음 코드는 1부터 5까지 출력하려 했지만 무한루프에 빠집니다. 원인은?', 'i = 1
while i <= 5:
    print(i)
i += 1', ARRAY['"i += 1이 while 블록 밖에 있어서 루프 안에서 i가 증가하지 않는다"', '"while 조건이 잘못되어 항상 True이다"', '"print(i)가 i를 변경한다"', '"i = 1 초기화가 잘못되었다"'], 0, 'i += 1의 들여쓰기가 while 블록 밖에 있어 루프 안에서 실행되지 않습니다. i는 항상 1로 유지되어 조건 i <= 5가 영원히 True입니다. i += 1을 while 블록 안으로 들여써야 합니다.', 'while 무한루프 — 들여쓰기 오류', 'Python에서 들여쓰기는 코드 블록을 결정합니다. 카운터 증가 코드가 while 블록 밖에 있으면 반복되지 않아 무한루프가 됩니다.', ARRAY['"while"', '"무한루프"', '"들여쓰기"'], NULL, NULL),
(482, 'python', '23', '쉬움', '다음 코드의 출력 결과는?', 'stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack.pop())
print(stack.pop())', ARRAY['"1
2"', '"3
2"', '"1
3"', '"2
3"'], 1, '스택에 1, 2, 3 순서로 push한 후 pop을 두 번 하면 LIFO 원칙에 따라 마지막에 들어간 3이 먼저, 그다음 2가 출력됩니다.', '스택 push/pop — LIFO', '리스트의 append()는 스택의 push, pop()은 스택의 pop 역할을 합니다. 마지막에 들어간 데이터가 먼저 나오는 LIFO 구조입니다.', ARRAY['"스택"', '"LIFO"', '"append"', '"pop"'], NULL, NULL),
(483, 'python', '23', '쉬움', '스택에 ''A'', ''B'', ''C''를 순서대로 push한 후 pop을 3번 하면 출력 순서는?', 'stack = []
for ch in [''A'', ''B'', ''C'']:
    stack.append(ch)
while stack:
    print(stack.pop())', ARRAY['"A
B
C"', '"C
B
A"', '"B
A
C"', '"C
A
B"'], 1, '스택은 LIFO입니다. A→B→C 순으로 push했으므로 pop은 C→B→A 순서로 나옵니다.', '스택 LIFO 순서', '스택은 Last In, First Out입니다. push 순서의 역순으로 pop됩니다.', ARRAY['"스택"', '"LIFO"', '"pop 순서"'], NULL, NULL),
(484, 'python', '23', '쉬움', '스택이 비어 있는지 확인하는 올바른 Python 코드는?', 'stack = []
stack.append(10)
stack.pop()
# 스택이 비어있는지 확인', ARRAY['"if stack == None:"', '"if len(stack) == 0:"', '"if stack.empty():"', '"if stack.size() == 0:"'], 1, 'Python 리스트로 구현한 스택은 len(stack) == 0 또는 not stack으로 빈 상태를 확인합니다. stack.empty()나 stack.size()는 Python 리스트에 없는 메서드입니다.', '스택 is_empty 조건', 'Python 리스트 기반 스택에서 빈 상태 확인은 `len(stack) == 0` 또는 `not stack`을 사용합니다.', ARRAY['"스택"', '"is_empty"', '"len"'], NULL, NULL),
(485, 'python', '23', '쉬움', '스택의 맨 위 값을 제거 없이 확인(peek)하는 올바른 코드는?', 'stack = [1, 2, 3, 4, 5]
# 맨 위(top) 값을 확인만 하고 제거하지 않는다', ARRAY['"stack.pop()"', '"stack[-1]"', '"stack[0]"', '"stack.peek()"'], 1, 'stack[-1]은 리스트의 마지막 요소(스택의 top)를 제거 없이 반환합니다. pop()은 제거까지 합니다. stack.peek()는 Python에 없는 메서드입니다.', '스택 peek 연산', 'peek은 스택의 top 값을 보기만 하는 연산입니다. Python 리스트에서는 `stack[-1]`로 구현합니다.', ARRAY['"스택"', '"peek"', '"인덱싱"'], NULL, NULL),
(486, 'python', '23', '보통', '다음 코드의 출력 결과는?', 'word = "hello"
stack = []
for ch in word:
    stack.append(ch)
result = ""
while stack:
    result += stack.pop()
print(result)', ARRAY['"hello"', '"olleh"', '"oelhl"', '"오류"'], 1, 'h, e, l, l, o 순서로 스택에 push한 후 pop하면 역순인 o, l, l, e, h로 꺼내집니다. result는 ''olleh''가 됩니다.', '스택으로 문자열 역순', '스택의 LIFO 특성을 이용하면 문자열을 역순으로 만들 수 있습니다. 각 문자를 push한 뒤 모두 pop하면 역순 문자열이 됩니다.', ARRAY['"스택"', '"문자열 역순"', '"LIFO 활용"'], NULL, NULL),
(487, 'python', '23', '보통', '괄호 문자열 ''(()'' 를 스택으로 검사할 때 다음 코드의 출력 결과는?', 's = "(()"
stack = []
for ch in s:
    if ch == ''('':
        stack.append(ch)
    elif ch == '')'':
        if stack:
            stack.pop()
print(len(stack), "개 미매칭")', ARRAY['"0 개 미매칭"', '"1 개 미매칭"', '"2 개 미매칭"', '"오류"'], 1, '''('' push → ''('' push → '')'' pop. 처리 후 스택에 ''(''가 1개 남아 ''1 개 미매칭''이 출력됩니다.', '괄호 검사 스택', '여는 괄호를 push하고 닫는 괄호를 만나면 pop합니다. 처리 후 스택이 비어 있으면 올바른 괄호 쌍입니다.', ARRAY['"스택"', '"괄호 검사"', '"LIFO 활용"'], NULL, NULL),
(488, 'python', '23', '보통', '빈 스택에서 pop을 시도할 때 발생하는 오류를 방지하는 올바른 코드는?', 'stack = [1, 2]
stack.pop()
stack.pop()
# 스택이 비었는데 또 pop 시도
# 아래 중 안전한 코드는?', ARRAY['"stack.pop()"', '"if stack: stack.pop()"', '"stack.pop(default=None)"', '"stack.safe_pop()"'], 1, '빈 리스트에서 pop()을 호출하면 IndexError가 발생합니다. `if stack:` 조건으로 비어있지 않을 때만 pop합니다. pop(default=None)이나 safe_pop()은 Python 리스트에 없습니다.', '스택 언더플로 방지', '스택이 비어 있는데 pop을 시도하면 IndexError(스택 언더플로)가 발생합니다. pop 전에 항상 스택이 비어 있지 않은지 확인하세요.', ARRAY['"스택"', '"언더플로"', '"IndexError"'], NULL, NULL),
(489, 'python', '23', '어려움', '다음 코드 실행 후 stack1과 stack2의 상태는?', 'stack1 = [1, 2, 3, 4]
stack2 = []
while stack1:
    stack2.append(stack1.pop())
stack2.pop()
stack1.append(stack2.pop())
print(stack1)
print(stack2)', ARRAY['"[3]
[4, 3, 2]"', '"[3]
[4, 3]"', '"[2]
[4, 3]"', '"[2]
[4, 3, 2]"'], 2, 'stack1=[1,2,3,4]를 모두 pop해 stack2에 push하면 stack2=[4,3,2,1]. stack2.pop()으로 1 제거 → stack2=[4,3,2]. stack1.append(stack2.pop())은 stack2에서 2를 꺼내 stack1에 추가 → stack1=[2], stack2=[4,3].', '두 스택 연산 추적', '스택 연산을 단계별로 추적하는 것이 중요합니다. 각 push/pop 이후 스택 상태를 직접 그려가며 확인하세요.', ARRAY['"스택"', '"연산 추적"', '"두 스택"'], NULL, NULL),
(490, 'python', '26', '쉬움', '데이터에서 중복을 제거하고 고유한 값만 유지하려 할 때 가장 적합한 자료구조는?', 'data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
# 중복 없이 고유한 값만 유지', ARRAY['"리스트(list)"', '"튜플(tuple)"', '"집합(set)"', '"딕셔너리(dict)"'], 2, '집합(set)은 중복을 자동으로 제거하고 고유한 값만 저장합니다. set(data)를 사용하면 간단히 중복을 제거할 수 있습니다.', '중복 제거 — set', '집합(set)은 중복 값을 허용하지 않습니다. 중복 제거가 필요할 때 set()을 사용하는 것이 가장 효율적입니다.', ARRAY['"set"', '"중복 제거"', '"자료구조 선택"'], NULL, NULL),
(491, 'python', '26', '쉬움', '데이터를 순서대로 저장하고 나중에 수정도 해야 합니다. 가장 적합한 자료구조는?', '# 조건:
# 1. 삽입 순서 보장
# 2. 나중에 특정 값 수정 가능
# 3. 인덱스로 접근 가능', ARRAY['"집합(set)"', '"튜플(tuple)"', '"리스트(list)"', '"딕셔너리(dict)"'], 2, '리스트는 삽입 순서를 보장하고 인덱스로 접근하며 수정(mutable)이 가능합니다. 튜플은 불변(immutable), 집합은 순서 없음, 딕셔너리는 키-값 쌍입니다.', '순서 보장 + 수정 가능 — list', '리스트는 순서가 있고 수정 가능한(mutable) 자료구조입니다. 튜플은 순서가 있지만 불변입니다.', ARRAY['"list"', '"tuple"', '"자료구조 선택"', '"mutable"'], NULL, NULL),
(492, 'python', '26', '보통', '학생 이름으로 점수를 빠르게 조회해야 합니다. 가장 적합한 자료구조와 이유는?', '# 요구사항: "홍길동" → 95점 같은 키-값 조회
# O(1) 평균 시간복잡도로 조회해야 함', ARRAY['"리스트 — 인덱스 조회가 O(1)이므로"', '"딕셔너리 — 키 기반 해시 조회가 평균 O(1)이므로"', '"집합 — 존재 여부 확인이 O(1)이므로"', '"튜플 — 불변이라 빠르게 읽을 수 있으므로"'], 1, '딕셔너리는 해시 테이블 기반으로 키-값 조회가 평균 O(1)입니다. 이름(키)으로 점수(값)를 O(1)에 찾을 수 있는 최적의 자료구조입니다.', '키-값 조회 — dict', '딕셔너리는 해시 테이블로 구현되어 키 조회가 평균 O(1)입니다. 이름→점수, ID→정보처럼 키로 값을 빠르게 찾을 때 사용합니다.', ARRAY['"dict"', '"O(1) 조회"', '"해시 테이블"', '"자료구조 선택"'], NULL, NULL),
(493, 'python', '26', '보통', '은행 창구 대기열 시스템을 구현하려 합니다. 번호표 순서대로 처리해야 할 때 가장 적합한 자료구조는?', '# 조건:
# - 먼저 온 고객이 먼저 처리됨 (FIFO)
# - 앞에서 꺼내고 뒤에서 추가하는 작업이 빈번함', ARRAY['"리스트(list) — append/pop(0) 활용"', '"스택(list 기반) — append/pop 활용"', '"deque — append/popleft 활용"', '"집합(set) — 순서 없는 처리"'], 2, 'FIFO(선입선출) 구조엔 큐가 적합합니다. deque는 양끝 삽입/삭제가 O(1)이라 큐 구현에 최적입니다. list의 pop(0)는 O(n)이라 비효율적입니다.', 'FIFO — deque(큐)', '큐(Queue)는 FIFO 구조입니다. Python에서 collections.deque로 구현하면 양끝 삽입/삭제가 O(1)이어서 list 기반 큐보다 효율적입니다.', ARRAY['"deque"', '"큐"', '"FIFO"', '"자료구조 선택"'], NULL, NULL),
(494, 'python', '26', '어려움', '다음 두 코드 A, B의 시간복잡도 차이로 옳은 것은?', '# 코드 A: 리스트에서 특정 값 존재 여부 확인
data_list = list(range(10000))
result = 9999 in data_list  # O(?)

# 코드 B: 집합에서 특정 값 존재 여부 확인
data_set = set(range(10000))
result = 9999 in data_set   # O(?)', ARRAY['"A: O(1), B: O(1) — 둘 다 같음"', '"A: O(n), B: O(1) — set이 훨씬 빠름"', '"A: O(n), B: O(n) — 둘 다 순회 필요"', '"A: O(log n), B: O(1) — list는 이진탐색 사용"'], 1, '리스트의 `in` 연산은 처음부터 순차 탐색하는 O(n)입니다. 집합의 `in` 연산은 해시 기반으로 평균 O(1)입니다. 대용량 데이터에서 존재 여부를 자주 확인한다면 set이 훨씬 효율적입니다.', '리스트 O(n) vs 집합 O(1) 검색', '리스트의 `in` 연산은 O(n), 집합의 `in` 연산은 평균 O(1)입니다. 빈번한 존재 여부 확인에는 set이 효율적입니다.', ARRAY['"시간복잡도"', '"set"', '"list"', '"O(n) vs O(1)"'], NULL, NULL),
(495, 'python', '33', '쉬움', '다음 코드의 출력 결과는?', 'def greet(name, greeting="안녕하세요"):
    print(f"{greeting}, {name}!")

greet("철수")
greet("영희", "반가워요")', ARRAY['"안녕하세요, 철수!
반가워요, 영희!"', '"철수, 안녕하세요!
영희, 반가워요!"', '"오류"', '"안녕하세요, 철수!
안녕하세요, 영희!"'], 0, '첫 번째 호출은 greeting 기본값 ''안녕하세요''를 사용합니다. 두 번째 호출은 ''반가워요''를 명시적으로 전달합니다.', '기본값 매개변수', '기본값 매개변수는 인자를 전달하지 않으면 지정된 기본값을 사용합니다. 기본값이 있는 매개변수는 없는 것 뒤에 위치해야 합니다.', ARRAY['"기본값 매개변수"', '"함수"'], NULL, NULL),
(496, 'python', '33', '쉬움', '다음 코드의 출력 결과는?', 'def introduce(name, age, city):
    print(f"이름: {name}, 나이: {age}, 도시: {city}")

introduce(age=25, city="서울", name="민준")', ARRAY['"이름: 민준, 나이: 25, 도시: 서울"', '"이름: age, 나이: name, 도시: city"', '"오류 — 키워드 인자 순서가 잘못됨"', '"이름: 25, 나이: 서울, 도시: 민준"'], 0, '키워드 인자는 순서와 상관없이 매개변수 이름으로 값이 전달됩니다. name=''민준'', age=25, city=''서울''로 올바르게 매핑됩니다.', '키워드 인자', '키워드 인자는 `매개변수명=값` 형태로 전달하며, 순서와 무관하게 올바른 매개변수에 값이 배정됩니다.', ARRAY['"키워드 인자"', '"함수 호출"'], NULL, NULL),
(497, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'def total(*args):
    result = 0
    for n in args:
        result += n
    return result

print(total(1, 2, 3))
print(total(10, 20))', ARRAY['"6
30"', '"1
10"', '"[1, 2, 3]
[10, 20]"', '"오류"'], 0, '*args는 가변 개수의 위치 인자를 튜플로 받습니다. total(1,2,3)은 1+2+3=6, total(10,20)은 10+20=30을 반환합니다.', '*args 가변 인자', '*args는 임의 개수의 위치 인자를 튜플로 묶어 받습니다. for 루프로 각 값을 처리할 수 있습니다.', ARRAY['"*args"', '"가변 인자"', '"함수"'], NULL, NULL),
(498, 'python', '33', '보통', '다음 코드의 출력 결과는?', 'def calc(a, b):
    return a + b, a * b

result = calc(3, 4)
add, mul = result
print(add, mul)', ARRAY['"7 12"', '"(7, 12)"', '"7
12"', '"오류"'], 0, '함수가 a+b=7, a*b=12 두 값을 반환하면 튜플 (7, 12)가 됩니다. `add, mul = result`로 언패킹하면 add=7, mul=12입니다. print(add, mul)은 ''7 12''를 출력합니다.', '다중 반환값 — 튜플 언패킹', 'Python 함수는 `return a, b`로 여러 값을 튜플로 반환합니다. 호출 측에서 `x, y = func()`로 언패킹할 수 있습니다.', ARRAY['"다중 반환값"', '"튜플 언패킹"', '"함수"'], NULL, NULL),
(499, 'python', '33', '어려움', '다음 코드에서 오류가 발생하는 이유는?', 'def func(a, b=10, c):
    return a + b + c

print(func(1, 2, 3))', ARRAY['"기본값 매개변수(b=10) 뒤에 기본값 없는 매개변수(c)가 올 수 없다"', '"return에서 세 값을 더할 수 없다"', '"func를 호출할 때 인자 수가 부족하다"', '"b와 c의 이름이 충돌한다"'], 0, 'Python에서 기본값이 있는 매개변수(b=10) 뒤에 기본값이 없는 매개변수(c)를 놓으면 SyntaxError가 발생합니다. 기본값이 없는 매개변수는 항상 기본값이 있는 것보다 앞에 와야 합니다.', '매개변수 순서 오류', '기본값이 있는 매개변수는 기본값이 없는 매개변수 뒤에 위치해야 합니다. 순서: 일반 매개변수 → 기본값 매개변수 → *args', ARRAY['"기본값 매개변수"', '"매개변수 순서"', '"SyntaxError"'], NULL, NULL),
(500, 'python', '41', '쉬움', '다음 코드의 출력 결과는?', 'class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

d = Dog("바둑이", 3)
print(d.name)
print(d.age)', ARRAY['"바둑이
3"', '"name
age"', '"오류"', '"Dog
3"'], 0, '__init__에서 self.name과 self.age 속성이 초기화됩니다. d.name은 ''바둑이'', d.age는 3을 반환합니다.', '__init__과 self', '__init__은 인스턴스 생성 시 자동으로 호출되는 초기화 메서드입니다. self는 인스턴스 자신을 가리키며, self.속성명으로 인스턴스 속성을 정의합니다.', ARRAY['"__init__"', '"self"', '"인스턴스 속성"'], NULL, NULL),
(501, 'python', '41', '쉬움', '다음 코드의 출력 결과는?', 'class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(3, 4)
print(p1.x, p2.y)', ARRAY['"1 4"', '"1 2"', '"3 4"', '"오류"'], 0, 'p1과 p2는 독립적인 인스턴스입니다. p1.x는 1, p2.y는 4입니다. 각 인스턴스는 자신만의 속성 값을 가집니다.', '여러 인스턴스 생성', '같은 클래스로 여러 인스턴스를 만들 수 있으며, 각 인스턴스는 독립적인 속성 값을 가집니다.', ARRAY['"인스턴스"', '"클래스"', '"독립 속성"'], NULL, NULL),
(502, 'python', '41', '쉬움', '다음 코드의 출력 결과는?', 'class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius

c = Circle(5)
print(c.area())', ARRAY['"78.5"', '"15.7"', '"25"', '"오류"'], 0, 'area() 메서드는 3.14 * 5 * 5 = 78.5를 반환합니다.', '인스턴스 메서드 호출', '인스턴스 메서드는 `인스턴스.메서드명()`으로 호출합니다. self 매개변수는 자동으로 인스턴스가 전달되어 self.속성으로 인스턴스 데이터에 접근합니다.', ARRAY['"인스턴스 메서드"', '"self"', '"클래스"'], NULL, NULL),
(503, 'python', '41', '보통', '다음 코드에서 오류가 발생하는 이유는?', 'class Counter:
    def __init__(self):
        self.count = 0

    def increment():
        self.count += 1

c = Counter()
c.increment()', ARRAY['"increment() 메서드에 self 매개변수가 없어서"', '"count 속성을 0으로 초기화하면 안 돼서"', '"Counter 클래스에 __init__이 있으면 안 돼서"', '"c.increment()에 인자를 전달하지 않아서"'], 0, '인스턴스 메서드는 첫 번째 매개변수로 self를 반드시 선언해야 합니다. `def increment(self):`처럼 써야 하는데 self가 없어 TypeError가 발생합니다.', 'self 없는 메서드 오류', '인스턴스 메서드는 반드시 첫 번째 매개변수로 self를 선언해야 합니다. self가 없으면 인스턴스 속성에 접근할 수 없고 TypeError가 발생합니다.', ARRAY['"self"', '"인스턴스 메서드"', '"TypeError"'], NULL, NULL),
(504, 'python', '41', '보통', '다음 코드의 출력 결과는?', 'class MyClass:
    class_var = 0  # 클래스 변수

    def __init__(self, value):
        self.instance_var = value  # 인스턴스 변수
        MyClass.class_var += 1

a = MyClass(10)
b = MyClass(20)
print(a.class_var, b.class_var)
print(a.instance_var, b.instance_var)', ARRAY['"2 2
10 20"', '"1 1
10 20"', '"2 2
20 20"', '"오류"'], 0, 'class_var는 모든 인스턴스가 공유합니다. 인스턴스 생성마다 1씩 증가해 2가 됩니다. instance_var는 각 인스턴스에 독립적으로 10, 20입니다.', '클래스 변수 vs 인스턴스 변수', '클래스 변수는 모든 인스턴스가 공유합니다. 인스턴스 변수는 self.변수명으로 정의하며 인스턴스마다 독립적입니다.', ARRAY['"클래스 변수"', '"인스턴스 변수"', '"공유 상태"'], NULL, NULL),
(505, 'python', '41', '보통', '다음 코드의 출력 결과는?', 'class Robot:
    def __init__(self, name):
        self.name = name
        self.power_on()

    def power_on(self):
        print(f"{self.name} 전원 ON")

r = Robot("R2D2")', ARRAY['"R2D2 전원 ON"', '"오류"', '"아무것도 출력 안 됨"', '"전원 ON"'], 0, '__init__ 안에서 self.power_on()을 호출합니다. 인스턴스 생성 시 __init__이 실행되고, 그 안에서 power_on()이 호출되어 ''R2D2 전원 ON''이 출력됩니다.', '__init__에서 메서드 호출', '__init__ 안에서 self.메서드()로 다른 인스턴스 메서드를 호출할 수 있습니다. 초기화 시 특정 동작이 필요할 때 사용합니다.', ARRAY['"__init__"', '"self"', '"메서드 호출"'], NULL, NULL),
(506, 'python', '41', '어려움', '다음 코드의 출력 결과는?', 'class Bank:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self

    def withdraw(self, amount):
        self.balance -= amount
        return self

b = Bank(1000)
b.deposit(500).withdraw(200).deposit(100)
print(b.balance)', ARRAY['"1400"', '"1500"', '"1100"', '"오류"'], 0, '1000 + 500 = 1500, 1500 - 200 = 1300, 1300 + 100 = 1400. 각 메서드가 self를 반환하므로 메서드 체이닝이 가능합니다.', '메서드 체이닝', '메서드가 `return self`를 반환하면 `객체.메서드1().메서드2()`처럼 연속 호출(메서드 체이닝)이 가능합니다.', ARRAY['"메서드 체이닝"', '"return self"', '"클래스"'], NULL, NULL),
(507, 'python', '47', '쉬움', '`if __name__ == ''__main__'':` 구문의 목적으로 가장 올바른 것은?', '# utils.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    print(add(3, 5))', ARRAY['"파일을 직접 실행할 때만 코드를 실행하고, import 시에는 실행하지 않으려고"', '"함수 add가 정의되었는지 확인하려고"', '"모듈 이름을 ''main''으로 설정하려고"', '"클래스 이름을 확인하려고"'], 0, '파일을 직접 실행하면 __name__이 ''__main__''이 됩니다. 다른 파일에서 import하면 __name__은 모듈 이름(''utils'')이 됩니다. 이 조건으로 직접 실행 시에만 특정 코드를 실행할 수 있습니다.', '__name__ == ''__main__''', '파일을 직접 실행하면 __name__은 ''__main__'', import하면 모듈 파일명입니다. 이를 이용해 직접 실행 시에만 테스트 코드를 실행하게 할 수 있습니다.', ARRAY['"__name__"', '"모듈"', '"import"'], NULL, NULL),
(508, 'python', '47', '쉬움', 'math 모듈에서 sqrt 함수만 가져오는 올바른 코드는?', '# math 모듈의 sqrt 함수만 import해서
# math.sqrt(16) 대신 sqrt(16)으로 바로 쓰고 싶다', ARRAY['"import math.sqrt"', '"from math import sqrt"', '"import sqrt from math"', '"include math.sqrt"'], 1, '`from 모듈 import 함수명`으로 특정 함수만 가져올 수 있습니다. 이후 `sqrt(16)`처럼 모듈명 없이 직접 사용 가능합니다.', 'from ... import ...', '`from 모듈 import 이름`으로 모듈에서 특정 항목만 가져옵니다. 전체 모듈을 import할 때보다 이름 앞에 모듈명을 붙이지 않아도 됩니다.', ARRAY['"import"', '"from import"', '"모듈"'], NULL, NULL),
(509, 'python', '47', '보통', 'main.py에서 helper.py를 import할 때, helper.py 내부의 `print(__name__)`은 무엇을 출력하나요?', '# 파일 구조:
# main.py  (python main.py 로 직접 실행)
# helper.py (main.py 에서 import helper)

# helper.py 내용:
# print(__name__)', ARRAY['"__main__"', '"helper"', '"main"', '"None"'], 1, 'main.py에서 import helper하면 helper.py가 로드되며 __name__은 ''helper''(파일명 확장자 제외)가 됩니다. helper.py를 직접 실행할 때만 ''__main__''이 됩니다.', '__name__ 값 변화', '파일을 직접 실행하면 __name__ = ''__main__''. 다른 파일에서 import되면 __name__ = ''모듈명''(파일명 확장자 제외).', ARRAY['"__name__"', '"import"', '"모듈"'], NULL, NULL),
(510, 'python', '47', '보통', '프로젝트를 모듈로 분리할 때의 올바른 설계 원칙은?', '# 게임 프로젝트 구조 예시
# player.py  — 플레이어 관련 클래스/함수
# enemy.py   — 적 관련 클래스/함수
# utils.py   — 공통 유틸리티 함수
# main.py    — 게임 루프, 각 모듈 import', ARRAY['"모든 코드를 main.py 한 파일에 넣는 것이 관리하기 쉽다"', '"각 모듈은 관련된 기능끼리 묶어 단일 책임 원칙을 지킨다"', '"모듈이 많을수록 항상 성능이 향상된다"', '"utils.py에는 클래스를 정의하면 안 된다"'], 1, '모듈 분리의 핵심 원칙은 관련된 기능끼리 묶는 것(응집도)입니다. 각 모듈이 하나의 책임을 가지면 코드 유지보수와 재사용이 쉬워집니다.', '모듈 분리 설계 원칙', '모듈은 관련된 기능을 하나의 파일로 묶어 관리합니다. 단일 책임 원칙: 각 모듈은 하나의 역할을 담당해야 합니다.', ARRAY['"모듈"', '"설계 원칙"', '"단일 책임"'], NULL, NULL),
(511, 'python', '47', '어려움', '다음 파일 구조에서 발생하는 문제는?', '# a.py
from b import func_b

def func_a():
    return "a"

# b.py
from a import func_a

def func_b():
    return "b"', ARRAY['"함수 이름이 너무 짧아서 충돌이 발생한다"', '"a.py와 b.py가 서로를 import하는 순환 참조(circular import)로 ImportError가 발생한다"', '"from 대신 import를 써야 한다"', '"함수 반환값이 문자열이면 import 오류가 발생한다"'], 1, 'a.py가 b.py를 import하고, b.py도 a.py를 import하면 순환 참조(circular import)가 발생합니다. Python이 a.py를 로드하는 도중 b.py를 로드하려 하지만 a.py가 아직 완성되지 않아 ImportError 또는 NameError가 발생합니다.', '순환 import(circular import) 오류', '두 모듈이 서로를 import하면 순환 참조가 발생합니다. 해결책: 공통 의존성을 별도 모듈로 분리하거나, 함수 내부에서 import하는 지연 import를 사용합니다.', ARRAY['"circular import"', '"모듈"', '"ImportError"'], NULL, NULL),
(512, 'python', '50', '쉬움', '텍스트 RPG 게임 루프의 기본 구조로 가장 올바른 것은?', '# 게임 루프 기본 구조
while game_running:
    # 1. 상태 표시
    # 2. 입력 받기
    # 3. 입력 처리
    # 4. 게임 상태 업데이트', ARRAY['"게임이 시작되면 종료 조건 없이 무한히 실행되어야 한다"', '"game_running 변수가 True인 동안 반복하며, 특정 조건에서 False로 설정해 종료한다"', '"for 루프를 쓰는 것이 while 루프보다 항상 더 적합하다"', '"게임 루프는 반드시 재귀 함수로 구현해야 한다"'], 1, '게임 루프는 `while game_running:` 구조가 일반적입니다. 플레이어가 ''종료'' 선택 등 특정 조건에서 game_running을 False로 설정하면 루프가 종료됩니다.', '게임 루프 구조', '게임 루프는 상태 표시 → 입력 → 처리 → 업데이트를 반복합니다. while 루프로 구현하며 종료 조건이 되면 루프를 탈출합니다.', ARRAY['"게임 루프"', '"while"', '"상태 관리"'], NULL, NULL),
(513, 'python', '50', '보통', '다음 RPG 캐릭터 클래스에서 연속으로 take_damage()를 호출한 후 hp는?', 'class Character:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack = attack

    def take_damage(self, damage):
        self.hp = max(0, self.hp - damage)

hero = Character("영웅", 100, 15)
hero.take_damage(30)
hero.take_damage(80)
print(hero.hp)', ARRAY['"0"', '"-10"', '"10"', '"오류"'], 0, '첫 번째 take_damage(30): hp = max(0, 100-30) = 70. 두 번째 take_damage(80): hp = max(0, 70-80) = max(0, -10) = 0.', 'max()로 HP 하한 제한', 'RPG에서 HP가 음수가 되지 않도록 `max(0, hp - damage)`를 사용합니다. max()는 두 값 중 큰 값을 반환합니다.', ARRAY['"클래스"', '"max()"', '"게임 로직"'], NULL, NULL),
(514, 'python', '50', '보통', '게임 세이브 데이터를 파일로 저장/로드하는 코드의 출력 결과는?', 'import json

save_data = {"name": "영웅", "hp": 80, "level": 5}
with open("save.json", "w") as f:
    json.dump(save_data, f)

with open("save.json", "r") as f:
    loaded = json.load(f)
print(loaded["name"])', ARRAY['"오류 — json.dump는 딕셔너리를 저장할 수 없다"', '"영웅"', '"오류 — with open은 json 파일에 사용할 수 없다"', '"{''name'': ''영웅'', ''hp'': 80, ''level'': 5}"'], 1, 'json.dump()로 딕셔너리를 JSON 파일로 저장하고, json.load()로 다시 딕셔너리로 불러옵니다. loaded[''name'']은 ''영웅''을 반환합니다.', 'JSON으로 게임 세이브/로드', 'json 모듈의 dump()로 파이썬 딕셔너리를 JSON 파일로 저장하고, load()로 불러옵니다. 게임 세이브 파일 구현에 자주 사용됩니다.', ARRAY['"json"', '"파일 I/O"', '"세이브 시스템"'], NULL, NULL),
(515, 'python', '50', '어려움', '다음 RPG 전투 시스템에서 전투 종료 후 player.hp는?', 'class Fighter:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk

    def attack(self, target):
        target.hp -= self.atk

    def is_alive(self):
        return self.hp > 0

player = Fighter("플레이어", 50, 20)
enemy = Fighter("고블린", 40, 15)

while player.is_alive() and enemy.is_alive():
    player.attack(enemy)
    if enemy.is_alive():
        enemy.attack(player)

if player.is_alive():
    print(f"{player.name} 승리! 남은 HP: {player.hp}")
else:
    print(f"{enemy.name} 승리!")', ARRAY['"플레이어 승리! 남은 HP: 35"', '"플레이어 승리! 남은 HP: 20"', '"고블린 승리!"', '"플레이어 승리! 남은 HP: 50"'], 0, '라운드1: 플레이어 공격 → 고블린 hp=40-20=20(생존), 고블린 공격 → 플레이어 hp=50-15=35. 라운드2: 플레이어 공격 → 고블린 hp=20-20=0(사망), 루프 종료. 플레이어 hp=35이므로 ''플레이어 승리! 남은 HP: 35'' 출력.', '전투 루프 — 클래스와 while 결합', 'RPG 전투는 두 객체가 번갈아 공격하는 while 루프로 구현합니다. 매 라운드 후 생존 여부를 확인해 루프 종료 조건을 설정합니다.', ARRAY['"클래스"', '"전투 시스템"', '"while 루프"', '"게임 로직"'], NULL, NULL),
(516, 'python', '1', '어려움', '다음 코드의 출력 결과는?', 'x = print("Hello")
print(x)', ARRAY['"Hello\nNone"', '"Hello\nFalse"', '"오류 — print()는 값을 반환하지 않는다"', '"None\nHello"'], 0, 'print()는 화면에 출력 후 None을 반환합니다. 따라서 x에는 None이 저장되고, print(x)는 None을 출력합니다.', 'print()의 반환값', 'print() 함수는 출력 작업을 수행하지만 반환값은 None입니다. 변수에 print()의 결과를 담으면 None이 저장됩니다.', ARRAY['"print"', '"반환값"', '"None"'], NULL, NULL),
(517, 'python', '2', '어려움', '다음 코드의 출력 결과는?', 'print("3" + "5")
print(3 + 5)', ARRAY['"35\n8"', '"8\n8"', '"35\n35"', '"오류"'], 0, '문자열 "3" + "5"는 문자열 연결로 "35"가 됩니다. 정수 3 + 5는 덧셈으로 8이 됩니다.', '문자열 vs 정수 덧셈', '같은 + 연산자라도 피연산자의 타입에 따라 동작이 달라집니다. 문자열 + 문자열은 연결, 정수 + 정수는 덧셈입니다.', ARRAY['"print"', '"문자열 연결"', '"타입"'], NULL, NULL),
(518, 'python', '2', '어려움', '다음 코드의 출력 결과는?', 'print(True + True + False)
print(True * 5)', ARRAY['"2\n5"', '"오류"', '"True\nTrue"', '"1\n1"'], 0, 'Python에서 bool은 int의 서브클래스입니다. True는 1, False는 0으로 처리됩니다. 따라서 True + True + False = 1 + 1 + 0 = 2, True * 5 = 1 * 5 = 5입니다.', 'bool과 int의 관계', 'Python의 bool 타입은 int의 서브클래스입니다. True는 1, False는 0으로 연산에 사용될 수 있습니다.', ARRAY['"bool"', '"int"', '"타입 변환"'], NULL, NULL),
(519, 'python', '2', '어려움', '다음 코드의 출력 결과는?', 'print(type(1) == type(True))
print(isinstance(True, int))', ARRAY['"False\nTrue"', '"True\nTrue"', '"False\nFalse"', '"오류"'], 0, 'type(1)은 <class ''int''>, type(True)는 <class ''bool''>로 서로 다릅니다. 하지만 bool은 int의 서브클래스이므로 isinstance(True, int)는 True를 반환합니다.', 'type() vs isinstance()', 'type()은 정확한 타입을 비교합니다. isinstance()는 상속 관계도 고려하여 True/False를 반환합니다. bool은 int의 서브클래스이므로 isinstance(True, int)는 True입니다.', ARRAY['"type"', '"isinstance"', '"bool"', '"상속"'], NULL, NULL),
(520, 'python', '3', '어려움', '다음 코드의 출력 결과는?', 'x = 5
x += 3
x *= 2
print(x)', ARRAY['"16"', '"13"', '"10"', '"26"'], 0, 'x = 5, x += 3 → x = 8, x *= 2 → x = 16. 복합 대입 연산자는 순서대로 적용됩니다.', '복합 대입 연산자', '+=, *=, -= 등의 복합 대입 연산자는 기존 값에 연산을 적용하고 결과를 변수에 저장합니다. 순서에 주의해야 합니다.', ARRAY['"변수"', '"복합 대입"', '"연산자"'], NULL, NULL),
(521, 'python', '3', '어려움', '다음 코드의 출력 결과는?', 'a, b = 3, 7
a, b = b, a + b
print(a, b)', ARRAY['"7 10"', '"10 7"', '"7 7"', '"오류"'], 0, '우변은 이전 값을 기준으로 한꺼번에 평가됩니다. b의 이전 값 7이 a에 할당되고, 이전 a(3) + 이전 b(7) = 10이 b에 할당됩니다.', '다중 할당과 평가 순서', 'Python의 다중 할당에서 우변은 모두 이전 값을 기준으로 먼저 평가된 후 좌변에 할당됩니다. a, b = b, a+b에서 a+b는 이전 a와 b를 사용합니다.', ARRAY['"다중 할당"', '"변수"', '"평가 순서"'], NULL, NULL),
(522, 'python', '4', '어려움', '다음 코드의 출력 결과는?', 'print(3 + 2 * 4 ** 2)', ARRAY['"35"', '"100"', '"40"', '"37"'], 0, '연산자 우선순위: ** > * > +. 4**2 = 16, 2*16 = 32, 3+32 = 35.', '연산자 우선순위', 'Python 연산자 우선순위: 거듭제곱(**)이 가장 높고, 그 다음 곱셈/나눗셈(*,/,//,%), 마지막으로 덧셈/뺄셈(+,-)입니다.', ARRAY['"연산자 우선순위"', '"거듭제곱"', '"산술 연산"'], NULL, NULL),
(523, 'python', '4', '어려움', '다음 코드의 출력 결과는?', 'print(-7 // 2)
print(7 // -2)', ARRAY['"-4\n-4"', '"-3\n-3"', '"-4\n-3"', '"-3\n-4"'], 0, '// 연산자는 음의 무한대 방향으로 내림(floor division)합니다. -7/2 = -3.5 → -4, 7/-2 = -3.5 → -4.', '정수 나눗셈(floor division)', '// 연산자는 결과를 음의 무한대 방향으로 내림합니다. 결과가 음수일 때 -3.5는 -4가 됩니다(0이 아닌 -4쪽으로 내림).', ARRAY['"정수 나눗셈"', '"//"', '"음수 연산"'], NULL, NULL),
(524, 'python', '5', '어려움', '다음 코드의 출력 결과는?', 'a = "abc"
b = "def"
print(a + b == b + a)
print(a * 2 == a + a)', ARRAY['"False\nTrue"', '"True\nTrue"', '"False\nFalse"', '"오류"'], 0, 'a + b = "abcdef", b + a = "defabc"로 서로 달라 False. a * 2 = "abcabc", a + a = "abcabc"로 같아 True.', '문자열 연산의 특성', '문자열 + 연산은 교환법칙이 성립하지 않습니다(a+b ≠ b+a). 반면 a * 2는 a + a와 같습니다.', ARRAY['"문자열 연결"', '"문자열 반복"', '"비교 연산"'], NULL, NULL),
(525, 'python', '5', '어려움', '다음 코드의 출력 결과는?', 'print("Z" < "a")
print("apple" < "banana")', ARRAY['"True\nTrue"', '"False\nTrue"', '"True\nFalse"', '"False\nFalse"'], 0, 'Python은 문자열을 유니코드 값으로 비교합니다. ''Z''의 유니코드는 90, ''a''는 97이므로 ''Z'' < ''a''는 True. ''apple''과 ''banana''는 첫 글자 ''a''(97) < ''b''(98)이므로 True.', '문자열 비교와 유니코드', 'Python 문자열 비교는 유니코드 값을 기준으로 합니다. 대문자(A-Z: 65-90)는 소문자(a-z: 97-122)보다 유니코드 값이 작으므로 대문자 < 소문자입니다.', ARRAY['"문자열 비교"', '"유니코드"', '"비교 연산"'], NULL, NULL),
(526, 'python', '6', '어려움', '다음 코드의 출력 결과는?', 's = "  Hello World  "
print(s.strip().lower().replace("o", "0"))', ARRAY['"hell0 w0rld"', '"Hell0 W0rld"', '"  hell0 w0rld  "', '"오류"'], 0, '메서드 체이닝: strip()으로 양쪽 공백 제거 → "Hello World", lower()로 소문자 변환 → "hello world", replace("o", "0")으로 o를 0으로 교체 → "hell0 w0rld".', '메서드 체이닝', '문자열 메서드는 새 문자열을 반환하므로 연속으로 호출할 수 있습니다. 왼쪽에서 오른쪽 순서로 순차 적용됩니다.', ARRAY['"strip"', '"lower"', '"replace"', '"메서드 체이닝"'], NULL, NULL),
(527, 'python', '6', '어려움', '다음 코드의 출력 결과는?', 's = "Python"
print(s.find("x"))
print(s.find("P"))', ARRAY['"-1\n0"', '"오류\n0"', '"0\n-1"', '"False\n0"'], 0, 'find()는 찾는 문자가 없으면 -1을 반환하고, 있으면 첫 번째 인덱스를 반환합니다. ''x''는 없으므로 -1, ''P''는 인덱스 0에 있으므로 0.', 'find() 메서드', 'find()는 문자열에서 특정 문자/문자열의 첫 번째 위치를 반환합니다. 찾지 못하면 -1을 반환합니다(오류가 발생하지 않음).', ARRAY['"find"', '"문자열 검색"', '"인덱스"'], NULL, NULL),
(528, 'python', '6', '어려움', '다음 코드의 출력 결과는?', 's = "banana"
print(s.count("a"))
print(s.count("an"))', ARRAY['"3\n2"', '"3\n1"', '"2\n2"', '"4\n2"'], 0, '"banana"에서 ''a''는 위치 1, 3, 5에 총 3번 등장합니다. ''an''은 위치 1(''an''), 3(''an'')에 총 2번 등장합니다.', 'count() 메서드', 'count()는 문자열 내에서 특정 문자 또는 부분 문자열이 몇 번 등장하는지 센 결과를 반환합니다.', ARRAY['"count"', '"문자열 메서드"', '"부분 문자열"'], NULL, NULL),
(529, 'python', '7', '어려움', '다음 코드의 출력 결과는?', 'print(1, 2, 3, sep="-")
print("A", "B", sep="->", end="!\n")
print("C")', ARRAY['"1-2-3\nA->B!\nC"', '"1 2 3\nA B!\nC"', '"1-2-3\nA->B\nC"', '"오류"'], 0, '첫 줄: sep="-"로 1-2-3 출력 후 기본 줄바꿈. 둘째 줄: sep="->"로 A->B 출력, end="!\n"으로 !와 줄바꿈. 셋째 줄: C 출력.', 'sep와 end 조합', 'sep는 여러 인자 사이의 구분자, end는 출력 마지막에 추가할 문자를 지정합니다. 두 매개변수를 함께 사용할 수 있습니다.', ARRAY['"sep"', '"end"', '"print 옵션"'], NULL, NULL),
(530, 'python', '7', '어려움', '다음 코드의 출력 결과는?', 'print("line1")
print()
print("line3")', ARRAY['"line1\n\nline3"', '"line1\nline3"', '"오류 — print()에 인자가 없으면 오류"', '"line1 line3"'], 0, 'print()에 인자 없이 호출하면 빈 줄(줄바꿈만)을 출력합니다. 따라서 line1, 빈 줄, line3 순서로 세 줄이 출력됩니다.', 'print()의 빈 줄 출력', 'print()를 인자 없이 호출하면 줄바꿈 문자만 출력하여 빈 줄을 만듭니다. 오류가 발생하지 않습니다.', ARRAY['"print"', '"빈 줄"', '"줄바꿈"'], NULL, NULL),
(542, 'python', '8', '어려움', '다음 코드의 출력 결과는?', 'x = 5
print(f"{x ** 2 + 1}")
print(f"{''Hi'' * 3}")', ARRAY['"26\nHiHiHi"', '"25\nHi"', '"오류"', '"x ** 2 + 1\nHi * 3"'], 0, 'f-string의 {} 안에는 임의의 표현식을 넣을 수 있습니다. x**2+1 = 25+1 = 26, ''Hi'' * 3 = ''HiHiHi''.', 'f-string 내 표현식', 'f-string의 중괄호 {} 안에는 변수뿐만 아니라 연산식, 메서드 호출 등 Python 표현식을 자유롭게 쓸 수 있습니다.', ARRAY['"f-string"', '"표현식"', '"문자열 포맷"'], NULL, NULL),
(543, 'python', '8', '어려움', '다음 코드의 출력 결과는?', 'pi = 3.14159
print(f"{pi:.2f}")
print(f"{100:05d}")', ARRAY['"3.14\n00100"', '"3.14159\n100"', '"오류"', '"3.14\n100"'], 0, ':.2f는 소수점 둘째 자리까지 표시하므로 3.14. :05d는 5자리 정수로 빈 자리를 0으로 채우므로 00100.', 'f-string 포맷 지정자', 'f-string에서 콜론(:) 이후에 포맷을 지정할 수 있습니다. .2f는 소수점 2자리, 05d는 5자리 정수에 앞을 0으로 채우는 포맷입니다.', ARRAY['"f-string"', '"포맷 지정자"', '"소수점"', '"정렬"'], NULL, NULL),
(531, 'python', '9', '어려움', '다음 코드의 출력 결과는?', 'print(bool(0))
print(bool(""))
print(bool("0"))', ARRAY['"False\nFalse\nTrue"', '"False\nFalse\nFalse"', '"False\nTrue\nTrue"', '"True\nTrue\nFalse"'], 0, '0과 빈 문자열 ""은 falsy 값으로 bool() 변환 시 False입니다. 반면 "0"은 비어있지 않은 문자열이므로 truthy → True.', 'falsy vs truthy 값', 'Python에서 0, 0.0, "", None, [], {}, () 등은 falsy입니다. 비어있지 않은 문자열 "0"은 내용이 있으므로 truthy(True)로 변환됩니다.', ARRAY['"bool 변환"', '"falsy"', '"truthy"', '"타입 변환"'], NULL, NULL),
(532, 'python', '9', '어려움', '다음 코드의 출력 결과는?', 'print(int(3.9))
print(int(-3.9))', ARRAY['"3\n-3"', '"4\n-4"', '"3\n-4"', '"오류"'], 0, 'int()는 0 방향으로 버림(truncation)합니다. 3.9 → 3, -3.9 → -3. floor() 함수와 달리 음의 무한대가 아닌 0 방향으로 버립니다.', 'int() 변환 — 버림(truncation)', 'int()는 소수 부분을 0 방향으로 버립니다. 양수는 내림, 음수는 올림과 같은 효과입니다. math.floor()와는 음수에서 차이가 납니다(-3.9: int→-3, floor→-4).', ARRAY['"int 변환"', '"버림"', '"truncation"', '"타입 변환"'], NULL, NULL),
(533, 'python', '10', '어려움', '사용자가 숫자 3을 입력했을 때, 다음 코드에서 result의 값과 타입은?', 'result = input("숫자: ")', ARRAY['"문자열 ''3''"', '"정수 3"', '"실수 3.0"', '"입력한 값에 따라 자동으로 타입이 결정된다"'], 0, 'input()은 사용자 입력을 항상 문자열(str)로 반환합니다. 숫자처럼 보여도 ''3''이라는 문자열입니다. 정수로 사용하려면 int(input())을 써야 합니다.', 'input()의 반환 타입', 'input()은 사용자가 무엇을 입력하든 항상 str(문자열)을 반환합니다. 숫자 계산에 사용하려면 int()나 float()로 변환해야 합니다.', ARRAY['"input"', '"str"', '"타입 변환"'], NULL, NULL),
(534, 'python', '10', '어려움', '사용자가 5를 입력했을 때 다음 코드의 결과는?', 'x = input()
print(x + 3)', ARRAY['"8"', '"53"', '"오류 — 문자열과 정수는 + 연산을 할 수 없다"', '"5"'], 2, 'input()은 항상 문자열을 반환합니다. x는 ''5''(문자열)이므로 ''5'' + 3은 TypeError: can only concatenate str (not "int") to str가 발생합니다.', '문자열과 정수의 + 연산 오류', '문자열과 정수는 + 연산을 직접 할 수 없습니다. input() 결과를 정수와 더하려면 반드시 int(input())으로 변환해야 합니다.', ARRAY['"input"', '"TypeError"', '"타입 변환"', '"문자열+정수"'], NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  updated_at = NOW();

INSERT INTO questions (id, language, lesson_id, difficulty, question, code, options, correct_answer, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison)
VALUES
(544, 'python', '11', '어려움', '다음 코드의 출력 결과는?', 'x = 15
if x > 20:
    print("A")
elif x > 10:
    print("B")
elif x > 5:
    print("C")
else:
    print("D")', ARRAY['"B"', '"C"', '"A"', '"BC"'], 0, 'x=15는 x>20은 거짓, x>10은 참이므로 ''B''를 출력하고 나머지 elif/else는 실행되지 않습니다.', 'elif 체인 — 첫 참 조건만 실행', 'if-elif-else에서는 조건을 위에서 아래로 확인하다가 처음으로 참인 조건의 블록만 실행합니다. x=15는 x>10을 만족하므로 B만 출력됩니다.', ARRAY['"elif"', '"조건문"', '"제어 흐름"'], NULL, NULL),
(545, 'python', '11', '어려움', '다음 코드의 출력 결과는?', 'a, b = 3, 5
if a > 0:
    if b > a:
        print("both positive, b > a")
    else:
        print("both positive, b <= a")
elif a < 0:
    print("a is negative")', ARRAY['"both positive, b > a"', '"both positive, b <= a"', '"a is negative"', '"아무것도 출력되지 않는다"'], 0, 'a=3 > 0이므로 if a > 0 블록에 진입. b=5 > a=3이므로 내부 if b > a가 참 → ''both positive, b > a'' 출력.', '중첩 조건문', 'if 블록 안에 또 다른 if 문을 중첩할 수 있습니다. 바깥 조건이 참일 때만 안쪽 조건을 평가합니다.', ARRAY['"중첩 if"', '"조건문"', '"제어 흐름"'], NULL, NULL),
(546, 'python', '12', '어려움', '다음 코드의 출력 결과는?', 'x = 0
y = 10
print(x == 0 and y > 5)
print(x != 0 or y > 5)
print(not (x > 0 or y < 5))', ARRAY['"True\nTrue\nTrue"', '"True\nFalse\nTrue"', '"False\nTrue\nFalse"', '"True\nTrue\nFalse"'], 0, '1: x==0(True) and y>5(True) → True. 2: x!=0(False) or y>5(True) → True. 3: not (x>0(False) or y<5(False)) = not False = True.', 'and/or/not 조합', '논리 연산자 우선순위: not > and > or. 괄호를 사용해 우선순위를 명시하면 코드를 읽기 쉽습니다.', ARRAY['"and"', '"or"', '"not"', '"논리 연산"'], NULL, NULL),
(535, 'python', '13', '어려움', '다음 코드의 출력 결과는?', 'for i in range(10, 0, -3):
    print(i, end=" ")', ARRAY['"10 7 4 1 "', '"10 7 4 "', '"9 6 3 0 "', '"오류"'], 0, 'range(10, 0, -3): 10부터 1 이상인 동안 3씩 감소. 10, 7, 4, 1 순서로 출력됩니다. 0은 범위에 포함되지 않습니다.', '역방향 range', 'range(start, stop, step)에서 step이 음수이면 start에서 stop보다 큰 수까지 감소합니다. range(10, 0, -3)은 10, 7, 4, 1을 생성합니다.', ARRAY['"range"', '"역방향 반복"', '"for 반복문"'], NULL, NULL),
(536, 'python', '13', '어려움', '다음 코드의 출력 결과는?', 'total = 0
for i in range(1, 10, 2):
    total += i
print(total)', ARRAY['"25"', '"20"', '"30"', '"45"'], 0, 'range(1, 10, 2)는 1, 3, 5, 7, 9를 생성합니다. 합계: 1+3+5+7+9 = 25.', 'range 스텝과 누적 합', 'range(1, 10, 2)는 1부터 9까지 홀수를 생성합니다. 누적 합을 구할 때는 total = 0으로 초기화 후 += 연산을 반복합니다.', ARRAY['"range"', '"누적 합"', '"for 반복문"'], NULL, NULL),
(537, 'python', '13', '어려움', '다음 코드의 출력 결과는?', 'count = 0
for i in range(3):
    for j in range(i + 1):
        count += 1
print(count)', ARRAY['"6"', '"9"', '"3"', '"5"'], 0, 'i=0: j는 range(1) → j=0, 1번 반복. i=1: j는 range(2) → j=0,1, 2번 반복. i=2: j는 range(3) → j=0,1,2, 3번 반복. 합계: 1+2+3 = 6.', '중첩 for 반복문 횟수 계산', '중첩 루프의 총 실행 횟수는 각 반복 횟수의 합입니다. 내부 range가 i+1이면 i=0일 때 1번, i=1일 때 2번, ... 순으로 삼각수를 만듭니다.', ARRAY['"중첩 for"', '"range"', '"반복 횟수"'], NULL, NULL),
(547, 'python', '14', '어려움', '다음 코드의 출력 결과는?', 'i = 0
while True:
    i += 1
    if i == 5:
        break
print(i)', ARRAY['"5"', '"4"', '"6"', '"무한 루프"'], 0, 'while True는 무한 루프이지만 i가 5가 되면 break로 탈출합니다. 루프 종료 후 i는 5입니다.', 'while True와 break', 'while True로 무한 루프를 만들고 조건이 충족되면 break로 탈출하는 패턴은 반복 횟수를 미리 알 수 없을 때 유용합니다.', ARRAY['"while True"', '"break"', '"무한 루프"'], NULL, NULL),
(548, 'python', '14', '어려움', '다음 코드의 출력 결과는?', 'i = 0
result = 0
while i < 5:
    i += 1
    if i % 2 == 0:
        continue
    result += i
print(result)', ARRAY['"9"', '"15"', '"6"', '"3"'], 0, 'i=1(홀수, result+=1=1), i=2(짝수, continue), i=3(홀수, result+=3=4), i=4(짝수, continue), i=5(홀수, result+=5=9). 합계: 1+3+5 = 9.', 'continue로 짝수 건너뛰기', 'continue는 현재 반복의 나머지를 건너뛰고 다음 반복으로 이동합니다. i%2==0이면 continue로 짝수를 건너뛰어 홀수만 result에 더합니다.', ARRAY['"while"', '"continue"', '"홀수 합"'], NULL, NULL),
(538, 'python', '15', '어려움', '다음 조건을 모두 만족하는 자료구조는? ① 순서가 있다 ② 값을 변경할 수 있다(mutable) ③ 중복값을 허용한다', '# 자료구조 특성 비교
# 리스트:    순서 O, 수정 O, 중복 O
# 튜플:      순서 O, 수정 X, 중복 O
# 딕셔너리:  순서 O, 수정 O, 키중복 X
# 집합:      순서 X, 수정 O, 중복 X', ARRAY['"리스트(list)"', '"튜플(tuple)"', '"딕셔너리(dict)"', '"집합(set)"'], 0, '리스트는 ① 순서 있음 ② 수정 가능(mutable) ③ 중복 허용 — 세 조건 모두 만족. 튜플은 변경 불가(immutable). 집합은 순서 없고 중복 불가. 딕셔너리는 순서 있지만 키 중복 불가.', '자료구조 특성 비교', '리스트: 순서 있음, 변경 가능, 중복 허용. 튜플: 순서 있음, 변경 불가, 중복 허용. 집합: 순서 없음, 변경 가능, 중복 불가. 딕셔너리: 순서 있음(3.7+), 변경 가능, 키 중복 불가.', ARRAY['"자료구조"', '"list"', '"tuple"', '"set"', '"dict"'], NULL, NULL),
(539, 'python', '15', '어려움', '학생 100명의 이름과 점수를 저장하고 이름으로 빠르게 점수를 조회해야 한다. 가장 적합한 자료구조는?', '# 이름으로 점수를 빠르게 조회하려면?
# 리스트:     O(n) — 이름을 하나씩 비교
# 딕셔너리:   O(1) — 이름(키)으로 즉시 조회
# 집합:       값만 저장, 점수 저장 불가
# 튜플:       수정 불가, 조회도 O(n)', ARRAY['"리스트"', '"딕셔너리"', '"집합"', '"튜플"'], 1, '딕셔너리는 키(이름)로 값(점수)을 O(1) 평균 시간에 조회할 수 있습니다. 리스트는 이름을 검색하려면 O(n) 순차 탐색이 필요합니다.', '딕셔너리 — 키-값 빠른 조회', '딕셔너리는 해시 테이블 기반으로 키로 값을 O(1)에 조회할 수 있습니다. 이름→점수처럼 고유 키로 매핑된 데이터를 저장하고 검색할 때 최적입니다.', ARRAY['"딕셔너리"', '"자료구조 선택"', '"O(1) 조회"'], NULL, NULL),
(549, 'python', '17', '어려움', '다음 코드의 출력 결과는?', 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = 0
for row in matrix:
    total += row[1]
print(total)', ARRAY['"15"', '"12"', '"9"', '"45"'], 0, '각 행의 인덱스 1(두 번째) 요소: 2, 5, 8. 합계: 2+5+8 = 15.', '2D 리스트 열 접근', '2D 리스트에서 각 행의 특정 열을 순회하려면 for row in matrix: total += row[열인덱스] 패턴을 사용합니다.', ARRAY['"2D 리스트"', '"for 반복문"', '"인덱싱"'], NULL, NULL),
(550, 'python', '17', '어려움', '다음 코드의 출력 결과는?', 'nums = [1, 2, 3, 4, 5]
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)
print(sum(evens))', ARRAY['"[2, 4]\n6"', '"[1, 3, 5]\n9"', '"[2, 4]\n4"', '"오류"'], 0, 'nums에서 짝수(2, 4)만 evens에 append합니다. evens = [2, 4], sum([2, 4]) = 6.', '리스트 필터링 패턴', '빈 리스트를 초기화하고 조건을 만족하는 원소만 append하는 패턴은 리스트 필터링의 기본입니다.', ARRAY['"append"', '"for 반복문"', '"필터링"', '"sum"'], NULL, NULL),
(540, 'python', '18', '어려움', '다음 코드의 출력 결과는?', 's = "a  b   c"
parts = s.split()
print(len(parts))
print(parts[1])', ARRAY['"3\nb"', '"3\n "', '"5\nb"', '"오류"'], 0, 'split() 인자 없이 호출하면 공백(스페이스, 탭 등)을 기준으로 분리하고 빈 문자열은 무시합니다. "a  b   c"는 [''a'', ''b'', ''c'']로 3개 원소가 됩니다. parts[1] = ''b''.', 'split() 인자 없이 호출', 'split()에 인자를 주지 않으면 연속된 공백 전체를 하나의 구분자로 처리하고 결과에서 빈 문자열을 제거합니다. split('' '')와 다릅니다.', ARRAY['"split"', '"공백 처리"', '"문자열 분리"'], NULL, NULL),
(541, 'python', '18', '어려움', '다음 코드의 출력 결과는?', 'words = ["Hello", "World", "Python"]
print("-".join(words))
print("".join(words))', ARRAY['"Hello-World-Python\nHelloWorldPython"', '"Hello World Python\nHelloWorldPython"', '"오류"', '"Hello-World-Python\nHello World Python"'], 0, '"-".join(words)는 원소 사이에 ''-''를 삽입하여 "Hello-World-Python". "".join(words)는 빈 문자열로 연결하여 "HelloWorldPython".', 'join() — 구분자로 결합', 'join()은 리스트의 문자열 원소를 지정한 구분자로 연결합니다. "".join()은 구분자 없이 모두 붙여 연결합니다.', ARRAY['"join"', '"리스트 결합"', '"문자열 처리"'], NULL, NULL),
(551, 'python', '36', '어려움', '다음 코드의 출력 결과는?', 'def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))
print(greet("Bob", "Hi"))', ARRAY['"Hello, Alice!\nHi, Bob!"', '"Hello, Alice!\nHello, Bob!"', '"오류"', '"Alice, Hello!\nBob, Hi!"'], 0, 'greet("Alice")는 greeting 기본값 "Hello" 사용 → "Hello, Alice!". greet("Bob", "Hi")는 greeting에 "Hi" 전달 → "Hi, Bob!".', '기본 매개변수(default parameter)', '기본값이 있는 매개변수는 인자를 생략하면 기본값을 사용하고, 인자를 전달하면 전달된 값을 사용합니다.', ARRAY['"기본 매개변수"', '"함수"', '"f-string"'], NULL, NULL),
(552, 'python', '36', '어려움', '다음 코드의 출력 결과는?', 'def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(add(multiply(2, 3), multiply(4, 5)))', ARRAY['"26"', '"46"', '"120"', '"오류"'], 0, 'multiply(2, 3) = 6, multiply(4, 5) = 20. add(6, 20) = 26.', '함수 중첩 호출', '함수의 반환값을 다른 함수의 인자로 바로 사용할 수 있습니다. 안쪽 함수부터 평가되어 결과가 바깥 함수에 전달됩니다.', ARRAY['"함수 중첩 호출"', '"return"', '"함수 합성"'], NULL, NULL),
(553, 'python', '41', '어려움', '다음 코드의 출력 결과는?', 'class Counter:
    count = 0

    def __init__(self):
        Counter.count += 1

c1 = Counter()
c2 = Counter()
c3 = Counter()
print(Counter.count)', ARRAY['"3"', '"0"', '"1"', '"오류"'], 0, 'count는 클래스 변수로 모든 인스턴스가 공유합니다. 인스턴스를 3번 생성할 때마다 __init__에서 Counter.count가 1씩 증가하므로 최종값은 3.', '클래스 변수 vs 인스턴스 변수', '클래스 변수(Counter.count)는 모든 인스턴스가 공유합니다. 인스턴스 생성 시마다 __init__이 호출되어 클래스 변수를 누적 증가시킬 수 있습니다.', ARRAY['"클래스 변수"', '"__init__"', '"인스턴스"'], NULL, NULL),
(554, 'python', '41', '어려움', '다음 코드의 출력 결과는?', 'class Point:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def distance(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p.distance())', ARRAY['"5.0"', '"5"', '"7.0"', '"오류"'], 0, '피타고라스 정리: (3² + 4²)^0.5 = (9 + 16)^0.5 = 25^0.5 = 5.0. **0.5는 제곱근이므로 float를 반환합니다.', '인스턴스 메서드와 self', '인스턴스 메서드는 self를 통해 인스턴스 속성에 접근합니다. distance()는 self.x와 self.y를 사용해 원점까지의 거리를 계산합니다.', ARRAY['"인스턴스 메서드"', '"self"', '"클래스"', '"피타고라스"'], NULL, NULL),
(555, 'python', '48', '어려움', '다음 코드의 출력 결과는?', 'import math
print(math.floor(3.7))
print(math.ceil(3.2))
print(math.sqrt(16))', ARRAY['"3\n4\n4.0"', '"4\n4\n4"', '"3\n3\n4.0"', '"오류"'], 0, 'math.floor(3.7)은 내림으로 3, math.ceil(3.2)은 올림으로 4, math.sqrt(16)은 제곱근으로 4.0(float)을 반환합니다.', 'math 모듈 주요 함수', 'math.floor()는 내림(≤), math.ceil()은 올림(≥), math.sqrt()는 제곱근을 계산합니다. sqrt()는 항상 float를 반환합니다.', ARRAY['"math 모듈"', '"floor"', '"ceil"', '"sqrt"'], NULL, NULL),
(556, 'python', '9', '어려움', '다음 코드의 출력 결과는?', 'print(int(True))
print(float(False))
print(str(None))', ARRAY['"1\n0.0\nNone"', '"True\nFalse\nNone"', '"1\n0\nNone"', '"오류"'], 0, 'int(True)=1 (bool은 int의 서브클래스). float(False)=0.0. str(None)은 문자열 ''None''을 반환합니다. None은 오류 없이 변환됩니다.', 'bool과 None의 타입 변환', 'bool을 int/float으로 변환하면 True→1/1.0, False→0/0.0. str(None)은 ''None'' 문자열이 됩니다. None 자체는 오류가 아닙니다.', ARRAY['"타입 변환"', '"bool"', '"None"'], NULL, NULL),
(557, 'python', '13', '어려움', '다음 코드의 출력 결과는?', 'total = 0
for i in range(5, 0, -1):
    if i % 2 != 0:
        total += i
print(total)', ARRAY['"9"', '"15"', '"6"', '"5"'], 0, 'range(5, 0, -1)은 5, 4, 3, 2, 1을 생성합니다. 홀수만 더하면: 5+3+1=9.', '역방향 range와 조건부 누적', 'range(start, stop, -1)은 start에서 stop+1까지 감소합니다. 조건과 결합하면 특정 조건의 값만 선택적으로 처리할 수 있습니다.', ARRAY['"range"', '"역방향 반복"', '"홀수/짝수"'], NULL, NULL),
(558, 'python', '4', '보통', '다음 코드의 출력 결과는?', 'x = 10
x += 3
x *= 2
print(x)', ARRAY['"23"', '"26"', '"20"', '"오류"'], 1, 'x += 3 → x = 13. x *= 2 → x = 26. 복합 대입 연산자는 순서대로 실행됩니다.', '복합 대입 연산자 체인', '+=, -=, *=, //= 같은 복합 대입 연산자는 현재 값에 연산을 적용한 뒤 다시 저장합니다. 여러 번 연속으로 사용하면 순서대로 값이 바뀝니다.', ARRAY['"복합 대입 연산자"', '"+="', '"*="'], NULL, NULL),
(559, 'python', '4', '보통', '다음 코드의 출력 결과는?', 'n = 17
print(n % 5)
print(n % 5 == 2)', ARRAY['"2\nTrue"', '"2\nFalse"', '"5\nTrue"', '"오류"'], 0, '17 % 5 = 2 (나머지). 그리고 2 == 2는 True입니다.', '나머지 연산자 % 와 비교 연산자 조합', '% 연산자로 나머지를 구한 뒤 == 로 비교할 수 있습니다. 홀짝 판별(n % 2 == 0)에도 같은 패턴을 씁니다.', ARRAY['"%"', '"나머지"', '"비교 연산자"'], NULL, NULL),
(560, 'python', '4', '보통', '다음 코드의 출력 결과는?', 'a = 20
a -= 4
a //= 3
print(a)', ARRAY['"4"', '"5"', '"6"', '"오류"'], 1, 'a -= 4 → a = 16. a //= 3 → a = 16 // 3 = 5 (소수점 버림).', '복합 대입 연산자 — //=', '//= 는 정수 나눗셈 후 결과를 저장합니다. a //= 3 은 a = a // 3 과 같습니다.', ARRAY['"//="', '"복합 대입 연산자"', '"정수 나눗셈"'], NULL, NULL),
(561, 'python', '5', '보통', '다음 코드의 출력 결과는?', 'sep = "-" * 3
msg = "Hi"
print(sep + msg + sep)', ARRAY['"---Hi---"', '"- - -Hi- - -"', '"---Hi"', '"오류"'], 0, '"-" * 3 은 "---". "---" + "Hi" + "---" = "---Hi---".', '문자열 반복 후 연결', '문자열 * 정수로 반복한 결과를 변수에 저장한 뒤 + 로 이어붙일 수 있습니다.', ARRAY['"문자열 반복"', '"문자열 연결"', '"*"'], NULL, NULL),
(562, 'python', '5', '보통', '다음 코드의 출력 결과는?', 'word = "나"
print((word + "!") * 3)', ARRAY['"나나나!!!"', '"나!나!나!"', '"나 ! 나 ! 나 !"', '"오류"'], 1, 'word + "!" = "나!". "나!" * 3 = "나!나!나!". 괄호 안을 먼저 계산한 뒤 반복합니다.', '괄호를 활용한 문자열 연산', '괄호 안을 먼저 계산합니다. (a + b) * n 은 a+b를 먼저 만든 뒤 n번 반복합니다.', ARRAY['"연산자 우선순위"', '"문자열 반복"', '"괄호"'], NULL, NULL),
(563, 'python', '13', '쉬움', '다음 코드의 출력 결과는?', 'for i in range(1, 5):
    print(i, end=" ")', ARRAY['"0 1 2 3 4"', '"1 2 3 4"', '"1 2 3 4 5"', '"0 1 2 3"'], 1, 'range(1, 5)는 1, 2, 3, 4를 생성합니다. 시작값은 포함, 끝값(5)은 포함하지 않습니다.', 'range(start, stop)', 'range(start, stop)은 start부터 stop-1까지 생성합니다. range(1, 5)는 1, 2, 3, 4입니다.', ARRAY['"range"', '"for 반복문"', '"시작값"'], NULL, NULL),
(564, 'python', '13', '쉬움', '다음 코드의 출력 결과는?', 'total = 0
for i in range(4):
    total += i
print(total)', ARRAY['"4"', '"6"', '"10"', '"0"'], 1, 'range(4)는 0, 1, 2, 3을 생성합니다. total = 0+1+2+3 = 6.', 'for 반복문으로 누적합 계산', '반복문 전에 누적 변수를 0으로 초기화하고, 반복마다 더해가는 패턴은 합계 계산의 기본입니다.', ARRAY['"누적합"', '"+="', '"range"'], NULL, NULL),
(565, 'python', '15', '쉬움', '다음 중 한 번 만들면 값을 바꿀 수 없는(불변, immutable) 자료구조는?', '# 4가지 자료구조 특성
# 리스트(list):   순서 O, 수정 O, 중복 O
# 튜플(tuple):    순서 O, 수정 X, 중복 O
# 딕셔너리(dict): 순서 O, 수정 O, 키중복 X
# 집합(set):      순서 X, 수정 O, 중복 X', ARRAY['"리스트(list)"', '"딕셔너리(dict)"', '"집합(set)"', '"튜플(tuple)"'], 3, '튜플(tuple)은 수정 불가능한(immutable) 자료구조입니다. 한 번 만들면 값을 바꾸거나 추가/삭제할 수 없습니다.', '불변 자료구조 — 튜플', '튜플은 리스트와 비슷하지만 값을 변경할 수 없습니다. 변경되면 안 되는 데이터를 저장할 때 사용합니다.', ARRAY['"튜플"', '"불변"', '"immutable"'], NULL, NULL),
(566, 'python', '15', '쉬움', '다음 중 중복된 값을 자동으로 제거하고 순서도 없는 자료구조는?', '# 4가지 자료구조 특성
# 리스트(list):   순서 O, 수정 O, 중복 O
# 튜플(tuple):    순서 O, 수정 X, 중복 O
# 딕셔너리(dict): 순서 O, 수정 O, 키중복 X
# 집합(set):      순서 X, 수정 O, 중복 X', ARRAY['"리스트(list)"', '"튜플(tuple)"', '"딕셔너리(dict)"', '"집합(set)"'], 3, '집합(set)은 중복을 허용하지 않고 순서도 없습니다. 같은 값을 여러 번 추가해도 하나만 저장됩니다.', '중복 없는 자료구조 — 집합', '집합(set)은 수학의 집합처럼 중복 없이 유일한 값만 저장합니다. 순서가 없어 인덱스로 접근할 수 없습니다.', ARRAY['"집합"', '"set"', '"중복 제거"'], NULL, NULL),
(567, 'python', '15', '보통', '학생 10명의 시험 점수를 순서대로 저장하고 나중에 점수를 수정할 수도 있어야 한다. 가장 적합한 자료구조는?', '# 조건: 순서 유지 O, 수정 가능 O, 중복 허용 O (같은 점수도 저장 가능)
# 리스트:   순서 O, 수정 O, 중복 O  ← ?
# 튜플:     순서 O, 수정 X, 중복 O
# 집합:     순서 X, 수정 O, 중복 X
# 딕셔너리: 키-값 쌍으로 저장', ARRAY['"튜플(tuple)"', '"집합(set)"', '"리스트(list)"', '"딕셔너리(dict)"'], 2, '순서 유지 + 수정 가능 + 중복 허용 — 이 세 조건을 모두 만족하는 것은 리스트입니다.', '상황에 맞는 자료구조 선택 — 리스트', '수정이 필요하고 순서가 중요한 데이터(시험 점수, 순위 등)는 리스트가 적합합니다.', ARRAY['"리스트"', '"자료구조 선택"', '"mutable"'], NULL, NULL),
(568, 'python', '15', '보통', '회원 아이디 목록(중복 없음)을 저장하고, 특정 아이디가 회원인지 빠르게 확인해야 한다. 가장 적합한 자료구조는?', '# 조건: 중복 없음, 순서 불필요, 빠른 존재 여부 확인
# 리스트:   존재 확인이 느림 O(n)
# 집합:     존재 확인이 빠름 O(1), 중복 없음
# 튜플:     수정 불가
# 딕셔너리: 키-값 쌍, 값이 필요 없을 때는 과함', ARRAY['"리스트(list)"', '"튜플(tuple)"', '"딕셔너리(dict)"', '"집합(set)"'], 3, '중복 없이 저장하고 존재 여부만 빠르게 확인할 때는 집합(set)이 최적입니다. O(1)으로 검색합니다.', '상황에 맞는 자료구조 선택 — 집합', '중복 없이 유일한 값을 저장하고 빠른 검색이 필요할 때는 집합(set)을 사용합니다.', ARRAY['"집합"', '"O(1)"', '"자료구조 선택"'], NULL, NULL),
(10001, 'cpp', 'cpp-1', '쉬움', '다음 중 C++ 프로그램의 시작점(entry point)이 되는 함수는?', '#include <iostream>

int main() {
    std::cout << "Hello!" << std::endl;
    return 0;
}', ARRAY['"start()"', '"main()"', '"begin()"', '"run()"'], 1, 'C++ 프로그램은 항상 main() 함수에서 시작됩니다. 이것은 C++ 표준에 의해 정해진 규칙입니다.', 'main 함수', '모든 C++ 프로그램은 main() 함수를 반드시 포함해야 하며, 프로그램 실행 시 가장 먼저 호출됩니다.', ARRAY['"프로그램 구조"', '"return 0"', '"함수"'], 'helloWorldBuilder', NULL),
(10002, 'cpp', 'cpp-20', '어려움', '다익스트라 알고리즘에 대한 설명으로 올바른 것은?', '// 다익스트라 핵심 아이디어
priority_queue<pair<int,int>, vector<pair<int,int>>,
               greater<pair<int,int>>> pq;
dist[start] = 0;
pq.push({0, start});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}', ARRAY['"음수 가중치 간선이 있어도 정확하게 동작한다"', '"가중치가 없는 그래프에서만 사용 가능하다"', '"음이 아닌 가중치 그래프에서 단일 시작점 최단 경로를 구한다"', '"모든 쌍의 최단 경로를 구한다"'], 2, '다익스트라는 음이 아닌 가중치 그래프에서 하나의 시작점으로부터 모든 다른 노드까지의 최단 경로를 구합니다.', '다익스트라 알고리즘 (Dijkstra)', '우선순위 큐를 사용하여 가장 가까운 노드부터 방문하며 최단 거리를 갱신합니다. 시간 복잡도: O((V+E) log V). 음수 가중치 불가.', ARRAY['"다익스트라"', '"최단 경로"', '"우선순위 큐"', '"그래프"'], NULL, NULL),
(10003, 'cpp', 'cpp-2', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    cout << "World" << endl;
    return 0;
}', ARRAY['"HelloWorld"', '"Hello World"', '"Hello\nWorld"', '"Hello
World"'], 3, 'endl은 줄바꿈을 의미합니다. 따라서 Hello와 World가 각각 다른 줄에 출력됩니다.', 'endl과 줄바꿈', 'endl은 줄바꿈 문자를 출력하고 버퍼를 비웁니다. ''\n''도 줄바꿈에 사용할 수 있습니다.', ARRAY['"cout"', '"endl"', '"\n"'], 'coutMission', NULL),
(10004, 'cpp', 'cpp-2', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "이름\t나이" << endl;
    cout << "민수\t15" << endl;
    return 0;
}', ARRAY['"이름\t나이
민수\t15"', '"이름    나이
민수    15"', '"이름나이
민수15"', '"이름 나이
민수 15"'], 1, '\t는 탭(tab) 문자로, 일정 간격만큼 띄어줍니다. 코드에서 \t로 쓰면 실제 출력에서 탭 간격이 됩니다.', '탭 이스케이프 문자 \t', '\t는 탭 키와 같은 효과로 열을 맞출 때 유용합니다. \n은 줄바꿈, \t는 탭입니다.', ARRAY['"이스케이프 문자"', '"\t"', '"cout"'], 'coutMission', NULL),
(10005, 'cpp', 'cpp-3', '보통', '다음 코드의 출력 결과는?', '#include <iostream>

int main() {
    int score = 95;
    std::cout << "점수: " << score << "점" << std::endl;
    std::cout << "합격 여부: " << "합격" << std::endl;
    return 0;
}', ARRAY['"점수: 95점
합격 여부: 합격"', '"점수: score점
합격 여부: 합격"', '"점수: 95 점
합격 여부: 합격"', '"컴파일 에러"'], 0, 'cout << 문자열 << 정수 << 문자열 처럼 << 연산자로 여러 타입을 이어서 출력할 수 있습니다. 변수 score는 값 95로 출력됩니다.', '문자열과 숫자 혼합 출력', 'std::cout << "텍스트" << 변수 << "텍스트" 처럼 << 연산자를 연결하면 문자열과 숫자를 함께 출력할 수 있습니다.', ARRAY['"cout"', '"<<연산자"', '"문자열+숫자 출력"', '"std::"'], NULL, NULL),
(10006, 'cpp', 'cpp-2', '쉬움', '다음 코드에서 using namespace std;의 역할은?', '#include <iostream>
using namespace std;

int main() {
    cout << "Hello";
    return 0;
}', ARRAY['"iostream 헤더를 포함한다"', '"std:: 접두사 없이 cout, cin 등을 사용할 수 있게 한다"', '"main 함수를 정의한다"', '"프로그램을 실행한다"'], 1, 'using namespace std; 없이는 std::cout, std::cin처럼 std:: 접두사를 붙여야 합니다.', 'using namespace', 'std 네임스페이스의 모든 이름을 접두사 없이 사용할 수 있게 합니다. 대규모 프로젝트에서는 피하는 것이 좋습니다.', ARRAY['"namespace"', '"std"', '"이름 충돌"'], 'helloWorldBuilder', NULL),
(10009, 'cpp', 'cpp-3', '쉬움', '다음 중 C++에서 정수형 변수를 선언하는 올바른 방법은?', '', ARRAY['"int x = 10;"', '"x = 10"', '"var x = 10;"', '"integer x = 10;"'], 0, 'C++에서 변수 선언 시 반드시 자료형을 명시해야 합니다. 정수는 int를 사용합니다.', '변수 선언', 'C++는 정적 타입 언어로, 변수 선언 시 자료형(int, double, string 등)을 반드시 명시해야 합니다.', ARRAY['"자료형"', '"초기화"', '"const"'], 'syntaxSpotter', NULL),
(10010, 'cpp', 'cpp-3', '쉬움', '다음 중 C++에서 소수점이 있는 숫자를 저장하는 자료형은?', '', ARRAY['"int"', '"char"', '"double"', '"bool"'], 2, 'double은 소수점이 있는 실수를 저장하는 자료형입니다. int는 정수만, char는 문자, bool은 참/거짓을 저장합니다.', '실수 자료형', 'C++에서 실수를 저장하려면 float(4바이트) 또는 double(8바이트)을 사용합니다. double이 더 정밀합니다.', ARRAY['"float"', '"자료형 크기"', '"형변환"'], NULL, NULL),
(10011, 'cpp', 'cpp-3', '쉬움', '다음 코드에서 컴파일 오류가 발생하는 줄은?', '#include <iostream>
using namespace std;

int main() {
    int x = 5;       // 1번 줄
    cout << x << endl; // 2번 줄
    x = "hello";      // 3번 줄
    return 0;         // 4번 줄
}', ARRAY['"1번 줄"', '"2번 줄"', '"3번 줄"', '"오류 없음"'], 2, 'x는 int형 변수인데 문자열 "hello"를 대입하려 하므로 3번 줄에서 타입 오류가 발생합니다.', '타입 안전성', 'C++은 강한 타입 언어로, int 변수에 문자열을 대입할 수 없습니다. 변수의 타입은 선언 후 변경할 수 없습니다.', ARRAY['"자료형"', '"컴파일 오류"', '"타입 변환"'], 'compileVisualizer', '{"wrong":"int x = 5;\nx = \"hello\";  // 타입 불일치!","correct":"int x = 5;\nx = 10;  // int에 int 대입 OK"}'::jsonb),
(10012, 'cpp', 'cpp-3', '보통', '두 cout의 출력 결과로 올바른 것은?', '#include <iostream>
using namespace std;

int main() {
    char c = ''A'';
    cout << c << endl;
    cout << (int)c << endl;
    return 0;
}', ARRAY['"A 와 A"', '"A 와 숫자"', '"숫자 와 숫자"', '"컴파일 오류"'], 1, 'cout << c 는 문자 ''A''를 그대로 출력하고, cout << (int)c 는 ''A''를 int로 형변환해서 ASCII 코드인 65를 출력해요. 같은 변수라도 캐스팅하면 다르게 출력돼요!', 'char 캐스팅 — 문자 vs 숫자', 'char 변수를 그냥 출력하면 글자, (int)로 캐스팅하면 ASCII 숫자가 출력됩니다.', ARRAY['"char"', '"ASCII"', '"형변환"'], NULL, NULL),
(10015, 'cpp', 'cpp-3', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 3;
    double y = 2.5;
    cout << x + y << endl;
    return 0;
}', ARRAY['"5"', '"5.5"', '"5.0"', '"컴파일 오류"'], 1, 'int와 double 연산 시 int가 자동으로 double로 변환됩니다(암시적 형변환). 3.0 + 2.5 = 5.5', '암시적 형변환 (Implicit Conversion)', '서로 다른 타입끼리 연산 시 범위가 좁은 타입이 넓은 타입으로 자동 변환됩니다. int → double 변환이 대표적입니다.', ARRAY['"암시적 형변환"', '"타입 프로모션"', '"static_cast"'], NULL, NULL),
(10020, 'cpp', 'cpp-3', '쉬움', '다음 중 C++ 문자열 리터럴의 올바른 표현은?', '', ARRAY['"''Hello''"', '"\"Hello\""', '"[Hello]"', '"{Hello}"'], 1, 'C++에서 문자열 리터럴은 큰따옴표(")로 감쌉니다. 작은따옴표('')는 단일 문자(char)용입니다.', '문자열 vs 문자 리터럴', '"abc"는 문자열(string), ''a''는 단일 문자(char)입니다. 혼동하지 마세요.', ARRAY['"string"', '"char"', '"리터럴"'], 'syntaxSpotter', NULL),
(10021, 'cpp', 'cpp-3', '쉬움', '다음 코드를 컴파일하면 어떻게 되나요?', '#include <iostream>
using namespace std;

int main() {
    const int MAX = 100;
    MAX = 200;
    cout << MAX;
    return 0;
}', ARRAY['"200이 출력됨"', '"100이 출력됨"', '"컴파일 오류"', '"런타임 오류"'], 2, 'const로 선언된 변수는 초기화 후 값을 변경할 수 없어요. MAX = 200처럼 const 변수에 대입하면 컴파일 오류가 발생합니다.', 'const 상수', 'const 변수는 초기화 후 값을 변경할 수 없습니다. 매직 넘버 대신 const를 사용하면 코드가 명확해집니다.', ARRAY['"const"', '"상수"', '"매직 넘버"'], NULL, NULL),
(10022, 'cpp', 'cpp-4', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;  // 사용자가 7을 입력
    cout << x * 2 << endl;
    return 0;
}', ARRAY['"7"', '"14"', '"72"', '"컴파일 오류"'], 1, 'cin >> x로 7을 입력받으면 x = 7이 됩니다. x * 2 = 14가 출력됩니다.', 'cin 입력', 'cin >> 변수 형태로 사용자 입력을 받을 수 있습니다. 입력된 값은 변수의 자료형에 맞게 변환됩니다.', ARRAY['"cin"', '"cout"', '"입출력"'], NULL, NULL),
(10023, 'cpp', 'cpp-4', '쉬움', '다음 코드에서 빈칸에 들어갈 알맞은 것은?', '#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "나이: ";
    _____ >> age;
    return 0;
}', ARRAY['"cout"', '"cin"', '"scanf"', '"input"'], 1, 'C++에서 키보드 입력을 받으려면 cin >> 변수명을 사용합니다.', 'cin 입력', 'cin >> 변수명으로 사용자 입력을 받습니다. >> 는 추출 연산자입니다.', ARRAY['"cin"', '"cout"', '"입출력 스트림"'], NULL, NULL),
(10024, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << 5 + 3 << endl;
    return 0;
}', ARRAY['"5"', '"8"', '"53"', '"컴파일 오류"'], 1, '정수끼리의 + 연산은 산술 덧셈입니다. 5 + 3 = 8이 출력됩니다.', '산술 연산자', 'C++에서 + 연산자는 숫자 타입에서 덧셈을 수행합니다. cout << 로 결과를 출력합니다.', ARRAY['"cout"', '"연산자"', '"자료형"'], NULL, NULL),
(10025, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}', ARRAY['"3.5"', '"3"', '"4"', '"컴파일 오류"'], 1, 'int끼리 나누면 정수 나눗셈이 수행되어 소수점 이하가 버려집니다. 7 / 2 = 3', '정수 나눗셈', 'C++에서 int / int는 소수점을 버리고 정수 결과만 반환합니다. 소수점이 필요하면 double을 사용하세요.', ARRAY['"나머지 연산 %"', '"형변환"', '"double"'], NULL, '{"wrong":"int a = 7, b = 2;\ncout << a / b;  // 3 (소수점 버림)","correct":"double a = 7.0, b = 2.0;\ncout << a / b;  // 3.5"}'::jsonb),
(10026, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 10;
    x++;
    cout << x;
    return 0;
}', ARRAY['"10"', '"11"', '"12"', '"컴파일 오류"'], 1, 'x++는 x의 값을 1 증가시킵니다. x = 10에서 x++ 후 x = 11이 됩니다.', '증감 연산자', 'x++는 x를 1 증가, x--는 1 감소시킵니다. 전위(++x)와 후위(x++)의 차이에 주의하세요.', ARRAY['"++"', '"--"', '"전위/후위 증감"'], NULL, NULL),
(10027, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    bool a = true;
    bool b = false;
    cout << (a && b) << " " << (a || b) << endl;
    return 0;
}', ARRAY['"true false"', '"1 0"', '"0 1"', '"0 0"'], 2, 'true && false = false(0), true || false = true(1). bool 값은 cout에서 0 또는 1로 출력됩니다.', 'bool 타입', 'bool 타입은 true(1) 또는 false(0)를 저장합니다. cout으로 출력하면 기본적으로 1 또는 0이 출력됩니다.', ARRAY['"bool"', '"논리 연산자"', '"boolalpha"'], NULL, NULL),
(10029, 'cpp', 'cpp-5', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 10;
    a += 5;
    a *= 2;
    cout << a;
    return 0;
}', ARRAY['"25"', '"30"', '"20"', '"35"'], 1, 'a=10 → a+=5로 a=15 → a*=2로 a=30. 복합 대입 연산자는 순서대로 실행됩니다.', '복합 대입 연산자', '+=, -=, *=, /= 등은 연산과 대입을 동시에 수행합니다. a += 5는 a = a + 5와 같습니다.', ARRAY['"대입 연산자"', '"산술 연산"', '"연산 순서"'], NULL, NULL),
(10030, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    bool flag = true;
    cout << flag << " " << !flag;
    return 0;
}', ARRAY['"true false"', '"1 0"', '"1 1"', '"0 1"'], 1, 'cout에서 bool은 true→1, false→0으로 출력됩니다. !true는 false(0)입니다.', 'bool 출력', 'cout << bool은 기본적으로 1 또는 0을 출력합니다. boolalpha를 쓰면 true/false 문자열로 출력됩니다.', ARRAY['"bool"', '"논리 연산자"', '"boolalpha"'], NULL, NULL),
(10031, 'cpp', 'cpp-3', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    double d = 7.0 / 2;
    int i = 7 / 2;
    cout << d << " " << i;
    return 0;
}', ARRAY['"3.5 3.5"', '"3 3"', '"3.5 3"', '"3 3.5"'], 2, '7.0/2는 double 나눗셈으로 3.5, 7/2는 int 나눗셈으로 3입니다. 피연산자 중 하나가 double이면 double 나눗셈이 됩니다.', '암시적 형변환과 나눗셈', 'int/int는 정수 나눗셈, double/int는 실수 나눗셈입니다. 하나라도 실수면 실수 나눗셈이 됩니다.', ARRAY['"형변환"', '"정수 나눗셈"', '"실수 나눗셈"'], NULL, NULL),
(10032, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    cout << (a > b) << " ";
    cout << (a < b) << " ";
    cout << (a == b);
    return 0;
}', ARRAY['"false true false"', '"0 1 0"', '"1 0 0"', '"true false false"'], 1, '비교 연산의 결과는 bool이며, cout에서 true→1, false→0으로 출력됩니다. 10>20=false(0), 10<20=true(1), 10==20=false(0).', '비교 연산자의 결과', '>, <, ==, !=, >=, <= 연산자는 bool 값(true/false)을 반환합니다. cout에서는 1/0으로 출력됩니다.', ARRAY['"비교 연산자"', '"bool"', '"조건"'], NULL, NULL),
(10037, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 10;
    if (a > 5) {
        cout << "크다";
    } else {
        cout << "작다";
    }
    return 0;
}', ARRAY['"크다"', '"작다"', '"크다작다"', '"컴파일 오류"'], 0, 'a = 10이고 10 > 5는 참이므로 if 블록이 실행되어 ''크다''가 출력됩니다.', 'if-else 조건문', 'if 조건이 참이면 if 블록을, 거짓이면 else 블록을 실행합니다.', ARRAY['"조건문"', '"비교 연산자"', '"else if"'], 'cppIfBuilder', NULL),
(10038, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    cout << a % b;
    return 0;
}', ARRAY['"3"', '"2"', '"3.4"', '"컴파일 오류"'], 1, '% 연산자는 나머지를 구합니다. 17 ÷ 5 = 3 나머지 2이므로 17 % 5 = 2입니다.', '나머지 연산자 (%)', '% 연산자는 나눗셈의 나머지를 반환합니다. 짝수/홀수 판별(n % 2), 특정 범위 순환 등에 자주 사용됩니다.', ARRAY['"나머지"', '"짝수 홀수"', '"정수 나눗셈"'], NULL, NULL),
(10039, 'cpp', 'cpp-6', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 5;
    if (x > 3 && x < 10) {
        cout << "범위 안";
    } else {
        cout << "범위 밖";
    }
    return 0;
}', ARRAY['"범위 안"', '"범위 밖"', '"컴파일 오류"', '"아무것도 출력 안 됨"'], 0, 'x=5이고, 5>3은 참, 5<10도 참입니다. &&(AND) 연산에서 둘 다 참이므로 ''범위 안''이 출력됩니다.', '논리 연산자 &&', '&&는 두 조건이 모두 참일 때만 참입니다. ||는 하나라도 참이면 참, !는 조건을 반전시킵니다.', ARRAY['"&&"', '"||"', '"!"', '"조건문"'], 'cppIfBuilder', NULL),
(10040, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 7;
    cout << (x > 5 ? "크다" : "작다") << endl;
    return 0;
}', ARRAY['"크다"', '"작다"', '"7"', '"컴파일 오류"'], 0, '삼항 연산자(조건 ? 참값 : 거짓값)에서 7 > 5는 참이므로 "크다"가 출력됩니다.', '삼항 연산자 (?:)', '조건 ? 값1 : 값2 형태로, if-else를 한 줄로 작성할 수 있습니다. 간단한 조건부 대입에 유용합니다.', ARRAY['"삼항 연산자"', '"조건문"', '"if-else"'], NULL, '{"wrong":"// if-else (3줄)\nif (x > 5) cout << \"크다\";\nelse cout << \"작다\";","correct":"// 삼항 연산자 (1줄)\ncout << (x > 5 ? \"크다\" : \"작다\");"}'::jsonb),
(10041, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 0;
    if (x) {
        cout << "참";
    } else {
        cout << "거짓";
    }
    return 0;
}', ARRAY['"참"', '"거짓"', '"0"', '"컴파일 오류"'], 1, 'C++에서 0은 false, 0이 아닌 값은 true로 취급됩니다. x=0이므로 else 블록이 실행됩니다.', '정수의 bool 변환', 'C++에서 0은 false, 0이 아닌 모든 값(양수, 음수)은 true로 변환됩니다. if(x)는 if(x != 0)과 같습니다.', ARRAY['"bool"', '"조건문"', '"암시적 변환"'], NULL, NULL),
(10042, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    cout << (a > b ? a : b);
    return 0;
}', ARRAY['"3"', '"5"', '"true"', '"컴파일 오류"'], 1, '삼항 연산자에서 5 > 3은 참이므로 a(=5)가 선택됩니다. 이 패턴은 두 수 중 최대값을 구하는 데 사용됩니다.', '삼항 연산자로 최대값 구하기', 'max(a, b)와 동일하게 (a > b ? a : b)로 두 값 중 큰 값을 구할 수 있습니다.', ARRAY['"삼항 연산자"', '"max"', '"min"'], NULL, NULL),
(10043, 'cpp', 'cpp-20', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 15;
    cout << (a & 1);
    return 0;
}', ARRAY['"0"', '"1"', '"15"', '"컴파일 오류"'], 1, 'a & 1은 a의 마지막 비트를 확인합니다. 15(1111)의 마지막 비트는 1이므로 홀수입니다.', '비트 AND로 홀짝 판별', 'n & 1이 1이면 홀수, 0이면 짝수입니다. 비트 연산은 % 2보다 빠릅니다.', ARRAY['"비트 연산"', '"AND"', '"홀짝 판별"'], NULL, NULL),
(10044, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 7;
    if (x % 2 == 0)
        cout << "짝수";
    else
        cout << "홀수";
    return 0;
}', ARRAY['"짝수"', '"홀수"', '"짝수홀수"', '"컴파일 오류"'], 1, '7 % 2 = 1이므로 조건이 false입니다. else 블록이 실행되어 ''홀수''가 출력됩니다.', '나머지 연산으로 홀짝 판별', 'n % 2 == 0이면 짝수, 아니면 홀수입니다. %는 나머지(modulo) 연산자입니다.', ARRAY['"나머지 연산"', '"조건문"', '"짝홀수"'], NULL, NULL),
(10046, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int score = 75;
    if (score >= 90) {
        cout << "A";
    } else if (score >= 70) {
        cout << "B";
    } else {
        cout << "C";
    }
    return 0;
}', ARRAY['"A"', '"B"', '"C"', '"AB"'], 1, 'score가 75이므로 첫 번째 조건 (75 >= 90)은 false, 두 번째 조건 (75 >= 70)은 true입니다. ''B''가 출력됩니다.', 'else if로 여러 조건 처리', 'if → else if → else 순서로 위에서 아래로 확인합니다. 처음 true인 조건의 블록만 실행되고 나머지는 건너뜁니다.', ARRAY['"if-else"', '"조건문"', '"비교 연산자"'], NULL, NULL),
(10047, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = -5;
    if (x > 0)
        cout << "양수";
    else if (x == 0)
        cout << "영";
    else
        cout << "음수";
    return 0;
}', ARRAY['"양수"', '"영"', '"음수"', '"양수음수"'], 2, 'x=-5이므로 x>0은 false, x==0도 false, else 블록이 실행되어 ''음수''가 출력됩니다.', 'else if 체인', 'if-else if-else 체인에서 첫 번째 true 조건의 블록만 실행됩니다. 모두 false이면 else가 실행됩니다.', ARRAY['"else if"', '"조건문"', '"분기"'], NULL, NULL),
(10048, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 10;
    int max_val = (a > b) ? a : b;
    int min_val = (a < b) ? a : b;
    cout << max_val << " " << min_val;
    return 0;
}', ARRAY['"5 10"', '"10 5"', '"10 10"', '"5 5"'], 1, '삼항 연산자로 최댓값과 최솟값을 구합니다. max_val=10, min_val=5.', '삼항 연산자로 최대/최소', '삼항 연산자로 간단하게 max, min을 구할 수 있습니다. STL의 max(), min() 함수도 사용 가능합니다.', ARRAY['"삼항 연산자"', '"max"', '"min"'], NULL, NULL),
(10049, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        cout << i << " ";
    }
    return 0;
}', ARRAY['"1 2 3"', '"0 1 2"', '"0 1 2 3"', '"1 2"'], 1, 'i=0부터 시작하고, i<3 조건이므로 0, 1, 2가 출력됩니다.', 'for 반복문', 'for(초기화; 조건; 증감)에서 조건이 false가 되면 반복이 종료됩니다. i<3이면 0,1,2에서 실행됩니다.', ARRAY['"while 반복문"', '"break"', '"continue"'], 'cppForBuilder', NULL),
(10050, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    cout << sum;
    return 0;
}', ARRAY['"10"', '"15"', '"5"', '"20"'], 1, '1 + 2 + 3 + 4 + 5 = 15. for 루프가 1부터 5까지 반복하며 합을 구합니다.', '반복문으로 합 구하기', 'sum += i는 sum = sum + i와 같습니다. 반복문을 이용해 누적 합을 구하는 것은 기본 패턴입니다.', ARRAY['"누적 합"', '"for 반복문"', '"+= 연산자"'], 'cppForBuilder', NULL),
(10051, 'cpp', 'cpp-7', '쉬움', '다음 while 루프는 몇 번 실행되나요?', '#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 4) {
        cout << i << " ";
        i++;
    }
    return 0;
}', ARRAY['"3번"', '"4번"', '"5번"', '"무한 반복"'], 1, 'i = 0, 1, 2, 3일 때 실행되고, i = 4가 되면 조건 i < 4가 거짓이 되어 종료합니다. 총 4번 실행됩니다.', 'while 반복문', 'while(조건)은 조건이 참인 동안 반복합니다. 조건 변수를 꼭 갱신해야 무한 루프를 방지할 수 있습니다.', ARRAY['"while"', '"무한 루프"', '"반복 횟수"'], 'cppWhileBuilder', NULL),
(10052, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    return 0;
}', ARRAY['"0 1 2 3"', '"0 1 2"', '"0 1 2 3 4"', '"3"'], 1, 'i=3일 때 break가 실행되어 반복문을 즉시 탈출합니다. i=0,1,2만 출력됩니다.', 'break 문', 'break는 가장 가까운 반복문을 즉시 종료합니다. continue는 현재 반복만 건너뛰고 다음 반복으로 넘어갑니다.', ARRAY['"break"', '"continue"', '"반복문"'], NULL, '{"wrong":"if (i == 3) continue; // 3만 건너뜀\n// 출력: 0 1 2 4","correct":"if (i == 3) break; // 반복 종료\n// 출력: 0 1 2"}'::jsonb),
(10055, 'cpp', 'cpp-7', '쉬움', '다음 do-while 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int i = 5;
    do {
        cout << i << " ";
        i++;
    } while (i < 5);
    return 0;
}', ARRAY['"아무것도 출력 안 됨"', '"5"', '"5 6 7 8 9"', '"무한 반복"'], 1, 'do-while은 조건 검사 전에 최소 1번 실행됩니다. i=5를 출력한 후 i=6이 되고 6<5는 거짓이므로 종료됩니다.', 'do-while 반복문', 'do-while은 조건을 나중에 검사하므로 최소 1번은 반드시 실행됩니다. while과의 핵심 차이점입니다.', ARRAY['"do-while"', '"while"', '"반복문"'], NULL, '{"wrong":"int i = 5;\nwhile (i < 5) { cout << i; i++; }\n// 한 번도 실행 안 됨","correct":"int i = 5;\ndo { cout << i; i++; } while (i < 5);\n// 최소 1번 실행: \"5\" 출력"}'::jsonb),
(10058, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        cout << i << " ";
    }
    return 0;
}', ARRAY['"1 2 3 4 5"', '"1 2 4 5"', '"1 2"', '"3"'], 1, 'continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다. i==3일 때만 건너뛰므로 1 2 4 5가 출력됩니다.', 'continue 문', 'continue는 현재 반복의 나머지를 건너뛰고 조건 검사로 돌아갑니다. break와 달리 반복문을 종료하지 않습니다.', ARRAY['"continue"', '"break"', '"반복문 제어"'], NULL, NULL),
(10060, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        if (i == 3) break;
        cout << i << " ";
        i++;
    }
    cout << "끝:" << i;
    return 0;
}', ARRAY['"0 1 2 끝:3"', '"0 1 2 3 끝:4"', '"0 1 2 끝:5"', '"0 1 2 3 4 끝:5"'], 0, 'i==3일 때 break로 반복문을 빠져나옵니다. 이때 i는 여전히 3이므로 ''끝:3''이 출력됩니다.', 'break 후 변수 상태', 'break는 반복문을 즉시 종료합니다. break 시점의 변수 값이 그대로 유지됩니다.', ARRAY['"break"', '"while"', '"반복문 탈출"'], NULL, NULL),
(10061, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == j) cout << "* ";
            else cout << ". ";
        }
        cout << endl;
    }
    return 0;
}', ARRAY['"* * *\n* * *\n* * *"', '"* . .\n. * .\n. . *"', '". . *\n. * .\n* . ."', '". * .\n* . *\n. * ."'], 1, 'i==j인 위치에만 *가 출력됩니다. (0,0), (1,1), (2,2)이므로 대각선에 *가 찍힙니다.', '중첩 반복문과 패턴', '이중 for문으로 2차원 패턴을 만들 수 있습니다. i==j 조건은 대각선을 의미합니다.', ARRAY['"중첩 반복문"', '"패턴 출력"', '"2차원"'], NULL, NULL),
(10062, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int i = 1;
    do {
        cout << i << " ";
        i *= 2;
    } while (i <= 16);
    return 0;
}', ARRAY['"1 2 4 8"', '"1 2 4 8 16"', '"2 4 8 16"', '"1 2 4 8 16 32"'], 1, 'do-while은 조건 검사 전에 먼저 실행합니다. i: 1→2→4→8→16→(32>16이므로 종료). 1 2 4 8 16이 출력됩니다.', 'do-while 반복문', 'do-while은 최소 1번은 실행되며, 본문 실행 후 조건을 검사합니다. i=16일 때 출력 후 i=32가 되어 종료.', ARRAY['"do-while"', '"while 차이"', '"최소 1회 실행"'], NULL, NULL),
(10063, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) continue;
        if (i == 5) break;
        cout << i << " ";
    }
    return 0;
}', ARRAY['"1 3 5"', '"1 3"', '"1 2 3 4"', '"2 4"'], 1, '짝수는 continue로 건너뛰고, i==5일 때 break로 종료합니다. 출력: 1 3.', 'continue와 break 조합', 'continue는 현재 반복만 건너뛰고, break는 반복문 전체를 종료합니다. 같이 사용하면 복잡한 필터링이 가능합니다.', ARRAY['"continue"', '"break"', '"반복문 제어"'], NULL, NULL),
(10064, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)
            cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++)
            cout << "*";
        cout << endl;
    }
    return 0;
}', ARRAY['"직각삼각형"', '"역삼각형"', '"다이아몬드 위쪽 절반(피라미드)"', '"직사각형"'], 2, '각 줄에 공백을 줄이고 *를 1,3,5,7,9개로 늘려서 피라미드 모양을 만듭니다.', '별 피라미드 패턴', '공백과 별의 개수를 조절하여 다양한 도형을 출력할 수 있습니다. 2*i-1은 홀수 수열입니다.', ARRAY['"패턴 출력"', '"중첩 반복문"', '"공백 제어"'], NULL, NULL),
(10065, 'cpp', 'cpp-7', '보통', '다음 코드에서 무한 루프가 발생하는 이유는?', '#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 10) {
        cout << i << " ";
        // i++ 빠짐!
    }
    return 0;
}', ARRAY['"i++ 가 없어서 i가 계속 0이다"', '"while 조건이 항상 거짓이다"', '"cout이 루프를 멈춘다"', '"i의 초기값이 잘못됐다"'], 0, 'i++가 없으면 i가 0에서 변하지 않아 while(i < 10)이 항상 true가 됩니다. 반복문에는 반드시 종료 조건을 바꾸는 코드가 필요해요.', '무한 루프 원인', 'while 루프가 멈추려면 조건에 쓰인 변수가 반드시 바뀌어야 합니다. i++ 같은 업데이트 코드를 빠뜨리면 무한 루프가 됩니다.', ARRAY['"무한 루프"', '"while"', '"업데이트 조건"'], NULL, '{"wrong":"while (i < 10) {\n    cout << i;  // i가 안 바뀜!","correct":"while (i < 10) {\n    cout << i;\n    i++;  // 종료 조건 갱신"}'::jsonb),
(10066, 'cpp', 'cpp-8', '쉬움', '다음 코드에서 함수 add의 반환값은?', '#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(3, 4);
    return 0;
}', ARRAY['"34"', '"7"', '"12"', '"컴파일 오류"'], 1, 'add(3, 4)는 3 + 4 = 7을 반환합니다. 함수는 return 문으로 값을 돌려줍니다.', '함수의 반환값', '함수는 return 문으로 값을 반환합니다. 반환 타입이 int이면 정수를 반환해야 합니다.', ARRAY['"함수 정의"', '"매개변수"', '"return"'], 'buildRunFlow', NULL),
(10067, 'cpp', 'cpp-8', '보통', '다음 코드에서 빈칸에 들어갈 알맞은 코드는?', '#include <iostream>
using namespace std;

void printDouble(int x) {
    cout << x * 2;
}

int main() {
    _______(5);  // 출력: 10
    return 0;
}', ARRAY['"printDouble"', '"cout"', '"double"', '"print"'], 0, 'printDouble(5)를 호출하면 5 * 2 = 10이 출력됩니다. 함수 이름으로 호출합니다.', '함수 호출', '함수를 호출할 때는 함수이름(인자) 형태를 사용합니다. void 함수는 값을 반환하지 않습니다.', ARRAY['"함수 호출"', '"void"', '"매개변수"'], 'buildRunFlow', NULL),
(10068, 'cpp', 'cpp-8', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void greet(string name = "Guest") {
    cout << "Hello, " << name;
}

int main() {
    greet();
    return 0;
}', ARRAY['"Hello, "', '"Hello, Guest"', '"컴파일 오류"', '"Hello, name"'], 1, '인자를 전달하지 않으면 기본값 "Guest"가 사용됩니다. 따라서 "Hello, Guest"가 출력됩니다.', 'default 매개변수', '함수 매개변수에 기본값을 설정할 수 있습니다. 인자를 생략하면 기본값이 사용됩니다. 기본값은 오른쪽부터 설정해야 합니다.', ARRAY['"기본 매개변수"', '"함수"', '"함수 오버로딩"'], 'buildRunFlow', NULL),
(10069, 'cpp', 'cpp-8', '보통', '다음 코드에서 함수 오버로딩이 올바르게 동작하는 이유는?', '#include <iostream>
using namespace std;

double area(double r) {
    return 3.14 * r * r;
}

double area(double w, double h) {
    return w * h;
}

int main() {
    cout << area(5.0) << " " << area(3.0, 4.0);
    return 0;
}', ARRAY['"반환 타입이 다르기 때문"', '"매개변수의 개수가 다르기 때문"', '"함수 이름이 다르기 때문"', '"같은 이름의 함수는 두 개 이상 정의할 수 없다"'], 1, '함수 오버로딩은 매개변수의 타입이나 개수가 다를 때 같은 이름의 함수를 여러 개 정의할 수 있습니다.', '함수 오버로딩 조건', '오버로딩은 매개변수의 타입, 개수, 순서가 달라야 합니다. 반환 타입만 다른 것은 오버로딩이 아닙니다.', ARRAY['"함수 오버로딩"', '"매개변수"', '"시그니처"'], 'cppFunctionBuilder', NULL),
(10076, 'cpp', 'cpp-8', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int calc(int a, int b = 10, int c = 20) {
    return a + b + c;
}

int main() {
    cout << calc(1) << " " << calc(1, 2) << " " << calc(1, 2, 3);
    return 0;
}', ARRAY['"31 23 6"', '"1 3 6"', '"31 13 6"', '"1 12 123"'], 0, 'calc(1): 1+10+20=31. calc(1,2): 1+2+20=23. calc(1,2,3): 1+2+3=6. 기본값은 뒤에서부터 적용됩니다.', '기본 매개변수', '함수 매개변수에 기본값을 지정하면 호출 시 생략할 수 있습니다. 기본값은 뒤쪽 매개변수부터 지정해야 합니다.', ARRAY['"기본 매개변수"', '"함수 호출"', '"인자 생략"'], NULL, NULL),
(10081, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    cout << arr[2] << endl;
    return 0;
}', ARRAY['"10"', '"20"', '"30"', '"40"'], 2, '배열 인덱스는 0부터 시작합니다. arr[0]=10, arr[1]=20, arr[2]=30', '배열 인덱싱', 'C++ 배열은 0-based indexing을 사용합니다. 첫 번째 요소는 arr[0]입니다.', ARRAY['"배열 선언"', '"범위 초과"', '"vector"'], 'cppArrayBuilder', NULL),
(10082, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    int maxVal = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    cout << maxVal;
    return 0;
}', ARRAY['"3"', '"4"', '"5"', '"1"'], 2, '배열에서 가장 큰 값을 찾는 코드입니다. {3,1,4,1,5} 중 최대값은 5입니다.', '배열에서 최대값 찾기', '첫 번째 요소를 임시 최대값으로 설정하고, 나머지를 순회하며 더 큰 값이 있으면 갱신하는 패턴입니다.', ARRAY['"배열 순회"', '"최대값"', '"최소값"'], 'cppArrayBuilder', NULL),
(10083, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 1};
    v.pop_back();
    cout << v.size() << " " << v.back();
    return 0;
}', ARRAY['"4 1"', '"3 8"', '"3 1"', '"4 8"'], 1, 'pop_back()은 마지막 요소(1)를 제거합니다. 남은 v = {5,3,8}이므로 size()=3, back()=8입니다.', 'vector::pop_back()', 'pop_back()은 벡터의 마지막 요소를 제거합니다. push_back()과 반대 동작입니다.', ARRAY['"vector"', '"push_back"', '"pop_back"'], 'cppArrayBuilder', NULL),
(10084, 'cpp', 'cpp-21', '보통', '다음 코드에서 2차원 배열의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    cout << grid[1][2];
    return 0;
}', ARRAY['"3"', '"5"', '"6"', '"2"'], 2, 'grid[1][2]는 2번째 행(인덱스 1)의 3번째 열(인덱스 2)입니다. 값은 6입니다.', '2차원 배열', '2차원 배열은 grid[행][열]로 접근합니다. 행과 열 모두 0부터 시작합니다.', ARRAY['"다차원 배열"', '"행렬"', '"인덱싱"'], NULL, NULL),
(10085, 'cpp', 'cpp-9', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30};
    cout << arr[3] << " " << arr[4] << endl;
    return 0;
}', ARRAY['"쓰레기 값"', '"0 0"', '"30 30"', '"컴파일 오류"'], 1, '배열을 부분 초기화하면 나머지 요소는 0으로 자동 초기화됩니다. arr[3]=0, arr[4]=0입니다.', '배열 부분 초기화', '배열 선언 시 일부만 초기화하면 나머지는 0으로 채워집니다. int arr[5] = {0}은 전체를 0으로 초기화하는 관용구입니다.', ARRAY['"배열 초기화"', '"0 초기화"', '"배열"'], NULL, NULL),
(10086, 'cpp', 'cpp-21', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4}};
    cout << grid[1][0] << " " << grid[1][1] << " " << grid[1][2];
    return 0;
}', ARRAY['"4 0 0"', '"4 5 6"', '"1 2 3"', '"컴파일 오류"'], 0, '2차원 배열에서 두 번째 행은 {4}만 초기화되었으므로 나머지는 0이 됩니다. grid[1] = {4, 0, 0}', '다차원 배열 부분 초기화', '다차원 배열도 부분 초기화가 가능합니다. 명시하지 않은 요소는 0으로 초기화됩니다.', ARRAY['"2차원 배열"', '"초기화"', '"배열"'], NULL, NULL),
(10087, 'cpp', 'cpp-21', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<vector<int>> grid(3, vector<int>(4, 0));
    grid[1][2] = 5;
    cout << grid.size() << " " << grid[0].size() << " " << grid[1][2];
    return 0;
}', ARRAY['"3 4 5"', '"4 3 5"', '"3 4 0"', '"컴파일 오류"'], 0, '3행 4열의 2D 벡터가 0으로 초기화됩니다. grid.size()=3(행), grid[0].size()=4(열), grid[1][2]=5', '2D vector', 'vector<vector<int>> grid(행수, vector<int>(열수, 초기값))으로 2차원 동적 배열을 만들 수 있습니다.', ARRAY['"2D vector"', '"동적 배열"', '"행렬"'], NULL, NULL),
(10088, 'cpp', 'cpp-21', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[3][3] = {
        {1, 0, 0},
        {0, 1, 0},
        {0, 0, 1}
    };
    int sum = 0;
    for (int i = 0; i < 3; i++)
        sum += arr[i][i];
    cout << sum;
    return 0;
}', ARRAY['"0"', '"1"', '"3"', '"9"'], 2, 'arr[i][i]는 대각선 요소입니다. arr[0][0]+arr[1][1]+arr[2][2] = 1+1+1 = 3. 이것은 단위 행렬의 대각합(trace)입니다.', '2차원 배열 대각선 접근', 'arr[i][i]는 주 대각선, arr[i][n-1-i]는 부 대각선 요소입니다. 행렬 문제에서 자주 사용됩니다.', ARRAY['"2차원 배열"', '"대각선"', '"행렬"'], NULL, NULL),
(10089, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v(5, 3);
    cout << v.size() << " " << v[2];
    return 0;
}', ARRAY['"3 5"', '"5 3"', '"5 0"', '"3 3"'], 1, 'vector<int> v(5, 3)은 크기 5이고 모든 원소가 3인 벡터를 생성합니다. size()=5, v[2]=3.', 'vector 생성자', 'vector<T>(n, val)은 n개의 원소를 val로 초기화합니다. vector<T>(n)은 0으로 초기화합니다.', ARRAY['"vector 초기화"', '"생성자"', '"fill"'], NULL, NULL),
(10090, 'cpp', 'cpp-21', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int matrix[2][3] = {{1,2,3}, {4,5,6}};
    int sum = 0;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            sum += matrix[i][j];
    cout << sum;
    return 0;
}', ARRAY['"15"', '"21"', '"6"', '"12"'], 1, '1+2+3+4+5+6 = 21. 2×3 행렬의 모든 원소의 합입니다.', '2차원 배열 순회', '2차원 배열은 이중 for문으로 순회합니다. matrix[행][열] 순서로 접근합니다.', ARRAY['"2차원 배열"', '"이중 for문"', '"행렬"'], NULL, NULL),
(10092, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    for (int i = 0; i < 5; i++)
        v.push_back(i * i);
    for (int i = v.size() - 1; i >= 0; i--)
        cout << v[i] << " ";
    return 0;
}', ARRAY['"0 1 4 9 16"', '"16 9 4 1 0"', '"0 1 2 3 4"', '"4 3 2 1 0"'], 1, 'v = {0,1,4,9,16}. 역순으로 출력하면 16 9 4 1 0입니다.', '벡터 역순 순회', '인덱스를 size()-1부터 0까지 감소시키면 역순으로 순회할 수 있습니다.', ARRAY['"역순 순회"', '"vector"', '"인덱스"'], NULL, NULL),
(10093, 'cpp', 'cpp-9', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[5] = {};
    for (int i = 0; i < 5; i++)
        cout << arr[i] << " ";
    return 0;
}', ARRAY['"쓰레기 값 5개"', '"0 0 0 0 0"', '"1 1 1 1 1"', '"컴파일 오류"'], 1, 'int arr[5] = {}는 모든 원소를 0으로 초기화합니다. 빈 중괄호는 값 초기화(value initialization)입니다.', '배열 값 초기화', 'int arr[5] = {}는 모든 원소를 0으로 초기화합니다. 초기화 없이 선언하면 쓰레기 값이 들어갑니다.', ARRAY['"배열 초기화"', '"값 초기화"', '"쓰레기 값"'], NULL, '{"wrong":"int arr[5];  // 쓰레기 값!","correct":"int arr[5] = {};  // 모두 0으로 초기화"}'::jsonb),
(10097, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    v.push_back(4);
    cout << v.size() << " " << v.back();
    return 0;
}', ARRAY['"3 3"', '"4 4"', '"4 3"', '"3 4"'], 1, 'push_back(4) 후 v = {1,2,3,4}. size()=4, back()=4 (마지막 요소)', 'vector 기본 연산', 'vector는 동적 배열입니다. push_back()으로 추가, size()로 크기 확인, back()으로 마지막 요소 접근.', ARRAY['"vector"', '"동적 배열"', '"STL 컨테이너"'], NULL, NULL),
(10459, 'cpp', 'cpp-9', '쉬움', '정수 배열 arr[3]에 사용자로부터 값 3개를 입력받으려 한다. 빈칸에 들어갈 올바른 코드는?', 'int arr[3];
for (int i = 0; i < 3; i++) {
    ______________;
}', ARRAY['"cin >> arr[i]"', '"cout << arr[i]"', '"arr[i] = input()"', '"scanf(arr[i])"'], 0, 'cin >> arr[i]로 배열의 각 칸에 차례로 값을 입력받아요. cout은 출력, cin은 입력!', '배열에 cin 입력', 'for 루프 + cin >> arr[i] 패턴으로 배열을 채울 수 있습니다. 배열 크기만큼 반복합니다.', ARRAY['"cin"', '"배열"', '"for 루프"'], NULL, NULL),
(10460, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    v.push_back(40);
    cout << v.front() << " " << v.back();
    return 0;
}', ARRAY['"10 30"', '"10 40"', '"20 40"', '"에러"'], 1, 'push_back(40) 후 v = {10,20,30,40}. front()=10(첫 번째), back()=40(마지막)!', 'vector front() / back()', 'front()는 첫 번째 원소, back()은 마지막 원소를 반환합니다. 파이썬의 v[0] / v[-1]에 해당해요.', ARRAY['"front"', '"back"', '"vector"'], NULL, NULL),
(10461, 'cpp', 'cpp-9', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    v.clear();
    cout << v.empty();
    return 0;
}', ARRAY['"1"', '"0"', '"에러"', '"3"'], 0, 'clear()로 모든 원소를 삭제하면 vector가 비어요. empty()는 비어있으면 1(true), 아니면 0(false).', 'vector empty() / clear()', 'clear()는 모든 원소 삭제, empty()는 비어있는지 확인. 파이썬의 v.clear() / not v에 대응.', ARRAY['"empty"', '"clear"', '"vector"'], NULL, NULL),
(10462, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 10, 15, 20};
    int sum = 0;
    for (int i = 0; i < v.size(); i++) {
        sum += v[i];
    }
    cout << sum;
    return 0;
}', ARRAY['"15"', '"40"', '"50"', '"에러"'], 2, 'v.size()=4이므로 i는 0~3. 5+10+15+20 = 50!', 'vector for 루프 순회', 'for (int i = 0; i < v.size(); i++) 패턴으로 vector를 순회합니다. 배열 순회와 동일하고, v.size()가 크기 역할을 합니다.', ARRAY['"for 루프"', '"vector"', '"순회"'], NULL, NULL),
(10463, 'cpp', 'cpp-9', '보통', 'v[i]와 v.at(i)의 차이점으로 올바른 것은?', 'vector<int> v = {1, 2, 3};

v[10];      // ← A
v.at(10);   // ← B', ARRAY['"A와 B 모두 에러를 발생시킨다"', '"A는 쓰레기값, B는 범위 초과 에러"', '"A는 에러, B는 쓰레기값"', '"A와 B 모두 쓰레기값"'], 1, 'v[i]는 범위를 벗어나도 에러 없이 쓰레기값! v.at(i)는 범위를 벗어나면 out_of_range 에러를 발생시켜요.', 'v[i] vs v.at(i)', 'v[i]는 빠르지만 범위 체크 없음. v.at(i)는 느리지만 범위를 벗어나면 예외를 던집니다. 파이썬의 IndexError처럼요.', ARRAY['"at"', '"범위 체크"', '"안전한 접근"'], NULL, '{"wrong":"v[100];  // ❌ 에러 없이 쓰레기값","correct":"v.at(100);  // ✅ out_of_range 에러 발생"}'::jsonb),
(10099, 'cpp', 'cpp-10', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40};
    int sum = 0;
    for (int x : v) {
        sum += x;
    }
    cout << sum;
    return 0;
}', ARRAY['"10"', '"40"', '"100"', '"컴파일 오류"'], 2, 'range-based for문은 컨테이너의 모든 요소를 순회합니다. 10 + 20 + 30 + 40 = 100', 'range-based for (범위 기반 반복문)', 'for (타입 변수 : 컨테이너)는 컨테이너의 모든 요소를 순서대로 순회합니다. 인덱스가 불필요할 때 간결합니다.', ARRAY['"range-based for"', '"for문"', '"auto"'], NULL, '{"wrong":"for (int i = 0; i < v.size(); i++)\n    sum += v[i];  // 인덱스 기반 (길다)","correct":"for (int x : v)\n    sum += x;  // 범위 기반 (간결)"}'::jsonb),
(10100, 'cpp', 'cpp-10', '보통', '다음 코드 실행 후 v[0]의 값은?', 'vector<int> v = {10, 20, 30};
for (int x : v) x = x * 2;
cout << v[0];', ARRAY['"10"', '"20"', '"30"', '"에러"'], 0, 'for (int x : v)에서 x는 복사본입니다. x = x * 2로 복사본을 바꿔도 원본 v[0]은 그대로 10입니다.', 'range-for 복사본', 'for (int x : v)는 각 원소의 복사본을 x에 담습니다. x를 아무리 수정해도 원본 벡터는 변경되지 않습니다.', ARRAY['"range-for"', '"auto"', '"복사본"'], NULL, NULL),
(10101, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    cout << s.length() << endl;
    return 0;
}', ARRAY['"4"', '"5"', '"6"', '"컴파일 오류"'], 1, '"Hello"는 5글자이므로 s.length()는 5를 반환합니다.', 'string::length()', 'C++의 string 클래스는 length() 또는 size() 메서드로 문자열 길이를 반환합니다.', ARRAY['"string 메서드"', '"substr()"', '"find()"'], NULL, NULL),
(10102, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdef";
    cout << s.substr(2, 3);
    return 0;
}', ARRAY['"abc"', '"bcd"', '"cde"', '"cd"'], 2, 'substr(2, 3)은 인덱스 2부터 3글자를 추출합니다. s[2]=''c'', s[3]=''d'', s[4]=''e''이므로 ''cde''가 출력됩니다.', 'string::substr()', 'substr(시작위치, 길이)로 부분 문자열을 추출합니다. 시작위치는 0부터 시작합니다.', ARRAY['"string"', '"substr"', '"인덱싱"'], NULL, NULL),
(10103, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    int pos = s.find("World");
    cout << pos;
    return 0;
}', ARRAY['"5"', '"6"', '"1"', '"-1"'], 1, '''World''는 인덱스 6에서 시작합니다. (H=0, e=1, l=2, l=3, o=4, 공백=5, W=6)', 'string::find()', 'find()는 부분 문자열의 시작 위치를 반환합니다. 찾지 못하면 string::npos를 반환합니다.', ARRAY['"string 검색"', '"npos"', '"find"'], NULL, NULL),
(10104, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    s += " World";
    cout << s.at(5);
    return 0;
}', ARRAY['"W"', '" "', '"o"', '"컴파일 오류"'], 1, 's = "Hello World"에서 s.at(5)는 인덱스 5의 문자, 즉 공백('' '')을 반환합니다.', 'string::at()과 문자열 결합', 'at(i)는 i번째 문자를 반환하며 범위 체크를 합니다. += 로 문자열을 이어붙일 수 있습니다.', ARRAY['"at()"', '"[]"', '"문자열 연결"'], NULL, '{"wrong":"s[100]  // 범위 초과해도 에러 안 남 (위험!)","correct":"s.at(100)  // 범위 초과 시 예외 발생 (안전)"}'::jsonb),
(10105, 'cpp', 'cpp-11', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    char c = ''a'';
    c = c - 32;
    cout << c << endl;
    return 0;
}', ARRAY['"a"', '"A"', '"33"', '"컴파일 오류"'], 1, '소문자 ''a''(97)에서 32를 빼면 65가 되어 대문자 ''A''가 됩니다. 소문자와 대문자의 ASCII 차이는 항상 32입니다.', 'ASCII 연산으로 대소문자 변환', '대문자 = 소문자 - 32, 소문자 = 대문자 + 32. 또는 toupper(), tolower() 함수를 사용할 수 있습니다.', ARRAY['"ASCII"', '"toupper"', '"tolower"'], NULL, '{"wrong":"char c = ''a'';\nc = c + 32;  // 소문자에 32를 더하면 엉뚱한 문자","correct":"char c = ''a'';\nc = c - 32;  // ''A'' (대문자 변환)"}'::jsonb),
(10106, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    cout << s.substr(6, 5);
    return 0;
}', ARRAY['"Hello"', '"World"', '"Hello World"', '" World"'], 1, 'substr(6, 5)은 인덱스 6부터 5글자를 반환합니다. ''W''(6), ''o''(7), ''r''(8), ''l''(9), ''d''(10) → "World"', 'substr(pos, len)', 'substr(pos, len)은 pos 위치부터 len글자를 잘라서 반환합니다. 파이썬의 s[pos:pos+len]과 같아요.', ARRAY['"string"', '"substr"', '"문자열"'], NULL, NULL),
(10109, 'cpp', 'cpp-4', '보통', '입력이 "Hello World"일 때, cin >> s와 getline(cin, s)의 차이로 올바른 설명은?', '', ARRAY['"cin >>는 공백에서 멈춰 \"Hello\"만 읽고, getline은 줄 전체 \"Hello World\"를 읽는다"', '"cin >>는 \"Hello World\" 전체를, getline은 \"Hello\"만 읽는다"', '"둘 다 \"Hello World\" 전체를 읽는다"', '"둘 다 \"Hello\"만 읽는다"'], 0, 'cin >>는 공백(스페이스, 탭, 엔터)을 만나면 멈춰요. ''Hello World'' 입력 시 ''Hello''만 읽어요. getline은 엔터 전까지 한 줄 전체를 읽으므로 ''Hello World'' 전체를 읽어요.', 'getline vs cin >>', 'cin >>는 공백/탭/줄바꿈에서 멈추고, getline(cin, s)은 줄 전체를 읽습니다. 공백 포함 입력이 필요하면 getline을 사용하세요.', ARRAY['"getline"', '"cin"', '"문자열 입력"'], NULL, '{"wrong":"cin >> s;  // \"Hello World\" 입력 시 \"Hello\"만 읽음","correct":"getline(cin, s);  // \"Hello World\" 전체를 읽음"}'::jsonb),
(10114, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    string s;
    cout << "빈 문자열 크기: " << s.size() << " ";
    cout << "비었나: " << s.empty();
    return 0;
}', ARRAY['"빈 문자열 크기: 0 비었나: 1"', '"빈 문자열 크기: 0 비었나: 0"', '"빈 문자열 크기: 1 비었나: 1"', '"컴파일 오류"'], 0, '기본 생성된 string은 빈 문자열입니다. size()=0, empty()=true(1)입니다.', '빈 문자열 확인', 'string의 empty()는 문자열이 비어있으면 true를 반환합니다. size() == 0과 동일합니다.', ARRAY['"empty()"', '"size()"', '"기본 생성자"'], NULL, NULL),
(10115, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";
    int pos = s.find("World");
    cout << pos;
    return 0;
}', ARRAY['"5"', '"6"', '"7"', '"-1"'], 2, '"World"는 인덱스 7에서 시작합니다. H(0)e(1)l(2)l(3)o(4),(5) (6)W(7).', 'string::find', 'find()는 부분 문자열의 시작 위치를 반환합니다. 찾지 못하면 string::npos를 반환합니다.', ARRAY['"find"', '"npos"', '"문자열 검색"'], NULL, NULL),
(10117, 'cpp', 'cpp-11', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    string s = "Hello";
    for (int i = 0; i < s.length(); i++)
        cout << s[i];
    return 0;
}', ARRAY['"Hello"', '"H"', '"o"', '"컴파일 오류"'], 0, 'string의 각 문자를 인덱스로 접근하여 하나씩 출력합니다. H, e, l, l, o → Hello.', 'string 인덱싱', 'string은 배열처럼 s[i]로 각 문자에 접근할 수 있습니다. 인덱스는 0부터 시작합니다.', ARRAY['"string"', '"인덱싱"', '"반복문"'], NULL, NULL),
(10118, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    string t = s;
    t[0] = ''J'';
    cout << s << " " << t;
    return 0;
}', ARRAY['"Jello Jello"', '"Hello Jello"', '"Hello Hello"', '"Jello Hello"'], 1, 'string은 깊은 복사가 됩니다. t = s는 독립적인 복사본을 만듭니다. t를 변경해도 s는 그대로입니다.', 'string의 깊은 복사', 'C++의 string은 대입 시 깊은 복사가 이루어집니다. 원본과 복사본은 독립적입니다.', ARRAY['"깊은 복사"', '"string"', '"값 의미론"'], NULL, NULL),
(10120, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";
    int count = 0;
    for (char c : s) {
        if (c >= ''a'' && c <= ''z'') count++;
    }
    cout << count;
    return 0;
}', ARRAY['"10"', '"8"', '"11"', '"9"'], 1, '소문자만 셉니다. ''H''와 ''W''는 대문자, 공백은 문자가 아니므로 제외. ello + orld = 8개입니다.', '문자 분류와 범위 for', 'c >= ''a'' && c <= ''z''로 소문자를 판별합니다. 범위 기반 for (for(char c : s))는 각 문자를 순회합니다.', ARRAY['"범위 for"', '"문자 분류"', '"islower"'], NULL, NULL),
(10121, 'cpp', 'cpp-12', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    for (char& c : s) {
        c = toupper(c);
    }
    cout << s;
    return 0;
}', ARRAY['"Hello"', '"HELLO"', '"hello"', '"컴파일 오류"'], 1, 'range-based for에서 char&로 참조를 받아 각 문자를 toupper()로 대문자로 변환합니다. 원본 문자열이 수정됩니다.', 'range-based for에서 참조 사용', 'for (char& c : s)에서 &를 사용하면 원본을 직접 수정할 수 있습니다. &가 없으면 복사본이 수정되어 원본에 반영되지 않습니다.', ARRAY['"range-based for"', '"참조"', '"toupper"'], NULL, '{"wrong":"for (char c : s) c = toupper(c);\n// 복사본만 변경, 원본 s는 그대로!","correct":"for (char& c : s) c = toupper(c);\n// 참조로 원본 s가 직접 수정됨!"}'::jsonb),
(10122, 'cpp', 'cpp-12', '보통', '다음 코드에서 범위 기반 for문의 &는 무엇을 의미하는가?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};
    for (int& x : v) x *= 2;
    for (int x : v) cout << x << " ";
    return 0;
}', ARRAY['"2 4 6"', '"1 2 3"', '"1 4 9"', '"컴파일 오류"'], 0, 'int&로 참조를 사용하면 원본 벡터의 값이 변경됩니다. 각 원소가 2배가 되어 2 4 6이 출력됩니다.', '범위 for에서 참조', 'for(auto& x : v)는 원본을 수정할 수 있습니다. &가 없으면 복사본이라 원본이 변하지 않습니다.', ARRAY['"범위 for"', '"참조"', '"vector 수정"'], NULL, '{"wrong":"for (int x : v) x *= 2;  // 복사본 수정, 원본 불변","correct":"for (int& x : v) x *= 2;  // 원본 수정"}'::jsonb),
(10123, 'cpp', 'cpp-12', '보통', '다음 코드에서 swap 함수 호출 후 a와 b의 값은?', '#include <iostream>
using namespace std;

void swap(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 5, b = 10;
    swap(a, b);
    cout << a << " " << b;
}', ARRAY['"5 10"', '"10 5"', '"10 10"', '"5 5"'], 1, '매개변수에 &(참조)를 사용하면 원본 변수가 직접 변경됩니다. swap 후 a=10, b=5', '참조에 의한 전달 (Pass by Reference)', '& 기호를 사용하면 함수가 원본 변수를 직접 수정할 수 있습니다. & 없이는 복사본만 변경됩니다.', ARRAY['"값에 의한 전달"', '"포인터"', '"함수 매개변수"'], NULL, '{"wrong":"void swap(int x, int y)  // 값에 의한 전달\n// 원본 변경 안 됨!","correct":"void swap(int &x, int &y)  // 참조에 의한 전달\n// 원본 변경됨!"}'::jsonb),
(10131, 'cpp', 'cpp-12', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 42;
    int& ref = a;
    ref = 100;
    cout << a;
    return 0;
}', ARRAY['"42"', '"100"', '"0"', '"컴파일 오류"'], 1, 'ref는 a의 참조(별명)입니다. ref를 변경하면 a도 변경됩니다. 따라서 a = 100이 됩니다.', '참조 변수', 'int& ref = a는 a의 별명을 만듭니다. ref와 a는 같은 메모리를 공유합니다.', ARRAY['"참조"', '"별명"', '"포인터와의 차이"'], NULL, NULL),
(10156, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;
    Student(string n, int a) : name(n), age(a) {}
};

int main() {
    Student s("Kim", 15);
    cout << s.name << " " << s.age;
    return 0;
}', ARRAY['"Kim 15"', '"Kim15"', '"컴파일 오류"', '"0 0"'], 0, '생성자로 name과 age를 초기화합니다. s.name은 "Kim", s.age는 15이므로 "Kim 15"가 출력됩니다.', '클래스와 생성자', 'class로 관련 데이터를 하나의 타입으로 묶고, 생성자로 초기값을 설정합니다. public 멤버는 .으로 접근합니다.', ARRAY['"class"', '"생성자"', '"멤버 접근"'], NULL, NULL),
(10157, 'cpp', 'cpp-8', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

int main() {
    cout << add(1, 2) << " " << add(1, 2, 3);
    return 0;
}', ARRAY['"3 6"', '"컴파일 오류: 같은 이름의 함수"', '"3 3"', '"6 6"'], 0, '함수 오버로딩으로 매개변수 개수가 다른 같은 이름의 함수를 정의할 수 있습니다. add(1,2)=3, add(1,2,3)=6입니다.', '함수 오버로딩 (Function Overloading)', 'C++에서는 매개변수의 타입이나 개수가 다르면 같은 이름의 함수를 여러 개 정의할 수 있습니다.', ARRAY['"함수 오버로딩"', '"매개변수"', '"다형성"'], NULL, NULL),
(10158, 'cpp', 'cpp-11', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello";
    s += " World";
    cout << s;
    return 0;
}', ARRAY['"Hello"', '"World"', '"Hello World"', '"컴파일 오류"'], 2, 'string의 += 연산자는 문자열을 뒤에 이어붙입니다. "Hello" + " World" = "Hello World"', 'string 연결', '+= 또는 + 연산자로 string을 이어붙일 수 있습니다. append() 메서드도 사용 가능합니다.', ARRAY['"string 연결"', '"append"', '"연산자 오버로딩"'], NULL, NULL),
(10160, 'cpp', 'cpp-22', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Dog {
public:
    string name;
    Dog(string n) : name(n) {}
    void bark() { cout << name << ": 멍멍!"; }
};

int main() {
    Dog d("바둑이");
    d.bark();
    return 0;
}', ARRAY['"멍멍!"', '"바둑이"', '"바둑이: 멍멍!"', '"컴파일 오류"'], 2, 'Dog 객체 d의 name이 "바둑이"이므로 bark()에서 "바둑이: 멍멍!"이 출력됩니다.', '클래스와 객체', '클래스는 데이터(멤버 변수)와 동작(메서드)을 하나로 묶는 설계도입니다. 객체는 클래스의 인스턴스입니다.', ARRAY['"클래스"', '"객체"', '"생성자"'], 'cppClassBuilder', NULL),
(10161, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Counter {
    int count;
public:
    Counter() : count(0) {}
    void increment() { count++; }
    int getCount() { return count; }
};

int main() {
    Counter c;
    c.increment();
    c.increment();
    c.increment();
    cout << c.getCount();
    return 0;
}', ARRAY['"0"', '"1"', '"3"', '"컴파일 오류"'], 2, 'Counter의 count는 0으로 초기화됩니다. increment()를 3번 호출하면 count=3이 됩니다.', '캡슐화', 'count는 private이므로 외부에서 직접 접근할 수 없습니다. public 메서드를 통해서만 접근합니다.', ARRAY['"캡슐화"', '"private"', '"getter"'], 'cppClassBuilder', NULL),
(10163, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Rectangle {
    int w, h;
public:
    Rectangle(int w, int h) : w(w), h(h) {}
    int area() { return w * h; }
    bool operator==(const Rectangle& r) {
        return w == r.w && h == r.h;
    }
};

int main() {
    Rectangle a(3, 4), b(3, 4), c(4, 3);
    cout << (a == b) << " " << (a == c);
    return 0;
}', ARRAY['"1 1"', '"0 0"', '"1 0"', '"0 1"'], 2, 'a와 b는 w=3, h=4로 같아서 true(1). a와 c는 w와 h가 다르므로 false(0)입니다.', '연산자 오버로딩', 'operator==를 정의하면 객체를 == 연산자로 비교할 수 있습니다. 직접 비교 로직을 구현합니다.', ARRAY['"연산자 오버로딩"', '"=="', '"비교 연산"'], NULL, NULL),
(10164, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    Point operator+(const Point& p) const {
        return Point(x + p.x, y + p.y);
    }
};

int main() {
    Point a(1, 2), b(3, 4);
    Point c = a + b;
    cout << c.x << " " << c.y;
    return 0;
}', ARRAY['"1 2"', '"3 4"', '"4 6"', '"13 24"'], 2, 'operator+가 x끼리, y끼리 더합니다. (1+3, 2+4) = (4, 6).', '산술 연산자 오버로딩', 'operator+를 정의하면 사용자 정의 타입도 + 연산자를 사용할 수 있습니다.', ARRAY['"연산자 오버로딩"', '"Point 클래스"', '"벡터 연산"'], NULL, NULL),
(10166, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    string getName() { return name; }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() { cout << name << " says 멍멍"; }
};

int main() {
    Dog d("바둑이");
    d.speak();
    return 0;
}', ARRAY['"바둑이"', '"바둑이 says 멍멍"', '"멍멍"', '"컴파일 오류"'], 1, 'Dog은 Animal을 상속받아 protected 멤버 name에 접근 가능합니다. speak()에서 name을 사용합니다.', '상속과 protected', 'protected 멤버는 해당 클래스와 자식 클래스에서 접근 가능합니다. 외부에서는 접근 불가.', ARRAY['"상속"', '"protected"', '"접근 제어"'], NULL, NULL),
(10167, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Vector2D {
public:
    double x, y;
    Vector2D(double x, double y) : x(x), y(y) {}
    
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2D v(3.0, 4.0);
    cout << v;
    return 0;
}', ARRAY['"3.0 4.0"', '"(3, 4)"', '"Vector2D"', '"컴파일 오류"'], 1, 'friend operator<<를 정의하면 cout << 객체 형태로 사용자 정의 출력이 가능합니다.', '출력 연산자 오버로딩', 'friend ostream& operator<<를 정의하면 cout으로 사용자 정의 클래스를 출력할 수 있습니다.', ARRAY['"operator<<"', '"friend"', '"출력 오버로딩"'], NULL, NULL),
(10168, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Box {
    static int count;
public:
    Box() { count++; }
    ~Box() { count--; }
    static int getCount() { return count; }
};
int Box::count = 0;

int main() {
    Box a, b, c;
    cout << Box::getCount() << " ";
    {
        Box d, e;
        cout << Box::getCount() << " ";
    }
    cout << Box::getCount();
    return 0;
}', ARRAY['"3 5 3"', '"3 5 5"', '"3 2 0"', '"1 2 3"'], 0, 'a,b,c 생성 후 count=3. 블록 내 d,e 생성 후 count=5. 블록 종료 시 d,e 소멸되어 count=3.', 'static 멤버 변수', 'static 멤버는 클래스의 모든 객체가 공유합니다. 객체 수를 추적하는 데 자주 사용됩니다.', ARRAY['"static 멤버"', '"객체 카운팅"', '"소멸자"'], NULL, NULL),
(10170, 'cpp', 'cpp-22', '보통', '다음 코드에서 const 메서드의 의미는?', '#include <iostream>
using namespace std;

class Circle {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const {
        // r = 10;  // 오류!
        return 3.14 * r * r;
    }
};

int main() {
    const Circle c(5);
    cout << c.area();
    return 0;
}', ARRAY['"함수가 반환값을 변경할 수 없다"', '"함수 내에서 멤버 변수를 변경할 수 없다"', '"함수를 한 번만 호출할 수 있다"', '"함수가 예외를 던지지 않는다"'], 1, 'const 메서드는 멤버 변수를 변경할 수 없습니다. const 객체에서 호출 가능합니다.', 'const 멤버 함수', '함수 뒤에 const를 붙이면 그 함수 내에서 멤버 변수를 수정할 수 없습니다. const 객체에서 호출 가능합니다.', ARRAY['"const 메서드"', '"불변성"', '"const 객체"'], NULL, NULL),
(10171, 'cpp', 'cpp-6', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int grade = 2;
    switch (grade) {
        case 1: cout << "A"; break;
        case 2: cout << "B"; break;
        case 3: cout << "C"; break;
        default: cout << "F";
    }
    return 0;
}', ARRAY['"A"', '"B"', '"C"', '"F"'], 1, 'grade = 2이므로 case 2:에 해당하는 ''B''가 출력됩니다. break가 있으므로 다음 case로 넘어가지 않습니다.', 'switch/case — 정수 분기', 'switch문은 정수 값에 따라 다른 case를 실행합니다. break가 없으면 다음 case로 흘러내립니다(fall-through).', ARRAY['"switch"', '"case"', '"break"', '"default"'], NULL, NULL),
(10172, 'cpp', 'cpp-14', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

struct Point {
    int x, y;
};

int main() {
    Point p = {3, 4};
    Point* ptr = &p;
    cout << ptr->x << " " << ptr->y;
    return 0;
}', ARRAY['"3 4"', '"4 3"', '"주소값"', '"컴파일 오류"'], 0, 'ptr->x는 (*ptr).x와 같습니다. 포인터를 통해 구조체 멤버에 접근할 때 -> 연산자를 사용합니다.', '-> 화살표 연산자', 'ptr->member는 (*ptr).member의 축약입니다. 포인터를 통해 구조체/클래스 멤버에 접근합니다.', ARRAY['"->"', '"구조체 포인터"', '"멤버 접근"'], NULL, NULL),
(10173, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

class Person {
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    Person(string n) : Person(n, 0) {}  // 위임 생성자
    void info() { cout << name << "(" << age << ")"; }
};

int main() {
    Person p("아기");
    p.info();
    return 0;
}', ARRAY['"아기(0)"', '"아기()"', '"아기"', '"컴파일 오류"'], 0, '위임 생성자 Person(string n)은 Person(n, 0)을 호출합니다. age의 기본값은 0입니다.', '위임 생성자', 'C++11부터 한 생성자가 같은 클래스의 다른 생성자를 호출할 수 있습니다. 코드 중복을 줄여줍니다.', ARRAY['"위임 생성자"', '"C++11"', '"생성자 체이닝"'], NULL, NULL),
(10177, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    Point(const Point& other) {
        x = other.x + 1;
        y = other.y + 1;
    }
};

int main() {
    Point p1(3, 5);
    Point p2 = p1;
    cout << p2.x << " " << p2.y;
    return 0;
}', ARRAY['"3 5"', '"4 6"', '"0 0"', '"컴파일 오류"'], 1, 'Point p2 = p1은 복사 생성자를 호출합니다. 복사 생성자에서 x+1, y+1 하므로 p2는 (4, 6)이 됩니다.', '복사 생성자 (Copy Constructor)', '복사 생성자는 같은 타입의 객체로 새 객체를 초기화할 때 호출됩니다. 기본 복사 생성자는 얕은 복사를 수행합니다.', ARRAY['"복사 생성자"', '"얕은 복사"', '"깊은 복사"'], NULL, NULL),
(10182, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class MyClass {
    int value;
public:
    MyClass(int v) : value(v) {}
    MyClass& setValue(int v) {
        this->value = v;
        return *this;
    }
    void print() { cout << value; }
};

int main() {
    MyClass obj(10);
    obj.setValue(20).print();
    return 0;
}', ARRAY['"10"', '"20"', '"컴파일 오류"', '"0"'], 1, 'this->value = 20으로 값을 설정하고, return *this로 자기 자신을 반환하여 체이닝이 가능합니다. print()는 20을 출력합니다.', 'this 포인터', 'this는 현재 객체를 가리키는 포인터입니다. 멤버 변수와 매개변수 이름이 같을 때 구분하거나, 메서드 체이닝에 사용됩니다.', ARRAY['"this"', '"메서드 체이닝"', '"포인터"'], NULL, NULL),
(10183, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Secret {
    int code;
public:
    Secret(int c) : code(c) {}
    friend void reveal(const Secret& s);
};

void reveal(const Secret& s) {
    cout << s.code;
}

int main() {
    Secret s(42);
    reveal(s);
    return 0;
}', ARRAY['"42"', '"0"', '"컴파일 오류: code는 private"', '"컴파일 오류: friend 문법 오류"'], 0, 'friend 함수는 클래스의 private 멤버에 접근할 수 있습니다. reveal()이 friend로 선언되어 s.code(42)에 접근 가능합니다.', 'friend 함수', 'friend로 선언된 함수는 클래스의 private/protected 멤버에 접근할 수 있습니다. 캡슐화를 깨므로 신중하게 사용해야 합니다.', ARRAY['"friend"', '"캡슐화"', '"접근 제어"'], NULL, NULL),
(10189, 'cpp', 'cpp-22', '어려움', '다음 코드에서 상속의 접근 지정자에 따른 차이는?', 'class Base {
public:
    int a;
protected:
    int b;
private:
    int c;
};

class Derived : public Base {
    void test() {
        a = 1;  // 1번
        b = 2;  // 2번
        c = 3;  // 3번
    }
};', ARRAY['"1, 2, 3번 모두 접근 가능"', '"1, 2번만 접근 가능, 3번 오류"', '"1번만 접근 가능"', '"모두 접근 불가"'], 1, 'public 상속 시 public과 protected 멤버는 자식에서 접근 가능합니다. private 멤버(c)는 기본 클래스 내부에서만 접근 가능합니다.', '상속에서의 접근 제어', 'public 상속: public→public, protected→protected. private 멤버는 어떤 상속에서도 자식이 직접 접근할 수 없습니다.', ARRAY['"상속"', '"접근 제어"', '"public/protected/private"'], NULL, NULL),
(10192, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B"; }
    ~Base() { cout << "~B"; }
};

class Derived : public Base {
public:
    Derived() { cout << "D"; }
    ~Derived() { cout << "~D"; }
};

int main() {
    Derived d;
    return 0;
}', ARRAY['"BD~D~B"', '"DB~B~D"', '"BD~B~D"', '"DB~D~B"'], 0, '생성 순서: 부모(B)→자식(D). 소멸 순서: 자식(~D)→부모(~B). 생성과 소멸은 반대 순서입니다.', '생성자/소멸자 호출 순서', '상속에서 생성자는 부모→자식 순서, 소멸자는 자식→부모 순서로 호출됩니다.', ARRAY['"생성자"', '"소멸자"', '"상속 순서"'], NULL, NULL),
(10193, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14 * r * r; }
};

int main() {
    // Shape s;  // 가능할까?
    Circle c(5);
    Shape* p = &c;
    cout << p->area();
    return 0;
}', ARRAY['"78.5"', '"25"', '"0"', '"컴파일 오류 (Shape 인스턴스 불가)"'], 0, 'Shape는 순수 가상 함수(= 0)가 있어 추상 클래스이지만, Circle은 area()를 구현했으므로 인스턴스 생성 가능. 3.14*25=78.5.', '순수 가상 함수와 추상 클래스', '= 0인 가상 함수를 가진 클래스는 추상 클래스로 직접 인스턴스화할 수 없습니다. 파생 클래스에서 반드시 구현해야 합니다.', ARRAY['"추상 클래스"', '"순수 가상 함수"', '"인터페이스"'], NULL, NULL),
(10196, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    void show() { cout << "Base "; }
    virtual void display() { cout << "Base-V "; }
};

class Derived : public Base {
public:
    void show() { cout << "Derived "; }
    void display() override { cout << "Derived-V "; }
};

int main() {
    Base* p = new Derived();
    p->show();
    p->display();
    delete p;
    return 0;
}', ARRAY['"Derived Derived-V"', '"Base Derived-V"', '"Base Base-V"', '"Derived Base-V"'], 1, 'show()는 non-virtual이므로 포인터 타입(Base)의 것이 호출됩니다. display()는 virtual이므로 실제 타입(Derived)의 것이 호출됩니다.', 'virtual vs non-virtual', 'virtual 함수만 다형성(런타임 바인딩)이 적용됩니다. non-virtual은 포인터/참조 타입에 따라 결정됩니다.', ARRAY['"virtual"', '"정적 바인딩"', '"동적 바인딩"'], NULL, NULL),
(10199, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    virtual void greet() { cout << "안녕 "; }
};

class A : public Base {
public:
    void greet() override { cout << "A "; }
};

class B : public Base {
public:
    void greet() override { cout << "B "; }
};

void callGreet(Base& b) {
    b.greet();
}

int main() {
    A a; B b; Base base;
    callGreet(a);
    callGreet(b);
    callGreet(base);
    return 0;
}', ARRAY['"안녕 안녕 안녕"', '"A B 안녕"', '"A B Base"', '"안녕 A B"'], 1, 'virtual 함수이므로 참조를 통해서도 실제 타입의 greet()가 호출됩니다. A, B, Base 순서.', '참조를 통한 다형성', '포인터뿐 아니라 참조(Base&)를 통해서도 virtual 함수의 다형성이 적용됩니다.', ARRAY['"참조 다형성"', '"virtual"', '"동적 바인딩"'], NULL, NULL),
(10202, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    void foo() { cout << "Base::foo "; bar(); }
    virtual void bar() { cout << "Base::bar "; }
};

class Derived : public Base {
public:
    void bar() override { cout << "Derived::bar "; }
};

int main() {
    Derived d;
    d.foo();
    return 0;
}', ARRAY['"Base::foo Base::bar"', '"Base::foo Derived::bar"', '"Derived::bar Base::foo"', '"컴파일 오류"'], 1, 'foo()는 Base에서 정의되지만, 내부에서 호출하는 bar()는 virtual이므로 Derived::bar()가 호출됩니다.', 'virtual 함수의 내부 호출', 'non-virtual 함수 내에서 virtual 함수를 호출하면, 실제 객체 타입의 virtual 함수가 호출됩니다.', ARRAY['"virtual"', '"동적 바인딩"', '"상속"'], NULL, NULL),
(10204, 'cpp', 'cpp-15', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<string, int> p = {"apple", 3};
    cout << p.first << " " << p.second;
    return 0;
}', ARRAY['"apple 3"', '"3 apple"', '"apple apple"', '"컴파일 오류"'], 0, 'pair는 두 값을 묶어 저장합니다. first는 첫 번째 값("apple"), second는 두 번째 값(3)을 접근합니다.', 'pair', 'pair<타입1, 타입2>는 두 개의 값을 하나로 묶습니다. first와 second로 각 값에 접근합니다. make_pair()로도 생성 가능합니다.', ARRAY['"pair"', '"tuple"', '"STL"'], NULL, NULL),
(10205, 'cpp', 'cpp-15', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {1, "hello", 3.14};
    cout << get<1>(t) << " " << get<2>(t);
    return 0;
}', ARRAY['"1 hello"', '"hello 3.14"', '"1 3.14"', '"컴파일 오류"'], 1, 'get<1>(t)는 두 번째 요소 "hello", get<2>(t)는 세 번째 요소 3.14를 반환합니다. 인덱스는 0부터 시작합니다.', 'tuple', 'tuple은 서로 다른 타입의 여러 값을 묶을 수 있습니다. get<인덱스>(tuple)로 각 요소에 접근합니다.', ARRAY['"tuple"', '"pair"', '"get"', '"structured binding"'], NULL, NULL),
(10206, 'cpp', 'cpp-16', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 5;
    m["apple"] = 7;
    cout << m["apple"] << " " << m.size();
    return 0;
}', ARRAY['"3 3"', '"7 2"', '"3 2"', '"7 3"'], 1, 'map에서 같은 키("apple")에 다시 값을 넣으면 덮어씁니다. apple=7, banana=5로 size는 2입니다.', 'STL map', 'map은 키-값 쌍을 저장하는 컨테이너입니다. 키는 중복 불가이며, 같은 키에 대입하면 값이 갱신됩니다.', ARRAY['"map"', '"unordered_map"', '"STL 컨테이너"'], NULL, NULL),
(10207, 'cpp', 'cpp-16', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> um;
    um["cat"] = 1;
    um["dog"] = 2;
    um["cat"] = 3;
    cout << um["cat"] << " " << um.count("bird");
    return 0;
}', ARRAY['"1 0"', '"3 0"', '"3 1"', '"1 1"'], 1, '같은 키 "cat"에 다시 대입하면 값이 덮어씌워져 3이 됩니다. count("bird")는 해당 키가 없으므로 0입니다.', 'unordered_map', 'unordered_map은 해시 테이블 기반으로 평균 O(1)에 삽입/검색합니다. map과 달리 키가 정렬되지 않습니다.', ARRAY['"unordered_map"', '"해시맵"', '"map과 차이"'], NULL, '{"wrong":"map<string, int> m;     // 정렬됨, O(log N)","correct":"unordered_map<string, int> um;  // 비정렬, O(1) 평균"}'::jsonb),
(10208, 'cpp', 'cpp-16', '보통', '다음 코드에서 auto&를 사용한 map 순회의 출력 결과는?', '#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m = {{"a", 1}, {"b", 2}, {"c", 3}};
    for (auto& p : m) {
        p.second *= 10;
    }
    cout << m["b"];
    return 0;
}', ARRAY['"2"', '"20"', '"10"', '"컴파일 오류"'], 1, 'auto& p로 map의 각 pair를 참조로 받으면 p.second를 수정할 때 원본 map이 변경됩니다. m["b"]의 원래 값 2가 10배인 20이 됩니다.', 'auto&로 map 값 수정', 'map을 range-for로 순회할 때 auto& p를 쓰면 p.first(키), p.second(값)에 접근해 원본을 수정할 수 있습니다.', ARRAY['"map"', '"auto"', '"range-for"', '"참조"'], NULL, NULL),
(10209, 'cpp', 'cpp-16', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s;
    s.insert(3);
    s.insert(1);
    s.insert(3);
    s.insert(2);
    cout << s.size();
    return 0;
}', ARRAY['"4"', '"3"', '"2"', '"1"'], 1, 'set은 중복을 허용하지 않습니다. 3이 두 번 삽입되었지만 하나만 저장되어 {1,2,3}으로 크기는 3입니다.', 'set의 중복 제거', 'set은 중복 원소를 허용하지 않고 자동 정렬됩니다. 중복을 허용하려면 multiset을 사용합니다.', ARRAY['"set"', '"multiset"', '"중복 제거"'], NULL, NULL),
(10210, 'cpp', 'cpp-16', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> ages;
    ages["철수"] = 15;
    ages["영희"] = 14;
    ages["민수"] = 16;
    
    if (ages.count("영희"))
        cout << "영희: " << ages["영희"];
    else
        cout << "없음";
    return 0;
}', ARRAY['"없음"', '"영희: 14"', '"영희: 0"', '"컴파일 오류"'], 1, 'ages에 "영희"가 존재하므로 count()=1(true). ages["영희"]=14가 출력됩니다.', 'unordered_map 사용법', 'unordered_map은 해시 기반으로 O(1) 평균 탐색이 가능합니다. count()로 키 존재 여부를 확인합니다.', ARRAY['"unordered_map"', '"해시맵"', '"count"'], NULL, NULL),
(10211, 'cpp', 'cpp-16', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 8, 1, 3, 5};
    for (int x : s)
        cout << x << " ";
    return 0;
}', ARRAY['"5 3 8 1 3 5 "', '"1 3 5 8 "', '"1 3 3 5 5 8 "', '"컴파일 오류"'], 1, 'set은 중복을 제거하고 자동으로 오름차순 정렬합니다. {5,3,8,1,3,5} → {1,3,5,8}이 되어 ''1 3 5 8 ''이 출력됩니다.', 'set의 자동 정렬과 중복 제거', 'set을 순회하면 항상 오름차순으로 원소가 나옵니다. 중복 허용이 필요하면 multiset을 사용하세요.', ARRAY['"set"', '"정렬"', '"중복 제거"', '"순회"'], NULL, NULL),
(10212, 'cpp', 'cpp-16', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 1;
    m["cherry"] = 2;
    for (auto& p : m)
        cout << p.first << " ";
    return 0;
}', ARRAY['"apple banana cherry"', '"banana cherry apple"', '"cherry banana apple"', '"apple cherry banana"'], 0, 'map은 key를 기준으로 자동 정렬(오름차순)합니다. 알파벳 순으로 apple, banana, cherry가 출력됩니다.', 'map의 자동 정렬', 'map은 Red-Black Tree 기반으로 key가 항상 정렬되어 있습니다. 정렬이 필요없으면 unordered_map을 사용합니다.', ARRAY['"map"', '"unordered_map"', '"자동 정렬"'], NULL, NULL),
(10213, 'cpp', 'cpp-16', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <map>
using namespace std;

int main() {
    string s = "abracadabra";
    map<char, int> freq;
    for (char c : s) freq[c]++;
    char maxChar = '' '';
    int maxFreq = 0;
    for (auto& p : freq) {
        if (p.second > maxFreq) {
            maxFreq = p.second;
            maxChar = p.first;
        }
    }
    cout << maxChar << ":" << maxFreq;
    return 0;
}', ARRAY['"a:5"', '"a:4"', '"b:2"', '"r:2"'], 0, 'abracadabra에서 a는 5번(위치 0,3,5,7,10) 등장합니다. 가장 빈도가 높은 문자입니다.', '빈도수 세기 (map)', 'map<char,int>로 각 문자의 등장 횟수를 셀 수 있습니다. freq[c]++는 c의 카운트를 증가시킵니다.', ARRAY['"빈도수"', '"map"', '"문자 카운팅"'], NULL, NULL),
(10214, 'cpp', 'cpp-23', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end());
    cout << v[0] << " " << v[4];
    return 0;
}', ARRAY['"3 5"', '"1 5"', '"5 1"', '"1 4"'], 1, 'sort()는 오름차순 정렬합니다. 정렬 후 v = {1,1,3,4,5}이므로 v[0]=1, v[4]=5입니다.', 'STL sort()', 'algorithm 헤더의 sort()는 기본적으로 오름차순 정렬합니다. O(N log N) 시간 복잡도를 가집니다.', ARRAY['"sort"', '"algorithm"', '"정렬"'], NULL, NULL),
(10215, 'cpp', 'cpp-17', '보통', '다음 중 벡터에서 특정 위치에 요소를 삽입하는 올바른 방법은?', 'vector<int> v = {1, 2, 3};
// v의 인덱스 1 위치에 10을 삽입하려면?', ARRAY['"v.insert(1, 10);"', '"v.insert(v.begin() + 1, 10);"', '"v.add(1, 10);"', '"v[1] = 10;"'], 1, 'vector의 insert()는 반복자(iterator)를 사용합니다. v.begin() + 1은 두 번째 위치를 가리킵니다.', 'vector::insert()', 'insert(위치_반복자, 값)으로 원하는 위치에 요소를 삽입합니다. 기존 요소들은 뒤로 밀립니다.', ARRAY['"iterator"', '"insert"', '"vector"'], NULL, '{"wrong":"v.insert(1, 10);  // 정수는 위치로 사용 불가","correct":"v.insert(v.begin() + 1, 10);  // 반복자 사용"}'::jsonb),
(10216, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    vector<int>::iterator it = v.begin();
    it += 2;
    cout << *it << endl;
    return 0;
}', ARRAY['"10"', '"20"', '"30"', '"40"'], 2, 'v.begin()은 첫 번째 요소를 가리킵니다. it += 2로 두 칸 이동하면 세 번째 요소(30)를 가리킵니다.', '반복자 (Iterator)', '반복자는 컨테이너의 요소를 가리키는 포인터와 유사한 객체입니다. *it로 값을 읽고, ++it로 다음 요소로 이동합니다.', ARRAY['"iterator"', '"begin"', '"end"', '"포인터"'], NULL, NULL),
(10217, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    auto it = v.begin();
    cout << *it << " ";
    advance(it, 3);
    cout << *it;
    return 0;
}', ARRAY['"1 3"', '"1 4"', '"0 3"', '"컴파일 오류"'], 1, 'auto가 iterator 타입을 자동 추론합니다. advance(it, 3)으로 3칸 이동하면 4번째 요소(4)를 가리킵니다.', 'auto 키워드', 'auto는 컴파일러가 타입을 자동으로 추론합니다. 긴 타입(예: vector<int>::iterator)을 간결하게 작성할 수 있습니다.', ARRAY['"auto"', '"타입 추론"', '"iterator"'], NULL, '{"wrong":"vector<int>::iterator it = v.begin();  // 길다!","correct":"auto it = v.begin();  // 자동 타입 추론"}'::jsonb),
(10218, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    int cnt = count(v.begin(), v.end(), 1);
    cout << cnt;
    return 0;
}', ARRAY['"1"', '"2"', '"3"', '"0"'], 1, 'count()는 범위 내에서 특정 값의 개수를 셉니다. v에서 1은 2번 등장하므로 cnt=2입니다.', 'STL count()', 'count(시작, 끝, 값)은 [시작, 끝) 범위에서 값과 일치하는 요소의 개수를 반환합니다. O(N) 시간 복잡도.', ARRAY['"count"', '"algorithm"', '"STL"'], NULL, NULL),
(10219, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 1, 4, 2};
    auto it = min_element(v.begin(), v.end());
    cout << *it << " " << (it - v.begin());
    return 0;
}', ARRAY['"1 2"', '"1 0"', '"5 0"', '"2 4"'], 0, 'min_element는 최소값의 반복자를 반환합니다. 최소값은 1(인덱스 2). *it=1, it-v.begin()=2', 'min_element / max_element', 'min_element()는 범위 내 최소값의 반복자를, max_element()는 최대값의 반복자를 반환합니다.', ARRAY['"min_element"', '"max_element"', '"iterator"'], NULL, NULL),
(10220, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 2, 3, 3, 3, 4};
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << v.size();
    return 0;
}', ARRAY['"4"', '"7"', '"3"', '"1"'], 0, 'unique는 연속된 중복을 제거하고 새 끝 반복자를 반환합니다. erase로 나머지를 삭제하면 {1,2,3,4}로 size=4', 'unique + erase로 중복 제거', 'unique()는 정렬된 범위에서 연속 중복을 제거합니다. erase와 함께 사용하여 실제로 벡터를 축소합니다.', ARRAY['"unique"', '"erase"', '"중복 제거"'], NULL, NULL),
(10222, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    vector<int> v2(v.begin(), v.begin() + 2);
    cout << v2.size() << " " << v2[1];
    return 0;
}', ARRAY['"3 20"', '"2 20"', '"2 30"', '"3 30"'], 1, 'v.begin()부터 v.begin()+2까지(미포함)의 요소로 v2를 생성합니다. v2 = {10, 20}, size=2, v2[1]=20', '반복자 범위로 vector 생성', 'vector<int> v2(시작반복자, 끝반복자)로 다른 컨테이너의 부분 범위를 복사하여 새 벡터를 만들 수 있습니다.', ARRAY['"vector 생성자"', '"iterator"', '"부분 복사"'], NULL, NULL),
(10223, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdef";
    reverse(s.begin(), s.end());
    cout << s;
    return 0;
}', ARRAY['"abcdef"', '"fedcba"', '"abcfed"', '"컴파일 오류"'], 1, 'reverse()는 범위 내 요소의 순서를 뒤집습니다. "abcdef" → "fedcba"', 'reverse()', 'reverse(시작, 끝)은 범위 내 요소를 제자리에서 뒤집습니다. 문자열, 벡터 등에 모두 사용 가능합니다.', ARRAY['"reverse"', '"algorithm"', '"문자열 뒤집기"'], NULL, NULL),
(10224, 'cpp', 'cpp-17', '보통', '다음 코드에서 fill()의 역할은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v(5);
    fill(v.begin(), v.end(), 7);
    for (int x : v) cout << x << " ";
    return 0;
}', ARRAY['"0 0 0 0 0"', '"7 7 7 7 7"', '"7 0 0 0 0"', '"컴파일 오류"'], 1, 'fill(시작, 끝, 값)은 범위 내 모든 요소를 지정한 값으로 채웁니다. 모든 요소가 7이 됩니다.', 'fill()', 'fill(시작, 끝, 값)은 범위 내 모든 요소를 해당 값으로 설정합니다. memset보다 타입 안전합니다.', ARRAY['"fill"', '"algorithm"', '"초기화"'], NULL, NULL),
(10225, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    bool found = binary_search(v.begin(), v.end(), 3);
    cout << (found ? "있음" : "없음");
    return 0;
}', ARRAY['"있음"', '"없음"', '"3"', '"컴파일 오류"'], 0, 'binary_search()는 정렬된 범위에서 값이 존재하면 true를 반환합니다. 3이 존재하므로 "있음"이 출력됩니다.', 'binary_search()', 'binary_search(시작, 끝, 값)은 정렬된 범위에서 값의 존재 여부를 bool로 반환합니다. 위치가 필요하면 lower_bound를 사용하세요.', ARRAY['"binary_search"', '"lower_bound"', '"이진 탐색"'], NULL, NULL),
(10226, 'cpp', 'cpp-16', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 1, 4, 2};
    auto it = s.begin();
    cout << *it << " ";
    advance(it, 2);
    cout << *it;
    return 0;
}', ARRAY['"5 1"', '"1 3"', '"3 1"', '"1 4"'], 1, 'set은 자동 정렬됩니다: {1,2,3,4,5}. begin()은 1을 가리키고, advance(it,2)로 2칸 이동하면 3을 가리킵니다.', 'set의 자동 정렬과 반복자', 'set은 삽입 순서와 관계없이 오름차순 정렬됩니다. 반복자로 순회하면 정렬된 순서로 접근합니다.', ARRAY['"set"', '"정렬"', '"iterator"'], NULL, NULL),
(10227, 'cpp', 'cpp-23', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end());
    cout << v[0] << " " << v[4];
    return 0;
}', ARRAY['"5 9"', '"1 9"', '"9 1"', '"1 5"'], 1, 'sort()는 기본적으로 오름차순 정렬합니다. 정렬 후 v = {1,2,5,8,9}이므로 v[0]=1, v[4]=9입니다.', 'STL sort', 'algorithm 헤더의 sort(begin, end)는 O(N log N) 정렬입니다. 기본은 오름차순입니다.', ARRAY['"sort"', '"algorithm"', '"비교 함수"'], NULL, NULL),
(10228, 'cpp', 'cpp-23', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int score;
    Student(string n, int s) : name(n), score(s) {}
    bool operator<(const Student& other) const {
        return score < other.score;
    }
};

int main() {
    Student a("철수", 90), b("영희", 85);
    cout << (a < b ? a.name : b.name);
    return 0;
}', ARRAY['"철수"', '"영희"', '"90"', '"85"'], 1, 'a < b는 90 < 85로 false입니다. 삼항 연산자에서 false이면 b.name = "영희"가 출력됩니다.', '비교 연산자 오버로딩', 'operator<를 정의하면 sort() 등에서 사용자 정의 타입을 정렬할 수 있습니다.', ARRAY['"operator<"', '"정렬"', '"사용자 정의 비교"'], NULL, NULL),
(10230, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    cout << accumulate(v.begin(), v.end(), 0);
    return 0;
}', ARRAY['"10"', '"15"', '"5"', '"0"'], 1, 'accumulate는 초기값 0에 모든 원소를 더합니다. 0+1+2+3+4+5 = 15.', 'accumulate 함수', 'numeric 헤더의 accumulate(begin, end, 초기값)은 범위의 합을 구합니다. 초기값부터 시작해서 더합니다.', ARRAY['"accumulate"', '"numeric"', '"합계"'], NULL, NULL),
(10231, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "Hello World";
    transform(s.begin(), s.end(), s.begin(), ::toupper);
    cout << s;
    return 0;
}', ARRAY['"Hello World"', '"hello world"', '"HELLO WORLD"', '"hELLO wORLD"'], 2, 'transform에 ::toupper를 전달하면 모든 문자를 대문자로 변환합니다.', 'transform으로 대문자 변환', 'transform(begin, end, dest, func)은 각 원소에 함수를 적용합니다. ::toupper로 대문자 변환.', ARRAY['"transform"', '"toupper"', '"algorithm"'], NULL, NULL),
(10232, 'cpp', 'cpp-17', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int cnt = count_if(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << cnt;
    return 0;
}', ARRAY['"2"', '"3"', '"5"', '"0"'], 0, 'count_if는 조건을 만족하는 원소의 개수를 셉니다. 짝수는 2, 4로 2개입니다.', 'count_if 알고리즘', 'count_if(begin, end, predicate)는 조건을 만족하는 원소 수를 반환합니다.', ARRAY['"count_if"', '"람다"', '"algorithm"'], NULL, NULL),
(10234, 'cpp', 'cpp-23', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    sort(v.begin(), v.end(), greater<int>());
    cout << v[0] << " " << v[5];
    return 0;
}', ARRAY['"1 9"', '"9 1"', '"3 9"', '"1 5"'], 1, 'greater<int>()를 세 번째 인자로 넘기면 내림차순 정렬됩니다. {9,5,4,3,1,1}이므로 v[0]=9, v[5]=1입니다.', '내림차순 정렬', 'sort()의 세 번째 인자에 greater<int>()를 넘기면 내림차순 정렬됩니다. 사용자 정의 비교 함수도 가능합니다.', ARRAY['"sort"', '"greater"', '"비교 함수"'], NULL, '{"wrong":"sort(v.begin(), v.end());  // 오름차순","correct":"sort(v.begin(), v.end(), greater<int>());  // 내림차순"}'::jsonb),
(10235, 'cpp', 'cpp-17', '어려움', 'N개의 원소가 있는 정렬된 배열에서 lower_bound의 시간 복잡도와 동작은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 3, 3, 5, 7};
    auto it = lower_bound(v.begin(), v.end(), 3);
    cout << (it - v.begin());
    return 0;
}', ARRAY['"O(N) - 값 3을 순차 검색하여 마지막 위치 반환"', '"O(log N) - 값 3 이상인 첫 번째 위치의 인덱스 반환"', '"O(N log N) - 정렬 후 값 3의 위치 반환"', '"O(1) - 값 3의 개수를 반환"'], 1, 'lower_bound는 이진 탐색으로 target 이상인 첫 번째 위치를 찾습니다. v에서 3 이상인 첫 위치는 인덱스 1이며, O(log N)입니다.', 'lower_bound / upper_bound', 'lower_bound는 target 이상, upper_bound는 target 초과인 첫 위치를 이진 탐색으로 찾습니다. 정렬된 컨테이너에서 사용합니다.', ARRAY['"lower_bound"', '"upper_bound"', '"이진 탐색"', '"STL"'], NULL, '{"wrong":"// 순차 탐색: O(N)\nfor (int i = 0; i < n; i++)\n    if (v[i] >= 3) ...","correct":"// 이진 탐색: O(log N)\nauto it = lower_bound(v.begin(), v.end(), 3);"}'::jsonb),
(10236, 'cpp', 'cpp-23', '어려움', '다음 람다 함수 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), [](int a, int b) {
        return a > b;
    });
    cout << v[0] << " " << v[4];
    return 0;
}', ARRAY['"1 5"', '"5 1"', '"3 5"', '"1 3"'], 1, '람다 함수 [](int a, int b) { return a > b; }는 내림차순 비교 함수입니다. 정렬 후 {5,4,3,1,1}, v[0]=5, v[4]=1', '람다 함수 (Lambda)', '[캡처](매개변수) { 본문 } 형태의 익명 함수입니다. sort의 비교 함수 등에 간편하게 사용됩니다.', ARRAY['"람다"', '"sort"', '"비교 함수"'], NULL, '{"wrong":"bool cmp(int a, int b) { return a > b; }\nsort(v.begin(), v.end(), cmp);  // 별도 함수","correct":"sort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n});  // 람다로 간결하게"}'::jsonb),
(10237, 'cpp', 'algo-preview', '어려움', '다음 이진 탐색 코드에서 정렬된 배열 {1,3,5,7,9}에서 target=6일 때 반환값은?', 'int binarySearch(vector<int>& v, int target) {
    int lo = 0, hi = v.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (v[mid] == target) return mid;
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}', ARRAY['"2"', '"3"', '"-1"', '"0"'], 2, '6은 배열에 존재하지 않습니다. lo > hi가 되면 while 루프가 종료되고 -1이 반환됩니다.', '이진 탐색 실패 시 반환값', '이진 탐색에서 target이 없으면 lo > hi가 되어 루프가 종료됩니다. 이때 lo는 target이 삽입될 위치를 나타냅니다.', ARRAY['"이진 탐색"', '"탐색 실패"', '"lower_bound"'], NULL, NULL),
(10238, 'cpp', 'cpp-17', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    reverse(v.begin(), v.end());
    rotate(v.begin(), v.begin() + 2, v.end());
    for (int x : v) cout << x << " ";
    return 0;
}', ARRAY['"5 4 3 2 1"', '"3 2 1 5 4"', '"1 5 4 3 2"', '"4 3 2 1 5"'], 1, 'reverse 후 {5,4,3,2,1}. rotate(begin, begin+2, end)는 begin+2를 새 시작으로 만들어 {3,2,1,5,4}.', 'rotate 알고리즘', 'rotate(first, middle, last)는 middle이 새로운 첫 원소가 되도록 회전합니다.', ARRAY['"rotate"', '"reverse"', '"algorithm"'], NULL, NULL),
(10239, 'cpp', 'cpp-17', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "stressed";
    reverse(s.begin(), s.end());
    cout << s;
    return 0;
}', ARRAY['"stressed"', '"desserts"', '"stressde"', '"dessert"'], 1, '"stressed"를 뒤집으면 "desserts"가 됩니다. reverse()는 문자열도 뒤집을 수 있습니다.', 'string 뒤집기', 'reverse(s.begin(), s.end())로 문자열을 뒤집을 수 있습니다. 팰린드롬 판별에 활용됩니다.', ARRAY['"reverse"', '"팰린드롬"', '"string"'], NULL, NULL),
(10240, 'cpp', 'cpp-17', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    auto it = lower_bound(v.begin(), v.end(), 4);
    cout << "위치: " << (it - v.begin());
    return 0;
}', ARRAY['"위치: 2"', '"위치: 3"', '"위치: 4"', '"정의되지 않은 동작"'], 3, 'lower_bound는 정렬된 범위에서만 올바르게 작동합니다. v가 정렬되지 않았으므로 결과가 정의되지 않습니다.', '이진 탐색 전제조건', 'lower_bound, upper_bound, binary_search는 반드시 정렬된 범위에서 사용해야 합니다.', ARRAY['"lower_bound"', '"이진 탐색"', '"정렬 전제조건"'], NULL, '{"wrong":"vector<int> v = {3, 1, 4};\nlower_bound(v.begin(), v.end(), 4);  // 미정렬!","correct":"sort(v.begin(), v.end());\nlower_bound(v.begin(), v.end(), 4);  // 정렬 후 사용"}'::jsonb),
(10241, 'cpp', 'cpp-23', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 2, 3, 3, 3, 4};
    auto it = unique(v.begin(), v.end());
    v.erase(it, v.end());
    cout << v.size();
    return 0;
}', ARRAY['"7"', '"4"', '"3"', '"1"'], 1, 'unique()는 연속된 중복을 제거하고 끝 iterator를 반환합니다. erase로 실제 삭제. {1,2,3,4}로 4개.', 'unique + erase 패턴', 'unique()는 연속 중복을 제거합니다. 정렬 후 사용하면 전체 중복을 제거할 수 있습니다.', ARRAY['"unique"', '"erase"', '"중복 제거"'], NULL, NULL),
(10242, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& v, int target) {
    int lo = 0, hi = v.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) return mid;
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> v = {2, 5, 8, 12, 16, 23, 38};
    cout << binarySearch(v, 16);
    return 0;
}', ARRAY['"3"', '"4"', '"5"', '"-1"'], 1, 'v[4]=16이므로 인덱스 4를 반환합니다. lo+(hi-lo)/2로 오버플로우를 방지합니다.', '이진 탐색 구현', '정렬된 배열에서 O(log N)으로 탐색합니다. mid = lo + (hi-lo)/2는 (lo+hi)/2의 안전한 버전입니다.', ARRAY['"이진 탐색"', '"O(log N)"', '"오버플로우 방지"'], NULL, NULL),
(10243, 'cpp', 'cpp-23', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 1, 2};
    // 버블 소트
    for (int i = 0; i < v.size() - 1; i++)
        for (int j = 0; j < v.size() - 1 - i; j++)
            if (v[j] > v[j+1])
                swap(v[j], v[j+1]);
    for (int x : v) cout << x << " ";
    return 0;
}', ARRAY['"5 3 8 1 2"', '"1 2 3 5 8"', '"8 5 3 2 1"', '"2 1 3 5 8"'], 1, '버블 소트는 인접한 원소를 비교하여 오름차순으로 정렬합니다. 결과: 1 2 3 5 8.', '버블 소트', '인접한 두 원소를 비교하고 교환하는 O(N^2) 정렬 알고리즘입니다. 이해하기 쉽지만 느립니다.', ARRAY['"버블 소트"', '"정렬 알고리즘"', '"O(N^2)"'], NULL, NULL),
(10244, 'cpp', 'cpp-17', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto it = partition(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << "짝수 개수: " << (it - v.begin());
    return 0;
}', ARRAY['"짝수 개수: 5"', '"짝수 개수: 10"', '"짝수 개수: 0"', '"짝수 개수: 2"'], 0, 'partition은 조건을 만족하는 원소를 앞쪽으로 모읍니다. 짝수 5개가 앞으로 이동하여 it - begin = 5.', 'partition 알고리즘', 'partition은 조건에 따라 원소를 분류합니다. 반환된 iterator 앞쪽이 조건을 만족하는 원소입니다.', ARRAY['"partition"', '"algorithm"', '"람다"'], NULL, NULL),
(10246, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);
    cout << pq.top();
    return 0;
}', ARRAY['"10"', '"20"', '"30"', '"50"'], 3, 'priority_queue는 기본적으로 최대 힙입니다. 가장 큰 값 50이 top()에 위치합니다.', 'priority_queue (우선순위 큐)', 'priority_queue는 기본적으로 최대 힙(max-heap)으로, top()은 항상 가장 큰 값을 반환합니다. 최소 힙은 greater<int>를 사용합니다.', ARRAY['"priority_queue"', '"힙"', '"최대 힙"', '"최소 힙"'], NULL, '{"wrong":"priority_queue<int> pq;  // 최대 힙\npq.top();  // 가장 큰 값","correct":"priority_queue<int, vector<int>, greater<int>> pq;\npq.top();  // 가장 작은 값 (최소 힙)"}'::jsonb),
(10247, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    cout << dq.front() << " " << dq.back() << " " << dq.size();
    return 0;
}', ARRAY['"1 3 3"', '"2 3 3"', '"1 2 3"', '"3 1 3"'], 0, 'deque는 양쪽 끝에서 삽입/삭제 가능합니다. push_front(1), push_back(2), push_back(3) → {1, 2, 3}. front=1, back=3, size=3', 'deque (덱, 양방향 큐)', 'deque는 양쪽 끝에서 O(1)에 삽입/삭제 가능한 자료구조입니다. push_front, push_back, pop_front, pop_back 모두 지원합니다.', ARRAY['"deque"', '"queue"', '"양방향 큐"'], NULL, NULL),
(10250, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    dq.push_front(0);
    for (int x : dq) cout << x << " ";
    return 0;
}', ARRAY['"2 1 3 0"', '"0 1 2 3"', '"3 2 1 0"', '"0 2 1 3"'], 1, 'push_back(2)→{2}, push_front(1)→{1,2}, push_back(3)→{1,2,3}, push_front(0)→{0,1,2,3}.', 'deque (양방향 큐)', 'deque는 앞뒤 모두에서 O(1) 삽입/삭제가 가능합니다. push_front/push_back, pop_front/pop_back.', ARRAY['"deque"', '"양방향 큐"', '"STL"'], NULL, NULL),
(10251, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Box {
public:
    int size;
    Box(int s) : size(s) {
        cout << "생성:" << s << " ";
    }
    ~Box() {
        cout << "소멸:" << size << " ";
    }
};

int main() {
    Box b1(1);
    Box b2(2);
    return 0;
}', ARRAY['"생성:1 생성:2 소멸:1 소멸:2"', '"생성:1 생성:2 소멸:2 소멸:1"', '"생성:1 소멸:1 생성:2 소멸:2"', '"생성:2 생성:1 소멸:1 소멸:2"'], 1, '생성자는 선언 순서대로 호출(1→2), 소멸자는 역순으로 호출(2→1)됩니다. 스택의 LIFO 원리입니다.', '생성자와 소멸자', '생성자(Constructor)는 객체 생성 시, 소멸자(Destructor, ~클래스명)는 객체 소멸 시 자동 호출됩니다. 지역 변수는 역순으로 소멸합니다.', ARRAY['"생성자"', '"소멸자"', '"RAII"', '"스택"'], NULL, NULL),
(10252, 'cpp', 'cpp-19', '어려움', '다음 코드에서 파일에 쓰여지는 내용은?', '#include <fstream>
using namespace std;

int main() {
    ofstream fout("output.txt");
    fout << "Hello" << endl;
    fout << 42 << endl;
    fout.close();
    return 0;
}', ARRAY['"Hello42"', '"Hello\n42"', '"Hello
42"', '"컴파일 오류"'], 2, 'ofstream으로 파일에 쓸 수 있습니다. endl로 줄바꿈이 들어가 Hello와 42가 각각 다른 줄에 쓰여집니다.', '파일 출력 (ofstream)', 'ofstream은 파일에 데이터를 쓰는 스트림입니다. cout과 같은 방식(<<)으로 사용하며, 사용 후 close()로 닫아야 합니다.', ARRAY['"fstream"', '"ifstream"', '"파일 I/O"'], NULL, NULL),
(10253, 'cpp', 'cpp-19', '어려움', '경쟁 프로그래밍에서 빠른 입출력을 위해 사용하는 코드로 올바른 것은?', '', ARRAY['"cin.fast(); cout.fast();"', '"ios::sync_with_stdio(false); cin.tie(nullptr);"', '"scanf_fast(); printf_fast();"', '"#pragma fast_io"'], 1, 'ios::sync_with_stdio(false)는 C/C++ 입출력 동기화를 끄고, cin.tie(nullptr)은 cin/cout의 묶음을 풉니다.', '빠른 입출력 (Fast I/O)', '경쟁 프로그래밍에서 cin/cout의 속도를 높이려면 sync_with_stdio(false)와 cin.tie(nullptr)을 사용합니다.', ARRAY['"빠른 I/O"', '"경쟁 프로그래밍"', '"sync_with_stdio"'], NULL, '{"wrong":"// 느린 입출력 (동기화 켜짐)\ncin >> n;","correct":"ios::sync_with_stdio(false);\ncin.tie(nullptr);\ncin >> n;  // 훨씬 빠름!"}'::jsonb),
(10254, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << s.top() << " ";
    s.pop();
    cout << s.top();
    return 0;
}', ARRAY['"10 20"', '"30 20"', '"30 10"', '"20 10"'], 1, '스택은 LIFO(후입선출)입니다. top()=30, pop()으로 30 제거 후 top()=20', 'stack 클래스', 'stack은 LIFO 자료구조입니다. push()로 삽입, top()으로 맨 위 확인, pop()으로 맨 위 제거합니다.', ARRAY['"stack"', '"LIFO"', '"DFS"'], NULL, NULL),
(10255, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    cout << q.front() << " ";
    q.pop();
    cout << q.front();
    return 0;
}', ARRAY['"30 20"', '"10 20"', '"10 30"', '"30 10"'], 1, '큐는 FIFO(선입선출)입니다. front()=10, pop()으로 10 제거 후 front()=20', 'queue 클래스', 'queue는 FIFO 자료구조입니다. push()로 삽입, front()으로 맨 앞 확인, pop()으로 맨 앞 제거합니다.', ARRAY['"queue"', '"FIFO"', '"BFS"'], NULL, '{"wrong":"stack: top() / pop()  // LIFO (후입선출)","correct":"queue: front() / pop()  // FIFO (선입선출)"}'::jsonb),
(10257, 'cpp', 'cpp-23', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int n = 5;
    // Bubble Sort
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    cout << arr[0] << " " << arr[4];
    return 0;
}', ARRAY['"5 9"', '"1 9"', '"9 1"', '"2 8"'], 1, '버블 정렬 후 오름차순 정렬됩니다. {1,2,5,8,9}에서 arr[0]=1, arr[4]=9입니다.', '버블 정렬 (Bubble Sort)', '인접한 두 요소를 비교하여 교환하는 정렬입니다. 시간 복잡도는 O(N^2)으로, 느리지만 구현이 간단합니다.', ARRAY['"정렬 알고리즘"', '"시간 복잡도"', '"O(N^2)"'], NULL, NULL),
(10258, 'cpp', 'algo-preview', '어려움', '이진 탐색(Binary Search)의 시간 복잡도는?', '// 정렬된 배열에서 값을 찾는 이진 탐색
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}', ARRAY['"O(N)"', '"O(N^2)"', '"O(log N)"', '"O(N log N)"'], 2, '이진 탐색은 매 단계에서 탐색 범위를 절반으로 줄이므로 O(log N)입니다.', '이진 탐색 (Binary Search)', '정렬된 배열에서만 사용 가능하며, 중간값과 비교하여 탐색 범위를 절반씩 줄입니다. O(log N) 시간 복잡도.', ARRAY['"이진 탐색"', '"시간 복잡도"', '"정렬된 배열"'], NULL, NULL),
(10259, 'cpp', 'cpp-23', '어려움', '선택 정렬(Selection Sort)의 동작 방식으로 올바른 것은?', '// Selection Sort 핵심 로직
for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
        if (arr[j] < arr[minIdx])
            minIdx = j;
    }
    swap(arr[i], arr[minIdx]);
}', ARRAY['"인접한 두 요소를 비교하여 교환한다"', '"남은 요소 중 최소값을 찾아 앞쪽에 배치한다"', '"배열을 반으로 나누어 재귀적으로 정렬한다"', '"이미 정렬된 부분에 새 요소를 삽입한다"'], 1, '선택 정렬은 매 단계에서 남은 요소 중 최소값을 찾아 현재 위치에 배치합니다. 시간 복잡도는 O(N^2)입니다.', '선택 정렬 (Selection Sort)', '매 반복마다 최소값의 인덱스를 찾아 현재 위치와 교환합니다. O(N^2)이지만 교환 횟수가 적습니다.', ARRAY['"선택 정렬"', '"버블 정렬"', '"삽입 정렬"'], NULL, NULL),
(10260, 'cpp', 'algo-preview', '어려움', '다음 BFS 코드에서 빈칸에 들어갈 자료구조는?', '#include <iostream>
#include <vector>
#include <_______>
using namespace std;

void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    _______ <int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        for (int next : graph[node]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
}', ARRAY['"stack"', '"queue"', '"priority_queue"', '"deque"'], 1, 'BFS(너비 우선 탐색)는 큐(queue)를 사용합니다. 가까운 노드부터 탐색하는 FIFO 방식입니다.', 'BFS와 큐', 'BFS는 큐를 사용하여 같은 깊이의 노드를 먼저 방문합니다. DFS는 스택(또는 재귀)을 사용합니다.', ARRAY['"BFS"', '"DFS"', '"그래프 탐색"', '"큐"'], NULL, '{"wrong":"stack<int> s;  // DFS에 사용","correct":"queue<int> q;  // BFS에 사용"}'::jsonb),
(10261, 'cpp', 'algo-preview', '어려움', '다음 DFS 코드의 방문 순서로 올바른 것은? (인접 리스트가 오름차순 정렬된 경우)', '#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> graph = {
    {1, 2},    // 0번 노드 -> 1, 2
    {0, 3},    // 1번 노드 -> 0, 3
    {0, 3},    // 2번 노드 -> 0, 3
    {1, 2}     // 3번 노드 -> 1, 2
};
bool visited[4] = {false};

void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    for (int next : graph[node]) {
        if (!visited[next]) dfs(next);
    }
}

int main() { dfs(0); }', ARRAY['"0 1 2 3"', '"0 1 3 2"', '"0 2 3 1"', '"0 1 2"'], 1, '0에서 시작 -> 1 방문 -> 1의 이웃 중 3 방문 -> 3의 이웃 중 2 방문. 순서: 0 1 3 2', 'DFS (깊이 우선 탐색)', 'DFS는 한 방향으로 끝까지 탐색한 후 되돌아와 다른 방향을 탐색합니다. 재귀 또는 스택으로 구현합니다.', ARRAY['"DFS"', '"재귀"', '"그래프"', '"백트래킹"'], NULL, NULL),
(10262, 'cpp', 'algo-preview', '어려움', '다음 DP(동적 프로그래밍) 코드는 무엇을 계산하나요?', '#include <iostream>
using namespace std;

int main() {
    int n = 6;
    int dp[7];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    cout << dp[n];
    return 0;
}', ARRAY['"팩토리얼 (6!)"', '"피보나치 수열의 6번째 값"', '"1부터 6까지의 합"', '"2의 6제곱"'], 1, 'dp[i] = dp[i-1] + dp[i-2]는 피보나치 수열의 점화식입니다. dp[6] = 8 (0,1,1,2,3,5,8)', '동적 프로그래밍 (DP)', 'DP는 큰 문제를 작은 부분 문제로 나누어 풀고, 결과를 저장하여 중복 계산을 피하는 기법입니다.', ARRAY['"DP"', '"메모이제이션"', '"피보나치"', '"점화식"'], NULL, NULL),
(10263, 'cpp', 'algo-preview', '어려움', '배낭 문제(Knapsack Problem)에서 DP 테이블 dp[i][w]의 의미는?', '// 0-1 Knapsack DP
for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
        if (weight[i] <= w) {
            dp[i][w] = max(dp[i-1][w],
                          dp[i-1][w-weight[i]] + value[i]);
        } else {
            dp[i][w] = dp[i-1][w];
        }
    }
}', ARRAY['"i번째 물건까지 고려했을 때 용량 w에서의 최대 가치"', '"i번째 물건의 무게가 w일 때의 최소 비용"', '"w개의 물건을 i번 선택했을 때의 총 가치"', '"i번째 물건을 w번 사용했을 때의 최대 가치"'], 0, 'dp[i][w]는 처음 i개의 물건 중에서 선택하여 용량 w의 배낭에 넣을 수 있는 최대 가치를 의미합니다.', '0-1 배낭 문제', '각 물건을 넣거나 안 넣거나(0-1) 선택하여 주어진 용량에서 최대 가치를 구합니다. O(N*W) 시간 복잡도.', ARRAY['"DP"', '"배낭 문제"', '"최적화"'], NULL, NULL),
(10264, 'cpp', 'algo-preview', '어려움', '다음 그리디 알고리즘은 어떤 문제를 풀고 있나요?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> meetings(n);
    for (int i = 0; i < n; i++)
        cin >> meetings[i].second >> meetings[i].first;
    sort(meetings.begin(), meetings.end());
    int count = 0, last_end = 0;
    for (auto& m : meetings) {
        if (m.second >= last_end) {
            count++;
            last_end = m.first;
        }
    }
    cout << count;
}', ARRAY['"최소 신장 트리 (MST)"', '"회의실 배정 (Activity Selection)"', '"최단 경로"', '"위상 정렬"'], 1, '끝나는 시간 기준으로 정렬 후, 겹치지 않는 회의를 최대한 많이 선택하는 회의실 배정 문제입니다.', '그리디 알고리즘 - 회의실 배정', '그리디는 매 순간 최적의 선택을 합니다. 회의실 배정은 끝나는 시간 기준 정렬이 핵심입니다.', ARRAY['"그리디"', '"정렬"', '"Activity Selection"'], NULL, NULL),
(10265, 'cpp', 'cpp-20', '어려움', '다음 중 #include <bits/stdc++.h>에 대한 설명으로 올바른 것은?', '#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4};
    sort(v.begin(), v.end());
    cout << v[0];
    return 0;
}', ARRAY['"C++ 표준에 정의된 공식 헤더이다"', '"모든 표준 라이브러리를 한 번에 포함하는 비표준 헤더이다"', '"vector만 포함하는 전용 헤더이다"', '"컴파일 시간을 단축시키는 최적화 헤더이다"'], 1, 'bits/stdc++.h는 GCC에서 제공하는 비표준 헤더로, 모든 표준 라이브러리를 한 번에 포함합니다. 대회에서 편리하지만 컴파일이 느려질 수 있습니다.', 'bits/stdc++.h', '경쟁 프로그래밍에서 자주 사용되는 헤더로, 모든 표준 라이브러리를 포함합니다. GCC 전용이며 비표준입니다.', ARRAY['"경쟁 프로그래밍"', '"헤더 파일"', '"GCC"'], NULL, NULL),
(10266, 'cpp', 'cpp-23', '어려움', '다음 삽입 정렬에서 배열 {5, 2, 4, 1, 3}의 첫 번째 패스(i=1) 후 결과는?', 'void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}', ARRAY['"{1, 2, 4, 5, 3}"', '"{2, 5, 4, 1, 3}"', '"{5, 2, 4, 1, 3}"', '"{2, 4, 5, 1, 3}"'], 1, '첫 번째 패스(i=1): key=2, arr[0]=5 > 2이므로 5를 오른쪽으로 밀고 2를 앞에 삽입. 결과: {2, 5, 4, 1, 3}', '삽입 정렬 (Insertion Sort)', '현재 요소를 이미 정렬된 부분의 올바른 위치에 삽입합니다. 최선 O(N), 최악 O(N^2). 거의 정렬된 배열에서 효율적입니다.', ARRAY['"삽입 정렬"', '"시간 복잡도"', '"정렬 알고리즘"'], NULL, NULL),
(10267, 'cpp', 'cpp-23', '어려움', '합병 정렬(Merge Sort)의 시간 복잡도와 특징으로 올바른 것은?', '// Merge Sort 개념
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}', ARRAY['"O(N^2), 제자리 정렬"', '"O(N log N), 추가 메모리 O(N) 필요"', '"O(N log N), 추가 메모리 불필요"', '"O(N), 분할 정복"'], 1, '합병 정렬은 분할 정복으로 항상 O(N log N)이지만, 합병 과정에서 추가 배열(O(N) 메모리)이 필요합니다.', '합병 정렬 (Merge Sort)', '분할 정복 알고리즘으로 항상 O(N log N)을 보장합니다. 안정 정렬이지만 O(N) 추가 메모리가 필요합니다.', ARRAY['"합병 정렬"', '"분할 정복"', '"안정 정렬"'], NULL, NULL),
(10268, 'cpp', 'cpp-20', '어려움', '다음 중 시간 복잡도가 가장 큰 것은?', '// A: O(log N)  - 이진 탐색
// B: O(N)      - 선형 탐색
// C: O(N log N) - 합병 정렬
// D: O(N^2)    - 버블 정렬', ARRAY['"O(log N)"', '"O(N)"', '"O(N log N)"', '"O(N^2)"'], 3, 'N이 커질수록: O(log N) < O(N) < O(N log N) < O(N^2). N=1000이면 O(N^2)=1,000,000으로 가장 큽니다.', '시간 복잡도 비교', 'O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!) 순서로 증가합니다.', ARRAY['"시간 복잡도"', '"빅오 표기법"', '"알고리즘 분석"'], NULL, NULL),
(10269, 'cpp', 'algo-preview', '어려움', '다음 투 포인터 코드는 무엇을 수행하나요?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 6, 8, 9};
    int target = 10;
    int left = 0, right = v.size() - 1;
    while (left < right) {
        int sum = v[left] + v[right];
        if (sum == target) {
            cout << v[left] << " " << v[right];
            break;
        } else if (sum < target) left++;
        else right--;
    }
    return 0;
}', ARRAY['"배열에서 최대/최소값 찾기"', '"정렬된 배열에서 합이 target인 두 수 찾기"', '"배열의 중앙값 찾기"', '"이진 탐색으로 target 찾기"'], 1, '양쪽 끝에서 시작하는 투 포인터로, 합이 작으면 left++, 크면 right--하여 합이 target인 쌍을 O(N)에 찾습니다.', '투 포인터 (Two Pointer)', '정렬된 배열에서 두 포인터를 양쪽 끝에서 좁혀가며 조건을 만족하는 쌍을 O(N)에 찾는 기법입니다.', ARRAY['"투 포인터"', '"정렬"', '"two sum"'], NULL, NULL),
(10270, 'cpp', 'algo-preview', '어려움', '다음 슬라이딩 윈도우 코드에서 크기 3인 윈도우의 최대 합은?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {2, 1, 5, 1, 3, 2};
    int k = 3;
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += v[i];
    maxSum = windowSum;
    for (int i = k; i < (int)v.size(); i++) {
        windowSum += v[i] - v[i - k];
        maxSum = max(maxSum, windowSum);
    }
    cout << maxSum;
    return 0;
}', ARRAY['"8"', '"9"', '"11"', '"6"'], 1, '크기 3인 윈도우의 합: {2,1,5}=8, {1,5,1}=7, {5,1,3}=9, {1,3,2}=6. 최대값은 9입니다.', '슬라이딩 윈도우 (Sliding Window)', '고정 크기 윈도우를 한 칸씩 이동하며, 새로 들어온 요소를 더하고 나간 요소를 빼서 O(N)에 부분합을 계산합니다.', ARRAY['"슬라이딩 윈도우"', '"부분합"', '"최적화"'], NULL, NULL),
(10271, 'cpp', 'algo-preview', '어려움', '다음 백트래킹 코드는 N=3일 때 무엇을 출력하나요?', '#include <iostream>
#include <vector>
using namespace std;

void solve(int n, int depth, vector<int>& path, vector<bool>& used) {
    if (depth == n) {
        for (int x : path) cout << x;
        cout << " ";
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path.push_back(i);
            solve(n, depth + 1, path, used);
            path.pop_back();
            used[i] = false;
        }
    }
}

int main() {
    int n = 3;
    vector<int> path;
    vector<bool> used(n + 1, false);
    solve(n, 0, path, used);
}', ARRAY['"123"', '"111 222 333"', '"123 132 213 231 312 321"', '"12 13 21 23 31 32"'], 2, '이 코드는 1~N의 모든 순열을 생성합니다. N=3이면 3!=6개의 순열이 출력됩니다.', '백트래킹으로 순열 생성', '백트래킹은 해를 탐색하다 조건에 맞지 않으면 되돌아가는 기법입니다. 순열 생성에서 used 배열로 중복 사용을 방지합니다.', ARRAY['"백트래킹"', '"순열"', '"재귀"', '"DFS"'], NULL, NULL),
(10272, 'cpp', 'algo-preview', '어려움', 'N개에서 R개를 고르는 조합의 재귀식으로 올바른 것은?', 'int C(int n, int r) {
    if (r == 0 || r == n) return 1;
    return ______;
}
// C(5, 2) = 10', ARRAY['"C(n-1, r) + C(n-1, r-1)"', '"C(n-1, r) * C(n-1, r-1)"', '"C(n, r-1) + C(n-1, r)"', '"n * C(n-1, r-1)"'], 0, '파스칼의 삼각형: C(n,r) = C(n-1,r) + C(n-1,r-1). n번째 원소를 포함하는 경우와 안 하는 경우의 합입니다.', '조합 (Combination) 재귀', 'C(n,r) = C(n-1,r) + C(n-1,r-1)은 파스칼의 항등식입니다. 메모이제이션과 함께 사용하면 효율적입니다.', ARRAY['"조합"', '"파스칼의 삼각형"', '"재귀"', '"DP"'], NULL, NULL),
(10273, 'cpp', 'algo-preview', '어려움', '그래프를 인접 행렬과 인접 리스트로 표현할 때의 차이로 올바른 것은?', '// 인접 행렬
int adj[N][N];  // adj[i][j] = 1이면 간선 존재

// 인접 리스트
vector<vector<int>> adj(N);  // adj[i] = i에서 갈 수 있는 노드들', ARRAY['"인접 행렬은 O(V), 인접 리스트는 O(V^2) 공간 사용"', '"인접 행렬은 O(V^2) 공간, 인접 리스트는 O(V+E) 공간 사용"', '"둘 다 O(V^2) 공간 사용"', '"인접 리스트가 항상 더 느리다"'], 1, '인접 행렬은 V×V 배열로 O(V^2), 인접 리스트는 노드+간선 수만큼 O(V+E) 공간을 사용합니다. 희소 그래프에서는 인접 리스트가 효율적입니다.', '그래프 표현: 인접 행렬 vs 인접 리스트', '인접 행렬: 간선 존재 여부를 O(1)에 확인, O(V^2) 공간. 인접 리스트: O(V+E) 공간, 희소 그래프에 적합.', ARRAY['"그래프"', '"인접 행렬"', '"인접 리스트"', '"BFS/DFS"'], NULL, NULL),
(10274, 'cpp', 'algo-preview', '어려움', '다음 유니온 파인드 코드에서 find 함수의 역할은?', 'int parent[1001];

int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a != b) parent[a] = b;
}', ARRAY['"x의 부모 노드만 반환한다"', '"x가 속한 집합의 루트(대표 원소)를 반환하며 경로를 압축한다"', '"x의 자식 노드 개수를 반환한다"', '"x를 새로운 집합에 추가한다"'], 1, 'find(x)는 루트를 찾으면서 parent[x] = find(parent[x])로 경로 압축을 수행하여 이후 탐색을 O(1)에 가깝게 만듭니다.', '유니온 파인드 (Union-Find / DSU)', '서로소 집합을 관리하는 자료구조입니다. find로 대표 원소를 찾고, unite로 두 집합을 합칩니다. 경로 압축으로 거의 O(1)에 동작합니다.', ARRAY['"유니온 파인드"', '"DSU"', '"경로 압축"', '"그래프"'], NULL, NULL),
(10275, 'cpp', 'algo-preview', '어려움', '다음 prefix sum (누적 합) 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 7, 9};
    vector<int> prefix(6, 0);
    for (int i = 0; i < 5; i++)
        prefix[i+1] = prefix[i] + arr[i];
    // 구간 [1, 3]의 합 (인덱스 1부터 3까지)
    cout << prefix[4] - prefix[1];
    return 0;
}', ARRAY['"15"', '"16"', '"9"', '"12"'], 0, 'prefix = {0,1,4,9,16,25}. 구간 [1,3]의 합 = prefix[4] - prefix[1] = 16 - 1 = 15 (3+5+7)', '누적 합 (Prefix Sum)', 'prefix[i] = arr[0]+...+arr[i-1]. 구간 [l,r]의 합 = prefix[r+1] - prefix[l]. 전처리 O(N), 쿼리 O(1).', ARRAY['"누적 합"', '"prefix sum"', '"구간 합"', '"USACO"'], NULL, '{"wrong":"// 매번 반복으로 구간 합: O(N) per query\nint sum = 0;\nfor (int i = l; i <= r; i++) sum += arr[i];","correct":"// 누적 합으로 구간 합: O(1) per query\nint sum = prefix[r+1] - prefix[l];"}'::jsonb),
(10276, 'cpp', 'algo-preview', '어려움', '다음 코드는 어떤 알고리즘 기법을 사용하나요?', '#include <iostream>
#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int maxProfit = 0;
    for (int i = 1; i < prices.size(); i++) {
        minPrice = min(minPrice, prices[i]);
        maxProfit = max(maxProfit, prices[i] - minPrice);
    }
    return maxProfit;
}

int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    cout << maxProfit(prices);  // 출력: 5
    return 0;
}', ARRAY['"브루트 포스"', '"분할 정복"', '"그리디 (탐욕법)"', '"동적 프로그래밍"'], 2, '지금까지의 최소 가격을 추적하며 매 시점에서 최대 이익을 갱신하는 그리디 접근입니다. O(N)에 해결됩니다.', '그리디 알고리즘 활용', '그리디는 매 순간 최적의 선택을 하여 전체 최적해를 구합니다. 항상 최적해를 보장하지는 않으므로 증명이 필요합니다.', ARRAY['"그리디"', '"주식 문제"', '"최적화"'], NULL, NULL),
(10277, 'cpp', 'algo-preview', '어려움', '다음 재귀 함수는 무엇을 계산하나요?', '#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    cout << gcd(12, 8);
    return 0;
}', ARRAY['"96"', '"4"', '"2"', '"24"'], 1, '유클리드 알고리즘으로 최대공약수(GCD)를 구합니다. gcd(12,8) → gcd(8,4) → gcd(4,0) → 4', '유클리드 알고리즘 (GCD)', 'gcd(a,b) = gcd(b, a%b), b=0이면 a가 최대공약수. 재귀적으로 O(log(min(a,b)))에 계산됩니다.', ARRAY['"GCD"', '"유클리드 알고리즘"', '"재귀"', '"LCM"'], NULL, NULL),
(10278, 'cpp', 'algo-preview', '어려움', '다음 코드에서 N=4일 때 재귀 호출 횟수(fib 함수 호출 총 횟수)는?', '#include <iostream>
using namespace std;

int callCount = 0;

int fib(int n) {
    callCount++;
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    fib(4);
    cout << callCount;
    return 0;
}', ARRAY['"4"', '"5"', '"7"', '"9"'], 3, 'fib(4)→fib(3)+fib(2), fib(3)→fib(2)+fib(1), fib(2)→fib(1)+fib(0). 총 9번 호출됩니다. 이것이 메모이제이션이 필요한 이유입니다.', '재귀의 비효율성과 메모이제이션', '단순 재귀 피보나치는 O(2^N)의 시간 복잡도를 가집니다. 메모이제이션(dp 배열)을 사용하면 O(N)으로 줄일 수 있습니다.', ARRAY['"재귀"', '"메모이제이션"', '"DP"', '"시간 복잡도"'], NULL, '{"wrong":"int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);  // O(2^N)","correct":"int dp[100] = {0};\nint fib(int n) {\n    if (n <= 1) return n;\n    if (dp[n]) return dp[n];\n    return dp[n] = fib(n-1) + fib(n-2);  // O(N)"}'::jsonb),
(10279, 'cpp', 'algo-preview', '어려움', '다음 코드에서 N=5일 때 배열에 1~5의 합을 저장하는 prefix sum의 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int prefix[6];
    prefix[0] = 0;
    for (int i = 0; i < 5; i++)
        prefix[i+1] = prefix[i] + arr[i];
    cout << prefix[3] << " " << prefix[5];
    return 0;
}', ARRAY['"3 15"', '"6 15"', '"6 10"', '"3 5"'], 1, 'prefix = {0, 1, 3, 6, 10, 15}. prefix[3] = 1+2+3 = 6, prefix[5] = 1+2+3+4+5 = 15', 'Prefix Sum 배열 구성', 'prefix[i]는 arr[0]~arr[i-1]까지의 합입니다. prefix[0]=0으로 시작하여 구간 합 계산을 일관되게 처리합니다.', ARRAY['"prefix sum"', '"누적 합"', '"구간 쿼리"'], NULL, NULL),
(10280, 'cpp', 'algo-preview', '어려움', '다음 코드에서 그래프의 간선 수(E)를 구하면?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 4;
    vector<vector<int>> adj(n);
    adj[0].push_back(1);
    adj[1].push_back(0);
    adj[0].push_back(2);
    adj[2].push_back(0);
    adj[1].push_back(3);
    adj[3].push_back(1);
    
    int totalEdges = 0;
    for (int i = 0; i < n; i++)
        totalEdges += adj[i].size();
    totalEdges /= 2;
    cout << totalEdges;
    return 0;
}', ARRAY['"3"', '"4"', '"6"', '"2"'], 0, '무방향 그래프에서 각 간선은 양쪽에 저장됩니다. 총 push_back = 6, 6/2 = 3개의 간선입니다.', '무방향 그래프의 간선 수 계산', '무방향 그래프에서 인접 리스트의 총 크기는 2E(간선 수의 2배)입니다. 양쪽에 모두 저장되기 때문입니다.', ARRAY['"그래프"', '"인접 리스트"', '"간선"'], NULL, NULL),
(10281, 'cpp', 'algo-preview', '어려움', '다음 코드에서 N=4일 때 이진수 조합(부분집합)의 개수는?', '#include <iostream>
using namespace std;

int main() {
    int n = 4;
    int count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        count++;
    }
    cout << count;
    return 0;
}', ARRAY['"4"', '"8"', '"16"', '"32"'], 2, '1 << 4 = 16. mask는 0000부터 1111까지 모든 4비트 조합을 순회합니다. 2^4 = 16개의 부분집합이 있습니다.', '비트마스크로 부분집합 열거', 'N개의 원소의 모든 부분집합은 2^N개입니다. 비트마스크 0~(2^N-1)로 각 원소의 포함 여부를 표현할 수 있습니다.', ARRAY['"비트마스크"', '"부분집합"', '"비트 연산"'], NULL, NULL),
(10282, 'cpp', 'algo-preview', '어려움', '다음 코드의 시간 복잡도는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 1000;
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    int count = 0;
    for (int i = 2; i <= n; i++)
        if (isPrime[i]) count++;
    cout << count;
    return 0;
}', ARRAY['"O(N)"', '"O(N log N)"', '"O(N log log N)"', '"O(N^2)"'], 2, '에라토스테네스의 체는 O(N log log N) 시간 복잡도를 가집니다. 각 소수의 배수를 지우는 과정의 합이 N log log N에 수렴합니다.', '에라토스테네스의 체 (Sieve of Eratosthenes)', '2부터 시작하여 각 소수의 배수를 지워가며 소수를 찾습니다. O(N log log N)으로 매우 효율적인 소수 판별법입니다.', ARRAY['"에라토스테네스의 체"', '"소수"', '"시간 복잡도"', '"USACO"'], NULL, NULL),
(10283, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int count = 0;
    for (int i = 2; i <= 20; i++) {
        bool isPrime = true;
        for (int j = 2; j * j <= i; j++) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) count++;
    }
    cout << count;
    return 0;
}', ARRAY['"6"', '"7"', '"8"', '"9"'], 2, '2~20 사이 소수는 2,3,5,7,11,13,17,19로 총 8개입니다.', '소수 판별 알고리즘', 'j*j <= i까지만 검사하면 됩니다. 약수는 쌍으로 존재하므로 sqrt(i)까지만 확인하면 충분합니다.', ARRAY['"소수"', '"최적화"', '"break 활용"'], NULL, NULL),
(10284, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

int main() {
    cout << fib(7);
    return 0;
}', ARRAY['"8"', '"13"', '"21"', '"5"'], 1, '피보나치 수열: 0,1,1,2,3,5,8,13. fib(7) = 13입니다. fib(0)=0, fib(1)=1부터 시작합니다.', '피보나치 재귀', 'fib(n) = fib(n-1) + fib(n-2). 단순 재귀는 O(2^n)으로 느리고, 메모이제이션이나 DP로 개선합니다.', ARRAY['"피보나치"', '"메모이제이션"', '"동적 프로그래밍"'], NULL, NULL),
(10285, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n-1, from, aux, to);
    cout << from << "->" << to << " ";
    hanoi(n-1, aux, to, from);
}

int main() {
    hanoi(2, ''A'', ''C'', ''B'');
    return 0;
}', ARRAY['"A->C"', '"A->B A->C B->C"', '"A->C A->B C->B"', '"A->B B->C A->C"'], 1, '하노이의 탑 2개: A→B(보조), A→C(목표), B→C(보조에서 목표로). 총 3번 이동합니다.', '하노이의 탑', 'n개의 원반을 옮기려면 2^n - 1번 이동이 필요합니다. 재귀의 대표적인 예제입니다.', ARRAY['"하노이의 탑"', '"재귀"', '"분할 정복"'], NULL, NULL),
(10286, 'cpp', 'cpp-20', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    cout << count;
    return 0;
}', ARRAY['"10"', '"2"', '"1"', '"4"'], 1, 'n &= (n-1)은 n의 가장 낮은 1비트를 제거합니다. 10(1010) → 8(1000) → 0. 1비트가 2개이므로 count=2.', '비트 카운팅 (Brian Kernighan)', 'n &= (n-1)은 가장 낮은 set bit를 제거합니다. 반복 횟수가 1의 개수(popcount)입니다.', ARRAY['"비트 연산"', '"popcount"', '"USACO"'], NULL, NULL),
(10287, 'cpp', 'cpp-20', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};
    nth_element(v.begin(), v.begin() + 2, v.end());
    cout << v[2];
    return 0;
}', ARRAY['"1"', '"3"', '"4"', '"알 수 없음"'], 1, 'nth_element는 n번째 원소가 정렬된 위치의 값이 되도록 재배치합니다. 인덱스 2에는 정렬 시 3번째 작은 값(3)이 옵니다.', 'nth_element', 'nth_element는 O(N)으로 k번째 원소를 찾습니다. 완전 정렬보다 빠르며, USACO에서 자주 사용됩니다.', ARRAY['"nth_element"', '"부분 정렬"', '"USACO"'], NULL, NULL),
(10288, 'cpp', 'algo-preview', '어려움', '다음 재귀 코드의 시간 복잡도는?', 'int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
// fib(30) 호출', ARRAY['"O(N)"', '"O(N log N)"', '"O(2^N)"', '"O(N^2)"'], 2, '단순 재귀 피보나치는 각 호출이 2개의 재귀 호출을 만들어 O(2^N)입니다. 매우 비효율적입니다.', '재귀의 시간 복잡도', '단순 재귀는 중복 계산이 많아 지수 시간이 됩니다. 메모이제이션으로 O(N)으로 개선 가능합니다.', ARRAY['"시간 복잡도"', '"메모이제이션"', '"DP"'], NULL, NULL),
(10289, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i+1], arr[hi]);
    return i + 1;
}

int main() {
    int arr[] = {3, 6, 8, 10, 1, 2, 1};
    int p = partition(arr, 0, 6);
    cout << "피벗 위치: " << p << " 값: " << arr[p];
    return 0;
}', ARRAY['"피벗 위치: 0 값: 1"', '"피벗 위치: 1 값: 1"', '"피벗 위치: 3 값: 1"', '"피벗 위치: 6 값: 1"'], 1, '피벗은 arr[6]=1. 1 이하인 원소는 1개(arr[4]=1). 피벗이 인덱스 1에 위치하게 됩니다.', '퀵소트 파티션', '파티션은 피벗보다 작은 원소를 왼쪽, 큰 원소를 오른쪽으로 분리합니다. 퀵소트의 핵심 연산입니다.', ARRAY['"퀵소트"', '"파티션"', '"분할 정복"'], NULL, NULL),
(10290, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<vector<int>> dp(3, vector<int>(3, 0));
    for (int i = 0; i < 3; i++) dp[i][0] = 1;
    for (int j = 0; j < 3; j++) dp[0][j] = 1;
    for (int i = 1; i < 3; i++)
        for (int j = 1; j < 3; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    cout << dp[2][2];
    return 0;
}', ARRAY['"4"', '"6"', '"9"', '"3"'], 1, '격자 경로 수 DP입니다. dp = {{1,1,1},{1,2,3},{1,3,6}}. dp[2][2] = 6 (3×3 격자의 경로 수).', '격자 경로 DP', '오른쪽/아래로만 이동할 때 경로 수를 DP로 구합니다. dp[i][j] = dp[i-1][j] + dp[i][j-1].', ARRAY['"DP"', '"격자 경로"', '"USACO"'], NULL, NULL),
(10291, 'cpp', 'cpp-20', '어려움', '다음 USACO 스타일 문제에서 올바른 출력은?

N마리의 소가 일렬로 서 있다. 각 소의 키가 주어질 때, 키가 가장 큰 소의 인덱스(0-based)를 출력하시오.', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> heights = {3, 7, 2, 9, 5};
    auto it = max_element(heights.begin(), heights.end());
    cout << (it - heights.begin());
    return 0;
}', ARRAY['"9"', '"3"', '"4"', '"1"'], 1, 'max_element는 최댓값의 iterator를 반환합니다. 9가 인덱스 3에 있으므로 it - begin = 3.', 'max_element와 인덱스', 'max_element는 최댓값의 iterator를 반환합니다. begin()을 빼면 인덱스를 구할 수 있습니다.', ARRAY['"max_element"', '"iterator"', '"USACO"'], NULL, NULL),
(10292, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 2D prefix sum
    vector<vector<int>> grid = {{1,2,3},{4,5,6},{7,8,9}};
    int n = 3;
    vector<vector<int>> ps(n+1, vector<int>(n+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            ps[i][j] = grid[i-1][j-1] + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1];
    // (1,1) ~ (2,2) 부분합 (0-indexed: (0,0)~(1,1))
    int sum = ps[2][2] - ps[0][2] - ps[2][0] + ps[0][0];
    cout << sum;
    return 0;
}', ARRAY['"12"', '"15"', '"10"', '"45"'], 0, '(0,0)~(1,1) 영역의 합 = 1+2+4+5 = 12. 2D 누적합으로 O(1)에 부분 영역의 합을 구합니다.', '2D 누적합 (Prefix Sum)', '2D 누적합으로 임의의 직사각형 영역의 합을 O(1)에 구할 수 있습니다. USACO에서 자주 출제됩니다.', ARRAY['"누적합"', '"2D prefix sum"', '"USACO"'], NULL, NULL),
(10293, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 투 포인터로 정렬된 배열에서 합이 target인 쌍 찾기
    vector<int> v = {1, 3, 5, 7, 9, 11};
    int target = 12;
    int lo = 0, hi = v.size() - 1;
    while (lo < hi) {
        int sum = v[lo] + v[hi];
        if (sum == target) {
            cout << v[lo] << "+" << v[hi];
            break;
        }
        else if (sum < target) lo++;
        else hi--;
    }
    return 0;
}', ARRAY['"1+11"', '"3+9"', '"5+7"', '"1+11 또는 3+9"'], 0, 'lo=0(1), hi=5(11). 1+11=12=target이므로 첫 번째 시도에서 찾습니다. 1+11이 출력됩니다.', '투 포인터 기법', '정렬된 배열에서 두 포인터를 양 끝에서 시작하여 O(N)으로 합이 target인 쌍을 찾습니다.', ARRAY['"투 포인터"', '"정렬"', '"USACO"'], NULL, NULL),
(10294, 'cpp', 'algo-preview', '어려움', '다음 코드의 시간 복잡도는?', 'int power(int base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        int half = power(base, exp / 2);
        return half * half;
    }
    return base * power(base, exp - 1);
}', ARRAY['"O(N)"', '"O(log N)"', '"O(N log N)"', '"O(2^N)"'], 1, '짝수일 때 exp를 절반으로 줄이므로 O(log N)입니다. 빠른 거듭제곱(fast exponentiation) 알고리즘입니다.', '빠른 거듭제곱', 'exp를 절반씩 줄여 O(log N)으로 거듭제곱을 계산합니다. 큰 수 모듈로 연산에 필수적입니다.', ARRAY['"빠른 거듭제곱"', '"O(log N)"', '"분할 정복"'], NULL, NULL),
(10295, 'cpp', 'cpp-20', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(1);
    pq.push(5);
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    return 0;
}', ARRAY['"1 1 3 4 5"', '"5 4 3 1 1"', '"3 1 4 1 5"', '"1 3 1 4 5"'], 1, 'priority_queue는 기본적으로 max-heap입니다. 가장 큰 원소가 top()에 위치합니다. 5 4 3 1 1 순서로 출력.', '우선순위 큐', 'priority_queue는 기본 max-heap으로 가장 큰 원소를 먼저 꺼냅니다. min-heap은 greater<int>를 사용합니다.', ARRAY['"priority_queue"', '"힙"', '"USACO"'], NULL, NULL),
(10296, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는? (그래프 BFS)', '#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    vector<vector<int>> adj = {{1,2},{0,3},{0,3},{1,2}};
    vector<bool> visited(4, false);
    queue<int> q;
    q.push(0);
    visited[0] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int next : adj[node]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
    return 0;
}', ARRAY['"0 1 2 3"', '"0 2 1 3"', '"3 2 1 0"', '"0 1 3 2"'], 0, 'BFS: 0 방문 → 1,2 큐에 추가 → 1 방문 → 3 추가 → 2 방문 → 3 방문. 순서: 0 1 2 3.', 'BFS (너비 우선 탐색)', 'BFS는 큐를 사용하여 가까운 노드부터 탐색합니다. 최단 경로 탐색에 사용됩니다.', ARRAY['"BFS"', '"그래프"', '"큐"', '"USACO"'], NULL, NULL),
(10297, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는? (DFS)', '#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> visited;

void dfs(int node) {
    visited[node] = true;
    cout << node << " ";
    for (int next : adj[node])
        if (!visited[next]) dfs(next);
}

int main() {
    adj = {{1,2},{0,3},{0},{1}};
    visited.assign(4, false);
    dfs(0);
    return 0;
}', ARRAY['"0 1 2 3"', '"0 1 3 2"', '"0 2 1 3"', '"3 1 0 2"'], 1, 'DFS: 0→1(첫 이웃)→3(1의 이웃)→(백트래킹)→2(0의 둘째 이웃). 순서: 0 1 3 2.', 'DFS (깊이 우선 탐색)', 'DFS는 재귀/스택으로 깊이 방향으로 탐색합니다. 연결 요소, 사이클 탐지 등에 사용됩니다.', ARRAY['"DFS"', '"재귀"', '"그래프"', '"USACO"'], NULL, NULL),
(10298, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는? (DP: 최장 증가 부분 수열 길이)', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = a.size();
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (a[j] < a[i])
                dp[i] = max(dp[i], dp[j] + 1);
    cout << *max_element(dp.begin(), dp.end());
    return 0;
}', ARRAY['"3"', '"4"', '"5"', '"6"'], 1, 'LIS 예: 1,4,5,9 (길이 4) 또는 1,4,5,6 (길이 4). dp배열: [1,1,2,1,3,4,2,4]. 최댓값은 4.', '최장 증가 부분 수열 (LIS)', 'dp[i]는 a[i]로 끝나는 LIS 길이입니다. O(N^2) 풀이이며, 이진 탐색으로 O(N log N)도 가능합니다.', ARRAY['"LIS"', '"DP"', '"USACO"'], NULL, NULL),
(10299, 'cpp', 'algo-preview', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 메모이제이션 피보나치
    int n = 10;
    vector<long long> memo(n + 1, -1);
    memo[0] = 0; memo[1] = 1;
    for (int i = 2; i <= n; i++)
        memo[i] = memo[i-1] + memo[i-2];
    cout << memo[10];
    return 0;
}', ARRAY['"34"', '"55"', '"89"', '"144"'], 1, '피보나치 수: 0,1,1,2,3,5,8,13,21,34,55. memo[10]=55입니다. 바텀업 DP 방식입니다.', '바텀업 DP (피보나치)', '재귀 대신 반복문으로 작은 문제부터 해결합니다. O(N) 시간, O(N) 공간이며, 단순 재귀의 O(2^N)보다 훨씬 빠릅니다.', ARRAY['"DP"', '"피보나치"', '"바텀업"'], NULL, NULL),
(10300, 'cpp', 'algo-preview', '어려움', '다음 USACO 스타일 코드에서 그리디 알고리즘의 결과는?

활동 선택 문제: N개의 활동이 (시작, 끝) 시간으로 주어질 때 겹치지 않게 최대 몇 개를 선택할 수 있는가?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> acts = {{1,3},{2,5},{3,4},{4,7},{5,6},{6,8}};
    sort(acts.begin(), acts.end(), [](auto& a, auto& b) {
        return a.second < b.second;
    });
    int count = 0, lastEnd = 0;
    for (auto& [s, e] : acts) {
        if (s >= lastEnd) {
            count++;
            lastEnd = e;
        }
    }
    cout << count;
    return 0;
}', ARRAY['"2"', '"3"', '"4"', '"5"'], 2, '끝나는 시간 기준 정렬 후 그리디: (1,3)선택→(3,4)선택→(5,6)선택→(6,8)선택 = 4개.', '활동 선택 문제 (그리디)', '끝나는 시간이 빠른 순으로 정렬한 뒤, 겹치지 않는 활동을 탐욕적으로 선택합니다. 최적해가 보장됩니다.', ARRAY['"그리디"', '"활동 선택"', '"정렬"', '"USACO"'], NULL, NULL),
(10324, 'cpp', 'cpp-4', '보통', '다음 코드에서 ''김 철수''를 입력했을 때 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    cout << "안녕, " << name << "!" << endl;
    return 0;
}', ARRAY['"안녕, 김 철수!"', '"안녕, 김!"', '"안녕, !"', '"런타임 오류"'], 1, 'cin >>은 공백(띄어쓰기)을 기준으로 입력을 분리합니다. ''김 철수''에서 공백 전의 ''김''까지만 읽힙니다. 띄어쓰기가 포함된 이름을 전부 읽으려면 getline()을 써야 합니다.', 'cin >>의 공백 처리', 'cin >>은 공백, 탭, 엔터를 구분자로 사용합니다. 공백이 포함된 문자열 전체를 읽으려면 getline(cin, 변수)을 사용해야 합니다.', ARRAY['"cin"', '"공백"', '"문자열 입력"'], NULL, NULL),
(10325, 'cpp', 'cpp-4', '보통', '띄어쓰기가 포함된 한 줄 전체를 읽는 올바른 코드는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    // 한 줄 전체 입력받기
    _______________
    cout << line << endl;
    return 0;
}', ARRAY['"cin >> line;"', '"getline(cin, line);"', '"cin.get(line);"', '"read(cin, line);"'], 1, 'getline(cin, line)은 엔터를 누를 때까지의 문자 전체(공백 포함)를 읽습니다. cin >>은 공백 전까지만 읽습니다.', 'getline() 함수', 'getline(cin, 변수)는 줄바꿈 전까지 모든 문자(공백 포함)를 읽어 string에 저장합니다. Python의 input()과 동작이 같습니다.', ARRAY['"getline"', '"cin"', '"문자열"', '"공백 처리"'], NULL, NULL),
(10326, 'cpp', 'cpp-4', '보통', '다음 코드를 실행할 때, 나이에 20, 이름에 ''홍길동''을 입력하면 어떤 문제가 생기나?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string name;
    cout << "나이: "; cin >> age;
    cout << "이름: "; getline(cin, name);
    cout << age << "살 " << name << endl;
    return 0;
}', ARRAY['"정상 출력: 20살 홍길동"', '"name이 비어있어 ''20살 ''만 출력된다"', '"age 입력이 안 된다"', '"컴파일 오류"'], 1, 'cin >> age 후 버퍼에 ''\n''(엔터)이 남아있어서, getline()이 그 엔터를 읽고 바로 종료됩니다. 그래서 name이 빈 문자열이 됩니다.', 'cin >> 후 getline() 버퍼 문제', 'cin >>은 입력을 읽고 엔터를 버퍼에 남깁니다. 이후 getline()을 쓰면 그 엔터를 읽어버립니다. cin.ignore()로 남은 엔터를 제거해야 합니다.', ARRAY['"cin.ignore"', '"getline"', '"입력 버퍼"', '"버퍼 비우기"'], NULL, NULL),
(10327, 'cpp', 'cpp-4', '보통', 'cin >> 후 getline()을 쓸 때 버퍼에 남은 엔터를 제거하는 올바른 코드는?', 'int main() {
    int age;
    string name;
    cin >> age;
    _____________  // 버퍼의 엔터 제거
    getline(cin, name);
    cout << age << "살 " << name << endl;
}', ARRAY['"cin.clear();"', '"cin.ignore();"', '"cin.flush();"', '"cin.reset();"'], 1, 'cin.ignore()는 버퍼에 남은 문자 하나(엔터)를 버립니다. cin >> 후 getline()을 쓸 때는 반드시 cin.ignore()를 먼저 호출해야 합니다.', 'cin.ignore()로 버퍼 비우기', 'cin.ignore()는 입력 스트림에서 문자 1개를 버립니다. cin >> 후 남은 엔터를 제거할 때 사용합니다. cin.ignore(1000, ''\n'')으로 특정 문자까지 버릴 수도 있습니다.', ARRAY['"cin.ignore"', '"입력 버퍼"', '"getline"', '"cin"'], NULL, NULL),
(10328, 'cpp', 'cpp-4', '쉬움', '다음 코드에서 ''10 20 30''을 입력했을 때 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << a + b + c << endl;
    return 0;
}', ARRAY['"102030"', '"60"', '"10"', '"컴파일 오류"'], 1, 'cin >> a >> b >> c 처럼 연속으로 연결하면 공백/엔터로 구분된 세 값을 차례로 읽습니다. 10+20+30=60.', 'cin 연속 입력', 'cin >> a >> b >> c처럼 >>를 연결하면 여러 값을 한 번에 입력받을 수 있습니다. Python의 a, b, c = map(int, input().split())과 같은 역할입니다.', ARRAY['"cin"', '"연속 입력"', '"다중 변수"'], NULL, NULL),
(10329, 'cpp', 'cpp-1', '쉬움', 'C++이 파이썬보다 빠른 핵심 이유는?', '', ARRAY['"문법이 더 엄격해서"', '"소스코드를 미리 기계어로 컴파일하기 때문에"', '"변수 타입을 명시해서"', '"세미콜론이 있어서"'], 1, 'C++은 실행 전에 소스코드 전체를 기계어(0과 1)로 컴파일합니다. 파이썬은 한 줄씩 해석하며 실행하므로 더 느려요.', '컴파일 vs 인터프리터', '컴파일: 전체 코드를 기계어로 변환 후 실행 (빠름). 인터프리터: 코드를 한 줄씩 해석하며 실행 (느리지만 편리).', ARRAY['"컴파일"', '"인터프리터"', '"기계어"', '"성능"'], NULL, NULL),
(10330, 'cpp', 'cpp-1', '쉬움', 'C++에서 화면에 ''Hello''를 출력하는 올바른 코드는?', '#include <iostream>

int main() {
    ___
    return 0;
}', ARRAY['"print(\"Hello\")"', '"std::cout << \"Hello\" << std::endl;"', '"System.out.println(\"Hello\");"', '"echo \"Hello\";"'], 1, 'C++에서 출력은 std::cout을 사용합니다. std::cout << "Hello" << std::endl; 형태로 씁니다. print()는 파이썬, System.out.println()은 Java, echo는 PHP/Shell입니다.', 'std::cout 출력', 'std::cout은 C++의 표준 출력 스트림입니다. <<(삽입 연산자)로 출력할 값을 연결하고, std::endl로 줄바꿈합니다.', ARRAY['"std::cout"', '"출력"', '"#include <iostream>"'], NULL, NULL),
(10331, 'cpp', 'cpp-1', '쉬움', 'C++ 소스파일을 컴파일하는 명령어는? (g++ 컴파일러 사용)', '// 파일: hello.cpp
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}', ARRAY['"python hello.cpp"', '"run hello.cpp"', '"g++ hello.cpp -o hello"', '"compile hello.cpp"'], 2, 'g++ hello.cpp -o hello로 컴파일하면 hello라는 실행 파일이 생깁니다. -o는 output 파일명을 지정합니다. 이후 ./hello로 실행합니다.', 'g++ 컴파일 명령', 'g++ 소스파일.cpp -o 실행파일명 형식으로 컴파일합니다. 컴파일 오류가 있으면 실행 파일이 생성되지 않습니다.', ARRAY['"g++"', '"컴파일"', '"실행 파일"'], NULL, NULL),
(10332, 'cpp', 'cpp-1', '쉬움', '다음 중 올바른 C++ Hello World 코드는?', '', ARRAY['"#include <iostream>
int main() {
    std::cout << \"Hello\" << std::endl;
    return 0;
}"', '"#include <iostream>
return 0;
int main() {
    std::cout << \"Hello\" << std::endl;
}"', '"#include <iostream>
int main() {
    return 0;
    std::cout << \"Hello\" << std::endl;
}"', '"int main() {
    std::cout << \"Hello\" << std::endl;
    return 0;
}"'], 0, 'return 0;은 main() 안에서 모든 코드가 끝난 뒤 마지막에 씁니다. #include는 맨 위에, cout은 return 0; 앞에 와야 해요.', 'return 0의 위치', 'C++ 프로그램 구조: #include → int main() { → 실행 코드 → return 0; → }', ARRAY['"return 0"', '"main 함수"', '"프로그램 구조"', '"#include"'], NULL, NULL),
(10348, 'cpp', 'cpp-1', '쉬움', '#include <iostream>을 쓰는 이유는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Hello!";
    return 0;
}', ARRAY['"프로그램을 빠르게 실행하려고"', '"cout, cin 같은 입출력 기능을 쓰려고"', '"main 함수를 정의하려고"', '"C++ 문법을 활성화하려고"'], 1, '#include <iostream>은 입출력(Input/Output) 기능을 가져옵니다. 이게 없으면 cout을 쓸 수 없어요!', '#include <iostream>', '#include는 헤더 파일을 불러오는 명령입니다. <iostream>은 화면 출력(cout)과 키보드 입력(cin)을 포함합니다.', ARRAY['"#include"', '"헤더파일"', '"cout"', '"입출력"'], NULL, NULL),
(10349, 'cpp', 'cpp-1', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>

int main() {
    std::cout << "Hi!" << std::endl;
    return 0;
}', ARRAY['"Hi! endl"', '"std::cout Hi!"', '"Hi!"', '"에러"'], 2, 'std::cout은 화면에 내용을 출력하고, std::endl은 줄바꿈만 합니다. 화면에는 Hi!만 보입니다.', 'std::cout 출력 결과', 'std::cout << "텍스트" << std::endl;은 텍스트를 출력하고 줄을 바꿉니다. endl 자체는 화면에 출력되지 않습니다.', ARRAY['"std::cout"', '"std::endl"', '"출력"'], NULL, NULL),
(10350, 'cpp', 'cpp-1', '쉬움', '다음 코드에서 <<의 역할은?', 'cout << "Hello, World!" << endl;', ARRAY['"두 수를 비교한다"', '"cout에 출력할 내용을 전달(삽입)한다"', '"변수에 값을 저장한다"', '"줄바꿈을 한다"'], 1, '<<는 ''삽입 연산자''입니다. cout << "Hello"는 ''Hello를 cout(화면)에 넣어라''는 뜻이에요. 화살표가 오른쪽에서 왼쪽 방향으로 데이터를 흘려보낸다고 생각하면 됩니다.', '삽입 연산자 <<', 'cout << 값: cout에 값을 삽입(출력)합니다. << 연산자를 여러 번 연결할 수 있습니다: cout << "A" << "B" << endl;', ARRAY['"cout"', '"삽입 연산자"', '"출력"'], NULL, NULL),
(10351, 'cpp', 'cpp-1', '쉬움', 'endl을 사용하면 어떻게 되나요?', 'std::cout << "1번 줄" << std::endl;
std::cout << "2번 줄" << std::endl;', ARRAY['"프로그램을 종료한다"', '"줄바꿈(Enter)을 한다"', '"공백을 한 칸 넣는다"', '"화면을 지운다"'], 1, 'endl은 ''줄 끝(end of line)''의 줄임말로, 출력 후 줄을 바꿉니다. 위 코드를 실행하면 ''1번 줄''과 ''2번 줄''이 각각 다른 줄에 출력됩니다.', 'endl — 줄바꿈', 'endl은 줄바꿈 문자(\n)를 출력하고 출력 버퍼를 비웁니다. 화면에 Enter를 누른 것처럼 다음 줄로 넘어갑니다.', ARRAY['"endl"', '"줄바꿈"', '"cout"'], NULL, NULL),
(10352, 'cpp', 'cpp-1', '쉬움', 'C++ 소스 파일의 확장자는 무엇인가요?', '', ARRAY['".py"', '".java"', '".cpp"', '".txt"'], 2, 'C++ 소스 파일은 .cpp 확장자를 사용합니다. 예: main.cpp, hello.cpp. .py는 파이썬, .java는 자바 파일입니다.', '.cpp 확장자', 'C++ 소스 파일은 .cpp 또는 .cc 확장자를 사용합니다. 가장 흔한 건 .cpp (C Plus Plus의 약자)입니다.', ARRAY['".cpp"', '"소스 파일"', '"확장자"'], NULL, NULL),
(10353, 'cpp', 'cpp-1', '쉬움', '다음 Hello World 코드의 올바른 구조 순서는?', '// 순서가 뒤섞인 코드 — 올바른 순서는?
(A)     std::cout << "Hello, World!" << std::endl;
(B) }
(C) #include <iostream>
(D)     return 0;
(E) int main() {', ARRAY['"C → E → A → D → B"', '"E → C → A → D → B"', '"C → A → E → D → B"', '"A → C → E → D → B"'], 0, '#include가 맨 위, 그 다음 int main() {, 중괄호 안에 cout과 return 0;, 마지막으로 닫는 }입니다.', 'C++ 코드 구조', '① #include <iostream> → ② int main() { → ③ std::cout 출력 → ④ return 0; → ⑤ }', ARRAY['"코드 구조"', '"#include"', '"main 함수"', '"return 0"'], NULL, NULL),
(10354, 'cpp', 'cpp-1', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}', ARRAY['"Hello, World!"', '"\"Hello, World!\""', '"Hello World"', '"cout << Hello, World!"'], 0, 'cout은 큰따옴표 안의 내용만 출력합니다. 따옴표 자체는 출력되지 않아요. endl은 줄바꿈이므로 화면에는 Hello, World!만 보입니다.', '문자열 출력', 'cout << "텍스트"는 따옴표 안의 내용을 그대로 출력합니다. 따옴표 기호는 출력되지 않습니다.', ARRAY['"cout"', '"문자열"', '"출력"'], NULL, NULL),
(10355, 'cpp', 'cpp-1', '쉬움', '#include <iostream>을 빠뜨리면 어떻게 되나요?', '// #include <iostream> 없음!
using namespace std;
int main() {
    cout << "Hello!";
    return 0;
}', ARRAY['"정상적으로 실행된다"', '"컴파일 오류가 발생한다"', '"경고만 나오고 실행은 된다"', '"빈 화면이 출력된다"'], 1, '#include <iostream>이 없으면 cout을 찾을 수 없어 컴파일 오류가 납니다. 컴파일러는 ''이 cout이 뭔지 모르겠다''고 에러를 냅니다.', '컴파일 오류', '#include를 빼면 컴파일러가 cout을 인식하지 못해 오류가 발생합니다. 필요한 헤더 파일은 반드시 포함해야 합니다.', ARRAY['"#include"', '"컴파일 오류"', '"헤더파일"'], NULL, NULL),
(10356, 'cpp', 'cpp-1', '보통', '다음 코드에서 틀린 부분은?', '#include <iostream>
using namespace std;
int main() {
    cout << "안녕하세요"
    return 0;
}', ARRAY['"#include가 잘못됐다"', '"cout 줄 끝에 세미콜론(;)이 없다"', '"return 0이 필요 없다"', '"endl을 반드시 써야 한다"'], 1, 'C++은 모든 문장(statement) 끝에 세미콜론(;)이 필요합니다. cout << "안녕하세요"; 로 고쳐야 합니다.', '세미콜론(;)', 'C++에서 모든 문장은 세미콜론(;)으로 끝나야 합니다. 파이썬과 달리 줄바꿈만으로는 문장이 끝나지 않습니다.', ARRAY['"세미콜론"', '"문법 오류"', '"컴파일 오류"'], NULL, NULL),
(10357, 'cpp', 'cpp-1', '보통', 'C++ 프로그램과 Python 프로그램의 차이로 옳은 것은?', '', ARRAY['"C++은 코드를 한 줄씩 실행하고, Python은 먼저 전체를 컴파일한다"', '"C++은 컴파일 후 실행 파일을 만들고, Python은 코드를 바로 해석하며 실행한다"', '"C++과 Python 모두 인터프리터 방식이다"', '"C++은 브라우저에서만 실행된다"'], 1, 'C++은 컴파일 언어로, 소스 코드를 기계어로 번역한 실행 파일(.exe, a.out 등)을 만들고 실행합니다. Python은 인터프리터 언어로, 코드를 한 줄씩 해석하며 실행합니다.', '컴파일 vs 인터프리터', '컴파일 언어(C++): 전체 코드 → 기계어 변환 → 실행 파일 생성 → 실행 (빠름). 인터프리터 언어(Python): 코드를 한 줄씩 해석하며 실행 (유연함).', ARRAY['"컴파일"', '"인터프리터"', '"실행 방식"', '"Python vs C++"'], NULL, NULL),
(10358, 'cpp', 'cpp-1', '쉬움', '컴파일 후 생긴 a.out 파일을 실행하는 명령어는?', '', ARRAY['"run a.out"', '"execute a.out"', '"./a.out"', '"open a.out"'], 2, './a.out으로 실행합니다. 앞의 ./는 ''현재 폴더에 있는 파일''을 의미해요. 윈도우에서는 a.exe가 되기도 해요.', '실행 파일 실행 (./a.out)', 'g++ main.cpp로 컴파일 → a.out 생성 → ./a.out으로 실행. ./는 현재 디렉토리를 의미합니다.', ARRAY['"실행"', '"a.out"', '"터미널"'], NULL, NULL),
(10359, 'cpp', 'cpp-1', '쉬움', '컴파일 시 실행 파일 이름을 hello로 지정하는 명령어는?', '', ARRAY['"g++ main.cpp hello"', '"g++ -o hello main.cpp"', '"g++ main.cpp --name hello"', '"g++ main.cpp > hello"'], 1, '-o 옵션 뒤에 원하는 실행 파일 이름을 씁니다. g++ -o hello main.cpp → ./hello로 실행!', 'g++ -o 옵션', 'g++ -o 파일명 소스파일.cpp: 원하는 이름으로 실행 파일 생성. -o는 output(출력)의 줄임말입니다.', ARRAY['"g++"', '"-o 옵션"', '"컴파일"', '"실행 파일"'], NULL, NULL),
(10360, 'cpp', 'cpp-1', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>

int main() {
    std::cout << "A" << "B" << "C" << std::endl;
    return 0;
}', ARRAY['"A B C"', '"ABC"', '"A, B, C"', '"에러"'], 1, 'C++의 cout은 값을 자동으로 공백 없이 이어붙입니다. 공백이 필요하면 직접 " "를 넣어야 해요. 결과: ABC', 'cout 연속 출력', 'cout << "A" << "B" << "C"는 공백 없이 ABC를 출력합니다. 공백 원하면: cout << "A" << " " << "B"', ARRAY['"cout"', '"<<"', '"연속 출력"'], NULL, NULL),
(10361, 'cpp', 'cpp-1', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>

int main() {
    std::cout << "Hello";
    std::cout << "World";
    return 0;
}', ARRAY['"Hello
World (두 줄)"', '"HelloWorld (한 줄)"', '"Hello World (공백 포함)"', '"에러"'], 1, 'endl이나 \n 없이 cout을 여러 번 쓰면 줄바꿈 없이 이어서 출력됩니다. 결과: HelloWorld', 'endl 없으면 줄바꿈 없음', 'C++은 줄바꿈을 자동으로 안 해줍니다. endl이나 \n을 명시적으로 써야 줄이 바뀝니다.', ARRAY['"endl"', '"줄바꿈"', '"cout"'], NULL, NULL),
(10362, 'cpp', 'cpp-1', '보통', '다음 코드를 실행하면 몇 줄이 출력되나요?', '#include <iostream>

int main() {
    std::cout << "사과" << std::endl;
    std::cout << "바나나" << std::endl;
    std::cout << "포도" << std::endl;
    return 0;
}', ARRAY['"1줄 — 사과바나나포도"', '"3줄 — 각각 한 줄씩"', '"4줄 — return 0도 출력됨"', '"에러"'], 1, 'std::endl이 있을 때마다 줄이 바뀝니다. 세 번의 cout + endl이 있으므로 3줄 출력됩니다. return 0;은 화면에 출력되지 않아요.', 'endl로 줄 나누기', 'std::endl이 있으면 그 자리에서 줄이 바뀝니다. endl이 3번이면 3줄로 출력됩니다.', ARRAY['"endl"', '"줄바꿈"', '"cout"'], NULL, NULL),
(10363, 'cpp', 'cpp-1', '보통', '파이썬과 C++의 코드 블록 표시 방식 차이는?', '# 파이썬
def main():
    print("Hello")

// C++
int main() {
    std::cout << "Hello";
}', ARRAY['"파이썬은 {}를 쓰고, C++은 :와 들여쓰기를 쓴다"', '"파이썬은 :와 들여쓰기로 블록을 구분하고, C++은 {}를 쓴다"', '"둘 다 {}를 쓴다"', '"C++은 블록 구분이 없다"'], 1, '파이썬은 :(콜론)과 들여쓰기로 코드 블록을 만들지만, C++은 중괄호 { }로 블록을 표시합니다. C++에서 들여쓰기는 선택사항(가독성용)이에요.', '코드 블록: {} vs 들여쓰기', 'Python: 콜론(:) + 들여쓰기. C++: 중괄호({ }). C++에서 들여쓰기는 문법상 의미 없고 가독성을 위한 것입니다.', ARRAY['"중괄호"', '"코드 블록"', '"들여쓰기"', '"Python vs C++"'], NULL, NULL),
(10364, 'cpp', 'cpp-1', '보통', '다음 코드에서 std::는 무엇을 의미하나요?', '#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}', ARRAY['"파일을 불러오는 명령어다"', '"''표준(standard) 도구를 쓴다''는 표시다"', '"출력 속도를 빠르게 한다"', '"컴파일러에게 C++ 모드를 알려준다"'], 1, 'std::는 ''standard(표준)''의 줄임말입니다. std::cout, std::endl처럼 C++ 표준 도구를 쓸 때 앞에 붙여요. 지금은 ''표준 도구를 쓴다는 표시''로만 기억하세요!', 'std:: 의미', 'std::cout, std::endl — 앞의 std::는 C++ 표준 도구라는 표시입니다. 레슨 1에서는 항상 std::를 붙여서 씁니다.', ARRAY['"std::"', '"std::cout"', '"std::endl"'], NULL, NULL),
(10365, 'cpp', 'cpp-1', '보통', '다음 코드의 출력 결과는?', '#include <iostream>

int main() {
    std::cout << "이름: " << "코드린" << std::endl;
    std::cout << "언어: " << "C++" << std::endl;
    return 0;
}', ARRAY['"이름: 코드린 언어: C++ (한 줄)"', '"이름: \n코드린\n언어: \nC++"', '"이름: 코드린
언어: C++ (두 줄)"', '"에러"'], 2, '첫 번째 cout은 ''이름: 코드린''을 출력하고 endl로 줄바꿈, 두 번째 cout은 ''언어: C++''을 출력하고 줄바꿈합니다. 총 두 줄이 출력됩니다.', '여러 줄 출력', 'endl은 줄바꿈을 합니다. cout이 두 번 있고 각각 endl로 끝나면 두 줄이 출력됩니다.', ARRAY['"cout"', '"endl"', '"여러 줄 출력"'], NULL, NULL),
(10366, 'cpp', 'cpp-1', '쉬움', '빈칸에 알맞은 헤더를 써서 Hello World 프로그램을 완성하세요.', '___ <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}', ARRAY['"#include"', '"import"', '"require"', '"using"'], 0, '#include <iostream>으로 출력 도구를 가져와야 cout을 쓸 수 있습니다.', '#include', '#include <헤더파일>: 필요한 기능을 불러옵니다. 파이썬의 import와 같은 역할이에요.', ARRAY['"#include"', '"헤더파일"', '"iostream"'], NULL, NULL),
(10367, 'cpp', 'cpp-1', '쉬움', '빈칸을 채워 int main()의 코드 블록을 올바르게 완성하세요.', '#include <iostream>

int main() ___
    std::cout << "Hello!" << std::endl;
    return 0;
___', ARRAY['"{, }"', '"(, )"', '":, end"', '"[, ]"'], 0, 'C++에서 코드 블록은 { }(중괄호)로 감쌉니다. 파이썬의 콜론(:)+들여쓰기 대신 { }를 사용해요.', '중괄호 { }', 'C++은 함수, 조건문, 반복문 등 모든 블록을 { }로 감쌉니다. 여는 {와 닫는 }가 항상 쌍을 이루어야 합니다.', ARRAY['"중괄호"', '"코드 블록"', '"int main"'], NULL, NULL),
(10368, 'cpp', 'cpp-1', '쉬움', '빈칸을 채워 화면에 Hello를 출력하는 코드를 완성하세요.', '#include <iostream>

int main() {
    std::___ << "Hello" << std::endl;
    return 0;
}', ARRAY['"cout"', '"print"', '"output"', '"write"'], 0, 'std::cout은 C++의 표준 출력 스트림입니다. 파이썬의 print()와 같은 역할이에요.', 'std::cout', 'std::cout: 화면에 출력하는 객체. << 연산자로 출력할 내용을 연결합니다.', ARRAY['"cout"', '"std::"', '"출력"'], NULL, NULL),
(10369, 'cpp', 'cpp-1', '쉬움', '빈칸을 채워 줄바꿈이 있는 출력 코드를 완성하세요.', '#include <iostream>

int main() {
    std::cout << "1번 줄" << std::___;
    std::cout << "2번 줄" << std::endl;
    return 0;
}', ARRAY['"endl"', '"newline"', '"enter"', '"break"'], 0, 'std::endl은 줄바꿈을 합니다. 이걸 빠뜨리면 ''1번 줄2번 줄''처럼 이어서 출력됩니다.', 'std::endl', 'std::endl: 줄바꿈 + 버퍼 비움. 출력 후 다음 줄로 넘어가고 싶을 때 사용합니다.', ARRAY['"endl"', '"줄바꿈"', '"cout"'], NULL, NULL),
(10370, 'cpp', 'cpp-1', '보통', '빈칸을 채워 main.cpp를 컴파일하고 hello라는 실행 파일을 만드세요.', '// 터미널에서 실행할 명령어:
g++ ___ hello main.cpp', ARRAY['"-o"', '"-out"', '"--output"', '"-name"'], 0, 'g++ -o 실행파일명 소스파일.cpp 형식으로 씁니다. -o는 output(출력)의 줄임말이에요.', 'g++ -o 옵션', 'g++ -o 파일명 소스.cpp: 원하는 이름으로 실행 파일 생성. -o 없으면 자동으로 a.out이 생깁니다.', ARRAY['"g++"', '"-o"', '"컴파일"', '"실행 파일"'], NULL, NULL),
(10371, 'cpp', 'cpp-1', '보통', '다음 코드에서 빈칸에 들어갈 말을 완성하세요. (문장 종료 기호)', '#include <iostream>

int main() {
    std::cout << "C++은 재미있다" ___
    return 0;
}', ARRAY['";  (세미콜론)"', '". (마침표)"', '", (쉼표)"', '"엔터만 치면 된다"'], 0, 'C++에서 모든 문장은 세미콜론(;)으로 끝나야 합니다. 빼면 컴파일 오류가 납니다.', '세미콜론 ;', 'C++의 모든 명령문은 ;으로 끝납니다. 파이썬과 달리 줄바꿈 자체는 문장의 끝을 의미하지 않습니다.', ARRAY['"세미콜론"', '"문법"', '"컴파일 오류"'], NULL, NULL),
(10345, 'cpp', 'cpp-2', '쉬움', 'using namespace std; 없이 cout을 사용하는 올바른 방법은?', '#include <iostream>
// using namespace std; 없음!

int main() {
    ___ << "Hello";
    return 0;
}', ARRAY['"cout << \"Hello\";"', '"std::cout << \"Hello\";"', '"namespace::cout << \"Hello\";"', '"c::cout << \"Hello\";"'], 1, 'using namespace std; 없이는 std:: 접두사를 붙여서 std::cout으로 사용해야 합니다. 대규모 프로젝트에서는 std::를 붙이는 것이 권장됩니다.', 'std:: 네임스페이스', 'using namespace std; 없이는 모든 표준 라이브러리 요소에 std:: 접두사가 필요합니다. std::cout, std::endl, std::string 등.', ARRAY['"namespace"', '"std::"', '"using namespace std"'], NULL, NULL),
(10346, 'cpp', 'cpp-2', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "그는 \"안녕\"이라고 했다." << endl;
    return 0;
}', ARRAY['"그는 \\"안녕\\"이라고 했다."', '"그는 \"안녕\"이라고 했다."', '"그는 안녕이라고 했다."', '"컴파일 에러"'], 1, '\\"는 문자열 안에서 큰따옴표를 출력하는 이스케이프 문자입니다. 실제 출력에는 \\ 없이 "만 나옵니다.', '이스케이프 문자 \"', '문자열 안에 큰따옴표를 넣으려면 \\"를 사용합니다. \\n(줄바꿈), \\t(탭)도 같은 방식입니다.', ARRAY['"이스케이프 문자"', '"cout"'], NULL, NULL),
(10347, 'cpp', 'cpp-5', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 10, b = 3;
    cout << a << "/" << b << "=" << a/b;
    return 0;
}', ARRAY['"10/3=3.33"', '"10/3=3"', '"10/3=3.0"', '"에러"'], 1, 'int / int = int (정수 나눗셈). 10/3 = 3 (나머지 버림). cout은 그냥 값을 순서대로 출력합니다. 소수점 결과를 원하면 (double)a/b로 형변환해야 합니다.', '정수 나눗셈과 cout', 'int/int는 정수 나눗셈입니다. cout은 값을 그대로 출력합니다. 소수 출력: cout << (double)a/b 또는 cout << 1.0*a/b', ARRAY['"정수 나눗셈"', '"cout"', '"형변환"'], NULL, NULL),
(10333, 'cpp', 'cpp-10', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {10, 20, 30};
    for (int x : v) {
        cout << x << " ";
    }
    return 0;
}', ARRAY['"10 20 30"', '"30 20 10"', '"0 1 2"', '"에러"'], 0, 'range-based for문 `for (int x : v)`는 v의 원소를 순서대로 x에 넣으며 반복합니다. 파이썬의 `for x in v:`와 동일합니다.', 'Range-based for 문', 'for (타입 변수 : 컨테이너) — 컨테이너의 원소를 순서대로 꺼내 반복합니다. 파이썬의 for x in list:와 같은 역할입니다.', ARRAY['"range-based for"', '"벡터 순회"', '"C++11"'], NULL, NULL),
(10334, 'cpp', 'cpp-12', '보통', '벡터의 원소를 직접 수정하려면 어떻게 해야 하는가?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (___ x : v) {
        x *= 2;  // 원소를 2배로 만들고 싶다
    }
    for (int x : v) cout << x << " ";
}', ARRAY['"for (int x : v)"', '"for (int& x : v)"', '"for (auto x : v)"', '"for (const int x : v)"'], 1, 'int& x처럼 참조(&)로 받아야 원본 벡터가 수정됩니다. 참조 없이 `int x`로 받으면 복사본만 수정되고 원본 v는 그대로입니다.', '참조로 원소 수정', 'for (int& x : v)로 참조를 받으면 원본 수정 가능. for (int x : v)는 복사본. for (const int& x : v)는 읽기 전용.', ARRAY['"range-based for"', '"참조"', '"원소 수정"'], NULL, NULL),
(10335, 'cpp', 'cpp-10', '보통', 'auto가 타입을 자동 추론하는 예시로 올바른 것은?', '#include <vector>
#include <string>
using namespace std;
int main() {
    vector<string> words = {"apple", "banana", "cherry"};
    for (auto word : words) {
        // word의 타입은?
    }
}', ARRAY['"word의 타입은 int"', '"word의 타입은 string (자동 추론)"', '"word의 타입은 vector<string>"', '"컴파일 오류"'], 1, 'auto는 초기값으로부터 타입을 자동으로 추론합니다. words가 vector<string>이므로 auto word는 string 타입이 됩니다.', 'auto 타입 추론', 'auto는 컴파일러가 초기값을 보고 타입을 자동으로 결정합니다. 긴 타입명(vector<string>::iterator 등)을 간단하게 쓸 수 있습니다.', ARRAY['"auto"', '"타입 추론"', '"C++11"'], NULL, NULL),
(10336, 'cpp', 'cpp-15', '쉬움', 'pair<string, int> p = {"Kim", 95};`에서 `p.first`와 `p.second`의 값은?', '#include <iostream>
#include <utility>
using namespace std;
int main() {
    pair<string, int> p = {"Kim", 95};
    cout << p.first << " " << p.second;
}', ARRAY['"95 Kim"', '"Kim 95"', '"0 0"', '"컴파일 오류"'], 1, 'pair에서 첫 번째 값은 .first, 두 번째 값은 .second로 접근합니다. p.first = "Kim", p.second = 95입니다.', 'pair.first / pair.second', 'pair<T1, T2>: 두 값을 묶는 구조. .first로 첫 번째, .second로 두 번째 값에 접근합니다. 이름-점수, 좌표 등에 활용합니다.', ARRAY['"pair"', '".first"', '".second"', '"<utility>"'], NULL, NULL),
(10337, 'cpp', 'cpp-23', '보통', 'pair 벡터를 점수 내림차순으로 정렬하는 올바른 코드는?', '#include <algorithm>
#include <vector>
using namespace std;
int main() {
    vector<pair<string, int>> students = {
        {"Kim", 85}, {"Lee", 92}, {"Park", 78}
    };
    sort(students.begin(), students.end(), ___);
}', ARRAY['"[](auto a, auto b) { return a.first < b.first; }"', '"[](auto a, auto b) { return a.second > b.second; }"', '"greater<pair<string,int>>()"', '"[](auto a, auto b) { return a > b; }"'], 1, '람다에서 a.second > b.second는 ''점수(second)가 더 큰 것이 앞에 온다''는 조건입니다. 결과: Lee(92), Kim(85), Park(78) 순서.', 'pair 커스텀 정렬', 'sort()의 세 번째 인자로 비교 함수(또는 람다)를 전달합니다. a.second > b.second는 second 기준 내림차순 정렬입니다.', ARRAY['"sort"', '"pair 정렬"', '"람다"', '"커스텀 정렬"'], NULL, NULL),
(10339, 'cpp', 'cpp-19', '쉬움', 'USACO에서 파일에서 입력을 읽기 위해 사용하는 C++ 클래스는?', '#include <fstream>
using namespace std;
int main() {
    ___ fin("input.txt");
    int x;
    fin >> x;
    fin.close();
}', ARRAY['"ofstream"', '"ifstream"', '"fstream"', '"iostream"'], 1, 'ifstream은 input file stream의 약자입니다. 파일에서 읽기 위해 사용합니다. ofstream은 파일에 쓸 때, fstream은 읽기/쓰기 모두 가능합니다.', 'ifstream — 파일 읽기', 'ifstream fin("파일명"); 으로 파일을 열고, fin >> 변수로 읽습니다. cin 대신 fin을 쓰면 됩니다. close()로 닫는 것을 잊지 마세요.', ARRAY['"ifstream"', '"파일 입출력"', '"<fstream>"', '"USACO"'], NULL, NULL),
(10340, 'cpp', 'cpp-19', '보통', 'Fast I/O 설정 후 절대 하면 안 되는 것은?', 'ios_base::sync_with_stdio(false);
cin.tie(nullptr);
// 이 이후로 ?', ARRAY['"cin >> n; 사용"', '"cout << n; 사용"', '"scanf(\"%d\", &n); 사용"', '"getline(cin, s); 사용"'], 2, 'sync_with_stdio(false)는 C++ 스트림(cin/cout)과 C 스트림(scanf/printf)의 동기화를 끊습니다. 이후 두 가지를 섞어 쓰면 입출력 순서가 꼬입니다.', 'Fast I/O 주의사항', 'sync_with_stdio(false) 후에는 cin/cout만 사용해야 합니다. scanf/printf를 섞으면 출력 순서가 비정상적이 됩니다.', ARRAY['"sync_with_stdio"', '"Fast I/O"', '"scanf 금지"'], NULL, NULL),
(10341, 'cpp', 'cpp-19', '보통', 'endl보다 ''\n''을 쓰는 것이 더 빠른 이유는?', '// 느린 방식
cout << result << endl;  // 출력 + 버퍼 flush!

// 빠른 방식
cout << result << "\n"; // 출력만', ARRAY['"\n은 두 글자라서"', '"endl은 줄바꿈 + 버퍼를 강제로 비워서(flush) 느림"', '"endl은 C++20에서 제거됨"', '"\n은 더 짧은 코드라서"'], 1, 'endl은 ''\n'' + flush(버퍼 강제 비우기)를 합니다. 대량 출력에서 flush 연산이 누적되면 매우 느려집니다. 경쟁 프로그래밍에서는 ''\n''을 사용합니다.', 'endl vs \n', 'endl = ''\n'' + 버퍼 flush. 버퍼 flush는 비용이 큰 작업입니다. 출력이 많은 경우 항상 ''\n''을 사용하세요.', ARRAY['"endl"', '"\n"', '"버퍼 flush"', '"성능"'], NULL, NULL),
(10342, 'cpp', 'cpp-p1', '쉬움', '숫자 맞추기 게임에서 1~100 사이의 난수를 생성하는 올바른 코드는?', '#include <cstdlib>  // rand, srand
#include <ctime>    // time

srand(time(0));    // 시드 설정
int answer = ___;  // 1~100 사이', ARRAY['"rand() + 1"', '"rand() % 100 + 1"', '"random(1, 100)"', '"rand(1, 100)"'], 1, 'rand() % 100은 0~99를 반환합니다. +1을 하면 1~100이 됩니다. srand(time(0))으로 매번 다른 시드를 설정해야 진짜 랜덤이 됩니다.', 'rand() % N + 1 패턴', 'rand() % N: 0~(N-1). rand() % N + 1: 1~N. rand() % 100 + 1: 1~100. srand(time(0))으로 매번 다른 시드를 설정합니다.', ARRAY['"rand()"', '"srand()"', '"난수 생성"', '"% 연산"'], NULL, NULL),
(10343, 'cpp', 'cpp-p1', '보통', '게임 루프에서 ''정답을 맞출 때까지 반복''을 구현하는 올바른 패턴은?', 'int answer = rand() % 100 + 1;
int guess = 0;

___  // 정답 맞출 때까지 계속 반복
{
    cin >> guess;
    if (guess < answer) cout << "⬆️ 더 큰 숫자\n";
    else if (guess > answer) cout << "⬇️ 더 작은 숫자\n";
}', ARRAY['"for (int i = 0; i < 100; i++)"', '"while (guess != answer)"', '"if (guess != answer)"', '"do {} while (false)"'], 1, 'while (guess != answer)은 guess가 answer와 같아질 때까지 반복합니다. 정답을 맞추면 루프가 종료됩니다.', '게임 루프 패턴', '조건이 참인 동안 반복 → while(조건). 정답 맞추기, 메뉴 선택, 게임 진행 등에 자주 사용하는 패턴입니다.', ARRAY['"while"', '"게임 루프"', '"조건 반복"'], NULL, NULL),
(10344, 'cpp', 'cpp-p1', '보통', '시도 횟수를 세는 변수를 올바르게 사용한 코드는?', 'int answer = rand() % 100 + 1;
int guess = 0;
___ tries = 0;  // 시도 횟수

while (guess != answer) {
    cin >> guess;
    ___  // 시도 횟수 증가
}
cout << tries << "번 만에 맞췄어요!";', ARRAY['"string tries; / tries++;"', '"int tries; / tries++;"', '"float tries; / tries += 1.0;"', '"bool tries; / tries = true;"'], 1, '횟수 카운팅에는 int 타입을 사용합니다. tries++는 tries += 1과 동일합니다. 루프 안에서 매 반복마다 1씩 증가시킵니다.', '카운터 변수 패턴', 'int count = 0; ... count++; 패턴은 반복 횟수, 시도 횟수, 조건 만족 횟수 등을 셀 때 가장 기본적인 패턴입니다.', ARRAY['"카운터"', '"int"', '"++연산자"'], NULL, NULL),
(10372, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 7, b = 2;
    cout << a / b << endl;
    return 0;
}', ARRAY['"3"', '"3.5"', '"4"', '"컴파일 오류"'], 0, 'int끼리 나누면 소수점이 버려져요. 7 ÷ 2 = 3.5지만 int/int = 3입니다. 결과를 3.5로 만들려면 (double)a / b 또는 7.0 / 2처럼 double로 변환해야 해요.', '정수 나눗셈 함정', 'int / int는 항상 정수 결과를 반환합니다. 소수점 결과가 필요하면 피연산자 중 하나를 double로 변환하세요.', ARRAY['"정수 나눗셈"', '"int"', '"double"'], NULL, NULL),
(10373, 'cpp', 'cpp-11', '쉬움', '문자열 "42"를 정수로 바꾸는 올바른 코드는?', '', ARRAY['"int n = int(\"42\");"', '"int n = stoi(\"42\");"', '"int n = to_int(\"42\");"', '"int n = (\"42\");"'], 1, '문자열 → 정수 변환은 stoi(), 문자열 → 실수 변환은 stod()를 사용해요. to_int()는 C++에 없는 함수예요!', '타입 변환 함수', 'stoi(문자열) → int, stod(문자열) → double, to_string(숫자) → string. 세 가지를 꼭 기억하세요!', ARRAY['"stoi"', '"stod"', '"to_string"', '"타입 변환"'], NULL, NULL),
(10374, 'cpp', 'cpp-11', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;
int main() {
    int score = 95;
    string msg = "점수: " + to_string(score);
    cout << msg << endl;
    return 0;
}', ARRAY['"점수: 95"', '"점수: score"', '"컴파일 오류"', '"점수: 0"'], 0, 'to_string(95)은 정수 95를 문자열 "95"로 변환해요. 그래서 "점수: " + "95" = "점수: 95"가 출력됩니다.', 'to_string() 함수', '숫자를 문자열로 바꿀 때 to_string()을 사용해요. 문자열과 숫자를 +로 직접 합치면 컴파일 오류가 나므로 반드시 to_string()으로 변환 후 합쳐야 해요.', ARRAY['"to_string"', '"타입 변환"', '"string"'], NULL, NULL),
(10375, 'cpp', 'cpp-5', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 5;
    cout << a++ << endl;
    cout << ++a << endl;
    return 0;
}', ARRAY['"5
7"', '"6
7"', '"5
6"', '"6
6"'], 0, 'a++(후위): 현재 값(5)을 출력한 후 증가 → a=6. ++a(전위): 먼저 증가(a=7)한 후 출력 → 7. 결과: 5, 7', '전위 vs 후위 증감', 'x++는 현재 값을 먼저 사용하고 나중에 증가, ++x는 먼저 증가하고 그 값을 사용합니다.', ARRAY['"전위 증감"', '"후위 증감"', '"++"', '"--"'], NULL, NULL),
(10376, 'cpp', 'cpp-5', '쉬움', '다음 코드에서 b의 값은?', 'int a = 10;
int b = ++a;', ARRAY['"10"', '"11"', '"12"', '"컴파일 오류"'], 1, '++a(전위)는 먼저 a를 11로 증가시킨 후 b에 대입해요. b = 11입니다. a++였다면 b = 10, a = 11이 되었을 거예요.', '전위 증감 대입', '++x: 증가 먼저, 그 값 사용. x++: 현재 값 사용, 나중에 증가.', ARRAY['"전위 증감"', '"++"'], NULL, NULL),
(10377, 'cpp', 'cpp-8', '보통', '다음 코드가 컴파일 오류 없이 동작하려면 빈칸에 무엇이 필요한가?', '#include <iostream>
using namespace std;

// 빈칸

int main() {
    cout << add(3, 4) << endl;
    return 0;
}

int add(int a, int b) {
    return a + b;
}', ARRAY['"int add(int a, int b);"', '"int add();"', '"add(int, int);"', '"아무것도 필요없다"'], 0, 'C++은 위에서 아래로 읽어요. main()에서 add()를 호출할 때 아직 add()가 정의되지 않았으므로 오류가 발생해요. 함수 프로토타입(원형 선언)을 위에 적어두면 해결됩니다.', '함수 프로토타입', '함수 정의가 호출보다 아래에 있으면 컴파일 오류가 발생해요. 함수 프로토타입(반환타입 함수명(매개변수타입);)을 상단에 선언하면 해결됩니다.', ARRAY['"함수 프로토타입"', '"전방 선언"', '"컴파일"'], NULL, NULL),
(10378, 'cpp', 'cpp-8', '쉬움', '다음 중 올바른 설명은?', '// 함수 A
int getDouble(int x) {
    return x * 2;
}

// 함수 B
void printDouble(int x) {
    cout << x * 2 << endl;
}', ARRAY['"두 함수 모두 화면에 출력한다"', '"getDouble은 값을 돌려주고, printDouble은 화면에 출력한다"', '"return이 있어야 cout도 사용할 수 있다"', '"void 함수는 아무것도 할 수 없다"'], 1, 'return은 함수를 호출한 곳에 값을 ''돌려줍니다''. cout은 화면에 ''출력''합니다. getDouble(5)는 10을 돌려줘서 다른 계산에 쓸 수 있고, printDouble(5)는 10을 화면에 출력만 합니다.', 'return vs cout', 'return: 함수 호출자에게 값을 반환 (다른 계산에 활용 가능). cout: 화면에 출력 (값이 사라짐). 재사용 가능한 함수를 만들려면 return을 사용하세요.', ARRAY['"return"', '"cout"', '"void"', '"함수"'], NULL, NULL),
(10379, 'cpp', 'cpp-15', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    pair<string, int> p = {"Alice", 90};
    cout << p.first << " " << p.second << endl;
    return 0;
}', ARRAY['"Alice 90"', '"90 Alice"', '"first second"', '"컴파일 오류"'], 0, 'pair의 첫 번째 값은 .first, 두 번째 값은 .second로 접근해요.', 'pair 접근', 'pair<T1, T2>의 값은 .first와 .second로 접근합니다.', ARRAY['"pair"', '"first"', '"second"'], NULL, NULL),
(10380, 'cpp', 'cpp-23', '쉬움', 'vector를 오름차순 정렬하는 올바른 코드는?', '', ARRAY['"sort(v.begin(), v.end());"', '"sort(v);"', '"v.sort();"', '"sort(v, ascending);"'], 0, 'sort()는 #include <algorithm>이 필요하고, 범위를 begin()~end()로 지정해요. sort(v)나 v.sort()는 C++에서 작동하지 않아요.', 'sort() 함수', 'sort(v.begin(), v.end())로 오름차순 정렬. #include <algorithm> 필요.', ARRAY['"sort"', '"algorithm"', '"vector"'], NULL, NULL),
(10381, 'cpp', 'cpp-23', '쉬움', 'vector를 내림차순으로 정렬하는 올바른 코드는?', '', ARRAY['"sort(v.begin(), v.end(), greater<int>());"', '"sort(v.begin(), v.end(), less<int>());"', '"sort(v.rbegin(), v.rend(), greater<int>());"', '"rsort(v.begin(), v.end());"'], 0, '내림차순은 세 번째 인자로 greater<int>()를 넘겨줘요. less<int>()는 오름차순(기본값)이에요.', 'sort 내림차순', 'sort(v.begin(), v.end(), greater<T>())로 내림차순 정렬.', ARRAY['"sort"', '"greater"', '"내림차순"'], NULL, NULL),
(10382, 'cpp', 'cpp-23', '쉬움', '다음 코드 실행 후 v[0]의 값은?', '#include <algorithm>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end());
    return 0;
}', ARRAY['"1"', '"5"', '"9"', '"2"'], 0, 'sort()는 오름차순 정렬이므로 {1, 2, 5, 8, 9}가 되고, v[0]은 가장 작은 값 1이에요.', 'sort 오름차순', 'sort()의 기본은 오름차순(작은 → 큰). v[0]이 가장 작은 값이 됩니다.', ARRAY['"sort"', '"오름차순"'], NULL, NULL),
(10383, 'cpp', 'cpp-23', '보통', 'vector<pair<int,int>>를 sort하면 어떤 기준으로 정렬되나요?', '', ARRAY['"first 오름차순, first 같으면 second 오름차순"', '"second 기준으로만 정렬"', '"first 내림차순 정렬"', '"정렬 불가 (컴파일 오류)"'], 0, 'pair는 first를 먼저 비교하고, first가 같으면 second를 비교해요. 이 특성을 활용하면 다중 기준 정렬을 쉽게 할 수 있어요.', 'pair 정렬 기준', 'pair 정렬: first 먼저, first 같으면 second 비교. 자동으로 다중 기준 정렬 가능.', ARRAY['"pair"', '"sort"', '"비교"'], NULL, NULL),
(10384, 'cpp', 'cpp-15', '쉬움', 'pair를 만드는 올바른 방법이 아닌 것은?', '', ARRAY['"pair<int,int> p = new_pair(1, 2);"', '"pair<int,int> p = {1, 2};"', '"auto p = make_pair(1, 2);"', '"pair<int,int> p = make_pair(1, 2);"'], 0, 'new_pair()는 존재하지 않는 함수예요. pair는 중괄호 초기화({1,2}), make_pair(), 또는 직접 선언으로 만들 수 있어요.', 'pair 생성 방법', 'pair 생성: {val1, val2} 또는 make_pair(val1, val2). new_pair()는 없음.', ARRAY['"pair"', '"make_pair"'], NULL, NULL),
(10385, 'cpp', 'cpp-23', '보통', '벡터를 절댓값 기준 오름차순으로 정렬하는 코드는?', '', ARRAY['"sort(v.begin(), v.end(), [](int a, int b){ return abs(a) < abs(b); });"', '"sort(v.begin(), v.end(), abs);"', '"sort(v.begin(), v.end(), [](int a, int b){ return a < b; });"', '"sort(v.begin(), v.end(), greater<int>());"'], 0, '람다 함수로 커스텀 비교를 만들어요. [](int a, int b){ return abs(a) < abs(b); }는 절댓값이 작은 것이 앞에 오도록 정렬해요.', '람다 커스텀 정렬', 'sort()의 세 번째 인자로 람다를 넘겨 원하는 기준으로 정렬할 수 있어요.', ARRAY['"lambda"', '"sort"', '"커스텀 정렬"'], NULL, NULL),
(10386, 'cpp', 'cpp-15', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <tuple>
using namespace std;
int main() {
    tuple<string, int, double> t = {"Bob", 20, 3.5};
    cout << get<1>(t) << endl;
    return 0;
}', ARRAY['"20"', '"Bob"', '"3.5"', '"1"'], 0, 'get<N>(t)로 tuple의 N번째 값(0-based)에 접근해요. get<1>(t)는 두 번째 값인 20입니다.', 'tuple 접근', 'tuple 원소는 get<인덱스>(tuple)로 접근. 0부터 시작하는 인덱스 사용.', ARRAY['"tuple"', '"get"'], NULL, NULL),
(10387, 'cpp', 'cpp-23', '쉬움', 'C-style 배열을 sort할 때 올바른 코드는? (int arr[5])', '', ARRAY['"sort(arr, arr + 5);"', '"sort(arr.begin(), arr.end());"', '"arr.sort();"', '"sort(arr[0], arr[4]);"'], 0, 'C-style 배열은 .begin()/.end()가 없어요. 포인터 arr(시작)와 arr+n(끝)을 사용합니다.', '배열 sort', '배열 정렬: sort(arr, arr + n). 벡터는 sort(v.begin(), v.end()).', ARRAY['"sort"', '"배열"', '"포인터"'], NULL, NULL),
(10388, 'cpp', 'cpp-23', '보통', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<pair<int,int>> v = {{2,5},{1,3},{2,1}};
    sort(v.begin(), v.end());
    cout << v[0].first << " " << v[0].second << endl;
    return 0;
}', ARRAY['"1 3"', '"2 5"', '"2 1"', '"1 5"'], 0, 'pair 정렬은 first 먼저 비교: {1,3}이 first=1로 가장 작아 첫 번째. {2,1}과 {2,5}는 first=2로 같으니 second 비교 → {2,1}이 앞. 결과: {1,3},{2,1},{2,5}. v[0]은 {1,3}.', 'pair 정렬 실전', 'pair 정렬은 first 먼저, 같으면 second 비교.', ARRAY['"pair"', '"sort"'], NULL, NULL),
(10389, 'cpp', 'cpp-18', '쉬움', '다음 코드의 출력 결과는?', '#include <stack>
#include <iostream>
using namespace std;
int main() {
    stack<int> s;
    s.push(1); s.push(2); s.push(3);
    cout << s.top() << endl;
    return 0;
}', ARRAY['"3"', '"1"', '"2"', '"오류"'], 0, 'stack은 LIFO(마지막에 넣은 것이 먼저 나옴). push(1), push(2), push(3) 후 top()은 가장 마지막에 넣은 3이에요.', 'stack LIFO', 'stack은 Last In First Out. top()으로 가장 최근에 push한 값을 확인.', ARRAY['"stack"', '"LIFO"', '"top"'], NULL, NULL),
(10390, 'cpp', 'cpp-18', '쉬움', '다음 코드의 출력 결과는?', '#include <queue>
#include <iostream>
using namespace std;
int main() {
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << q.front() << endl;
    return 0;
}', ARRAY['"1"', '"3"', '"2"', '"오류"'], 0, 'queue는 FIFO(먼저 넣은 것이 먼저 나옴). front()는 가장 먼저 push한 1을 반환해요.', 'queue FIFO', 'queue는 First In First Out. front()로 가장 먼저 push한 값 확인.', ARRAY['"queue"', '"FIFO"', '"front"'], NULL, NULL),
(10391, 'cpp', 'cpp-18', '쉬움', 'C++ stack에서 값을 꺼낼 때 올바른 순서는?', '', ARRAY['"top()으로 값을 확인 후 pop()으로 제거"', '"pop()이 값을 반환하므로 바로 사용"', '"push()로 넣고 top()으로 꺼냄"', '"front()로 확인 후 pop()"'], 0, 'C++ stack의 pop()은 값을 반환하지 않고 그냥 제거만 해요. 반드시 top()으로 값을 먼저 확인한 후 pop()으로 제거해야 해요.', 'stack pop() 주의', 'C++ pop()은 값을 반환하지 않음. 순서: top()으로 확인 → pop()으로 제거.', ARRAY['"stack"', '"pop"', '"top"'], NULL, NULL),
(10392, 'cpp', 'cpp-18', '쉬움', '다음 코드의 출력 결과는?', '#include <queue>
#include <iostream>
using namespace std;
int main() {
    priority_queue<int> pq;
    pq.push(3); pq.push(1); pq.push(5); pq.push(2);
    cout << pq.top() << endl;
    return 0;
}', ARRAY['"5"', '"3"', '"1"', '"2"'], 0, 'priority_queue는 기본적으로 최대 힙(max-heap)이에요. 가장 큰 값이 top()에 있으므로 5가 출력돼요.', 'priority_queue (max-heap)', 'priority_queue 기본은 max-heap. top()은 항상 가장 큰 값.', ARRAY['"priority_queue"', '"max-heap"', '"heap"'], NULL, NULL),
(10393, 'cpp', 'cpp-18', '보통', 'priority_queue를 최솟값이 먼저 나오도록(min-heap) 만드는 올바른 선언은?', '', ARRAY['"priority_queue<int, vector<int>, greater<int>> pq;"', '"priority_queue<int, vector<int>, less<int>> pq;"', '"priority_queue<int> pq(min);"', '"min_priority_queue<int> pq;"'], 0, 'min-heap은 priority_queue<int, vector<int>, greater<int>>로 선언해요. greater<int>를 쓰면 작은 값이 top()에 오게 됩니다.', 'priority_queue min-heap', 'min-heap: priority_queue<T, vector<T>, greater<T>>. 가장 작은 값이 top().', ARRAY['"priority_queue"', '"min-heap"', '"greater"'], NULL, NULL),
(10394, 'cpp', 'cpp-18', '쉬움', 'deque에서 앞쪽에 값을 추가하는 함수는?', '', ARRAY['"push_front()"', '"push_back()"', '"push()"', '"insert_front()"'], 0, 'deque는 양쪽 끝 모두 O(1)으로 추가/제거 가능해요. 앞쪽 추가는 push_front(), 뒤쪽 추가는 push_back()이에요.', 'deque push_front', 'deque: push_front()/pop_front() (앞), push_back()/pop_back() (뒤). 양쪽 O(1).', ARRAY['"deque"', '"push_front"'], NULL, NULL),
(10395, 'cpp', 'cpp-18', '보통', '괄호 매칭 알고리즘에서 stack을 어떻게 사용하나요?', '', ARRAY['"''('' 만나면 push, '')'' 만나면 pop (stack이 비어있으면 불일치)"', '"모든 괄호를 push하고 마지막에 비교"', '"'')'' 만나면 push, ''('' 만나면 pop"', '"stack 크기가 0이면 균형"'], 0, '''(''를 만나면 stack에 push, '')''를 만나면 pop해요. stack이 비어있을 때 '')''가 오면 불일치. 끝에 stack이 비어있어야 올바른 괄호예요.', 'stack 괄호 매칭', 'LIFO 특성 활용: ''('' push, '')'' pop. 끝에 stack이 비면 올바른 괄호.', ARRAY['"stack"', '"괄호 매칭"', '"LIFO"'], NULL, NULL),
(10396, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <queue>
#include <iostream>
using namespace std;
int main() {
    priority_queue<int> pq;
    pq.push(4); pq.push(1); pq.push(7);
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    return 0;
}', ARRAY['"7 4 1"', '"1 4 7"', '"4 1 7"', '"7 1 4"'], 0, 'priority_queue(max-heap)는 항상 가장 큰 값을 top()에 넣어요. 꺼내는 순서: 7 → 4 → 1 (내림차순).', 'priority_queue 순서', 'max-heap은 큰 값부터 꺼냄. while(!pq.empty()) 패턴으로 모든 원소 처리.', ARRAY['"priority_queue"', '"max-heap"'], NULL, NULL),
(10397, 'cpp', 'cpp-18', '보통', '다음 코드의 출력 결과는?', '#include <queue>
#include <iostream>
using namespace std;
int main() {
    queue<int> q;
    q.push(10); q.push(20); q.push(30);
    q.pop();
    cout << q.front() << endl;
    return 0;
}', ARRAY['"20"', '"10"', '"30"', '"오류"'], 0, 'push(10), push(20), push(30) 후 pop()은 가장 먼저 들어온 10을 제거해요. 이후 front()는 다음 원소인 20이에요.', 'queue pop과 front', 'queue.pop()은 front(가장 오래된 값)를 제거. 그 다음 front()는 두 번째 원소.', ARRAY['"queue"', '"pop"', '"front"'], NULL, NULL),
(10398, 'cpp', 'cpp-18', '쉬움', '웹 브라우저 ''뒤로 가기'' 기능처럼 가장 최근 방문 페이지로 돌아가려면 어떤 자료구조가 적합한가?', '', ARRAY['"stack (LIFO)"', '"queue (FIFO)"', '"priority_queue"', '"deque"'], 0, '뒤로 가기는 가장 최근 페이지(마지막에 방문한 것)로 돌아가므로 LIFO 구조인 stack이 적합해요.', 'stack 활용', 'stack(LIFO) 활용: 뒤로가기, undo 기능, 괄호 매칭. queue(FIFO): 대기열, BFS.', ARRAY['"stack"', '"LIFO"', '"자료구조 선택"'], NULL, NULL),
(10399, 'cpp', 'cpp-19', '쉬움', 'USACO에서 파일 입출력을 설정하는 freopen 코드 중 올바른 것은?', '', ARRAY['"freopen(\"input.txt\", \"r\", stdin);"', '"freopen(stdin, \"input.txt\", \"r\");"', '"freopen(\"input.txt\", stdin);"', '"file_open(\"input.txt\", \"r\");"'], 0, 'freopen(파일명, 모드, 스트림) 순서예요. "r"은 읽기(read), stdin은 표준 입력. 이 코드 이후 cin이 파일에서 읽어요.', 'freopen 사용법', 'freopen("파일명", "r", stdin) — 입력 파일 연결. freopen("파일명", "w", stdout) — 출력 파일 연결.', ARRAY['"freopen"', '"파일 I/O"', '"USACO"'], NULL, NULL),
(10400, 'cpp', 'cpp-19', '쉬움', 'Fast I/O를 위해 main() 시작 부분에 넣어야 할 코드는?', '', ARRAY['"ios_base::sync_with_stdio(false); cin.tie(nullptr);"', '"fast_io(); cin.speed(max);"', '"ios::sync(false);"', '"cin.fast_mode = true;"'], 0, 'Fast I/O의 표준 설정이에요. sync_with_stdio(false)는 C/C++ 스트림 동기화를 끊고, cin.tie(nullptr)는 cin과 cout의 묶음을 해제해요.', 'Fast I/O', 'ios_base::sync_with_stdio(false); cin.tie(nullptr); — 입출력 속도 2-5배 향상.', ARRAY['"Fast I/O"', '"sync_with_stdio"', '"cin.tie"'], NULL, NULL),
(10401, 'cpp', 'cpp-19', '쉬움', '대량 출력 시 성능을 위해 endl 대신 무엇을 쓰나요?', '', ARRAY['"''\n''"', '"newline()"', '"flush()"', '"endl은 항상 빠름"'], 0, 'endl은 줄바꿈 + 버퍼 플러시(flush)를 해서 느려요. ''\n''은 줄바꿈만 하므로 10배 빠를 수 있어요. 경쟁 프로그래밍에서는 항상 ''\n''을 써요.', 'endl vs \n 성능', 'endl = 줄바꿈 + flush (느림). ''\n'' = 줄바꿈만 (빠름). 대량 출력에서 10배 차이.', ARRAY['"endl"', '"\n"', '"성능"', '"flush"'], NULL, NULL),
(10402, 'cpp', 'cpp-19', '보통', '파일 ''data.txt''에서 정수를 읽는 올바른 코드는?', '', ARRAY['"ifstream fin(\"data.txt\"); int x; fin >> x;"', '"readfile(\"data.txt\") >> x;"', '"cin.open(\"data.txt\"); cin >> x;"', '"file<int> f(\"data.txt\"); f.read(x);"'], 0, '#include <fstream>이 필요하고, ifstream 객체를 파일명으로 열어요. 이후 >> 연산자로 cin처럼 읽을 수 있어요.', 'ifstream 파일 읽기', 'ifstream fin("파일명"); fin >> 변수; — cin과 동일한 방식으로 파일 읽기.', ARRAY['"ifstream"', '"fstream"', '"파일 I/O"'], NULL, NULL),
(10403, 'cpp', 'cpp-19', '보통', '파일에 결과를 출력하는 올바른 코드는?', '', ARRAY['"ofstream fout(\"output.txt\"); fout << result;"', '"writefile(\"output.txt\") << result;"', '"cout.open(\"output.txt\"); cout << result;"', '"ofstream fout; fout.write(result);"'], 0, 'ofstream 객체로 파일을 열고 << 연산자로 cout처럼 출력해요. ofstream fout("파일명")로 파일을 연결합니다.', 'ofstream 파일 쓰기', 'ofstream fout("파일명"); fout << 값; — cout과 동일한 방식으로 파일에 출력.', ARRAY['"ofstream"', '"fstream"', '"파일 I/O"'], NULL, NULL),
(10404, 'cpp', 'cpp-19', '보통', 'ios_base::sync_with_stdio(false) 설정 후 사용하면 안 되는 것은?', '', ARRAY['"scanf / printf"', '"cin / cout"', '"getline"', '"endl"'], 0, 'sync_with_stdio(false)를 설정하면 C와 C++ I/O 스트림이 분리돼요. 이후 scanf/printf와 cin/cout을 섞어 쓰면 출력 순서가 엉킬 수 있어요.', 'Fast I/O 제약사항', 'sync_with_stdio(false) 후 scanf/printf 사용 금지. cin/cout만 사용해야 안전.', ARRAY['"Fast I/O"', '"scanf"', '"printf"', '"sync_with_stdio"'], NULL, NULL),
(10405, 'cpp', 'cpp-19', '보통', '다음 코드에서 getline이 이름을 제대로 읽지 못하는 이유는?', 'int age;
cin >> age;
string name;
getline(cin, name);  // 이름을 못 읽음', ARRAY['"cin >> age 후 버퍼에 ''\n''이 남아서 getline이 바로 종료됨"', '"getline은 int 뒤에 사용할 수 없음"', '"name이 초기화되지 않아서"', '"cin과 getline은 같이 사용 불가"'], 0, 'cin >> age 입력 후 Enter(\n)가 버퍼에 남아요. getline은 이 \n을 만나 빈 문자열을 읽고 끝냅니다. 해결: cin.ignore()를 사이에 넣어요.', 'cin.ignore() 필요성', 'cin >> 후 getline 사용 시 cin.ignore() 필수. 버퍼에 남은 \n 제거.', ARRAY['"getline"', '"cin.ignore"', '"버퍼"'], NULL, NULL),
(10406, 'cpp', 'cpp-19', '보통', 'USACO 제출용 코드의 main() 시작 부분으로 올바른 것은? (문제명: ''milk'')', '', ARRAY['"ios_base::sync_with_stdio(false); cin.tie(nullptr); freopen(\"milk.in\", \"r\", stdin); freopen(\"milk.out\", \"w\", stdout);"', '"freopen(\"milk\", \"r\", stdin);"', '"fast_io(); open_file(\"milk\");"', '"ios_base::sync_with_stdio(false); freopen(\"input.txt\", \"r\", stdin);"'], 0, 'USACO는 Fast I/O + freopen 조합이 표준이에요. 입력 파일은 ''문제명.in'', 출력 파일은 ''문제명.out''을 사용합니다.', 'USACO 제출 템플릿', 'USACO 템플릿: Fast I/O + freopen(''문제명.in'', ''r'', stdin) + freopen(''문제명.out'', ''w'', stdout).', ARRAY['"USACO"', '"freopen"', '"Fast I/O"'], NULL, NULL),
(10407, 'cpp', 'cpp-4', '쉬움', 'C++ cin의 장점으로 올바른 것은?', '// Python
age = int(input())  # 직접 int로 변환 필요

// C++
int age;
cin >> age;         // 자동으로 int로 받음', ARRAY['"cin은 자동으로 변수 타입에 맞게 입력을 변환한다"', '"cin은 항상 문자열로 입력받는다"', '"cin 사용 시 int()로 변환이 필요하다"', '"cin은 소수점 입력을 받을 수 없다"'], 0, 'C++의 cin은 변수 타입을 알고 있어서 자동으로 변환해줘요. int 변수면 정수로, double이면 실수로 받아요. Python의 int(input())처럼 직접 변환할 필요가 없어요.', 'cin 자동 타입 변환', 'cin >> 변수: 변수 타입에 맞게 자동 변환. Python의 int(input()) 불필요.', ARRAY['"cin"', '"타입 변환"', '"자동 변환"'], NULL, NULL),
(10408, 'cpp', 'cpp-4', '쉬움', '정수 두 개를 한 번에 입력받는 올바른 코드는?', '', ARRAY['"cin >> a >> b;"', '"cin >> a, b;"', '"cin(a, b);"', '"cin >> a; >> b;"'], 0, 'cin은 >> 연산자를 연속으로 체이닝해서 여러 값을 한 번에 받을 수 있어요. 공백이나 엔터로 구분된 값을 순서대로 a, b에 넣어줘요.', 'cin 다중 입력', 'cin >> a >> b >> c; — >> 연속으로 여러 값 입력 가능. 공백/엔터로 구분.', ARRAY['"cin"', '"다중 입력"', '">>"'], NULL, NULL),
(10409, 'cpp', 'cpp-5', '쉬움', '17 % 5의 결과는?', '', ARRAY['"2"', '"3"', '"3.4"', '"5"'], 0, '% 연산자는 나눗셈의 나머지를 구해요. 17 ÷ 5 = 3 나머지 2이므로 17 % 5 = 2예요.', '나머지 연산자 %', 'a % b = a를 b로 나눈 나머지. 짝수/홀수 판별: n % 2 == 0이면 짝수.', ARRAY['"%"', '"나머지"', '"modulo"'], NULL, NULL),
(10410, 'cpp', 'cpp-5', '쉬움', '정수 n이 홀수인지 확인하는 올바른 조건식은?', '', ARRAY['"n % 2 == 1"', '"n / 2 == 1"', '"n % 2 == 0"', '"n * 2 == 1"'], 0, 'n % 2는 n을 2로 나눈 나머지예요. 홀수는 나머지가 1, 짝수는 나머지가 0이에요. n % 2 == 1이면 홀수입니다.', '짝수/홀수 판별', 'n % 2 == 0: 짝수. n % 2 == 1 (또는 n % 2 != 0): 홀수.', ARRAY['"%"', '"짝수"', '"홀수"'], NULL, NULL),
(10411, 'cpp', 'cpp-5', '쉬움', '다음 코드에서 a의 최종 값은?', 'int a = 10;
a -= 3;
a *= 2;', ARRAY['"14"', '"20"', '"17"', '"7"'], 0, 'a -= 3: a = 10 - 3 = 7. a *= 2: a = 7 * 2 = 14.', '복합 대입 연산자', 'a += b (a=a+b), a -= b (a=a-b), a *= b (a=a*b), a /= b (a=a/b), a %= b (a=a%b).', ARRAY['"+="', '"-="', '"*="', '"복합 대입"'], NULL, NULL),
(10412, 'cpp', 'cpp-5', '보통', '다음 식의 결과는?', 'int result = 2 + 3 * 4 - 1;', ARRAY['"13"', '"19"', '"15"', '"11"'], 0, '곱셈 먼저: 3 * 4 = 12. 그 다음 왼쪽부터: 2 + 12 - 1 = 13. 덧셈/뺄셈보다 곱셈/나눗셈이 먼저예요.', '연산자 우선순위', '우선순위: () > * / % > + -. 같은 우선순위는 왼쪽부터.', ARRAY['"연산자 우선순위"', '"산술 연산자"'], NULL, NULL),
(10413, 'cpp', 'cpp-5', '쉬움', '다음 코드에서 출력되는 것은?', 'int x = 5;
if (x < 0 || x > 3) {
    cout << "범위 밖";
} else {
    cout << "범위 안";
}', ARRAY['"범위 밖"', '"범위 안"', '"컴파일 오류"', '"아무것도 출력 안 됨"'], 0, '|| (OR)는 둘 중 하나만 true면 true에요. x=5에서 x < 0은 false, x > 3은 true → 전체 true → ''범위 밖'' 출력.', '논리 OR (||)', 'a || b: a 또는 b 중 하나라도 true면 true. 둘 다 false일 때만 false.', ARRAY['"||"', '"OR"', '"논리 연산자"'], NULL, NULL),
(10414, 'cpp', 'cpp-5', '쉬움', '다음 코드의 출력 결과는?', 'bool isRaining = false;
if (!isRaining) {
    cout << "맑음";
} else {
    cout << "비";
}', ARRAY['"맑음"', '"비"', '"false"', '"컴파일 오류"'], 0, '!isRaining은 isRaining의 반대값이에요. isRaining = false이므로 !isRaining = true → if 블록 실행 → ''맑음'' 출력.', '논리 NOT (!)', '!true = false, !false = true. 조건을 반전시킬 때 사용.', ARRAY['"!"', '"NOT"', '"논리 연산자"'], NULL, NULL),
(10415, 'cpp', 'cpp-6', '쉬움', 'score = 75일 때 출력되는 것은?', 'int score = 75;
if (score >= 90) {
    cout << "A";
} else if (score >= 80) {
    cout << "B";
} else if (score >= 70) {
    cout << "C";
} else {
    cout << "F";
}', ARRAY['"C"', '"B"', '"A"', '"F"'], 0, '75 >= 90은 false, 75 >= 80은 false, 75 >= 70은 true → ''C'' 출력. else if는 위 조건이 모두 false일 때만 검사해요.', 'else if 체인', 'else if는 위의 모든 조건이 false일 때만 검사. 조건을 순서대로 검사하고 처음 true인 블록만 실행.', ARRAY['"else if"', '"조건문"', '"분기"'], NULL, NULL),
(10416, 'cpp', 'cpp-10', '쉬움', '다음 코드의 출력 결과는?', 'vector<int> v = {1, 2, 3};
for (int x : v) {
    cout << x << " ";
}', ARRAY['"1 2 3"', '"3 2 1"', '"0 1 2"', '"컴파일 오류"'], 0, 'range-based for는 컨테이너의 모든 원소를 순서대로 순회해요. v의 1, 2, 3을 차례로 x에 대입하며 출력합니다.', 'range-based for 기본', 'for (타입 변수 : 컨테이너) — 모든 원소를 순서대로 순회.', ARRAY['"range-for"', '"for"', '"vector"'], NULL, NULL),
(10417, 'cpp', 'cpp-10', '쉬움', 'range-based for의 장점으로 옳은 것은?', '', ARRAY['"인덱스 없이 모든 원소를 간단하게 순회 가능"', '"인덱스로 특정 원소 접근이 더 쉬움"', '"역순 순회가 더 쉬움"', '"원소 수정이 자동으로 됨"'], 0, 'range-based for는 인덱스 관리 없이 컨테이너의 모든 원소를 순회할 때 편리해요. 단, 인덱스가 필요하거나 역순 순회가 필요하면 일반 for를 써야 해요.', 'range-for 장단점', 'range-for 장점: 간결, 인덱스 불필요. 단점: 인덱스 접근/역순 순회 불가.', ARRAY['"range-for"', '"인덱스"'], NULL, NULL),
(10418, 'cpp', 'cpp-12', '보통', '벡터의 모든 원소를 2배로 만들려면?', 'vector<int> v = {1, 2, 3};', ARRAY['"for (int& x : v) { x *= 2; }"', '"for (int x : v) { x *= 2; }"', '"for (const int& x : v) { x *= 2; }"', '"for (int x = v) { x *= 2; }"'], 0, 'int& x는 원소의 ''참조''를 받아요. x를 수정하면 실제 벡터의 원소가 바뀌어요. int x (복사)는 임시 변수만 바꾸고 원본은 그대로예요.', 'range-for 참조(&)', 'for (int& x : v) — 참조로 받아서 원소 수정 가능. for (int x : v) — 복사본, 원본 불변.', ARRAY['"range-for"', '"참조"', '"&"'], NULL, NULL),
(10419, 'cpp', 'cpp-10', '쉬움', '다음에서 x의 타입은?', 'auto x = 3.14;', ARRAY['"double"', '"float"', '"int"', '"auto (런타임에 결정)"'], 0, 'auto는 초기값을 보고 컴파일러가 타입을 결정해요. 3.14는 double 리터럴이므로 x는 double이 돼요. auto는 런타임이 아닌 컴파일 타임에 결정됩니다.', 'auto 타입 추론', 'auto = 컴파일러가 초기값에서 타입 추론. 3.14→double, 42→int, ''a''→char.', ARRAY['"auto"', '"타입 추론"'], NULL, NULL),
(10420, 'cpp', 'cpp-10', '쉬움', '다음 코드에서 auto가 추론하는 타입은?', 'vector<string> names = {"Alice", "Bob"};
for (auto name : names) {
    cout << name;
}', ARRAY['"string"', '"char*"', '"auto"', '"const string&"'], 0, 'vector<string>을 순회하므로 auto는 원소 타입인 string으로 추론돼요. auto를 쓰면 타입을 직접 쓰지 않아도 되서 편리해요.', 'range-for with auto', 'for (auto x : v) — auto가 컨테이너 원소 타입으로 추론됨.', ARRAY['"auto"', '"range-for"', '"타입 추론"'], NULL, NULL),
(10421, 'cpp', 'cpp-16', '쉬움', '다음 코드의 출력 결과는?', 'map<string, int> score;
score["Alice"] = 90;
score["Bob"] = 85;
cout << score["Alice"] << endl;', ARRAY['"90"', '"85"', '"0"', '"컴파일 오류"'], 0, 'map은 키-값 쌍을 저장해요. score["Alice"] = 90으로 저장하고, score["Alice"]로 값을 꺼내면 90이 나와요.', 'map 삽입과 접근', 'map[key] = value로 삽입, map[key]로 접근. 없는 키 접근 시 기본값(0) 생성 주의.', ARRAY['"map"', '"키-값"', '"STL"'], NULL, NULL),
(10422, 'cpp', 'cpp-16', '쉬움', 'map<int, string>에 {3,"C"}, {1,"A"}, {2,"B"}를 넣고 순서대로 출력하면?', '', ARRAY['"1 2 3 순서로 출력"', '"넣은 순서(3 1 2)로 출력"', '"무작위 순서"', '"컴파일 오류"'], 0, 'map은 키를 자동으로 오름차순 정렬해서 저장해요. 순서와 상관없이 넣어도 항상 키 기준 오름차순으로 순회됩니다.', 'map 자동 정렬', 'map은 키를 항상 오름차순으로 정렬 유지. 삽입 순서와 무관.', ARRAY['"map"', '"정렬"', '"키"'], NULL, NULL),
(10423, 'cpp', 'cpp-16', '쉬움', 'map에서 키가 존재하는지 확인하는 올바른 코드는?', 'map<string, int> m;
m["apple"] = 5;', ARRAY['"if (m.count(\"apple\")) { ... }"', '"if (m.has(\"apple\")) { ... }"', '"if (m[\"apple\"] != null) { ... }"', '"if (m.exists(\"apple\")) { ... }"'], 0, 'map.count(key)는 키가 있으면 1, 없으면 0을 반환해요. if문에서 1은 true로 처리되므로 존재 확인에 사용할 수 있어요.', 'map.count() 존재 확인', 'm.count(key): 키 존재하면 1, 없으면 0 반환. if(m.count(key))로 존재 확인.', ARRAY['"map"', '"count"', '"존재 확인"'], NULL, NULL),
(10424, 'cpp', 'cpp-16', '쉬움', '다음 코드에서 s.size()는?', 'set<int> s;
s.insert(3);
s.insert(1);
s.insert(3);
s.insert(2);', ARRAY['"3"', '"4"', '"2"', '"1"'], 0, 'set은 중복을 허용하지 않아요. 3을 두 번 insert해도 한 번만 저장돼요. {1, 2, 3} 세 개만 있으므로 size()는 3.', 'set 중복 제거', 'set은 중복 원소를 자동으로 제거. 같은 값 insert해도 하나만 유지.', ARRAY['"set"', '"중복 제거"', '"insert"'], NULL, NULL),
(10425, 'cpp', 'cpp-16', '보통', 'map과 unordered_map의 차이로 올바른 것은?', '', ARRAY['"map은 키 정렬 O(log n), unordered_map은 정렬 없이 O(1) 평균"', '"map은 O(1), unordered_map은 O(log n)"', '"둘 다 O(1)이지만 메모리 사용이 다름"', '"map은 숫자 키만, unordered_map은 문자열 키만 가능"'], 0, 'map은 레드-블랙 트리 기반으로 키를 정렬 유지하므로 O(log n). unordered_map은 해시 테이블 기반으로 정렬 없이 O(1) 평균 탐색. 순서가 필요 없으면 unordered_map이 더 빨라요.', 'map vs unordered_map', 'map: 정렬 O(log n). unordered_map: 해시 O(1) 평균. 순서 불필요하면 unordered_map이 빠름.', ARRAY['"map"', '"unordered_map"', '"시간복잡도"'], NULL, NULL),
(10426, 'cpp', 'cpp-16', '쉬움', '다음 코드의 출력 결과는?', 'set<int> s = {5, 2, 8, 1, 3};
for (int x : s) cout << x << " ";', ARRAY['"1 2 3 5 8"', '"5 2 8 1 3"', '"8 5 3 2 1"', '"무작위"'], 0, 'set은 원소를 자동으로 오름차순 정렬해서 저장해요. 어떤 순서로 넣어도 순회할 때 항상 정렬된 순서로 나와요.', 'set 자동 정렬', 'set은 항상 오름차순 정렬 유지. range-for로 순회하면 정렬된 순서로 출력.', ARRAY['"set"', '"정렬"', '"range-for"'], NULL, NULL),
(10427, 'cpp', 'cpp-17', '쉬움', 'min(7, 3)의 결과는?', '#include <algorithm>
using namespace std;
// min(7, 3) = ?', ARRAY['"3"', '"7"', '"4"', '"컴파일 오류"'], 0, 'min(a, b)는 두 값 중 작은 것을 반환해요. min(7, 3) = 3. max(7, 3) = 7.', 'min/max 함수', 'min(a, b): 작은 값 반환. max(a, b): 큰 값 반환. #include <algorithm> 필요.', ARRAY['"min"', '"max"', '"algorithm"'], NULL, NULL),
(10428, 'cpp', 'cpp-17', '쉬움', '다음 코드의 출력 결과는?', 'vector<int> v = {1, 3, 2, 3, 4, 3};
cout << count(v.begin(), v.end(), 3);', ARRAY['"3"', '"1"', '"6"', '"2"'], 0, 'count(begin, end, value)는 범위 안에서 value가 몇 번 나오는지 세요. v에서 3은 세 번 등장하므로 3이 출력돼요.', 'count() 함수', 'count(v.begin(), v.end(), 값): 범위에서 특정 값의 개수 반환.', ARRAY['"count"', '"algorithm"', '"빈도"'], NULL, NULL),
(10429, 'cpp', 'cpp-17', '보통', 'find()로 원소를 못 찾았을 때 반환 값은?', 'vector<int> v = {1, 2, 3};
auto it = find(v.begin(), v.end(), 99);', ARRAY['"v.end()"', '"nullptr"', '"-1"', '"0"'], 0, 'find()는 원소를 찾으면 해당 위치의 이터레이터를 반환하고, 못 찾으면 end()를 반환해요. 항상 ''if (it != v.end())''로 검사해야 해요.', 'find() 반환값', 'find(begin, end, 값): 찾으면 해당 이터레이터, 못 찾으면 end() 반환.', ARRAY['"find"', '"iterator"', '"end"'], NULL, NULL),
(10430, 'cpp', 'cpp-17', '쉬움', '다음 코드의 출력 결과는?', '#include <numeric>
vector<int> v = {1, 2, 3, 4, 5};
cout << accumulate(v.begin(), v.end(), 0);', ARRAY['"15"', '"0"', '"5"', '"120"'], 0, 'accumulate(begin, end, 초기값)는 범위의 합을 구해요. 초기값 0 + 1+2+3+4+5 = 15. #include <numeric>이 필요해요.', 'accumulate() 합산', 'accumulate(begin, end, 초기값): 범위 합산. #include <numeric> 필요.', ARRAY['"accumulate"', '"numeric"', '"합계"'], NULL, NULL),
(10431, 'cpp', 'cpp-17', '쉬움', '다음 코드 실행 후 v[0]의 값은?', 'vector<int> v = {1, 2, 3, 4, 5};
reverse(v.begin(), v.end());', ARRAY['"5"', '"1"', '"3"', '"0"'], 0, 'reverse(begin, end)는 범위를 뒤집어요. {1,2,3,4,5} → {5,4,3,2,1}. v[0]은 5가 돼요.', 'reverse() 함수', 'reverse(v.begin(), v.end()): 범위를 제자리에서 뒤집기.', ARRAY['"reverse"', '"algorithm"'], NULL, NULL),
(10432, 'cpp', 'cpp-17', '보통', 'binary_search()를 사용하기 전에 반드시 해야 할 것은?', '', ARRAY['"sort()로 정렬"', '"#include <numeric> 포함"', '"vector 크기를 2의 배수로 맞춤"', '"아무것도 안 해도 됨"'], 0, 'binary_search는 이진 탐색을 사용하므로 반드시 정렬된 배열에서만 동작해요. 정렬 안 하면 잘못된 결과가 나올 수 있어요.', 'binary_search 전제조건', 'binary_search 사용 전 반드시 sort() 필요. 정렬 없이 사용하면 결과 보장 안 됨.', ARRAY['"binary_search"', '"sort"', '"이진탐색"'], NULL, NULL),
(10433, 'cpp', 'cpp-8', '쉬움', 'void 함수에 대한 설명으로 올바른 것은?', 'void printHello() {
    cout << "Hello!";
}', ARRAY['"반환값이 없는 함수"', '"아무것도 출력 못하는 함수"', '"매개변수가 없는 함수"', '"호출할 수 없는 함수"'], 0, 'void는 ''반환값 없음''을 의미해요. return 문을 쓰지 않거나 return;만 씁니다. 출력(cout)은 할 수 있어요.', 'void 함수', 'void 함수: 반환값 없음. cout으로 출력은 가능. return; 또는 생략 가능.', ARRAY['"void"', '"함수"', '"반환"'], NULL, NULL),
(10434, 'cpp', 'cpp-8', '쉬움', '다음 함수의 반환 타입으로 올바른 것은?', '___ isEven(int n) {
    return n % 2 == 0;
}', ARRAY['"bool"', '"int"', '"void"', '"string"'], 0, 'n % 2 == 0은 true 또는 false를 반환하므로 bool 타입이에요. 함수가 true/false를 반환할 때는 bool을 써요.', '반환 타입 결정', '반환하는 값의 타입 = 함수의 반환 타입. true/false → bool, 정수 → int, 소수 → double.', ARRAY['"bool"', '"반환 타입"', '"함수"'], NULL, NULL),
(10435, 'cpp', 'cpp-8', '보통', '다음 코드의 출력 결과는?', 'int add(int a, int b = 10) {
    return a + b;
}
int main() {
    cout << add(5) << endl;
    cout << add(5, 3) << endl;
}', ARRAY['"15
8"', '"5
8"', '"15
15"', '"컴파일 오류"'], 0, 'add(5)는 b가 기본값 10이 되어 5+10=15. add(5,3)은 b=3이 되어 5+3=8.', '기본 매개변수', '기본값이 있는 매개변수는 호출 시 생략 가능. 생략하면 기본값 사용.', ARRAY['"기본 매개변수"', '"함수"', '"오버로딩"'], NULL, NULL),
(10436, 'cpp', 'cpp-8', '쉬움', '다음 함수에서 매개변수, 반환 타입, 함수명을 올바르게 나열한 것은?', 'double average(int a, int b) {
    return (a + b) / 2.0;
}', ARRAY['"반환타입: double, 함수명: average, 매개변수: int a, int b"', '"반환타입: int, 함수명: double, 매개변수: average"', '"반환타입: average, 함수명: double, 매개변수: a+b"', '"반환타입: void, 함수명: average, 매개변수: double"'], 0, '함수 구조: 반환타입(double) 함수명(average)(매개변수(int a, int b)). 반환타입이 맨 앞에 오고 그 다음 함수명, 괄호 안에 매개변수가 와요.', '함수 구조', '함수 구조: 반환타입 함수명(매개변수) { 본문 }. 반환타입이 맨 앞.', ARRAY['"함수 구조"', '"매개변수"', '"반환 타입"'], NULL, NULL),
(10437, 'cpp', 'cpp-11', '쉬움', 'C++에서 두 문자열이 같은지 비교하는 올바른 코드는?', '', ARRAY['"if (s1 == s2)"', '"if (s1.equals(s2))"', '"if (strcmp(s1, s2) == 0)"', '"if (s1.compare(s2))"'], 0, 'C++의 string은 == 연산자로 직접 비교할 수 있어요. s1.equals()는 Java 문법이고, strcmp()는 C-string 함수예요.', 'string 비교', 'string 비교: ==, !=, <, >, <=, >= 모두 사용 가능. 사전순 비교.', ARRAY['"string"', '"=="', '"비교"'], NULL, NULL),
(10438, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', 'string a = "apple";
string b = "banana";
cout << (a < b) << endl;', ARRAY['"1"', '"0"', '"-1"', '"컴파일 오류"'], 0, 'string < 연산자는 사전순(알파벳순) 비교를 해요. ''apple''의 ''a''(97)가 ''banana''의 ''b''(98)보다 작으므로 a < b는 true(1)이에요.', 'string 사전순 비교', 'string <, > 연산자: 사전순 비교. 첫 글자부터 비교하고 같으면 다음 글자 비교.', ARRAY['"string"', '"<"', '"사전순"'], NULL, NULL),
(10439, 'cpp', 'cpp-11', '보통', '다음 코드의 출력 결과는?', 'string s = "Hello World";
int pos = s.find("World");
cout << pos << endl;', ARRAY['"6"', '"5"', '"0"', '"-1"'], 0, 'find()는 부분 문자열의 시작 인덱스를 반환해요. "Hello "가 0~5이고 ''W''는 6번째 위치(0-based)이므로 6이 출력돼요.', 'string.find() 인덱스', 's.find(부분문자열): 처음 등장하는 위치(0-based) 반환. 없으면 string::npos.', ARRAY['"find"', '"string"', '"인덱스"'], NULL, NULL),
(10440, 'cpp', 'cpp-12', '보통', '문자열 전체를 대문자로 바꾸는 올바른 코드는?', 'string s = "hello";', ARRAY['"for (char& c : s) c = toupper(c);"', '"s = toupper(s);"', '"s.toUpper();"', '"transform(s, toupper);"'], 0, 'toupper()는 문자 하나에만 적용돼요. range-for에서 char& (참조)로 받아야 원본이 바뀌어요. s = toupper(s)는 문자열 전체에 적용 불가.', '문자 대소문자 변환', 'toupper(c)/tolower(c): 문자 하나씩 변환. 전체 문자열은 range-for + 참조(&) 사용.', ARRAY['"toupper"', '"tolower"', '"range-for"'], NULL, NULL),
(10441, 'cpp', 'cpp-12', '쉬움', '다음 코드에서 ref = 20 후 x의 값은?', 'int x = 10;
int& ref = x;
ref = 20;', ARRAY['"20"', '"10"', '"오류"', '"알 수 없음"'], 0, '참조(int&)는 변수의 별명이에요. ref와 x는 같은 메모리를 가리키므로 ref = 20은 x = 20과 동일해요.', '참조(Reference) 기본', 'int& ref = x: ref는 x의 별명. ref 수정 = x 수정. 같은 메모리 공유.', ARRAY['"참조"', '"&"', '"alias"'], NULL, NULL),
(10442, 'cpp', 'cpp-12', '보통', '다음 코드에서 함수 호출 후 a의 값은?', 'void addTen(int x) {
    x += 10;
}
int main() {
    int a = 5;
    addTen(a);
    cout << a;
}', ARRAY['"5"', '"15"', '"10"', '"오류"'], 0, '값 전달(call by value)은 복사본을 전달해요. 함수 안에서 x를 바꿔도 원본 a는 변하지 않아요. a는 여전히 5.', '값 전달 (Call by Value)', 'void f(int x): 복사본 전달. 함수 내 수정이 원본에 영향 없음.', ARRAY['"값 전달"', '"call by value"', '"복사"'], NULL, NULL),
(10443, 'cpp', 'cpp-12', '보통', '다음 코드에서 함수 호출 후 a의 값은?', 'void addTen(int& x) {
    x += 10;
}
int main() {
    int a = 5;
    addTen(a);
    cout << a;
}', ARRAY['"15"', '"5"', '"10"', '"오류"'], 0, '참조 전달(call by reference)은 원본의 별명을 전달해요. 함수 안에서 x를 바꾸면 원본 a도 바뀌어요. a = 5 + 10 = 15.', '참조 전달 (Call by Reference)', 'void f(int& x): 원본의 참조 전달. 함수 내 수정이 원본에 영향 미침.', ARRAY['"참조 전달"', '"call by reference"', '"&"'], NULL, NULL),
(10444, 'cpp', 'cpp-12', '보통', 'const 참조 매개변수의 장점으로 올바른 것은?', 'void print(const string& s) {
    cout << s;
}', ARRAY['"복사 없이 읽기 전용으로 전달 (빠름)"', '"문자열 수정이 가능함"', '"반드시 리터럴만 전달 가능"', '"참조보다 느림"'], 0, 'const string&는 복사 없이(빠름) 원본을 전달하되 수정은 못해요. 큰 객체(string, vector 등)를 함수에 넘길 때 const&가 효율적이에요.', 'const 참조 매개변수', 'const T& 매개변수: 복사 없이 읽기만 가능. 큰 객체를 효율적으로 전달할 때 사용.', ARRAY['"const"', '"참조"', '"성능"'], NULL, NULL),
(10445, 'cpp', 'cpp-13', '쉬움', 'int 변수를 가리키는 포인터 선언으로 올바른 것은?', '', ARRAY['"int* ptr;"', '"int ptr*;"', '"pointer<int> ptr;"', '"int& ptr;"'], 0, '포인터는 타입 뒤에 *를 붙여 선언해요. int* ptr은 int형 변수의 주소를 저장하는 포인터예요. int& ptr은 참조(reference)로 다른 개념이에요.', '포인터 선언', '타입* 변수명 — 포인터 선언. int* p는 int 변수의 주소를 저장.', ARRAY['"포인터"', '"*"', '"선언"'], NULL, NULL),
(10446, 'cpp', 'cpp-13', '쉬움', '다음 코드에서 ptr에 저장되는 것은?', 'int x = 42;
int* ptr = &x;', ARRAY['"x의 메모리 주소"', '"42"', '"x의 복사본"', '"nullptr"'], 0, '&x는 x의 메모리 주소를 가져와요. ptr은 42라는 값이 아니라 x가 저장된 위치(주소)를 담고 있어요.', '주소 연산자 &', '&변수: 변수의 메모리 주소 반환. 포인터에 저장해 나중에 접근 가능.', ARRAY['"&"', '"주소"', '"포인터"'], NULL, NULL),
(10447, 'cpp', 'cpp-13', '보통', '다음 코드의 출력 결과는?', 'int x = 10;
int* ptr = &x;
*ptr = 99;
cout << x << endl;', ARRAY['"99"', '"10"', '"주소값"', '"오류"'], 0, '*ptr은 ptr이 가리키는 주소의 값에 접근해요(역참조). *ptr = 99는 x = 99와 같아요. x를 출력하면 99가 나와요.', '역참조 연산자 *', '*ptr: 포인터가 가리키는 주소의 값에 접근(역참조). *ptr = 값으로 원본 수정 가능.', ARRAY['"*"', '"역참조"', '"포인터"'], NULL, NULL),
(10448, 'cpp', 'cpp-13', '쉬움', '포인터가 아무것도 가리키지 않음을 나타내는 올바른 표현은?', '', ARRAY['"nullptr"', '"NULL"', '"0"', '"empty"'], 0, 'C++11부터는 nullptr을 사용해요. NULL(0)도 동작하지만 nullptr이 타입 안전하고 명확해요. 포인터 사용 전 nullptr 검사를 권장해요.', 'nullptr', 'nullptr: 포인터가 아무것도 가리키지 않음. C++11부터 NULL 대신 nullptr 사용 권장.', ARRAY['"nullptr"', '"NULL"', '"포인터 안전"'], NULL, NULL),
(10449, 'cpp', 'cpp-14', '쉬움', 'struct를 쓰는 이유로 가장 적절한 것은?', 'struct Student {
    string name;
    int age;
    double gpa;
};', ARRAY['"관련된 데이터를 하나로 묶기 위해"', '"반복문을 빠르게 하기 위해"', '"함수를 대체하기 위해"', '"메모리를 절약하기 위해"'], 0, 'struct는 관련 데이터를 하나의 이름으로 묶어요. 학생이름/나이/학점처럼 함께 다니는 데이터를 하나로 관리할 수 있어요.', 'struct 목적', 'struct: 관련 데이터를 하나로 묶는 자료구조. 멤버는 기본 public.', ARRAY['"struct"', '"데이터 묶기"'], NULL, NULL),
(10450, 'cpp', 'cpp-14', '쉬움', '다음 코드의 출력 결과는?', 'struct Point {
    int x;
    int y;
};
Point p = {3, 7};
cout << p.x + p.y << endl;', ARRAY['"10"', '"3"', '"7"', '"오류"'], 0, 'struct 멤버는 . 연산자로 접근해요. p.x = 3, p.y = 7이므로 p.x + p.y = 10.', '멤버 접근 (. 연산자)', 'struct/class 멤버 접근: 변수명.멤버명. p.x, p.name 등.', ARRAY['"."', '"멤버 접근"', '"struct"'], NULL, NULL),
(10455, 'cpp', 'cpp-20', '쉬움', 'long long을 ll로 짧게 쓰는 올바른 방법은?', '', ARRAY['"using ll = long long;"', '"define ll = long long;"', '"typedef = ll long long;"', '"ll = long long;"'], 0, 'C++11부터는 using으로 타입 별칭을 만들어요. using ll = long long;으로 선언 후 ll x = 1e18;처럼 사용 가능해요.', 'using 타입 별칭', 'using 별칭 = 타입; — 긴 타입명을 짧게. using ll = long long; using vi = vector<int>;', ARRAY['"using"', '"typedef"', '"타입 별칭"', '"ll"'], NULL, NULL),
(10456, 'cpp', 'cpp-20', '보통', 'n이 홀수인지 확인하는 비트 연산은?', '', ARRAY['"n & 1"', '"n | 1"', '"n ^ 1"', '"n << 1"'], 0, 'n & 1은 n의 마지막 비트만 확인해요. 홀수는 마지막 비트가 1이므로 n & 1 = 1(true), 짝수는 0(false)이에요. n % 2보다 빠릅니다.', '비트 AND (&) 홀수 확인', 'n & 1: n의 최하위 비트 확인. 홀수면 1, 짝수면 0. % 2보다 빠른 홀짝 판별.', ARRAY['"&"', '"비트 연산"', '"홀수"', '"CP 팁"'], NULL, NULL),
(10457, 'cpp', 'cpp-20', '보통', '1 << 3의 결과는?', '', ARRAY['"8"', '"3"', '"4"', '"6"'], 0, '1 << 3은 1을 왼쪽으로 3비트 이동: 1 → 10 → 100 → 1000(2진수) = 8. 1 << k는 2^k를 계산할 때 자주 써요.', '비트 시프트 (<<)', '1 << k = 2^k. n >> 1 = n/2. 경쟁 프로그래밍에서 빠른 거듭제곱 계산에 활용.', ARRAY['"<<"', '"비트 시프트"', '"2의 거듭제곱"'], NULL, NULL),
(10458, 'cpp', 'cpp-20', '쉬움', '경쟁 프로그래밍에서 INF = 1e9 (10억)을 쓰는 이유는?', '', ARRAY['"최솟값 탐색 시 초기값으로 사용하기 위해"', '"정수 최대값이 1e9이기 때문에"', '"출력 속도를 높이기 위해"', '"컴파일러 최적화를 위해"'], 0, '거리/비용의 최솟값을 구할 때 초기값으로 ''충분히 큰 수''가 필요해요. INT_MAX를 쓰면 더하기 연산에서 오버플로우가 나므로 1e9 같은 안전한 값을 써요.', 'INF 상수', 'const int INF = 1e9; — 최솟값 탐색 초기화에 사용. INT_MAX 대신 오버플로우 방지.', ARRAY['"INF"', '"상수"', '"최솟값 초기화"', '"CP"'], NULL, NULL),
(10464, 'cpp', 'cpp-12', '보통', '이름 목록을 출력만 할 때 가장 적절한 패턴은?', 'vector<string> names = {"Alice", "Bob", "Charlie"};
// 출력만 하고 수정은 하지 않을 때
for (___________ name : names) {
    cout << name << "\n";
}', ARRAY['"for (string name : names)"', '"for (string& name : names)"', '"for (const string& name : names)"', '"for (string* name : names)"'], 2, 'string은 글자가 많을수록 복사 비용이 커요. const string&는 복사 없이 원본을 바로 읽고, const라서 실수로 수정하는 것도 막아줘요. string& 는 수정 가능해서 읽기 전용엔 부적절해요.', 'const 참조로 range-for', 'string처럼 크기가 큰 타입은 복사보다 const 참조가 훨씬 효율적이에요. 읽기만 할 때 → const T&', ARRAY['"const"', '"참조"', '"range-for"', '"string"'], NULL, NULL),
(10465, 'cpp', 'cpp-12', '보통', '다음 코드 실행 후 v의 값은?', 'vector<int> v = {1, 2, 3};
for (const int& x : v) {
    // x = x * 2;  ← 이 줄의 주석을 제거하면?
}', ARRAY['"{2, 4, 6} — 정상 실행"', '"컴파일 에러 — const라서 수정 불가"', '"{1, 2, 3} — 복사본이라서 원본 불변"', '"런타임 에러"'], 1, 'const int& x는 읽기 전용 참조예요. x = 값 으로 수정하려 하면 컴파일 에러가 발생해요. 이게 const의 역할 — 실수 방지!', 'const 참조의 보호', 'const int&는 원본을 직접 가리키지만(참조), const라서 값 수정이 불가능해요. 컴파일러가 실수를 잡아줘요.', ARRAY['"const"', '"참조"', '"컴파일 에러"', '"읽기전용"'], NULL, NULL),
(10466, 'cpp', 'cpp-12', '쉬움', 'for (int x : v) vs for (int& x : v)의 차이로 올바른 것은?', 'vector<int> v = {10, 20, 30};', ARRAY['"int x는 빠르고, int& x는 느리다"', '"int x는 복사본, int& x는 원본 직접 접근"', '"int x로도 원본 수정이 가능하다"', '"둘의 차이가 없다"'], 1, 'int x는 매 반복마다 값을 복사 → 원본 수정 불가, 복사 비용 발생. int& x는 원본을 직접 가리킴 → 수정 가능, 빠름!', '복사 vs 참조', '& 없이는 복사본, &를 붙이면 원본에 직접 접근. 수정이 필요하면 &, 읽기만 하면 const &.', ARRAY['"참조"', '"복사"', '"range-for"', '"&"'], NULL, NULL),
(10467, 'cpp', 'cpp-13', '쉬움', '포인터 선언 `int* ptr`에서 별표의 의미는?', '', ARRAY['"역참조 연산자 — 값을 가져온다"', '"포인터 타입 선언 — 주소를 저장하는 변수"', '"곱셈 연산자"', '"주소를 가져오는 연산자"'], 1, '선언에서 int* ptr의 *는 타입의 일부예요. ''ptr은 int를 가리키는 포인터''라는 뜻이에요! 사용할 때 *ptr은 역참조 연산자로, 의미가 달라져요.', '포인터 선언', '선언의 *는 타입의 일부, 사용의 *는 역참조 연산자예요.', NULL, NULL, NULL),
(10469, 'cpp', 'cpp-13', '쉬움', 'nullptr을 역참조하면 어떻게 되나요?', 'int* p = nullptr;
cout << *p;  // ??', ARRAY['"0 출력"', '"nullptr 출력"', '"프로그램 충돌 (segfault)"', '"아무것도 출력 안 함"'], 2, 'nullptr인 포인터를 역참조하면 segfault가 발생해 프로그램이 충돌해요! 항상 if (p != nullptr)로 확인한 후 역참조해야 해요.', 'nullptr 안전 체크', '역참조 전에 반드시 nullptr 체크를 해야 해요.', NULL, NULL, NULL),
(10471, 'cpp', 'cpp-13', '보통', '다음 코드의 출력은?', 'int x = 10;
int* ptr = &x;
*ptr = *ptr * 2;
cout << x;', ARRAY['"10"', '"20"', '"0"', '"에러"'], 1, '*ptr은 x의 값(10)이에요. *ptr * 2 = 20을 *ptr에 저장하면 x가 20이 돼요. 역참조로 원본 변수를 직접 수정한 거예요!', '역참조로 값 수정', '*ptr = 값 으로 포인터가 가리키는 변수를 수정할 수 있어요.', NULL, NULL, NULL),
(10472, 'cpp', 'cpp-13', '보통', '포인터를 받는 함수를 올바르게 호출하는 것은?', 'void double_it(int* p) { *p *= 2; }
int x = 5;', ARRAY['"double_it(x);"', '"double_it(*x);"', '"double_it(&x);"', '"double_it(&&x);"'], 2, '포인터 매개변수(int* p)를 받는 함수에는 &x처럼 주소를 넘겨야 해요. 함수 안에서 *p로 x를 수정할 수 있어요!', '포인터로 함수 전달', '포인터 매개변수 함수는 &x (주소)를 인수로 받아요.', NULL, NULL, NULL),
(10475, 'cpp', 'cpp-13', '어려움', '다음 코드의 출력은?', 'int a = 1, b = 2;
int* p = &a;
p = &b;
*p = 9;
cout << a << " " << b;', ARRAY['"9 2"', '"1 9"', '"9 9"', '"에러"'], 1, 'p가 처음엔 a를 가리키다가, p = &b로 b를 가리키게 됩니다. *p = 9는 b를 9로 바꿔요. 참조와 달리 포인터는 가리키는 대상을 바꿀 수 있어요!', '포인터 재지정', '포인터는 p = &b처럼 다른 변수를 가리키도록 재지정할 수 있어요.', NULL, NULL, NULL),
(10476, 'cpp', 'cpp-13', '어려움', '다음 두 함수 중 x의 원본을 수정하는 것은?', 'void f1(int  n) { n  = 99; }
void f2(int* p) { *p = 99; }

int x = 1;
f1(x);
f2(&x);', ARRAY['"f1만 수정한다"', '"f2만 수정한다"', '"둘 다 수정한다"', '"둘 다 수정 안 한다"'], 1, 'f1은 복사본 n을 수정하므로 x에 영향 없어요. f2는 포인터로 &x를 받아 *p = 99로 x를 직접 수정해요!', '값 전달 vs 포인터 전달', '포인터로 전달할 때만 원본 변수를 함수 안에서 수정할 수 있어요.', NULL, NULL, NULL),
(10492, 'cpp', 'cpp-21', '쉬움', '`int grid[3][3];` 와 `int grid[3][3] = {};` 의 차이는?', 'int a[3][3];        // 선언만
int b[3][3] = {};   // 초기화까지', ARRAY['"차이 없다 — 둘 다 0으로 초기화된다"', '"a는 쓰레기 값, b는 전부 0으로 초기화된다"', '"a는 0, b는 쓰레기 값이다"', '"컴파일 에러가 발생한다"'], 1, '선언만 하면(a) 메모리에 쓰레기 값이 남아요. `= {}`를 붙이면(b) 모든 원소가 0으로 초기화돼요. 2D 배열 사용 전에 `= {}`로 초기화하는 습관이 중요해요!', '2D 배열 제로 초기화', '`int arr[N][M] = {};` — 이 한 줄로 모든 원소를 0으로 초기화해요. 초기화 없이 사용하면 쓰레기 값으로 인한 버그가 생겨요.', ARRAY['"2차원 배열"', '"초기화"', '"= {}"', '"쓰레기 값"'], NULL, NULL),
(10493, 'cpp', 'cpp-21', '쉬움', '5행 3열의 2D 배열을 0으로 초기화하는 올바른 선언은?', '// 행(row) = 가로줄 수
// 열(col) = 세로줄 수', ARRAY['"int grid[3][5] = {};"', '"int grid[5][3] = {};"', '"int grid[5, 3] = {};"', '"int grid[5][3];"'], 1, '선언 형식은 `타입 이름[행][열]`이에요. 5행 3열이면 `int grid[5][3] = {};`. `[3][5]`는 3행 5열이라 반대예요!', '2D 배열 선언: [행][열] 순서', '`int arr[행수][열수]` — 행이 먼저, 열이 나중이에요. 헷갈리면 ''행은 가로(줄 수), 열은 세로(칸 수)''로 기억하세요.', ARRAY['"2차원 배열"', '"행"', '"열"', '"선언"'], NULL, NULL),
(10494, 'cpp', 'cpp-21', '쉬움', '다음 이중 for문의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << grid[i][j] << " ";
        }
        cout << "\n";
    }
    return 0;
}', ARRAY['"1 2 3 \n4 5 6"', '"1 2 3 4 5 6"', '"4 5 6 \n1 2 3"', '"1 4 \n2 5 \n3 6"'], 0, '바깥 루프 i가 행(0→1), 안쪽 루프 j가 열(0→2)을 순회해요. 행이 끝날 때마다 `\n`으로 줄바꿈하므로 1 2 3 이 출력되고 줄바꿈 후 4 5 6이 나와요.', '이중 for문 순회', '바깥 루프 i = 행, 안쪽 루프 j = 열. `grid[i][j]`로 모든 원소를 순서대로 방문해요. 행 끝에 `cout << "\n"`으로 줄바꿈해요.', ARRAY['"이중 for문"', '"2차원 배열"', '"순회"'], NULL, NULL),
(10495, 'cpp', 'cpp-21', '보통', '3행 4열 배열을 이중 for문으로 전체 순회할 때, 안쪽 `cout << grid[i][j];`가 실행되는 총 횟수는?', 'for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        cout << grid[i][j];', ARRAY['"7번"', '"12번"', '"9번"', '"16번"'], 1, '바깥 루프 3번 × 안쪽 루프 4번 = 12번이에요. 이중 for문의 실행 횟수는 행 수 × 열 수예요.', '이중 for문 실행 횟수', '이중 for문에서 안쪽 코드의 실행 횟수 = 바깥 루프 반복 수 × 안쪽 루프 반복 수. 3×4 배열이면 12번.', ARRAY['"이중 for문"', '"실행 횟수"', '"행 × 열"'], NULL, NULL),
(10496, 'cpp', 'cpp-21', '보통', '`vector<vector<int>> v(5, vector<int>(3, 0));` 에서 행의 수와 열의 수는?', 'vector<vector<int>> v(5, vector<int>(3, 0));
cout << v.size();      // ?
cout << v[0].size();   // ?', ARRAY['"행 3, 열 5"', '"행 5, 열 3"', '"행 5, 열 5"', '"행 3, 열 3"'], 1, '`v(5, vector<int>(3, 0))`에서 바깥 숫자 5가 행 수, 안쪽 숫자 3이 열 수예요. `v.size()` = 5(행), `v[0].size()` = 3(열).', '2D vector의 행/열 수', '`v.size()` = 행 수, `v[0].size()` = 열 수. 선언 시 `(행, vector<int>(열, 초기값))` 순서예요.', ARRAY['"2D vector"', '"size()"', '"행"', '"열"'], NULL, NULL),
(10497, 'cpp', 'cpp-21', '보통', '다음 중 2행 3열 격자를 cin으로 입력받는 올바른 코드는?', '// 입력:
// 1 2 3
// 4 5 6', ARRAY['"for (int i = 0; i < 2; i++) {
    cin >> grid[i];
}"', '"for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        cin >> grid[i][j];
    }
}"', '"cin >> grid[0][0] >> grid[1][1];"', '"for (int j = 0; j < 3; j++) {
    cin >> grid[j];
}"'], 1, '2D 배열 입력은 이중 for문으로 `cin >> grid[i][j]`를 써요. cin은 공백/줄바꿈을 자동으로 건너뛰어서 순서대로 grid[0][0]=1, ..., grid[1][2]=6이 채워져요.', '2D 배열 cin 입력', '이중 for문 + `cin >> grid[i][j]` — USACO 문제에서 격자 입력받을 때 핵심 패턴이에요. cin은 공백/줄바꿈 자동 처리해요.', ARRAY['"cin"', '"2차원 배열"', '"입력"', '"USACO 패턴"'], NULL, NULL),
(10498, 'cpp', 'cpp-21', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 3, m = 3;
    vector<vector<int>> grid(n, vector<int>(m, 0));

    // 주 대각선에 1 저장
    for (int i = 0; i < n; i++)
        grid[i][i] = 1;

    int sum = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            sum += grid[i][j];

    cout << sum;
    return 0;
}', ARRAY['"0"', '"3"', '"9"', '"1"'], 1, 'grid를 전부 0으로 초기화 후, 대각선(grid[0][0], grid[1][1], grid[2][2])만 1로 설정해요. 전체 합 = 1+1+1 = 3이에요.', '2D vector + 대각선 + 전체 합', '`grid[i][i] = 1`로 대각선 설정, 이중 for로 전체 합 계산 — USACO에서 자주 나오는 조합이에요.', ARRAY['"2D vector"', '"대각선"', '"전체 합"', '"USACO 패턴"'], NULL, NULL),
(10499, 'cpp', 'cpp-21', '어려움', '다음 USACO 스타일 코드에서 입력이 `3 3` 이후 `1 2 3 / 4 5 6 / 7 8 9` 일 때 출력은?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> grid(n, vector<int>(m, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> grid[i][j];

    int total = 0;
    for (int i = 0; i < n; i++)
        total += grid[i][i];   // 대각선만 합산
    cout << total;
    return 0;
}', ARRAY['"45"', '"15"', '"12"', '"컴파일 에러"'], 1, '3×3 격자에서 대각선 원소는 grid[0][0]=1, grid[1][1]=5, grid[2][2]=9. 합계 = 1+5+9 = 15.', 'USACO 입력 + 대각선 합 패턴', 'N, M 입력 → 2D vector 생성 → 이중 for cin 입력 → 처리. 이 전체 흐름이 USACO 격자 문제의 기본 템플릿이에요.', ARRAY['"USACO 패턴"', '"cin 입력"', '"대각선 합"', '"2D vector"'], NULL, NULL),
(10477, 'cpp', 'cpp-22', '쉬움', 'class에 대한 설명으로 올바른 것은?', 'class Car {
    double speed;
    string color;

    void forward() { speed += 10; }
    void info() {
        cout << color << " " << speed;
    }
};', ARRAY['"class는 변수(데이터)만 가질 수 있다"', '"class는 함수만 가질 수 있다"', '"class는 데이터(멤버변수)와 함수(멤버함수)를 함께 묶는다"', '"class로 만든 객체는 점(.)으로 멤버에 접근할 수 없다"'], 2, 'class는 멤버변수(데이터)와 멤버함수를 함께 묶어 나만의 타입을 정의해요. 객체는 Car myCar; 처럼 만들고, myCar.forward(); 처럼 점(.)으로 접근해요.', 'class 기본 구조', 'class는 멤버변수(기억해야 할 것)와 멤버함수(해야 할 것)를 묶어 사용자 정의 타입을 만들어요.', ARRAY['"class"', '"멤버변수"', '"멤버함수"', '"OOP"'], NULL, NULL),
(10479, 'cpp', 'cpp-22', '쉬움', 'C++ 멤버함수 안에서 같은 클래스의 멤버변수에 접근하는 올바른 방법은?', 'class Car {
private:
    double speed;
public:
    void forward() {
        // speed를 10 올리려면?
    }
};', ARRAY['"self.speed += 10;"', '"Car.speed += 10;"', '"speed += 10;"', '"this->speed() += 10;"'], 2, 'C++에서는 멤버함수 안에서 멤버변수에 `speed`처럼 바로 접근해요. Python처럼 `self.speed`가 필요 없어요! C++은 같은 클래스 안이라면 자동으로 멤버변수를 찾아줘요.', '멤버함수 안에서 멤버변수 접근', 'Python에서는 self.speed처럼 self가 필요하지만, C++에서는 그냥 speed만 써요. 멤버함수 안에서는 같은 클래스의 멤버에 바로 접근할 수 있어요.', ARRAY['"멤버함수"', '"멤버변수"', '"self vs C++"', '"접근"'], NULL, NULL),
(10480, 'cpp', 'cpp-22', '쉬움', 'class에서 `private:` 아래에 선언된 멤버변수에 대한 설명으로 옳은 것은?', 'class BankAccount {
private:
    double balance;
public:
    void deposit(double a) { balance += a; }
};', ARRAY['"어디서나 접근할 수 있다"', '"클래스 내부 함수에서만 접근할 수 있다"', '"상속받은 클래스에서만 접근할 수 있다"', '"main() 함수에서만 접근할 수 있다"'], 1, 'private 멤버는 클래스 내부 함수(deposit 등)에서만 접근할 수 있어요. 외부에서 acc.balance = 1000; 처럼 직접 접근하면 컴파일 에러!', 'private 접근 제한', 'private: 아래 멤버는 클래스 내부에서만 접근 가능해요. 외부 코드로부터 데이터를 보호할 수 있어요.', ARRAY['"private"', '"접근 제어"', '"캡슐화"'], NULL, NULL),
(10481, 'cpp', 'cpp-22', '보통', '다음 코드에서 컴파일 에러가 발생하는 줄은?', 'class Box {
private:
    int size;
public:
    void setSize(int s) { size = s; }
    int getSize() { return size; }
};

int main() {
    Box b;
    b.size = 10;       // 줄 A
    b.setSize(10);     // 줄 B
    cout << b.getSize(); // 줄 C
    return 0;
}', ARRAY['"줄 A"', '"줄 B"', '"줄 C"', '"에러 없음"'], 0, 'size는 private이라 외부에서 b.size = 10으로 직접 접근하면 컴파일 에러! setSize()와 getSize()는 public 함수라 줄 B, C는 괜찮아요.', 'private 직접 접근 불가', 'private 멤버는 클래스 외부에서 직접 접근할 수 없어요. public 멤버함수를 통해서만 접근해야 해요.', ARRAY['"private"', '"컴파일 에러"', '"getter"', '"setter"'], NULL, NULL),
(10482, 'cpp', 'cpp-22', '보통', '다음 중 `Timer` 클래스의 생성자를 **올바르게** 작성한 것은?', 'class Timer {
private:
    int seconds;
public:
    // 생성자: seconds를 s로 초기화
    ???
};', ARRAY['"void Timer(int s) { seconds = s; }"', '"int Timer(int s) { seconds = s; }"', '"Timer(int s) { seconds = s; }"', '"timer(int s) { seconds = s; }"'], 2, '생성자는 ① 클래스 이름과 동일(Timer) ② 리턴 타입 없음(void도 안 됨!) ③ 매개변수 가능. `void Timer`는 리턴 타입이 있어서 틀리고, `timer`는 소문자라 클래스 이름과 달라서 틀려요.', '생성자 작성 규칙', '생성자 = 클래스 이름 + 괄호 + 본문. 리턴 타입을 쓰지 않아요. void도 안 돼요! 대소문자도 클래스 이름과 정확히 일치해야 해요.', ARRAY['"생성자"', '"리턴 타입 없음"', '"클래스 이름 일치"'], NULL, NULL),
(10483, 'cpp', 'cpp-22', '보통', 'getter와 setter에 대한 설명으로 옳지 않은 것은?', 'class Car {
private:
    double speed;
public:
    double getSpeed() { return speed; }
    void setSpeed(double s) {
        if (s >= 0) speed = s;
    }
};', ARRAY['"getter는 private 멤버의 값을 읽어서 반환하는 함수다"', '"setter는 값을 설정할 때 유효성 검사를 할 수 있다"', '"setter를 통하면 어떤 값이든 무조건 저장된다"', '"getter/setter는 private 멤버에 접근하는 공개 창구 역할을 한다"'], 2, 'setter는 유효성 검사를 포함할 수 있어요. 위 코드에서 setSpeed()는 s >= 0 일 때만 저장해요. 음수 속도를 거부할 수 있는 게 setter의 장점이에요!', 'getter / setter', 'getter는 값을 읽고, setter는 값을 설정해요. setter에서 잘못된 값을 거부하는 유효성 검사를 넣을 수 있어요.', ARRAY['"getter"', '"setter"', '"캡슐화"', '"유효성 검사"'], NULL, NULL),
(10486, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
    void info() {
        cout << owner << ": " << balance << "원";
    }
};

int main() {
    BankAccount acc("김철수", 5000);
    acc.info();
    return 0;
}', ARRAY['"김철수: 5000원"', '"컴파일 에러"', '"0원"', '"김철수"'], 0, 'BankAccount acc("김철수", 5000)에서 생성자가 자동 호출돼요. owner = "김철수", balance = 5000으로 초기화되고, info()가 "김철수: 5000원"을 출력해요.', '생성자로 객체 초기화', '생성자에 인자를 넘기면 객체가 생성되는 순간 자동으로 초기화돼요. 따로 setter를 호출할 필요가 없어요.', ARRAY['"생성자"', '"객체 초기화"', '"멤버함수"'], NULL, NULL),
(10487, 'cpp', 'cpp-22', '보통', '다음 클래스에서 객체를 **올바르게** 생성하는 코드는?', 'class BankAccount {
private:
    string owner;
    double balance;
public:
    BankAccount(string name, double initial) {
        owner = name;
        balance = initial;
    }
};', ARRAY['"BankAccount acc;"', '"BankAccount acc(\"김철수\", 1000);"', '"BankAccount acc = new BankAccount(\"김철수\", 1000);"', '"BankAccount(\"김철수\", 1000) acc;"'], 1, '매개변수가 있는 생성자는 `클래스명 변수명(인자1, 인자2);` 형식으로 호출해요. `acc;`만 쓰면 매개변수 없는 기본 생성자가 없어서 에러! `new`는 포인터용이라 틀려요.', '생성자로 객체 생성하는 문법', '매개변수 있는 생성자: `ClassName 변수명(값1, 값2);`. 괄호 안에 생성자 인자를 넘겨요. Java/Python의 `new`나 `ClassName()`과 형식이 달라요.', ARRAY['"생성자"', '"객체 생성 문법"', '"매개변수"'], NULL, NULL),
(10489, 'cpp', 'cpp-22', '어려움', 'class(클래스)와 struct(구조체)의 차이로 올바른 것은?', 'struct Point {
    int x;   // 기본: public
    int y;
};

class Circle {
    double radius;  // 기본: private
public:
    void setR(double r) { radius = r; }
};', ARRAY['"class는 멤버함수를 가질 수 없고, struct는 가질 수 있다"', '"struct의 기본 접근 제어는 private이고, class는 public이다"', '"struct의 기본 접근 제어는 public이고, class는 private이다"', '"class와 struct는 완전히 동일하다"'], 2, 'struct는 접근 제어 키워드가 없으면 기본이 public이고, class는 기본이 private이에요. 이것이 가장 핵심적인 차이예요!', 'class vs struct 기본 접근 제어', 'struct: 기본 public / class: 기본 private. 실무에서는 순수 데이터 묶음은 struct, 캡슐화가 필요하면 class를 주로 써요.', ARRAY['"class"', '"struct"', '"private"', '"public"', '"기본 접근 제어"'], NULL, NULL),
(10490, 'cpp', 'cpp-22', '어려움', '다음 코드에서 잘못된 부분은?', 'class Player {
private:
    int hp;
    int attack;
public:
    void Player(int h, int a) {   // 생성자??
        hp = h;
        attack = a;
    }
    int getHp() { return hp; }
};

int main() {
    Player p(100, 30);
    cout << p.getHp();
}', ARRAY['"멤버변수를 private으로 선언한 것"', '"getHp()의 반환 타입이 int인 것"', '"생성자에 void 리턴 타입을 붙인 것"', '"매개변수 이름이 h, a인 것"'], 2, '생성자는 리턴 타입이 없어야 해요. void를 붙이면 생성자가 아닌 일반 함수로 인식돼요! Player(int h, int a)처럼 void 없이 써야 해요.', '생성자에 void 금지', '생성자는 리턴 타입을 쓰지 않아요. void를 쓰면 컴파일러가 생성자가 아닌 일반 멤버함수로 처리해서 객체 초기화가 안 돼요.', ARRAY['"생성자"', '"리턴 타입 없음"', '"void 금지"'], NULL, NULL),
(10491, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    BankAccount(double initial) {
        if (initial >= 0) balance = initial;
        else              balance = 0;
    }
    void deposit(double a) {
        if (a > 0) balance += a;
    }
    void withdraw(double a) {
        if (a > 0 && balance >= a) balance -= a;
    }
    double getBalance() { return balance; }
};

int main() {
    BankAccount acc(-500);
    acc.deposit(1000);
    acc.withdraw(300);
    acc.withdraw(9999);
    cout << acc.getBalance();
    return 0;
}', ARRAY['"700"', '"200"', '"-500"', '"9199"'], 0, 'BankAccount acc(-500): 초기값이 음수라 balance = 0. deposit(1000): 0+1000=1000. withdraw(300): 1000-300=700. withdraw(9999): 잔액(700) < 9999라 거부. 결과: 700.', '생성자 + getter/setter 종합', '생성자에서 잘못된 초기값을 막고, deposit/withdraw에서도 유효성 검사를 하면 항상 올바른 상태를 유지할 수 있어요.', ARRAY['"생성자"', '"유효성 검사"', '"캡슐화"', '"getter"', '"setter"'], NULL, NULL),
(10500, 'cpp', 'cpp-p1', '쉬움', '`srand(time(0))`을 호출하지 않으면 어떤 일이 생길까요?', '// A: srand 없이
int a = rand() % 100 + 1;

// B: srand 있음
srand(time(0));
int b = rand() % 100 + 1;', ARRAY['"A와 B 모두 매번 다른 숫자가 나온다"', '"A는 프로그램을 실행할 때마다 같은 숫자가 나온다"', '"A는 컴파일 에러가 난다"', '"B는 느리지만 A보다 더 랜덤하다"'], 1, 'srand가 없으면 시드(seed)가 고정되어 매번 실행해도 rand()가 동일한 순서를 생성해요. srand(time(0))은 현재 시각을 시드로 설정해서 매번 다른 결과를 만들어요.', 'srand(time(0)) — 랜덤 시드', 'rand()는 시드 기반 의사난수예요. srand로 시드를 바꾸지 않으면 매번 같은 순서가 나와요. time(0)으로 현재 시각을 시드로 쓰면 매번 달라져요.', ARRAY['"rand()"', '"srand()"', '"time(0)"', '"난수 시드"'], NULL, NULL),
(10501, 'cpp', 'cpp-p1', '쉬움', '다음 함수의 역할은?', 'int getRandomNumber() {
    return rand() % 100 + 1;
}', ARRAY['"0~100 사이의 실수를 반환한다"', '"1~100 사이의 정수를 반환한다"', '"0~99 사이의 정수를 반환한다"', '"항상 50을 반환한다"'], 1, 'rand() % 100은 0~99, 여기에 +1을 더하면 1~100이에요. 게임에서 정답을 1~100 범위로 만드는 함수예요.', 'rand() % N + 1 패턴', 'rand() % N → 0~(N-1). rand() % N + 1 → 1~N. 1부터 시작하는 범위를 만들 때 쓰는 기본 패턴이에요.', ARRAY['"rand()"', '"범위 계산"', '"% 연산"'], NULL, NULL),
(10502, 'cpp', 'cpp-p1', '보통', '다음 코드의 출력 결과는? (answer = 42, 입력 순서: 70 → 20 → 42)', 'int answer = 42, guess = 0, tries = 0;
while (guess != answer) {
    cin >> guess;
    tries++;
    if (guess > answer)      cout << "더 작게!\n";
    else if (guess < answer) cout << "더 크게!\n";
}
cout << tries << "번 만에 성공!";', ARRAY['"더 작게!\n더 크게!\n2번 만에 성공!"', '"더 작게!\n더 크게!\n3번 만에 성공!"', '"더 크게!\n더 작게!\n3번 만에 성공!"', '"더 작게!\n더 크게!\n성공!"'], 1, '70 입력 → 70 > 42 → ''더 작게!'', tries=1. 20 입력 → 20 < 42 → ''더 크게!'', tries=2. 42 입력 → 42 == 42 → 루프 종료, tries=3. 출력: ''3번 만에 성공!''', '게임 루프 흐름 추적', 'while (guess != answer) 루프에서 매 반복마다 tries++, 힌트 출력. 정답이 입력되면 루프 탈출 후 시도 횟수 출력.', ARRAY['"while 루프"', '"게임 루프"', '"카운터"', '"조건 분기"'], NULL, NULL),
(10503, 'cpp', 'cpp-p1', '보통', '''한 번 더 할래요?'' 기능을 구현하는 올바른 do-while 패턴은?', 'char again;
___ {
    playGame();
    cout << "한 번 더? (y/n): ";
    cin >> again;
} ___ (again == ''y'');', ARRAY['"while / while"', '"do / while"', '"for / while"', '"repeat / until"'], 1, 'do-while은 본문을 먼저 한 번 실행한 뒤 조건을 검사해요. ''게임을 먼저 하고, 이후 계속할지 확인''하는 구조에 딱 맞아요. while은 조건을 먼저 검사해서 게임이 한 번도 안 실행될 수 있어요.', 'do-while — 최소 1회 실행 보장', 'do { } while(조건); — 본문을 반드시 한 번 실행 후 조건 체크. ''한 번 더?'' 패턴의 정석이에요.', ARRAY['"do-while"', '"게임 재시작"', '"반복문"'], NULL, NULL),
(10504, 'cpp', 'cpp-p1', '보통', '게임을 함수로 분리했을 때의 장점으로 옳지 않은 것은?', '// 함수로 분리
int getRandomNumber() { return rand() % 100 + 1; }
void playGame() {
    int answer = getRandomNumber();
    // ... 게임 로직
}

int main() {
    srand(time(0));
    char again;
    do { playGame(); cin >> again; } while (again == ''y'');
}', ARRAY['"main()이 짧아지고 읽기 쉬워진다"', '"playGame()만 따로 테스트할 수 있다"', '"함수로 나누면 실행 속도가 빨라진다"', '"같은 코드를 여러 번 쓰지 않아도 된다"'], 2, '함수로 분리해도 실행 속도는 거의 동일해요(오히려 함수 호출 오버헤드가 생길 수 있어요). 분리의 진짜 장점은 가독성, 재사용성, 독립 테스트 가능성이에요.', '함수 분리의 장점', '함수 분리 = 가독성 ↑ + 재사용 ↑ + 유지보수 ↑. 실행 속도를 높이는 게 목적은 아니에요.', ARRAY['"함수"', '"코드 구조화"', '"재사용성"'], NULL, NULL),
(10505, 'cpp', 'cpp-p1', '어려움', '숫자 맞추기에서 가장 적은 시도로 1~100을 맞추는 최적 전략은?', '// 1~100 중 정답 맞추기
// 전략 A: 1부터 순서대로 (1, 2, 3, ...)
// 전략 B: 항상 남은 범위의 중간값 (50 → 25 or 75 → ...)', ARRAY['"전략 A — 최악 100번, 전략 B — 최악 7번"', '"전략 A — 최악 50번, 전략 B — 최악 10번"', '"두 전략의 최악 시도 횟수는 동일하다"', '"전략 B — 최악 100번, 전략 A — 최악 50번"'], 0, '전략 A(순차)는 최악 100번. 전략 B(이진 탐색)는 범위를 매번 절반으로 줄여요. log₂(100) ≈ 7이라 최악 7번이면 충분해요. 이진 탐색이 훨씬 효율적이에요!', '이진 탐색 전략', '중간값부터 시작 → 힌트에 따라 위/아래 절반으로 좁혀가기 = 이진 탐색. 최악 log₂(N)번 안에 반드시 찾아요.', ARRAY['"이진 탐색"', '"알고리즘"', '"탐색 전략"'], NULL, NULL),
(10506, 'cpp', 'cpp-p1', '어려움', '다음 코드에서 버그가 있는 부분은?', '#include <iostream>
#include <cstdlib>
using namespace std;

int getRandomNumber() {
    srand(time(0));           // 줄 A
    return rand() % 100 + 1;
}

int main() {
    int answer = getRandomNumber();
    int guess = 0, tries = 0;
    while (guess != answer) {
        cin >> guess;
        tries++;
    }
    cout << tries << "번 만에 성공!";
}', ARRAY['"rand() % 100 + 1이 1~101 범위를 생성한다"', '"srand(time(0))이 getRandomNumber() 안에 있어서 호출할 때마다 시드가 재설정된다"', '"while 루프가 guess == answer일 때 종료되지 않는다"', '"tries가 int라서 오버플로우가 난다"'], 1, 'srand는 main()에서 딱 한 번만 호출해야 해요. getRandomNumber() 안에 두면 함수를 호출할 때마다 시드가 재설정돼요. 같은 초 안에 여러 번 호출하면 time(0) 값이 같아서 같은 숫자가 반복될 수 있어요.', 'srand는 main()에서 한 번만', 'srand(time(0))은 프로그램 시작 시 main()에서 딱 한 번 호출하는 게 원칙이에요. 함수 안에 넣으면 매번 시드가 재설정돼요.', ARRAY['"srand"', '"rand"', '"시드 초기화"', '"버그"'], NULL, NULL),
(10507, 'cpp', 'cpp-p2', '쉬움', '다음 중 Character 구조체가 올바르게 선언된 것은?', '// RPG 캐릭터의 name, hp, atk, level을 담는 구조체를 만들려면?', ARRAY['"class Character { string name; int hp; int atk; int level; };"', '"struct Character { string name; int hp; int atk; int level; };"', '"struct { Character string name; int hp; };"', '"Character struct { string name; int hp; int atk; };"'], 1, 'struct 키워드 + 이름 + { 멤버변수들; }; 형태예요. 마지막 }; 세미콜론을 꼭 붙여야 해요!', 'struct 선언 형태', 'struct 이름 { 멤버변수들; }; — struct는 여러 변수를 하나로 묶는 커스텀 타입이에요. 멤버 선언 순서대로 초기화 리스트 { }로 값을 넣을 수 있어요.', ARRAY['"struct"', '"멤버변수"', '"RPG 프로젝트"'], NULL, NULL),
(10508, 'cpp', 'cpp-p2', '쉬움', '파티원 목록을 저장하는 올바른 선언은?', '// Character struct가 정의되어 있을 때
// 여러 캐릭터를 동적으로 추가/관리하려면?', ARRAY['"Character party[100];"', '"vector<Character> party;"', '"list<Character> party[10];"', '"Character* party;"'], 1, 'vector<Character>는 크기를 미리 정하지 않아도 되고 push_back()으로 동적 추가할 수 있어요. 배열은 크기를 미리 정해야 하고, Character*는 동적 메모리 관리가 복잡해요.', 'vector<struct타입> — 구조체 컬렉션', '여러 구조체를 관리할 때는 vector<타입>이 가장 편해요. push_back()으로 추가, for(auto& c : party)로 순회해요.', ARRAY['"vector"', '"struct"', '"구조체 컬렉션"', '"RPG 프로젝트"'], NULL, NULL),
(10509, 'cpp', 'cpp-p2', '쉬움', '다음 코드의 출력 결과는?', 'struct Character {
    string name;
    int hp;
};

int main() {
    Character hero;
    hero.name = "전사";
    hero.hp = 100;
    cout << hero.name << " HP: " << hero.hp << "\n";
}', ARRAY['"전사 100"', '"전사 HP: 100"', '"hero HP: 100"', '"컴파일 에러"'], 1, 'hero.name은 "전사", hero.hp는 100이에요. . (점) 연산자로 멤버에 접근해서 출력하면 "전사 HP: 100"이 나와요.', '점(.) 연산자로 멤버 접근', '구조체변수.멤버이름 형태로 멤버에 접근해요. hero.name, hero.hp처럼 사용해요. 점 연산자는 struct와 class 모두에서 쓰여요.', ARRAY['"struct"', '"멤버 접근"', '". 연산자"', '"RPG 프로젝트"'], NULL, NULL),
(10510, 'cpp', 'cpp-p2', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
    int level;
};

int main() {
    Character warrior = {"전사", 100, 25, 1};
    Character mage = {"마법사", 60, 40, 1};
    vector<Character> party;
    party.push_back(warrior);
    party.push_back(mage);
    cout << "파티원 수: " << party.size() << "\n";
    cout << party[0].name << " HP: " << party[0].hp << "\n";
}', ARRAY['"파티원 수: 2\n전사 HP: 100"', '"파티원 수: 1\n전사 HP: 100"', '"파티원 수: 2\n마법사 HP: 60"', '"컴파일 에러"'], 0, 'push_back으로 warrior, mage 순서로 2명을 추가했어요. party.size()=2, party[0]은 첫 번째 warrior이므로 name="전사", hp=100이에요.', 'struct 초기화 리스트 + vector', 'struct 변수 = {값1, 값2, ...}; 형태로 초기화할 때 멤버 선언 순서대로 값을 넣어요. push_back으로 vector에 struct를 담고, [i].멤버로 접근해요.', ARRAY['"struct 초기화"', '"vector"', '"push_back"', '"RPG 프로젝트"'], NULL, NULL),
(10511, 'cpp', 'cpp-p2', '보통', '다음 showCharacter 함수에서 c.hp를 바꾸면 원본 캐릭터 hp는 어떻게 될까요?', 'void showCharacter(Character c) {
    cout << "=== " << c.name << " ===" << "\n";
    cout << "HP: " << c.hp << "\n";
    cout << "ATK: " << c.atk << "\n";
}', ARRAY['"함수 안에서 c.hp를 수정하면 원본 캐릭터 hp도 바뀐다"', '"c는 원본의 복사본이라, c를 수정해도 원본은 바뀌지 않는다"', '"struct는 값 전달이 불가능해서 항상 &를 붙여야 한다"', '"값 전달은 참조 전달보다 항상 빠르다"'], 1, 'Character c처럼 & 없이 값으로 전달하면 원본의 복사본이 만들어져요. 출력처럼 읽기만 할 때는 값 전달로 충분해요. 원본을 수정해야 할 때는 Character&를 써요.', 'struct 값 전달 = 복사본', 'void showCharacter(Character c) — c는 원본의 복사본이에요. 읽기만 할 때는 OK. 원본 HP를 깎는 attack 같은 함수는 Character&(참조)로 받아야 해요.', ARRAY['"값 전달"', '"복사본"', '"struct"', '"RPG 프로젝트"'], NULL, NULL),
(10512, 'cpp', 'cpp-p2', '보통', '다음 attack 함수에서 & 기호를 붙이는 이유는?', 'void attack(Character& attacker, Character& target) {
    target.hp -= attacker.atk;
    cout << attacker.name << "이(가) " << target.name
         << "을 공격! (-" << attacker.atk << "HP)" << "\n";
    if (target.hp <= 0) {
        cout << target.name << " 쓰러졌다!" << "\n";
    }
}', ARRAY['"& 없으면 struct를 함수에 넣을 수 없어서"', '"원본 hp를 직접 깎아야 하므로"', '"참조를 쓰면 코드가 더 짧아지므로"', '"& 없이는 . 연산자를 쓸 수 없어서"'], 1, '& (참조)를 쓰면 복사본이 아닌 원본을 직접 수정해요. target.hp -= attacker.atk 가 실제 캐릭터의 hp를 깎아요. & 없으면 복사본만 바뀌고 원본 hp는 그대로예요.', '참조 전달 = 원본 수정', 'void attack(Character& a, Character& t) — &를 붙이면 원본을 직접 수정해요. HP처럼 게임 상태를 바꿔야 할 때 반드시 참조 전달을 써요.', ARRAY['"참조 전달"', '"&"', '"struct"', '"원본 수정"', '"RPG 프로젝트"'], NULL, NULL),
(10513, 'cpp', 'cpp-p2', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
};

void attack(Character& attacker, Character& target) {
    target.hp -= attacker.atk;
    if (target.hp <= 0) {
        cout << target.name << " 쓰러졌다!\n";
    }
}

int main() {
    Character hero = {"전사", 100, 30};
    Character slime = {"슬라임", 25, 10};
    attack(hero, slime);
    attack(slime, hero);
    cout << "전사 HP: " << hero.hp << "\n";
}', ARRAY['"슬라임 쓰러졌다!\n전사 HP: 90"', '"슬라임 쓰러졌다!\n전사 HP: 100"', '"전사 HP: 90"', '"컴파일 에러"'], 0, 'attack(hero, slime): slime.hp = 25-30 = -5 → -5<=0이므로 "슬라임 쓰러졌다!" 출력. attack(slime, hero): hero.hp = 100-10 = 90 → 90>0이므로 출력 없음. 마지막으로 "전사 HP: 90" 출력. 참조(&) 덕분에 원본 hp가 실제로 바뀌었어요.', '참조 전달로 hp 수정 추적', '& 참조로 받은 target.hp -= attacker.atk 는 원본을 직접 수정해요. 호출 순서대로 차례로 추적하면 최종 hp와 출력을 알 수 있어요.', ARRAY['"참조 전달"', '"attack 함수"', '"추적"', '"RPG 프로젝트"'], NULL, NULL),
(10514, 'cpp', 'cpp-p2', '어려움', '다음 코드에서 attack() 호출 후 slime.hp 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Character {
    string name;
    int hp;
    int atk;
};

void attack(Character attacker, Character target) {  // & 없음!
    target.hp -= attacker.atk;
}

int main() {
    Character hero = {"전사", 100, 30};
    Character slime = {"슬라임", 50, 10};
    attack(hero, slime);
    cout << slime.hp;
}', ARRAY['"50"', '"20"', '"0"', '"컴파일 에러"'], 0, 'attack(Character target) — & 없이 값 전달이에요. target은 slime의 복사본이라, target.hp = 50-30 = 20으로 바뀌지만 원본 slime.hp는 여전히 50이에요. 원본을 수정하려면 Character& target이 필요해요.', '& 없으면 원본이 안 바뀐다', 'void attack(Character target) — &가 없으면 값 전달이라 복사본만 수정돼요. slime.hp = 50 그대로! attack 함수에서 원본 hp를 깎으려면 반드시 Character& target으로 써야 해요.', ARRAY['"값 전달"', '"참조 전달"', '"& 차이"', '"RPG 프로젝트"'], NULL, NULL),
(10515, 'cpp', 'cpp-p3', '쉬움', '`#include <bits/stdc++.h>`를 쓰는 이유는?', '// 경쟁 프로그래밍 템플릿
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4};
    sort(v.begin(), v.end());
    // vector, sort 모두 따로 include 안 해도 됨
}', ARRAY['"코드 실행 속도를 빠르게 해주는 헤더다"', '"vector, algorithm, string 등 표준 라이브러리를 한 번에 다 포함한다"', '"USACO 채점 서버에서만 작동하는 특수 헤더다"', '"using namespace std; 없이도 std:: 없이 쓸 수 있게 해준다"'], 1, '<bits/stdc++.h>는 거의 모든 C++ 표준 헤더를 한 번에 포함해요. 경쟁 프로그래밍에서 시간을 아끼기 위해 사용해요. 프로덕션 코드에서는 필요한 헤더만 명시적으로 포함하는 게 좋아요.', '#include <bits/stdc++.h>', '경쟁 프로그래밍 전용 단축키 헤더. 모든 표준 라이브러리를 한 번에 포함해요. 실제 프로젝트보다 대회에서 코딩 속도를 높일 때 사용해요.', ARRAY['"bits/stdc++.h"', '"헤더"', '"경쟁 프로그래밍"', '"USACO"'], NULL, NULL),
(10516, 'cpp', 'cpp-p3', '쉬움', '벡터를 내림차순으로 정렬하는 올바른 코드는?', 'vector<int> v = {5, 2, 8, 1, 9};
// 내림차순 정렬하려면?', ARRAY['"sort(v.begin(), v.end());"', '"sort(v.begin(), v.end(), greater<int>());"', '"sort(v.end(), v.begin());"', '"sort_desc(v.begin(), v.end());"'], 1, 'sort 세 번째 인자로 greater<int>()를 넣으면 내림차순 정렬이에요. sort(v.begin(), v.end())만 쓰면 기본 오름차순이에요.', '내림차순 정렬 — greater<int>()', 'sort(v.begin(), v.end(), greater<int>()) — 큰 수부터 정렬. sort(v.begin(), v.end()) — 작은 수부터 정렬(오름차순). USACO에서 상위 K개를 구할 때 자주 써요.', ARRAY['"sort"', '"greater"', '"내림차순"', '"USACO"'], NULL, NULL),
(10517, 'cpp', 'cpp-p3', '보통', '다음 코드의 출력 결과는?', '#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5};
    sort(v.begin(), v.end(), greater<int>());
    for (int i = 0; i < 3; i++) {
        cout << v[i] << " ";
    }
}', ARRAY['"5 4 3"', '"1 1 3"', '"3 1 4"', '"5 4 1"'], 0, 'greater<int>()로 내림차순 정렬하면 v = {5, 4, 3, 1, 1}이에요. 인덱스 0, 1, 2를 출력하면 "5 4 3"이에요.', '내림차순 정렬 후 상위 K개 출력', 'sort + greater<int>()로 내림차순 정렬 후, 앞에서 K개(v[0]~v[K-1])를 출력하면 상위 K개를 뽑을 수 있어요. USACO Bronze에서 자주 나오는 패턴이에요.', ARRAY['"sort"', '"greater"', '"상위 K개"', '"USACO"'], NULL, NULL),
(10518, 'cpp', 'cpp-p3', '보통', '`map<int, int>`로 숫자 빈도를 세는 코드의 출력 결과는?', '#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 3, 2, 3, 1};
    map<int, int> freq;
    for (int n : nums) freq[n]++;
    cout << freq[3] << " " << freq[1] << " " << freq[2];
}', ARRAY['"3 2 1"', '"1 2 3"', '"2 3 1"', '"3 1 2"'], 0, '3은 3번, 1은 2번, 2는 1번 등장해요. freq[3]=3, freq[1]=2, freq[2]=1. map은 키 기준 자동 오름차순 정렬이지만, cout에서 직접 키로 접근했으므로 3 2 1이 출력돼요.', 'map으로 빈도 카운팅', 'map<int,int> freq; for (int n : v) freq[n]++; — 처음 나온 키는 자동으로 0으로 초기화돼요. 빈도 카운팅의 기본 패턴이에요.', ARRAY['"map"', '"빈도 카운팅"', '"freq[n]++"', '"USACO"'], NULL, NULL),
(10519, 'cpp', 'cpp-p3', '보통', '괄호 매칭에서 stack을 쓰는 이유로 가장 적절한 것은?', '// 입력: "((()))"
// 올바른 괄호인지 확인
stack<char> st;
for (char c : s) {
    if (c == ''('') st.push(c);
    else {
        if (st.empty()) { valid = false; break; }
        st.pop();
    }
}
valid = valid && st.empty();', ARRAY['"괄호의 총 개수를 빠르게 세기 위해"', '"가장 최근에 열린 괄호를 먼저 닫아야 하는 구조(LIFO)이기 때문에"', '"stack이 queue보다 메모리를 적게 써서"', '"sort 없이 자동 정렬이 되기 때문에"'], 1, '괄호는 ''가장 최근에 열린 것이 먼저 닫혀야'' 해요. 이게 LIFO(Last In First Out) 구조인 stack이랑 딱 맞아요. queue나 vector로 하면 ''가장 최근'' 것을 꺼내기 복잡해져요.', 'stack의 LIFO — 괄호 매칭', '괄호 매칭 = stack의 교과서 사례. ''('' → push, '')'' → top 확인 후 pop. 마지막에 stack이 비어있으면 올바른 괄호예요.', ARRAY['"stack"', '"LIFO"', '"괄호 매칭"', '"USACO"'], NULL, NULL),
(10520, 'cpp', 'cpp-p3', '어려움', '다음 코드에서 서로 다른 숫자의 개수는?', '#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {5, 3, 5, 2, 3, 3, 1};
    map<int, int> freq;
    for (int n : v) freq[n]++;
    cout << freq.size();
}', ARRAY['"7"', '"4"', '"3"', '"5"'], 1, 'v에서 서로 다른 값은 1, 2, 3, 5로 4개예요. freq 맵에는 키가 4개(1, 2, 3, 5) 들어가고, freq.size()는 4를 반환해요.', 'map.size() = 서로 다른 키 수', 'map에서 각 키는 한 번만 존재해요. 원소를 map에 담으면 중복이 자동 제거되고, .size()로 서로 다른 값의 수를 알 수 있어요.', ARRAY['"map"', '"size()"', '"중복 제거"', '"서로 다른 원소 수"'], NULL, NULL),
(10521, 'cpp', 'cpp-p3', '어려움', '다음 괄호 검사 코드에서 입력 `"(()"` 의 결과는?', '#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "(()";
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == ''('') st.push(c);
        else {
            if (st.empty()) { valid = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "올바름" : "잘못됨");
}', ARRAY['"올바름"', '"잘못됨"', '"컴파일 에러"', '"런타임 에러"'], 1, '''('' → push. ''('' → push. '')'' → pop. 루프 종료 후 stack에 ''(''가 1개 남아 있어요. !st.empty()이므로 valid = false → ''잘못됨'' 출력.', '미닫힌 괄호 감지', '루프 후 stack이 비어있어야 올바른 괄호. 남은 게 있으면 닫히지 않은 ''(''가 있다는 뜻이에요.', ARRAY['"stack"', '"괄호 매칭"', '"USACO"', '"유효성 검사"'], NULL, NULL),
(10523, 'cpp', 'cpp-9', '쉬움', '다음 중 크기 5인 정수 배열을 올바르게 선언한 것은?', '', ARRAY['"int arr[5];"', '"array int arr(5);"', '"int[5] arr;"', '"arr int[5];"'], 0, 'C++ 배열은 ''타입 배열명[크기];'' 형식으로 선언합니다. int arr[5]는 int형 요소 5개를 저장할 수 있는 배열이에요.', '배열 선언', '타입 배열명[크기]; — C++ 배열 선언 기본 형식. 크기는 반드시 양의 정수 상수여야 합니다.', ARRAY['"배열 선언"', '"정적 배열"', '"배열"'], NULL, NULL),
(10524, 'cpp', 'cpp-9', '쉬움', '다음 코드에서 배열의 마지막 요소에 접근하는 올바른 인덱스는?', 'int arr[5] = {10, 20, 30, 40, 50};
// 마지막 요소에 접근하려면?
cout << arr[?];', ARRAY['"4"', '"5"', '"-1"', '"last"'], 0, '크기 5인 배열의 인덱스는 0~4입니다. 마지막 요소는 arr[4]예요. arr[5]는 범위를 벗어난 접근(undefined behavior)입니다.', '배열 인덱스 범위', '크기 n인 배열의 유효한 인덱스는 0부터 n-1까지입니다. 마지막 요소: arr[n-1].', ARRAY['"배열 인덱싱"', '"0-based"', '"범위 초과"'], NULL, NULL),
(10525, 'cpp', 'cpp-9', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    cout << sum;
    return 0;
}', ARRAY['"10"', '"15"', '"5"', '"25"'], 1, '1+2+3+4+5 = 15. for 루프로 배열의 모든 요소를 sum에 더합니다.', '배열 합계 계산', 'for 루프로 배열을 순회하며 누적 합을 구합니다. sum += arr[i] 패턴을 기억하세요.', ARRAY['"배열 순회"', '"합계"', '"for 루프"'], NULL, NULL),
(10526, 'cpp', 'cpp-9', '쉬움', '배열의 크기를 구하는 올바른 방법은?', 'int arr[] = {10, 20, 30, 40};
// 배열 크기를 구하려면?', ARRAY['"sizeof(arr) / sizeof(arr[0])"', '"arr.size()"', '"length(arr)"', '"arr.length()"'], 0, 'C++ 정적 배열은 .size() 메서드가 없어요. sizeof(arr)은 전체 바이트 수, sizeof(arr[0])은 요소 하나의 바이트 수이므로 나누면 요소 개수가 나옵니다. arr.size()는 vector에서 사용해요.', 'sizeof를 이용한 배열 크기', '배열 크기 = sizeof(arr) / sizeof(arr[0]). 정적 배열에서만 사용 가능하며, 포인터에는 사용 불가.', ARRAY['"sizeof"', '"배열 크기"', '"정적 배열"'], NULL, NULL),
(10527, 'cpp', 'cpp-9', '쉬움', '다음 코드에서 arr를 모두 0으로 초기화하는 올바른 방법은?', 'int arr[5] = __________;', ARRAY['"{0}"', '"{0,0,0,0,0}"', '"두 가지 모두 0으로 초기화"', '"{null}"'], 2, '{0}은 첫 원소를 0으로, 나머지를 자동으로 0으로 채웁니다. {0,0,0,0,0}은 명시적으로 다섯 개 모두 0으로 초기화해요. 두 방법 모두 결과가 같습니다.', '배열 0 초기화', 'int arr[5] = {0}은 모든 요소를 0으로 초기화합니다. {}도 동일하게 동작해요.', ARRAY['"배열 초기화"', '"0 초기화"', '"배열"'], NULL, NULL),
(10528, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 1, 4, 1, 5};
    int minVal = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] < minVal) minVal = arr[i];
    }
    cout << minVal;
    return 0;
}', ARRAY['"3"', '"1"', '"4"', '"5"'], 1, '최솟값 탐색 코드입니다. {3,1,4,1,5} 중 가장 작은 값은 1입니다. minVal은 arr[0]=3에서 시작해 arr[1]=1과 비교해 갱신됩니다.', '배열에서 최솟값 찾기', '첫 번째 요소를 임시 최솟값으로 설정 후, 더 작은 값이 있으면 갱신합니다. 최댓값과 반대 방향 비교.', ARRAY['"최솟값"', '"배열 순회"', '"비교"'], NULL, NULL),
(10529, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void printArr(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
}

int main() {
    int nums[4] = {7, 2, 9, 4};
    printArr(nums, 4);
    return 0;
}', ARRAY['"7 2 9 4"', '"4 9 2 7"', '"오류"', '"nums 4"'], 0, '배열을 함수에 전달할 때 배열 이름(nums)만 전달하면 됩니다. 함수 내에서 arr[i]로 접근해 7 2 9 4가 출력됩니다.', '함수에 배열 전달', '함수 매개변수 int arr[]로 배열을 받습니다. 배열 이름 전달 시 첫 번째 원소의 주소가 전달됩니다(decay). 별도로 크기도 함께 전달해야 합니다.', ARRAY['"함수"', '"배열 전달"', '"포인터로 decay"'], NULL, NULL),
(10530, 'cpp', 'cpp-9', '보통', '다음 코드에서 함수가 배열의 값을 변경하면 원본 배열도 바뀌는가?', '#include <iostream>
using namespace std;

void doubleArr(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;
    }
}

int main() {
    int nums[3] = {1, 2, 3};
    doubleArr(nums, 3);
    cout << nums[0] << " " << nums[1] << " " << nums[2];
    return 0;
}', ARRAY['"2 4 6"', '"1 2 3"', '"0 0 0"', '"오류"'], 0, '배열은 함수에 포인터로 전달되므로 함수 안에서 arr[i]를 수정하면 원본 배열도 변경됩니다. 출력: 2 4 6.', '배열 전달 — 참조처럼 동작', '배열 이름을 전달하면 포인터가 전달되어 함수 내 수정이 원본에 반영됩니다. 값 복사가 아닙니다.', ARRAY['"포인터"', '"배열 전달"', '"원본 수정"'], NULL, NULL),
(10531, 'cpp', 'cpp-9', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 3, 8, 1, 9, 2};
    int n = sizeof(arr) / sizeof(arr[0]);
    int maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIdx]) maxIdx = i;
    }
    cout << maxIdx << " " << arr[maxIdx];
    return 0;
}', ARRAY['"4 9"', '"2 8"', '"0 5"', '"5 2"'], 0, '배열 {5,3,8,1,9,2}에서 최대값 9는 인덱스 4에 있습니다. maxIdx는 최댓값의 인덱스를 추적합니다. 출력: 4 9.', '최댓값의 인덱스 찾기', '최댓값 자체가 아니라 그 위치(인덱스)를 추적하려면 maxIdx 변수를 따로 관리합니다.', ARRAY['"최댓값 인덱스"', '"배열 순회"', '"sizeof"'], NULL, NULL),
(10532, 'cpp', 'cpp-13', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void addOne(int* arr, int size) {
    for (int i = 0; i < size; i++) arr[i]++;
}

int main() {
    int a[3] = {1, 2, 3};
    addOne(a, 3);
    int n = sizeof(a) / sizeof(a[0]);
    int sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    cout << n << " " << sum;
    return 0;
}', ARRAY['"3 9"', '"3 6"', '"3 12"', '"컴파일 오류"'], 0, 'addOne 함수가 각 원소에 1을 더합니다. {1,2,3} → {2,3,4}. n = sizeof(a)/sizeof(a[0]) = 3. sum = 2+3+4 = 9. 출력: 3 9.', '포인터로 배열 수정 + sizeof', '배열이 int*로 전달될 때도 원본 수정이 가능합니다. sizeof는 함수 밖 원본 배열에서만 정확히 동작합니다.', ARRAY['"포인터"', '"sizeof"', '"배열 수정"'], NULL, NULL),
(10533, 'cpp', 'cpp-13', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* p = &x;
    cout << *p;
    return 0;
}', ARRAY['"5"', '"x의 주소값"', '"p"', '"오류"'], 0, '*p는 p가 가리키는 주소에 저장된 값을 읽습니다(역참조). p = &x이므로 *p는 x의 값 5입니다.', '역참조로 값 읽기', '*포인터 — 포인터가 가리키는 주소의 값을 읽거나 씁니다. &는 주소를 얻고, *는 주소에서 값을 얻습니다.', ARRAY['"역참조"', '"*"', '"포인터"'], NULL, NULL),
(10534, 'cpp', 'cpp-13', '쉬움', '다음 중 double형 변수를 가리키는 포인터 선언으로 올바른 것은?', 'double score = 9.5;
// score를 가리키는 포인터 선언?', ARRAY['"double* p = &score;"', '"double& p = &score;"', '"ptr<double> p = score;"', '"double p* = &score;"'], 0, 'double을 가리키는 포인터는 double*로 선언합니다. &score로 score의 주소를 얻어 초기화해요. double&는 참조(reference)로 다른 개념입니다.', '다양한 타입의 포인터', 'int* p, double* p, char* p — 가리키는 타입에 따라 선언이 달라집니다. 모두 메모리 주소를 저장합니다.', ARRAY['"포인터 선언"', '"double*"', '"타입별 포인터"'], NULL, NULL),
(10535, 'cpp', 'cpp-13', '쉬움', '다음 코드에서 nullptr 포인터를 역참조하면 어떻게 되는가?', 'int* p = nullptr;
*p = 10;  // ← 이 코드는?', ARRAY['"런타임 오류(세그멘테이션 폴트) 발생"', '"0이 저장됨"', '"컴파일 오류"', '"아무 일도 일어나지 않음"'], 0, 'nullptr은 유효한 메모리 주소가 아닙니다. nullptr 포인터를 역참조하면 런타임 오류(세그멘테이션 폴트)가 발생합니다. 포인터 사용 전 nullptr 검사가 중요한 이유입니다.', 'nullptr 역참조 금지', '포인터 사용 전 if (p != nullptr) 검사를 권장합니다. nullptr 역참조는 프로그램 충돌로 이어집니다.', ARRAY['"nullptr"', '"세그멘테이션 폴트"', '"포인터 안전"'], NULL, NULL),
(10536, 'cpp', 'cpp-13', '쉬움', '다음 코드에서 배열 이름 arr는 무엇을 의미하는가?', 'int arr[4] = {10, 20, 30, 40};
cout << *arr;', ARRAY['"배열 첫 번째 원소의 주소 (포인터)"', '"배열 전체의 복사본"', '"배열의 크기"', '"오류"'], 0, '배열 이름 arr는 첫 번째 원소 &arr[0]의 주소를 나타냅니다. 따라서 *arr는 arr[0] = 10을 출력합니다.', '배열 이름 = 첫 원소 주소', '배열 이름은 첫 번째 원소의 포인터입니다. arr == &arr[0]. *arr == arr[0].', ARRAY['"배열과 포인터"', '"decay"', '"배열 이름"'], NULL, NULL),
(10537, 'cpp', 'cpp-13', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int* p = arr;
    cout << *(p + 1) << " " << *(p + 2);
    return 0;
}', ARRAY['"20 30"', '"10 20"', '"11 12"', '"오류"'], 0, 'p는 arr[0]을 가리킵니다. p+1은 arr[1]의 주소, *(p+1)은 arr[1] = 20입니다. p+2는 arr[2]의 주소, *(p+2) = 30.', '포인터 산술', '포인터 + n은 n개 요소만큼 앞의 주소를 가리킵니다. *(p+n) == arr[n]. 배열을 포인터로 순회할 수 있습니다.', ARRAY['"포인터 산술"', '"*(p+n)"', '"배열 순회"'], NULL, NULL),
(10538, 'cpp', 'cpp-13', '보통', '다음 swap 함수에서 포인터를 쓰는 이유는?', 'void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    cout << x << " " << y;
}', ARRAY['"원본 변수의 값을 함수 안에서 변경하기 위해"', '"포인터가 더 빠르기 때문에"', '"정수형은 포인터로만 전달 가능하기 때문에"', '"변수 복사를 피하기 위해"'], 0, '함수에 int a, int b로 전달하면 복사본만 바뀝니다. 포인터로 주소(&x, &y)를 전달하면 *a = *b로 원본 값을 직접 수정할 수 있습니다. 출력: 10 5.', '포인터로 원본 수정', '값 전달(call by value)은 복사본 수정. 포인터 전달(call by pointer)은 원본 수정. swap이 대표적 예시.', ARRAY['"swap"', '"포인터 매개변수"', '"call by pointer"'], NULL, NULL),
(10539, 'cpp', 'cpp-13', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[4] = {1, 2, 3, 4};
    int* p = arr;
    p++;
    cout << *p << " ";
    p += 2;
    cout << *p;
    return 0;
}', ARRAY['"2 4"', '"1 3"', '"2 3"', '"오류"'], 0, 'p = arr (arr[0]). p++ 후 p는 arr[1] → *p = 2. p += 2 후 p는 arr[3] → *p = 4. 출력: 2 4.', '포인터 증감', 'p++는 다음 요소를 가리킵니다. p += n은 n번째 이후 요소. 포인터로 배열을 순회할 수 있습니다.', ARRAY['"p++"', '"포인터 증감"', '"포인터 산술"'], NULL, NULL),
(10540, 'cpp', 'cpp-13', '보통', '다음 코드에서 함수 실행 후 main의 x, y 값은?', '#include <iostream>
using namespace std;

void noSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 7;
    noSwap(x, y);
    cout << x << " " << y;
    return 0;
}', ARRAY['"3 7"', '"7 3"', '"0 0"', '"오류"'], 0, 'noSwap은 값 복사(call by value)로 전달됩니다. 함수 안에서 a, b를 교환해도 원본 x, y는 변하지 않습니다. x=3, y=7 그대로 출력.', '값 전달 vs 포인터 전달', 'call by value: 복사본만 수정. 원본 변경이 필요하면 포인터(&)나 참조(&)를 사용해야 합니다.', ARRAY['"call by value"', '"복사"', '"포인터 전달"'], NULL, NULL),
(10541, 'cpp', 'cpp-13', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int arr[3] = {5, 10, 15};
    int* p = arr;
    for (int i = 0; i < 3; i++) {
        cout << *(p + i) << " ";
    }
    return 0;
}', ARRAY['"5 10 15"', '"10 15 20"', '"오류"', '"주소값 3개"'], 0, '*(p + i)는 arr[i]와 동일합니다. i=0: arr[0]=5, i=1: arr[1]=10, i=2: arr[2]=15. 출력: 5 10 15.', '포인터로 배열 순회', '*(p + i) == arr[i] == p[i]. 포인터 산술로 배열 인덱싱과 동일한 접근이 가능합니다.', ARRAY['"*(p+i)"', '"배열 순회"', '"포인터 산술"'], NULL, NULL),
(10542, 'cpp', 'cpp-13', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void increment(int* p, int n) {
    for (int i = 0; i < n; i++) {
        *(p + i) += i;
    }
}

int main() {
    int arr[4] = {1, 1, 1, 1};
    increment(arr, 4);
    for (int i = 0; i < 4; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}', ARRAY['"1 2 3 4"', '"1 1 1 1"', '"0 1 2 3"', '"2 3 4 5"'], 0, 'increment 함수에서 *(p+0) += 0 → arr[0]=1, *(p+1) += 1 → arr[1]=2, *(p+2) += 2 → arr[2]=3, *(p+3) += 3 → arr[3]=4. 출력: 1 2 3 4.', '포인터 산술로 배열 원소 수정', '*(p+i) += i는 arr[i] += i와 동일. 포인터를 통해 배열 원소를 인덱스 기반으로 수정합니다.', ARRAY['"포인터 산술"', '"배열 수정"', '"*(p+i)"'], NULL, NULL),
(10543, 'cpp', 'cpp-13', '어려움', 'void* 포인터에 대한 설명으로 올바른 것은?', 'void* p;
int x = 42;
p = &x;
// *p = 10;  ← 컴파일 오류
int* ip = (int*)p;
*ip = 10;
cout << x;', ARRAY['"어떤 타입의 주소도 저장할 수 있지만, 역참조 전에 원래 타입으로 캐스팅해야 한다"', '"어떤 타입도 역참조 없이 직접 접근 가능하다"', '"void* 는 nullptr과 동일하다"', '"함수 포인터에만 사용 가능하다"'], 0, 'void*는 타입 정보가 없는 포인터로 어떤 타입의 주소도 저장 가능합니다. 단, 역참조(*p)는 타입을 알 수 없어 컴파일 오류가 납니다. 사용하려면 (int*)처럼 캐스팅 후 역참조해야 합니다. 위 코드 출력: 10.', 'void* 포인터', 'void*: 타입 없는 포인터. 어떤 타입 주소도 저장 가능. 역참조 전 반드시 원래 타입으로 캐스팅 필요.', ARRAY['"void*"', '"타입 캐스팅"', '"범용 포인터"'], NULL, NULL),
(10522, 'cpp', 'cpp-p3', '어려움', 'USACO 파일 입출력을 위한 `freopen` 설정이 올바른 것은?', 'int main() {
    // input.txt에서 읽고 output.txt에 쓰려면?
    ???
    int n; cin >> n;
    cout << n * 2;
}', ARRAY['"freopen(\"input.txt\", \"w\", stdin); freopen(\"output.txt\", \"r\", stdout);"', '"freopen(\"input.txt\", \"r\", stdin); freopen(\"output.txt\", \"w\", stdout);"', '"open(\"input.txt\"); close(\"output.txt\");"', '"cin.open(\"input.txt\"); cout.open(\"output.txt\");"'], 1, 'freopen(파일명, 모드, 스트림). 입력 파일은 "r"(read) + stdin, 출력 파일은 "w"(write) + stdout. 이렇게 하면 cin/cout이 자동으로 파일로 연결돼요.', 'freopen — 파일 입출력 리다이렉션', 'freopen("in.txt", "r", stdin) + freopen("out.txt", "w", stdout) → cin/cout이 파일과 연결. USACO 로컬 테스트의 기본 설정이에요.', ARRAY['"freopen"', '"파일 입출력"', '"stdin"', '"stdout"', '"USACO"'], NULL, NULL),
(10544, 'cpp', 'cpp-14', '쉬움', '다음 struct 선언에서 멤버변수를 올바르게 접근하는 코드는?', 'struct Book {
    string title;
    int pages;
};
Book b = {"코딩의 즐거움", 300};', ARRAY['"b.title"', '"b->title"', '"Book.title"', '"b[title]"'], 0, 'struct 변수에서 멤버 접근은 . 연산자를 사용합니다. b.title이 올바른 접근 방법입니다. ->는 포인터일 때 사용합니다.', 'struct 멤버 접근 (. 연산자)', 'struct 변수.멤버명으로 접근. 포인터라면 ->를 사용.', NULL, NULL, NULL),
(10545, 'cpp', 'cpp-14', '쉬움', '다음 struct 초기화 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
};

int main() {
    Student s = {"홍길동", 17};
    cout << s.name << " " << s.age;
    return 0;
}', ARRAY['"홍길동 17"', '"홍길동17"', '"컴파일 오류"', '"0 0"'], 0, '중괄호 초기화로 name="홍길동", age=17이 설정됩니다. s.name과 s.age를 출력하면 "홍길동 17"이 나옵니다.', 'struct 초기화', 'struct 변수 = {값1, 값2, ...}; 형태로 선언 순서대로 초기화합니다.', NULL, NULL, NULL),
(10546, 'cpp', 'cpp-14', '쉬움', 'struct 선언 시 세미콜론(;) 위치로 올바른 것은?', '// 아래 중 올바른 struct 선언은?', ARRAY['"struct Point { int x; int y; };"', '"struct Point { int x; int y; }"', '"struct Point; { int x; int y; }"', '"struct { int x; int y; } Point;"'], 0, 'C++에서 struct 선언은 닫는 중괄호 } 뒤에 반드시 세미콜론(;)이 와야 합니다. struct Point { ... };', 'struct 선언 문법', 'struct 이름 { 멤버선언; }; — 닫는 중괄호 뒤 세미콜론 필수.', NULL, NULL, NULL),
(10547, 'cpp', 'cpp-14', '쉬움', 'struct 멤버값을 변경하는 올바른 코드는?', 'struct Score {
    string subject;
    int point;
};
Score s = {"수학", 80};
// s의 point를 95로 변경하려면?', ARRAY['"s.point = 95;"', '"s->point = 95;"', '"Score.point = 95;"', '"s[point] = 95;"'], 0, 'struct 변수의 멤버는 . 연산자로 접근해 값을 수정합니다. s.point = 95;로 변경할 수 있습니다.', 'struct 멤버 수정', '변수.멤버 = 새값; 형태로 멤버값을 수정합니다.', NULL, NULL, NULL),
(10548, 'cpp', 'cpp-14', '쉬움', '다음 struct 배열 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Cat {
    string name;
    int age;
};

int main() {
    Cat cats[2] = {{"나비", 3}, {"치즈", 5}};
    cout << cats[1].name;
    return 0;
}', ARRAY['"치즈"', '"나비"', '"3"', '"5"'], 0, 'cats[0]은 나비(3세), cats[1]은 치즈(5세)입니다. cats[1].name은 "치즈"입니다.', 'struct 배열', 'struct 배열: struct타입 배열명[크기]; 각 원소는 배열명[i].멤버로 접근.', NULL, NULL, NULL),
(10549, 'cpp', 'cpp-14', '보통', '다음 코드에서 함수가 struct를 값으로 받을 때의 출력 결과는?', '#include <iostream>
using namespace std;

struct Rect {
    int w, h;
};

void doubleWidth(Rect r) {
    r.w *= 2;
    cout << r.w << " ";
}

int main() {
    Rect rect = {4, 3};
    doubleWidth(rect);
    cout << rect.w;
    return 0;
}', ARRAY['"8 4"', '"8 8"', '"4 4"', '"4 8"'], 0, 'pass by value이므로 함수 안에서 r.w를 변경해도 원본 rect.w는 그대로입니다. 함수 내부에서 8, 원본은 여전히 4.', 'struct pass by value', '함수에 struct를 값으로 전달하면 복사본이 생성됩니다. 원본은 변경되지 않습니다.', NULL, NULL, NULL),
(10550, 'cpp', 'cpp-14', '보통', '다음 코드에서 struct를 참조로 전달할 때의 출력 결과는?', '#include <iostream>
using namespace std;

struct Rect {
    int w, h;
};

void doubleWidth(Rect& r) {
    r.w *= 2;
}

int main() {
    Rect rect = {4, 3};
    doubleWidth(rect);
    cout << rect.w;
    return 0;
}', ARRAY['"8"', '"4"', '"컴파일 오류"', '"0"'], 0, 'pass by reference이므로 함수 안에서 r.w를 변경하면 원본 rect.w도 변경됩니다. 4*2=8.', 'struct pass by reference', 'struct&로 참조 전달하면 함수 내 변경이 원본에 반영됩니다.', NULL, NULL, NULL),
(10551, 'cpp', 'cpp-14', '보통', '다음 중첩 struct 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Address {
    string city;
    int zip;
};

struct Person {
    string name;
    Address addr;
};

int main() {
    Person p = {"김철수", {"서울", 12345}};
    cout << p.name << " " << p.addr.city;
    return 0;
}', ARRAY['"김철수 서울"', '"김철수 12345"', '"서울 12345"', '"컴파일 오류"'], 0, '중첩 struct는 p.addr.city처럼 . 연산자를 연결해서 접근합니다. p.name="김철수", p.addr.city="서울".', '중첩 struct', 'struct 안에 다른 struct를 멤버로 포함할 수 있습니다. 외부.내부.멤버 형태로 접근.', NULL, NULL, NULL),
(10552, 'cpp', 'cpp-14', '보통', '다음 코드에서 struct를 반환하는 함수의 출력 결과는?', '#include <iostream>
using namespace std;

struct Point {
    int x, y;
};

Point makePoint(int x, int y) {
    Point p;
    p.x = x;
    p.y = y;
    return p;
}

int main() {
    Point pt = makePoint(5, 10);
    cout << pt.x << "," << pt.y;
    return 0;
}', ARRAY['"5,10"', '"10,5"', '"0,0"', '"컴파일 오류"'], 0, '함수에서 struct를 반환할 수 있습니다. makePoint(5, 10)은 x=5, y=10인 Point를 반환하므로 "5,10"이 출력됩니다.', 'struct 반환', '함수의 반환 타입을 struct로 지정하면 struct를 반환할 수 있습니다.', NULL, NULL, NULL),
(10553, 'cpp', 'cpp-14', '보통', '다음 코드에서 struct 배열을 반복문으로 처리할 때 출력 결과는?', '#include <iostream>
using namespace std;

struct Item {
    string name;
    int price;
};

int main() {
    Item items[3] = {{"사과", 500}, {"바나나", 300}, {"포도", 800}};
    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += items[i].price;
    }
    cout << total;
    return 0;
}', ARRAY['"1600"', '"1500"', '"800"', '"컴파일 오류"'], 0, '500 + 300 + 800 = 1600. struct 배열의 각 원소 멤버에 items[i].price로 접근합니다.', 'struct 배열 반복문', 'struct 배열을 for 루프로 순회할 때 배열명[i].멤버로 각 원소의 멤버에 접근합니다.', NULL, NULL, NULL),
(10554, 'cpp', 'cpp-14', '어려움', '다음 코드에서 struct 포인터를 사용할 때 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

struct Dog {
    string name;
    int age;
};

void birthday(Dog* d) {
    d->age++;
}

int main() {
    Dog dog = {"멍멍이", 3};
    birthday(&dog);
    cout << dog.name << " " << dog.age;
    return 0;
}', ARRAY['"멍멍이 4"', '"멍멍이 3"', '"컴파일 오류"', '"멍멍이 0"'], 0, '포인터로 struct를 전달하면 원본이 수정됩니다. d->age++는 (*d).age++와 같으며, dog.age가 3에서 4로 증가합니다.', 'struct 포인터와 -> 연산자', 'struct 포인터에서 멤버 접근은 ->를 사용. d->age는 (*d).age와 동일.', NULL, NULL, NULL),
(10555, 'cpp', 'cpp-14', '어려움', '다음 중첩 struct에서 내부 struct 멤버를 수정하는 코드의 출력 결과는?', '#include <iostream>
using namespace std;

struct Engine {
    int horsepower;
    bool turbo;
};

struct Car {
    string model;
    Engine engine;
};

int main() {
    Car c = {"소나타", {150, false}};
    c.engine.turbo = true;
    c.engine.horsepower += 50;
    cout << c.model << " " << c.engine.horsepower << " " << c.engine.turbo;
    return 0;
}', ARRAY['"소나타 200 1"', '"소나타 150 0"', '"소나타 200 0"', '"컴파일 오류"'], 0, 'c.engine.turbo = true(→1), c.engine.horsepower = 150+50 = 200. bool은 cout에서 0/1로 출력됩니다.', '중첩 struct 멤버 수정', '중첩 struct의 멤버는 외부변수.내부구조체.멤버 = 값; 형태로 수정합니다.', NULL, NULL, NULL),
(10556, 'cpp', 'cpp-17', '쉬움', '선형 탐색(linear search)의 설명으로 올바른 것은?', '// 선형 탐색 예시
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}', ARRAY['"배열을 처음부터 끝까지 순서대로 비교한다"', '"정렬된 배열에서만 사용 가능하다"', '"항상 O(log N) 시간이 걸린다"', '"중간값부터 비교를 시작한다"'], 0, '선형 탐색은 배열의 첫 번째 원소부터 마지막까지 순서대로 target과 비교합니다. 정렬 여부에 관계없이 사용 가능합니다.', '선형 탐색 (Linear Search)', '배열을 처음부터 끝까지 순서대로 탐색. 정렬 불필요. 시간복잡도 O(N).', NULL, NULL, NULL),
(10557, 'cpp', 'cpp-17', '쉬움', '선형 탐색에서 원소를 찾지 못했을 때 반환하는 관례적인 값은?', 'int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return ???;  // 못 찾았을 때
}', ARRAY['"-1"', '"0"', '"n"', '"false"'], 0, '탐색 실패 시 -1을 반환하는 것이 관례입니다. 배열 인덱스는 0 이상이므로 -1은 "없음"을 의미합니다.', '탐색 실패 반환값', '탐색 함수에서 원소를 못 찾으면 -1을 반환하는 것이 일반적인 관례입니다.', NULL, NULL, NULL),
(10558, 'cpp', 'cpp-17', '보통', '다음 선형 탐색 코드에서 배열 {4, 2, 7, 1, 9}에서 target=7을 찾을 때 반환값은?', 'int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
// arr = {4, 2, 7, 1, 9}, n=5, target=7', ARRAY['"2"', '"7"', '"3"', '"-1"'], 0, '인덱스 0:4, 1:2, 2:7(찾음!). arr[2]=7이므로 인덱스 2를 반환합니다.', '선형 탐색 실행 추적', '선형 탐색은 찾는 값의 인덱스를 반환합니다.', NULL, NULL, NULL),
(10559, 'cpp', 'algo-preview', '보통', '이진 탐색(binary search)의 전제 조건은?', '// 이진 탐색 사용 조건
int arr1[] = {1, 3, 5, 7, 9};   // 가능?
int arr2[] = {5, 1, 9, 3, 7};   // 가능?', ARRAY['"배열이 정렬된 상태여야 한다"', '"배열의 크기가 짝수여야 한다"', '"중복 원소가 없어야 한다"', '"배열이 내림차순이어야 한다"'], 0, '이진 탐색은 반드시 정렬된 배열에서만 사용 가능합니다. 정렬되지 않은 arr2에는 이진 탐색을 적용할 수 없습니다.', '이진 탐색 전제 조건', '이진 탐색: 반드시 정렬된 배열에서만 사용 가능. 정렬 없이 사용하면 잘못된 결과.', NULL, NULL, NULL),
(10560, 'cpp', 'algo-preview', '보통', '다음 이진 탐색 코드에서 {1,3,5,7,9}에서 target=5를 탐색할 때 mid값의 변화 순서는?', 'int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// arr={1,3,5,7,9}, n=5, target=5', ARRAY['"mid=2 → 찾음(반환 2)"', '"mid=0 → mid=2 → 찾음"', '"mid=2 → mid=3 → 찾음"', '"mid=4 → mid=2 → 찾음"'], 0, 'left=0, right=4 → mid=2. arr[2]=5=target이므로 바로 2를 반환합니다. 첫 번째 시도에서 찾습니다.', '이진 탐색 실행 추적', '이진 탐색은 매 단계 mid=(left+right)/2로 중간값 인덱스를 계산해 비교합니다.', NULL, NULL, NULL),
(10561, 'cpp', 'cpp-17', '보통', '선형 탐색의 시간 복잡도는?', '// N개의 원소가 있는 배열에서 선형 탐색
for (int i = 0; i < N; i++) {
    if (arr[i] == target) return i;
}', ARRAY['"O(N)"', '"O(log N)"', '"O(N^2)"', '"O(1)"'], 0, '선형 탐색은 최악의 경우 N번 비교해야 합니다. 따라서 시간 복잡도는 O(N)입니다.', '선형 탐색 시간 복잡도', '선형 탐색 O(N): 원소 수에 비례. 1000개 배열에서 최대 1000번 비교.', NULL, NULL, NULL),
(10562, 'cpp', 'algo-preview', '어려움', '다음 이진 탐색에서 {2,4,6,8,10,12,14}에서 target=10 탐색 시 총 비교 횟수는?', 'int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// arr={2,4,6,8,10,12,14}, n=7, target=10', ARRAY['"2번"', '"3번"', '"4번"', '"7번"'], 1, '1단계: left=0,right=6,mid=3,arr[3]=8<10→left=4. 2단계: left=4,right=6,mid=5,arr[5]=12>10→right=4. 3단계: left=4,right=4,mid=4,arr[4]=10=target. 총 3번 비교.', '이진 탐색 단계 추적', '이진 탐색은 O(log N). 7개 원소에서 최대 3번(log₂7≈2.8) 비교.', NULL, NULL, NULL),
(10563, 'cpp', 'algo-preview', '어려움', '다음 코드에서 정렬되지 않은 배열에 이진 탐색을 적용했을 때 문제점은?', 'int arr[] = {5, 2, 8, 1, 9, 3};  // 정렬 안 됨
// target = 8 탐색
int left = 0, right = 5;
int mid = (0 + 5) / 2;  // mid = 2
// arr[2] = 8 → 우연히 찾음

// target = 3 탐색
// left=0, right=5, mid=2, arr[2]=8 > 3 → right=1
// left=0, right=1, mid=0, arr[0]=5 > 3 → right=-1
// 탐색 실패! → -1 반환 (실제로는 존재)', ARRAY['"정렬되지 않으면 존재하는 값도 못 찾을 수 있다"', '"정렬되지 않아도 이진 탐색은 항상 정확하다"', '"이진 탐색은 중복 원소만 처리 못한다"', '"배열 크기가 짝수이면 오류가 발생한다"'], 0, '정렬되지 않은 배열에서 이진 탐색을 사용하면 실제로 존재하는 값(3)을 찾지 못하는 오류가 발생합니다. 이진 탐색은 반드시 정렬 후 사용해야 합니다.', '이진 탐색 전제 조건 위반', '이진 탐색을 정렬되지 않은 배열에 적용하면 존재하는 값도 찾지 못할 수 있습니다.', NULL, NULL, NULL),
(10564, 'cpp', 'algo-preview', '어려움', '다음 코드에서 이진 탐색의 오버플로우를 방지하는 mid 계산법은?', '// 두 가지 mid 계산 방법
int mid1 = (left + right) / 2;      // 방법 1
int mid2 = left + (right - left) / 2;  // 방법 2

// left = 1000000000, right = 2000000000 이면?', ARRAY['"방법2가 안전 — left+right가 int 범위를 초과할 수 있음"', '"두 방법 모두 동일하고 안전하다"', '"방법1이 더 안전하다"', '"left와 right의 합은 항상 int 범위 내에 있다"'], 0, 'left+right = 3,000,000,000은 int 최대값(약 2.1억)을 초과해 오버플로우 발생. left + (right-left)/2는 오버플로우 없이 동일한 결과를 냅니다.', '이진 탐색 오버플로우 방지', 'mid = left + (right - left) / 2 → (left + right) / 2와 동일하지만 오버플로우 안전.', NULL, NULL, NULL),
(10565, 'cpp', 'cpp-22', '쉬움', '다음 중 C++ class 선언의 올바른 형태는?', '// 아래 중 올바른 class 선언은?', ARRAY['"class Dog { public: string name; void bark(); };"', '"class Dog { string name; void bark() }"', '"Dog class { public: string name; };"', '"class = Dog { string name; };"'], 0, 'class 선언은 class 키워드, 이름, 중괄호 블록, 세미콜론으로 구성됩니다. 멤버 접근 제어자(public/private)를 명시합니다.', 'class 선언 문법', 'class 이름 { 접근제어자: 멤버; }; — 닫는 중괄호 뒤 세미콜론 필수.', NULL, NULL, NULL),
(10566, 'cpp', 'cpp-22', '쉬움', '다음 코드에서 객체를 생성하는 올바른 방법은?', 'class Car {
public:
    string brand;
    int speed;
};
// Car 타입의 객체 myCar를 생성하려면?', ARRAY['"Car myCar;"', '"new Car myCar;"', '"myCar = Car();"', '"Car::myCar;"'], 0, 'C++에서 객체는 ''클래스명 변수명;'' 형태로 생성합니다. Car myCar;는 Car 타입의 객체 myCar를 스택에 생성합니다.', '객체 생성', '클래스명 객체명; — 해당 클래스 타입의 객체를 생성합니다.', NULL, NULL, NULL),
(10567, 'cpp', 'cpp-22', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Animal {
public:
    string name;
    int legs;
    void describe() {
        cout << name << "는 다리가 " << legs << "개";
    }
};

int main() {
    Animal dog;
    dog.name = "강아지";
    dog.legs = 4;
    dog.describe();
    return 0;
}', ARRAY['"강아지는 다리가 4개"', '"강아지 4"', '"Animal"', '"컴파일 오류"'], 0, '객체 dog의 멤버를 설정한 후 describe() 함수를 호출합니다. 멤버함수 내에서 name과 legs에 직접 접근합니다.', '멤버함수에서 멤버변수 접근', '멤버함수 내에서는 같은 클래스의 멤버변수에 self 없이 직접 접근합니다.', NULL, NULL, NULL),
(10568, 'cpp', 'cpp-22', '쉬움', 'class에서 public과 private의 차이로 올바른 것은?', 'class BankAccount {
private:
    int balance;  // 외부 접근 불가
public:
    void deposit(int amount) { balance += amount; }
    int getBalance() { return balance; }
};', ARRAY['"public은 외부에서 접근 가능, private는 클래스 내부에서만 접근 가능"', '"public은 더 빠르고, private는 더 느리다"', '"private는 자식 클래스에서 접근 가능하다"', '"public과 private는 기능이 동일하다"'], 0, 'public 멤버는 클래스 외부에서 접근 가능합니다. private 멤버는 클래스 내부(멤버함수)에서만 접근 가능하고 외부에서는 접근 불가입니다.', '접근 제어자 (public / private)', 'public: 어디서나 접근 가능. private: 클래스 내부(멤버함수)에서만 접근 가능.', NULL, NULL, NULL),
(10569, 'cpp', 'cpp-22', '쉬움', '다음 코드에서 컴파일 오류가 발생하는 줄은?', 'class Circle {
private:
    double radius;
public:
    void setRadius(double r) { radius = r; }  // A
    double getRadius() { return radius; }      // B
};

int main() {
    Circle c;
    c.setRadius(5.0);              // C
    cout << c.radius;              // D
    return 0;
}', ARRAY['"D번 줄 (private 멤버에 외부 접근)"', '"A번 줄"', '"B번 줄"', '"C번 줄"'], 0, 'radius는 private이므로 클래스 외부(main)에서 c.radius로 직접 접근하면 컴파일 오류가 발생합니다. getRadius() 같은 public 함수를 통해 접근해야 합니다.', 'private 멤버 접근 제한', 'private 멤버는 클래스 외부에서 직접 접근 불가. getter/setter 함수를 통해 접근.', NULL, NULL, NULL),
(10570, 'cpp', 'cpp-22', '보통', '다음 코드에서 같은 class로 여러 객체를 만들 때 출력 결과는?', '#include <iostream>
using namespace std;

class Counter {
public:
    int count = 0;
    void increment() { count++; }
};

int main() {
    Counter a, b;
    a.increment();
    a.increment();
    b.increment();
    cout << a.count << " " << b.count;
    return 0;
}', ARRAY['"2 1"', '"3 3"', '"2 2"', '"1 1"'], 0, 'a와 b는 서로 독립적인 객체입니다. a.increment()를 2번 → a.count=2, b.increment()를 1번 → b.count=1.', '독립적인 객체', '같은 class로 만든 여러 객체는 독립적인 멤버변수를 가집니다. 한 객체 변경이 다른 객체에 영향 없음.', NULL, NULL, NULL),
(10571, 'cpp', 'cpp-22', '보통', 'class와 struct의 기본 접근 제어자 차이로 올바른 것은?', 'class MyClass {
    int x;  // 기본값은?
};

struct MyStruct {
    int x;  // 기본값은?
};', ARRAY['"class는 기본 private, struct는 기본 public"', '"class는 기본 public, struct는 기본 private"', '"둘 다 기본 public"', '"둘 다 기본 private"'], 0, 'C++에서 class의 기본 접근 제어자는 private입니다. struct의 기본 접근 제어자는 public입니다. 이것이 class와 struct의 가장 큰 차이입니다.', 'class vs struct 기본 접근 제어자', 'class: 기본 private. struct: 기본 public. C++에서 struct는 기본 접근만 다른 class입니다.', NULL, NULL, NULL),
(10572, 'cpp', 'cpp-22', '보통', '다음 코드에서 멤버함수가 멤버변수를 수정하는 결과는?', '#include <iostream>
using namespace std;

class Temperature {
    double celsius;
public:
    void set(double c) { celsius = c; }
    double toFahrenheit() { return celsius * 9.0 / 5.0 + 32; }
};

int main() {
    Temperature t;
    t.set(100);
    cout << t.toFahrenheit();
    return 0;
}', ARRAY['"212"', '"100"', '"37.8"', '"컴파일 오류"'], 0, '100°C를 화씨로 변환: 100 * 9/5 + 32 = 180 + 32 = 212°F. 멤버함수에서 celsius 멤버변수에 직접 접근합니다.', '멤버함수와 멤버변수', '멤버함수는 같은 클래스의 멤버변수에 자유롭게 접근하고 수정할 수 있습니다.', NULL, NULL, NULL),
(10573, 'cpp', 'cpp-22', '보통', '다음 코드에서 private 멤버를 올바르게 사용하는 방식은?', '#include <iostream>
using namespace std;

class Password {
    string secret = "1234";
public:
    bool check(string input) {
        return input == secret;
    }
};

int main() {
    Password p;
    // p.secret 접근 불가
    cout << p.check("1234") << " " << p.check("0000");
    return 0;
}', ARRAY['"1 0"', '"0 1"', '"컴파일 오류"', '"1 1"'], 0, 'secret은 private이라 외부 접근 불가지만, public 멤버함수 check()로 간접 접근합니다. check("1234")→true(1), check("0000")→false(0).', '캡슐화와 getter', 'private 데이터는 public 멤버함수를 통해 간접 접근합니다. 이것이 캡슐화의 핵심입니다.', NULL, NULL, NULL),
(10574, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Stack {
    int data[10];
    int top = -1;
public:
    void push(int v) { data[++top] = v; }
    int pop() { return data[top--]; }
    int peek() { return data[top]; }
    bool isEmpty() { return top == -1; }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << s.pop() << " " << s.peek();
    return 0;
}', ARRAY['"30 20"', '"10 20"', '"30 30"', '"컴파일 오류"'], 0, 'push(10), push(20), push(30) 후 스택: [10, 20, 30]. pop()→30(top--), peek()→20(top=1). "30 20" 출력.', '클래스로 구현한 자료구조', 'class로 스택, 큐 등 자료구조를 캡슐화할 수 있습니다. private 데이터, public 인터페이스.', NULL, NULL, NULL),
(10575, 'cpp', 'cpp-22', '어려움', '다음 코드에서 클래스 외부에 멤버함수를 정의할 때 올바른 형태는?', 'class Rectangle {
    int w, h;
public:
    Rectangle(int w, int h);
    int area();  // 선언만
};

// 클래스 외부에서 정의
???
int Rectangle::area() {
    return w * h;
}', ARRAY['"Rectangle::Rectangle(int w, int h) : w(w), h(h) {}"', '"Rectangle(int w, int h) : w(w), h(h) {}"', '"Rectangle.Rectangle(int w, int h) { this.w = w; }"', '"void Rectangle::Rectangle(int w, int h) { w = w; }"'], 0, '클래스 외부에서 멤버함수를 정의할 때는 클래스명::함수명 형태를 사용합니다. 생성자는 반환 타입 없이 클래스명::클래스명(매개변수)로 정의합니다.', '클래스 외부 멤버함수 정의', '클래스명::함수명으로 외부 정의. 헤더(.h)에 선언, 소스(.cpp)에 정의하는 패턴에서 사용.', NULL, NULL, NULL),
(10576, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Matrix {
    int data[2][2];
public:
    Matrix(int a, int b, int c, int d) {
        data[0][0]=a; data[0][1]=b;
        data[1][0]=c; data[1][1]=d;
    }
    int get(int r, int c) { return data[r][c]; }
    int trace() { return data[0][0] + data[1][1]; }
};

int main() {
    Matrix m(1, 2, 3, 4);
    cout << m.trace() << " " << m.get(1, 0);
    return 0;
}', ARRAY['"5 3"', '"3 5"', '"6 3"', '"컴파일 오류"'], 0, 'trace() = data[0][0] + data[1][1] = 1 + 4 = 5. get(1, 0) = data[1][0] = 3. "5 3" 출력.', '클래스 멤버함수 활용', '멤버함수는 private 멤버변수(배열 포함)에 자유롭게 접근해 연산을 수행합니다.', NULL, NULL, NULL),
(10577, 'cpp', 'cpp-22', '어려움', '다음 코드에서 컴파일이 성공하는 조합은?', 'class Secret {
    int value = 42;
    void privateMethod() { cout << "private"; }
public:
    int getValue() { return value; }
    void show() { privateMethod(); cout << value; }
};

Secret s;
// 다음 중 컴파일 가능한 것은?', ARRAY['"s.show(); 와 s.getValue();"', '"s.value; 와 s.privateMethod();"', '"s.value = 10; 만"', '"s.privateMethod(); 만"'], 0, 'show()와 getValue()는 public이므로 외부에서 호출 가능합니다. value와 privateMethod()는 private이므로 외부 접근 시 컴파일 오류입니다.', '접근 제어자 총정리', 'public 멤버만 클래스 외부에서 접근 가능. private 멤버는 클래스 내부(멤버함수)에서만 접근.', NULL, NULL, NULL),
(10578, 'cpp', 'cpp-22', '쉬움', '생성자(constructor)의 특징으로 올바른 것은?', 'class Dog {
public:
    string name;
    Dog(string n) {   // 생성자
        name = n;
    }
};', ARRAY['"클래스 이름과 동일하고 반환 타입이 없다"', '"반환 타입이 void이다"', '"이름 앞에 ~를 붙인다"', '"객체가 소멸될 때 자동으로 호출된다"'], 0, '생성자는 클래스 이름과 같은 이름을 가지며 반환 타입(void 포함)을 명시하지 않습니다. 객체 생성 시 자동으로 호출됩니다.', '생성자 특징', '생성자: 클래스 이름과 동일, 반환 타입 없음, 객체 생성 시 자동 호출.', NULL, NULL, NULL),
(10579, 'cpp', 'cpp-22', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

class Cat {
    string name;
    int age;
public:
    Cat(string n, int a) {
        name = n;
        age = a;
    }
    void info() { cout << name << " " << age; }
};

int main() {
    Cat c("나비", 2);
    c.info();
    return 0;
}', ARRAY['"나비 2"', '"나비2"', '"컴파일 오류"', '"0 0"'], 0, 'Cat("나비", 2) 생성자 호출로 name="나비", age=2로 초기화됩니다. info()는 "나비 2"를 출력합니다.', '생성자 매개변수', '생성자에 매개변수를 선언하면 객체 생성 시 초기값을 전달할 수 있습니다.', NULL, NULL, NULL),
(10580, 'cpp', 'cpp-22', '쉬움', '생성자 초기화 리스트의 올바른 문법은?', 'class Point {
    int x, y;
public:
    // 초기화 리스트 사용
    Point(int a, int b) ??? {
        // 본문은 비워도 됨
    }
};', ARRAY['": x(a), y(b)"', '"= x(a), y(b)"', '"{ x = a, y = b }"', '"-> x(a), y(b)"'], 0, '생성자 초기화 리스트는 매개변수 목록 뒤에 콜론(:)으로 시작합니다. 멤버변수(초기값) 형태로 나열합니다.', '생성자 초기화 리스트', '생성자명(매개변수) : 멤버1(값1), 멤버2(값2) {} — 생성자 본문 실행 전에 멤버를 초기화.', NULL, NULL, NULL),
(10581, 'cpp', 'cpp-22', '쉬움', '소멸자(destructor)의 특징으로 올바른 것은?', 'class Resource {
public:
    Resource() { cout << "생성\n"; }
    ~Resource() { cout << "소멸\n"; }  // 소멸자
};', ARRAY['"이름 앞에 ~를 붙이고 매개변수가 없다"', '"반환 타입이 void이다"', '"매개변수를 가질 수 있다"', '"수동으로만 호출된다"'], 0, '소멸자는 ~클래스명() 형태로 선언합니다. 매개변수와 반환 타입이 없으며, 객체가 스코프를 벗어날 때 자동으로 호출됩니다.', '소멸자 (Destructor)', '~클래스명(): 매개변수 없음, 반환 타입 없음, 객체 소멸 시 자동 호출.', NULL, NULL, NULL),
(10582, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Timer {
public:
    Timer() { cout << "시작 "; }
    ~Timer() { cout << "종료 "; }
};

int main() {
    cout << "A ";
    Timer t;
    cout << "B ";
    return 0;
}', ARRAY['"A 시작 B 종료"', '"시작 A B 종료"', '"A B 시작 종료"', '"A 시작 B"'], 0, '순서: 1) "A " 출력 2) Timer t 생성→생성자 "시작 " 3) "B " 출력 4) main 종료 시 t 소멸→소멸자 "종료 "', '생성자/소멸자 호출 순서', '생성자는 객체 생성 시 즉시 호출. 소멸자는 객체가 스코프를 벗어날 때(함수 종료 등) 호출.', NULL, NULL, NULL),
(10583, 'cpp', 'cpp-22', '보통', '다음 코드에서 초기화 리스트를 사용했을 때 출력 결과는?', '#include <iostream>
using namespace std;

class Rectangle {
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    int area() { return width * height; }
    int perimeter() { return 2 * (width + height); }
};

int main() {
    Rectangle r(6, 4);
    cout << r.area() << " " << r.perimeter();
    return 0;
}', ARRAY['"24 20"', '"20 24"', '"10 24"', '"컴파일 오류"'], 0, '초기화 리스트로 width=6, height=4. area()=6*4=24, perimeter()=2*(6+4)=20. "24 20" 출력.', '초기화 리스트 활용', '초기화 리스트는 멤버변수를 생성자 본문 전에 초기화합니다. const 멤버, 참조 멤버에 필수.', NULL, NULL, NULL),
(10584, 'cpp', 'cpp-22', '보통', '다음 생성자 오버로딩 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Box {
    int size;
public:
    Box() : size(1) {}           // 기본 생성자
    Box(int s) : size(s) {}      // 매개변수 있는 생성자
    void show() { cout << size << " "; }
};

int main() {
    Box a;
    Box b(5);
    a.show();
    b.show();
    return 0;
}', ARRAY['"1 5"', '"5 1"', '"0 5"', '"컴파일 오류"'], 0, 'Box a는 기본 생성자 → size=1. Box b(5)는 매개변수 생성자 → size=5. a.show()→"1 ", b.show()→"5 ".', '생성자 오버로딩', '같은 클래스에 여러 생성자를 정의할 수 있습니다. 인자 유무/개수/타입에 따라 적절한 생성자가 선택됩니다.', NULL, NULL, NULL),
(10585, 'cpp', 'cpp-22', '보통', '다음 코드에서 this 포인터의 역할은?', '#include <iostream>
using namespace std;

class MyNum {
    int num;
public:
    MyNum(int num) {
        this->num = num;  // this 포인터 사용
    }
    void show() { cout << num; }
};

int main() {
    MyNum n(42);
    n.show();
    return 0;
}', ARRAY['"매개변수 num과 멤버변수 num을 구분한다"', '"this는 현재 클래스 타입을 나타낸다"', '"this->num은 오류를 발생시킨다"', '"this는 static 멤버함수에서도 사용 가능하다"'], 0, '매개변수 이름과 멤버변수 이름이 같을 때 this->num은 멤버변수, 단순 num은 매개변수를 가리킵니다. this->num = num은 매개변수값을 멤버변수에 대입합니다.', 'this 포인터', 'this: 현재 객체 자신을 가리키는 포인터. 이름 충돌 해결 및 자기 자신 반환에 사용.', NULL, NULL, NULL),
(10586, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Countdown {
    int count;
public:
    Countdown(int start) : count(start) {}
    ~Countdown() { cout << count << " "; }
};

int main() {
    Countdown a(3);
    Countdown b(1);
    Countdown c(2);
    return 0;
}', ARRAY['"2 1 3"', '"3 1 2"', '"1 2 3"', '"3 2 1"'], 0, '소멸자는 생성 역순(LIFO)으로 호출됩니다. c(2) 먼저 소멸→"2 ", b(1) 소멸→"1 ", a(3) 소멸→"3 ". 결과: "2 1 3".', '소멸자 호출 순서 (역순)', '스택에 생성된 객체는 생성 역순으로 소멸됩니다. 마지막에 생성된 객체가 가장 먼저 소멸.', NULL, NULL, NULL),
(10587, 'cpp', 'cpp-22', '어려움', '다음 코드에서 기본 생성자가 없어 컴파일 오류가 나는 이유는?', 'class Vector {
    int x, y;
public:
    Vector(int a, int b) : x(a), y(b) {}
};

int main() {
    Vector v1(1, 2);  // OK
    Vector v2;        // 오류?
    return 0;
}', ARRAY['"매개변수 있는 생성자를 정의하면 기본 생성자가 자동 생성되지 않는다"', '"Vector에 public이 없어서 오류가 난다"', '"int x, y가 초기화되지 않아서 오류가 난다"', '"v2는 반드시 new로 생성해야 한다"'], 0, '생성자를 하나라도 정의하면 컴파일러가 기본 생성자를 자동으로 만들지 않습니다. Vector v2;는 기본 생성자를 호출하지만 없으므로 오류입니다.', '기본 생성자와 사용자 정의 생성자', '생성자를 하나라도 정의하면 컴파일러 제공 기본 생성자가 사라집니다. 필요하면 명시적으로 Vector() = default; 추가.', NULL, NULL, NULL),
(10588, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Node {
public:
    int val;
    Node(int v) : val(v) { cout << "생성(" << v << ") "; }
    ~Node() { cout << "소멸(" << val << ") "; }
};

void func() {
    Node a(1);
    Node b(2);
}

int main() {
    func();
    cout << "끝";
    return 0;
}', ARRAY['"생성(1) 생성(2) 소멸(2) 소멸(1) 끝"', '"생성(1) 생성(2) 소멸(1) 소멸(2) 끝"', '"생성(2) 생성(1) 소멸(1) 소멸(2) 끝"', '"생성(1) 생성(2) 끝 소멸(2) 소멸(1)"'], 0, 'func() 안에서 a(1) 생성, b(2) 생성. func() 종료 시 역순 소멸: b(2) 먼저, a(1) 다음. 그 후 main에서 "끝" 출력.', '함수 스코프와 생성자/소멸자', '함수 스코프 내 객체는 함수 종료 시 생성 역순으로 소멸됩니다.', NULL, NULL, NULL),
(10589, 'cpp', 'cpp-22', '쉬움', 'C++ 상속 문법으로 올바른 것은?', 'class Animal {
public:
    void breathe() { cout << "숨쉬기"; }
};
// Dog이 Animal을 상속받으려면?', ARRAY['"class Dog : public Animal { };"', '"class Dog extends Animal { };"', '"class Dog implements Animal { };"', '"class Dog inherits Animal { };"'], 0, 'C++에서 상속은 ''class 자식 : public 부모'' 문법을 사용합니다. Java의 extends와 달리 : public을 사용합니다.', '상속 문법', 'class 파생클래스 : public 기본클래스 { }; — public 상속이 가장 일반적.', NULL, NULL, NULL),
(10590, 'cpp', 'cpp-22', '쉬움', '다음 코드에서 Dog가 Animal의 메서드를 사용하는 결과는?', '#include <iostream>
using namespace std;

class Animal {
public:
    void eat() { cout << "먹는다 "; }
};

class Dog : public Animal {
public:
    void bark() { cout << "멍멍"; }
};

int main() {
    Dog d;
    d.eat();    // Animal의 메서드
    d.bark();   // Dog의 메서드
    return 0;
}', ARRAY['"먹는다 멍멍"', '"멍멍 먹는다"', '"컴파일 오류"', '"먹는다"'], 0, 'Dog는 Animal을 상속받으므로 Animal의 public 멤버(eat)를 그대로 사용할 수 있습니다. d.eat()→"먹는다 ", d.bark()→"멍멍".', '상속받은 멤버 사용', '파생 클래스는 기본 클래스의 public/protected 멤버를 자신의 것처럼 사용할 수 있습니다.', NULL, NULL, NULL),
(10591, 'cpp', 'cpp-22', '쉬움', '상속에서 protected 멤버의 접근 범위로 올바른 것은?', 'class Animal {
protected:
    string name;  // protected
public:
    Animal(string n) : name(n) {}
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void showName() {
        cout << name;  // 접근 가능?
    }
};', ARRAY['"자식 클래스(Dog)에서는 접근 가능, 외부(main)에서는 불가"', '"어디서나 접근 가능"', '"클래스 내부에서만 접근 가능 (private와 동일)"', '"자식 클래스에서도 접근 불가"'], 0, 'protected 멤버는 해당 클래스와 파생 클래스에서 접근 가능합니다. 외부(main 등)에서는 접근할 수 없습니다.', 'protected 접근 제어자', 'protected: 자신과 자식 클래스에서 접근 가능. 외부 접근 불가. private와 public의 중간.', NULL, NULL, NULL),
(10592, 'cpp', 'cpp-22', '쉬움', '부모 생성자를 호출하는 올바른 문법은?', 'class Animal {
    string name;
public:
    Animal(string n) : name(n) {}
};

class Dog : public Animal {
    string breed;
public:
    // 부모 생성자를 호출하려면?
    Dog(string n, string b) ??? : breed(b) {}
};', ARRAY['": Animal(n)"', '": super(n)"', '": parent(n)"', '": Animal::Animal(n)"'], 0, 'C++에서 부모 생성자 호출은 초기화 리스트에서 : Animal(n) 형태를 사용합니다. Java의 super()와 달리 부모 클래스 이름을 직접 씁니다.', '부모 생성자 호출', '파생클래스(매개변수) : 기본클래스(매개변수), 자체멤버(값) {} — 초기화 리스트에서 부모 생성자 호출.', NULL, NULL, NULL),
(10593, 'cpp', 'cpp-22', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Vehicle {
public:
    int wheels;
    Vehicle(int w) : wheels(w) {}
};

class Bike : public Vehicle {
public:
    Bike() : Vehicle(2) {}
    void info() { cout << "바퀴: " << wheels; }
};

int main() {
    Bike b;
    b.info();
    return 0;
}', ARRAY['"바퀴: 2"', '"바퀴: 0"', '"컴파일 오류"', '"0"'], 0, 'Bike()는 Vehicle(2)를 호출해 wheels=2로 초기화. info()에서 상속받은 wheels에 접근해 "바퀴: 2" 출력.', '부모 생성자와 멤버 초기화', '파생 클래스 생성자에서 기본 클래스 생성자를 호출해 부모 멤버를 초기화합니다.', NULL, NULL, NULL),
(10594, 'cpp', 'cpp-22', '보통', '다음 코드에서 메서드 오버라이딩의 출력 결과는?', '#include <iostream>
using namespace std;

class Shape {
public:
    void draw() { cout << "도형 그리기 "; }
};

class Circle : public Shape {
public:
    void draw() { cout << "원 그리기 "; }  // 오버라이딩
};

int main() {
    Circle c;
    c.draw();           // Circle의 draw
    c.Shape::draw();    // Shape의 draw
    return 0;
}', ARRAY['"원 그리기 도형 그리기"', '"도형 그리기 원 그리기"', '"도형 그리기 도형 그리기"', '"컴파일 오류"'], 0, 'c.draw()는 Circle의 오버라이딩된 draw()를 호출합니다. c.Shape::draw()는 범위 지정 연산자로 부모의 draw()를 명시적으로 호출합니다.', '메서드 오버라이딩', '자식 클래스에서 부모와 같은 이름의 함수를 재정의하면 자식의 것이 우선. 부모 것은 클래스명::함수명으로 접근.', NULL, NULL, NULL),
(10595, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class A {
public:
    A() { cout << "A생성 "; }
    ~A() { cout << "A소멸 "; }
};

class B : public A {
public:
    B() { cout << "B생성 "; }
    ~B() { cout << "B소멸 "; }
};

int main() {
    B b;
    return 0;
}', ARRAY['"A생성 B생성 B소멸 A소멸"', '"B생성 A생성 A소멸 B소멸"', '"A생성 B생성 A소멸 B소멸"', '"B생성 B소멸 A생성 A소멸"'], 0, '생성 시: 부모(A) 먼저 생성 → 자식(B) 생성. 소멸 시: 자식(B) 먼저 소멸 → 부모(A) 소멸. 생성과 소멸은 역순.', '상속에서 생성자/소멸자 순서', '생성: 부모→자식 순서. 소멸: 자식→부모 순서(생성의 역순).', NULL, NULL, NULL),
(10596, 'cpp', 'cpp-22', '보통', '다음 코드에서 파생 클래스가 부모의 private 멤버에 접근할 수 없는 이유는?', 'class Animal {
    string sound;  // private
public:
    Animal(string s) : sound(s) {}
};

class Dog : public Animal {
public:
    Dog() : Animal("멍멍") {}
    void bark() {
        cout << sound;  // 오류!
    }
};', ARRAY['"private 멤버는 자식 클래스에서도 직접 접근 불가"', '"Dog가 Animal을 상속받지 않아서"', '"sound가 초기화되지 않아서"', '"string 타입이 지원되지 않아서"'], 0, 'private 멤버는 해당 클래스 내부에서만 접근 가능합니다. 자식 클래스도 부모의 private에는 직접 접근 불가입니다. protected나 getter 함수를 사용해야 합니다.', 'private는 자식도 접근 불가', 'private: 자신 클래스만 접근. protected: 자신 + 자식 접근. public: 어디서나 접근.', NULL, NULL, NULL),
(10597, 'cpp', 'cpp-22', '보통', '다음 다중 레벨 상속 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class A {
public:
    void funcA() { cout << "A "; }
};

class B : public A {
public:
    void funcB() { cout << "B "; }
};

class C : public B {
public:
    void funcC() { cout << "C "; }
};

int main() {
    C obj;
    obj.funcA();
    obj.funcB();
    obj.funcC();
    return 0;
}', ARRAY['"A B C"', '"C B A"', '"컴파일 오류"', '"A C"'], 0, 'C는 B를 상속받고, B는 A를 상속받습니다. C는 A, B, C 모두의 멤버를 사용할 수 있습니다. 출력: A B C.', '다중 레벨 상속', 'A→B→C 상속 시 C는 A, B의 모든 public/protected 멤버를 사용 가능합니다.', NULL, NULL, NULL),
(10598, 'cpp', 'cpp-22', '보통', '다음 코드에서 자식 클래스가 부모 메서드를 호출하는 올바른 방법은?', '#include <iostream>
using namespace std;

class Animal {
public:
    void introduce() { cout << "동물입니다 "; }
};

class Dog : public Animal {
public:
    void introduce() {
        Animal::introduce();  // 부모 메서드 호출
        cout << "강아지입니다";
    }
};

int main() {
    Dog d;
    d.introduce();
    return 0;
}', ARRAY['"동물입니다 강아지입니다"', '"강아지입니다 동물입니다"', '"컴파일 오류"', '"동물입니다"'], 0, 'Animal::introduce()로 부모의 introduce()를 명시적으로 호출합니다. 그 후 "강아지입니다"를 추가 출력합니다.', '자식에서 부모 메서드 호출', '부모클래스명::함수명()으로 자식 클래스 내에서 부모 메서드를 명시적으로 호출합니다.', NULL, NULL, NULL),
(10599, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    int x;
    Base(int x) : x(x) {}
    int getX() { return x; }
};

class Child : public Base {
public:
    int x;  // 부모의 x를 가림(shadowing)
    Child(int bx, int cx) : Base(bx), x(cx) {}
    void show() {
        cout << x << " " << Base::x;
    }
};

int main() {
    Child c(10, 20);
    c.show();
    return 0;
}', ARRAY['"20 10"', '"10 20"', '"10 10"', '"컴파일 오류"'], 0, 'Child::x=20(자식), Base::x=10(부모). show()에서 x는 자식의 x(20), Base::x는 부모의 x(10). "20 10" 출력.', '멤버변수 섀도잉', '자식 클래스에 부모와 같은 이름의 멤버가 있으면 자식 멤버가 우선. 부모 것은 Base::x로 접근.', NULL, NULL, NULL),
(10600, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Employee {
protected:
    string name;
    int salary;
public:
    Employee(string n, int s) : name(n), salary(s) {}
    virtual void info() {
        cout << name << " " << salary;
    }
};

class Manager : public Employee {
    int bonus;
public:
    Manager(string n, int s, int b)
        : Employee(n, s), bonus(b) {}
    void info() override {
        Employee::info();
        cout << " +" << bonus;
    }
};

int main() {
    Manager m("Kim", 5000, 1000);
    m.info();
    return 0;
}', ARRAY['"Kim 5000 +1000"', '"Kim 5000"', '"+1000"', '"컴파일 오류"'], 0, 'Manager::info()에서 Employee::info()를 먼저 호출해 "Kim 5000" 출력, 이후 " +1000" 추가 출력. 총 "Kim 5000 +1000".', '상속에서 부모 메서드 확장', '오버라이딩된 메서드에서 부모클래스::함수명()으로 부모 기능을 재사용하고 추가 기능을 붙일 수 있습니다.', NULL, NULL, NULL),
(10601, 'cpp', 'cpp-22', '어려움', '다음 코드에서 private 상속과 public 상속의 차이를 보여주는 결과는?', 'class Base {
public:
    void show() { cout << "Base"; }
};

class PubDerived : public Base {};   // public 상속
class PrivDerived : private Base {}; // private 상속

int main() {
    PubDerived p;
    p.show();  // A: 가능?

    PrivDerived q;
    q.show();  // B: 가능?
    return 0;
}', ARRAY['"A만 가능, B는 컴파일 오류"', '"A, B 모두 가능"', '"A, B 모두 오류"', '"B만 가능"'], 0, 'public 상속 시 부모의 public 멤버가 자식에서도 public으로 유지됩니다. private 상속 시 부모의 public 멤버가 자식의 private으로 바뀌어 외부 접근 불가.', 'public vs private 상속', 'public 상속: 부모 public→자식 public. private 상속: 부모 public→자식 private(외부 접근 불가).', NULL, NULL, NULL),
(10602, 'cpp', 'cpp-22', '쉬움', 'virtual 함수의 역할로 올바른 것은?', 'class Animal {
public:
    virtual void speak() { cout << "..."; }
};
class Dog : public Animal {
public:
    void speak() override { cout << "멍멍"; }
};', ARRAY['"부모 포인터/참조로 자식의 함수가 호출되게 한다"', '"함수 호출 속도를 빠르게 한다"', '"함수가 두 번 실행되게 한다"', '"static 함수를 만든다"'], 0, 'virtual 함수를 선언하면 부모 타입의 포인터/참조를 통해 호출해도 실제 객체(자식)의 함수가 호출됩니다. 이것이 런타임 다형성입니다.', 'virtual 함수', 'virtual: 런타임에 실제 객체 타입의 함수를 호출. 부모 포인터로 자식 함수 호출 가능.', NULL, NULL, NULL),
(10603, 'cpp', 'cpp-22', '쉬움', 'override 키워드의 역할로 올바른 것은?', 'class Base {
public:
    virtual void func() {}
};

class Derived : public Base {
public:
    void func() override {}  // override 키워드
};', ARRAY['"부모의 virtual 함수를 재정의한다고 컴파일러에 알려 실수를 방지한다"', '"함수를 반드시 구현하도록 강제한다"', '"함수를 순수 가상 함수로 만든다"', '"함수의 반환 타입을 변경한다"'], 0, 'override는 부모의 virtual 함수를 재정의함을 명시합니다. 함수 이름/시그니처가 다르면 컴파일 오류로 알려줍니다. 버그 예방에 유용합니다.', 'override 키워드', 'override: 부모의 virtual 함수를 오버라이딩함을 명시. 시그니처 불일치 시 컴파일 오류.', NULL, NULL, NULL),
(10604, 'cpp', 'cpp-22', '쉬움', '순수 가상 함수(pure virtual function) 선언으로 올바른 것은?', 'class Shape {
public:
    // 순수 가상 함수 선언
    virtual double area() ??? ;
};', ARRAY['"= 0"', '"= null"', '"= virtual"', '"= abstract"'], 0, 'C++에서 순수 가상 함수는 virtual 반환타입 함수명() = 0; 으로 선언합니다. = 0이 핵심입니다.', '순수 가상 함수 문법', 'virtual 타입 함수명() = 0; — = 0으로 순수 가상 함수 선언. 해당 클래스는 추상 클래스가 됨.', NULL, NULL, NULL),
(10605, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() { cout << "..."; }
};

class Cat : public Animal {
public:
    void speak() override { cout << "야옹"; }
};

int main() {
    Animal* p = new Cat();
    p->speak();
    delete p;
    return 0;
}', ARRAY['"야옹"', '"..."', '"컴파일 오류"', '"야옹..."'], 0, 'p는 Animal* 타입이지만 실제로는 Cat 객체를 가리킵니다. speak()가 virtual이므로 실제 타입 Cat의 speak()가 호출되어 "야옹"이 출력됩니다.', '기본 클래스 포인터와 다형성', 'Animal* p = new Cat(); — 부모 포인터로 자식 객체. virtual 함수이면 실제 타입(Cat)의 함수 호출.', NULL, NULL, NULL),
(10606, 'cpp', 'cpp-22', '보통', '추상 클래스(abstract class)에 대한 설명으로 올바른 것은?', 'class AbstractShape {
public:
    virtual double area() = 0;  // 순수 가상 함수
    virtual double perimeter() = 0;
};

// AbstractShape s;  // 가능할까?', ARRAY['"순수 가상 함수가 있으면 직접 인스턴스 생성 불가"', '"추상 클래스는 포인터도 만들 수 없다"', '"추상 클래스는 일반 멤버함수를 가질 수 없다"', '"추상 클래스를 상속받은 클래스도 인스턴스 생성 불가"'], 0, '순수 가상 함수가 하나라도 있으면 추상 클래스가 되어 직접 인스턴스 생성이 불가합니다. 단, 포인터 선언(AbstractShape*)은 가능합니다.', '추상 클래스', '순수 가상 함수 포함 → 추상 클래스. 직접 인스턴스 불가. 파생 클래스에서 모든 순수 가상 함수 구현 필요.', NULL, NULL, NULL),
(10607, 'cpp', 'cpp-22', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Printer {
public:
    virtual void print() { cout << "기본프린터 "; }
};

class LaserPrinter : public Printer {
public:
    void print() override { cout << "레이저 "; }
};

class InkjetPrinter : public Printer {
public:
    void print() override { cout << "잉크젯 "; }
};

void doPrint(Printer& p) {
    p.print();
}

int main() {
    LaserPrinter lp;
    InkjetPrinter ip;
    doPrint(lp);
    doPrint(ip);
    return 0;
}', ARRAY['"레이저 잉크젯"', '"기본프린터 기본프린터"', '"레이저 기본프린터"', '"컴파일 오류"'], 0, 'doPrint는 Printer& 참조를 받지만 virtual 함수이므로 실제 객체 타입의 print()가 호출됩니다. LaserPrinter→"레이저 ", InkjetPrinter→"잉크젯 ".', '참조를 통한 런타임 다형성', '부모 참조(Printer&)를 통해 virtual 함수 호출 시 실제 객체 타입의 함수가 호출됩니다.', NULL, NULL, NULL),
(10608, 'cpp', 'cpp-22', '보통', '가상 소멸자(virtual destructor)가 필요한 이유는?', 'class Base {
public:
    // ~Base() {}          // 일반 소멸자
    virtual ~Base() {}    // 가상 소멸자
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() { delete[] data; }
};

Base* p = new Derived();
delete p;  // 어떤 소멸자가 호출될까?', ARRAY['"가상 소멸자가 없으면 delete p 시 Derived 소멸자가 호출되지 않아 메모리 누수"', '"가상 소멸자는 소멸자를 두 번 호출한다"', '"가상 소멸자는 성능을 향상시킨다"', '"가상 소멸자가 없어도 항상 올바르게 소멸된다"'], 0, 'Base* p로 delete 시 가상 소멸자가 없으면 Base::~Base()만 호출되어 Derived의 data가 해제되지 않습니다. virtual ~Base()가 있어야 Derived::~Derived()도 호출됩니다.', '가상 소멸자', '상속 계층에서 부모 포인터로 delete 시 가상 소멸자가 없으면 자식 소멸자가 호출 안됩니다. 메모리 누수 방지.', NULL, NULL, NULL),
(10609, 'cpp', 'cpp-22', '어려움', '다음 코드에서 순수 가상 함수를 구현하지 않은 클래스를 인스턴스화하면?', 'class Interface {
public:
    virtual void doWork() = 0;
    virtual void doMore() = 0;
};

class PartialImpl : public Interface {
public:
    void doWork() override { cout << "작업 완료"; }
    // doMore()는 구현 안 함
};

// PartialImpl p;  // 결과는?', ARRAY['"컴파일 오류 — 순수 가상 함수 doMore()가 구현되지 않음"', '"런타임 오류 발생"', '"doMore()는 자동으로 빈 함수가 됨"', '"정상 컴파일, doMore() 호출 시에만 오류"'], 0, '순수 가상 함수가 하나라도 구현되지 않으면 그 클래스도 추상 클래스가 됩니다. PartialImpl은 doMore()를 구현하지 않았으므로 인스턴스 생성 시 컴파일 오류입니다.', '미구현 순수 가상 함수', '파생 클래스가 순수 가상 함수를 모두 구현해야 인스턴스 생성 가능. 하나라도 빠지면 여전히 추상 클래스.', NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  updated_at = NOW();

INSERT INTO questions (id, language, lesson_id, difficulty, question, code, options, correct_answer, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison)
VALUES
(10610, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    virtual void func() { cout << "Base "; }
    void nonVirtual() { cout << "BaseNV "; }
};

class Derived : public Base {
public:
    void func() override { cout << "Derived "; }
    void nonVirtual() { cout << "DerivedNV "; }
};

int main() {
    Base* arr[2];
    arr[0] = new Base();
    arr[1] = new Derived();
    for (int i = 0; i < 2; i++) {
        arr[i]->func();
        arr[i]->nonVirtual();
    }
    delete arr[0]; delete arr[1];
    return 0;
}', ARRAY['"Base BaseNV Derived BaseNV"', '"Base BaseNV Derived DerivedNV"', '"Base DerivedNV Derived DerivedNV"', '"Base BaseNV Base BaseNV"'], 0, 'func()는 virtual: arr[0]→Base, arr[1]→Derived. nonVirtual()은 non-virtual: 포인터 타입(Base)의 것이 항상 호출. 결과: Base BaseNV Derived BaseNV.', 'virtual vs non-virtual 배열', 'virtual: 런타임에 실제 타입 결정. non-virtual: 컴파일 타임에 포인터 타입으로 결정.', NULL, NULL, NULL),
(10611, 'cpp', 'cpp-22', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

class IAnimal {
public:
    virtual string sound() = 0;
    virtual string type() = 0;
    void describe() {
        cout << type() << "은 " << sound() << " 소리를 낸다\n";
    }
};

class Dog : public IAnimal {
public:
    string sound() override { return "멍멍"; }
    string type() override { return "강아지"; }
};

class Cat : public IAnimal {
public:
    string sound() override { return "야옹"; }
    string type() override { return "고양이"; }
};

int main() {
    IAnimal* animals[] = {new Dog(), new Cat()};
    for (auto a : animals) a->describe();
    return 0;
}', ARRAY['"강아지은 멍멍 소리를 낸다
고양이은 야옹 소리를 낸다"', '"멍멍
야옹"', '"컴파일 오류 (IAnimal 인스턴스 생성 불가)"', '"강아지은 야옹 소리를 낸다
고양이은 멍멍 소리를 낸다"'], 0, 'IAnimal*로 Dog, Cat을 가리킵니다. describe()는 IAnimal의 일반 멤버함수이고 내부에서 virtual 함수 sound()와 type()을 호출해 각 객체의 구현이 실행됩니다.', '템플릿 메서드 패턴', '부모 클래스의 일반 함수에서 virtual 함수를 호출하면 실제 자식 클래스의 구현이 실행됩니다. 템플릿 메서드 패턴의 기초.', NULL, NULL, NULL),
(10612, 'cpp', 'cpp-22', '어려움', '다음 코드에서 런타임 다형성과 컴파일 타임의 차이를 보여주는 결과는?', '#include <iostream>
using namespace std;

class Base {
public:
    virtual void vFunc() { cout << "Base-V "; }
    void nFunc() { cout << "Base-N "; }
};

class Child : public Base {
public:
    void vFunc() override { cout << "Child-V "; }
    void nFunc() { cout << "Child-N "; }
};

void callByRef(Base& b) {
    b.vFunc();
    b.nFunc();
}

int main() {
    Child c;
    callByRef(c);
    return 0;
}', ARRAY['"Child-V Base-N"', '"Child-V Child-N"', '"Base-V Base-N"', '"Base-V Child-N"'], 0, 'callByRef는 Base& 타입. vFunc()는 virtual → 런타임에 실제 타입(Child) 결정 → Child-V. nFunc()는 non-virtual → 컴파일 타임에 참조 타입(Base) 결정 → Base-N.', '런타임 vs 컴파일 타임 바인딩', 'virtual 함수: 런타임 바인딩(실제 객체 타입). non-virtual 함수: 컴파일 타임 바인딩(참조/포인터 타입).', NULL, NULL, NULL),
(10613, 'cpp', 'cpp-2', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << "\n";
    cout << "World" << "\n";
    return 0;
}', ARRAY['"HelloWorld"', '"Hello World"', '"Hello
World"', '"컴파일 오류"'], 2, '''\n''은 줄바꿈 문자입니다. endl과 달리 버퍼를 비우지 않지만 줄바꿈 효과는 동일합니다. Hello와 World가 각각 다른 줄에 출력됩니다.', '''\n'' 줄바꿈', '''\n''은 줄바꿈 문자입니다. endl처럼 줄을 바꾸지만 버퍼 flush를 하지 않아 더 빠릅니다. 경쟁 프로그래밍에서는 endl 대신 ''\n''을 권장합니다.', ARRAY['"\n"', '"endl"', '"cout"', '"이스케이프 문자"'], NULL, NULL),
(10614, 'cpp', 'cpp-2', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "경로: C:\\Users\\Kim" << endl;
    return 0;
}', ARRAY['"경로: C:\\Users\\Kim"', '"경로: C:\Users\Kim"', '"경로: C:UsersKim"', '"컴파일 오류"'], 1, '''\\\\'' 두 개는 백슬래시 하나를 출력합니다. 문자열 안에서 백슬래시 자체를 나타내려면 ''\\\\''처럼 두 개를 써야 합니다.', '이스케이프 문자 ''\\\\''', '백슬래시(\\)는 특수 문자입니다. 문자열 안에 백슬래시를 출력하려면 ''\\\\''처럼 두 개를 써야 합니다. 파일 경로 출력 시 자주 사용합니다.', ARRAY['"이스케이프 문자"', '"\\\\"', '"cout"'], NULL, NULL),
(10615, 'cpp', 'cpp-2', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << 3 + 4 << endl;
    return 0;
}', ARRAY['"3 + 4"', '"7"', '"34"', '"컴파일 오류"'], 1, 'cout은 수식을 계산한 결과를 출력합니다. 3 + 4는 7로 계산되어 출력됩니다. 문자열로 출력하려면 "3 + 4"처럼 따옴표로 감싸야 합니다.', '수식 직접 출력', 'cout << 수식 형태로 쓰면 수식이 계산된 결과가 출력됩니다. cout << 3 + 4는 7을 출력하고, cout << "3 + 4"는 문자열 그대로 출력합니다.', ARRAY['"cout"', '"수식 출력"', '"<<연산자"'], NULL, NULL),
(10616, 'cpp', 'cpp-2', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 3;
    cout << a << " " << b << endl;
    return 0;
}', ARRAY['"a b"', '"5 3"', '"5b"', '"ab"'], 1, 'cout에서 << 연산자로 여러 값을 이어서 출력할 수 있습니다. a는 5, " "는 공백, b는 3으로 출력됩니다.', '여러 값 연속 출력', 'cout << 값1 << " " << 값2처럼 << 연산자를 연결하면 여러 값을 한 줄에 출력할 수 있습니다. 공백이나 구분자는 문자열로 넣어줍니다.', ARRAY['"cout"', '"<<연산자"', '"연속 출력"'], NULL, NULL),
(10617, 'cpp', 'cpp-2', '보통', 'endl과 ''\n''의 차이로 올바른 것은?', 'cout << "줄1" << endl;   // A
cout << "줄2" << "\n";  // B', ARRAY['"A는 줄을 바꾸고, B는 줄을 바꾸지 않는다"', '"A는 줄바꿈 + 버퍼 flush, B는 줄바꿈만 한다"', '"A와 B는 완전히 동일하다"', '"B는 컴파일 오류가 발생한다"'], 1, 'endl은 줄바꿈(\n)을 출력하고 추가로 출력 버퍼를 강제로 비웁니다(flush). ''\n''은 줄바꿈만 합니다. 버퍼 flush는 시간이 걸리므로 대량 출력에서는 ''\n''이 더 빠릅니다.', 'endl vs \n 차이', 'endl = ''\n'' + 버퍼 flush. ''\n''은 줄바꿈만 합니다. 실시간으로 출력이 필요한 경우(디버깅 등)엔 endl, 성능이 중요할 땐 ''\n''을 사용합니다.', ARRAY['"endl"', '"\n"', '"버퍼 flush"', '"성능"'], NULL, NULL),
(10618, 'cpp', 'cpp-2', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    bool flag = true;
    cout << flag << endl;
    return 0;
}', ARRAY['"true"', '"1"', '"false"', '"0"'], 1, 'C++에서 cout으로 bool 값을 출력하면 true는 1, false는 0으로 출력됩니다. ''true''/''false'' 문자열로 출력하려면 cout << boolalpha << flag를 사용해야 합니다.', 'bool 출력 결과', 'cout << bool변수는 true → 1, false → 0을 출력합니다. ''true''/''false'' 문자열로 보려면 cout << boolalpha << 변수를 사용합니다.', ARRAY['"bool"', '"cout"', '"boolalpha"'], NULL, NULL),
(10619, 'cpp', 'cpp-2', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    cout << "A\tB\tC" << endl;
    return 0;
}', ARRAY['"A\tB\tC"', '"ABC"', '"A B C"', '"A	B	C"'], 3, '''\t''는 탭(tab) 문자입니다. 실제 출력 시 탭만큼 공간이 생겨 열을 맞출 수 있습니다. A, B, C 사이에 탭 간격이 생깁니다.', '탭 이스케이프 \t', '''\t''는 탭 문자로, 일정 간격(보통 4~8칸)을 띄웁니다. 표 형태로 데이터를 출력할 때 유용합니다.', ARRAY['"\t"', '"이스케이프 문자"', '"cout"'], NULL, NULL),
(10620, 'cpp', 'cpp-2', '보통', '다음 중 std::cout을 std:: 없이 cout으로만 쓸 수 있는 경우는?', '#include <iostream>
// ???

int main() {
    cout << "Hello";
    return 0;
}', ARRAY['"#include <namespace>를 추가한 경우"', '"using namespace std;를 추가한 경우"', '"using std;를 추가한 경우"', '"namespace std {};를 추가한 경우"'], 1, 'using namespace std;를 선언하면 std:: 접두사 없이 cout, cin, endl 등을 사용할 수 있습니다. 이 선언이 없으면 반드시 std::cout처럼 써야 합니다.', 'using namespace std', 'using namespace std; 선언으로 std:: 접두사를 생략할 수 있습니다. 단, 대규모 프로젝트에서는 이름 충돌 위험이 있어 std::를 직접 쓰는 것이 권장됩니다.', ARRAY['"using namespace std"', '"std::"', '"namespace"'], NULL, NULL),
(10621, 'cpp', 'cpp-2', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int x = 10;
    cout << x++ << " " << x << endl;
    return 0;
}', ARRAY['"10 11"', '"11 11"', '"10 10"', '"11 10"'], 0, 'x++는 후위 증가 연산자입니다. cout << x++는 현재 값(10)을 출력한 후 x를 11로 증가시킵니다. 이후 x는 11이므로 ''10 11''이 출력됩니다.', '후위 증가와 cout', 'x++는 표현식에서 현재 값을 사용한 뒤 증가합니다. ++x는 먼저 증가한 뒤 값을 사용합니다. cout << x++는 x의 원래 값을 출력 후 증가시킵니다.', ARRAY['"후위 증가"', '"++연산자"', '"cout"'], NULL, NULL),
(10622, 'cpp', 'cpp-2', '어려움', '다음 코드에서 컴파일 오류가 발생하는 이유는?', '#include <iostream>

int main() {
    cout << "Hello" << endl;
    return 0;
}', ARRAY['"endl 대신 ''\n''을 써야 한다"', '"using namespace std; 또는 std::cout이 없어서"', '"#include <string>이 없어서"', '"main 함수 반환형이 잘못됐다"'], 1, 'using namespace std; 없이 cout을 사용하면 컴파일 오류가 발생합니다. cout은 std 네임스페이스에 속하므로, std::cout으로 쓰거나 using namespace std;를 선언해야 합니다.', 'std 네임스페이스 필수', 'cout, cin, endl은 모두 std 네임스페이스에 속합니다. using namespace std; 없이는 반드시 std::cout, std::cin, std::endl처럼 접두사를 붙여야 합니다.', ARRAY['"namespace"', '"std::"', '"컴파일 오류"', '"using namespace std"'], NULL, NULL),
(10623, 'cpp', 'cpp-15', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, string> p = {1, "hello"};
    cout << p.first << " " << p.second;
    return 0;
}', ARRAY['"1 hello"', '"hello 1"', '"first second"', '"컴파일 오류"'], 0, 'pair에서 .first는 첫 번째 값(1), .second는 두 번째 값("hello")에 접근합니다. 선언 시 {1, "hello"}처럼 중괄호로 초기화할 수 있습니다.', 'pair 선언과 접근', 'pair<타입1, 타입2> p = {값1, 값2};로 선언합니다. p.first로 첫 번째 값, p.second로 두 번째 값에 접근합니다.', ARRAY['"pair"', '".first"', '".second"', '"<utility>"'], NULL, NULL),
(10624, 'cpp', 'cpp-15', '쉬움', 'make_pair()를 사용한 pair 생성으로 올바른 것은?', '#include <iostream>
#include <utility>
using namespace std;

int main() {
    auto p = make_pair(10, 3.14);
    cout << p.first << " " << p.second;
    return 0;
}', ARRAY['"10 3.14"', '"3.14 10"', '"10 3"', '"컴파일 오류"'], 0, 'make_pair(10, 3.14)는 pair<int, double>을 자동으로 생성합니다. auto를 사용하면 타입을 직접 명시하지 않아도 됩니다.', 'make_pair() 사용', 'make_pair(값1, 값2)는 타입을 자동 추론하여 pair를 생성합니다. auto p = make_pair(a, b)처럼 간편하게 쓸 수 있습니다.', ARRAY['"make_pair"', '"auto"', '"pair"'], NULL, NULL),
(10625, 'cpp', 'cpp-15', '쉬움', 'vector<pair<int,int>>에 값을 추가하는 올바른 코드는?', '#include <vector>
#include <utility>
using namespace std;

int main() {
    vector<pair<int,int>> v;
    v.push_back({3, 5});
    v.push_back(make_pair(1, 2));
    return 0;
}', ARRAY['"위 코드 모두 올바르다"', '"push_back({3, 5})만 올바르다"', '"push_back(make_pair(1, 2))만 올바르다"', '"pair를 vector에 담을 수 없다"'], 0, '{3, 5}와 make_pair(1, 2) 두 방법 모두 vector<pair<int,int>>에 추가할 수 있습니다. 중괄호 초기화가 더 간결합니다.', 'vector에 pair 추가', 'vector<pair<int,int>> v;에 v.push_back({a, b}) 또는 v.push_back(make_pair(a, b))로 추가합니다. 두 방법 모두 유효합니다.', ARRAY['"vector"', '"pair"', '"push_back"', '"make_pair"'], NULL, NULL),
(10626, 'cpp', 'cpp-15', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {1, "hi", 3.14};
    cout << get<0>(t) << endl;
    return 0;
}', ARRAY['"1"', '"hi"', '"3.14"', '"0"'], 0, 'get<0>(t)는 tuple의 첫 번째 요소(인덱스 0)를 반환합니다. 인덱스는 0부터 시작합니다. 따라서 결과는 1입니다.', 'tuple get<인덱스>', 'tuple의 요소는 get<N>(t)로 접근합니다. N은 0부터 시작하는 인덱스입니다. get<0>은 첫 번째, get<1>은 두 번째 요소입니다.', ARRAY['"tuple"', '"get"', '"<tuple>"'], NULL, NULL),
(10627, 'cpp', 'cpp-15', '보통', 'pair 비교에 대한 설명으로 올바른 것은?', '#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int,int> a = {1, 5};
    pair<int,int> b = {1, 3};
    cout << (a > b ? "a가 크다" : "b가 크거나 같다") << endl;
    return 0;
}', ARRAY['"a가 크다"', '"b가 크거나 같다"', '"컴파일 오류"', '"항상 같다"'], 0, 'pair 비교는 first를 먼저 비교합니다. a.first == b.first(둘 다 1)이므로 second를 비교합니다. a.second(5) > b.second(3)이므로 a가 더 큽니다.', 'pair 비교 규칙', 'pair는 first 기준으로 먼저 비교하고, first가 같으면 second를 비교합니다. 이를 사전식(lexicographic) 비교라고 합니다.', ARRAY['"pair"', '"비교 연산자"', '"사전식 비교"'], NULL, NULL),
(10628, 'cpp', 'cpp-23', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{2,3},{1,5},{2,1}};
    sort(v.begin(), v.end());
    cout << v[0].first << " " << v[0].second << endl;
    return 0;
}', ARRAY['"1 5"', '"2 3"', '"2 1"', '"1 3"'], 0, 'pair 정렬은 first 기준 오름차순, first가 같으면 second 기준 오름차순입니다. {1,5}의 first가 1로 가장 작아 첫 번째가 됩니다.', 'pair vector 정렬', 'vector<pair>를 sort()하면 first 기준 오름차순으로 정렬됩니다. first가 같은 경우 second 기준으로 정렬합니다. 다중 기준 정렬에 자주 활용됩니다.', ARRAY['"pair"', '"sort"', '"vector"', '"정렬"'], NULL, NULL),
(10629, 'cpp', 'cpp-15', '보통', 'C++17 구조적 바인딩으로 pair를 분해하는 올바른 코드는?', '#include <iostream>
#include <utility>
using namespace std;

int main() {
    pair<int, string> p = {42, "answer"};
    auto [num, word] = p;
    cout << num << " " << word << endl;
    return 0;
}', ARRAY['"42 answer"', '"answer 42"', '"num word"', '"컴파일 오류"'], 0, 'auto [num, word] = p;는 C++17 구조적 바인딩(structured binding)입니다. pair의 first를 num, second를 word에 자동으로 대입합니다.', '구조적 바인딩 (C++17)', 'auto [a, b] = pair;처럼 구조적 바인딩을 사용하면 pair나 tuple을 간편하게 분해할 수 있습니다. C++17 이상에서 지원됩니다.', ARRAY['"structured binding"', '"auto"', '"C++17"', '"pair"'], NULL, NULL),
(10630, 'cpp', 'cpp-15', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <tuple>
using namespace std;

int main() {
    tuple<int, string, double> t = {10, "world", 2.5};
    auto [a, b, c] = t;
    cout << b << " " << c * a << endl;
    return 0;
}', ARRAY['"world 25"', '"world 2.5"', '"10 world"', '"컴파일 오류"'], 0, '구조적 바인딩으로 t를 분해하면 a=10, b="world", c=2.5가 됩니다. b는 "world", c * a는 2.5 * 10 = 25.0이지만 정수로 표시되어 "world 25"가 출력됩니다.', 'tuple 구조적 바인딩', 'auto [a, b, c] = tuple;로 tuple을 여러 변수로 한번에 분해할 수 있습니다. 요소 수와 변수 수가 일치해야 합니다.', ARRAY['"tuple"', '"structured binding"', '"auto"', '"C++17"'], NULL, NULL),
(10631, 'cpp', 'cpp-23', '어려움', '다음 코드에서 pair<int,int> 비교를 통한 정렬 결과로 v[1]은?', '#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<pair<int,int>> v = {{3,1},{1,4},{1,2},{2,5}};
    sort(v.begin(), v.end());
    cout << v[1].first << " " << v[1].second;
    return 0;
}', ARRAY['"1 2"', '"1 4"', '"3 1"', '"2 5"'], 1, '정렬 결과는 {1,2}, {1,4}, {2,5}, {3,1}입니다. first=1인 {1,4}와 {1,2}를 비교하면 second 2 < 4이므로 {1,2}가 앞에 옵니다. 따라서 v[0]={1,2}, v[1]={1,4}이므로 출력은 ''1 4''입니다.', 'pair 정렬 세부 동작', 'pair 정렬: first 오름차순 → first 같으면 second 오름차순. {1,2}, {1,4}, {2,5}, {3,1} 순서로 정렬됩니다.', ARRAY['"pair"', '"sort"', '"사전식 비교"'], NULL, NULL),
(10685, 'cpp', 'cpp-3', '쉬움', 'auto 키워드를 사용할 때 컴파일러가 타입을 결정하는 시점은?', 'auto x = 42;
auto y = 3.14;
auto z = "hello";', ARRAY['"컴파일 타임 — 초기값을 보고 타입을 추론"', '"런타임 — 실행 중에 타입이 결정됨"', '"auto는 항상 int 타입"', '"auto는 동적 타입으로 나중에 다른 타입도 저장 가능"'], 0, 'auto는 컴파일 타임에 초기값을 보고 타입을 추론합니다. x=int, y=double, z=const char*. 한번 결정된 타입은 변하지 않습니다.', 'auto — 타입 추론', 'auto x = 42; → x의 타입은 int로 확정됩니다. 컴파일러가 초기값 타입을 보고 자동 결정. 타입 변경은 불가합니다.', ARRAY['"auto"', '"타입 추론"', '"컴파일 타임"'], NULL, NULL),
(10686, 'cpp', 'cpp-3', '쉬움', '다음 코드에서 컴파일 오류가 발생하는 줄은?', 'const int MAX = 100;  // (A)
int x = MAX;          // (B)
MAX = 200;            // (C)
cout << MAX;          // (D)', ARRAY['"(C) — const 변수는 값 변경 불가"', '"(A) — const 선언 시 초기화 불필요"', '"(B) — const 변수를 다른 변수에 대입 불가"', '"(D) — const 변수 출력 불가"'], 0, 'const 변수는 선언 후 값을 변경할 수 없습니다. MAX = 200은 컴파일 오류입니다. const int를 다른 변수에 대입(B)하거나 출력(D)하는 것은 허용됩니다.', 'const — 상수 변수', 'const 변수는 선언 시 초기화 필수, 이후 변경 불가. 마법의 숫자 대신 이름 있는 상수로 사용합니다.', ARRAY['"const"', '"상수"', '"컴파일 오류"'], NULL, NULL),
(10687, 'cpp', 'cpp-3', '쉬움', '다음 코드의 출력 결과는?', 'bool a = true;
bool b = false;
cout << a << " " << b;', ARRAY['"1 0"', '"true false"', '"1 1"', '"0 1"'], 0, 'bool을 cout으로 출력하면 true→1, false→0으로 출력됩니다. ''true/false'' 문자열로 출력하려면 cout << boolalpha를 사용해야 합니다.', 'bool 출력 — 1과 0', 'bool 기본 출력: true=1, false=0. cout << boolalpha를 설정하면 ''true''/''false'' 문자열로 출력됩니다.', ARRAY['"bool"', '"true"', '"false"', '"cout"'], NULL, NULL),
(10688, 'cpp', 'cpp-3', '보통', '다음 코드의 출력 결과는? (정수 나눗셈 주의)', 'int a = 7, b = 2;
double result = a / b;
cout << result;', ARRAY['"3"', '"3.5"', '"3.0"', '"3.50"'], 0, 'a/b는 두 피연산자가 모두 int이므로 정수 나눗셈 → 소수점 버림 → 3. 그 결과(3)를 double에 저장해도 이미 3입니다. 3.5를 얻으려면 (double)a/b 또는 a/2.0을 사용해야 합니다.', '정수 나눗셈 — 소수점 버림', 'int / int = int (나머지 버림). 7/2 = 3. 실수 나눗셈: (double)a / b 또는 a / 2.0.', ARRAY['"정수 나눗셈"', '"/"', '"int"', '"double"'], NULL, NULL),
(10689, 'cpp', 'cpp-3', '보통', '다음 코드의 출력 결과는?', 'double x = 3.9;
int n = (int)x;
cout << n;', ARRAY['"3"', '"4"', '"3.9"', '"컴파일 오류"'], 0, '(int)x는 C 스타일 명시적 형변환(캐스팅)입니다. double → int 변환 시 소수점 이하를 버립니다(반올림 아님). 3.9 → 3.', '명시적 형변환 — 소수 버림', '(int)double: 소수점 이하 버림(truncation). 반올림이 아닙니다. 3.9 → 3, 2.1 → 2.', ARRAY['"형변환"', '"casting"', '"(int)"', '"double to int"'], NULL, NULL),
(10690, 'cpp', 'cpp-3', '보통', '다음 중 auto를 사용한 코드에서 타입 추론이 올바른 것은?', 'auto a = 5;        // (A) int
auto b = 5.0;      // (B) double
auto c = ''5'';      // (C) char
auto d = true;     // (D) bool', ARRAY['"모두 올바름: a=int, b=double, c=char, d=bool"', '"auto는 모두 int로 추론"', '"c는 int로 추론됨"', '"d는 int로 추론됨"'], 0, 'auto는 초기값의 타입을 정확히 추론합니다. 5→int, 5.0→double, ''5''→char, true→bool. 모두 올바른 추론입니다.', 'auto 타입 추론 규칙', 'auto 추론: 정수 리터럴→int, 소수점→double, 문자→char, true/false→bool.', ARRAY['"auto"', '"타입 추론"', '"리터럴"'], NULL, NULL),
(10691, 'cpp', 'cpp-3', '보통', '다음 코드에서 result의 타입과 값은?', 'int a = 5;
double b = 2.0;
auto result = a + b;', ARRAY['"double, 7.0 — int와 double 연산 시 double로 자동 변환"', '"int, 7 — a가 int이므로 결과도 int"', '"컴파일 오류 — 다른 타입 연산 불가"', '"float, 7.0f"'], 0, 'int + double 연산 시 int가 double로 자동 변환(암시적 변환)됩니다. 결과 타입은 double, 값은 7.0. auto도 double로 추론합니다.', '암시적 타입 변환', 'int op double → int가 double로 자동 변환. 더 넓은 타입으로 자동 변환됩니다(정밀도 손실 방지).', ARRAY['"암시적 변환"', '"int"', '"double"', '"auto"'], NULL, NULL),
(10692, 'cpp', 'cpp-3', '보통', '다음 코드의 출력 결과는?', 'int x = 5;
double y = x / 2;
double z = x / 2.0;
cout << y << " " << z;', ARRAY['"2 2.5"', '"2.5 2.5"', '"2 2"', '"2.5 2"'], 0, 'y: x/2는 int/int = 2(정수 나눗셈), 이후 double에 저장해도 2.0. z: x/2.0은 int/double → 5.0/2.0 = 2.5.', '정수 vs 실수 나눗셈 비교', '5/2 = 2 (정수 버림). 5/2.0 = 2.5 (실수 나눗셈). 피연산자 중 하나라도 double이면 실수 나눗셈 수행.', ARRAY['"정수 나눗셈"', '"/"', '"double"', '"형변환"'], NULL, NULL),
(10693, 'cpp', 'cpp-3', '어려움', '다음 코드에서 컴파일 오류가 발생하지 않는 것은?', 'const int A = 10;
int B = 20;

// 아래 중 올바른 것은?
// (1) A = 30;
// (2) const int C = B;
// (3) B = A;
// (4) const int D; // 초기화 없음', ARRAY['"(2)와 (3) — const는 다른 변수로 초기화 가능, non-const에 대입도 가능"', '"(1) — const는 초기화 후 변경 가능"', '"(4) — const는 초기화 없어도 됨"', '"(1)과 (4) 모두 가능"'], 0, '(2) const int C = B: B의 현재 값으로 C를 초기화. 가능. (3) B = A: const A의 값을 non-const B에 복사. 가능. (1) A=30: const 변경 불가. (4) const 초기화 누락: 컴파일 오류.', 'const 규칙 — 초기화와 대입', 'const: 선언 시 초기화 필수, 이후 변경 불가. 단, const 값을 non-const 변수에 ''읽어서 복사''하는 것은 허용됩니다.', ARRAY['"const"', '"초기화"', '"대입"', '"컴파일 오류"'], NULL, NULL),
(10694, 'cpp', 'cpp-3', '어려움', '다음 중 static_cast를 사용한 올바른 형변환은?', 'double d = 9.7;
int i = 3;

// 옵션들:
// (A) int n = static_cast<int>(d);
// (B) double x = static_cast<double>(i) / 2;
// (C) int m = static_cast<double>(i);
// (D) string s = static_cast<string>(i);', ARRAY['"(A)와 (B) 모두 올바름"', '"(A)만 올바름"', '"(C)와 (D) 모두 올바름"', '"(B)만 올바름"'], 0, '(A) double→int 변환: 허용, n=9. (B) int→double 후 나눗셈: 실수 나눗셈 수행, x=1.5. (C) double→int 대입은 암시적 변환으로 처리되어 컴파일 경고. (D) int→string은 static_cast로 불가 — 컴파일 오류.', 'static_cast — C++ 스타일 형변환', 'static_cast<타입>(값): C++ 권장 형변환 방식. 숫자 타입 간 변환에 사용. int→string 같은 의미없는 변환은 컴파일 오류.', ARRAY['"static_cast"', '"형변환"', '"double"', '"int"'], NULL, NULL),
(10674, 'cpp', 'cpp-12', '쉬움', 'int& ref = x;에서 ref는 무엇인가?', 'int x = 10;
int& ref = x;
ref = 20;
cout << x;', ARRAY['"x의 별명(alias) — ref를 바꾸면 x도 바뀜"', '"x의 복사본 — ref를 바꿔도 x는 변화 없음"', '"x의 주소를 담는 포인터"', '"int를 담는 새 변수"'], 0, '참조(reference)는 변수의 별명입니다. ref = 20은 x = 20과 완전히 동일합니다. 출력: 20.', '참조(Reference) — 별명', 'int& ref = x; — ref는 x의 별명. ref를 통한 모든 변경이 x에 즉시 반영됩니다.', ARRAY['"reference"', '"&"', '"별명"'], NULL, NULL),
(10675, 'cpp', 'cpp-12', '쉬움', '다음 코드의 출력 결과는?', 'int a = 5;
int& r = a;
r += 10;
cout << a << " " << r;', ARRAY['"15 15"', '"5 15"', '"5 5"', '"15 5"'], 0, 'r은 a의 참조입니다. r += 10은 a에 10을 더합니다. a와 r은 같은 메모리를 가리키므로 둘 다 15를 출력합니다.', '참조 수정 — 원본 변경', '참조를 통한 변경은 원본에 직접 영향을 줍니다. a와 r은 항상 같은 값을 가집니다.', ARRAY['"reference"', '"+="', '"별명"'], NULL, NULL),
(10676, 'cpp', 'cpp-12', '쉬움', '두 변수를 교환하는 swap 함수에서 &가 필요한 이유는?', 'void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x=3, y=7;
swap(x, y);
cout << x << " " << y;', ARRAY['"&가 없으면 복사본이 교환되어 원본 x, y는 변화 없음"', '"&가 있으면 함수가 더 빠름"', '"&가 없으면 컴파일 오류 발생"', '"&는 주소를 더하는 연산자"'], 0, '&를 쓰면 인자가 참조로 전달됩니다. swap 내부에서 a,b는 x,y의 별명이므로 교환이 원본에 반영됩니다. 출력: 7 3.', '참조에 의한 전달 (Pass by Reference)', '함수 매개변수에 &를 붙이면 참조로 전달됩니다. 함수 내 변경이 호출한 쪽 변수에 반영됩니다.', ARRAY['"reference"', '"pass by reference"', '"swap"'], NULL, NULL),
(10677, 'cpp', 'cpp-12', '쉬움', '다음 두 함수의 차이로 올바른 것은?', 'void f1(int x)  { x = 100; }
void f2(int& x) { x = 100; }

int a = 5;
f1(a); // a는?
f2(a); // a는?', ARRAY['"f1 후 a=5, f2 후 a=100"', '"f1 후 a=100, f2 후 a=5"', '"f1과 f2 모두 a=100"', '"f1과 f2 모두 a=5"'], 0, 'f1은 값으로 전달(복사). f1 내부 x 변경은 a에 영향 없음. f2는 참조로 전달. f2 내부 x=100이 a를 직접 변경합니다.', '값 전달 vs 참조 전달', 'void f(int x): 복사본 사용 → 원본 불변. void f(int& x): 참조 사용 → 원본 변경.', ARRAY['"pass by value"', '"pass by reference"', '"&"'], NULL, NULL),
(10678, 'cpp', 'cpp-12', '보통', '다음 코드에서 double 함수 호출 후 n의 값은?', 'void doubleVal(int& n) {
    n = n * 2;
}

int n = 7;
doubleVal(n);
cout << n;', ARRAY['"14"', '"7"', '"49"', '"컴파일 오류"'], 0, 'n이 참조로 전달됩니다. 함수 내부에서 n = n * 2는 원본 n을 7→14로 변경합니다.', '참조 매개변수로 값 수정', '참조 매개변수를 통해 함수가 호출자의 변수를 직접 수정할 수 있습니다.', ARRAY['"pass by reference"', '"함수"', '"수정"'], NULL, NULL),
(10679, 'cpp', 'cpp-12', '보통', '범위 기반 for에서 &를 쓰지 않으면 어떤 문제가 생기는가?', 'vector<int> v = {1, 2, 3, 4, 5};
for (int x : v) {
    x *= 2;  // v의 원소 변경 시도
}
cout << v[0];', ARRAY['"v[0]은 1 (x가 복사본이라 v는 변하지 않음)"', '"v[0]은 2 (x가 v[0]의 참조라 변경됨)"', '"컴파일 오류"', '"v[0]은 0"'], 0, 'for(int x : v)에서 x는 각 원소의 복사본입니다. x를 변경해도 v의 원소는 변하지 않습니다. v를 수정하려면 for(int& x : v)를 사용해야 합니다.', '범위 for — & 없으면 복사', 'for(int x : v): 복사 → v 불변. for(int& x : v): 참조 → v 변경 가능. 대형 객체는 성능상 const& 권장.', ARRAY['"range-based for"', '"&"', '"copy vs reference"'], NULL, NULL),
(10680, 'cpp', 'cpp-12', '보통', 'const 참조 매개변수를 사용하는 이유로 올바른 것은?', 'void printInfo(const string& s) {
    cout << s;
}

string name = "Alice";
printInfo(name);', ARRAY['"복사 없이 전달하되 함수 내 수정을 금지"', '"함수에서 s를 수정할 수 있게 허용"', '"s를 전역 변수로 만들기 위해"', '"string을 int로 변환하기 위해"'], 0, 'const&는 ''읽기 전용 참조''입니다. 복사 없이(효율적으로) 전달하되 함수 내부에서 원본을 수정하는 것을 금지합니다. 대형 객체(string, vector 등)에 권장됩니다.', 'const 참조 — 읽기 전용 전달', 'const T& 매개변수: 복사 비용 없음 + 원본 수정 불가. 읽기만 하는 함수에 가장 적합합니다.', ARRAY['"const reference"', '"const&"', '"성능"'], NULL, NULL),
(10681, 'cpp', 'cpp-12', '보통', '벡터의 모든 원소에 1을 더하려 한다. 올바른 코드는?', 'vector<int> v = {1, 2, 3};
for (/* 빈칸 */ : v) {
    x += 1;
}', ARRAY['"int& x"', '"int x"', '"const int& x"', '"int* x"'], 0, '원소를 수정하려면 참조(int&)를 사용해야 합니다. int x는 복사본이라 v를 변경하지 않고, const int&는 수정이 불가합니다.', '범위 for로 원소 수정', '벡터 원소 수정: for(int& x : v) { x 수정; }. 수정 안 할 때: for(int x : v) 또는 for(const int& x : v).', ARRAY['"range-based for"', '"int&"', '"원소 수정"'], NULL, NULL),
(10682, 'cpp', 'cpp-12', '보통', '다음 코드에서 add 함수 호출 후 result 값은?', 'void add(int a, int b, int& result) {
    result = a + b;
}

int res = 0;
add(3, 4, res);
cout << res;', ARRAY['"7"', '"0"', '"3"', '"컴파일 오류"'], 0, 'result는 res의 참조입니다. 함수 내부에서 result = a+b = 7로 설정하면 res가 7로 변경됩니다. 반환값 없이 여러 값을 ''반환''하는 패턴입니다.', '출력 매개변수 패턴', '참조 매개변수로 함수의 ''결과값''을 여러 개 반환할 수 있습니다. void 함수에서 결과를 전달하는 일반적인 패턴입니다.', ARRAY['"pass by reference"', '"출력 매개변수"', '"void 함수"'], NULL, NULL),
(10683, 'cpp', 'cpp-12', '어려움', '다음 코드에서 함수 호출 후 a와 b의 값은?', 'void process(int& x, int& y) {
    x += y;
    y = x - y;
    x = x - y;
}

int a=3, b=7;
process(a, b);
cout << a << " " << b;', ARRAY['"7 3"', '"3 7"', '"10 3"', '"7 10"'], 0, '초기: x=3, y=7. x += y: x=10. y = x-y = 10-7=3. x = x-y = 10-3=7. a=7, b=3. 참조를 이용한 swap 변형 알고리즘입니다.', '참조를 이용한 변수 교환', '덧셈/뺄셈으로 임시 변수 없이 swap: x+=y; y=x-y; x=x-y. 참조를 통해 a,b가 직접 수정됩니다.', ARRAY['"pass by reference"', '"swap"', '"수식 트레이싱"'], NULL, NULL),
(10684, 'cpp', 'cpp-12', '어려움', '다음 코드에서 주석 위치의 참조가 문제가 되는 이유는?', 'int& getRef() {
    int local = 10;
    return local;  // ⚠️ 문제 발생
}

int& r = getRef();
cout << r;  // 미정의 동작', ARRAY['"local은 함수 종료 시 소멸 → dangling reference(매달린 참조)"', '"int& 반환 타입이 잘못됨"', '"local이 const가 아니라서"', '"참조는 return할 수 없음"'], 0, 'local은 스택 변수로 getRef() 종료 시 소멸합니다. 소멸된 변수를 가리키는 r은 ''매달린 참조(dangling reference)''가 됩니다. r을 사용하면 미정의 동작(UB)이 발생합니다.', 'Dangling Reference (매달린 참조)', '함수의 지역 변수에 대한 참조를 반환하면 안 됩니다. 함수 종료 후 지역 변수는 소멸되어 참조가 무효가 됩니다.', ARRAY['"dangling reference"', '"지역 변수"', '"수명"', '"UB"'], NULL, NULL),
(10647, 'cpp', 'cpp-7', '쉬움', '1부터 10까지 홀수만 출력하려 한다. 빈칸에 들어갈 코드는?', 'for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) /* 빈칸 */;
    cout << i << " ";
}', ARRAY['"continue"', '"break"', '"return"', '"skip"'], 0, 'continue는 현재 반복을 건너뛰고 다음 반복으로 이동합니다. i가 짝수이면 continue로 cout을 건너뛰어 홀수만 출력됩니다.', 'continue — 반복 건너뛰기', 'continue: 현재 반복의 남은 코드를 건너뛰고 다음 반복으로 진행. break: 루프 자체를 종료.', ARRAY['"continue"', '"for loop"', '"% 나머지"'], NULL, NULL),
(10648, 'cpp', 'cpp-7', '쉬움', '다음 코드에서 while 루프가 무한 루프가 되는 이유는?', 'int i = 0;
while (i < 5) {
    cout << i;
    // i++ 빠짐
}', ARRAY['"i가 증가하지 않아서 조건이 항상 참"', '"while 조건에 등호(=)가 없어서"', '"cout이 있으면 루프가 멈추지 않아서"', '"int 타입이라서"'], 0, 'i++이 없으면 i는 계속 0이므로 i < 5가 항상 참입니다. 루프 변수가 업데이트되지 않으면 무한 루프가 됩니다.', 'while 루프 변수 업데이트', 'while 루프에서 반드시 루프 변수(또는 탈출 조건)를 업데이트해야 합니다. 그렇지 않으면 무한 루프 발생.', ARRAY['"while"', '"무한 루프"', '"루프 변수"'], NULL, NULL),
(10649, 'cpp', 'cpp-7', '쉬움', '다음 코드의 실행 후 sum 값은?', 'int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
cout << sum;', ARRAY['"15"', '"10"', '"14"', '"5"'], 0, 'sum = 0+1+2+3+4+5 = 15. for 루프로 1부터 n까지 합계를 구하는 기본 패턴입니다.', 'for 루프 누적 합계', '누적 합계 패턴: int sum = 0; for(int i=1; i<=n; i++) sum += i; 결과: n*(n+1)/2.', ARRAY['"for loop"', '"누적"', '"sum"'], NULL, NULL),
(10650, 'cpp', 'cpp-7', '쉬움', '다음 코드의 출력 결과는?', 'for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}', ARRAY['"5 4 3 2 1"', '"1 2 3 4 5"', '"5 4 3 2 1 0"', '"컴파일 오류"'], 0, 'i=5에서 시작해 i--로 감소, i >= 1인 동안 반복합니다. 출력: 5 4 3 2 1.', 'for 역순 반복', '역순 반복: for(int i=n; i>=1; i--). 감소 연산자 i--와 종료 조건 i>=1에 주의하세요.', ARRAY['"for loop"', '"역순"', '"i--"'], NULL, NULL),
(10651, 'cpp', 'cpp-7', '쉬움', '배열에서 값 7을 발견하면 즉시 중단하고 인덱스를 출력하는 코드에서 빈칸은?', 'int arr[] = {3, 1, 7, 4, 9};
for (int i = 0; i < 5; i++) {
    if (arr[i] == 7) {
        cout << i;
        /* 빈칸 */;
    }
}', ARRAY['"break"', '"continue"', '"return"', '"stop"'], 0, 'break는 현재 루프를 즉시 종료합니다. 원하는 값을 찾으면 break로 더 이상 탐색하지 않습니다. 출력: 2 (인덱스 2에 7이 있음).', 'break — 루프 즉시 종료', 'break: 루프를 즉시 탈출. 특정 조건 만족 시 탐색을 중단할 때 사용합니다.', ARRAY['"break"', '"for loop"', '"선형 탐색"'], NULL, NULL),
(10652, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는?', 'for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;
        cout << i << j << " ";
    }
}', ARRAY['"00 10 20"', '"00 01 02 10 11 12 20 21 22"', '"00 01 10 11 20 21"', '"00 10"'], 0, 'j==1일 때 내부 루프 break. 각 i 반복에서 j=0만 실행됩니다. 출력: 00 10 20. break는 가장 안쪽 루프만 종료합니다.', '중첩 루프에서 break', 'break는 자신이 속한 가장 안쪽 루프만 종료합니다. 바깥 루프는 계속 실행됩니다.', ARRAY['"break"', '"중첩 for loop"', '"nested loop"'], NULL, NULL),
(10653, 'cpp', 'cpp-7', '보통', '다음 코드의 출력 결과는? (3의 배수는 건너뜀)', 'for (int i = 1; i <= 7; i++) {
    if (i % 3 == 0) continue;
    cout << i << " ";
}', ARRAY['"1 2 4 5 7"', '"1 2 3 4 5 6 7"', '"3 6"', '"1 2 4 5 6 7"'], 0, '3의 배수(3, 6)는 continue로 건너뜁니다. 나머지 1, 2, 4, 5, 7이 출력됩니다.', 'continue로 특정 값 건너뛰기', 'continue: 3의 배수처럼 특정 조건의 반복을 건너뛸 때 사용. 루프 자체는 종료되지 않습니다.', ARRAY['"continue"', '"% 나머지"', '"for loop"'], NULL, NULL),
(10654, 'cpp', 'cpp-7', '보통', '다음 중첩 루프의 출력 결과는?', 'for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        cout << "*";
    }
    cout << "\n";
}', ARRAY['"*
**
***"', '"***
***
***"', '"*
*
*"', '"***
**
*"'], 0, 'i=1: j=1 → ''*'', i=2: j=1,2 → ''**'', i=3: j=1,2,3 → ''***''. 각 행 끝에 줄바꿈. 삼각형 패턴 출력.', '중첩 루프 — 삼각형 패턴', 'for(i=1..n) { for(j=1..i) { ... } } 패턴은 행마다 반복 횟수가 증가하는 삼각형 모양을 만듭니다.', ARRAY['"중첩 for loop"', '"패턴 출력"', '"\n"'], NULL, NULL),
(10655, 'cpp', 'cpp-7', '보통', '다음 코드가 출력하는 줄의 수는?', 'int count = 0;
for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
        if (i == j) continue;
        count++;
    }
}
cout << count;', ARRAY['"12"', '"16"', '"8"', '"4"'], 0, '4×4 = 16번 반복에서 i==j인 경우(0,0),(1,1),(2,2),(3,3) 4번이 continue로 건너뜁니다. 16 - 4 = 12.', '중첩 루프 + continue 카운팅', '전체 반복 횟수에서 continue로 건너뛰는 횟수를 빼면 실제 실행 횟수를 계산할 수 있습니다.', ARRAY['"continue"', '"중첩 for loop"', '"카운팅"'], NULL, NULL),
(10656, 'cpp', 'cpp-7', '보통', '배열 arr[5]의 모든 요소를 출력하는 코드에서 올바른 것은?', 'int arr[5] = {1, 2, 3, 4, 5};
// 아래 중 올바른 코드는?', ARRAY['"for (int i = 0; i < 5; i++) cout << arr[i];"', '"for (int i = 0; i <= 5; i++) cout << arr[i];"', '"for (int i = 1; i <= 5; i++) cout << arr[i];"', '"for (int i = 1; i < 5; i++) cout << arr[i];"'], 0, '배열 인덱스는 0~4입니다. i < 5 (0,1,2,3,4)가 정확합니다. i <= 5는 arr[5]에 접근해 범위 초과 오류, i=1 시작은 arr[0]을 건너뜁니다.', '배열 인덱스 범위 — off-by-one', '크기 N인 배열: 인덱스 0~N-1. 반복 조건: i < N (i<=N이면 범위 초과!). 이 off-by-one 오류는 매우 흔한 버그입니다.', ARRAY['"for loop"', '"배열 인덱스"', '"off-by-one"', '"범위 초과"'], NULL, NULL),
(10657, 'cpp', 'cpp-7', '어려움', '다음 코드는 1~N에서 합이 10 이하인 쌍 (i,j)의 수를 셉니다. N=5일 때 출력 결과는?', 'int N = 5, count = 0;
for (int i = 1; i <= N; i++) {
    for (int j = i; j <= N; j++) {
        if (i + j <= 10) count++;
    }
}
cout << count;', ARRAY['"14"', '"15"', '"10"', '"25"'], 1, 'j는 i부터 시작해 중복 쌍을 방지합니다. N=5일 때: i=1→j=1~5(5쌍), i=2→j=2~5(4쌍), i=3→j=3~5(3쌍), i=4→j=4~5(2쌍), i=5→j=5(1쌍). 모든 합이 ≤10이므로 5+4+3+2+1 = 15.', '중첩 루프 — 쌍 세기 패턴', 'j=i부터 시작하면 (i,j)와 (j,i) 중복을 방지합니다. USACO에서 쌍 카운팅에 자주 사용되는 패턴입니다.', ARRAY['"중첩 for loop"', '"쌍 카운팅"', '"USACO"'], NULL, NULL),
(10658, 'cpp', 'cpp-21', '어려움', 'N×M 격자 각 행의 합을 출력하는 코드에서 빈칸에 들어갈 알맞은 코드는?', 'int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int N=3, M=3;
for (int i = 0; i < N; i++) {
    int rowSum = 0;
    /* 빈칸 */
    cout << rowSum << "\n";
}', ARRAY['"for (int j = 0; j < M; j++) rowSum += grid[i][j];"', '"for (int j = 0; j < M; j++) rowSum += grid[j][i];"', '"rowSum = grid[i][0] + grid[i][M];"', '"for (int j = 1; j <= M; j++) rowSum += grid[i][j];"'], 0, '행 합계: 같은 i, j를 0~M-1까지 순회. grid[i][j]가 올바른 접근입니다. grid[j][i]는 열 합계, grid[i][M]은 범위 초과.', '2D 배열 행 순회', '2D 배열 행 합계: for(j=0..M-1) sum += grid[i][j]. USACO 격자 문제의 기본 패턴입니다.', ARRAY['"2D 배열"', '"중첩 for loop"', '"격자"', '"USACO"'], NULL, NULL),
(10659, 'cpp', 'cpp-7', '어려움', '중첩 루프에서 바깥 루프도 탈출하려 할 때 올바른 패턴은? (i*j > 10인 첫 번째 쌍을 출력하고 종료)', '// i*j 값이 10을 넘는 첫 번째 (i,j)를 찾으면 두 루프 종료
bool found = false;
for (int i = 1; i <= 5 && !found; i++) {
    for (int j = 1; j <= 5; j++) {
        if (i * j > 10) {
            cout << i << " " << j;
            /* 빈칸 */
        }
    }
}', ARRAY['"found = true; break;"', '"break; break;"', '"return;"', '"goto end;"'], 0, 'C++에는 이중 break가 없습니다. found=true로 플래그를 세우고 break하면 안쪽 루프를 탈출합니다. 바깥 루프 조건 ''&&!found''가 false가 돼 바깥 루프도 종료됩니다.', '중첩 루프 완전 탈출 — flag 패턴', '이중 break는 없습니다. bool found=false 플래그 + 바깥 루프 조건에 &&!found를 추가하는 패턴을 사용합니다.', ARRAY['"break"', '"중첩 루프 탈출"', '"flag 패턴"', '"USACO"'], NULL, NULL),
(10660, 'cpp', 'cpp-23', '쉬움', '벡터 v = {3, 1, 4, 1, 5}를 오름차순 정렬하는 올바른 코드는?', '#include <algorithm>
vector<int> v = {3, 1, 4, 1, 5};
// 빈칸', ARRAY['"sort(v.begin(), v.end());"', '"sort(v);"', '"v.sort();"', '"std::order(v.begin(), v.end());"'], 0, 'sort()는 <algorithm>에 있으며 반드시 begin()과 end()를 인자로 전달합니다. v.sort()는 없고, sort(v)도 올바르지 않습니다.', 'sort() 기본 사용법', 'sort(v.begin(), v.end()) — 기본 오름차순 정렬. 반복자 범위를 인자로 전달합니다.', ARRAY['"sort"', '"vector"', '"algorithm"'], NULL, NULL),
(10661, 'cpp', 'cpp-23', '쉬움', '다음 코드의 출력 결과는?', 'vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end());
cout << v[0] << " " << v[4];', ARRAY['"1 9"', '"5 9"', '"1 5"', '"9 1"'], 0, '오름차순 정렬 후: {1, 2, 5, 8, 9}. v[0]=1(최솟값), v[4]=9(최댓값).', 'sort 후 인덱스 접근', 'sort 후 v[0]은 최솟값, v[v.size()-1]은 최댓값입니다.', ARRAY['"sort"', '"오름차순"', '"인덱스"'], NULL, NULL),
(10662, 'cpp', 'cpp-23', '쉬움', '벡터를 내림차순으로 정렬하는 올바른 코드는?', 'vector<int> v = {3, 1, 4, 1, 5};
// 내림차순 정렬', ARRAY['"sort(v.begin(), v.end(), greater<int>());"', '"sort(v.end(), v.begin());"', '"sort(v.begin(), v.end(), less<int>());"', '"reverse_sort(v.begin(), v.end());"'], 0, '세 번째 인자로 greater<int>()를 전달하면 내림차순 정렬됩니다. sort(end, begin)은 유효하지 않고, less<int>()는 기본값(오름차순)과 같습니다.', '내림차순 정렬 — greater<T>()', '내림차순: sort(v.begin(), v.end(), greater<int>()). 또는 sort 후 reverse(v.begin(), v.end())도 가능합니다.', ARRAY['"sort"', '"greater"', '"내림차순"'], NULL, NULL),
(10663, 'cpp', 'cpp-23', '쉬움', '문자열 벡터를 사전순(알파벳 순)으로 정렬할 때 올바른 코드는?', 'vector<string> words = {"banana", "apple", "cherry"};
sort(/* 빈칸 */);
cout << words[0];', ARRAY['"words.begin(), words.end()"', '"words.begin(), words.end(), greater<string>()"', '"words.begin(), words.end(), [](string a, string b){ return a.size()<b.size(); }"', '"words.rbegin(), words.rend()"'], 0, 'string도 기본 sort()로 사전순 정렬됩니다. 결과: apple, banana, cherry → words[0] = ''apple''.', 'string 벡터 정렬', 'vector<string>도 sort(v.begin(), v.end())로 사전순 정렬됩니다. string은 기본적으로 알파벳 순 비교를 지원합니다.', ARRAY['"sort"', '"string"', '"사전순"'], NULL, NULL),
(10664, 'cpp', 'cpp-23', '쉬움', '배열 arr[5]를 sort()로 정렬하는 올바른 코드는?', 'int arr[5] = {5, 2, 8, 1, 9};
// 배열 정렬', ARRAY['"sort(arr, arr + 5);"', '"sort(arr.begin(), arr.end());"', '"sort(&arr, &arr + 5);"', '"arr.sort();"'], 0, '배열은 포인터 산술을 사용합니다. arr는 첫 원소 주소, arr+5는 끝 주소. 배열에는 begin()/end() 멤버 함수가 없습니다.', '배열 sort — 포인터 사용', '배열 정렬: sort(arr, arr+N). 벡터와 달리 포인터 산술로 범위를 지정합니다.', ARRAY['"sort"', '"배열"', '"포인터"'], NULL, NULL),
(10665, 'cpp', 'cpp-23', '쉬움', '정렬된 벡터 {1,2,3,4,5}를 역순({5,4,3,2,1})으로 만드는 가장 간단한 방법은?', 'vector<int> v = {1, 2, 3, 4, 5};
// 역순으로 만들기', ARRAY['"reverse(v.begin(), v.end());"', '"sort(v.begin(), v.end(), greater<int>());"', '"sort(v.rbegin(), v.rend());"', '"v.flip();"'], 0, '이미 정렬된 벡터를 역순으로 만들 때는 reverse()가 가장 직접적입니다. sort()도 결과는 같지만 O(n log n)이라 비효율적입니다.', 'reverse() — 순서 뒤집기', 'reverse(v.begin(), v.end()): O(n)으로 벡터를 역순으로 만듭니다. <algorithm>에 있습니다.', ARRAY['"reverse"', '"sort"', '"algorithm"'], NULL, NULL),
(10666, 'cpp', 'cpp-23', '보통', '비교 함수를 직접 작성해 내림차순 정렬하려 한다. 올바른 비교 함수는?', 'vector<int> v = {3, 1, 4, 1, 5};
bool cmp(int a, int b) {
    return /* 빈칸 */;
}
sort(v.begin(), v.end(), cmp);', ARRAY['"a > b"', '"a < b"', '"a >= b"', '"a != b"'], 0, 'sort의 비교 함수는 ''a가 b보다 앞에 와야 하면 true''를 반환합니다. 내림차순은 큰 값이 앞에 오므로 a > b를 반환합니다.', '커스텀 비교 함수', '비교 함수 규칙: return true이면 a가 b보다 앞에 배치됩니다. 오름차순: a<b, 내림차순: a>b.', ARRAY['"sort"', '"comparator"', '"커스텀 정렬"'], NULL, NULL),
(10667, 'cpp', 'cpp-23', '보통', '학생을 성적 내림차순으로 정렬하는 람다로 올바른 것은?', 'struct Student {
    string name;
    int score;
};
vector<Student> students = {{"Alice",85},{"Bob",92},{"Carol",78}};
sort(students.begin(), students.end(), /* 빈칸 */);', ARRAY['"[](const Student& a, const Student& b){ return a.score > b.score; }"', '"[](const Student& a, const Student& b){ return a.score < b.score; }"', '"[](Student a, Student b){ return a.score; }"', '"greater<Student>()"'], 0, '람다로 struct 멤버를 기준으로 정렬합니다. 내림차순이므로 a.score > b.score. const 참조(&)를 사용하면 복사 비용을 줄입니다.', 'struct 람다 정렬', 'sort(v.begin(), v.end(), [](const T& a, const T& b){ return a.field > b.field; }) — struct 멤버 기준 정렬 패턴.', ARRAY['"sort"', '"lambda"', '"struct"', '"커스텀 정렬"'], NULL, NULL),
(10668, 'cpp', 'cpp-23', '보통', 'stable_sort와 sort의 차이로 올바른 것은?', '// 점수가 같은 경우 원래 순서 유지 여부 확인
vector<pair<int,string>> v = {{90,"B"},{80,"A"},{90,"C"},{80,"D"}};
// stable_sort로 점수 내림차순 정렬 시 결과?', ARRAY['"점수 같으면 원래 순서 유지: {90,B},{90,C},{80,A},{80,D}"', '"점수 같으면 이름순 정렬: {90,B},{90,C},{80,A},{80,D}"', '"sort와 동일: 순서 보장 없음"', '"stable_sort는 내림차순 정렬을 지원하지 않음"'], 0, 'stable_sort는 동일한 키를 가진 원소들의 상대적 순서를 유지합니다(안정 정렬). 점수 90인 B와 C는 원래 순서(B→C)를 유지합니다.', 'stable_sort — 안정 정렬', 'stable_sort: 동일 키 원소의 상대 순서 보장(안정). sort: 동일 키 원소의 순서 불보장(불안정). 시간복잡도: stable_sort O(n log² n) vs sort O(n log n).', ARRAY['"stable_sort"', '"sort"', '"안정 정렬"'], NULL, NULL),
(10669, 'cpp', 'cpp-23', '보통', '문자열을 길이 기준 오름차순으로 정렬하는 람다는?', 'vector<string> words = {"banana", "cat", "apple", "hi"};
sort(words.begin(), words.end(), /* 빈칸 */);
cout << words[0];', ARRAY['"[](const string& a, const string& b){ return a.size() < b.size(); }"', '"[](const string& a, const string& b){ return a < b; }"', '"[](const string& a, const string& b){ return a.length() > b.length(); }"', '"[](string a, string b){ return a.size(); }"'], 0, '길이 오름차순: a.size() < b.size(). 정렬 결과: hi(2), cat(3), apple(5), banana(6). words[0] = ''hi''.', '람다 — 문자열 길이 정렬', '문자열 길이 정렬: sort(v.begin(), v.end(), [](const string& a, const string& b){ return a.size() < b.size(); }).', ARRAY['"sort"', '"lambda"', '"string"', '"size()"'], NULL, NULL),
(10670, 'cpp', 'cpp-23', '보통', '점수 내림차순, 점수 같으면 이름 오름차순으로 정렬하는 람다는?', 'struct Student { string name; int score; };
vector<Student> v = {{"B",90},{"A",90},{"C",80}};
sort(v.begin(), v.end(), /* 빈칸 */);', ARRAY['"[](const Student& a, const Student& b){ return a.score != b.score ? a.score > b.score : a.name < b.name; }"', '"[](const Student& a, const Student& b){ return a.score > b.score && a.name < b.name; }"', '"[](const Student& a, const Student& b){ return a.score > b.score || a.name < b.name; }"', '"[](const Student& a, const Student& b){ return a.score > b.score; }"'], 0, '다중 키 정렬: 첫 번째 키(score)가 다르면 그 기준으로, 같으면 두 번째 키(name)로 정렬합니다. 삼항 연산자로 간결하게 표현합니다.', '다중 키 정렬 (Multi-key Sort)', '다중 키: a.key1 != b.key1 ? a.key1 > b.key1 : a.key2 < b.key2. USACO에서 자주 사용하는 패턴입니다.', ARRAY['"sort"', '"lambda"', '"다중 키 정렬"', '"USACO"'], NULL, NULL),
(10671, 'cpp', 'cpp-23', '어려움', '구간 [l, r]을 시작점 오름차순, 같으면 끝점 오름차순으로 정렬하는 코드는?', 'vector<pair<int,int>> intervals = {{1,4},{2,3},{1,2},{3,5}};
// 시작점 오름차순, 같으면 끝점 오름차순
sort(intervals.begin(), intervals.end(), /* 빈칸 */);', ARRAY['"[](const pair<int,int>& a, const pair<int,int>& b){ return a.first != b.first ? a.first < b.first : a.second < b.second; }"', '"greater<pair<int,int>>()"', '"[](const pair<int,int>& a, const pair<int,int>& b){ return a.first < b.first; }"', '"[](const pair<int,int>& a, const pair<int,int>& b){ return a.first < b.first && a.second < b.second; }"'], 0, '시작점이 다르면 시작점으로, 같으면 끝점으로 정렬합니다. 사실 pair의 기본 정렬도 이와 동일하지만, 명시적 람다가 더 읽기 쉽습니다. 결과: {1,2},{1,4},{2,3},{3,5}.', '구간 정렬 (USACO 패턴)', '구간 문제에서 [시작, 끝] pair를 시작점→끝점 순으로 정렬하는 것은 그리디 알고리즘의 기본 전처리 단계입니다.', ARRAY['"sort"', '"pair"', '"구간 정렬"', '"USACO"', '"그리디"'], NULL, NULL),
(10672, 'cpp', 'cpp-23', '어려움', '버블 정렬로 {5, 3, 8, 1}을 정렬할 때 첫 번째 패스(바깥 루프 1회) 후 배열 상태는?', 'int arr[4] = {5, 3, 8, 1};
// 버블 정렬 1 패스
for (int j = 0; j < 3; j++) {
    if (arr[j] > arr[j+1])
        swap(arr[j], arr[j+1]);
}', ARRAY['"{3, 5, 1, 8}"', '"{1, 3, 5, 8}"', '"{3, 5, 8, 1}"', '"{5, 1, 3, 8}"'], 0, 'j=0: 5>3 → swap → {3,5,8,1}. j=1: 5<8 → no swap → {3,5,8,1}. j=2: 8>1 → swap → {3,5,1,8}. 첫 패스 후 최댓값 8이 맨 끝으로 이동합니다.', '버블 정렬 1 패스', '버블 정렬: 인접 원소를 비교/교환. 1 패스마다 최댓값이 끝으로 이동합니다. N-1 패스 후 완전 정렬.', ARRAY['"버블 정렬"', '"swap"', '"수동 정렬"'], NULL, NULL),
(10673, 'cpp', 'cpp-23', '어려움', 'N개 원소에서 상위 K개만 빠르게 구하려 한다. O(N + K log N) 복잡도인 방법은?', 'vector<int> v = {3,1,4,1,5,9,2,6};
int K = 3;
// 상위 K개(가장 큰 K개)를 구하는 방법', ARRAY['"partial_sort(v.begin(), v.begin()+K, v.end(), greater<int>());"', '"sort(v.begin(), v.end(), greater<int>()); // 전체 정렬 후 앞 K개"', '"nth_element(v.begin(), v.begin()+K, v.end());"', '"priority_queue<int> pq(v.begin(), v.end()); // K번 pop"'], 0, 'partial_sort: 전체를 정렬하지 않고 앞 K개만 정렬된 상태로 만듭니다. 복잡도 O(N log K). 전체 sort는 O(N log N)으로 더 느립니다.', 'partial_sort — 부분 정렬', 'partial_sort(first, middle, last): [first, last) 범위에서 상위 원소를 [first, middle)에 정렬된 상태로 배치. 상위 K개만 필요할 때 효율적.', ARRAY['"partial_sort"', '"sort"', '"algorithm"', '"성능"'], NULL, NULL),
(10632, 'cpp', 'cpp-6', '쉬움', '점수 score가 60 이상이고 90 이하일 때 ''B등급''을 출력하려 한다. 빈칸에 들어갈 조건은?', 'int score = 75;
if (/* 빈칸 */) {
    cout << "B등급";
}', ARRAY['"score >= 60 && score <= 90"', '"score >= 60 || score <= 90"', '"60 <= score <= 90"', '"score >= 60 & score <= 90"'], 0, '''60 이상이고 90 이하''는 두 조건을 모두 만족해야 하므로 &&를 사용합니다. ''60 <= score <= 90'' 같은 수학적 표기는 C++에서 허용되지 않습니다.', '범위 조건 — &&', '범위 검사는 반드시 두 비교를 &&로 연결합니다: score >= 60 && score <= 90.', ARRAY['"&&"', '"논리 연산자"', '"범위 조건"'], NULL, NULL),
(10633, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', 'int x = 50;
if (x >= 0 && x <= 100) {
    cout << "valid";
} else {
    cout << "invalid";
}', ARRAY['"valid"', '"invalid"', '"50"', '"컴파일 오류"'], 0, 'x=50은 0 이상이고 100 이하이므로 두 조건 모두 참 → && 결과도 참 → ''valid'' 출력.', '&&로 범위 검사', '0 ≤ x ≤ 100 범위 검사: x >= 0 && x <= 100. 둘 다 참이어야 전체가 참입니다.', ARRAY['"&&"', '"범위 조건"', '"if-else"'], NULL, NULL),
(10634, 'cpp', 'cpp-6', '쉬움', 'day가 6(토요일) 이거나 7(일요일)이면 ''weekend''를 출력하는 코드로 올바른 것은?', 'int day = 6;
// 이 중 올바른 것은?', ARRAY['"if (day == 6 || day == 7) cout << \"weekend\";"', '"if (day == 6 && day == 7) cout << \"weekend\";"', '"if (day == 6 or 7) cout << \"weekend\";"', '"if (day == (6 || 7)) cout << \"weekend\";"'], 0, '''6 이거나 7''은 OR 조건이므로 ||를 사용합니다. day == 6 && day == 7은 동시에 두 값이 될 수 없어 항상 거짓입니다.', 'OR 조건 — ||', '여러 값 중 하나인지 검사할 때는 || 사용: day == 6 || day == 7.', ARRAY['"||"', '"논리 연산자"', '"if문"'], NULL, NULL),
(10635, 'cpp', 'cpp-6', '쉬움', '다음 switch문에서 grade가 ''B''일 때 출력 결과는?', 'char grade = ''B'';
switch (grade) {
    case ''A'': cout << "Excellent";
    case ''B'': cout << "Good";
    case ''C'': cout << "Pass";
    default:  cout << "?";
}', ARRAY['"Good"', '"GoodPass?"', '"GoodPass"', '"Pass?"'], 1, 'break가 없으면 해당 case 이후 모든 case가 연속 실행됩니다(fall-through). ''B''에서 시작해 ''C'', default까지 전부 실행 → ''GoodPass?''.', 'switch fall-through', 'case 뒤에 break;를 생략하면 다음 case로 계속 실행됩니다(fall-through). 의도적인 경우 외에는 반드시 break를 넣으세요.', ARRAY['"switch"', '"fall-through"', '"break"'], NULL, NULL),
(10636, 'cpp', 'cpp-6', '쉬움', '나이 age가 18세 이상이어야 입장 가능할 때 올바른 조건은?', 'int age = 18;
if (/* 빈칸 */) {
    cout << "입장 가능";
}', ARRAY['"age >= 18"', '"age > 18"', '"age > 17"', '"age == 18"'], 0, '''18 이상''은 18을 포함하므로 >=를 사용합니다. age > 18이면 18세는 입장 불가입니다.', '>= 와 > 구분', '''이상''은 >=, ''초과''는 >. 경계값이 포함되는지 항상 확인하세요.', ARRAY['"비교 연산자"', '">="', '">"', '"경계값"'], NULL, NULL),
(10637, 'cpp', 'cpp-6', '쉬움', '다음 코드의 출력 결과는?', 'int x = 15;
if (x > 10) {
    if (x > 20) {
        cout << "A";
    } else {
        cout << "B";
    }
} else {
    cout << "C";
}', ARRAY['"A"', '"B"', '"C"', '"AB"'], 1, 'x=15는 10보다 크므로 outer if 진입. 그러나 15는 20 이하이므로 inner else → ''B'' 출력.', '중첩 if-else', 'if 안에 if가 있는 중첩 구조. 조건을 바깥→안쪽 순서로 평가합니다.', ARRAY['"중첩 if"', '"else"', '"조건문"'], NULL, NULL),
(10638, 'cpp', 'cpp-6', '쉬움', '소문자 알파벳인지 검사하는 조건으로 올바른 것은? (ASCII: ''a''=97, ''z''=122)', 'char c = ''k'';
if (/* 빈칸 */) {
    cout << "소문자";
}', ARRAY['"c >= ''a'' && c <= ''z''"', '"c >= ''a'' || c <= ''z''"', '"c > ''a'' && c < ''z''"', '"''a'' <= c <= ''z''"'], 0, '소문자는 ''a'' 이상이고 ''z'' 이하인 범위입니다. &&로 두 조건을 연결합니다. c > ''a'' && c < ''z''는 ''a''와 ''z'' 자체를 제외해 틀립니다.', 'char 범위 검사', '문자도 비교 연산자로 범위 검사 가능: c >= ''a'' && c <= ''z''. 내부적으로 ASCII 값을 비교합니다.', ARRAY['"char"', '"ASCII"', '"&&"', '"범위 조건"'], NULL, NULL),
(10639, 'cpp', 'cpp-6', '쉬움', '두 수 중 더 큰 값을 출력하는 삼항 연산자로 올바른 것은?', 'int a = 7, b = 3;
cout << /* 빈칸 */;', ARRAY['"a > b ? a : b"', '"a > b ? b : a"', '"a < b ? a : b"', '"a ? b : a > b"'], 0, '삼항 연산자: 조건 ? 참일_때_값 : 거짓일_때_값. a>b가 참이면 a(큰 값)를 출력합니다.', '삼항 연산자 — 최댓값', '최댓값: a > b ? a : b. 조건이 참이면 ? 뒤, 거짓이면 : 뒤 값이 선택됩니다.', ARRAY['"삼항 연산자"', '"?:"', '"최댓값"'], NULL, NULL),
(10640, 'cpp', 'cpp-6', '보통', '다음 코드에서 x=5일 때 출력 결과는? (dangling else 주의)', 'int x = 5;
if (x > 0)
    if (x > 10)
        cout << "big";
else
    cout << "negative";', ARRAY['"big"', '"negative"', '"아무것도 출력 안 됨"', '"컴파일 오류"'], 1, 'C++에서 else는 항상 가장 가까운 if와 짝을 이룹니다. 들여쓰기와 달리, 이 코드에서 else는 ''if(x > 10)''과 짝입니다. x=5이면: outer if(x>0) → 참 → 진입, inner if(x>10) → 거짓 → else 실행 → ''negative'' 출력됩니다.', 'dangling else', 'else는 항상 코드상 가장 가까운(짝이 없는) if와 연결됩니다. 들여쓰기에 속지 마세요. 명확하게 하려면 중괄호 {}를 사용하세요.', ARRAY['"dangling else"', '"중괄호"', '"if-else 규칙"'], NULL, NULL),
(10641, 'cpp', 'cpp-13', '보통', '다음 코드가 런타임 오류(null 포인터) 없이 안전하게 동작하는 이유는?', 'int* ptr = nullptr;
if (ptr != nullptr && *ptr > 0) {
    cout << "positive";
} else {
    cout << "safe";
}', ARRAY['"ptr != nullptr가 거짓이면 *ptr > 0은 평가하지 않기 때문"', '"&& 대신 ||를 써야 안전하다"', '"nullptr은 자동으로 0으로 변환되기 때문"', '"컴파일러가 자동으로 null 검사를 추가하기 때문"'], 0, '&&의 단락 평가(short-circuit): 왼쪽이 false면 오른쪽은 실행하지 않습니다. ptr이 nullptr이면 *ptr을 역참조하지 않아 안전합니다.', '단락 평가 (Short-Circuit Evaluation)', '&& : 왼쪽이 false면 오른쪽 평가 생략. || : 왼쪽이 true면 오른쪽 평가 생략. 이를 이용해 null 포인터 역참조를 방지할 수 있습니다.', ARRAY['"단락 평가"', '"short-circuit"', '"&&"', '"nullptr"'], NULL, NULL),
(10642, 'cpp', 'cpp-6', '보통', '다음 코드에서 점수 85, 출석 true일 때 출력 결과는?', 'int score = 85;
bool attendance = true;
if (score >= 90 || score >= 80 && attendance) {
    cout << "합격";
} else {
    cout << "불합격";
}', ARRAY['"합격"', '"불합격"', '"컴파일 오류"', '"결과 불확정"'], 0, '&&가 ||보다 우선순위가 높습니다. 따라서 (score>=90) || (score>=80 && attendance)로 평가됩니다. score=85, attendance=true → (false) || (true && true) → false || true → true → ''합격''.', '&& vs || 우선순위', 'C++에서 && > || 우선순위. score>=90 || score>=80 && attendance = score>=90 || (score>=80 && attendance). 헷갈리면 괄호를 명시하세요.', ARRAY['"&&"', '"||"', '"연산자 우선순위"', '"조건문"'], NULL, NULL),
(10643, 'cpp', 'cpp-6', '보통', '세 수 a, b, c를 오름차순으로 비교할 때 가장 큰 값을 찾는 코드로 올바른 것은?', 'int a=3, b=7, c=5;
int maxVal;
// 빈칸', ARRAY['"if (a>b && a>c) maxVal=a; else if (b>c) maxVal=b; else maxVal=c;"', '"if (a>b || a>c) maxVal=a; else maxVal=b;"', '"if (a>b) maxVal=a; if (b>c) maxVal=b; if (c>a) maxVal=c;"', '"maxVal = a>b ? (a>c?a:c) : (b>c?b:c) == 7;"'], 0, 'a가 b보다 크고(&&) c보다도 크면 a가 최대. 그렇지 않으면 b와 c 중 큰 값을 else if로 판별합니다. 세 독립적인 if를 나열하면 모두 실행돼 마지막 조건만 남게 됩니다.', 'else if로 다중 조건 처리', '상호 배타적인 경우를 처리할 때는 if-else if-else 체인을 사용합니다. 독립 if 여러 개는 모두 실행되므로 주의하세요.', ARRAY['"else if"', '"&&"', '"최댓값 탐색"'], NULL, NULL),
(10644, 'cpp', 'cpp-6', '보통', '다음 두 코드의 차이로 올바른 것은?', '// 코드 A
int x = 5;
if (x > 0) cout << "pos";
if (x > 3) cout << "big";

// 코드 B
if (x > 0) cout << "pos";
else if (x > 3) cout << "big";', ARRAY['"A는 조건이 맞으면 둘 다 출력, B는 첫 조건이 참이면 두 번째는 실행 안 함"', '"A와 B는 항상 같은 결과를 낸다"', '"B가 더 느리다"', '"A는 컴파일 오류가 난다"'], 0, '코드 A: 두 if는 독립적으로 실행됩니다. x=5이면 ''pos''와 ''big'' 둘 다 출력. 코드 B: else if는 앞의 if가 거짓일 때만 실행됩니다. x>0이 참이면 else if 블록은 건너뜁니다.', '독립 if vs else if', '독립 if: 각 조건을 모두 검사. else if: 앞 조건이 거짓일 때만 검사. 서로 배타적인 경우에는 else if를 사용합니다.', ARRAY['"if"', '"else if"', '"조건문 흐름"'], NULL, NULL),
(10645, 'cpp', 'cpp-6', '어려움', '다음 코드에서 a=3, b=3, c=3일 때 출력 결과는?', 'int a=3, b=3, c=3;
if (a == b && b == c) {
    cout << "equal";
} else if (a == b || b == c || a == c) {
    cout << "two same";
} else {
    cout << "all diff";
}', ARRAY['"equal"', '"two same"', '"all diff"', '"equal\ntwo same"'], 0, 'a==b는 참, b==c도 참 → &&결과 참 → 첫 번째 if 진입. else if는 첫 번째 if가 참이므로 실행되지 않습니다. 출력: ''equal''.', 'if-else if 흐름 제어', 'if-else if 체인에서 첫 번째로 참인 조건만 실행됩니다. 나머지 조건은 건너뜁니다.', ARRAY['"if-else if"', '"&&"', '"=="'], NULL, NULL),
(10646, 'cpp', 'cpp-6', '어려움', 'USACO 스타일 문제: N×M 격자에서 (r, c)가 유효한 칸인지 확인하는 함수로 올바른 것은?', 'int N = 5, M = 5;
// (r, c)가 격자 안에 있으면 true를 반환하는 함수
bool inBounds(int r, int c) {
    return /* 빈칸 */;
}', ARRAY['"r >= 0 && r < N && c >= 0 && c < M"', '"r > 0 && r < N && c > 0 && c < M"', '"r >= 0 || r < N || c >= 0 || c < M"', '"0 <= r <= N && 0 <= c <= M"'], 0, '격자 인덱스는 0부터 N-1(또는 M-1)까지입니다. r >= 0 (0 이상)이고 r < N (N 미만)이어야 합니다. 네 조건 모두 &&로 연결합니다. r > 0은 첫 번째 행(0)을 제외하므로 틀립니다.', '격자 경계 검사 (USACO 패턴)', '격자 경계 검사 패턴: r >= 0 && r < N && c >= 0 && c < M. 네 조건 모두 &&로 연결. 이 패턴은 BFS/DFS/시뮬레이션 문제에서 반복적으로 등장합니다.', ARRAY['"격자"', '"경계 검사"', '"&&"', '"USACO"', '"배열 인덱스"'], NULL, NULL),
(10695, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 2, b = 3;
    int result = a + b * 2 - 1 % b;
    cout << result;
    return 0;
}', ARRAY['"8"', '"9"', '"7"', '"10"'], 2, '연산자 우선순위: *(곱셈)과 %(나머지)가 +,-보다 먼저 계산됩니다. b*2 = 3*2 = 6, 1%b = 1%3 = 1. 이후 왼쪽에서 오른쪽으로: a + 6 - 1 = 2 + 6 - 1 = 7.', '연산자 우선순위', '*, /, %는 +, -보다 우선순위가 높아 먼저 계산됩니다. 같은 우선순위면 왼쪽에서 오른쪽으로 계산합니다.', NULL, NULL, NULL),
(10696, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int x = ++a;
    int y = a++;
    cout << x << " " << y << " " << a;
    return 0;
}', ARRAY['"6 6 7"', '"5 5 7"', '"6 5 7"', '"5 6 7"'], 0, '++a(전위): a를 먼저 6으로 증가시킨 후 x에 6을 대입. x=6, a=6. a++(후위): 현재 a값 6을 y에 대입한 후 a를 7로 증가. y=6, a=7. 출력: 6 6 7.', '전위 vs 후위 증가 연산자', '++a(전위): 증가 후 대입, 증가된 값 반환. a++(후위): 대입 후 증가, 원래 값 반환. 분리된 문장으로 사용해야 동작이 명확합니다.', NULL, NULL, NULL),
(10697, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int x = 0;

bool check() {
    x++;
    return true;
}

int main() {
    bool result = false && check();
    cout << x;
    return 0;
}', ARRAY['"0"', '"1"', '"2"', '"컴파일 오류"'], 0, '&&(논리 AND)의 단락 평가(short-circuit): 왼쪽 피연산자가 false이면 오른쪽은 절대 평가되지 않습니다. false && check()에서 false이므로 check()는 호출되지 않고 x는 0 그대로입니다.', '단락 평가(Short-Circuit Evaluation)', '&&에서 왼쪽이 false면 오른쪽 미평가. ||에서 왼쪽이 true면 오른쪽 미평가. 부수 효과(side effect)가 있는 함수 호출 시 주의해야 합니다.', NULL, NULL, NULL),
(10698, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int main() {
    int a = 10;
    a += 3;
    a *= 2;
    a -= a / 3;
    cout << a;
    return 0;
}', ARRAY['"18"', '"20"', '"16"', '"22"'], 0, '단계별로: a=10 → a+=3: a=13 → a*=2: a=26 → a-=a/3: a/3 = 26/3 = 8(정수 나눗셈), a=26-8=18. 출력: 18.', '복합 대입 연산자와 정수 나눗셈', '복합 대입 연산자(+=, *=, -=, /=)는 순서대로 실행됩니다. 정수형끼리의 /는 소수점 버림 정수 나눗셈입니다.', NULL, NULL, NULL),
(10699, 'cpp', 'cpp-8', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void print(int a) {
    cout << "int: " << a << endl;
}

void print(double a) {
    cout << "double: " << a << endl;
}

int main() {
    print(3.0f);
    return 0;
}', ARRAY['"int: 3"', '"double: 3"', '"컴파일 오류: 모호한 호출"', '"int: 0"'], 1, '3.0f는 float 리터럴입니다. float에서 double로의 변환은 정밀도 손실 없는 승격(promotion)이고, float에서 int로의 변환은 축소 변환입니다. 승격이 우선하므로 double 버전이 호출됩니다. cout << 3.0f는 소수점 없이 ''3''으로 출력됩니다.', '함수 오버로딩 해석과 타입 승격', '오버로딩 해석 시 float는 double로 승격됩니다. int로의 암시적 축소 변환보다 double로의 승격이 우선합니다.', NULL, NULL, NULL),
(10700, 'cpp', 'cpp-8', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

void swap(int a, int b) {
    int tmp = a;
    a = b;
    b = tmp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y;
    return 0;
}', ARRAY['"2 1"', '"1 2"', '"0 0"', '"컴파일 오류"'], 1, '이 swap 함수는 값에 의한 전달(pass by value)입니다. a와 b는 x와 y의 복사본이므로 함수 내에서 값이 바뀌어도 원본 x, y에는 영향이 없습니다. x=1, y=2 그대로 출력됩니다.', '값에 의한 전달 (Pass by Value)', '함수 매개변수는 기본적으로 복사본입니다. 원본을 수정하려면 참조(int& a) 또는 포인터를 사용해야 합니다.', NULL, NULL, NULL),
(10701, 'cpp', 'cpp-8', '어려움', '다음 재귀 함수의 출력 결과는?', '#include <iostream>
using namespace std;

int f(int n) {
    if (n <= 1) return n;
    return f(n - 1) + f(n - 2);
}

int main() {
    cout << f(6);
    return 0;
}', ARRAY['"8"', '"13"', '"5"', '"21"'], 0, '이 함수는 피보나치 수열입니다. f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6) = f(5)+f(4) = 5+3 = 8.', '피보나치 재귀 트레이싱', '재귀 함수는 호출 트리를 그려 추적합니다. f(n) = f(n-1) + f(n-2)는 피보나치 수열: 0,1,1,2,3,5,8,13,...', NULL, NULL, NULL),
(10702, 'cpp', 'cpp-8', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;

int add(int a, int b = 10) {
    return a + b;
}

int add(int a) {
    return a + 100;
}

int main() {
    cout << add(5);
    return 0;
}', ARRAY['"15"', '"105"', '"컴파일 오류: 모호한 호출"', '"110"'], 2, 'add(5)를 호출할 때 두 함수가 모두 매칭됩니다: add(int) 버전과 add(int, int=10)의 기본값 버전 모두 add(5)로 호출 가능합니다. 컴파일러는 어느 쪽을 선택해야 할지 알 수 없어 ''모호한 호출'' 오류가 발생합니다.', '기본 매개변수와 오버로딩 충돌', '기본 매개변수(default parameter)를 가진 함수와 다른 오버로딩 버전이 공존하면 호출이 모호해질 수 있습니다. 컴파일 오류로 이어집니다.', NULL, NULL, NULL),
(10703, 'cpp', 'cpp-11', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "hello world";
    size_t pos = s.find("xyz");
    if (pos == string::npos) {
        cout << "not found";
    } else {
        cout << pos;
    }
    return 0;
}', ARRAY['"not found"', '"0"', '"-1"', '"컴파일 오류"'], 0, 'find()가 찾는 문자열이 없으면 string::npos를 반환합니다. npos는 size_t 타입의 최대값(-1을 unsigned로 해석)입니다. pos == string::npos 비교가 참이므로 ''not found''가 출력됩니다.', 'find()와 string::npos', 'find()가 문자열을 찾지 못하면 string::npos를 반환합니다. 반드시 == string::npos로 비교하고, -1과 직접 비교하면 안 됩니다(size_t는 unsigned).', NULL, NULL, NULL),
(10704, 'cpp', 'cpp-11', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdefgh";
    string part = s.substr(s.find("cde"), 3);
    cout << part;
    return 0;
}', ARRAY['"cde"', '"cd"', '"cdef"', '"컴파일 오류"'], 0, 's.find("cde")는 인덱스 2를 반환합니다. s.substr(2, 3)은 인덱스 2부터 3글자를 추출합니다: ''c'',''d'',''e'' → "cde".', 'find()와 substr() 연쇄 사용', 'substr(pos, len)은 pos 위치부터 len개의 문자를 추출합니다. find()의 반환값을 substr의 시작 위치로 바로 사용할 수 있습니다.', NULL, NULL, NULL),
(10705, 'cpp', 'cpp-11', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "aabbcc";
    s.replace(2, 2, "XYZ");
    cout << s;
    return 0;
}', ARRAY['"aaXYZcc"', '"aaXYZbcc"', '"aaXYZ"', '"aabbXYZ"'], 0, 'replace(pos, len, new_str)는 pos 위치에서 len개의 문자를 new_str로 교체합니다. replace(2, 2, "XYZ")는 인덱스 2부터 2글자(''b'',''b'')를 "XYZ"(3글자)로 교체합니다. 결과: "aa" + "XYZ" + "cc" = "aaXYZcc".', 'replace()로 인한 인덱스 변화', 'replace(pos, len, str)은 len글자를 str로 교체합니다. 교체 전후 문자열 길이가 달라질 수 있으므로 이후 인덱스 연산 시 주의해야 합니다.', NULL, NULL, NULL),
(10706, 'cpp', 'cpp-11', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";
    int result = a.compare(b);
    if (result < 0) cout << "a < b";
    else if (result > 0) cout << "a > b";
    else cout << "a == b";
    return 0;
}', ARRAY['"a < b"', '"a > b"', '"a == b"', '"컴파일 오류"'], 0, 'compare()는 사전 순으로 비교합니다. ''a''(97)는 ''b''(98)보다 작으므로 "apple"이 "banana"보다 사전 순으로 앞에 옵니다. result < 0이 참이므로 ''a < b''가 출력됩니다.', 'compare() 반환값 해석', 'a.compare(b): 반환값이 0이면 같음, 음수이면 a가 사전 순으로 앞, 양수이면 a가 사전 순으로 뒤에 위치합니다.', NULL, NULL, NULL),
(10707, 'cpp', 'cpp-18', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(1);
    pq.push(5);
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    return 0;
}', ARRAY['"5 4 3 1 1"', '"1 1 3 4 5"', '"3 1 4 1 5"', '"5 3 4 1 1"'], 0, 'priority_queue<int>는 기본적으로 최대 힙(max-heap)입니다. 가장 큰 값이 top()에 위치합니다. 5 → 4 → 3 → 1 → 1 순서로 pop되어 출력됩니다.', 'priority_queue 기본: 최대 힙', 'priority_queue<int>는 max-heap이므로 가장 큰 값이 먼저 나옵니다. min-heap을 원하면 priority_queue<int, vector<int>, greater<int>>를 사용합니다.', NULL, NULL, NULL),
(10708, 'cpp', 'cpp-18', '어려움', '다음 코드는 괄호 문자열이 올바른지 검사합니다. 입력이 "(()" 일 때 출력 결과는?', '#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s = "(()";
    stack<char> st;
    bool valid = true;
    for (char c : s) {
        if (c == ''('') st.push(c);
        else if (c == '')'') {
            if (st.empty()) { valid = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) valid = false;
    cout << (valid ? "YES" : "NO");
    return 0;
}', ARRAY['"YES"', '"NO"', '"컴파일 오류"', '"런타임 오류"'], 1, '"(()"를 처리합니다: ''('' → push, ''('' → push, '')'' → pop. 루프 종료 후 스택에 ''(''가 1개 남아있습니다. !st.empty()가 참이므로 valid=false. 출력: ''NO''.', '스택으로 괄호 유효성 검사', '올바른 괄호 검사: ''('' → push, '')'' → 스택이 비면 invalid, 아니면 pop. 루프 후 스택이 비어있어야 valid. 짝이 안 맞으면 NO.', NULL, NULL, NULL),
(10709, 'cpp', 'cpp-18', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    stack<int> st;
    queue<int> q;
    for (int i = 1; i <= 3; i++) {
        st.push(i);
        q.push(i);
    }
    cout << st.top() << " " << q.front();
    st.pop(); q.pop();
    cout << " " << st.top() << " " << q.front();
    return 0;
}', ARRAY['"3 1 2 2"', '"1 1 2 2"', '"3 3 2 2"', '"1 3 2 2"'], 0, '1,2,3을 push합니다. stack은 LIFO: top()=3. queue는 FIFO: front()=1. 각각 pop 후: stack top()=2, queue front()=2. 출력: ''3 1 2 2''.', '스택(LIFO) vs 큐(FIFO) 비교', '스택: top()은 마지막에 넣은 값(LIFO). 큐: front()는 처음 넣은 값(FIFO). pop() 후 다음 원소가 각 구조에 따라 다릅니다.', NULL, NULL, NULL),
(10710, 'cpp', 'cpp-18', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(1);
    dq.push_front(2);
    dq.push_back(3);
    dq.push_front(4);
    cout << dq.front() << " " << dq.back();
    dq.pop_front();
    dq.pop_back();
    cout << " " << dq.front() << " " << dq.back();
    return 0;
}', ARRAY['"4 3 2 1"', '"1 4 2 3"', '"4 3 1 3"', '"2 3 2 1"'], 0, 'push_back(1): [1]. push_front(2): [2,1]. push_back(3): [2,1,3]. push_front(4): [4,2,1,3]. front()=4, back()=3. pop_front() → [2,1,3]. pop_back() → [2,1]. front()=2, back()=1. 출력: ''4 3 2 1''.', 'deque 앞/뒤 삽입 및 삭제', 'deque는 양쪽 끝에서 O(1) 삽입/삭제가 가능합니다. push_front/pop_front는 앞쪽, push_back/pop_back은 뒤쪽을 조작합니다.', NULL, NULL, NULL),
(10711, 'cpp', 'cpp-4', '어려움', '다음 코드에서 cin.ignore()를 제거했을 때 name에 저장되는 값은?', '#include <iostream>
#include <string>
using namespace std;
int main() {
    int age;
    string name;
    cin >> age;
    // cin.ignore(); // 제거됨
    getline(cin, name);
    cout << "[" << name << "]";
    return 0;
}', ARRAY['"입력 값(25 Alice)에서 [Alice]"', '"[]"', '"[25]"', '"런타임 오류"'], 1, 'cin >> age 후 개행(\n)이 버퍼에 남습니다. cin.ignore()가 없으면 getline이 즉시 이 개행을 읽어 name은 빈 문자열이 됩니다.', 'cin과 getline 혼용 — 버퍼 개행 문제', 'cin >> 다음 getline을 사용하려면 cin.ignore()로 버퍼의 개행을 먼저 제거해야 합니다.', NULL, NULL, NULL),
(10712, 'cpp', 'cpp-4', '어려움', '다음 코드에서 입력이 "3.14abc" 한 줄일 때 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;
int main() {
    double d;
    string s;
    cin >> d >> s;
    cout << d << " " << s;
    return 0;
}', ARRAY['"3.14 abc"', '"3.14 (공백 후 끝)"', '"0 3.14abc"', '"런타임 오류"'], 0, 'cin >> d는 숫자 부분 3.14만 읽고 알파벳에서 멈춥니다. 버퍼에 abc가 남고 cin >> s가 이를 읽어 s = "abc"가 됩니다.', 'cin의 타입별 파싱', 'cin >>는 해당 타입으로 해석 가능한 부분까지만 읽습니다. 나머지는 버퍼에 남아 다음 cin >>가 읽습니다.', NULL, NULL, NULL),
(10713, 'cpp', 'cpp-9', '어려움', '다음 코드에서 n=2이고 입력이 각각 "hello world", "foo bar"일 때 출력은?', '#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main() {
    int n; cin >> n; cin.ignore();
    vector<string> lines(n);
    for (int i = 0; i < n; i++)
        getline(cin, lines[i]);
    cout << lines[0] << "|" << lines[1];
    return 0;
}', ARRAY['"hello world|foo bar"', '"hello|foo"', '"world|bar"', '"hello world| (두 번째 줄 없음)"'], 0, 'cin >> n 후 cin.ignore()로 개행을 제거했으므로 getline이 각 줄을 공백 포함 완전히 읽습니다. lines[0]="hello world", lines[1]="foo bar".', 'getline으로 공백 포함 여러 줄 입력', 'getline은 개행 전의 모든 문자(공백 포함)를 읽습니다. cin >>와 함께 쓸 때는 cin.ignore()가 필수입니다.', NULL, NULL, NULL),
(10714, 'cpp', 'cpp-12', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto& x : v) x *= 2;
    for (auto x : v) cout << x << " ";
    return 0;
}', ARRAY['"1 2 3 4 5 "', '"2 4 6 8 10 "', '"2 4 6 8 10 (첫 루프만 복사본 수정)"', '"컴파일 오류"'], 1, 'auto& x : v는 참조로 받아 원본을 수정합니다. 첫 루프에서 모든 요소가 2배가 되고 두 번째 루프에서 2 4 6 8 10이 출력됩니다.', 'auto vs auto& in range-for', 'auto x는 복사본(원본 불변), auto& x는 참조(원본 수정 가능). 원소 수정이 목적이면 반드시 & 를 붙이세요.', NULL, NULL, NULL),
(10715, 'cpp', 'cpp-12', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<vector<int>> mat = {{1,2,3},{4,5,6},{7,8,9}};
    int sum = 0;
    for (const auto& row : mat)
        for (auto val : row)
            sum += val;
    cout << sum;
    return 0;
}', ARRAY['"45"', '"15"', '"0"', '"컴파일 오류"'], 0, 'const auto& row로 각 행을 참조, auto val로 각 열 값을 복사합니다. 1+2+3+4+5+6+7+8+9 = 45.', '중첩 컨테이너 range-for 순회', '외부 루프는 const auto&로 복사 비용 절감, 내부 루프는 auto로 값 접근하는 패턴이 일반적입니다.', NULL, NULL, NULL),
(10716, 'cpp', 'cpp-17', '어려움', '다음 코드에서 auto 추론 타입에 대한 설명 중 잘못된 것은?', 'vector<int> v = {1, 2, 3};
auto a = v[0];        // (A)
auto& b = v[0];       // (B)
const auto c = v[0];  // (C)
auto it = v.begin();  // (D)', ARRAY['"(A): int — v[0]의 복사"', '"(B): int& — 참조, b 수정 시 v[0]도 변경됨"', '"(C): const int — 수정 불가"', '"(D): int — begin()이 int를 반환하므로"'], 3, 'v.begin()은 vector<int>::iterator 타입을 반환합니다. auto it의 추론 타입은 int가 아니라 iterator입니다.', 'auto 타입 추론 — iterator', 'begin()처럼 복잡한 반환 타입을 가진 함수에 auto를 쓰면 실제 타입이 정확히 추론됩니다. int가 아닌 iterator입니다.', NULL, NULL, NULL),
(10717, 'cpp', 'cpp-10', '쉬움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    for (auto x : v) {
        cout << x << " ";
    }
    return 0;
}', ARRAY['"10 20 30 "', '"30 20 10 "', '"10
20
30
"', '"오류"'], 0, 'for(auto x : v)는 벡터의 각 요소를 순서대로 x에 복사합니다. 10, 20, 30이 공백으로 구분되어 출력됩니다.', 'range-for 기본 순회', 'for(auto x : container)는 컨테이너의 모든 요소를 처음부터 끝까지 순서대로 순회합니다. x는 각 요소의 복사본입니다.', ARRAY['"range-for"', '"auto"', '"vector 순회"'], NULL, NULL),
(10718, 'cpp', 'cpp-10', '쉬움', '다음 코드에서 auto로 추론된 변수 타입으로 올바른 것은?', '#include <iostream>
using namespace std;

int main() {
    auto a = 42;
    auto b = 3.14;
    auto c = true;
    auto d = ''Z'';
    return 0;
}', ARRAY['"a=int, b=double, c=bool, d=char"', '"a=int, b=float, c=int, d=string"', '"모두 int로 추론됨"', '"오류 — auto는 기본 타입에 사용할 수 없음"'], 0, 'auto는 우변의 리터럴 타입을 자동 추론합니다. 42→int, 3.14→double, true→bool, ''Z''→char로 추론됩니다.', 'auto 타입 추론', 'auto 키워드는 변수 초기화 시 우변의 타입을 자동으로 추론합니다. 정수 리터럴은 int, 소수점은 double, 불리언은 bool, 문자는 char로 추론됩니다.', ARRAY['"auto"', '"타입 추론"', '"변수 선언"'], NULL, NULL),
(10719, 'cpp', 'cpp-10', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    int sum = 0;
    for (auto x : nums) {
        sum += x;
    }
    cout << sum << endl;
    return 0;
}', ARRAY['"15"', '"5"', '"1"', '"오류"'], 0, 'range-for로 1+2+3+4+5 = 15를 누적합니다.', 'range-for로 합산', 'range-for와 누적 변수를 함께 사용하면 컨테이너 전체 합산을 간결하게 표현할 수 있습니다.', ARRAY['"range-for"', '"누적 합"', '"auto"'], NULL, NULL),
(10720, 'cpp', 'cpp-10', '보통', '다음 두 코드 A와 B의 동작 차이로 올바른 것은?', '// 코드 A — range-for
vector<int> v = {10, 20, 30};
for (auto x : v) {
    cout << x << " ";
}

// 코드 B — 인덱스 for
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}', ARRAY['"A와 B 모두 10 20 30 을 출력한다"', '"A는 역순으로 출력하고 B는 정순으로 출력한다"', '"A는 컴파일 오류이다"', '"B만 인덱스 접근이 가능하므로 B의 결과가 더 빠르다"'], 0, '두 코드 모두 벡터를 처음부터 끝까지 순서대로 순회하며 ''10 20 30 ''을 출력합니다. range-for는 더 간결한 문법으로 같은 결과를 냅니다.', 'range-for vs 인덱스 for 비교', 'range-for는 인덱스 for와 동일하게 정순으로 순회합니다. range-for는 인덱스가 불필요할 때 더 간결합니다. 인덱스가 필요하면 전통적인 for를 사용합니다.', ARRAY['"range-for"', '"인덱스 for"', '"vector 순회"'], NULL, NULL),
(10721, 'cpp', 'cpp-10', '보통', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "hello";
    int count = 0;
    for (auto ch : word) {
        if (ch == ''l'') count++;
    }
    cout << count << endl;
    return 0;
}', ARRAY['"2"', '"1"', '"3"', '"오류"'], 0, 'string에도 range-for를 사용할 수 있습니다. ''h'', ''e'', ''l'', ''l'', ''o'' 중 ''l''은 2개이므로 count=2가 출력됩니다.', 'string에 range-for 적용', 'range-for는 string에도 사용 가능합니다. 각 문자를 순서대로 순회하며 개별 char에 접근할 수 있습니다.', ARRAY['"range-for"', '"string 순회"', '"char"'], NULL, NULL),
(10722, 'cpp', 'cpp-10', '어려움', '다음 코드 실행 후 벡터 v의 내용은?', '#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto x : v) {
        x = x * 2;  // 원본을 수정하려 했음
    }
    for (auto x : v) {
        cout << x << " ";
    }
    return 0;
}', ARRAY['"2 4 6 8 10 "', '"1 2 3 4 5 "', '"0 0 0 0 0 "', '"오류"'], 1, '`auto x`는 각 요소의 복사본입니다. x를 수정해도 원본 벡터에 전혀 영향을 주지 않으므로 v는 그대로 {1, 2, 3, 4, 5}입니다.', 'range-for 값 복사 함정', '`for(auto x : v)`에서 x는 원본의 복사본입니다. 루프 안에서 x를 바꿔도 원본 벡터는 변하지 않습니다. 원본 수정이 필요하다면 나중에 배울 ''참조'' 문법을 사용해야 합니다.', ARRAY['"range-for"', '"값 복사"', '"auto"'], NULL, NULL),
(10723, 'cpp', 'cpp-10', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"hi", "hello", "hey"};
    for (auto word : words) {
        for (auto ch : word) {
            if (ch == ''h'') cout << ch;
        }
    }
    cout << endl;
    return 0;
}', ARRAY['"hhh"', '"heh"', '"h h h "', '"오류"'], 0, '바깥 range-for는 words의 각 string을 순회합니다. 안쪽 range-for는 각 string의 char를 순회하며 ''h''만 출력합니다. ''hi''→h, ''hello''→h, ''hey''→h → ''hhh''가 출력됩니다.', '중첩 range-for — vector<string> 순회', 'range-for를 중첩하면 컬렉션 안의 컬렉션을 순회할 수 있습니다. vector<string>에서 바깥 루프는 string을, 안쪽 루프는 char를 순회합니다.', ARRAY['"중첩 range-for"', '"vector<string>"', '"string 순회"'], NULL, NULL),
(10724, 'cpp', 'cpp-1', '어려움', '다음 코드에서 컴파일 오류가 발생하는 이유는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Hello" << endl
    return 0;
}', ARRAY['"return 문이 없어서"', '"cout 줄 끝에 세미콜론(;)이 없어서"', '"#include가 잘못되어서"', '"endl 대신 \n을 써야 해서"'], 1, 'C++의 모든 구문은 세미콜론(;)으로 끝나야 합니다. cout << "Hello" << endl 뒤에 세미콜론이 없어 컴파일 오류가 발생합니다.', '세미콜론 누락 오류', 'C++에서 구문(statement)은 반드시 세미콜론(;)으로 종료해야 합니다. 세미콜론이 없으면 컴파일러가 다음 줄과 연결하려 해 예상치 못한 오류가 발생합니다.', ARRAY['"세미콜론"', '"컴파일 오류"', '"기본 구조"'], NULL, NULL),
(10725, 'cpp', 'cpp-1', '어려움', 'C++에서 using namespace std;를 사용하지 않을 때 cout을 올바르게 사용하는 방법은?', '', ARRAY['"cout << \"Hello\";"', '"std.cout << \"Hello\";"', '"std::cout << \"Hello\";"', '"namespace::cout << \"Hello\";"'], 2, '네임스페이스를 명시하지 않으면 std::cout처럼 콜론 두 개(::)로 접근해야 합니다. std.cout(점)이나 namespace::cout은 올바르지 않은 문법입니다.', '네임스페이스 스코프 연산자(::)', 'using namespace std; 없이 표준 라이브러리를 사용하려면 std::cout처럼 스코프 연산자(::)로 네임스페이스를 명시해야 합니다.', ARRAY['"namespace"', '"std::"', '"스코프 연산자"'], NULL, NULL),
(10726, 'cpp', 'cpp-1', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int x = 5;
    cout << "x = " << x << ", x*2 = " << x * 2 << endl;
    return 0;
}', ARRAY['"x = 5, x*2 = 10"', '"x = x, x*2 = x*2"', '"오류"', '"x=5, x*2=10"'], 0, 'cout은 << 연산자로 여러 값을 연결해 출력합니다. 문자열 리터럴은 그대로, 변수 x는 값(5)으로, x*2는 계산 결과(10)로 출력됩니다.', 'cout 연결 출력', 'cout << A << B << C 형태로 여러 값을 연결 출력할 수 있습니다. 문자열 리터럴은 따옴표 안의 내용 그대로, 변수와 식은 값으로 치환됩니다.', ARRAY['"cout"', '"<<연산자"', '"변수 출력"'], NULL, NULL),
(10727, 'cpp', 'cpp-2', '어려움', 'endl과 ''\n''의 차이로 올바른 것은?', '', ARRAY['"endl은 줄바꿈만 하고 \n은 버퍼도 비운다"', '"endl은 줄바꿈 후 출력 버퍼를 비우고(flush), \n은 줄바꿈만 한다"', '"두 개는 완전히 동일하다"', '"endl은 Windows에서만 동작한다"'], 1, 'endl은 줄바꿈 문자를 출력하고 추가로 출력 버퍼를 비웁니다(flush). \n은 줄바꿈만 합니다. endl을 반복 사용하면 버퍼 플러시로 인해 성능이 저하될 수 있습니다.', 'endl vs \n — 버퍼 플러시', 'endl은 ''\n'' + flush 역할을 합니다. 반복 출력이 많은 경우 endl 대신 ''\n''을 쓰면 성능이 향상됩니다. 경쟁 프로그래밍에서는 ''\n''을 권장합니다.', ARRAY['"endl"', '"\n"', '"버퍼 플러시"', '"성능"'], NULL, NULL),
(10728, 'cpp', 'cpp-2', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Name\tAge" << endl;
    cout << "Alice\t20" << endl;
    return 0;
}', ARRAY['"Name\tAge\nAlice\t20"', '"Name   Age\nAlice  20 (탭으로 정렬된 출력)"', '"오류"', '"NameAge\nAlice20"'], 1, '\t는 탭(tab) 문자로 일정 간격의 공백을 만들어 정렬된 출력을 생성합니다. Name과 Age, Alice와 20이 탭으로 구분되어 열 정렬된 형태로 출력됩니다.', '탭 문자(\t)로 열 정렬 출력', '\t는 탭 문자로 다음 탭 정지 위치까지 공백을 삽입합니다. 표 형식의 데이터를 출력할 때 유용합니다.', ARRAY['"\t 탭 문자"', '"cout"', '"이스케이프 문자"'], NULL, NULL),
(10729, 'cpp', 'cpp-3', '어려움', 'int 타입이 저장할 수 있는 최대값(약 21억)을 초과한 값을 저장하면 어떻게 되는가?', '', ARRAY['"컴파일 오류가 발생한다"', '"자동으로 long 타입으로 변환된다"', '"오버플로우가 발생하여 예기치 않은 값(매우 큰 음수 등)이 될 수 있다"', '"런타임 에러가 발생한다"'], 2, 'C++의 int는 약 -21억~+21억 범위를 가집니다. 이를 초과하면 정수 오버플로우가 발생해 값이 음수로 뒤집히는 등 예측 불가능한 결과가 됩니다. 컴파일 오류나 자동 변환은 발생하지 않습니다.', '정수 오버플로우(Integer Overflow)', 'int 범위를 초과하면 오버플로우가 발생합니다. 큰 값이 필요하면 long long (약 ±920경)을 사용하세요.', ARRAY['"오버플로우"', '"int 범위"', '"long long"'], NULL, NULL),
(10730, 'cpp', 'cpp-3', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    auto x = 5;
    auto y = 3.14;
    cout << x + y << endl;
    return 0;
}', ARRAY['"8.14"', '"8"', '"오류"', '"3.19"'], 0, 'auto x는 정수 리터럴 5로 int 타입, auto y는 부동소수점 리터럴 3.14로 double 타입으로 추론됩니다. int + double 연산 시 int가 double로 암묵적 변환되어 결과는 double 8.14가 됩니다.', 'auto 타입 추론과 암묵적 변환', 'auto는 초기화 값의 타입으로 자동 추론됩니다. int와 double을 더하면 double로 승격되어 소수점 결과가 유지됩니다.', ARRAY['"auto"', '"타입 추론"', '"암묵적 타입 변환"'], NULL, NULL),
(10731, 'cpp', 'cpp-3', '어려움', '다음 코드에서 컴파일 오류가 발생하는 줄은?', 'const int MAX = 100;
int x = MAX;     // 줄 A
x = x + 1;      // 줄 B
MAX = 200;       // 줄 C', ARRAY['"줄 A"', '"줄 B"', '"줄 C"', '"오류 없음"'], 2, 'const 변수는 초기화 이후 값을 변경할 수 없습니다. 줄 A는 const 값을 읽어 복사하므로 문제없고, 줄 B는 일반 변수 x를 수정하므로 문제없습니다. 줄 C에서 const MAX에 재할당을 시도하므로 컴파일 오류가 발생합니다.', 'const 상수 — 변경 불가', 'const로 선언된 변수는 읽기 전용입니다. 초기화 후 값 변경을 시도하면 컴파일 오류가 발생합니다.', ARRAY['"const"', '"상수"', '"컴파일 오류"'], NULL, NULL),
(10732, 'cpp', 'cpp-4', '어려움', '사용자가 ''3 5''를 입력했을 때 다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b << " " << a + b << endl;
    return 0;
}', ARRAY['"15 8"', '"8 15"', '"35 8"', '"오류"'], 0, 'cin >> a >> b는 공백으로 구분된 두 값을 순서대로 읽습니다. a=3, b=5로 할당됩니다. a*b=15, a+b=8이므로 ''15 8''이 출력됩니다.', 'cin 연속 입력', 'cin >> a >> b는 공백(스페이스, 탭, 개행)을 구분자로 하여 여러 변수를 순서대로 읽습니다.', ARRAY['"cin"', '"연속 입력"', '"공백 구분자"'], NULL, NULL),
(10733, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 5;
    cout << a++ << endl;
    cout << a << endl;
    return 0;
}', ARRAY['"5\n6"', '"6\n6"', '"5\n5"', '"6\n7"'], 0, 'a++는 후위 증가 연산자입니다. 현재 값(5)을 먼저 반환한 후 a를 1 증가시킵니다. 첫 번째 cout은 5를 출력하고, 그 후 a가 6이 되어 두 번째 cout은 6을 출력합니다.', '후위 증가(a++) vs 전위 증가(++a)', 'a++는 현재 값을 반환 후 증가(후위), ++a는 먼저 증가 후 증가된 값을 반환(전위)합니다.', ARRAY['"후위 증가"', '"전위 증가"', '"++연산자"'], NULL, NULL),
(10734, 'cpp', 'cpp-5', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int x = 3, y = 0;
    cout << (x > 0 && y > 0) << endl;
    cout << (x > 0 || y > 0) << endl;
    cout << !x << endl;
    return 0;
}', ARRAY['"0\n1\n0"', '"1\n1\n1"', '"0\n0\n0"', '"오류"'], 0, 'x>0&&y>0: x>0은 true, y>0은 false → AND → false(0). x>0||y>0: x>0은 true → OR → true(1). !x: x=3은 nonzero이므로 true로 취급, !true → false(0).', '논리 연산자 &&, ||, !', '&&는 둘 다 true여야 true, ||는 하나라도 true면 true, !는 논리 부정입니다. 0이 아닌 값은 true, 0은 false로 취급합니다.', ARRAY['"논리 연산자"', '"&&"', '"||"', '"!"'], NULL, NULL),
(10735, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int x = 2;
    switch (x) {
        case 1: cout << "one" << endl;
        case 2: cout << "two" << endl;
        case 3: cout << "three" << endl;
        default: cout << "other" << endl;
    }
    return 0;
}', ARRAY['"two\nthree\nother"', '"two"', '"two\nthree"', '"오류"'], 0, 'switch에서 break가 없으면 매칭된 case 이후 모든 case가 순서대로 실행됩니다(fallthrough). x=2이므로 case 2부터 시작해 case 3, default까지 모두 실행됩니다.', 'switch fallthrough — break 누락', 'switch의 각 case에 break가 없으면 다음 case로 실행이 계속됩니다(fallthrough). 의도하지 않은 fallthrough는 버그의 원인이 됩니다.', ARRAY['"switch"', '"fallthrough"', '"break"'], NULL, NULL),
(10736, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는? (a=1, b=2)', '#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 2;
    if (a > 0)
        if (b < 0)
            cout << "A" << endl;
        else
            cout << "B" << endl;
    return 0;
}', ARRAY['"B"', '"A"', '"아무것도 출력 안 됨"', '"A\nB"'], 0, 'else는 항상 가장 가까운 if에 속합니다(dangling else). a>0이 true이므로 안쪽 if로 진입합니다. b<0이 false(2<0은 false)이므로 안쪽 else가 실행되어 B가 출력됩니다.', 'dangling else — else는 가장 가까운 if에', 'else는 항상 코드상 가장 가까운 if와 짝을 이룹니다. 중첩 if에서 들여쓰기만으로 의도를 표현하면 오해할 수 있으므로 중괄호{}를 사용하는 것이 안전합니다.', ARRAY['"dangling else"', '"중첩 if"', '"else 짝"'], NULL, NULL),
(10737, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int x = 7;
    int result = (x % 2 == 0) ? x / 2 : x * 3 + 1;
    cout << result << endl;
    return 0;
}', ARRAY['"22"', '"3"', '"15"', '"4"'], 0, 'x=7은 홀수이므로 x%2==0이 false입니다. 삼항 연산자의 false 분기인 x*3+1이 계산됩니다. 7*3+1=22.', '삼항 연산자와 홀짝 판별', '삼항 연산자 (조건) ? 참값 : 거짓값 형태로 간결한 조건부 값 선택이 가능합니다. x%2==0으로 짝수 여부를 판별합니다.', ARRAY['"삼항 연산자"', '"?:"', '"홀수/짝수 판별"'], NULL, NULL),
(10738, 'cpp', 'cpp-6', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    char grade = ''B'';
    switch (grade) {
        case ''A'': cout << 4;
        case ''B'': cout << 3;
                  break;
        case ''C'': cout << 2;
        default:  cout << 0;
    }
    cout << endl;
    return 0;
}', ARRAY['"3"', '"30"', '"32"', '"오류"'], 0, 'grade=''B''이므로 case ''B''에서 매칭됩니다. 3을 출력한 후 break로 switch를 탈출합니다. case ''C''와 default는 실행되지 않습니다.', 'switch break — 정상 종료', 'break가 있는 case는 실행 후 switch를 탈출합니다. case ''B''에 break가 있으므로 case ''C'', default는 실행되지 않습니다.', ARRAY['"switch"', '"break"', '"char"'], NULL, NULL),
(10739, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int i = 5;
    do {
        cout << i << " ";
        i--;
    } while (i > 5);
    cout << endl;
    return 0;
}', ARRAY['"5 "', '"5 4 3 2 1 "', '"아무것도 출력 안 됨"', '"오류"'], 0, 'do-while은 조건을 나중에 검사합니다. i=5로 루프 본문을 먼저 실행해 5를 출력하고 i=4로 감소합니다. 조건 i>5(4>5)가 false이므로 즉시 종료합니다.', 'do-while — 최소 1회 실행 보장', 'do-while 루프는 조건과 관계없이 본문을 최소 1회 실행한 후 조건을 검사합니다. 조건이 처음부터 false여도 1번은 실행됩니다.', ARRAY['"do-while"', '"반복문"', '"최소 1회 실행"'], NULL, NULL),
(10740, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) break;
            cout << i << j << " ";
        }
    }
    cout << endl;
    return 0;
}', ARRAY['"00 10 20 "', '"00 01 10 11 20 21 "', '"00 "', '"오류"'], 0, 'break는 가장 안쪽 반복문만 탈출합니다. 각 i 반복에서 j=0일 때 출력 후 j=1에서 break로 안쪽 루프 탈출. 바깥 루프(i=0,1,2)는 계속 실행됩니다. 결과: 00 10 20.', '중첩 루프에서 break의 범위', 'break는 자신이 속한 가장 안쪽 반복문만 탈출합니다. 바깥 루프를 탈출하려면 플래그 변수나 goto를 사용해야 합니다.', ARRAY['"break"', '"중첩 반복문"', '"break 범위"'], NULL, NULL),
(10741, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) continue;
        cout << i << " ";
    }
    cout << endl;
    return 0;
}', ARRAY['"1 3 5 "', '"2 4 "', '"1 2 3 4 5 "', '"오류"'], 0, 'i가 짝수(i%2==0)이면 continue로 해당 반복을 건너뜁니다. 홀수인 1, 3, 5만 출력됩니다.', 'continue — 현재 반복 건너뛰기', 'continue는 반복문의 나머지 본문을 건너뛰고 다음 반복으로 진행합니다. 특정 조건의 항목을 제외할 때 유용합니다.', ARRAY['"continue"', '"홀수/짝수 필터"', '"반복문"'], NULL, NULL),
(10742, 'cpp', 'cpp-7', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int count = 0;
    for (int i = 1; i <= 4; i++) {
        for (int j = i; j <= 4; j++) {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}', ARRAY['"10"', '"16"', '"6"', '"12"'], 0, 'i=1: j=1~4(4회), i=2: j=2~4(3회), i=3: j=3~4(2회), i=4: j=4(1회). 총 4+3+2+1=10회 실행됩니다.', '중첩 루프 실행 횟수 계산', '안쪽 루프의 시작이 i에 따라 달라지는 삼각형 패턴입니다. 1+2+...+n = n*(n+1)/2 공식으로 계산할 수 있습니다.', ARRAY['"중첩 반복문"', '"실행 횟수"', '"삼각형 패턴"'], NULL, NULL),
(10743, 'cpp', 'cpp-7', '어려움', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 1, b = 10;
    while (a < b) {
        a *= 2;
        b--;
    }
    cout << a << " " << b << endl;
    return 0;
}', ARRAY['"8 7"', '"16 6"', '"4 8"', '"2 9"'], 0, '단계별 추적: (a=1,b=10)→(2,9)→(4,8)→(8,7). a=8, b=7에서 조건 a<b는 8<7이 false이므로 루프 종료. 최종 출력: 8 7.', 'while 루프 추적 — 두 변수 조건', '두 변수가 서로 가까워지는 while 루프는 단계별로 값을 추적해 종료 조건을 파악합니다.', ARRAY['"while"', '"반복문 추적"', '"종료 조건"'], NULL, NULL),
(10744, 'cpp', 'cpp-9', '어려움', '다음 코드의 문제점으로 올바른 것은?', 'int arr[5] = {1, 2, 3, 4, 5};
cout << arr[5] << endl;', ARRAY['"컴파일 오류가 발생한다"', '"배열 범위 초과(index out of bounds)로 undefined behavior가 발생한다"', '"자동으로 0을 반환한다"', '"런타임 예외가 발생한다"'], 1, '크기 5인 배열의 유효 인덱스는 0~4입니다. arr[5]는 범위를 벗어난 접근으로 undefined behavior가 발생합니다. C++은 배열 범위를 컴파일 시 검사하지 않으므로 컴파일 오류가 아닌 예측 불가능한 동작이 발생합니다.', '배열 범위 초과 — Undefined Behavior', 'C++ 배열은 범위를 자동으로 검사하지 않습니다. 범위를 벗어난 접근은 undefined behavior로 프로그램이 예측 불가능하게 동작할 수 있습니다.', ARRAY['"배열 인덱스"', '"범위 초과"', '"undefined behavior"'], NULL, NULL),
(10745, 'cpp', 'cpp-9', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    v.pop_back();
    cout << v.size() << endl;
    cout << v[0] + v[1] << endl;
    return 0;
}', ARRAY['"2\n30"', '"3\n30"', '"2\n20"', '"오류"'], 0, 'push_back 3번으로 {10, 20, 30}이 됩니다. pop_back으로 마지막 원소(30)가 제거되어 {10, 20}이 됩니다. size()=2, v[0]+v[1]=10+20=30.', 'vector push_back과 pop_back', 'push_back은 벡터 끝에 원소를 추가하고, pop_back은 끝 원소를 제거합니다. 둘 다 O(1) 연산입니다.', ARRAY['"vector"', '"push_back"', '"pop_back"', '"size()"'], NULL, NULL),
(10746, 'cpp', 'cpp-9', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int arr[5] = {1, 2, 3};
    cout << arr[3] << " " << arr[4] << endl;
    return 0;
}', ARRAY['"0 0"', '"쓰레기 값"', '"오류"', '"3 3"'], 0, 'C++에서 배열을 부분 초기화하면 나머지 원소는 자동으로 0으로 초기화됩니다. {1, 2, 3}으로 초기화된 크기 5 배열에서 arr[3]과 arr[4]는 0입니다.', '배열 부분 초기화 — 나머지는 0', 'int arr[5] = {1, 2, 3}처럼 부분 초기화 시 나머지 원소는 0으로 초기화됩니다. 이는 전역 변수와 달리 지역 배열에서도 적용됩니다.', ARRAY['"배열 초기화"', '"부분 초기화"', '"0 초기화"'], NULL, NULL),
(10747, 'cpp', 'cpp-9', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (int i = 0; i < v.size(); i++) {
        if (v[i] % 2 == 0) {
            v[i] *= 10;
        }
    }
    cout << v[1] << " " << v[3] << endl;
    return 0;
}', ARRAY['"20 40"', '"2 4"', '"10 40"', '"오류"'], 0, '짝수 원소에 *10을 적용합니다. v[1]=2(짝수)→20, v[3]=4(짝수)→40. v[0]=1(홀수), v[2]=3(홀수), v[4]=5(홀수)는 변경 없습니다.', '벡터 원소 조건부 수정', '인덱스로 벡터 원소에 직접 접근해 값을 수정할 수 있습니다. v[i] *= 10은 v[i] = v[i] * 10과 동일합니다.', ARRAY['"vector 인덱스 접근"', '"원소 수정"', '"짝수 필터"'], NULL, NULL),
(10748, 'cpp', 'cpp-9', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            sum += arr[i][j];
        }
    }
    cout << sum << endl;
    return 0;
}', ARRAY['"21"', '"15"', '"12"', '"오류"'], 0, '2×3 2차원 배열의 모든 원소 합입니다. 1+2+3+4+5+6=21.', '2차원 배열 전체 합산', '2차원 배열을 중첩 for 루프로 순회합니다. 바깥 루프는 행(i), 안쪽 루프는 열(j)을 순회합니다.', ARRAY['"2차원 배열"', '"중첩 반복문"', '"배열 합산"'], NULL, NULL),
(10749, 'cpp', 'cpp-11', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello World";
    size_t pos = s.find("xyz");
    if (pos == string::npos) {
        cout << "찾지 못함" << endl;
    } else {
        cout << pos << endl;
    }
    return 0;
}', ARRAY['"찾지 못함"', '"-1"', '"0"', '"오류"'], 0, 'find()는 부분 문자열을 찾지 못하면 string::npos를 반환합니다. string::npos는 size_t의 최대값이며 -1이 아닙니다. pos == string::npos가 true이므로 ''찾지 못함''이 출력됩니다.', 'string::find()와 string::npos', 'find()가 문자열을 찾지 못하면 string::npos를 반환합니다. -1이 아닌 string::npos와 비교해야 하며, size_t 타입을 사용합니다.', ARRAY['"string::find()"', '"string::npos"', '"문자열 검색"'], NULL, NULL),
(10750, 'cpp', 'cpp-12', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
void addOne(int x) { x++; }
void addOneRef(int& x) { x++; }

int main() {
    int a = 5, b = 5;
    addOne(a);
    addOneRef(b);
    cout << a << " " << b << endl;
    return 0;
}', ARRAY['"5 6"', '"6 6"', '"5 5"', '"6 5"'], 0, 'addOne(a)는 값으로 전달(pass by value)됩니다. 함수 내 x는 a의 복사본이므로 원본 a는 변경되지 않습니다. addOneRef(b)는 참조로 전달(pass by reference)됩니다. x는 b의 별칭이므로 b가 직접 증가해 6이 됩니다.', '값 전달 vs 참조 전달', '값 전달은 복사본을 수정해 원본에 영향 없음. 참조 전달(int&)은 원본을 직접 수정합니다.', ARRAY['"pass by value"', '"pass by reference"', '"int&"'], NULL, NULL),
(10751, 'cpp', 'cpp-12', '어려움', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
using namespace std;
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 7;
    swap(x, y);
    cout << x << " " << y << endl;
    return 0;
}', ARRAY['"7 3"', '"3 7"', '"3 3"', '"오류"'], 0, 'swap(x, y) 호출 시 a는 x의 참조, b는 y의 참조입니다. 함수 내에서 a와 b의 값이 교환되면 원본 x와 y의 값도 교환됩니다. 결과: x=7, y=3.', '참조를 이용한 swap 함수', '참조 매개변수를 사용하면 함수 내부에서 원본 변수를 직접 수정할 수 있습니다. swap은 참조 전달의 대표적 활용 예입니다.', ARRAY['"참조 전달"', '"swap"', '"int&"'], NULL, NULL),
(10752, 'cpp', 'cpp-12', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int& ref = a;
    ref = 20;
    cout << a << " " << ref << endl;
    return 0;
}', ARRAY['"20 20"', '"10 20"', '"10 10"', '"오류"'], 0, 'ref는 a의 참조(별칭, alias)입니다. ref와 a는 같은 메모리를 가리킵니다. ref = 20으로 값을 변경하면 a도 함께 20으로 변경됩니다.', '참조(Reference) — 변수의 별칭', '참조는 기존 변수의 또 다른 이름(별칭)입니다. 참조를 통한 수정은 원본 변수에 직접 반영됩니다.', ARRAY['"참조"', '"별칭(alias)"', '"int&"'], NULL, NULL),
(10753, 'cpp', 'cpp-14', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
struct Point {
    int x, y;
};

int main() {
    Point points[3] = {{1, 2}, {3, 4}, {5, 6}};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += points[i].x + points[i].y;
    }
    cout << sum << endl;
    return 0;
}', ARRAY['"21"', '"15"', '"9"', '"오류"'], 0, 'Point 구조체 배열의 모든 x, y 값을 합산합니다. (1+2) + (3+4) + (5+6) = 3 + 7 + 11 = 21.', '구조체 배열 순회와 멤버 접근', '구조체 배열은 일반 배열처럼 인덱스로 접근하고, 각 원소의 멤버는 . 연산자로 접근합니다.', ARRAY['"struct 배열"', '"멤버 접근(.)"', '"구조체 순회"'], NULL, NULL),
(10754, 'cpp', 'cpp-14', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
struct Rectangle {
    int width, height;
};

int area(Rectangle r) {
    return r.width * r.height;
}

int main() {
    Rectangle rect = {5, 3};
    cout << area(rect) << endl;
    return 0;
}', ARRAY['"15"', '"8"', '"오류"', '"53"'], 0, 'Rectangle 구조체를 값으로 함수에 전달합니다. area(rect)에서 r.width=5, r.height=3이므로 5*3=15를 반환합니다.', '구조체를 함수 매개변수로 전달', '구조체는 일반 변수처럼 함수에 값으로 전달할 수 있습니다. 함수 내에서 멤버를 . 연산자로 접근합니다.', ARRAY['"struct 전달"', '"함수 매개변수"', '"멤버 접근"'], NULL, NULL),
(10755, 'cpp', 'cpp-15', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    pair<int, int> p1 = {3, 1};
    pair<int, int> p2 = {3, 5};
    pair<int, int> p3 = {2, 9};
    cout << (p1 < p2) << endl;
    cout << (p1 > p3) << endl;
    return 0;
}', ARRAY['"1\n1"', '"0\n0"', '"1\n0"', '"0\n1"'], 0, 'pair 비교는 사전순(lexicographic)입니다. p1<p2: first가 같으면(3==3) second를 비교(1<5)→true(1). p1>p3: first를 비교(3>2)→true(1).', 'pair 비교 — 사전순(Lexicographic)', 'pair는 first를 먼저 비교하고, first가 같으면 second를 비교합니다. 이를 사전순(lexicographic) 비교라고 합니다.', ARRAY['"pair 비교"', '"lexicographic"', '"사전순"'], NULL, NULL),
(10756, 'cpp', 'cpp-15', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
#include <tuple>
#include <string>
using namespace std;
int main() {
    tuple<int, string, double> t = {1, "hello", 3.14};
    cout << get<0>(t) << endl;
    cout << get<1>(t) << endl;
    return 0;
}', ARRAY['"1\nhello"', '"0\nhello"', '"1\n3.14"', '"오류"'], 0, 'tuple 원소는 get<인덱스>(t)로 접근합니다. get<0>(t)는 첫 번째 원소 1(int), get<1>(t)는 두 번째 원소 "hello"(string)를 반환합니다.', 'tuple과 get<>() 접근', 'tuple은 여러 타입을 하나로 묶는 자료구조입니다. 원소에 접근할 때 get<인덱스>(tuple변수) 형태를 사용합니다. 인덱스는 0부터 시작합니다.', ARRAY['"tuple"', '"get<>()"', '"다중 타입 묶음"'], NULL, NULL),
(10757, 'cpp', 'cpp-19', '어려움', 'ofstream file("data.txt", ios::app)로 파일을 열면 어떻게 동작하는가?', '', ARRAY['"파일을 새로 만들어 처음부터 쓴다 (기존 내용 삭제)"', '"파일 끝에 이어서 쓴다 (기존 내용 보존)"', '"파일을 읽기 전용으로 연다"', '"파일이 이미 존재하면 오류가 발생한다"'], 1, 'ios::app(append) 모드는 파일의 기존 내용을 보존하고 파일 끝에 새 내용을 추가합니다. 기본 모드(ios::out)는 기존 내용을 삭제하고 처음부터 씁니다.', 'ios::app — 파일 추가 쓰기 모드', '파일 열기 모드: ios::out(기본, 덮어쓰기), ios::app(끝에 추가), ios::in(읽기). 로그 파일처럼 기존 내용을 보존하며 추가할 때 ios::app을 사용합니다.', ARRAY['"ofstream"', '"ios::app"', '"파일 모드"'], NULL, NULL),
(10758, 'cpp', 'cpp-19', '어려움', '경쟁 프로그래밍에서 ios::sync_with_stdio(false)와 cin.tie(NULL)을 함께 쓰는 이유는?', '', ARRAY['"cin과 cout을 사용할 수 없게 한다"', '"cin/cout의 입출력 속도를 크게 향상시킨다"', '"scanf/printf와 안전하게 혼용할 수 있게 한다"', '"파일 I/O를 활성화한다"'], 1, '기본적으로 cin/cout은 C의 scanf/printf와 동기화되어 속도가 느립니다. ios::sync_with_stdio(false)로 동기화를 끊으면 I/O 속도가 크게 향상됩니다. 단, 이후 scanf/printf와 혼용하면 안 됩니다.', 'Fast I/O — 입출력 가속', '경쟁 프로그래밍에서 대량 입출력 시 ios::sync_with_stdio(false); cin.tie(NULL);을 선언하면 cin/cout 속도가 크게 향상됩니다. 단, 이후 scanf/printf 혼용 불가.', ARRAY['"Fast I/O"', '"ios::sync_with_stdio"', '"cin.tie"'], NULL, NULL),
(10759, 'cpp', 'cpp-1', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Start" << endl;
    return 0;
    cout << "End" << endl;
}', ARRAY['"Start"', '"Start\nEnd"', '"End"', '"컴파일 오류"'], 0, 'return 0; 이후의 코드는 절대 실행되지 않습니다(dead code). 컴파일은 성공하지만 ''End''는 출력되지 않고 프로그램이 종료됩니다.', 'return 이후 코드 — Dead Code', 'return 문이 실행되면 함수가 즉시 종료됩니다. 그 이후의 코드(dead code)는 컴파일은 되지만 절대 실행되지 않습니다.', ARRAY['"return"', '"dead code"', '"main"'], NULL, NULL),
(10760, 'cpp', 'cpp-1', '어려움', 'main() 함수에서 return 0 대신 return 1을 반환하면 어떻게 되는가?', '', ARRAY['"프로그램이 오류(비정상 종료)를 운영체제에 알린다"', '"프로그램이 1번 더 반복 실행된다"', '"컴파일 오류가 발생한다"', '"1이 화면에 출력된다"'], 0, 'main()의 반환값은 운영체제에 전달되는 종료 코드입니다. 0은 정상 종료, 0이 아닌 값(1 등)은 오류 종료를 나타냅니다. 실제 화면 출력과는 무관합니다.', 'main() 반환값 — 종료 코드', 'main()의 return 값은 프로그램 종료 코드입니다. 0=정상, 1(또는 다른 값)=오류. 쉘 스크립트나 빌드 시스템이 이 값으로 성공/실패를 판단합니다.', ARRAY['"return"', '"종료 코드"', '"main"'], NULL, NULL),
(10761, 'cpp', 'cpp-1', '어려움', '다음 코드의 출력 결과는?', '#include <iostream>
using namespace std;
int main() {
    int x = 4;
    cout << x << " " << x + 1 << " " << x * x << endl;
    return 0;
}', ARRAY['"4 5 16"', '"x x+1 x*x"', '"4 5 8"', '"오류"'], 0, 'cout에 << 연산자로 여러 값을 연결해 한 줄에 출력할 수 있습니다. x=4이므로 4, x+1=5, x*x=16이 공백과 함께 출력됩니다.', 'cout 연쇄 출력', 'cout << a << b << c처럼 << 연산자를 연속으로 사용해 여러 값을 한 번에 출력할 수 있습니다. 표현식도 바로 계산되어 출력됩니다.', ARRAY['"cout"', '"<<"', '"연쇄 출력"'], NULL, NULL),
(10762, 'cpp', 'cpp-1', '어려움', '#include <iostream>과 #include "myfile.h"의 차이로 올바른 것은?', '', ARRAY['"<>는 표준/시스템 헤더에, \"\"는 사용자 정의 헤더 파일에 사용한다"', '"<>는 C 헤더에, \"\"는 C++ 헤더에만 사용한다"', '"두 방법은 완전히 동일하다"', '"<>는 .hpp에만, \"\"는 .h 파일에만 사용한다"'], 0, '<>는 컴파일러가 시스템/표준 라이브러리 경로에서 헤더를 찾습니다. ""는 현재 프로젝트 디렉토리에서 먼저 찾습니다. iostream, string 등 표준 헤더는 <>를 사용합니다.', '#include — <> vs ""', '표준 라이브러리(iostream, string 등)는 #include <헤더>. 직접 만든 헤더 파일은 #include "파일명.h". 이 규칙을 지키면 컴파일러가 올바른 경로에서 헤더를 찾습니다.', ARRAY['"#include"', '"헤더 파일"', '"표준 라이브러리"'], NULL, NULL),
(10763, 'cpp', 'cpp-1', '어려움', '다음 코드에서 출력이 예상과 다른 이유는?', '#include <iostream>
using namespace std;
int main() {
    cout << "Hello";
    cout << "World";
    cout << endl;
    return 0;
}', ARRAY['"cout은 자동으로 줄바꿈하지 않으므로 HelloWorld가 한 줄에 출력된다"', '"두 번째 cout이 첫 번째 출력을 덮어쓴다"', '"endl이 없으면 오류가 발생한다"', '"cout은 문자열을 한 번에 하나만 출력할 수 있다"'], 0, 'cout은 출력 후 자동으로 줄바꿈하지 않습니다. endl(또는 \n)을 명시해야만 줄이 바뀝니다. 따라서 Hello와 World는 같은 줄에 붙어서 HelloWorld로 출력됩니다.', 'cout은 자동 줄바꿈 없음', 'cout은 값을 출력만 하고 자동으로 줄바꿈하지 않습니다. 줄바꿈이 필요하면 endl 또는 \"\\n\"을 명시해야 합니다.', ARRAY['"cout"', '"endl"', '"줄바꿈"'], NULL, NULL),
(10764, 'cpp', 'cpp-10', '어려움', '다음 코드 실행 후 벡터 v의 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto x : v) {
        x = x * 2;
    }
    for (auto x : v) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}', ARRAY['"1 2 3 4 5 "', '"2 4 6 8 10 "', '"오류"', '"0 0 0 0 0 "'], 0, '`for (auto x : v)`에서 x는 원본의 복사본입니다. x를 수정해도 벡터 원본에는 영향이 없습니다. 원본을 수정하려면 `auto& x`(참조)를 사용해야 합니다.', 'range-for 값 복사 함정', '`for(auto x : v)`는 각 원소의 복사본을 x에 저장합니다. x를 바꿔도 원본 v는 변하지 않습니다. 원본 수정이 필요하면 `for(auto& x : v)`를 사용합니다.', ARRAY['"range-for"', '"값 복사"', '"auto"'], NULL, NULL),
(10765, 'cpp', 'cpp-10', '어려움', '다음 코드 실행 후 출력 결과는?', '#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    for (auto& x : v) {
        x *= 2;
    }
    for (auto x : v) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}', ARRAY['"2 4 6 8 10 "', '"1 2 3 4 5 "', '"0 0 0 0 0 "', '"오류"'], 0, '`auto& x`는 원본 원소의 참조입니다. x를 수정하면 벡터 원본도 수정됩니다. `auto x`(복사)와 달리 `auto& x`(참조)는 원본을 직접 바꿀 수 있습니다.', 'range-for 참조(auto&) — 원본 수정', '`for(auto& x : v)`는 x가 원본의 참조이므로 x를 수정하면 v도 바뀝니다. `for(auto x : v)`(복사)와 `for(auto& x : v)`(참조)의 차이를 반드시 구분하세요.', ARRAY['"range-for"', '"참조"', '"auto&"'], NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  updated_at = NOW();
