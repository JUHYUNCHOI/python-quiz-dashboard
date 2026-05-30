-- ============================================================
-- 006: 틀린 문제 창고 — Spaced Repetition (간격 반복)
-- ============================================================
-- 우연/암기 배제 위해 마스터 기준 강화:
--   ① 두 번 연속 정답 (correct_streak >= 2)
--   ② 두 번째 정답 ≥ 24h 후 (last_correct_at + 24h <= now)
--   ③ 학생 수동 dismiss (조건 무시 — 자기 판단)
--
-- 오답 시: correct_streak 0 리셋
-- 한 번에 두 번 맞춰도 마스터 X (시간 경과 필요)

ALTER TABLE public.wrong_question_bank
  ADD COLUMN IF NOT EXISTS correct_streak INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_correct_at TIMESTAMPTZ;

COMMENT ON COLUMN public.wrong_question_bank.correct_streak IS '연속 정답 수 (오답 시 0 리셋)';
COMMENT ON COLUMN public.wrong_question_bank.last_correct_at IS '마지막 정답 시각 — 24h gap 체크';
