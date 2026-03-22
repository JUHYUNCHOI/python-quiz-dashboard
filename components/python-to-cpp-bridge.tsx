"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { cn } from "@/lib/utils"

// ---- 핵심 문법 비교 데이터 ----
const SYNTAX_MAP = [
  {
    label: "출력",
    labelEn: "Print",
    py: 'print("Hello")',
    cpp: 'cout << "Hello" << endl;',
  },
  {
    label: "변수",
    labelEn: "Variable",
    py: "x = 5\nname = \"Alice\"",
    cpp: "int x = 5;\nstring name = \"Alice\";",
  },
  {
    label: "입력",
    labelEn: "Input",
    py: "x = int(input())",
    cpp: "int x;\ncin >> x;",
  },
  {
    label: "조건문",
    labelEn: "Conditional",
    py: "if x > 0:\n    print(x)",
    cpp: "if (x > 0) {\n    cout << x;\n}",
  },
  {
    label: "for 반복문",
    labelEn: "For loop",
    py: "for i in range(5):\n    print(i)",
    cpp: "for (int i = 0; i < 5; i++) {\n    cout << i;\n}",
  },
  {
    label: "함수",
    labelEn: "Function",
    py: "def add(a, b):\n    return a + b",
    cpp: "int add(int a, int b) {\n    return a + b;\n}",
  },
  {
    label: "리스트 / 벡터",
    labelEn: "List / Vector",
    py: "nums = [1, 2, 3]\nnums.append(4)",
    cpp: "vector<int> nums = {1, 2, 3};\nnums.push_back(4);",
  },
  {
    label: "주석",
    labelEn: "Comment",
    py: "# 이게 주석이에요",
    cpp: "// 이게 주석이에요",
  },
]

// ---- Python 지식 → C++ 레슨 대응표 ----
const LESSON_MAP = [
  {
    pyRange: "Python 1~5레슨",
    pyRangeEn: "Python lessons 1–5",
    cppLesson: "cpp-1 ~ cpp-5",
    desc: "변수, 타입, 입출력, 연산자",
    descEn: "Variables, types, I/O, operators",
  },
  {
    pyRange: "Python 11~14레슨",
    pyRangeEn: "Python lessons 11–14",
    cppLesson: "cpp-6 ~ cpp-8",
    desc: "조건문, 반복문, 함수",
    descEn: "Conditionals, loops, functions",
  },
  {
    pyRange: "Python 15~26레슨",
    pyRangeEn: "Python lessons 15–26",
    cppLesson: "cpp-9 ~ cpp-14",
    desc: "배열/벡터, 문자열, 클래스",
    descEn: "Arrays/vectors, strings, classes",
  },
  {
    pyRange: "Python 전체 완료",
    pyRangeEn: "Python fully complete",
    cppLesson: "cpp-15 ~ cpp-20",
    desc: "알고리즘, 자료구조 심화, USACO 준비",
    descEn: "Algorithms, advanced structures, USACO prep",
  },
]

// ---- 핵심 차이점 ----
const KEY_DIFFS = [
  {
    icon: "⚡",
    title: "세미콜론 필수 ;",
    titleEn: "Semicolons required ;",
    desc: "Python과 달리 모든 문장 끝에 ; 를 붙여야 해요",
    descEn: "Unlike Python, every statement must end with ;",
  },
  {
    icon: "🔧",
    title: "타입 선언 필수",
    titleEn: "Type declarations required",
    desc: "변수를 만들 때 int, double, string 등 타입을 써야 해요",
    descEn: "Must declare type (int, double, string) when creating variables",
  },
  {
    icon: "🧱",
    title: "중괄호 { } 로 블록 구분",
    titleEn: "Curly braces { } for blocks",
    desc: "Python의 들여쓰기(:) 대신 { } 로 코드 블록을 감싸요",
    descEn: "Use { } instead of Python's colon + indentation",
  },
  {
    icon: "📦",
    title: "#include 헤더 필요",
    titleEn: "#include headers needed",
    desc: "코드 맨 위에 #include <iostream> 등을 추가해야 해요",
    descEn: "Add #include <iostream> etc. at the top of your file",
  },
]

