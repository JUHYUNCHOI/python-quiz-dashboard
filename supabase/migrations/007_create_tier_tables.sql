-- ============================================================
-- 007_create_tier_tables.sql
-- 티어 시스템 (배치고사 결과 + 채점 통과 기록 + 반별 리더보드)
-- ⚠️ 재실행 안전: IF NOT EXISTS / DROP IF EXISTS 처리됨
-- Supabase SQL Editor에서 실행
-- ============================================================

-- ── 1. tier_state: 학생당 한 줄 ───────────────────────────────
CREATE TABLE IF NOT EXISTS tier_state (
  user_id   UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier      TEXT        NOT NULL,
  -- 지금 티어에 들어온 시각. 승급 카운트의 기준점이라 NOT NULL.
  since     TIMESTAMPTZ NOT NULL,
  placed_at TIMESTAMPTZ,
  history   JSONB       NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. tier_verified_solves: 테스트케이스 전체 통과 기록 ──────
-- problem_id 에 FK 를 걸지 않는다. 승급 대상 문제는 코드 쪽 문제 은행
-- (data/practice)에서 오고, practice_problems 테이블에는 그 전부가
-- 적재돼 있지 않다. FK 를 걸면 기록이 조용히 실패한다.
CREATE TABLE IF NOT EXISTS tier_verified_solves (
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT        NOT NULL,
  solved_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, problem_id)
);

CREATE INDEX IF NOT EXISTS idx_tier_verified_solves_user
  ON tier_verified_solves(user_id, solved_at);

-- ── 3. RLS — 남의 티어를 직접 읽거나 쓸 수 없다 ───────────────
-- 리더보드는 아래 SECURITY DEFINER 함수로만 본다. 테이블을 열어 두면
-- 반이 아닌 사람의 기록까지 긁을 수 있다.
ALTER TABLE tier_state           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tier_verified_solves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users manage own tier state"  ON tier_state;
DROP POLICY IF EXISTS "users manage own tier solves" ON tier_verified_solves;

CREATE POLICY "users manage own tier state"
  ON tier_state FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users manage own tier solves"
  ON tier_verified_solves FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── 4. 반별 리더보드 ──────────────────────────────────────────
-- 왜 SECURITY DEFINER 인가: class_members 의 RLS 는 학생에게 "내 가입
-- 기록"만 보여준다. 그래서 클라이언트에서 같은 반 친구 목록을 못 읽는다.
-- 반 범위를 함수 안에서 못박고, 내보내는 열은 이름·티어·통과 기록으로
-- 제한한다.
--
-- 왜 승급 개수가 아니라 solve id 배열을 돌려주는가: 어떤 문제가 어떤
-- 티어인지는 코드 쪽(ladder + 문제 은행)만 안다. DB 에 티어 구간을
-- 복제하면 두 곳이 갈라진다. 그래서 "티어에 들어온 뒤의 통과 id" 만
-- 주고 집계는 호출하는 쪽에서 한다.
CREATE OR REPLACE FUNCTION public.get_class_tier_leaderboard(p_class_id UUID DEFAULT NULL)
RETURNS TABLE (
  class_id      UUID,
  class_name    TEXT,
  student_id    UUID,
  display_name  TEXT,
  tier          TEXT,
  since         TIMESTAMPTZ,
  recent_solves TEXT[]
)
LANGUAGE sql SECURITY DEFINER STABLE
SET search_path = public
AS $$
  SELECT
    c.id,
    c.name,
    cm.student_id,
    -- 빈 이름은 빈 문자열로 내보낸다. 여기서 '학생' 같은 기본값을 박으면
    -- 영어로 봐도 한국어가 나온다 — 대체 이름은 화면에서 t() 로 붙인다.
    COALESCE(p.display_name, ''),
    ts.tier,
    ts.since,
    COALESCE(
      ARRAY(
        SELECT vs.problem_id
        FROM tier_verified_solves vs
        WHERE vs.user_id = cm.student_id
          AND vs.solved_at >= ts.since
      ),
      '{}'
    )
  FROM class_members cm
  JOIN classes c  ON c.id = cm.class_id
  JOIN profiles p ON p.id = cm.student_id
  JOIN tier_state ts ON ts.user_id = cm.student_id
  WHERE (p_class_id IS NULL OR cm.class_id = p_class_id)
    AND (
      -- 내가 속한 반
      cm.class_id IN (SELECT class_id FROM class_members WHERE student_id = auth.uid())
      -- 또는 내가 가르치는 반
      OR c.teacher_id = auth.uid()
    );
$$;

REVOKE ALL ON FUNCTION public.get_class_tier_leaderboard(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_class_tier_leaderboard(UUID) TO authenticated;
