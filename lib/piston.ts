// ============================================================
// Piston 코드 실행 API 공통 모듈
//
// 드롭릿에 자체 호스팅된 Piston 서버(github.com/engineer-man/piston)를
// 호출하기 위한 공통 래퍼. Wandbox 대신 이걸 사용.
//
// 서버 정보: infra/README.md 참고
// ============================================================

/** 환경변수 — Vercel/ .env.local 에서 주입 */
export const PISTON_URL = process.env.NEXT_PUBLIC_PISTON_URL || ""
export const PISTON_KEY = process.env.NEXT_PUBLIC_PISTON_KEY || ""

/** 언어별 Piston 패키지 이름/버전 (드롭릿에 설치된 버전과 일치해야 함) */
export const PISTON_LANG_VERSION: Record<
  "cpp" | "python",
  { language: string; version: string }
> = {
  cpp: { language: "c++", version: "10.2.0" },
  python: { language: "python", version: "3.12.0" },
}

/** 정규화된 실행 결과 — 호출 측에서 분기 처리하기 편한 형태 */
export type PistonResult = {
  /** 컴파일 + 실행 모두 성공 */
  ok: boolean
  /** 표준 출력 (trim 됨) */
  output: string
  /** 컴파일 에러 stderr (있을 때만) */
  compileError?: string
  /** 런타임 에러 stderr (프로그램이 비정상 종료됐을 때만) */
  runtimeError?: string
  /** 네트워크/서버 다운 등 통신 실패 (호출 측에서 재시도 판단용) */
  networkError?: boolean
  /**
   * 채점 서버가 죽어서 **브라우저(Pyodide)로 대신 돌렸다.**
   * 호출 측이 "느릴 수 있다"고 안내할 때만 쓴다 — 채점 기준은 똑같다.
   */
  viaBrowser?: boolean
}

/** Piston 실행 단계 결과 (compile/run 공통 형태) */
type PistonStage = {
  code?: number
  stdout?: string
  stderr?: string
  output?: string
}

/** Piston Raw API 응답 형태 (내부 파싱용) */
type PistonRawResponse = {
  compile?: PistonStage
  run?: PistonStage
  language?: string
  version?: string
}

/**
 * Piston /api/v2/execute 호출.
 *
 * @param lang      - "cpp" | "python"
 * @param code      - 소스 코드 전체
 * @param stdin     - 표준 입력 (옵션)
 * @param timeoutMs - 요청 타임아웃 (기본 15초)
 */
/* ⛔⛔ 2026-10-07 — **두 실행기가 `input()` 을 다르게 다뤄 학생이 막혔다.**

   학생(보호자 경유): *"인풋이 안 들어와서 **모든 문제가 푸는 게 불가능해요.**"*
   자리는 커리큘럼의 **「졸업 미션」**(= `/practice?cluster=py-io`, 처음부터 코드 쓰기)이었다.

   수업 10 은 **프롬프트를 넣으라고 가르친다** — `name = input("이름이 뭐야? ")`.
     수업·복습(Pyodide)은 `public/pyodide.worker.js:60-71` 이 `input` 을 감싸
     **프롬프트를 안 찍는다.** 그래서 거기선 잘 된다.
     연습(여기, Piston = 진짜 python3)은 **프롬프트가 출력에 그대로 찍힌다.**

   라이브 서버 실측:
     `name = input('이름: ')` + stdin `Alice` → **`'이름: Hello, Alice!'`**  (기대 `'Hello, Alice!'`)
   **코드는 맞는데 19문제가 전부 틀린다.** 학생 눈엔 「입력이 잘못 들어갔다」로 보인다.

   ⭐ 그래서 **수업 쪽이 이미 쓰는 방식을 여기에도 맞춘다** — 새 발명이 아니다.
   ⚠️ **반드시 한 줄이어야 한다.** 줄이 늘면 런타임 에러 줄 번호가 그만큼 밀린다.
     지금은 오프셋이 **정확히 +1** 이고, `practice-runner.tsx` 가 그만큼 빼서 보정한다.
     **여기를 여러 줄로 바꾸면 거기 숫자도 같이 고쳐라.**
   ⚠️ 이 함수를 쓰는 곳은 `components/practice/practice-runner.tsx` **하나뿐**이다
     (코딩뱅크·Algo Lab 은 안 쓴다 — PM 확인). C++ 은 안 건드린다. */
const PY_NO_PROMPT =
  "import builtins as _cb; _cb._cr_oi=_cb.input; _cb.input=lambda *a,**k:_cb._cr_oi()\n"

