import { createClient } from "./client"

/**
 * 매 로그인마다 completedLessons + completedQuizzes를 Supabase에 동기화
 * 24시간 쿨다운 없이 항상 실행 — 데이터가 작아서 비용 적음
 */
export async function syncCompletionsToSupabase(userId: string) {
  const supabase = createClient()

  try {
    // completedLessons
    const completedLessonsRaw = localStorage.getItem("completedLessons")
    if (completedLessonsRaw) {
      const completedLessons: (string | number)[] = JSON.parse(completedLessonsRaw)
      const progressRows = completedLessons.map(lessonId => ({
        user_id: userId,
        lesson_id: String(lessonId),
        variant: "",
        progress_type: "learn" as const,
        progress_data: {},
        completed: true,
        score: 0,
      }))
      if (progressRows.length > 0) {
        const { error } = await supabase.from("lesson_progress").upsert(progressRows, {
          onConflict: "user_id,lesson_id,variant,progress_type",
        })
        if (error) console.error("[syncCompletions] lesson_progress upsert failed:", error.message)
      }
    }

    // completedQuizzes
    const completedQuizzesRaw = localStorage.getItem("completedQuizzes")
    if (completedQuizzesRaw) {
      const completedQuizzes: (string | number)[] = JSON.parse(completedQuizzesRaw)
      const quizRows = completedQuizzes.map(lessonId => ({
        user_id: userId,
        lesson_id: String(lessonId),
        variant: "",
        progress_type: "quiz" as const,
        progress_data: {},
        completed: true,
        score: 0,
      }))
      if (quizRows.length > 0) {
        const { error } = await supabase.from("lesson_progress").upsert(quizRows, {
          onConflict: "user_id,lesson_id,variant,progress_type",
        })
        if (error) console.error("[syncCompletions] completedQuizzes upsert failed:", error.message)
      }
    }
  } catch (e) {
    console.error("[syncCompletions] failed:", e)
  }
}

/**
 * 첫 로그인 시 localStorage 데이터를 Supabase로 마이그레이션
 * auth-context.tsx에서 SIGNED_IN 이벤트 시 1회 호출
 */
