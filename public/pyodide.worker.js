/* Pyodide Web Worker — 학생 Python 코드를 메인 스레드 밖에서 실행.
 *
 * 왜: Pyodide 는 동기 실행이라 메인 스레드에서 돌리면 무한 루프 시 탭이 통째로
 *     얼어요(버튼도 안 눌림). 워커에서 돌리면 메인 스레드는 멀쩡하고, 멈추면
 *     메인 스레드가 worker.terminate() 로 강제 종료 → while True 든 C-레벨 멈춤이든 전부 잡힘.
 *
 * 입력: input() 은 레슨이 미리 준 stdin 으로만 처리(비대화형) → SharedArrayBuffer/헤더 불필요.
 */

let pyReady = null

function loadPy() {
  if (!pyReady) {
    // 메인 러너들과 동일 버전
    importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js")
    pyReady = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" })
  }
  return pyReady
}

// 시작하자마자 미리 로딩 → 준비되면 메인에 알림
loadPy()
  .then(() => self.postMessage({ type: "ready" }))
  .catch((e) => self.postMessage({ type: "loaderror", error: String(e) }))

// 실행은 한 번에 하나씩 (직렬화) — 메시지 순서대로 처리
let chain = Promise.resolve()
self.onmessage = (e) => {
  const msg = e.data
  if (!msg || msg.type !== "run") return
  chain = chain.then(() => handleRun(msg))
}

async function handleRun({ id, code, stdin }) {
  let py
  try {
    py = await loadPy()
  } catch (err) {
    self.postMessage({ id, type: "result", ok: false, stdout: "", error: "Python 로딩 실패: " + String(err) })
    return
  }

  // stdout/stderr — raw 바이트 캡처 (print(end=".") 처럼 개행 없는 출력도 포착) + 200KB 캡(폭주 보호)
  const bytes = []
  const MAX = 200000
  py.setStdout({ raw: (b) => { if (bytes.length < MAX) bytes.push(b) } })
  py.setStderr({ raw: (b) => { if (bytes.length < MAX) bytes.push(b) } })

  // stdin — 미리 받은 값 줄 단위로 먹임, 없으면 즉시 EOF
  if (typeof py.setStdin === "function") {
    if (stdin != null && stdin !== "") {
      const lines = String(stdin).split("\n")
      let i = 0
      py.setStdin({ stdin: () => (i < lines.length ? lines[i++] + "\n" : undefined) })
    } else {
      py.setStdin({ stdin: () => undefined })
    }
  }

  try {
    // input("프롬프트") 의 프롬프트가 stdout 에 echo 되어 expectedOutput 비교를 깨는 것 방지.
    // builtins.input 을 프롬프트 출력 없이 stdin 만 읽도록 1회 래핑(중첩 가드).
    await py.runPythonAsync(
      "import builtins as _cb\n" +
      "if not getattr(_cb.input, '_cr_wrapped', False):\n" +
      "    _cr_oi = _cb.input\n" +
      "    def _cr_input(*a, **k):\n" +
      "        return _cr_oi()\n" +
      "    _cr_input._cr_wrapped = True\n" +
      "    _cb.input = _cr_input\n"
    )

    // 학생 코드 실행
    await py.runPythonAsync(code)

    const stdout = new TextDecoder().decode(new Uint8Array(bytes))
    self.postMessage({ id, type: "result", ok: true, stdout, error: "" })
  } catch (err) {
    const stdout = new TextDecoder().decode(new Uint8Array(bytes))
    self.postMessage({ id, type: "result", ok: false, stdout, error: String((err && err.message) || err) })
  }
}