/**
 * 채점 서버가 죽었을 때의 **파이썬 비상 경로** — 브라우저에서 Pyodide 로 돌린다.
 *
 * ── 왜 필요했나 (2026-11-23) ──────────────────────────────────────────────
 * 드롭릿(168.144.96.207)이 통째로 응답을 멈췄다. ping 100% 손실, 80/443/2000
 * 전부 닫힘. 그 결과 **앱의 모든 제출이 「네트워크 오류」로 떨어졌다** — 연습,
 * 승급 시험, 배치고사의 코드 문항까지 전부. 서버 하나에 제품 전체가 매달려
 * 있었다는 뜻이다.
 *
 * Piston 공개 인스턴스(emkc.org)는 2026-02-15 부터 화이트리스트 전용이라
 * 대체 서버로 쓸 수 없다 (401). 그래서 **이미 앱에 있는 실행기**를 쓴다 —
 * 수업·복습이 쓰는 `public/pyodide.worker.js` 다. 새로 들이는 의존성이 없다.
 *
 * ── 한계 (반드시 알고 쓸 것) ──────────────────────────────────────────────
 * - **C++ 은 못 한다.** 브라우저에 C++ 컴파일러가 없다. C++ 제출은 서버가
 *   살아나야 한다 — 그래서 `networkError` 를 그대로 올려보낸다.
 * - 첫 실행은 Pyodide 를 CDN 에서 받아야 해서 몇 초 걸린다.
 * - 채점 기준은 바꾸지 않는다. stdin 을 먹이고 stdout 을 바이트 비교하는
 *   같은 규칙이다 — 그래야 서버가 돌아왔을 때 결과가 뒤집히지 않는다.
 *
 * ⚠️ 이건 **임시 우회로**다. 근본 해결은 드롭릿 복구다 (`infra/README.md`).
 */
async function runPythonInBrowser(code: string, stdin?: string): Promise<PistonResult> {
  if (typeof window === "undefined") return { ok: false, output: "", networkError: true }
  try {
    const { runPython } = await import("@/utils/pyodideWorker")
    /* PY_NO_PROMPT 를 여기서도 붙인다. 워커가 이미 `input` 을 감싸지만,
       **줄 번호 오프셋을 서버 경로와 같게 유지해야 한다** — 호출 측
       (`practice-runner.tsx`)이 런타임 에러 줄 번호에서 정확히 1을 뺀다. */
    const r = await runPython(PY_NO_PROMPT + code, { stdin, timeoutMs: 10000 })
    if (r.error === "__CR_TIMEOUT__" || r.timedOut) {
      return { ok: false, output: r.stdout.trim(), runtimeError: "Time limit exceeded", viaBrowser: true }
    }
    if (!r.ok) {
      return { ok: false, output: r.stdout.trim(), runtimeError: r.error || "runtime error", viaBrowser: true }
    }
    return { ok: true, output: r.stdout.trim(), viaBrowser: true }
  } catch {
    // Pyodide 로딩 자체가 실패 — 원래의 네트워크 오류로 되돌린다.
    return { ok: false, output: "", networkError: true }
  }
}

export async function callPiston(
  lang: "cpp" | "python",
  code: string,
  stdin?: string,
  timeoutMs = 15000,
): Promise<PistonResult> {
  const langConf = PISTON_LANG_VERSION[lang] ?? PISTON_LANG_VERSION.cpp

  /* URL 이 비어 있으면 fetch("") 가 현재 페이지로 POST 를 쏴서 405 가 돌아온다 —
     학생 화면에는 그게 「네트워크 오류」로 보인다. 아예 가지 않는다. */
  if (!PISTON_URL) {
    return lang === "python"
      ? runPythonInBrowser(code, stdin)
      : { ok: false, output: "", networkError: true }
  }

  const ctl = new AbortController()
  const timeoutId = setTimeout(() => ctl.abort(), timeoutMs)

  try {
    const res = await fetch(PISTON_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(PISTON_KEY ? { Authorization: `Bearer ${PISTON_KEY}` } : {}),
      },
      body: JSON.stringify({
        language: langConf.language,
        version: langConf.version,
        files: [
          {
            name: lang === "python" ? "main.py" : "main.cpp",
            content: lang === "python" ? PY_NO_PROMPT + code : code,
          },
        ],
        ...(stdin ? { stdin } : {}),
      }),
      signal: ctl.signal,
    })

    if (!res.ok) {
      return { ok: false, output: "", networkError: true }
    }

    const data = (await res.json()) as PistonRawResponse

    // 컴파일 실패 (stdin/run 단계 가기 전에 끝남)
    if (data.compile && data.compile.code !== 0) {
      const stderr = (data.compile.stderr || data.compile.output || "").trim()
      return { ok: false, output: "", compileError: stderr }
    }

    const run: PistonStage = data.run ?? {}
    const stdout = (run.stdout || "").trim()
    const stderr = (run.stderr || "").trim()

    // 런타임 에러: 종료 코드 비정상 + stderr 있음
    if (run.code !== undefined && run.code !== 0 && stderr) {
      return { ok: false, output: stdout, runtimeError: stderr }
    }

    return { ok: true, output: stdout }
  } catch {
    return { ok: false, output: "", networkError: true }
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * 네트워크 에러에만 1회 재시도하는 편의 래퍼.
 * 컴파일/런타임 에러는 재시도하지 않음 (학생 코드 문제이므로).
 *
 * 두 번 다 실패하면 **파이썬은 브라우저에서 돌린다**(`runPythonInBrowser`).
 * 재시도를 먼저 하는 이유는 일시적인 5xx 한 번에 학생을 느린 경로로
 * 보내지 않으려는 것이다 — 서버가 살아 있으면 서버가 더 빠르다.
 */
export async function callPistonWithRetry(
  lang: "cpp" | "python",
  code: string,
  stdin?: string,
  retryDelayMs = 400,
): Promise<PistonResult> {
  let result = await callPiston(lang, code, stdin)
  if (result.networkError) {
    await new Promise(r => setTimeout(r, retryDelayMs))
    result = await callPiston(lang, code, stdin)
  }
  if (result.networkError && lang === "python") {
    result = await runPythonInBrowser(code, stdin)
  }
  return result
}
