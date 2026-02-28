-- ============================================
-- 파이린 - Supabase DB 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 1. profiles: 사용자 정보
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'student' check (role in ('student', 'teacher')),
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles readable by authenticated users"
  on public.profiles for select to authenticated using (true);
create policy "Users can insert own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id);

-- 카카오 가입 시 자동 프로필 생성 트리거
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name',
      '학습자'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      null
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. classes: 선생님의 반
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  join_code text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index idx_classes_join_code on public.classes(join_code);
create index idx_classes_teacher_id on public.classes(teacher_id);
alter table public.classes enable row level security;

create policy "Teachers see own classes"
  on public.classes for select to authenticated
  using ((select auth.uid()) = teacher_id);
create policy "Students see classes they belong to"
  on public.classes for select to authenticated
  using (id in (
    select class_id from public.class_members
    where student_id = (select auth.uid())
  ));
create policy "Teachers create classes"
  on public.classes for insert to authenticated
  with check (
    (select auth.uid()) = teacher_id
    and exists (
      select 1 from public.profiles
      where id = (select auth.uid()) and role = 'teacher'
    )
  );
create policy "Teachers update own classes"
  on public.classes for update to authenticated
  using ((select auth.uid()) = teacher_id);


-- 3. class_members: 반에 속한 학생들
create table public.class_members (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique(class_id, student_id)
);
create index idx_class_members_class_id on public.class_members(class_id);
create index idx_class_members_student_id on public.class_members(student_id);
alter table public.class_members enable row level security;

create policy "Students see own memberships"
  on public.class_members for select to authenticated
  using ((select auth.uid()) = student_id);
create policy "Teachers see members of own classes"
  on public.class_members for select to authenticated
  using (class_id in (
    select id from public.classes
    where teacher_id = (select auth.uid())
  ));
create policy "Students can join classes"
  on public.class_members for insert to authenticated
  with check ((select auth.uid()) = student_id);
create policy "Students can leave classes"
  on public.class_members for delete to authenticated
  using ((select auth.uid()) = student_id);


-- 4. lesson_progress: 학습 진도 (localStorage 대체)
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id text not null,
  variant text,
  progress_type text not null default 'learn'
    check (progress_type in ('learn', 'review')),
  progress_data jsonb not null default '{}',
  completed boolean not null default false,
  score integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id, variant, progress_type)
);
create index idx_lp_user_id on public.lesson_progress(user_id);
create index idx_lp_lookup on public.lesson_progress(user_id, lesson_id, variant, progress_type);
alter table public.lesson_progress enable row level security;

create policy "Users see own progress"
  on public.lesson_progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Teachers see student progress"
  on public.lesson_progress for select to authenticated
  using (user_id in (
    select cm.student_id from public.class_members cm
    join public.classes c on cm.class_id = c.id
    where c.teacher_id = (select auth.uid())
  ));
create policy "Users insert own progress"
  on public.lesson_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users update own progress"
  on public.lesson_progress for update to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users delete own progress"
  on public.lesson_progress for delete to authenticated
  using ((select auth.uid()) = user_id);


-- 5. gamification_data: XP, 스트릭
create table public.gamification_data (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_xp integer not null default 0,
  daily_streak integer not null default 0,
  last_active_date text not null default '',
  sessions_today integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.gamification_data enable row level security;

create policy "Users see own gamification"
  on public.gamification_data for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Teachers see student gamification"
  on public.gamification_data for select to authenticated
  using (user_id in (
    select cm.student_id from public.class_members cm
    join public.classes c on cm.class_id = c.id
    where c.teacher_id = (select auth.uid())
  ));
create policy "Users insert own gamification"
  on public.gamification_data for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users update own gamification"
  on public.gamification_data for update to authenticated
  using ((select auth.uid()) = user_id);


-- 6. user_preferences: 사용자 설정
create table public.user_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  language text not null default 'ko' check (language in ('ko', 'en')),
  sound_muted boolean not null default false,
  library_variants jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.user_preferences enable row level security;

create policy "Users see own prefs"
  on public.user_preferences for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users insert own prefs"
  on public.user_preferences for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users update own prefs"
  on public.user_preferences for update to authenticated
  using ((select auth.uid()) = user_id);


-- ============================================
-- 헬퍼 함수
-- ============================================

-- 6자리 고유 참가 코드 생성
create or replace function public.generate_join_code()
returns text language plpgsql as $$
declare
  code text;
  exists_already boolean;
begin
  loop
    code := upper(substr(md5(random()::text), 1, 6));
    select exists(select 1 from public.classes where join_code = code) into exists_already;
    exit when not exists_already;
  end loop;
  return code;
end;
$$;

-- 참가 코드로 반에 가입 (security definer로 class 조회 가능)
create or replace function public.join_class_by_code(p_code text)
returns uuid language plpgsql security definer as $$
declare
  v_class_id uuid;
begin
  select id into v_class_id
  from public.classes
  where join_code = upper(p_code) and is_active = true;

  if v_class_id is null then
    raise exception '유효하지 않은 참가 코드입니다';
  end if;

  insert into public.class_members (class_id, student_id)
  values (v_class_id, auth.uid())
  on conflict (class_id, student_id) do nothing;

  return v_class_id;
end;
$$;
