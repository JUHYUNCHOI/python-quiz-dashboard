import { createClient } from "./client"

/**
 * 첫 로그인 시 localStorage 데이터를 Supabase로 마이그레이션
 * auth-context.tsx에서 SIGNED_IN 이벤트 시 1회 호출
 */
export async function migrateLocalStorageToSupabase(userId: string) {
  const supabase = createClient()

  // 이미 마이그레이션 했는지 체크 (gamification_data 존재 여부)
  const { data: existing } = await supabase
    .from("gamification_data")
    .select("user_id")
    .eq("user_id", userId)
    .single()

  if (existing) return // 이미 마이그레이션 완료

  try {
    // 1. Gamification 데이터
    const totalXp = parseInt(localStorage.getItem("gamification-total-xp") || "0", 10)
    const dailyStreak = parseInt(localStorage.getItem("gamification-daily-streak") || "0", 10)
    const lastActiveDate = localStorage.getItem("gamification-last-active-date") || ""
    const sessionsToday = parseInt(localStorage.getItem("gamification-sessions-today") || "0", 10)

    if (totalXp > 0 || dailyStreak > 0) {
      await supabase.from("gamification_data").upsert({
        user_id: userId,
        total_xp: totalXp,
        daily_streak: dailyStreak,
        last_active_date: lastActiveDate,
        sessions_today: sessionsToday,
      }, { onConflict: "user_id" })
    }

    // 2. 완료한 레슨
    const completedLessonsRaw = localStorage.getItem("completedLessons")
    if (completedLessonsRaw) {
      const completedLessons: (string | number)[] = JSON.parse(completedLessonsRaw)
      const progressRows = completedLessons.map(lessonId => ({
        user_id: userId,
        lesson_id: String(lessonId),
        variant: null,
        progress_type: "learn" as const,
        progress_data: {},
        completed: true,
        score: 0,
      }))

      if (progressRows.length > 0) {
        await supabase.from("lesson_progress").upsert(progressRows, {
          onConflict: "user_id,lesson_id,variant,progress_type",
        })
      }
    }

    // 3. 학습 진도 (practice-v2-*)
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
        const variant = isVariant ? possibleVariant : null

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
          variant: null,
          progress_type: "review",
          progress_data: data,
          completed: false,
          score: data.score || 0,
        }, { onConflict: "user_id,lesson_id,variant,progress_type" })
      } catch {
        // 개별 키 실패 시 건너뜀
      }
    }

    // 5. 설정 (언어, 사운드)
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
