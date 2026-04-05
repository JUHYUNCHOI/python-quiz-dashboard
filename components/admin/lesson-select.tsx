"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLessonsForLanguage, ALL_LESSONS } from "@/lib/curriculum-lessons"

interface LessonSelectProps {
  value: string
  onChange: (value: string) => void
  language?: string          // if provided, shows only that language's lessons
  placeholder?: string
  includeAll?: boolean       // show "전체" option (for filter use)
}

export function LessonSelect({ value, onChange, language, placeholder = "레슨 선택", includeAll }: LessonSelectProps) {
  const lessons = language ? getLessonsForLanguage(language) : ALL_LESSONS

  // Group lessons by their group label
  const grouped = lessons.reduce<Record<string, typeof lessons>>((acc, l) => {
    if (!acc[l.group]) acc[l.group] = []
    acc[l.group].push(l)
    return acc
  }, {})

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[320px]">
        {includeAll && (
          <SelectItem value="전체">전체 레슨</SelectItem>
        )}
        {Object.entries(grouped).map(([group, items]) => (
          <SelectGroup key={group}>
            <SelectLabel className="text-xs text-gray-500 font-semibold px-2 py-1">{group}</SelectLabel>
            {items.map(l => (
              <SelectItem key={l.id} value={l.id}>
                {l.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
