"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

type ProgrammingLanguage = "python" | "cpp" | "pseudo"

interface Props {
  current: ProgrammingLanguage
  className?: string
}

export function ProgrammingLanguageToggle({ current, className }: Props) {
  const router = useRouter()
  const { t } = useLanguage()

  const handleSwitch = (target: ProgrammingLanguage) => {
    if (target === current) return
    localStorage.setItem("selectedCourse", target)
    router.push("/curriculum")
  }

  return (
    <div className={cn("flex items-center gap-1 bg-gray-100 rounded-full p-1", className)}>
      <button
        onClick={() => handleSwitch("python")}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all",
          current === "python"
            ? "bg-white text-orange-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🐍 Python
      </button>
      <button
        onClick={() => handleSwitch("cpp")}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all",
          current === "cpp"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        ⚡ C++
      </button>
      <button
        onClick={() => handleSwitch("pseudo")}
        className={cn(
          "px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all",
          current === "pseudo"
            ? "bg-white text-green-600 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        📋 Pseudo
      </button>
    </div>
  )
}
