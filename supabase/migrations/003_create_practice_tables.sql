-- ============================================================
-- 003_create_practice_tables.sql
-- 코딩 연습 문제 시스템 (클러스터 + 문제 + 학생 진도)
-- ⚠️ 재실행 안전: IF NOT EXISTS / DROP IF EXISTS 처리됨
-- Supabase SQL Editor에서 실행
-- ============================================================

-- ── 1. practice_clusters 테이블 ──────────────────────────────
CREATE TABLE IF NOT EXISTS practice_clusters (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  emoji        TEXT NOT NULL DEFAULT '📝',
  description  TEXT NOT NULL DEFAULT '',
  unlock_after TEXT NOT NULL,
  language     TEXT NOT NULL DEFAULT 'cpp' CHECK (language IN ('cpp', 'python')),
  sort_order   INT  NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. practice_problems 테이블 ──────────────────────────────
CREATE TABLE IF NOT EXISTS practice_problems (
  id                   TEXT PRIMARY KEY,
  cluster_id           TEXT NOT NULL REFERENCES practice_clusters(id) ON DELETE CASCADE,
  unlock_after         TEXT NOT NULL,
  difficulty           TEXT NOT NULL CHECK (difficulty IN ('쉬움', '보통', '어려움')),
  title                TEXT NOT NULL,
  description          TEXT NOT NULL,
  constraints          TEXT NOT NULL DEFAULT '',
  initial_code         TEXT NOT NULL DEFAULT '',
  test_cases           JSONB NOT NULL DEFAULT '[]',
  hints                TEXT[] NOT NULL DEFAULT '{}',
  solution_code        TEXT NOT NULL DEFAULT '',
  solution_explanation TEXT NOT NULL DEFAULT '',
  language             TEXT NOT NULL DEFAULT 'cpp' CHECK (language IN ('cpp', 'python')),
  sort_order           INT  NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. practice_progress 테이블 ──────────────────────────────
CREATE TABLE IF NOT EXISTS practice_progress (
  user_id         UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id      TEXT    NOT NULL REFERENCES practice_problems(id) ON DELETE CASCADE,
  solved          BOOLEAN NOT NULL DEFAULT FALSE,
  starred         BOOLEAN NOT NULL DEFAULT FALSE,
  attempts        INT     NOT NULL DEFAULT 0,
  solved_at       TIMESTAMPTZ,
  last_attempt_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, problem_id)
);

-- ── 4. 인덱스 ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_practice_problems_cluster
  ON practice_problems(cluster_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_practice_clusters_language
  ON practice_clusters(language, sort_order);

CREATE INDEX IF NOT EXISTS idx_practice_problems_unlock
  ON practice_problems(unlock_after);

CREATE INDEX IF NOT EXISTS idx_practice_progress_user
  ON practice_progress(user_id, solved);

-- ── 5. RLS 활성화 ─────────────────────────────────────────────
ALTER TABLE practice_clusters  ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_problems  ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_progress  ENABLE ROW LEVEL SECURITY;

-- ⚠️ 기존 정책 있으면 먼저 삭제 후 재생성 (재실행 안전)
DROP POLICY IF EXISTS "authenticated users can read clusters"  ON practice_clusters;
DROP POLICY IF EXISTS "teachers can manage clusters"           ON practice_clusters;
DROP POLICY IF EXISTS "authenticated users can read problems"  ON practice_problems;
DROP POLICY IF EXISTS "teachers can manage problems"           ON practice_problems;
DROP POLICY IF EXISTS "users manage own practice progress"     ON practice_progress;
DROP POLICY IF EXISTS "teachers can read all progress"         ON practice_progress;

CREATE POLICY "authenticated users can read clusters"
  ON practice_clusters FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated users can read problems"
  ON practice_problems FOR SELECT TO authenticated USING (true);

CREATE POLICY "users manage own practice progress"
  ON practice_progress FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "teachers can read all progress"
  ON practice_progress FOR SELECT TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'teacher'
  );

CREATE POLICY "teachers can manage clusters"
  ON practice_clusters FOR ALL TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'teacher'
  );

CREATE POLICY "teachers can manage problems"
  ON practice_problems FOR ALL TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'teacher'
  );

-- ── 6. updated_at 자동 갱신 트리거 ───────────────────────────
-- update_updated_at() 함수는 001_create_questions_tables.sql에서 이미 정의됨

DROP TRIGGER IF EXISTS practice_clusters_updated_at ON practice_clusters;
DROP TRIGGER IF EXISTS practice_problems_updated_at ON practice_problems;

CREATE TRIGGER practice_clusters_updated_at
  BEFORE UPDATE ON practice_clusters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER practice_problems_updated_at
  BEFORE UPDATE ON practice_problems
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
