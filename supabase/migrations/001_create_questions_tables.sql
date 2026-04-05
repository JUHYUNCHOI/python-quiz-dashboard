-- ============================================================
-- 001_create_questions_tables.sql
-- Supabase SQL Editor에서 순서대로 실행
-- ============================================================

-- ── 1. questions 테이블 ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
  id                      INT PRIMARY KEY,
  -- 'python' | 'cpp' | 'pseudo' | 'algo' (향후 확장)
  language                TEXT NOT NULL,
  -- Python: '1'~'52', C++: 'cpp-1'~'cpp-p3', 'algo-preview' 등
  lesson_id               TEXT NOT NULL,
  difficulty              TEXT NOT NULL CHECK (difficulty IN ('쉬움', '보통', '어려움')),
  question                TEXT NOT NULL,
  code                    TEXT,
  options                 TEXT[] NOT NULL,      -- 4개 선택지
  correct_answer          SMALLINT NOT NULL,    -- 0-based index (0~3)
  explanation             TEXT,
  key_concept_title       TEXT,
  key_concept_description TEXT,
  related_topics          TEXT[],
  animation_key           TEXT,
  code_comparison         JSONB,               -- {wrong: string, correct: string}
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. question_mastery 테이블 (간격반복 상태) ────────────────
CREATE TABLE IF NOT EXISTS question_mastery (
  user_id         UUID     NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id     INT      NOT NULL REFERENCES questions(id),
  box             SMALLINT NOT NULL DEFAULT 1 CHECK (box BETWEEN 1 AND 5),
  correct_count   INT      NOT NULL DEFAULT 0,
  incorrect_count INT      NOT NULL DEFAULT 0,
  next_review_at  TIMESTAMPTZ,
  last_seen_at    TIMESTAMPTZ,
  PRIMARY KEY (user_id, question_id)
);

-- ── 3. 인덱스 ────────────────────────────────────────────────
-- 퀴즈 선택기: 언어 + 레슨 필터
CREATE INDEX IF NOT EXISTS idx_questions_lang_lesson
  ON questions(language, lesson_id);

-- 난이도 필터
CREATE INDEX IF NOT EXISTS idx_questions_difficulty
  ON questions(difficulty);

-- 복습 큐: 유저별 다음 복습 예정 문제
CREATE INDEX IF NOT EXISTS idx_mastery_user_next_review
  ON question_mastery(user_id, next_review_at);

-- 선생님 대시보드: 약점 문제 집계
CREATE INDEX IF NOT EXISTS idx_mastery_question_stats
  ON question_mastery(question_id, incorrect_count DESC);

-- ── 4. RLS 활성화 ─────────────────────────────────────────────
ALTER TABLE questions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_mastery ENABLE ROW LEVEL SECURITY;

-- questions: 로그인한 사용자만 읽기 가능 (쓰기 불가)
CREATE POLICY "authenticated users can read questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

-- question_mastery: 본인 데이터만 전체 접근
CREATE POLICY "users manage own mastery"
  ON question_mastery FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── 5. updated_at 자동 갱신 트리거 ───────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
