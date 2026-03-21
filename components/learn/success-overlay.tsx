"use client"

import { useEffect } from "react"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface SuccessOverlayProps {
  show: boolean
  message: string
  xp?: number
  onClose: () => void
}

export function SuccessOverlay({ show, message, xp = 10, onClose }: SuccessOverlayProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2200)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      {/* 컨페티 파티클 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti-pop"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `-10px`,
              animationDelay: `${Math.random() * 0.4}s`,
              animationDuration: `${1.5 + Math.random() * 1}s`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{
                backgroundColor: ["#FF6B6B","#4ECDC4","#FFE66D","#95E1D3","#F38181","#AA96DA","#FCBAD3","#6BCB77"][i % 8],
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* 메인 카드 */}
      <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl text-center animate-pop-in mx-4 max-w-xs w-full">
        {/* 별 아이콘 */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse-soft" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center">
            <Star className="w-10 h-10 text-white fill-white" />
          </div>
          {/* 작은 별들 */}
          <div className="absolute -top-1 -right-1 text-yellow-400 text-lg animate-spin-slow">✦</div>
          <div className="absolute -bottom-1 -left-1 text-orange-400 text-sm animate-spin-slow-reverse">✦</div>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{message}</h2>
        <p className="text-gray-500 text-sm mb-4">{t("잘 했어요! 계속 해봐요 🚀", "Great job! Keep going 🚀")}</p>

        {/* XP 뱃지 */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold px-5 py-2 rounded-full text-base shadow-md">
          ⚡ +{xp} XP
        </div>
      </div>

      <style jsx>{`
        @keyframes pop-in {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.08); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes confetti-pop {
          0%   { transform: translateY(0) rotate(0deg);    opacity: 1; }
          100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
        }
        .animate-confetti-pop {
          animation: confetti-pop linear forwards;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.6;  transform: scale(1.1); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 1.4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 2.5s linear infinite; }
      `}</style>
    </div>
  )
}
