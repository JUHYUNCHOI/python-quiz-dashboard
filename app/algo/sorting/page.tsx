"use client"

/**
 * 정렬 (Sorting) — 챕터식 학습 페이지 v1.
 *
 * 기존 vanilla JS 2965줄 한 페이지 → 5 챕터 React 구조.
 * Bronze 학생에 필수인 것만: sorted() 사용법, 복잡도 직관, 커스텀 key.
 *
 * 교육 원칙: 한 챕터 = 한 가지 + 한 인터랙션 + 한 미니 퀴즈.
 */

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

// ── 챕터 메타 ────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, emoji: "🤔", title: "왜 정렬?",        titleEn: "Why Sort?",          mins: 3 },
  { id: 2, emoji: "🎯", title: "sort() 한 줄",    titleEn: "sort() in One Line", mins: 5 },
  { id: 3, emoji: "⚡", title: "시간복잡도",      titleEn: "Time Complexity",    mins: 6 },
  { id: 4, emoji: "🔧", title: "커스텀 정렬 (key)", titleEn: "Custom Sort (key)",  mins: 7 },
  { id: 5, emoji: "🏆", title: "정리 + 실전",      titleEn: "Recap & Practice",    mins: 5 },
]

const STORAGE_KEY = "algo-sorting-chapter"

type CodeLang = "py" | "cpp"
function CodeBlock({ py, cpp, lang, setLang }: { py: string; cpp: string; lang: CodeLang; setLang: (l: CodeLang) => void }) {
  return (
    <div className="rounded-xl bg-gray-900 overflow-hidden my-3">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5">
        <span className="text-[10px] text-gray-400 font-mono">{lang === "py" ? "Python" : "C++"}</span>
        <div className="flex gap-1">
          <button onClick={() => setLang("py")} className={cn("text-[10px] px-2 py-0.5 rounded font-bold",
            lang === "py" ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600")}>Py</button>
          <button onClick={() => setLang("cpp")} className={cn("text-[10px] px-2 py-0.5 rounded font-bold",
            lang === "cpp" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600")}>C++</button>
        </div>
      </div>
      <pre className="px-4 py-3 text-[13px] text-emerald-300 font-mono overflow-x-auto leading-relaxed">
        <code>{lang === "py" ? py : cpp}</code>
      </pre>
    </div>
  )
}

function MiniQuiz({ question, options, answerIdx, hint, onCorrect }: {
  question: string; options: string[]; answerIdx: number; hint: string; onCorrect: () => void
}) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const handleSelect = (i: number) => {
    setSelected(i)
    if (i === answerIdx) setTimeout(onCorrect, 600)
  }
  const isCorrect = selected === answerIdx
  const isWrong = selected !== null && selected !== answerIdx
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-4">
      <p className="text-xs font-black text-amber-900 mb-2 uppercase tracking-wide">📝 {t("미니 퀴즈", "Mini Quiz")}</p>
      <p className="text-sm font-bold text-gray-900 mb-3">{question}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)} disabled={isCorrect}
            className={cn("text-left px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
              selected === i && i === answerIdx && "bg-green-100 border-green-500 text-green-800",
              selected === i && i !== answerIdx && "bg-red-100 border-red-400 text-red-800",
              selected !== i && "bg-white border-gray-200 hover:border-amber-400 text-gray-700")}>
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      {isCorrect && <p className="mt-3 text-sm font-bold text-green-700">✅ {t("정답!", "Correct!")}</p>}
      {isWrong && (
        <div className="mt-3">
          <button onClick={() => setShowHint(!showHint)} className="text-xs font-bold text-amber-700 underline decoration-dotted">
            💡 {showHint ? t("힌트 닫기", "Hide hint") : t("힌트 보기", "Show hint")}
          </button>
          {showHint && <p className="mt-1.5 text-xs text-amber-800 bg-amber-100 rounded-lg p-2">{hint}</p>}
        </div>
      )}
    </div>
  )
}

