-- practice_sessions: 학생의 연습 라운드별 결과
create table if not exists practice_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  cluster_id text not null,
  round integer not null default 1,
  problems_attempted integer not null default 0,
  problems_passed integer not null default 0,
  opted_out boolean not null default false,
  teacher_assigned boolean not null default false,  -- 선생님이 추가 배정한 라운드
  problem_ids text[] not null default '{}',          -- 이 라운드에 출제된 문제 IDs
  passed_problem_ids text[] not null default '{}',   -- 이 라운드에 통과한 문제 IDs
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- RLS
alter table practice_sessions enable row level security;

-- 학생: 본인 세션만 읽기/쓰기
create policy "students can manage own sessions"
  on practice_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 선생님: 자기 반 학생 세션 읽기 + 추가 배정 쓰기
create policy "teachers can read student sessions"
  on practice_sessions for select
  using (
    exists (
      select 1 from class_members cm
      join classes c on c.id = cm.class_id
      where cm.student_id = practice_sessions.user_id
        and c.teacher_id = auth.uid()
    )
  );

create policy "teachers can assign extra rounds"
  on practice_sessions for insert
  with check (
    teacher_assigned = true
    and exists (
      select 1 from class_members cm
      join classes c on c.id = cm.class_id
      where cm.student_id = practice_sessions.user_id
        and c.teacher_id = auth.uid()
    )
  );

-- 인덱스
create index if not exists practice_sessions_user_cluster on practice_sessions(user_id, cluster_id);
create index if not exists practice_sessions_teacher_lookup on practice_sessions(cluster_id, user_id, completed_at);
