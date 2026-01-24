#!/usr/bin/env python3
"""
레슨 데이터를 page.tsx에서 추출하여 개별 파일로 분리하는 스크립트
"""

import re
import os
import json

# 파일 경로
PAGE_TSX_PATH = '/Users/juhyunchoi/Downloads/python-quiz-dashboard/app/learn/[lessonId]/page.tsx'
LESSONS_DIR = '/Users/juhyunchoi/Downloads/python-quiz-dashboard/app/learn/[lessonId]/data/lessons'

# lessons 디렉토리 생성
os.makedirs(LESSONS_DIR, exist_ok=True)

# 파일 읽기
with open(PAGE_TSX_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# lessonsData 시작 찾기
lessons_start_match = re.search(r'const lessonsData:\s*Record<string,\s*LessonData>\s*=\s*\{', content)
if not lessons_start_match:
    print("❌ lessonsData를 찾을 수 없습니다.")
    exit(1)

lessons_start = lessons_start_match.end()
print(f"✓ lessonsData 시작: {lessons_start}")

# 각 레슨 ID 패턴 찾기
lesson_starts = []
for match in re.finditer(r'"(\d+|p\d+)":\s*\{\s*\n\s*id:\s*"\1"', content[lessons_start:]):
    lesson_id = match.group(1)
    pos = lessons_start + match.start()
    lesson_starts.append((lesson_id, pos))
    print(f"  레슨 {lesson_id} 시작: {pos}")

print(f"\n총 {len(lesson_starts)}개 레슨 발견")

def find_lesson_end(content, start_pos, next_start_pos=None):
    """중괄호 매칭으로 레슨 데이터 끝 찾기"""
    # "id": 앞의 { 찾기
    brace_start = content.rfind('{', 0, start_pos + 10)
    for i in range(start_pos, len(content)):
        if content[i] == '{':
            brace_start = i
            break
    
    depth = 0
    in_string = False
    string_char = None
    i = brace_start
    
    while i < len(content):
        char = content[i]
        
        # 문자열 처리
        if not in_string:
            if char in '"\'':
                in_string = True
                string_char = char
            elif char == '`':
                # 템플릿 리터럴
                in_string = True
                string_char = '`'
            elif char == '{':
                depth += 1
            elif char == '}':
                depth -= 1
                if depth == 0:
                    return i + 1
        else:
            if char == '\\':
                i += 1  # 이스케이프 건너뛰기
            elif char == string_char:
                if string_char == '`':
                    in_string = False
                else:
                    in_string = False
        i += 1
    
    return -1

# 각 레슨 추출
extracted = []
for idx, (lesson_id, start_pos) in enumerate(lesson_starts):
    # 다음 레슨 시작 위치 (마지막이면 None)
    next_start = lesson_starts[idx + 1][1] if idx + 1 < len(lesson_starts) else None
    
    # 레슨 데이터 끝 찾기
    end_pos = find_lesson_end(content, start_pos, next_start)
    
    if end_pos == -1:
        print(f"❌ 레슨 {lesson_id}의 끝을 찾을 수 없습니다.")
        continue
    
    # "lesson_id": { ... } 전체 추출
    lesson_key_start = content.rfind(f'"{lesson_id}":', start_pos - 20, start_pos + 5)
    if lesson_key_start == -1:
        lesson_key_start = start_pos - 10
    
    # 레슨 데이터 추출 (키 없이 값만)
    brace_start = content.find('{', lesson_key_start)
    lesson_data = content[brace_start:end_pos]
    
    # 파일로 저장
    filename = f"lesson{lesson_id}.ts"
    filepath = os.path.join(LESSONS_DIR, filename)
    
    ts_content = f'''import {{ LessonData }} from '../types';

export const lesson{lesson_id.replace('p', 'P')}: LessonData = {lesson_data};
'''
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    extracted.append(lesson_id)
    print(f"✓ 레슨 {lesson_id} 추출 완료: {filename} ({end_pos - brace_start} bytes)")

# index.ts 생성
index_content = '''// 레슨 데이터 인덱스
import { LessonsData } from '../types';

'''

for lesson_id in extracted:
    var_name = f"lesson{lesson_id.replace('p', 'P')}"
    index_content += f"import {{ {var_name} }} from './lesson{lesson_id}';\n"

index_content += '''
export const lessonsData: LessonsData = {
'''

for lesson_id in extracted:
    var_name = f"lesson{lesson_id.replace('p', 'P')}"
    index_content += f'  "{lesson_id}": {var_name},\n'

index_content += '};\n'

with open(os.path.join(LESSONS_DIR, 'index.ts'), 'w', encoding='utf-8') as f:
    f.write(index_content)

print(f"\n✅ 완료! {len(extracted)}개 레슨 파일 생성됨")
print(f"📁 위치: {LESSONS_DIR}")