// ── Chapter 1: 왜 정렬? ───────────────────────────────────────────
function Chapter1({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-amber-200">
        <p className="text-base text-gray-800 leading-relaxed">
          {t("도서관에 책 100,000 권이 있어요. 'Harry Potter' 찾으려면?", "100,000 books in a library. Need to find 'Harry Potter'?")}
        </p>
        <div className="mt-3 space-y-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm font-bold text-red-700">❌ {t("정렬 안 된 상태", "Unsorted")}</p>
            <p className="text-xs text-gray-700 mt-1">{t("최악 10만 권을 다 살펴봐야 함 — O(N)", "Worst case: check all 100K — O(N)")}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm font-bold text-green-700">✅ {t("정렬된 상태 (알파벳 순)", "Sorted (alphabetical)")}</p>
            <p className="text-xs text-gray-700 mt-1">{t("이분 탐색으로 17 번만 확인 — O(log N)", "Binary search: only ~17 checks — O(log N)")}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
        <p className="text-sm font-bold text-blue-900 mb-2">💭 {t("정렬을 쓰는 진짜 이유?", "Real reasons to sort?")}</p>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm">
            🤔 {t("답 보기", "Reveal")}
          </button>
        ) : (
          <div className="bg-white rounded-lg p-3 border border-blue-300 text-sm text-gray-800 space-y-1">
            <p>1️⃣ <b>{t("검색 빨라짐", "Faster search")}</b> — {t("이분 탐색 가능", "binary search possible")}</p>
            <p>2️⃣ <b>{t("최솟값/최댓값", "Min/max")}</b> — {t("정렬 후 첫/마지막 = O(1)", "first/last = O(1) after sort")}</p>
            <p>3️⃣ <b>{t("중복 처리", "Dedup")}</b> — {t("같은 값들이 옆에 모임", "duplicates land adjacent")}</p>
            <p>4️⃣ <b>{t("그룹화", "Grouping")}</b> — {t("같은 종류 묶기", "group same kind")}</p>
            <p>5️⃣ <b>{t("최적화 ('가장 작은 것 먼저')", "Optimization ('smallest first')")}</b></p>
          </div>
        )}
      </div>

      <CodeBlock lang={codeLang} setLang={setCodeLang}
        py={`# 정렬 한 줄 (Python)
arr = [3, 1, 4, 1, 5, 9, 2, 6]
arr.sort()              # 원본 변경
# 또는
sorted_arr = sorted(arr)  # 새 리스트 반환

print(arr)  # [1, 1, 2, 3, 4, 5, 6, 9]`}
        cpp={`// 정렬 한 줄 (C++)
#include <algorithm>
#include <vector>
using namespace std;

vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
sort(arr.begin(), arr.end());

// arr = {1, 1, 2, 3, 4, 5, 6, 9}`}
      />

      {revealed && (
        <button onClick={onComplete} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
          ✅ {t("이해했어요 — 다음", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── Chapter 2: sort() 한 줄 ──────────────────────────────────────
function Chapter2({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [arr, setArr] = useState([3, 1, 4, 1, 5, 9, 2, 6])
  const [sorted, setSorted] = useState<number[] | null>(null)
  const [quizPassed, setQuizPassed] = useState(false)

  const handleSort = () => setSorted([...arr].sort((a, b) => a - b))
  const handleSortDesc = () => setSorted([...arr].sort((a, b) => b - a))
  const handleReset = () => { setSorted(null); setArr([3, 1, 4, 1, 5, 9, 2, 6]) }

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200">
        <p className="text-sm font-bold text-emerald-900 mb-2">{t("Python 과 C++ 둘 다 한 줄로 정렬", "Sort in one line — both Python & C++")}:</p>
        <div className="bg-white rounded-lg p-3 font-mono text-sm space-y-1 text-emerald-700">
          <p>Python: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">arr.sort()</code> {t("또는", "or")} <code className="bg-emerald-50 px-1.5 py-0.5 rounded">sorted(arr)</code></p>
          <p>C++: <code className="bg-emerald-50 px-1.5 py-0.5 rounded">sort(arr.begin(), arr.end())</code></p>
        </div>
      </div>

      {/* 인터랙티브 — 정렬 직접 해보기 */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-xs font-black text-amber-900 mb-3">🎮 {t("직접 정렬해 보기", "Try sorting")}</p>

        <div className="mb-3">
          <p className="text-[11px] text-gray-500 mb-1">{t("원본", "Original")} arr</p>
          <div className="flex gap-1 flex-wrap">
            {arr.map((v, i) => (
              <div key={i} className="w-10 h-10 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center font-mono font-bold text-gray-700">
                {v}
              </div>
            ))}
          </div>
        </div>

        {sorted && (
          <div className="mb-3">
            <p className="text-[11px] text-gray-500 mb-1">{t("정렬 후", "Sorted")} arr</p>
            <div className="flex gap-1 flex-wrap">
              {sorted.map((v, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center font-mono font-bold text-emerald-700">
                  {v}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={handleSort} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm">
            ↑ {t("오름차순", "Ascending")}
          </button>
          <button onClick={handleSortDesc} className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm">
            ↓ {t("내림차순", "Descending")}
          </button>
          {sorted && (
            <button onClick={handleReset} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">
              ↺ {t("리셋", "Reset")}
            </button>
          )}
        </div>
      </div>

      <CodeBlock lang={codeLang} setLang={setCodeLang}
        py={`arr = [3, 1, 4, 1, 5, 9, 2, 6]

# 오름차순 (기본)
arr.sort()
# → [1, 1, 2, 3, 4, 5, 6, 9]

# 내림차순
arr.sort(reverse=True)
# → [9, 6, 5, 4, 3, 2, 1, 1]

# 원본 안 바꾸고 새 리스트
new_arr = sorted(arr)`}
        cpp={`#include <algorithm>
#include <vector>
using namespace std;

vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 오름차순 (기본)
sort(arr.begin(), arr.end());

// 내림차순 — greater<int>() 비교자
sort(arr.begin(), arr.end(), greater<int>());`}
      />

      <MiniQuiz
        question={t("arr = [5, 2, 8, 1] 에 arr.sort() 후 첫 원소는?", "After arr.sort() on [5, 2, 8, 1], first element?")}
        options={["1", "2", "5", "8"]}
        answerIdx={0}
        hint={t("기본 = 오름차순 — 가장 작은 게 맨 앞", "Default = ascending — smallest first")}
        onCorrect={() => setQuizPassed(true)}
      />

      {quizPassed && (
        <button onClick={onComplete} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
          ✅ {t("이해했어요 — 다음", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── Chapter 3: 시간복잡도 ────────────────────────────────────────
function Chapter3({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [quizPassed, setQuizPassed] = useState(false)
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200">
        <p className="text-sm font-bold text-purple-900 mb-3">
          {t("정렬의 시간복잡도는", "Sort time complexity:")} <b className="text-purple-700 text-base">O(N log N)</b>
        </p>
        <p className="text-xs text-gray-700">
          {t("Python sort, C++ sort 둘 다 O(N log N) — 매우 빠름.", "Python sort & C++ sort: both O(N log N) — very fast.")}
        </p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
        <p className="text-sm font-bold text-gray-900 mb-3">📊 {t("실제 연산 횟수 (대략)", "Operation count (approx)")}</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-1.5 font-bold text-gray-700">N</th>
              <th className="text-right py-1.5 font-bold text-gray-700">N²</th>
              <th className="text-right py-1.5 font-bold text-purple-700">N log N ✨</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            <tr className="border-b border-gray-100"><td className="py-1.5">100</td><td className="text-right text-gray-600">10,000</td><td className="text-right text-purple-700 font-bold">~700</td></tr>
            <tr className="border-b border-gray-100"><td className="py-1.5">10,000</td><td className="text-right text-gray-600">100,000,000</td><td className="text-right text-purple-700 font-bold">~130,000</td></tr>
            <tr className="border-b border-gray-100"><td className="py-1.5">1,000,000</td><td className="text-right text-red-600">10¹² (TLE)</td><td className="text-right text-purple-700 font-bold">~20,000,000</td></tr>
          </tbody>
        </table>
        <p className="text-[11px] text-gray-500 mt-2 italic">
          {t("N=100만 이라도 sort 는 0.02 초. 직접 만든 O(N²) 정렬은 시간초과.", "Even at N=1M, sort takes ~0.02s. Hand-rolled O(N²) sort = TLE.")}
        </p>
      </div>

      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-sm font-bold text-amber-900">
          🎯 {t("결론", "Conclusion")}: {t("직접 정렬 알고리즘 짜지 말고 라이브러리 sort 써요!", "Don't write your own sort — use the library!")}
        </p>
      </div>

      <CodeBlock lang={codeLang} setLang={setCodeLang}
        py={`# ❌ 직접 짠 O(N²) 정렬 — N=10⁶ 면 시간초과
def slow_sort(arr):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]

# ✅ 라이브러리 sort — O(N log N), 빠름
arr.sort()`}
        cpp={`// ❌ 직접 짠 O(N²) 정렬 — N=10⁶ 면 시간초과
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (arr[i] > arr[j]) swap(arr[i], arr[j]);

// ✅ 라이브러리 sort — O(N log N), 빠름
sort(arr.begin(), arr.end());`}
      />

      <MiniQuiz
        question={t("N = 10⁵ 일 때 O(N²) 와 O(N log N) 의 연산 차이는 대략?", "At N = 10⁵, ratio of O(N²) to O(N log N)?")}
        options={[
          t("같음", "About the same"),
          t("100 배 정도 느림", "~100× slower"),
          t("6,000 배 정도 느림 (10¹⁰ vs 1.7×10⁶)", "~6,000× slower (10¹⁰ vs 1.7×10⁶)"),
          t("10 배 정도", "~10× slower"),
        ]}
        answerIdx={2}
        hint={t("10⁵ × 10⁵ = 10¹⁰. 10⁵ × log(10⁵) ≈ 10⁵ × 17 = 1.7×10⁶", "10⁵ × 10⁵ = 10¹⁰. 10⁵ × log(10⁵) ≈ 1.7×10⁶")}
        onCorrect={() => setQuizPassed(true)}
      />

      {quizPassed && (
        <button onClick={onComplete} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
          ✅ {t("이해했어요 — 다음", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── Chapter 4: 커스텀 정렬 (key) ──────────────────────────────────
function Chapter4({ onComplete, codeLang, setCodeLang }: { onComplete: () => void; codeLang: CodeLang; setCodeLang: (l: CodeLang) => void }) {
  const { t } = useLanguage()
  const [quizPassed, setQuizPassed] = useState(false)
  const people = [
    { name: "Alice", age: 25 },
    { name: "Bob",   age: 30 },
    { name: "Carol", age: 22 },
  ]
  const [sortBy, setSortBy] = useState<"name" | "age">("name")
  const sorted = useMemo(() => {
    return [...people].sort((a, b) => sortBy === "name"
      ? a.name.localeCompare(b.name)
      : a.age - b.age)
  }, [sortBy])

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
        <p className="text-sm font-bold text-blue-900 mb-2">
          {t("기본 sort 는 숫자/문자열 비교만. 더 복잡한 정렬은", "Default sort = number/string. For more:")} <code className="bg-white px-1.5 py-0.5 rounded text-purple-700">key</code>{t("/", "/")}<code className="bg-white px-1.5 py-0.5 rounded text-purple-700">comparator</code>
        </p>
        <p className="text-xs text-gray-700">
          {t("예: 이름 알파벳 순? 나이 작은 순? 좌표 거리 순?", "E.g., by name? by age? by distance?")}
        </p>
      </div>

      {/* 인터랙티브 — 정렬 기준 토글 */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-xs font-black text-amber-900 mb-3">🎮 {t("정렬 기준 바꿔보기", "Change sort key")}</p>

        <div className="flex gap-2 mb-3">
          <button onClick={() => setSortBy("name")}
            className={cn("flex-1 py-2 rounded-lg font-bold text-sm transition-all",
              sortBy === "name" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
            {t("이름 순", "By name")}
          </button>
          <button onClick={() => setSortBy("age")}
            className={cn("flex-1 py-2 rounded-lg font-bold text-sm transition-all",
              sortBy === "age" ? "bg-purple-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
            {t("나이 순", "By age")}
          </button>
        </div>

        <div className="space-y-1.5">
          {sorted.map((p, i) => (
            <div key={p.name} className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <span className="text-xs font-mono text-emerald-500">#{i + 1}</span>
              <span className="font-bold text-gray-900">{p.name}</span>
              <span className="text-xs text-gray-500 font-mono">{p.age}{t("세", "yr")}</span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock lang={codeLang} setLang={setCodeLang}
        py={`people = [
    {"name": "Alice", "age": 25},
    {"name": "Bob",   "age": 30},
    {"name": "Carol", "age": 22},
]

# 이름 알파벳 순
people.sort(key=lambda p: p["name"])

# 나이 어린 순
people.sort(key=lambda p: p["age"])

# 나이 많은 순 (역순)
people.sort(key=lambda p: p["age"], reverse=True)

# 여러 기준: 나이 → 이름
people.sort(key=lambda p: (p["age"], p["name"]))`}
        cpp={`struct Person {
    string name;
    int age;
};
vector<Person> people = {{"Alice",25},{"Bob",30},{"Carol",22}};

// 이름 알파벳 순 (lambda 비교자)
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.name < b.name;
     });

// 나이 어린 순
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.age < b.age;
     });

// 여러 기준: 나이 → 이름
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         if (a.age != b.age) return a.age < b.age;
         return a.name < b.name;
     });`}
      />

      <MiniQuiz
        question={t("Python 에서 길이가 짧은 순으로 단어 리스트 정렬하려면?", "Sort words by length in Python?")}
        options={[
          "words.sort()",
          "words.sort(key=lambda w: len(w))",
          "words.sort(reverse=True)",
          "sorted(words, key='length')",
        ]}
        answerIdx={1}
        hint={t("key= 에 함수를 넘기면 그 함수가 반환한 값으로 정렬", "Pass a function to key= — sort uses that function's output")}
        onCorrect={() => setQuizPassed(true)}
      />

      {quizPassed && (
        <button onClick={onComplete} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
          ✅ {t("이해했어요 — 다음", "Got it — Next")} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ── Chapter 5: 정리 + 실전 ──────────────────────────────────────
function Chapter5({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-300">
        <h3 className="text-base font-black text-amber-900 mb-3">📌 {t("핵심 정리", "Key Takeaways")}</h3>
        <ol className="space-y-2 text-sm text-gray-800">
          <li><b>1.</b> {t("정렬 = 검색·최솟값·중복·그룹화의 기초", "Sort = foundation for search/min/dedup/grouping")}</li>
          <li><b>2.</b> Python: <code className="bg-white px-1.5 py-0.5 rounded">arr.sort()</code> {t("또는", "or")} <code className="bg-white px-1.5 py-0.5 rounded">sorted(arr)</code></li>
          <li><b>3.</b> C++: <code className="bg-white px-1.5 py-0.5 rounded">sort(arr.begin(), arr.end())</code></li>
          <li><b>4.</b> {t("복잡도", "Complexity")}: <b>O(N log N)</b> — N=10⁶ 도 0.02 초</li>
          <li><b>5.</b> {t("커스텀", "Custom")}: Python <code className="bg-white px-1.5 py-0.5 rounded">key=lambda</code>, C++ comparator lambda</li>
          <li><b>6.</b> {t("절대 직접 O(N²) 짜지 말기 — 라이브러리 써요", "Never write O(N²) sort — use library")}</li>
        </ol>
      </div>

      <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4">
        <p className="text-sm font-black text-amber-900 mb-2">🏆 {t("실전 문제 추천", "Recommended Practice")}</p>
        <div className="space-y-1.5">
          <a href="https://www.acmicpc.net/problem/2750" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 2750</b> — {t("수 정렬하기 (기초)", "Sort numbers (basic)")} ↗
          </a>
          <a href="https://www.acmicpc.net/problem/10814" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 10814</b> — {t("나이순 정렬 (key 사용)", "Sort by age (uses key)")} ↗
          </a>
          <a href="https://www.acmicpc.net/problem/11650" target="_blank" rel="noopener noreferrer"
            className="block px-3 py-2 bg-white rounded-lg border border-amber-200 hover:border-amber-400 text-sm">
            <b>BOJ 11650</b> — {t("좌표 정렬 (튜플 key)", "Sort coordinates (tuple key)")} ↗
          </a>
        </div>
      </div>

      <button onClick={onComplete} className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg">
        🎉 {t("정렬 마스터!", "Sorting Master!")} <Sparkles className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── 메인 페이지 ──────────────────────────────────────────────────
export default function SortingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [current, setCurrent] = useState(1)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set())
  const [codeLang, setCodeLang] = useState<CodeLang>("py")
  const [isMastered, setIsMastered] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (typeof d.current === "number") setCurrent(d.current)
        if (Array.isArray(d.completed)) setCompletedChapters(new Set(d.completed))
        if (d.mastered) setIsMastered(true)
      }
      const langRaw = localStorage.getItem("algo-code-lang")
      if (langRaw === "py" || langRaw === "cpp") setCodeLang(langRaw)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        current, completed: [...completedChapters], mastered: isMastered,
      }))
    } catch {}
  }, [current, completedChapters, isMastered])

  useEffect(() => {
    try { localStorage.setItem("algo-code-lang", codeLang) } catch {}
  }, [codeLang])

  const completeChapter = (n: number) => {
    setCompletedChapters(prev => new Set(prev).add(n))
    if (n < CHAPTERS.length) {
      setCurrent(n + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsMastered(true)
      if (isAuthenticated && user) {
        const supabase = createClient()
        supabase.from("lesson_progress").upsert({
          user_id: user.id, lesson_id: "algo-sorting", variant: "", progress_type: "complete", completed: true,
        }).then(() => {})
      }
      try {
        const raw = localStorage.getItem("completedLessons")
        const arr = raw ? JSON.parse(raw) : []
        if (!arr.includes("algo-sorting")) {
          arr.push("algo-sorting")
          localStorage.setItem("completedLessons", JSON.stringify(arr))
        }
      } catch {}
    }
  }

  const goToChapter = (n: number) => {
    if (n <= current || completedChapters.has(n)) {
      setCurrent(n)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-24">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <div className="mb-4">
          <button onClick={() => router.push("/algo")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="w-4 h-4" /> {t("알고리즘 토픽", "Algorithm Topics")}
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🔢</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{t("정렬", "Sorting")}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">Bronze</span>
            {isMastered && <span className="text-2xl">⭐</span>}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {CHAPTERS.map(ch => {
              const isDone = completedChapters.has(ch.id)
              const isCurrent = ch.id === current
              const canGo = ch.id <= current || isDone
              return (
                <button key={ch.id} onClick={() => goToChapter(ch.id)} disabled={!canGo}
                  className={cn("text-[11px] font-bold px-2 py-1 rounded-full border transition-all",
                    isCurrent && "bg-orange-500 border-orange-600 text-white shadow-md",
                    !isCurrent && isDone && "bg-green-100 border-green-400 text-green-800",
                    !isCurrent && !isDone && canGo && "bg-white border-gray-300 text-gray-600 hover:border-orange-400",
                    !canGo && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed")}>
                  {isDone && !isCurrent ? "✓" : ch.id}. {t(ch.title, ch.titleEn)}
                </button>
              )
            })}
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
              style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right tabular-nums">
            {completedChapters.size} / {CHAPTERS.length} {t("챕터 완료", "chapters done")}
          </p>
        </div>

        <div className="mb-4 bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm">
          {(() => {
            const ch = CHAPTERS[current - 1]
            return (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t(`챕터 ${current}/${CHAPTERS.length}`, `Chapter ${current}/${CHAPTERS.length}`)} · ⏱ {ch.mins}{t("분", "min")}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">{ch.emoji}</span>
                  {t(ch.title, ch.titleEn)}
                </h2>
              </>
            )
          })()}
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm">
          {current === 1 && <Chapter1 onComplete={() => completeChapter(1)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 2 && <Chapter2 onComplete={() => completeChapter(2)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 3 && <Chapter3 onComplete={() => completeChapter(3)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 4 && <Chapter4 onComplete={() => completeChapter(4)} codeLang={codeLang} setCodeLang={setCodeLang} />}
          {current === 5 && <Chapter5 onComplete={() => completeChapter(5)} />}
        </div>

        {isMastered && (
          <div className="mt-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-4 border-yellow-300 p-5 text-center shadow-lg">
            <div className="text-5xl mb-2">🏆</div>
            <h3 className="text-xl font-black text-amber-900">{t("정렬 마스터!", "Sorting Master!")}</h3>
            <p className="text-sm text-amber-700 mt-1">{t("다음 알고리즘 토픽으로!", "On to the next topic!")}</p>
            <Link href="/algo" className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm">
              🗺️ {t("토픽 목록으로", "Back to Topics")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button onClick={() => goToChapter(current - 1)} disabled={current === 1}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t("이전 챕터", "Prev")}
          </button>
          {completedChapters.has(current) && current < CHAPTERS.length && (
            <button onClick={() => goToChapter(current + 1)}
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5">
              {t("다음 챕터", "Next")} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
