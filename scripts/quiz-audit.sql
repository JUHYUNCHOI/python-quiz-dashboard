-- 퀴즈 DB 전수 감사 SQL
-- Supabase Dashboard → SQL Editor 에서 실행
-- 각 쿼리를 따로 실행하거나 한 번에 돌려도 됨

-- ============================================
-- 1. 전체 통계
-- ============================================
SELECT
  language,
  COUNT(*) as total,
  COUNT(DISTINCT lesson_id) as unique_lessons,
  COUNT(DISTINCT difficulty) as difficulty_levels
FROM questions
GROUP BY language
ORDER BY language;

-- ============================================
-- 2. 레슨별 문제 수 (언어별)
-- ============================================
SELECT
  language,
  lesson_id,
  COUNT(*) as question_count,
  SUM(CASE WHEN difficulty = '쉬움' THEN 1 ELSE 0 END) as easy,
  SUM(CASE WHEN difficulty = '보통' THEN 1 ELSE 0 END) as medium,
  SUM(CASE WHEN difficulty = '어려움' THEN 1 ELSE 0 END) as hard
FROM questions
GROUP BY language, lesson_id
ORDER BY language, lesson_id;

-- ============================================
-- 3. 🚨 correct_answer 인덱스 오류 체크
-- (options 배열 범위 벗어난 것)
-- ============================================
SELECT
  id, language, lesson_id, difficulty,
  correct_answer,
  array_length(options, 1) as option_count,
  LEFT(question, 60) as question_preview
FROM questions
WHERE correct_answer < 0
   OR correct_answer >= array_length(options, 1);

-- ============================================
-- 4. 🚨 options 개수 비정상 (보통 4개)
-- ============================================
SELECT
  id, language, lesson_id,
  array_length(options, 1) as option_count,
  LEFT(question, 80) as question_preview
FROM questions
WHERE array_length(options, 1) NOT IN (3, 4, 5);

-- ============================================
-- 5. 🚨 설명 누락/너무 짧음
-- ============================================
SELECT
  id, language, lesson_id,
  LENGTH(COALESCE(explanation, '')) as explanation_len,
  LEFT(question, 60) as question_preview
FROM questions
WHERE explanation IS NULL
   OR LENGTH(TRIM(explanation)) < 10
ORDER BY language, lesson_id;

-- ============================================
-- 6. 🚨 질문/코드 필드 누락
-- ============================================
SELECT
  id, language, lesson_id,
  question IS NULL as question_null,
  LENGTH(COALESCE(question, '')) as question_len
FROM questions
WHERE question IS NULL OR LENGTH(TRIM(question)) < 5;

-- ============================================
-- 7. 🚨 lesson_id 누락 또는 algo-preview 검토
-- ============================================
SELECT
  lesson_id,
  COUNT(*) as count
FROM questions
WHERE lesson_id IS NULL
   OR lesson_id = ''
   OR lesson_id = 'algo-preview'
GROUP BY lesson_id;

-- ============================================
-- 8. 🚨 중복 가능성 (동일 언어 + 동일 질문 앞 100자)
-- ============================================
WITH dupes AS (
  SELECT
    language,
    LEFT(question, 100) as question_prefix,
    COUNT(*) as dup_count,
    array_agg(id ORDER BY id) as ids
  FROM questions
  GROUP BY language, LEFT(question, 100)
  HAVING COUNT(*) > 1
)
SELECT * FROM dupes ORDER BY dup_count DESC LIMIT 20;

-- ============================================
-- 9. 🚨 키 컨셉 누락
-- ============================================
SELECT
  id, language, lesson_id,
  key_concept_title IS NULL as no_title,
  key_concept_description IS NULL as no_desc
FROM questions
WHERE key_concept_title IS NULL
   OR key_concept_description IS NULL
   OR LENGTH(TRIM(key_concept_title)) < 3
   OR LENGTH(TRIM(key_concept_description)) < 10;

-- ============================================
-- 10. 🚨 EN 번역 누락 (번역된 문제만)
-- ============================================
SELECT
  language,
  COUNT(*) as total,
  SUM(CASE WHEN question_en IS NOT NULL THEN 1 ELSE 0 END) as has_en,
  SUM(CASE WHEN question_en IS NULL THEN 1 ELSE 0 END) as missing_en
FROM questions
GROUP BY language;

-- ============================================
-- 11. 🚨 animation_key 사용 여부 (애니메이션 레지스트리 참조)
-- ============================================
SELECT
  animation_key,
  language,
  COUNT(*) as count
FROM questions
WHERE animation_key IS NOT NULL AND animation_key != ''
GROUP BY animation_key, language
ORDER BY count DESC;

-- ============================================
-- 12. 🚨 Python 레슨 ID 매핑 검증
-- (CLAUDE.md에 명시된 범위: 숫자 1-52)
-- ============================================
SELECT
  lesson_id,
  COUNT(*) as count
FROM questions
WHERE language = 'python'
  AND (lesson_id !~ '^[0-9]+$'
       OR lesson_id::int > 52
       OR lesson_id::int < 1)
GROUP BY lesson_id;

-- ============================================
-- 13. 🚨 C++ 레슨 ID 매핑 검증
-- (CLAUDE.md: cpp-1~cpp-23, cpp-p1~p3)
-- ============================================
SELECT
  lesson_id,
  COUNT(*) as count
FROM questions
WHERE language = 'cpp'
  AND lesson_id NOT LIKE 'cpp-%'
  AND lesson_id != 'algo-preview'
GROUP BY lesson_id;

-- ============================================
-- 14. 난이도 분포 비대칭 (레슨별 전부 같은 난이도)
-- ============================================
SELECT
  language,
  lesson_id,
  COUNT(DISTINCT difficulty) as diff_variety,
  STRING_AGG(DISTINCT difficulty, ', ') as difficulties
FROM questions
GROUP BY language, lesson_id
HAVING COUNT(DISTINCT difficulty) = 1
ORDER BY language, lesson_id;
