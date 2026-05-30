-- ============================================================
-- 005: 틀린 문제 창고 (wrong_question_bank)
-- ============================================================
-- 학생이 복습에서 틀린 문제를 저장. 나중에 /missed 페이지에서 다시 풀어볼 수 있음.
-- localStorage 의 "wrong-question-bank-v1" 과 동기화.
-- 양쪽 (local + DB) 동시 업데이트. updated_at 기준 conflict resolution.

CREATE TABLE IF NOT EXISTS public.wrong_question_bank (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id    text NOT NULL,
  step_index   integer NOT NULL,
  added_at     timestamptz NOT NULL DEFAULT now(),
  mastered     boolean NOT NULL DEFAULT false,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id, step_index)
);

-- 빠른 사용자 별 조회 — 한 학생의 전체 창고 가져오기
CREATE INDEX IF NOT EXISTS idx_wrong_bank_user
  ON public.wrong_question_bank (user_id);

-- 미마스터 항목 우선 (학생이 풀어야 할 것)
CREATE INDEX IF NOT EXISTS idx_wrong_bank_user_unmastered
  ON public.wrong_question_bank (user_id, mastered);

-- RLS — 학생 본인 데이터만 read/write
ALTER TABLE public.wrong_question_bank ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wrong_bank_own_read"
  ON public.wrong_question_bank
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "wrong_bank_own_insert"
  ON public.wrong_question_bank
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wrong_bank_own_update"
  ON public.wrong_question_bank
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wrong_bank_own_delete"
  ON public.wrong_question_bank
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 선생님은 학생 데이터 read 가능 (학생 진도 보기용)
-- profiles.role === 'teacher' 인 사용자가 같은 반 학생 데이터 조회 가능
-- (현재는 학생 본인만 — 선생님 권한 정책은 별도 필요 시 추가)

-- 자동 updated_at 업데이트
CREATE OR REPLACE FUNCTION public.touch_wrong_bank_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_wrong_bank_touch
  BEFORE UPDATE ON public.wrong_question_bank
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_wrong_bank_updated_at();

COMMENT ON TABLE public.wrong_question_bank IS '학생이 복습에서 틀린 문제 보관. localStorage 와 동기화.';
COMMENT ON COLUMN public.wrong_question_bank.lesson_id IS '레슨 ID (cpp-2, 5, pseudo-3 등)';
COMMENT ON COLUMN public.wrong_question_bank.step_index IS 'reviewSteps 배열 안 인덱스';
COMMENT ON COLUMN public.wrong_question_bank.mastered IS '마스터 (정답 또는 수동 제거) 여부';
