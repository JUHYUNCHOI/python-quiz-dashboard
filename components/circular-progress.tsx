"use client"

interface CircularProgressProps {
  score: number
}

export function CircularProgress({ score }: CircularProgressProps) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getColor = () => {
    if (score >= 90) return "#7DD3C0" // mint
    if (score >= 70) return "#FF9F66" // orange
    return "#B4A5D9" // lavender
  }

  return (
    <div className="relative">
      <svg width="180" height="180" className="rotate-[-90deg]">
        {/* Background circle */}
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#f0f0f0" strokeWidth="12" />

        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold" style={{ color: getColor() }}>
          {score}
        </span>
        <span className="text-lg text-gray-500">점</span>
      </div>
    </div>
  )
}
