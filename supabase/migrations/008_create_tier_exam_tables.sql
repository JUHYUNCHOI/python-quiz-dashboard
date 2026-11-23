-- ============================================================
-- 008_create_tier_exam_tables.sql
-- 승급 시험 — 선생님이 반 단위로 "시험 창"을 열고, 학생은 그 동안만 응시
-- ⚠️ 재실행 안전: IF NOT EXISTS / DROP IF EXISTS 처리됨
-- Supabase SQL Editor에서 실행 (007 먼저 실행되어 있어야 함)
-- ============================================================

-- ── 1. tier_exam_windows: 선생님이 연 시험 시간 ────────────────
-- 왜 필요한가: 승급 시험 규칙이 "인터넷 검색·AI 사용 없이"다. 웹앱은 그걸
-- 막을 수 없으므로, 실제로 지키게 하는 장치는 "교실에 선생님이 있는 동안만
-- 시험이 열린다"는 것뿐이다. 그래서 응시 가능 여부를 학생이 아니라 반에 둔다.
CREATE TABLE IF NOT EXISTS tier_exam_windows (
  id        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id  UUID        NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  opened_by UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- 닫는 시각. 창을 "닫는다"는 건 이 값을 지금으로 당기는 것이다 —
  -- 행을 지우면 그 시험을 본 응시 기록까지 CASCADE 로 사라진다.
  closes_at TIMESTAMPTZ NOT NULL,
  minutes   INT         NOT NULL DEFAULT 40
);

CREATE INDEX IF NOT EXISTS idx_tier_exam_windows_open
  ON tier_exam_windows(class_id, closes_at DESC);

-- ── 2. tier_exam_attempts: 학생 한 명의 응시 1회 ───────────────
-- 한 시험 창에서 한 학생은 한 번만 — 새로고침으로 문제를 다시 뽑을 수 없다.
-- problem_id 에 FK 를 걸지 않는 이유는 007 과 같다(문제 은행이 코드 쪽에 있음).
CREATE TABLE IF NOT EXISTS tier_exam_attempts (
  window_id   UUID        NOT NULL REFERENCES tier_exam_windows(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier        TEXT        NOT NULL,
  problem_ids TEXT[]      NOT NULL,
  started_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deadline    TIMESTAMPTZ NOT NULL,
  score       INT         NOT NULL DEFAULT 0,
  finished_at TIMESTAMPTZ,
  -- NULL = 아직 채점 전. 선생님 화면에서 "응시 중"과 "불합격"을 구분한다.
  passed      BOOLEAN,
  PRIMARY KEY (window_id, user_id)
);

-- ── 3. RLS ────────────────────────────────────────────────────
ALTER TABLE tier_exam_windows  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tier_exam_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "teachers manage own class exam windows" ON tier_exam_windows;
DROP POLICY IF EXISTS "students read own class exam windows"   ON tier_exam_windows;
DROP POLICY IF EXISTS "students manage own exam attempts"      ON tier_exam_attempts;
DROP POLICY IF EXISTS "teachers read own class exam attempts"  ON tier_exam_attempts;

-- 선생님: 자기가 가르치는 반의 창만 열고 닫는다.
CREATE POLICY "teachers manage own class exam windows"
  ON tier_exam_windows FOR ALL TO authenticated
  USING      (class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid()))
  WITH CHECK (class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid()));

-- 학생: 자기 반의 창을 읽기만. 쓰기를 열면 학생이 스스로 시험을 열 수 있다.
CREATE POLICY "students read own class exam windows"
  ON tier_exam_windows FOR SELECT TO authenticated
  USING (class_id IN (SELECT class_id FROM class_members WHERE student_id = auth.uid()));

-- 학생: 자기 응시 기록만. 점수를 손으로 쓸 수 있지만 그건 localStorage 도
-- 마찬가지고, 승급의 실질적 방어선은 교실에 선생님이 있다는 사실이다.
CREATE POLICY "students manage own exam attempts"
  ON tier_exam_attempts FOR ALL TO authenticated
  USING      (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 선생님: 자기 반 시험의 응시 현황을 읽는다.
CREATE POLICY "teachers read own class exam attempts"
  ON tier_exam_attempts FOR SELECT TO authenticated
  USING (window_id IN (
    SELECT w.id FROM tier_exam_windows w
    JOIN classes c ON c.id = w.class_id
    WHERE c.teacher_id = auth.uid()
  ));
