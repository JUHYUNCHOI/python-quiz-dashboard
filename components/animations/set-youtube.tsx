"use client"

import { useState } from "react"
import { Plus, Search, RefreshCw, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

// Set 애니메이션 - 유튜브 좋아요
export function SetAnimationYoutube({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const initialUsers = isEn ? ["Tom", "Anna", "Sam"] : ["철수", "영희", "민수"]
  const allUsers = isEn ? ["Tom", "Anna", "Sam", "Jake", "Lucy", "Ben"] : ["철수", "영희", "민수", "지민", "수진", "현우"]
  const [likedUsers, setLikedUsers] = useState<string[]>(initialUsers)
  const [bounceItem, setBounceItem] = useState<string | null>(null)
  const [rejectItem, setRejectItem] = useState<string | null>(null)
  const [showProblem, setShowProblem] = useState(true)
  const [overlay, setOverlay] = useState<{ emoji: string; text: string; subtext?: string } | null>(null)
  const [likeCount, setLikeCount] = useState(3)

  const tryLike = () => {
    if (overlay) return
    
    // 50% 확률로 이미 좋아요 누른 사람이 다시 시도
    const tryDuplicate = Math.random() > 0.5 && likedUsers.length > 0
    
    if (tryDuplicate) {
      const existing = likedUsers[Math.floor(Math.random() * likedUsers.length)]
      setRejectItem(existing)
      setBounceItem(existing)
      
      setOverlay({ emoji: "❌", text: isEn ? `${existing} already liked this!` : `${existing}님은 이미 눌렀어요!`, subtext: isEn ? "Only one like per person!" : "좋아요는 한 번만!" })
      
      setTimeout(() => {
        setOverlay(null)
        setRejectItem(null)
        setBounceItem(null)
      }, 1500)
    } else {
      const available = allUsers.filter(u => !likedUsers.includes(u))
      if (available.length > 0) {
        const newUser = available[Math.floor(Math.random() * available.length)]
        setLikedUsers([...likedUsers, newUser])
        setLikeCount(prev => prev + 1)
        setBounceItem(newUser)
        
        setOverlay({ emoji: "👍", text: isEn ? `${newUser} liked this!` : `${newUser}님이 좋아요!`, subtext: isEn ? `${likeCount + 1} likes!` : `좋아요 ${likeCount + 1}개!` })
        
        setTimeout(() => {
          setOverlay(null)
          setBounceItem(null)
        }, 1500)
      } else {
        setOverlay({ emoji: "🎉", text: isEn ? "Everyone liked it!" : "모두 좋아요 눌렀어요!", subtext: isEn ? "No more users to add" : "더 이상 누를 사람이 없어요" })
        setTimeout(() => setOverlay(null), 1500)
      }
    }
  }

  const checkWhoLiked = () => {
    if (likedUsers.length === 0 || overlay) return
    const user = likedUsers[Math.floor(Math.random() * likedUsers.length)]
    setBounceItem(user)
    
    setOverlay({ emoji: "⚡", text: isEn ? `Did ${user} like this?` : `${user}님이 눌렀나요?`, subtext: isEn ? "Yes! Checked instantly!" : "Yes! 바로 확인!" })
    
    setTimeout(() => {
      setOverlay(null)
      setBounceItem(null)
    }, 1500)
  }

  const reset = () => {
    setLikedUsers(initialUsers)
    setBounceItem(null)
    setRejectItem(null)
    setShowProblem(true)
    setOverlay(null)
    setLikeCount(3)
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-lg text-red-800">{isEn ? "Set - collection" : "Set - 집합"}</h3>
        </div>
        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">{isEn ? "Like button 👍" : "좋아요 버튼 👍"}</span>
      </div>

      {showProblem ? (
        <div className="space-y-4">
          {/* 문제 상황 */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl animate-bounce">😱</span>
              <div>
                <p className="text-xl font-black">{isEn ? "Using a list for likes?" : "리스트로 좋아요 관리하면?"}</p>
                <p className="text-red-200 text-sm">{isEn ? "The same person can like multiple times!" : "같은 사람이 여러 번 누를 수 있어요!"}</p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm space-y-1">
              <div className="text-white">{isEn ? 'likes = ["Tom", "Anna", "Tom"]' : 'likes = ["철수", "영희", "철수"]'}</div>
              <div className="text-white">{isEn ? '# Tom liked it twice? 🤔' : '# 철수가 2번 눌렀다고? 🤔'}</div>
              <div className="text-yellow-300">{isEn ? '# The like count gets wrong!' : '# 좋아요 수가 이상해져요!'}</div>
            </div>
          </div>

          {/* 해결책 */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">👍</span>
              <div>
                <p className="text-xl font-black">{isEn ? "Set blocks duplicates automatically!" : "집합은 중복 자동 차단!"}</p>
                <p className="text-green-200 text-sm">{isEn ? "Even if one person likes multiple times, it counts as 1!" : "한 사람이 여러 번 눌러도 1개!"}</p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm">
              <span className="text-green-300">likes = {isEn ? `{"Tom", "Anna"}  # no duplicates!` : `{"철수", "영희"}  # 중복 불가!`}</span>
            </div>
          </div>

          <button 
            onClick={() => setShowProblem(false)}
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg font-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isEn ? "👆 Try it yourself!" : "👆 직접 해보기!"}
          </button>
        </div>
      ) : (
        <>
          {/* 핵심 설명 */}
          <div className="bg-red-100 border-2 border-red-300 rounded-lg px-4 py-2">
            <p className="text-sm text-red-800">
              {isEn ? <>👍 <strong>YouTube like</strong> = counts as 1 even if the same person likes multiple times!</> : <>👍 <strong>유튜브 좋아요</strong> = 한 사람이 여러 번 눌러도 1번만 카운트!</>}
            </p>
          </div>

          {/* 영상 썸네일 + 좋아요 */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 border-4 border-slate-700 shadow-inner relative overflow-hidden">
            {/* 오버레이 */}
            {overlay && (
              <div className={cn(
                "absolute inset-0 rounded-lg z-20 flex items-center justify-center",
                overlay.emoji === "❌" ? "bg-red-500/95" : 
                overlay.emoji === "⚡" ? "bg-blue-500/95" : "bg-green-500/95"
              )}>
                <div className="text-center text-white">
                  <div className="text-6xl mb-2 animate-bounce">{overlay.emoji}</div>
                  <div className="text-2xl font-black">{overlay.text}</div>
                  {overlay.subtext && (
                    <div className="text-lg mt-1 opacity-90">{overlay.subtext}</div>
                  )}
                </div>
              </div>
            )}
            
            {/* 영상 썸네일 */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <div>
                  <p className="text-white font-bold">{isEn ? "Python Lesson #15" : "파이썬 강좌 #15"}</p>
                  <p className="text-white/70 text-sm">{isEn ? "Learning data structures!" : "자료구조 배우기!"}</p>
                </div>
              </div>
            </div>
            
            {/* 좋아요 버튼 + 카운트 */}
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={tryLike}
                disabled={overlay !== null}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-full transition-all"
              >
                <span className="text-2xl">👍</span>
                <span className="text-white font-bold text-lg">{likeCount}</span>
              </button>
              <p className="text-white/60 text-sm">{isEn ? "Try clicking like!" : "좋아요 눌러보기!"}</p>
            </div>
            
            {/* 누가 눌렀나? */}
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/60 text-xs mb-2">{isEn ? "👥 People who liked (Set)" : "👥 좋아요 누른 사람들 (Set)"}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl text-red-400 font-bold">{"{"}</span>
                {likedUsers.map((user, i) => (
                  <div key={`${user}-${i}`}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-all duration-300",
                      "bg-red-500/80 text-white",
                      bounceItem === user && "animate-bounce ring-2 ring-white scale-110"
                    )}>
                    {user}
                  </div>
                ))}
                <span className="text-xl text-red-400 font-bold">{"}"}</span>
                {rejectItem && (
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-500/80 text-white animate-reject">
                    {rejectItem} 🚫
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs text-white/40 mt-3 text-center">{isEn ? "❌ No order | ❌ No duplicates | ⚡ Check instantly" : "❌ 순서 없음 | ❌ 중복 불가 | ⚡ \"눌렀나?\" 바로 확인"}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={tryLike} disabled={overlay !== null} className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Plus className="w-4 h-4" /> {isEn ? "Like" : "좋아요 누르기"}
            </button>
            <button onClick={checkWhoLiked} disabled={likedUsers.length === 0 || overlay !== null} className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-bold shadow">
              <Search className="w-4 h-4" /> {isEn ? "Check?" : "눌렀나?"}
            </button>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-bold shadow">
              <RefreshCw className="w-4 h-4" /> {isEn ? "Reset" : "리셋"}
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400">{isEn ? "# set = no duplicates, no order" : "# 집합 = 중복X, 순서X"}</span><br />
            <span className="text-red-400">likes</span><span className="text-white"> = {"{"}</span>
            <span className="text-yellow-400">"{likedUsers.join('", "')}"</span>
            <span className="text-white">{"}"}</span>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes reject { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(50px); opacity: 0; } }
        .animate-reject { animation: reject 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