export async function migrateLocalStorageToSupabase(userId: string) {
  const supabase = createClient()

  // 레거시 null variant → '' 정리 (UNIQUE 제약조건 호환성)
  try {
    await supabase
      .from("lesson_progress")
      .update({ variant: "" })
      .eq("user_id", userId)
      .is("variant", null)
  } catch {
    // variant 정리 실패 시 무시 — 이후 upsert가 새 행으로 생성됨
  }

  // 클라우드 gamification 데이터 조회 (스마트 머지용)
  const { data: existing } = await supabase
    .from("gamification_data")
    .select("total_xp, daily_streak, last_active_date, sessions_today")
    .eq("user_id", userId)
    .single()

  try {
    // 1. Gamification 데이터 (로컬 vs 클라우드 중 큰 값 사용)
    const totalXp = parseInt(localStorage.getItem("gamification-total-xp") || "0", 10)
    const dailyStreak = parseInt(localStorage.getItem("gamification-daily-streak") || "0", 10)
    const lastActiveDate = localStorage.getItem("gamification-last-active-date") || ""
    const sessionsToday = parseInt(localStorage.getItem("gamification-sessions-today") || "0", 10)

    const mergedXp = Math.max(totalXp, existing?.total_xp || 0)
    const mergedStreak = Math.max(dailyStreak, existing?.daily_streak || 0)
    const mergedSessions = Math.max(sessionsToday, existing?.sessions_today || 0)
    // last_active_date: 더 최근 날짜 사용
    const cloudDate = existing?.last_active_date || ""
    const mergedDate = lastActiveDate > cloudDate ? lastActiveDate : cloudDate

    if (mergedXp > 0 || mergedStreak > 0) {
      const { error: gError } = await supabase.from("gamification_data").upsert({
        user_id: userId,
        total_xp: mergedXp,
        daily_streak: mergedStreak,
        last_active_date: mergedDate,
        sessions_today: mergedSessions,
      }, { onConflict: "user_id" })
      if (gError) console.error("[Migration] gamification upsert failed:", gError.message, gError.code)
    }

    // 2. 완료한 레슨
    const completedLessonsRaw = localStorage.getItem("completedLessons")
    if (completedLessonsRaw) {
      const completedLessons: (string | number)[] = JSON.parse(completedLessonsRaw)
      const progressRows = completedLessons.map(lessonId => ({
        user_id: userId,
        lesson_id: String(lessonId),
        variant: "",
        progress_type: "learn" as const,
        progress_data: {},
        completed: true,
        score: 0,
      }))

      if (progressRows.length > 0) {
        const { error: lpError } = await supabase.from("lesson_progress").upsert(progressRows, {
          onConflict: "user_id,lesson_id,variant,progress_type",
        })
        if (lpError) console.error("[Migration] lesson_progress upsert failed:", lpError.message, lpError.code)
      }
    }

    // 3. 퀴즈 복습 완료 (completedQuizzes → lesson_progress quiz)
    const completedQuizzesRaw = localStorage.getItem("completedQuizzes")
    if (completedQuizzesRaw) {
      const completedQuizzes: (string | number)[] = JSON.parse(completedQuizzesRaw)
      const quizRows = completedQuizzes.map(lessonId => ({
        user_id: userId,
        lesson_id: String(lessonId),
        variant: "",
        progress_type: "quiz" as const,
        progress_data: {},
        completed: true,
        score: 0,
      }))
      if (quizRows.length > 0) {
        await supabase.from("lesson_progress").upsert(quizRows, {
          onConflict: "user_id,lesson_id,variant,progress_type",
        })
      }
    }

    // 5. 학습 진도 (practice-v2-*)
    const keys = Object.keys(localStorage)
    const practiceKeys = keys.filter(k => k.startsWith("practice-v2-"))

    for (const key of practiceKeys) {
      try {
        const raw = localStorage.getItem(key)
        if (!raw) continue

        const data = JSON.parse(raw)
        // key 형식: "practice-v2-{lessonId}" 또는 "practice-v2-{lessonId}-{variant}"
        // lessonId는 "1", "p1", "cpp-1" 등 다양한 형태
        // variant는 "turtle", "pygame" 등 알려진 이름만 해당
        const remainder = key.replace("practice-v2-", "")
        const knownVariants = ["turtle", "pygame"]
        const lastDash = remainder.lastIndexOf("-")
        const possibleVariant = lastDash > 0 ? remainder.substring(lastDash + 1) : ""
        const isVariant = knownVariants.includes(possibleVariant)
        const lessonId = isVariant ? remainder.substring(0, lastDash) : remainder
        const variant = isVariant ? possibleVariant : ""

        await supabase.from("lesson_progress").upsert({
          user_id: userId,
          lesson_id: lessonId,
          variant: variant,
          progress_type: "learn",
          progress_data: data,
          completed: false,
          score: data.score || 0,
        }, { onConflict: "user_id,lesson_id,variant,progress_type" })
      } catch {
        // 개별 키 실패 시 건너뜀
      }
    }

    // 4. 리뷰 진도 (lesson-*)
    const lessonKeys = keys.filter(k => k.startsWith("lesson-") && !k.startsWith("lesson-progress"))

    for (const key of lessonKeys) {
      try {
        const raw = localStorage.getItem(key)
        if (!raw) continue

        const data = JSON.parse(raw)
        const lessonId = key.replace("lesson-", "")

        await supabase.from("lesson_progress").upsert({
          user_id: userId,
          lesson_id: lessonId,
          variant: "",
          progress_type: "review",
          progress_data: data,
          completed: false,
          score: data.score || 0,
        }, { onConflict: "user_id,lesson_id,variant,progress_type" })
      } catch {
        // 개별 키 실패 시 건너뜀
      }
    }

    // 5. question-mastery (간격 반복 데이터)
    const masteryRaw = localStorage.getItem("question-mastery")
    if (masteryRaw) {
      const mastery: Record<string, {
        questionId: number; box: number; correctStreak: number;
        totalAttempts: number; totalCorrect: number;
        lastReviewDate: string; nextReviewDate: string; lastGrade: string | null;
      }> = JSON.parse(masteryRaw)
      const masteryRows = Object.values(mastery).map(m => ({
        user_id: userId,
        question_id: m.questionId,
        box: m.box,
        correct_streak: m.correctStreak,
        total_attempts: m.totalAttempts,
        total_correct: m.totalCorrect,
        last_review_date: m.lastReviewDate,
        next_review_date: m.nextReviewDate,
        last_grade: m.lastGrade,
        updated_at: new Date().toISOString(),
      }))
      if (masteryRows.length > 0) {
        // 100개씩 배치 처리
        for (let i = 0; i < masteryRows.length; i += 100) {
          const batch = masteryRows.slice(i, i + 100)
          const { error: mError } = await supabase
            .from("question_mastery")
            .upsert(batch, { onConflict: "user_id,question_id" })
          if (mError) console.error("[Migration] question_mastery upsert failed:", mError.message, mError.code)
        }
      }
    }

    // 6. 코드 제출 (blank-runner-* / python-runner-* + correct:true + lessonId 있는 것)
    const codeRows: { user_id: string; lesson_id: string; step_id: string; code: string }[] = []
    for (const key of keys) {
      if (!key.startsWith("blank-runner-") && !key.startsWith("python-runner-")) continue
      try {
        const raw = localStorage.getItem(key)
        if (!raw) continue
        const parsed = JSON.parse(raw)
        if (!parsed.correct || !parsed.lessonId) continue  // 정답 아니거나 lessonId 없으면 스킵

        const stepId = key.startsWith("blank-runner-")
          ? key.replace("blank-runner-", "")
          : key.replace("python-runner-", "")

        const code = key.startsWith("blank-runner-")
          ? JSON.stringify({ values: parsed.values || {}, assembled: parsed.assembled || "" })
          : (parsed.code || "")

        if (!code) continue
        codeRows.push({ user_id: userId, lesson_id: parsed.lessonId, step_id: stepId, code })
      } catch { /* 개별 키 실패 시 건너뜀 */ }
    }
    if (codeRows.length > 0) {
      const { error: cError } = await supabase
        .from("code_submissions")
        .upsert(codeRows, { onConflict: "user_id,lesson_id,step_id", ignoreDuplicates: true })
      if (cError) console.error("[Migration] code_submissions upsert failed:", cError.message, cError.code)
    }

    // 7. 설정 (언어, 사운드)
    const language = localStorage.getItem("language") || "ko"
    const soundMuted = localStorage.getItem("sound-muted") === "true"

    // Library variants 수집
    const variantKeys = keys.filter(k => k.startsWith("library-variant-"))
    const libraryVariants: Record<string, string> = {}
    for (const vk of variantKeys) {
      const lessonId = vk.replace("library-variant-", "")
      const variant = localStorage.getItem(vk)
      if (variant) libraryVariants[lessonId] = variant
    }

    await supabase.from("user_preferences").upsert({
      user_id: userId,
      language,
      sound_muted: soundMuted,
      library_variants: libraryVariants,
    }, { onConflict: "user_id" })

  } catch (error) {
    console.error("Migration error:", error)
    // 마이그레이션 실패해도 앱은 계속 동작 (localStorage 사용)
  }
}
