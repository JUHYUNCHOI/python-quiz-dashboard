import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Anthropic from "@anthropic-ai/sdk"

async function requireTeacher(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "teacher") return null
  return user
}

/**
 * POST /api/admin/generate-questions
 * multipart/form-data:
 *   file       : PDF or TXT
 *   language   : "python" | "cpp"
 *   lessonId   : string (e.g. "cpp-7", "13")
 *   difficulty : "쉬움" | "보통" | "어려움" | "mixed"
 *   count      : number (기본 10)
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY 환경변수가 없습니다" }, { status: 500 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const language = (formData.get("language") as string) || "python"
  const lessonId = (formData.get("lessonId") as string) || ""
  const difficulty = (formData.get("difficulty") as string) || "mixed"
  const count = Math.min(20, parseInt((formData.get("count") as string) || "10"))

  if (!file) return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 })

  const isPdf = file.type === "application/pdf"
  const isTxt = file.type === "text/plain" || file.name.endsWith(".txt")
  if (!isPdf && !isTxt) {
    return NextResponse.json({ error: "PDF 또는 TXT 파일만 지원합니다" }, { status: 400 })
  }

  const anthropic = new Anthropic({ apiKey })

  const difficultyNote = difficulty === "mixed"
    ? "쉬움(3개), 보통(4개), 어려움(3개) 비율로 섞어서"
    : `모두 난이도 '${difficulty}'으로`

  const systemPrompt = `당신은 코딩 교육 전문가입니다. 주어진 강의 자료를 분석하여 고품질 4지선다 퀴즈 문제를 생성합니다.

규칙:
- 각 문제는 정확히 4개의 선택지 (options 배열, 0-based index)
- correctAnswer: 정답 index (0~3)
- difficulty: "쉬움" | "보통" | "어려움"
- 코드 실행 문제는 code 필드에 코드 블록 포함
- explanation: 정답 이유 한국어로
- keyConceptTitle / keyConceptDescription: 핵심 개념 요약
- language: "${language}"
- lessonId: "${lessonId || "미지정"}"

반드시 유효한 JSON 배열만 반환하세요. 다른 텍스트 없이.`

  const userPrompt = `다음 강의 자료를 바탕으로 ${difficultyNote} ${count}개의 4지선다 문제를 생성해주세요.

출력 형식 (JSON 배열):
[
  {
    "question": "문제 내용",
    "code": "코드 블록 (없으면 null)",
    "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
    "correctAnswer": 0,
    "difficulty": "쉬움",
    "explanation": "정답 해설",
    "keyConceptTitle": "핵심 개념 제목",
    "keyConceptDescription": "핵심 개념 설명"
  }
]`

  try {
    let response: Anthropic.Message

    if (isPdf) {
      const bytes = await file.arrayBuffer()
      const base64 = Buffer.from(bytes).toString("base64")

      response = await anthropic.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: base64,
              },
            } as any,
            { type: "text", text: userPrompt },
          ],
        }],
      })
    } else {
      // TXT 파일
      const text = await file.text()
      response = await anthropic.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: `강의 자료:\n\n${text}\n\n${userPrompt}`,
        }],
      })
    }

    const raw = response.content[0].type === "text" ? response.content[0].text : ""

    // JSON 추출 (마크다운 코드블록 처리)
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) || raw.match(/(\[[\s\S]*\])/)
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : raw.trim()

    let questions: any[]
    try {
      questions = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json({ error: "AI 응답 파싱 실패", raw }, { status: 500 })
    }

    // language, lessonId 주입
    const enriched = questions.map((q: any, i: number) => ({
      ...q,
      language,
      lessonId: lessonId || q.lessonId || "",
      code: q.code || null,
      tempId: i,  // 리뷰 UI용 임시 ID
    }))

    return NextResponse.json({ questions: enriched })
  } catch (err: any) {
    console.error("[generate-questions]", err)
    return NextResponse.json({ error: err.message || "AI 호출 실패" }, { status: 500 })
  }
}
