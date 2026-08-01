"use client"

/**
 * 중심에서 넓히기 (Center Expansion) — 집중 학습 페이지.
 *
 * 표준 20개 알고리즘 토픽에는 없지만(2026-07-02 결정), Cow Checkups quest 의 핵심 기법이라
 * "이 알고리즘 공부하고 싶다"는 학생 요청(선생님 2026-07-31)에 맞춰 전용 학습 페이지를 둔다.
 * 고전 예제 = 회문(palindrome). 실제 응용 = 구간 뒤집기(Checkups) → 검증된 ExpandSim 재사용.
 */

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { HighlightedCode } from "@/components/algo/highlighted-code"
import { CheckupsExpandSim } from "@/quest-problems/checkups/sims"

const PY = `def count_palindromes(s):
    n = len(s)
    total = 0
    for c in range(2 * n - 1):       # 모든 중심: 글자(홀수) + 사이(짝수)
        l = c // 2
        r = l + (c % 2)              # 홀수 중심 l==r, 짝수 중심 r=l+1
        while l >= 0 and r < n and s[l] == s[r]:
            total += 1               # s[l..r] 이 회문
            l -= 1                   # 넓히기 — 양 끝 2칸만 움직임
            r += 1
    return total`

const CPP = `int countPalindromes(string s) {
    int n = s.size(), total = 0;
    for (int c = 0; c < 2 * n - 1; c++) {   // 모든 중심
        int l = c / 2, r = l + (c % 2);
        while (l >= 0 && r < n && s[l] == s[r]) {
            total++;                         // s[l..r] 이 회문
            l--;                             // 넓히기 — 양 끝 2칸만 움직임
            r++;
        }
    }
    return total;
}`

// 회문 'level' 을 중심에서 넓히는 정적 그림 — 짝지어 확인되는 양 끝을 색으로.
function LevelViz() {
  const s = "level".split("")
  // 중심 v(2). 단계: [2,2]→[1,3]→[0,4]. 각 단계에서 새로 확인되는 두 끝 index.
  const layers = [
    { pair: [2, 2] as const, color: "#8b5cf6", label: "중심 v", labelEn: "center v" },
    { pair: [1, 3] as const, color: "#0891b2", label: "e = e ✓", labelEn: "e = e ✓" },
    { pair: [0, 4] as const, color: "#16a34a", label: "l = l ✓", labelEn: "l = l ✓" },
  ]
  const { t } = useLanguage()
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="flex gap-2">
        {s.map((ch, i) => {
          const layer = layers.find(L => L.pair[0] === i || L.pair[1] === i)
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                style={{
                  width: 40, height: 40, borderRadius: 8, display: "flex",
                  alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18,
                  fontFamily: "'JetBrains Mono', monospace",
                  border: `2px solid ${layer ? layer.color : "#cbd5e1"}`,
                  background: layer ? `${layer.color}18` : "#fff",
                  color: layer ? layer.color : "#475569",
                }}
              >{ch}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{i}</div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
        {layers.map((L, i) => (
          <span key={i} style={{ color: L.color, fontWeight: 700 }}>
            {i === 0 ? "" : "→ "}{t(L.label, L.labelEn)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CenterExpansionLearnPage() {
  const { t, lang } = useLanguage()
  const E = lang === "en"
  const [codeLang, setCodeLang] = useState<"py" | "cpp">("py")

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/40 to-white pb-24">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {/* breadcrumb */}
        <Link href="/algo" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-violet-600 mb-3">
          <ArrowLeft className="w-4 h-4" /> {t("알고리즘", "Algorithms")}
        </Link>

        {/* title */}
        <div className="rounded-2xl border-2 border-violet-200 bg-white p-5 mb-4 text-center">
          <div className="text-3xl mb-1">📏</div>
          <h1 className="text-xl font-extrabold text-violet-700">
            {t("중심에서 넓히기", "Center Expansion")}
          </h1>
          <p className="text-sm text-slate-500 mt-1" style={{ wordBreak: "keep-all" }}>
            {t("가운데에서 양옆으로 한 칸씩 — 넓힐 때마다 양 끝 2칸만 새로 확인.",
               "Grow outward from a middle — each step only the two ends are new.")}
          </p>
        </div>

        {/* 1. 뭐냐 — 회문 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 mb-4">
          <h2 className="font-bold text-slate-800 mb-2">
            1. {t("회문으로 감 잡기", "Get it with palindromes")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed" style={{ wordBreak: "keep-all" }}>
            {t("회문(palindrome)은 앞뒤로 읽어도 같은 말이에요 — 'level', 'noon'. 가운데 글자에서 시작해 양옆이 같은지 확인하며 한 칸씩 넓혀가요.",
               "A palindrome reads the same backward — 'level', 'noon'. Start at the middle and widen one step at a time, checking the two ends match.")}
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3">
            <LevelViz />
          </div>
        </section>

        {/* 2. 핵심 */}
        <section className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/60 p-5 mb-4">
          <h2 className="font-bold text-cyan-800 mb-2">
            2. {t("핵심 — 왜 빠른가", "Key — why it's fast")}
          </h2>
          <p className="text-sm text-cyan-900 leading-relaxed" style={{ wordBreak: "keep-all" }}>
            {t("넓혀도 가운데 값은 절대 안 변해요. 그러니 매 단계 새로 볼 건 양 끝 2칸뿐 — 다시 세지 않아요. 한 단계 = O(1). 모든 중심을 돌아도 전체 O(N²).",
               "The middle never changes as you widen. So each step only the two ends are new — nothing gets recounted. One step = O(1); over every center, O(N²) total.")}
          </p>
        </section>

        {/* 3. 실제 응용 — ExpandSim (검증된 시뮬 재사용) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 mb-4">
          <h2 className="font-bold text-slate-800 mb-1 px-1">
            3. {t("직접 보기 — 구간 뒤집기에 그대로", "See it — same trick on interval flips")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed px-1 mb-2" style={{ wordBreak: "keep-all" }}>
            {t("같은 아이디어를 '구간을 뒤집기'에 쓴 게 Cow Checkups 문제예요. Next ▶ 로 구간이 넓어지며 양 끝만 갱신되는 걸 보세요.",
               "The Cow Checkups problem applies the same idea to flipping an interval. Press Next ▶ and watch the window widen, updating only the two ends.")}
          </p>
          <CheckupsExpandSim E={E} />
          <Link
            href="/quest/checkups"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 px-1"
          >
            {t("Cow Checkups 문제 풀어보기", "Try the Cow Checkups problem")} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* 4. 코드 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-slate-800">
              4. {t("코드 — 회문 개수 세기", "Code — count palindromes")}
            </h2>
            <div className="flex bg-slate-100 rounded-md p-0.5 gap-0.5">
              {(["py", "cpp"] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setCodeLang(l)}
                  className={
                    "px-2.5 py-1 rounded text-xs font-bold " +
                    (codeLang === l ? "bg-white text-violet-700 shadow-sm" : "text-slate-500")
                  }
                >{l === "py" ? "Python" : "C++"}</button>
              ))}
            </div>
          </div>
          <HighlightedCode code={codeLang === "py" ? PY : CPP} lang={codeLang} />
          <p className="text-xs text-slate-500 mt-2 leading-relaxed" style={{ wordBreak: "keep-all" }}>
            {t("while 안에서 l 은 왼쪽으로, r 은 오른쪽으로 한 칸씩 — 딱 양 끝 두 칸만 움직여요. 그래서 빠릅니다.",
               "Inside the while, l steps left and r steps right — exactly the two ends move. That's what makes it fast.")}
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