interface Props {
  onDismiss: () => void
}

export function PythonToCppBridge({ onDismiss }: Props) {
  const { t } = useLanguage()
  const [openSection, setOpenSection] = useState<"syntax" | "diffs" | "lessons" | null>("diffs")

  const toggle = (section: "syntax" | "diffs" | "lessons") => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  return (
    <Card className="border-0 bg-white p-4 shadow-lg border-l-4 border-l-blue-400">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base">🐍</span>
            <span className="text-base">→</span>
            <span className="text-base">⚡</span>
            <span className="font-bold text-gray-800 text-sm">
              {t("Python에서 C++로", "Python → C++ Guide")}
            </span>
          </div>
          <p className="text-xs text-gray-400 ml-1">
            {t(
              "Python을 이미 알면 C++은 훨씬 쉬워요!",
              "Knowing Python makes C++ much easier!",
            )}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-300 hover:text-gray-500 transition-colors p-1 shrink-0"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Section 1: 핵심 차이점 */}
      <CollapsibleSection
        title={t("핵심 차이점 4가지", "4 Key Differences")}
        open={openSection === "diffs"}
        onToggle={() => toggle("diffs")}
      >
        <div className="space-y-2">
          {KEY_DIFFS.map((d) => (
            <div key={d.icon} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-base shrink-0 mt-0.5">{d.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-800">{t(d.title, d.titleEn)}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{t(d.desc, d.descEn)}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Section 2: 문법 비교 */}
      <CollapsibleSection
        title={t("문법 나란히 비교", "Side-by-side Syntax")}
        open={openSection === "syntax"}
        onToggle={() => toggle("syntax")}
      >
        <div className="space-y-2">
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-[10px] font-bold text-green-600 text-center bg-green-50 py-1 rounded">
              🐍 Python
            </div>
            <div className="text-[10px] font-bold text-blue-600 text-center bg-blue-50 py-1 rounded">
              ⚡ C++
            </div>
          </div>
          {SYNTAX_MAP.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                {t(item.label, item.labelEn)}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <CodeBox lang="python" code={item.py} />
                <CodeBox lang="cpp" code={item.cpp} />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Section 3: 어디서 시작해야 해? */}
      <CollapsibleSection
        title={t("내 Python 실력 → 어느 C++ 레슨?", "My Python skills → Which C++ lesson?")}
        open={openSection === "lessons"}
        onToggle={() => toggle("lessons")}
      >
        <div className="space-y-2">
          {LESSON_MAP.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex flex-col items-center shrink-0 mt-0.5">
                <span className="text-xs font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  🐍 {t(item.pyRange, item.pyRangeEn).split(" ").slice(-1)[0]}
                </span>
                <span className="text-[10px] text-gray-300 my-0.5">↓</span>
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  ⚡ {item.cppLesson}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500">{t(item.desc, item.descEn)}</p>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-gray-400 text-center pt-1">
            {t(
              "💡 C++을 처음 배운다면 cpp-1부터 시작하세요!",
              "💡 New to C++? Start from cpp-1!",
            )}
          </p>
        </div>
      </CollapsibleSection>
    </Card>
  )
}

// ---- 공통 서브 컴포넌트 ----

function CollapsibleSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-gray-100 pt-2 mt-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-1.5 text-left"
      >
        <span className="text-xs font-bold text-gray-700">{title}</span>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  )
}

function CodeBox({ lang, code }: { lang: "python" | "cpp"; code: string }) {
  const isPy = lang === "python"
  return (
    <div
      className={cn(
        "rounded-lg p-2 font-mono text-[9px] leading-tight whitespace-pre overflow-x-auto",
        isPy ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800",
      )}
    >
      {code}
    </div>
  )
}
