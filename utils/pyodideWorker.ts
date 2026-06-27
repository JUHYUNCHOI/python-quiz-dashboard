// Pyodide Web Worker 관리자 — 메인 스레드 쪽.
//
// runPython() 으로 코드를 워커에 보내고, 5초 안에 응답이 없으면 워커를 강제 종료(terminate)
// 한 뒤 새 워커를 띄운다. 무한 루프/멈춤이 메인 스레드(UI)를 절대 얼리지 않게 하는 핵심.

export interface RunResult {
  ok: boolean
  stdout: string
  error: string
  /** 5초 초과로 워커를 강제 종료했을 때 true (= 무한 루프 추정) */
  timedOut?: boolean
}

let worker: Worker | null = null
let ready: Promise<void> | null = null
let seq = 0
const pending = new Map<number, (r: RunResult) => void>()

function spawn() {
  worker = new Worker("/pyodide.worker.js")
  ready = new Promise<void>((resolve, reject) => {
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "ready") { cleanup(); resolve() }
      else if (e.data?.type === "loaderror") { cleanup(); reject(new Error(e.data.error || "load error")) }
    }
    const cleanup = () => worker?.removeEventListener("message", onMsg)
    worker!.addEventListener("message", onMsg)
  })
  worker.addEventListener("message", (e: MessageEvent) => {
    const d = e.data
    if (d?.type === "result") {
      const cb = pending.get(d.id)
      if (cb) cb({ ok: !!d.ok, stdout: d.stdout ?? "", error: d.error ?? "" })
    }
  })
}

/** 페이지/스텝 진입 시 미리 호출해서 Pyodide 를 백그라운드 로딩. ready 면 resolve. */
export function preloadPython(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (!worker) spawn()
  return ready!.catch(() => { /* 실제 에러는 runPython 에서 표면화 */ })
}

/**
 * 코드를 워커에서 실행. 5초(기본) 초과 시 워커를 죽이고 timedOut 결과 반환.
 * @param code  실행할 전체 파이썬 코드 (빈칸 러너는 조립된 코드를 넘김)
 * @param opts.stdin  input() 에 먹일 미리 준 입력
 */
export async function runPython(
  code: string,
  opts: { stdin?: string; timeoutMs?: number } = {}
): Promise<RunResult> {
  if (typeof window === "undefined") return { ok: false, stdout: "", error: "no window" }
  if (!worker) spawn()
  try {
    await ready
  } catch (e) {
    return { ok: false, stdout: "", error: "Python 로딩 실패: " + String(e) }
  }

  const id = ++seq
  return new Promise<RunResult>((resolve) => {
    let done = false
    const finish = (r: RunResult) => {
      if (done) return
      done = true
      clearTimeout(timer)
      pending.delete(id)
      resolve(r)
    }
    pending.set(id, finish)

    const timer = setTimeout(() => {
      // 무한 루프/멈춤 — 워커 강제 종료 후 재생성
      if (worker) { worker.terminate(); worker = null; ready = null }
      // 같은 워커에 걸려있던 다른 대기들도 정리 (드물지만 안전하게)
      pending.forEach((cb, key) => { if (key !== id) cb({ ok: false, stdout: "", error: "__CR_TERMINATED__" }) })
      pending.clear()
      spawn() // 백그라운드에서 새 워커 로딩
      finish({ ok: false, stdout: "", error: "__CR_TIMEOUT__", timedOut: true })
    }, opts.timeoutMs ?? 5000)

    worker!.postMessage({ id, type: "run", code, stdin: opts.stdin ?? "" })
  })
}
