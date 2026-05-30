-- ============================================
-- Python 퀴즈 감사: 중복 + 충분량 + 분포
-- Supabase Dashboard → SQL Editor 에서 순서대로 실행
-- ============================================

-- 1. 전체 / 레슨별 분포 (충분량 한눈 보기)
SELECT
  lesson_id,
  COUNT(*) AS total,
  SUM(CASE WHEN difficulty = '쉬움' THEN 1 ELSE 0 END) AS easy,
  SUM(CASE WHEN difficulty = '보통' THEN 1 ELSE 0 END) AS med,
  SUM(CASE WHEN difficulty = '어려움' THEN 1 ELSE 0 END) AS hard,
  CASE
    WHEN COUNT(*) < 5  THEN '🚨 매우부족'
    WHEN COUNT(*) < 10 THEN '⚠️ 부족'
    WHEN COUNT(*) < 15 THEN '🟡 보강권장'
    ELSE '✅ OK'
  END AS verdict
FROM questions
WHERE language = 'python'
GROUP BY lesson_id
ORDER BY
  CASE WHEN lesson_id ~ '^[0-9]+$' THEN lesson_id::int ELSE 999 END,
  lesson_id;

-- 2. 전체 합계
SELECT COUNT(*) AS python_total FROM questions WHERE language = 'python';

-- 3. 누락 레슨 (1~52 중에 없는 것)
WITH expected AS (
  SELECT generate_series(1, 52)::text AS lesson_id
), have AS (
  SELECT DISTINCT lesson_id FROM questions WHERE language = 'python'
)
SELECT e.lesson_id AS missing_lesson_id
FROM expected e
LEFT JOIN have h ON h.lesson_id = e.lesson_id
WHERE h.lesson_id IS NULL
ORDER BY e.lesson_id::int;

-- 4. 🚨 완전동일 질문 (text 정확히 같음)
SELECT
  question,
  COUNT(*)               AS dup_count,
  array_agg(id ORDER BY id)         AS ids,
  array_agg(lesson_id ORDER BY id)  AS lesson_ids
FROM questions
WHERE language = 'python'
GROUP BY question
HAVING COUNT(*) > 1
ORDER BY dup_count DESC, question
LIMIT 30;

-- 5. 🚨 질문 + 코드 동일 (확실한 중복)
SELECT
  LEFT(question, 80)     AS question_preview,
  LEFT(code, 60)         AS code_preview,
  COUNT(*)               AS dup_count,
  array_agg(id ORDER BY id)         AS ids,
  array_agg(lesson_id ORDER BY id)  AS lesson_ids
FROM questions
WHERE language = 'python'
GROUP BY question, code
HAVING COUNT(*) > 1
ORDER BY dup_count DESC
LIMIT 30;

-- 6. ⚠️ 동일 코드 + 다른 질문 (약한 중복 — 같은 코드로 다른 거 묻는지 확인)
SELECT
  LEFT(code, 70)         AS code_preview,
  COUNT(*)               AS dup_count,
  array_agg(id ORDER BY id)         AS ids,
  array_agg(lesson_id ORDER BY id)  AS lesson_ids,
  array_agg(LEFT(question, 50) ORDER BY id) AS question_previews
FROM questions
WHERE language = 'python' AND code IS NOT NULL AND length(code) > 15
GROUP BY code
HAVING COUNT(*) > 1
ORDER BY dup_count DESC
LIMIT 30;

-- 7. ⚠️ 동일 질문 prefix (100자) — 미세 변형 중복 후보
SELECT
  LEFT(question, 100)    AS question_prefix,
  COUNT(*)               AS dup_count,
  array_agg(id ORDER BY id)         AS ids,
  array_agg(lesson_id ORDER BY id)  AS lesson_ids
FROM questions
WHERE language = 'python'
GROUP BY LEFT(question, 100)
HAVING COUNT(*) > 1
ORDER BY dup_count DESC
LIMIT 30;
