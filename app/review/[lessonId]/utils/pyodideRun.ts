// 복습 코드 채점용 '진짜 파이썬' 실행기 (Pyodide).
// 기존 정규식 가짜 러너(pythonRunner.ts)는 if/for 등을 못 돌려서,
// 조건문·반복문 레슨에서 맞는 코드를 틀렸다고 판정하던 버그가 있었음.
// 학습 페이지(components/python/python-runner.tsx)와 같은 방식으로 실제 실행한다.

interface PyodideLike {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (o: { raw?: (b: number) => void; batched?: (s: string) => void }) => void
  setStdin?: (o: { stdin: () => string | undefined }) => void
}

// Window.loadPyodide 는 다른 파일(python-runner 등)에서 이미 전역 선언됨 →
// 여기서 다시 선언하면 modifier 충돌(빌드 에러). 그냥 캐스팅해서 쓴다.
const _win = () => window as unknown as { loadPyodide?: (config?: { indexURL?: string }) => Promise<PyodideLike> }

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"

let instance: PyodideLike | null = null
let loading: Promise<PyodideLike> | null = null

export async function loadPyodideForReview(): Promise<PyodideLike> {
  if (instance) return instance
  if (loading) return loading
  loading = (async () => {
    if (!_win().loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = PYODIDE_URL + "pyodide.js"
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Pyodide 로드 실패"))
        document.head.appendChild(script)
      })
    }
    instance = await _win().loadPyodide!({ indexURL: PYODIDE_URL })
    return instance
  })()
  return loading
}

/** 실제 파이썬으로 코드를 돌려 stdout 을 반환. 에러 시 error 채움. */
export async function runPythonReal(
  code: string,
  stdin?: string,
): Promise<{ result: string; error: string | null }> {
  try {
    const py = await loadPyodideForReview()

    // raw 콜백은 바이트별로 호출 → 개행 없는 출력(end="" 등)도 모두 포착
    const bytes: number[] = []
    py.setStdout({ raw: (b: number) => { bytes.push(b) } })

    // input() 지원: 레슨이 준 stdin 을 줄 단위로 (없으면 즉시 EOF)
    if (typeof py.setStdin === "function") {
      if (stdin != null && stdin !== "") {
        const lines = String(stdin).split("\n")
        let i = 0
        py.setStdin({ stdin: () => (i < lines.length ? lines[i++] + "\n" : undefined) })
      } else {
        py.setStdin({ stdin: () => undefined })
      }
    }

    // input("프롬프트") 의 프롬프트가 stdout 에 echo 되어 출력 비교를 깨뜨리는 것 방지
    // (학습 페이지와 동일한 1회 래핑 가드)
    await py.runPythonAsync(
      "import builtins as _cb\n" +
      "if not getattr(_cb.input, '_cr_wrapped', False):\n" +
      "    _cr_oi = _cb.input\n" +
      "    def _cr_input(*a, **k):\n" +
      "        return _cr_oi()\n" +
      "    _cr_input._cr_wrapped = True\n" +
      "    _cb.input = _cr_input\n"
    )

    await py.runPythonAsync(code)

    const out = new TextDecoder().decode(new Uint8Array(bytes)).trimEnd()
    return { result: out, error: null }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return { result: "", error: msg }
  }
}
