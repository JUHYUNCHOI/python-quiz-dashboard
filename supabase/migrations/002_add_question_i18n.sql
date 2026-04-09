-- ============================================================
-- 002_add_question_i18n.sql
-- quiz questions에 English 번역 컬럼 추가
-- Supabase SQL Editor에서 실행
-- ============================================================

ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS question_en           TEXT,
  ADD COLUMN IF NOT EXISTS explanation_en        TEXT,
  ADD COLUMN IF NOT EXISTS key_concept_title_en  TEXT,
  ADD COLUMN IF NOT EXISTS key_concept_desc_en   TEXT,
  ADD COLUMN IF NOT EXISTS options_en            TEXT[];

-- 인덱스: EN 번역 완료 여부 필터링용 (선택)
CREATE INDEX IF NOT EXISTS idx_questions_has_en
  ON questions(language) WHERE question_en IS NOT NULL;

COMMENT ON COLUMN questions.question_en          IS 'English translation of question text';
COMMENT ON COLUMN questions.explanation_en       IS 'English translation of explanation';
COMMENT ON COLUMN questions.key_concept_title_en IS 'English translation of key concept title';
COMMENT ON COLUMN questions.key_concept_desc_en  IS 'English translation of key concept description';
COMMENT ON COLUMN questions.options_en           IS 'English translation of answer options (null = use original options)';
