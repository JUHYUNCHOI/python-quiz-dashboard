import re
import os

# 파일 읽기
with open('/Users/juhyunchoi/Downloads/python-quiz-dashboard/app/learn/[lessonId]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# lessonsData 시작과 끝 찾기
lessons_start = content.find('const lessonsData: Record<string, LessonData> = {')
if lessons_start == -1:
    print("lessonsData를 찾을 수 없습니다.")
    exit(1)

# 각 레슨 패턴 찾기 (레슨 시작점)
lesson_pattern = r'"(\d+)":\s*\{\s*id:\s*"\1",'

# 모든 레슨 시작 위치 찾기
matches = list(re.finditer(lesson_pattern, content))
print(f"Found {len(matches)} lessons")

for m in matches:
    print(f"Lesson {m.group(1)} at position {m.start()}")

# lessonsData 끝 찾기 - 마지막 레슨 뒤의 닫는 중괄호
# 간단하게 "// =============" 패턴으로 타입 정의 시작점 찾기
type_def_start = content.find('// Type definitions')
if type_def_start == -1:
    type_def_start = content.find('interface LessonData')
    if type_def_start == -1:
        type_def_start = content.find('type LessonData')

print(f"Type definition starts at: {type_def_start}")

# lessonsData 객체의 끝 찾기 (closing brace + semicolon before type definitions)
# 마지막 레슨 후 "}" 와 ";" 찾기
search_area = content[matches[-1].start():] if matches else ""
depth = 0
found_end = -1
in_string = False
escape_next = False

# 마지막 레슨부터 검색
start_pos = matches[-1].start() if matches else lessons_start
for i, char in enumerate(content[start_pos:]):
    if escape_next:
        escape_next = False
        continue
    if char == '\\':
        escape_next = True
        continue
    if char in '"\'':
        # 간단한 문자열 처리 (실제로는 더 복잡하지만)
        pass
    if char == '{':
        depth += 1
    elif char == '}':
        depth -= 1
        if depth == 0:
            # lessonsData의 끝 (마지막 레슨의 닫는 괄호 다음의 전체 객체 닫는 괄호)
            pass
        elif depth == -1:
            # 전체 lessonsData 객체 닫힘
            found_end = start_pos + i
            break

print(f"LessonsData ends at approximately: {found_end}")
print(f"Content around end: {content[found_end-50:found_end+50] if found_end > 0 else 'Not found'}")
