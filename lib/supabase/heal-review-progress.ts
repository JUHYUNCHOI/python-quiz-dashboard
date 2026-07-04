/**
 * 일회성 자가 치유 — "가짜 0점 복습완료" 정리 (선생님 2026-07-04)
 *
 * 배경:
 *   과거 복습 로직은 문제를 1개만 풀고 결과 화면에 닿아도 `markQuizComplete` 를 불러서
 *   레슨을 "복습완료(0점)"로 박아버렸다. (게이트 없음 — client-page.tsx 에서 수정 완료.)
 *   그 결과 다수 학생의 복습이 "모두 완료 + 0점" 으로 오염됨.
 *
 * 하는 일 (로그인 시 딱 한 번):
 *   1) [영향받은 학생만] 서버(lesson_progress)의 '가짜 0점 완료'(quiz/review + completed + score 0/null)
 *      삭제 → 진짜 점수(>0)는 보존.
 *   2) [영향받은 학생만] 복습 진행 스냅샷(review_progress) 삭제 — scoredSteps 잔재가 다시 풀 때
 *      재오염을 유발하므로.
 *   3) [모두, 무조건 1회] 브라우저 localStorage 잔재 정리 (completedQuizzes / quiz-scores /
 *      review-progress-*). ⚠️ 이걸 안 하면, 서버를 지워도 로그인 시 오염된 localStorage 가
 *      completedQuizzes → lesson_progress(quiz, completed) 로 *다시 업로드* 되어 재오염된다
 *      (migrate-local-data 의 syncCompletions/migrate 참고). 수동으로 서버만 리셋한 학생도 이걸로 구제됨.
 *      → 수업 진도(completedLessons)는 절대 건드리지 않음. 정리 후 restoreFromCloud 가
 *        '정리된 서버'에서 진짜 완료(>0)만 다시 채워준다.
 *
 * 안전장치:
 *   - 조회/삭제 실패 시 플래그를 찍지 않아 다음 로그인에 재시도 (localStorage 도 안 건드림).
 *   - RLS 로 본인 데이터만 (lesson_progress 클라이언트 DELETE 는 migrate-local-data 에서 이미 사용 중).
 *   - 반드시 migrate/restore 보다 *먼저* await 로 실행할 것 (auth-context).
 */

const HEAL_FLAG = "review-heal-v1"

export async function healReviewProgressOnce(userId: string): Promise<void> {
  try {
    if (typeof window === "undefined") return
    if (localStorage.getItem(HEAL_FLAG)) return
    if (!userId) return

    const { createClient } = await import("./client")
    const supabase = createClient()

    // 서버에 '가짜 0점 완료'가 있나 확인 (영향받은 학생만 서버 삭제)
    const { data: bad, error: selErr } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", userId)
      .in("progress_type", ["quiz", "review"])
      .eq("completed", true)
      .or("score.is.null,score.eq.0")
      .limit(1)

    if (selErr) {
      // 조회 실패 → 플래그 안 찍고 다음 로그인에 재시도
      console.error("[healReview] select failed:", selErr.message)
      return
    }

    if (bad && bad.length > 0) {
      // 1) 가짜 0점 복습완료 삭제 (진짜 점수 >0 는 보존)
      const del1 = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId)
        .in("progress_type", ["quiz", "review"])
        .eq("completed", true)
        .or("score.is.null,score.eq.0")

      // 2) 복습 진행 스냅샷 삭제 (scoredSteps 잔재 = 다시 풀 때 재오염 원인)
      const del2 = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId)
        .eq("progress_type", "review_progress")

      if (del1.error || del2.error) {
        // 삭제 실패 → 플래그/로컬 안 건드림 (다음 로그인 재시도)
        console.error("[healReview] delete failed:", del1.error?.message, del2.error?.message)
        return
      }
    }

    // 3) 로컬 잔재 정리 — 무조건 1회. 수업 진도(completedLessons)는 보존!
    //    (서버는 깨끗한데 localStorage 만 오염된 학생 — 예: 수동 리셋함 — 재업로드 방지)
    localStorage.removeItem("completedQuizzes")
    localStorage.removeItem("quiz-scores")
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i)
      if (k && k.startsWith("review-progress-")) localStorage.removeItem(k)
    }

    localStorage.setItem(HEAL_FLAG, new Date().toISOString())
  } catch (e) {
    console.error("[healReview] error:", e)
  }
}
