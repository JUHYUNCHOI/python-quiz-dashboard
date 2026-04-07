-- ============================================================
-- 003_create_practice_tables.sql
-- 코딩 연습 문제 시스템 (클러스터 + 문제 + 학생 진도)
-- Supabase SQL Editor에서 실행
-- ============================================================

-- ── 1. practice_clusters 테이블 ──────────────────────────────
CREATE TABLE IF NOT EXISTS practice_clusters (
  id           TEXT PRIMARY KEY,           -- "loops", "arrays", "simulation" 등
  title        TEXT NOT NULL,              -- "반복문 패턴"
  emoji        TEXT NOT NULL DEFAULT '📝',
  description  TEXT NOT NULL DEFAULT '',
  unlock_after TEXT NOT NULL,              -- "cpp-7" | "14" (Python lessonId)
  language     TEXT NOT NULL DEFAULT 'cpp' CHECK (language IN ('cpp', 'python')),
  sort_order   INT  NOT NULL DEFAULT 0,    -- 표시 순서
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. practice_problems 테이블 ──────────────────────────────
CREATE TABLE IF NOT EXISTS practice_problems (
  id                  TEXT PRIMARY KEY,    -- "loop-001", "arr-005" 등
  cluster_id          TEXT NOT NULL REFERENCES practice_clusters(id) ON DELETE CASCADE,
  unlock_after        TEXT NOT NULL,       -- 개별 문제 잠금 기준 (클러스터와 다를 수 있음)
  difficulty          TEXT NOT NULL CHECK (difficulty IN ('쉬움', '보통', '어려움')),
  title               TEXT NOT NULL,
  description         TEXT NOT NULL,
  constraints         TEXT NOT NULL DEFAULT '',
  initial_code        TEXT NOT NULL DEFAULT '',
  test_cases          JSONB NOT NULL DEFAULT '[]',  -- [{stdin, expectedOutput, label?}]
  hints               TEXT[] NOT NULL DEFAULT '{}', -- 순서대로 공개할 힌트
  solution_code       TEXT NOT NULL DEFAULT '',
  solution_explanation TEXT NOT NULL DEFAULT '',
  language            TEXT NOT NULL DEFAULT 'cpp' CHECK (language IN ('cpp', 'python')),
  sort_order          INT  NOT NULL DEFAULT 0,       -- 클러스터 내 순서
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. practice_progress 테이블 (학생 풀이 진도) ─────────────
-- 기존 localStorage(practice-solved, practice-starred) 대체
CREATE TABLE IF NOT EXISTS practice_progress (
  user_id      UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id   TEXT    NOT NULL REFERENCES practice_problems(id) ON DELETE CASCADE,
  solved       BOOLEAN NOT NULL DEFAULT FALSE,
  starred      BOOLEAN NOT NULL DEFAULT FALSE,
  attempts     INT     NOT NULL DEFAULT 0,
  solved_at    TIMESTAMPTZ,
  last_attempt_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, problem_id)
);

-- ── 4. 인덱스 ────────────────────────────────────────────────
-- 클러스터별 문제 조회 (순서 포함)
CREATE INDEX IF NOT EXISTS idx_practice_problems_cluster
  ON practice_problems(cluster_id, sort_order);

-- 언어별 클러스터 조회
CREATE INDEX IF NOT EXISTS idx_practice_clusters_language
  ON practice_clusters(language, sort_order);

-- unlock_after 기준 조회 (잠금 해제 체크용)
CREATE INDEX IF NOT EXISTS idx_practice_problems_unlock
  ON practice_problems(unlock_after);

-- 학생 진도 조회
CREATE INDEX IF NOT EXISTS idx_practice_progress_user
  ON practice_progress(user_id, solved);

-- ── 5. RLS 활성화 ─────────────────────────────────────────────
ALTER TABLE practice_clusters  ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_problems  ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_progress  ENABLE ROW LEVEL SECURITY;

-- practice_clusters: 모든 인증 사용자 읽기 가능
CREATE POLICY "authenticated users can read clusters"
  ON practice_clusters FOR SELECT
  TO authenticated
  USING (true);

-- practice_problems: 모든 인증 사용자 읽기 가능
CREATE POLICY "authenticated users can read problems"
  ON practice_problems FOR SELECT
  TO authenticated
  USING (true);

-- practice_progress: 본인 데이터만 전체 접근
CREATE POLICY "users manage own practice progress"
  ON practice_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 선생님은 모든 학생 진도 읽기 가능 (대시보드용)
CREATE POLICY "teachers can read all progress"
  ON practice_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'teacher'
    )
  );

-- 선생님은 clusters/problems 쓰기 가능
CREATE POLICY "teachers can manage clusters"
  ON practice_clusters FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'teacher'
    )
  );

CREATE POLICY "teachers can manage problems"
  ON practice_problems FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'teacher'
    )
  );

-- ── 6. updated_at 자동 갱신 트리거 ───────────────────────────
CREATE TRIGGER practice_clusters_updated_at
  BEFORE UPDATE ON practice_clusters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER practice_problems_updated_at
  BEFORE UPDATE ON practice_problems
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
