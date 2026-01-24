import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface QuizCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: "orange" | "mint" | "lavender"
  href: string
}

const colorStyles = {
  orange: {
    bg: "bg-gradient-to-br from-orange-100 to-orange-200",
    hover: "hover:from-orange-200 hover:to-orange-300",
    border: "border-orange-300",
    icon: "text-orange-600",
    text: "text-orange-900",
  },
  mint: {
    bg: "bg-gradient-to-br from-teal-100 to-teal-200",
    hover: "hover:from-teal-200 hover:to-teal-300",
    border: "border-teal-300",
    icon: "text-teal-600",
    text: "text-teal-900",
  },
  lavender: {
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    hover: "hover:from-purple-200 hover:to-purple-300",
    border: "border-purple-300",
    icon: "text-purple-600",
    text: "text-purple-900",
  },
}

export function QuizCard({ title, description, icon, color, href }: QuizCardProps) {
  const styles = colorStyles[color]

  return (
    <Link href={href}>
      <Card
        className={cn(
          "group cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[160px] md:min-h-[180px]",
          styles.bg,
          styles.hover,
          styles.border,
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-6 text-center h-full">
          <div className={cn("rounded-full bg-white/80 p-4 transition-transform group-hover:scale-110", styles.icon)}>
            {icon}
          </div>

          <div>
            <h3 className={cn("mb-1 text-lg md:text-xl font-bold", styles.text)}>{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
