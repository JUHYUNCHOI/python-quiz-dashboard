#!/usr/bin/env python3
"""
page.tsx에서 lessonsData를 추출하여 개별 파일로 분리하는 스크립트
"""
import re
import os

# 경로 설정
BASE_DIR = '/Users/juhyunchoi/Downloads/python-quiz-dashboard'
PAGE_FILE = f'{BASE_DIR}/app/learn/[lessonId]/page.tsx'
OUTPUT_DIR = f'{BASE_DIR}/app/learn/[lessonId]/data/lessons'

# 출력 디렉토리 생성
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 파일 읽기
with open(PAGE_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"파일 크기: {len(content):,} bytes")

# lessonsData 시작 찾기
lessons_start = content.find('const lessonsData: Record<string, LessonData> = {')
if lessons_start == -1:
    print("ERROR: lessonsData를 찾을 수 없습니다.")
    exit(1)

print(f"lessonsData 시작: {lessons_start}")

# 중괄호 매칭으로 lessonsData 끝 찾기
def find_matching_brace(text, start):
    """중괄호 매칭으로 객체 끝 위치 찾기"""
    depth = 0
    i = start
    in_string = False
    string_char = None
    escape_next = False
    
    while i < len(text):
        char = text[i]
        
        if escape_next:
            escape_next = False
            i += 1
            continue
            
        if char == '\\' and in_string:
            escape_next = True
            i += 1
            continue
            
        if char in '"\'`':
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
                string_char = None
            i += 1
            continue
            
        if in_string:
            i += 1
            continue
            
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1

# lessonsData 객체의 시작 중괄호 위치 찾기
brace_start = content.find('{', lessons_start)
lessons_end = find_matching_brace(content, brace_start)

if lessons_end == -1:
    print("ERROR: lessonsData 끝을 찾을 수 없습니다.")
    exit(1)

print(f"lessonsData 끝: {lessons_end}")

# lessonsData 전체 추출
lessons_data_str = content[brace_start:lessons_end+1]
print(f"lessonsData 크기: {len(lessons_data_str):,} bytes")

# 각 레슨 추출 (레슨 ID 패턴으로)
lesson_ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'p1', 'p2', 'p3']
extracted_lessons = {}

for lesson_id in lesson_ids:
    # 레슨 시작 패턴 찾기
    pattern = f'"{lesson_id}"' + r':\s*\{[\s\n]*id:\s*"' + lesson_id + '"'
    match = re.search(pattern, lessons_data_str)
    
    if match:
        # 레슨 객체 시작 위치
        obj_start = lessons_data_str.find('{', match.start())
        obj_end = find_matching_brace(lessons_data_str, obj_start)
        
        if obj_end != -1:
            lesson_content = lessons_data_str[obj_start:obj_end+1]
            extracted_lessons[lesson_id] = lesson_content
            print(f"✓ Lesson {lesson_id}: {len(lesson_content):,} bytes")
        else:
            print(f"✗ Lesson {lesson_id}: 끝을 찾을 수 없음")
    else:
        print(f"✗ Lesson {lesson_id}: 시작을 찾을 수 없음")

# 각 레슨을 개별 파일로 저장
for lesson_id, lesson_content in extracted_lessons.items():
    filename = f"lesson{lesson_id}.ts" if lesson_id.isdigit() else f"{lesson_id}.ts"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    file_content = f'''import {{ LessonData }} from '../types';

export const lesson{lesson_id}: LessonData = {lesson_content};
'''
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(file_content)
    
    print(f"  → 저장: {filename}")

# index.ts 생성
index_content = '''// Auto-generated lesson exports
'''

for lesson_id in lesson_ids:
    if lesson_id in extracted_lessons:
        filename = f"lesson{lesson_id}" if lesson_id.isdigit() else lesson_id
        index_content += f"import {{ lesson{lesson_id} }} from './{filename}';\n"

index_content += '''
import { LessonData } from '../types';

export const lessonsData: Record<string, LessonData> = {
'''

for lesson_id in lesson_ids:
    if lesson_id in extracted_lessons:
        index_content += f'  "{lesson_id}": lesson{lesson_id},\n'

index_content += '''}

export default lessonsData;
'''

index_filepath = os.path.join(OUTPUT_DIR, 'index.ts')
with open(index_filepath, 'w', encoding='utf-8') as f:
    f.write(index_content)

print(f"\n✓ index.ts 생성 완료")
print(f"\n총 {len(extracted_lessons)}개 레슨 추출 완료!")
print(f"출력 디렉토리: {OUTPUT_DIR}")
