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
export async function callPiston(
  lang: "cpp" | "python",
  code: string,
  stdin?: string,
  timeoutMs = 15000,
): Promise<PistonResult> {
  const langConf = PISTON_LANG_VERSION[lang] ?? PISTON_LANG_VERSION.cpp

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
            content: code,
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
  return result
}
