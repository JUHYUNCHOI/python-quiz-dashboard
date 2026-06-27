// 복습 코드 채점용 '진짜 파이썬' 실행기.
// 실행은 Web Worker(utils/pyodideWorker)에서 — 메인 스레드(UI)가 무한 루프에 안 얼고,
// 5초 초과 시 워커를 강제 종료해 while True 같은 것도 잡는다.
// (과거 정규식 가짜 러너가 if/for 를 못 돌려 맞는 코드를 틀렸다 하던 버그도 진짜 실행으로 해결됨)

import { runPython as runInWorker, preloadPython } from "@/utils/pyodideWorker"

/** 복습 진입 시 미리 Pyodide 워커를 띄워둠 (호출부는 반환값 무시). */
export async function loadPyodideForReview(): Promise<void> {
  return preloadPython()
}

/** 실제 파이썬으로 코드를 돌려 stdout 을 반환. 에러 시 error 채움. */
export async function runPythonReal(
  code: string,
  stdin?: string,
): Promise<{ result: string; error: string | null }> {
  const res = await runInWorker(code, { stdin: stdin ?? "", timeoutMs: 5000 })

  if (res.timedOut) {
    // 복습 UI 는 error 를 그대로 보여주므로(translate 안 함) 친근 문구를 직접 반환
    return {
      result: "",
      error: "⏱️ 5초가 넘어 멈췄어요 — 무한 루프인 것 같아요. 반복이 끝나도록(예: 조건이 언젠가 거짓이 되도록) 고쳐 보세요!",
    }
  }
  if (!res.ok) {
    return { result: "", error: res.error || "에러!" }
  }
  return { result: (res.stdout ?? "").trimEnd(), error: null }
}
