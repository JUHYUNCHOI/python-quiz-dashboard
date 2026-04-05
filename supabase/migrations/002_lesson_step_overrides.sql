-- 레슨 스텝 콘텐츠 오버라이드 테이블
-- 선생님이 UI에서 수정한 내용을 TS 파일 기본값 위에 덮어씌움
CREATE TABLE IF NOT EXISTS lesson_step_overrides (
  lesson_id   text NOT NULL,
  step_id     text NOT NULL,
  overrides   jsonb NOT NULL DEFAULT '{}',
  updated_at  timestamptz DEFAULT now(),
  PRIMARY KEY (lesson_id, step_id)
);

-- 모든 인증 유저가 읽기 가능, 쓰기는 teacher만
ALTER TABLE lesson_step_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read overrides"
  ON lesson_step_overrides FOR SELECT
  USING (true);

CREATE POLICY "Teachers can write overrides"
  ON lesson_step_overrides FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'teacher'
    )
  );
