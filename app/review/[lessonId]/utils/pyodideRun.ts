// 복습 코드 채점용 '진짜 파이썬' 실행기.
// 실행은 Web Worker(utils/pyodideWorker)에서 — 메인 스레드(UI)가 무한 루프에 안 얼고,
// 5초 초과 시 워커를 강제 종료해 while True 같은 것도 잡는다.
// (과거 정규식 가짜 러너가 if/for 를 못 돌려 맞는 코드를 틀렸다 하던 버그도 진짜 실행으로 해결됨)

import { runPython as runInWorker, preloadPython } from "@/utils/pyodideWorker"

/** 복습 진입 시 미리 Pyodide 워커를 띄워둠 (호출부는 반환값 무시). */
export async function loadPyodideForReview(): Promise<void> {
  return preloadPython()
}

/**
 * 파이썬 실행 에러(긴 Traceback)를 학생이 읽을 수 있는 한 줄로 다듬는다.
 * raw 는 "Traceback ... / File ... / ^^^ / NameError: ... Did you mean: 'print'?" 형태.
 * 마지막 "에러타입: 메시지" 줄만 뽑고, 흔한 오류엔 쉬운 안내를 앞에 붙인다.
 * (예전엔 이 raw 전체를 빨간 박스에 그대로 뿌려서 '웹페이지 에러처럼' 보였음.)
 */
function friendlyPyError(raw: string): string {
  const lines = raw.split("\n").map(l => l.trimEnd()).filter(l => l.trim() !== "")
  // 마지막 "XxxError: ..." / "XxxException: ..." 줄을 찾음 (없으면 마지막 줄)
  const errLine = [...lines].reverse().find(l => /^[A-Za-z_][\w.]*(Error|Exception|Warning|Interrupt):/.test(l.trim()))
    || lines[lines.length - 1] || raw.trim()
  const el = errLine.trim()

  // "Did you mean: 'print'?" 같은 파이썬 제안은 학생에게 아주 유용 → 그대로 살림
  const didYouMean = /Did you mean:\s*'([^']+)'/.exec(el)?.[1]

  // NameError: name 'peint' is not defined
  const nameErr = /^NameError: name '([^']+)' is not defined/.exec(el)?.[1]
  if (nameErr) {
    return didYouMean
      ? `'${nameErr}' 라는 이름을 찾을 수 없어요. 혹시 '${didYouMean}' 오타 아닐까요?`
      : `'${nameErr}' 라는 이름을 찾을 수 없어요. 오타가 있는지, 먼저 정의했는지 확인해 보세요.`
  }
  if (/^SyntaxError:/.test(el)) {
    return "문법(구문) 오류예요. 괄호 ( ), 따옴표 ' ', 콜론( : )이 짝이 맞는지 확인해 보세요."
  }
  if (/^IndentationError:/.test(el) || /unexpected indent|expected an indented block/.test(el)) {
    return "들여쓰기가 안 맞아요. 앞의 빈칸(스페이스) 개수를 확인해 보세요."
  }
  if (/^TypeError:/.test(el)) {
    return el.replace(/^TypeError:\s*/, "타입 오류: ")
  }
  if (/^IndexError:/.test(el)) {
    return "범위를 벗어난 위치를 읽었어요 (IndexError). 인덱스 번호가 리스트 길이 안에 있는지 확인해 보세요."
  }
  if (/^KeyError:/.test(el)) {
    return `딕셔너리에 없는 키를 찾았어요 (KeyError: ${el.replace(/^KeyError:\s*/, "")}).`
  }
  if (/^ZeroDivisionError:/.test(el)) {
    return "0 으로 나눌 수 없어요 (ZeroDivisionError)."
  }
  // 그 외: 마지막 에러 줄만 그대로 (전체 traceback 대신)
  return el
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
    return { result: "", error: res.error ? friendlyPyError(res.error) : "에러!" }
  }
  return { result: (res.stdout ?? "").trimEnd(), error: null }
}
