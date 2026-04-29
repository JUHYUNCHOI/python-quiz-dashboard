"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { Printer, ArrowLeft, ChevronUp } from "lucide-react"
import { STL_SECTIONS, IO_TIPS, type CheatSection } from "./data"

export default function CppStlReferencePage() {
  const { lang, t } = useLanguage()
  const [showTop, setShowTop] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  // 스크롤 시 맨 위로 버튼
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setShowTop(window.scrollY > 400)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50/30 print:bg-white">
      {/* 인쇄 시 가려지는 헤더/네비 */}
      <div className="print:hidden">
        <Header />
      </div>

      <main className="container mx-auto px-4 py-6 pb-32 print:pb-4 print:py-0 max-w-5xl">
        {/* 상단 바 — 인쇄 시 숨김 */}
        <div className="print:hidden mb-6 flex items-center justify-between gap-3 flex-wrap">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("커리큘럼으로", "Back to curriculum")}
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Printer className="h-4 w-4" />
            {t("인쇄 / PDF 저장", "Print / Save PDF")}
          </button>
        </div>

        {/* 제목 */}
        <header className="mb-6 print:mb-3">
          <h1 className="text-3xl font-black text-gray-900 print:text-2xl">
            ⚡ {t("C++ STL 치트시트", "C++ STL Cheatsheet")}
          </h1>
          <p className="text-gray-600 mt-2 print:text-sm">
            {t(
              "코드 짤 때 옆에 띄워놓고 참고하세요. 가장 자주 쓰는 명령만 추렸어요.",
              "Keep this open while coding. Just the commands you'll actually use."
            )}
          </p>
          <p className="text-xs text-gray-400 mt-2 print:hidden">
            {t(
              "💡 인쇄 버튼을 누르면 PDF 로 저장할 수 있어요 (브라우저 인쇄 → PDF로 저장).",
              "💡 Click Print to save as PDF (browser print → Save as PDF)."
            )}
          </p>
        </header>

        {/* 목차 — 인쇄 시 숨김 (긴 한 페이지 PDF 가 더 편함) */}
        <nav className="print:hidden mb-8 p-4 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
            {t("목차", "Contents")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {STL_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-sm font-medium text-gray-700 border border-orange-200 transition-colors"
              >
                <span>{s.emoji}</span>
                <span>{lang === "ko" ? s.title.ko.split(" — ")[0] : s.title.en.split(" — ")[0]}</span>
              </a>
            ))}
            <a
              href="#io"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm font-medium text-gray-700 border border-blue-200 transition-colors"
            >
              💬 I/O
            </a>
          </div>
        </nav>

        {/* 각 섹션 */}
        <div className="space-y-6 print:space-y-3">
          {STL_SECTIONS.map((section) => (
            <Section key={section.id} section={section} lang={lang} />
          ))}

          {/* I/O 섹션 */}
          <section
            id="io"
            className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden print:shadow-none print:border print:rounded-md print:break-inside-avoid"
          >
            <header className="bg-blue-50 px-4 py-3 border-b-2 border-black print:py-2 print:border-b">
              <h2 className="text-xl font-black text-gray-900 print:text-base">
                💬 {t("입출력 (I/O)", "Input / Output")}
              </h2>
              <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
                {t("cin / cout 자주 쓰는 패턴", "Common cin / cout patterns")}
              </p>
            </header>
            <div className="p-4 print:p-2">
              <table className="w-full text-sm">
                <tbody>
                  {(lang === "ko" ? IO_TIPS.ko : IO_TIPS.en).map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-2 pr-3 align-top w-1/2">
                        <code className="font-mono text-xs bg-gray-50 px-2 py-1 rounded text-gray-800 inline-block">
                          {row.code}
                        </code>
                      </td>
                      <td className="py-2 text-gray-700 print:text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 마지막 한 줄 */}
          <div className="text-center text-xs text-gray-400 mt-8 print:mt-4">
            {t(
              "💡 더 자세한 설명은 각 섹션의 레슨에서 확인하세요.",
              "💡 See the linked lesson for full explanations."
            )}
          </div>
        </div>
      </main>

      {/* 맨 위로 가기 버튼 */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="print:hidden fixed bottom-24 right-6 w-12 h-12 rounded-full bg-orange-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-30 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          aria-label={t("맨 위로", "To top")}
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      <div className="print:hidden">
        <BottomNav />
      </div>

      {/* 인쇄 전용 스타일 — globals 에 안 넣고 여기서 인라인 */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            background: white !important;
            font-size: 10pt;
          }
          /* 코드 블록 줄바꿈 허용 */
          code, pre {
            white-space: pre-wrap !important;
            word-break: break-word !important;
          }
          /* 섹션 페이지 끊김 방지 */
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}

// ============================================================
// 한 섹션 (한 컨테이너) 카드
// ============================================================
function Section({ section: s, lang }: { section: CheatSection; lang: "ko" | "en" }) {
  return (
    <section
      id={s.id}
      className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden print:shadow-none print:border print:rounded-md print:break-inside-avoid"
    >
      {/* 헤더 */}
      <header className="bg-orange-50 px-4 py-3 border-b-2 border-black print:py-2 print:border-b print:bg-gray-50">
        <h2 className="text-xl font-black text-gray-900 print:text-base flex items-center gap-2 flex-wrap">
          <span>{s.emoji}</span>
          <span>{lang === "ko" ? s.title.ko : s.title.en}</span>
          {s.lessonId && (
            <Link
              href={`/learn/${s.lessonId}`}
              className="print:hidden ml-auto text-xs font-medium text-blue-600 hover:underline"
            >
              {lang === "ko" ? "→ 레슨 보기" : "→ See lesson"}
            </Link>
          )}
        </h2>
        <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
          {lang === "ko" ? s.header : s.headerEn}
        </p>
      </header>

      <div className="p-4 print:p-2 space-y-3">
        {/* include + 선언 */}
        <div className="bg-gray-50 rounded-lg p-3 print:p-2 print:rounded-sm">
          <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
{s.include}
{s.declare.length > 0 && "\n\n"}
{s.declare.join("\n")}
          </pre>
        </div>

        {/* 명령어 표 */}
        {s.rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm print:text-xs">
              <tbody>
                {s.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-b-0 align-top">
                    <td className="py-1.5 pr-3 w-2/5">
                      <code className="font-mono text-xs bg-gray-50 px-2 py-1 rounded text-gray-800 inline-block whitespace-pre">
                        {row.code}
                      </code>
                    </td>
                    <td className="py-1.5 pr-2 text-gray-700">
                      {lang === "ko" ? row.desc.ko : row.desc.en}
                    </td>
                    {row.note && (
                      <td className="py-1.5 text-xs text-gray-500 italic">
                        {lang === "ko" ? row.note.ko : row.note.en}
                      </td>
                    )}
                    {!row.note && <td />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 순회 패턴 */}
        {s.iterate && (
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              {lang === "ko" ? "순회 패턴" : "Iteration"}
            </div>
            <pre className="font-mono text-xs bg-gray-50 rounded-lg p-3 print:p-2 print:rounded-sm whitespace-pre-wrap leading-relaxed text-gray-800">
{s.iterate}
            </pre>
          </div>
        )}

        {/* 팁 */}
        {s.tip && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 print:p-1.5 print:rounded-sm">
            <p className="text-xs text-gray-700 leading-relaxed">
              💡 <strong>{lang === "ko" ? "팁" : "Tip"}:</strong>{" "}
              {lang === "ko" ? s.tip.ko : s.tip.en}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
