"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/contexts/auth-context"
import { ALL_TOPICS } from "@/data/algorithm/topics"

// ────────────────────────────────────────────────
// Problem data (sourced from CodeQuest HomeScreen)
// ────────────────────────────────────────────────

interface Problem {
  id: string
  emoji: string
  title: string
  sub: string
}

interface Section {
  label: string
  icon: string
  color: string
  problems: Problem[]
}

const SECTIONS: Section[] = [
  {
    label: "USACO",
    icon: "🐄",
    color: "#d97706",
    problems: [
      { id: "rounding", emoji: "🔄", title: "Roundabout Rounding", sub: "Dec 2024 Bronze #1" },
      { id: "cheese", emoji: "🧀", title: "Cheese Block", sub: "Dec 2024 Bronze #2" },
      { id: "moo", emoji: "🐄", title: "It's Mooin' Time", sub: "Dec 2024 Bronze #3" },
      { id: "permutation", emoji: "🔢", title: "FJ's Fav Permutation", sub: "Jan 2025 Bronze #1" },
      { id: "interview", emoji: "🐄", title: "Bessie's Interview", sub: "Jan 2025 Bronze #2" },
      { id: "balanced", emoji: "🔗", title: "Balanced Subsequences", sub: "Jan 2025 Bronze #3" },
      { id: "checkups", emoji: "🐮", title: "Cow Checkups", sub: "Feb 2025 Bronze #1" },
      { id: "exchange", emoji: "🥛", title: "Milk Exchange", sub: "Feb 2025 Bronze #2" },
      { id: "presents", emoji: "🎁", title: "Stack of Presents", sub: "Feb 2025 Bronze #3" },
      { id: "hps", emoji: "✊", title: "HPS Minus One", sub: "Open 2025 Bronze #1" },
      { id: "cowphotos", emoji: "📸", title: "More Cow Photos", sub: "Open 2025 Bronze #2" },
      { id: "mooin3", emoji: "🐄", title: "Mooin' Time III", sub: "Open 2025 Bronze #3" },
      { id: "logicalmoos", emoji: "🧠", title: "Logical Moos", sub: "Open 2024 Bronze #1" },
      { id: "walkfence", emoji: "🚶", title: "Walking Along a Fence", sub: "Open 2024 Bronze #2" },
      { id: "favperm2", emoji: "🧩", title: "FJ's Fav Perm II", sub: "Open 2024 Bronze #3" },
      { id: "palindrome", emoji: "🎲", title: "Palindrome Game", sub: "Feb 2024 Bronze #1" },
      { id: "milkexchange", emoji: "🥛", title: "Milk Exchange", sub: "Feb 2024 Bronze #2" },
      { id: "productivity", emoji: "📊", title: "Max Productivity", sub: "Feb 2024 Bronze #3" },
      { id: "majority", emoji: "🗳️", title: "Majority Opinion", sub: "Jan 2024 Bronze #1" },
      { id: "cannonball", emoji: "💥", title: "Cannonball", sub: "Jan 2024 Bronze #2" },
      { id: "bacteria", emoji: "🦠", title: "Balancing Bacteria", sub: "Jan 2024 Bronze #3" },
      { id: "candycane", emoji: "🍬", title: "Candy Cane Feast", sub: "Dec 2023 Bronze #1" },
      { id: "cowntact", emoji: "🦠", title: "Cowntact Tracing 2", sub: "Dec 2023 Bronze #2" },
      { id: "fjfarms", emoji: "🌱", title: "FJ Actually Farms", sub: "Dec 2023 Bronze #3" },
      { id: "feb23", emoji: "🔤", title: "FEB", sub: "Open 2023 Bronze #1" },
      { id: "moolang", emoji: "📝", title: "Moo Language", sub: "Open 2023 Bronze #2" },
      { id: "rotshift", emoji: "🔄", title: "Rotate and Shift", sub: "Open 2023 Bronze #3" },
      { id: "hungrycow", emoji: "🐄", title: "Hungry Cow", sub: "Feb 2023 Bronze #1" },
      { id: "stampgrid", emoji: "📮", title: "Stamp Grid", sub: "Feb 2023 Bronze #2" },
      { id: "mooloo", emoji: "📺", title: "Watching Mooloo", sub: "Feb 2023 Bronze #3" },
      { id: "leaders", emoji: "👑", title: "Leaders", sub: "Jan 2023 Bronze #1" },
      { id: "aircond", emoji: "❄️", title: "Air Cownditioning II", sub: "Jan 2023 Bronze #2" },
      { id: "mooops", emoji: "🐮", title: "Moo Operations", sub: "Jan 2023 Bronze #3" },
      { id: "cowcollege", emoji: "🎓", title: "Cow College", sub: "Dec 2022 Bronze #1" },
      { id: "feedcows", emoji: "🌾", title: "Feeding the Cows", sub: "Dec 2022 Bronze #2" },
      { id: "reverseeng", emoji: "🔧", title: "Reverse Engineering", sub: "Dec 2022 Bronze #3" },
      { id: "photoshoot", emoji: "📸", title: "Photoshoot", sub: "Open 2022 Bronze #1" },
      { id: "countliars", emoji: "🤥", title: "Counting Liars", sub: "Open 2022 Bronze #2" },
      { id: "alchemy", emoji: "⚗️", title: "Alchemy", sub: "Open 2022 Bronze #3" },
      { id: "sleepclass", emoji: "😴", title: "Sleeping in Class", sub: "Feb 2022 Bronze #1" },
      { id: "photoshoot2", emoji: "📷", title: "Photoshoot 2", sub: "Feb 2022 Bronze #2" },
      { id: "blocks", emoji: "🧱", title: "Blocks", sub: "Feb 2022 Bronze #3" },
      { id: "herdle", emoji: "🟩", title: "Herdle", sub: "Jan 2022 Bronze #1" },
      { id: "nontrans", emoji: "🎲", title: "Non-Transitive Dice", sub: "Jan 2022 Bronze #2" },
      { id: "drought", emoji: "🏜️", title: "Drought", sub: "Jan 2022 Bronze #3" },
      { id: "lonelyphoto", emoji: "📸", title: "Lonely Photo", sub: "Dec 2021 Bronze #1" },
      { id: "aircond1", emoji: "🌡️", title: "Air Cownditioning", sub: "Dec 2021 Bronze #2" },
      { id: "walkhome", emoji: "🏠", title: "Walking Home", sub: "Dec 2021 Bronze #3" },
      { id: "acowdemia1", emoji: "📚", title: "Acowdemia I", sub: "Open 2021 Bronze #1" },
      { id: "acowdemia2", emoji: "👨‍🔬", title: "Acowdemia II", sub: "Open 2021 Bronze #2" },
      { id: "acowdemia3", emoji: "🐄", title: "Acowdemia III", sub: "Open 2021 Bronze #3" },
      { id: "yearcow", emoji: "🐂", title: "Year of the Cow", sub: "Feb 2021 Bronze #1" },
      { id: "comfycows", emoji: "🐄", title: "Comfortable Cows", sub: "Feb 2021 Bronze #2" },
      { id: "clockfence", emoji: "🔄", title: "Clockwise Fence", sub: "Feb 2021 Bronze #3" },
      { id: "uddered", emoji: "🔤", title: "Uddered but not Herd", sub: "Jan 2021 Bronze #1" },
      { id: "oddphotos", emoji: "📸", title: "Even More Odd Photos", sub: "Jan 2021 Bronze #2" },
      { id: "stalling", emoji: "🐄", title: "Just Stalling", sub: "Jan 2021 Bronze #3" },
      { id: "abcs", emoji: "🔢", title: "Do You Know Your ABCs?", sub: "Dec 2020 Bronze #1" },
      { id: "daisychains", emoji: "🌼", title: "Daisy Chains", sub: "Dec 2020 Bronze #2" },
      { id: "stuckinrut", emoji: "🐄", title: "Stuck in a Rut", sub: "Dec 2020 Bronze #3" },
      { id: "socialdist1", emoji: "😷", title: "Social Distancing I", sub: "Open 2020 Bronze #1" },
      { id: "socialdist2", emoji: "🦠", title: "Social Distancing II", sub: "Open 2020 Bronze #2" },
      { id: "cowntrace", emoji: "🔍", title: "Cowntact Tracing", sub: "Open 2020 Bronze #3" },
      { id: "triangles", emoji: "📐", title: "Triangles", sub: "Feb 2020 Bronze #1" },
      { id: "madscientist", emoji: "🧪", title: "Mad Scientist", sub: "Feb 2020 Bronze #2" },
      { id: "swapity", emoji: "🔀", title: "Swapity Swap", sub: "Feb 2020 Bronze #3" },
      { id: "wordproc", emoji: "📝", title: "Word Processor", sub: "Jan 2020 Bronze #1" },
      { id: "photoshoot20", emoji: "📸", title: "Photoshoot", sub: "Jan 2020 Bronze #2" },
      { id: "race", emoji: "🏃", title: "Race", sub: "Jan 2020 Bronze #3" },
      { id: "cowgym", emoji: "🤸", title: "Cow Gymnastics", sub: "Dec 2019 Bronze #1" },
      { id: "whereami", emoji: "📍", title: "Where Am I?", sub: "Dec 2019 Bronze #2" },
      { id: "livestock", emoji: "🐄", title: "Livestock Lineup", sub: "Dec 2019 Bronze #3" },
      { id: "bucketbrigade", emoji: "🪣", title: "Bucket Brigade", sub: "Open 2019 Bronze #1" },
      { id: "milkfactory", emoji: "🏭", title: "Milk Factory", sub: "Open 2019 Bronze #2" },
      { id: "cowevolution", emoji: "🧬", title: "Cow Evolution", sub: "Open 2019 Bronze #3" },
      { id: "sleepyherd", emoji: "😴", title: "Sleepy Cow Herding", sub: "Feb 2019 Bronze #1" },
      { id: "revegetation", emoji: "🌱", title: "Great Revegetation", sub: "Feb 2019 Bronze #2" },
      { id: "meastraffic", emoji: "🚗", title: "Measuring Traffic", sub: "Feb 2019 Bronze #3" },
      { id: "shellgame", emoji: "🐚", title: "Shell Game", sub: "Jan 2019 Bronze #1" },
      { id: "sleepysort", emoji: "😴", title: "Sleepy Cow Sorting", sub: "Jan 2019 Bronze #2" },
      { id: "guessanimal", emoji: "🐾", title: "Guess the Animal", sub: "Jan 2019 Bronze #3" },
      { id: "mixmilk", emoji: "🥛", title: "Mixing Milk", sub: "Dec 2018 Bronze #1" },
      { id: "bucketlist", emoji: "🪣", title: "The Bucket List", sub: "Dec 2018 Bronze #2" },
      { id: "backforth", emoji: "🔄", title: "Back and Forth", sub: "Dec 2018 Bronze #3" },
      { id: "teamttt", emoji: "❌", title: "Team Tic Tac Toe", sub: "Open 2018 Bronze #1" },
      { id: "milkorder", emoji: "🐄", title: "Milking Order", sub: "Open 2018 Bronze #2" },
      { id: "familytree", emoji: "🌳", title: "Family Tree", sub: "Open 2018 Bronze #3" },
      { id: "teleport", emoji: "🌀", title: "Teleportation", sub: "Feb 2018 Bronze #1" },
      { id: "hoofball", emoji: "⚽", title: "Hoofball", sub: "Feb 2018 Bronze #2" },
      { id: "tameherd", emoji: "🐄", title: "Taming the Herd", sub: "Feb 2018 Bronze #3" },
      { id: "billboard2", emoji: "🪧", title: "Blocked Billboard II", sub: "Jan 2018 Bronze #1" },
      { id: "lifeguards", emoji: "🏊", title: "Lifeguards", sub: "Jan 2018 Bronze #2" },
      { id: "outofplace", emoji: "🔀", title: "Out of Place", sub: "Jan 2018 Bronze #3" },
      { id: "billboard", emoji: "🪧", title: "Blocked Billboard", sub: "Dec 2017 Bronze #1" },
      { id: "bovshuffle", emoji: "🔀", title: "The Bovine Shuffle", sub: "Dec 2017 Bronze #2" },
      { id: "milkmeas", emoji: "📊", title: "Milk Measurement", sub: "Dec 2017 Bronze #3" },
      { id: "lostcow", emoji: "🐄", title: "The Lost Cow", sub: "Open 2017 Bronze #1" },
      { id: "bovgenomics", emoji: "🧬", title: "Bovine Genomics", sub: "Open 2017 Bronze #2" },
      { id: "modernart", emoji: "🎨", title: "Modern Art", sub: "Open 2017 Bronze #3" },
      { id: "crossroad1", emoji: "🐄", title: "Cross the Road", sub: "Feb 2017 Bronze #1" },
      { id: "crossroad2", emoji: "🔀", title: "Cross the Road II", sub: "Feb 2017 Bronze #2" },
      { id: "crossroad3", emoji: "🚪", title: "Cross the Road III", sub: "Feb 2017 Bronze #3" },
      { id: "dontbelast", emoji: "🥛", title: "Don't Be Last!", sub: "Jan 2017 Bronze #1" },
      { id: "hps17", emoji: "✊", title: "Hoof Paper Scissors", sub: "Jan 2017 Bronze #2" },
      { id: "cowtipping", emoji: "🐄", title: "Cow Tipping", sub: "Jan 2017 Bronze #3" },
      { id: "sqpasture", emoji: "⬜", title: "Square Pasture", sub: "Dec 2016 Bronze #1" },
      { id: "blockgame", emoji: "🧊", title: "Block Game", sub: "Dec 2016 Bronze #2" },
      { id: "cowsignal", emoji: "📡", title: "The Cow-Signal", sub: "Dec 2016 Bronze #3" },
    ],
  },
  {
    label: "MCC",
    icon: "🌏",
    color: "#059669",
    problems: [
      { id: "fences", emoji: "🏗️", title: "Building Fences", sub: "MCC 2025 P1" },
      { id: "fans", emoji: "🪭", title: "Fans", sub: "MCC 2025 P2" },
      { id: "tricks", emoji: "🎃", title: "Trick or Treat", sub: "MCC 2025 P3" },
      { id: "word", emoji: "📝", title: "Word Distance", sub: "MCC 2025 P4" },
      { id: "reach", emoji: "🐉", title: "Reachability Queries", sub: "MCC 2025 P5" },
      { id: "subseqmedian", emoji: "📊", title: "Subseq Median Sum", sub: "MCC 2025 P6" },
      { id: "cornercover", emoji: "📐", title: "Corner Cover", sub: "MCC 2024 P1" },
      { id: "gifts", emoji: "🎁", title: "Gifts", sub: "MCC 2024 P2" },
      { id: "magicorbs", emoji: "🔮", title: "Magical Orbs", sub: "MCC 2024 P3" },
      { id: "simplegame", emoji: "🎮", title: "Simple Game", sub: "MCC 2024 P4" },
      { id: "explodingarrow", emoji: "💥", title: "Exploding Arrow", sub: "MCC 2024 P5" },
      { id: "xorstring", emoji: "⊕", title: "XOR The String", sub: "MCC 2024 P6" },
      { id: "collatz", emoji: "🔢", title: "Collatz", sub: "MCC 2023 P1" },
      { id: "mobilegame", emoji: "📱", title: "Mobile Game", sub: "MCC 2023 P2" },
      { id: "innovation", emoji: "💡", title: "Innovation", sub: "MCC 2023 P3" },
      { id: "tichu", emoji: "🃏", title: "Tichu", sub: "MCC 2023 P4" },
      { id: "rectangles", emoji: "▬", title: "Rectangles", sub: "MCC 2023 P5" },
      { id: "sumk", emoji: "∑", title: "Sum^K", sub: "MCC 2023 P6" },
      { id: "mcc19rect", emoji: "📏", title: "Rectangle", sub: "MCC 2019 P1" },
      { id: "mcc19bakery", emoji: "🥖", title: "Bakery", sub: "MCC 2019 P2" },
      { id: "mcc19candy", emoji: "🍬", title: "Candy", sub: "MCC 2019 P3" },
      { id: "mcc19ditcoin", emoji: "💰", title: "Ditcoin", sub: "MCC 2019 P4" },
      { id: "mcc19elim", emoji: "🔢", title: "Elimination", sub: "MCC 2019 P5" },
      { id: "mcc19palindrome", emoji: "🔄", title: "Palindrome", sub: "MCC 2019 P6" },
      { id: "mcc19rect2", emoji: "▭", title: "Rectangle 2", sub: "MCC 2019 P7" },
      { id: "mcc15rect", emoji: "▭", title: "Rectangle", sub: "MCC 2015 P1" },
      { id: "mcc15equation", emoji: "➕", title: "Complete the Equation", sub: "MCC 2015 P2" },
      { id: "mcc15bahasaf", emoji: "🗣️", title: "Bahasa F", sub: "MCC 2015 P3" },
      { id: "mcc15isthmus", emoji: "⛰️", title: "Isthmus", sub: "MCC 2015 P4" },
      { id: "mcc15choco", emoji: "🍫", title: "Chocolate Bars", sub: "MCC 2015 P5" },
      { id: "mcc22grammar", emoji: "📖", title: "Grammar", sub: "MCC 2022 P1" },
      { id: "mcc22aliens", emoji: "👽", title: "Aliens", sub: "MCC 2022 P2" },
      { id: "mcc22maze", emoji: "🏰", title: "Maze", sub: "MCC 2022 P3" },
      { id: "mcc22birthday", emoji: "🎂", title: "Cats' Birthday", sub: "MCC 2022 P4" },
      { id: "mcc22cardshark", emoji: "🃏", title: "Card Shark", sub: "MCC 2022 P5" },
      { id: "mcc22lamp", emoji: "💡", title: "Lamp", sub: "MCC 2022 P6" },
      { id: "mcc21carrots", emoji: "🥕", title: "Carrots", sub: "MCC 2021 P1" },
      { id: "mcc21dvd", emoji: "📀", title: "DVD Screensaver", sub: "MCC 2021 P2" },
      { id: "mcc21marbles", emoji: "🔴", title: "Marbles and Boxes", sub: "MCC 2021 P3" },
      { id: "mcc21glass", emoji: "🥛", title: "Round Glass", sub: "MCC 2021 P4" },
      { id: "mcc21simplemath", emoji: "🔢", title: "Simple Math", sub: "MCC 2021 P5" },
      { id: "mcc21menu", emoji: "📋", title: "Smallest Menu Ever", sub: "MCC 2021 P6" },
      { id: "mcc20cipher", emoji: "🔐", title: "Cipher", sub: "MCC 2020 P1" },
      { id: "mcc20citytour", emoji: "🏙️", title: "City Tour", sub: "MCC 2020 P2" },
      { id: "mcc20kitty", emoji: "🐱", title: "Kitty Numbers", sub: "MCC 2020 P3" },
      { id: "mcc20knight", emoji: "♞", title: "Knight", sub: "MCC 2020 P4" },
      { id: "mcc20missing", emoji: "❓", title: "Missing Number", sub: "MCC 2020 P5" },
      { id: "mcc20zigzag", emoji: "⚡", title: "Zig-zag", sub: "MCC 2020 P6" },
    ],
  },
  {
    label: "MCO",
    icon: "🏆",
    color: "#d97706",
    problems: [
      { id: "mco15badminton", emoji: "🏸", title: "Badminton", sub: "MCO 2015 P1" },
      { id: "mco15honey", emoji: "🍯", title: "Honey", sub: "MCO 2015 P2" },
      { id: "mco15bitcoin", emoji: "₿", title: "Bitcoin", sub: "MCO 2015 P3" },
      { id: "mco15trains", emoji: "🚂", title: "Trains", sub: "MCO 2015 P4" },
      { id: "mco15secret", emoji: "🔐", title: "Secret", sub: "MCO 2015 P5" },
    ],
  },
]

const ALGO_UNLOCK_THRESHOLD = 8

export default function QuestPage() {
  const { t } = useLanguage()
  const { profile } = useAuth()
  const isTeacher = profile?.role === "teacher"

  const [loaded, setLoaded] = useState(false)
  const [algoTopicsDone, setAlgoTopicsDone] = useState(0)
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["USACO", "MCC", "MCO"]))

  useEffect(() => {
    // Load algo progress (same pattern as curriculum/page.tsx)
    try {
      const algoCompleted = JSON.parse(localStorage.getItem("algo-completed") || "[]") as string[]
      const algoCompletedSet = new Set(algoCompleted)
      const topicsDone = ALL_TOPICS.filter(topic =>
        topic.problems.some(p => algoCompletedSet.has(p.id))
      ).length
      setAlgoTopicsDone(topicsDone)
    } catch { /* ignore */ }

    // Load quest solved problems
    try {
      const saved = JSON.parse(localStorage.getItem("quest-solved") || "[]") as string[]
      setSolvedSet(new Set(saved))
    } catch { /* ignore */ }

    setLoaded(true)
  }, [])

  // 잠금 해제 — 모두 풀린 상태로 (이전: 알고리즘 토픽 8개 완료 조건)
  const isUnlocked = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = algoTopicsDone >= ALGO_UNLOCK_THRESHOLD || isTeacher

  const totalProblems = SECTIONS.reduce((acc, s) => acc + s.problems.length, 0)
  const totalSolved = SECTIONS.reduce(
    (acc, s) => acc + s.problems.filter(p => solvedSet.has(p.id)).length,
    0
  )
  const overallPct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0

  const toggleSection = (label: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  // ── Lock screen ──────────────────────────────
  if (loaded && !isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-lg mx-auto px-4 pt-8 pb-24">
          <div className="border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-8 text-center mt-8">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-black mb-2">CodeQuest</h1>
            <p className="text-gray-600 font-semibold mb-6">
              {t(
                "알고리즘 토픽 8개 이상 완료 후 해금됩니다",
                "Complete 8+ algorithm topics to unlock"
              )}
            </p>

            {/* Algo progress bar */}
            <div className="bg-gray-100 border-2 border-black rounded-lg p-4 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">
                  {t("알고리즘 진도", "Algorithm Progress")}
                </span>
                <span className="font-black text-sm">
                  {algoTopicsDone} / {ALL_TOPICS.length}
                </span>
              </div>
              <div className="h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (algoTopicsDone / ALGO_UNLOCK_THRESHOLD) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {t(
                  `${Math.max(0, ALGO_UNLOCK_THRESHOLD - algoTopicsDone)}개 더 완료하면 해금`,
                  `${Math.max(0, ALGO_UNLOCK_THRESHOLD - algoTopicsDone)} more to unlock`
                )}
              </p>
            </div>

            <Link
              href="/algo"
              className="mt-4 inline-block border-2 border-black rounded-lg px-5 py-2 font-bold bg-amber-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {t("알고리즘 학습하러 가기", "Go to Algorithm Lab")}
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    )
  }

  // ── Group problems by contest (for USACO) or year (for MCC/MCO) ──
  function groupByContest(problems: Problem[]): { contest: string; items: Problem[] }[] {
    const map = new Map<string, Problem[]>()
    for (const p of problems) {
      // sub format: "Dec 2024 Bronze #1" or "MCC 2024 P1"
      // group key = everything before the #N or PN
      const key = p.sub.replace(/\s*#\d+$/, "").replace(/\s*P\d+$/, "").trim()
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return Array.from(map.entries()).map(([contest, items]) => ({ contest, items }))
  }

  // Badge color per problem number within contest
  const NUM_COLORS = ["bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800", "bg-purple-100 text-purple-800",
    "bg-green-100 text-green-800", "bg-rose-100 text-rose-800", "bg-teal-100 text-teal-800", "bg-indigo-100 text-indigo-800"]

  // ── Main page ────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-28">

        {/* Page header */}
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl">⚔️</span>
              <h1 className="text-3xl font-black">CodeQuest</h1>
            </div>
            <p className="text-gray-600 font-semibold text-sm">
              {t("인터랙티브 알고리즘 풀이", "Interactive algorithm problem walkthroughs")}
            </p>
          </div>
          <LanguageToggle className="shrink-0 mt-1" />
        </div>

        {/* Overall progress bar */}
        {loaded && (
          <div className="border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm">
                {t("전체 진도", "Overall Progress")}
              </span>
              <span className="font-black text-sm">
                {totalSolved} / {totalProblems} ({overallPct}%)
              </span>
            </div>
            <div className="h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
              <div className="h-full bg-green-400 transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {SECTIONS.map(section => {
            const sectionSolved = section.problems.filter(p => solvedSet.has(p.id)).length
            const sectionTotal = section.problems.length
            const isExpanded = expandedSections.has(section.label)
            const groups = groupByContest(section.problems)

            return (
              <div key={section.label} className="border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">

                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-black text-base tracking-wide uppercase" style={{ color: section.color }}>
                      {section.label}
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 border border-gray-300 rounded-full px-2 py-0.5">
                      {sectionSolved}/{sectionTotal}
                    </span>
                  </div>
                  <span className="text-gray-400 font-bold text-lg">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {/* Contest-grouped problem list */}
                {isExpanded && (
                  <div className="border-t-2 border-black">
                    {groups.map(({ contest, items }) => {
                      const groupSolved = items.filter(p => solvedSet.has(p.id)).length
                      const allDone = groupSolved === items.length && items.length > 0
                      return (
                        <div key={contest} className="border-b-2 border-black last:border-b-0">
                          {/* Contest header row */}
                          <div className={`flex items-center justify-between px-4 py-2.5 ${allDone ? "bg-green-50 border-l-4 border-green-500" : "bg-amber-50 border-l-4 border-amber-400"}`}>
                            <span className={`text-sm font-black uppercase tracking-wide ${allDone ? "text-green-800" : "text-amber-900"}`}>
                              {section.icon} {contest}
                            </span>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${allDone ? "bg-green-100 text-green-700 border-green-300" : groupSolved > 0 ? "bg-amber-100 text-amber-700 border-amber-300" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                              {groupSolved}/{items.length}
                            </span>
                          </div>
                          {/* Problems */}
                          <div className="flex flex-col divide-y divide-gray-100">
                            {items.map((problem, idx) => {
                              const isSolved = solvedSet.has(problem.id)
                              // Extract problem number from sub: "Bronze #2" → "#2", "P3" → "P3"
                              const numMatch = problem.sub.match(/#(\d+)$/) || problem.sub.match(/P(\d+)$/)
                              const numLabel = numMatch ? (problem.sub.includes("#") ? `#${numMatch[1]}` : `P${numMatch[1]}`) : `${idx + 1}`
                              const badgeColor = NUM_COLORS[(parseInt(numMatch?.[1] ?? "1") - 1) % NUM_COLORS.length]

                              return (
                                <Link
                                  key={problem.id}
                                  href={`/quest/${problem.id}`}
                                  className={[
                                    "flex items-center gap-3 px-5 py-3.5 transition-all group",
                                    isSolved
                                      ? "bg-green-50 hover:bg-green-100"
                                      : "bg-white hover:bg-amber-50",
                                  ].join(" ")}
                                >
                                  {/* Problem number badge */}
                                  <span className={`flex-shrink-0 text-xs font-black w-8 text-center px-1.5 py-0.5 rounded-full ${badgeColor}`}>
                                    {numLabel}
                                  </span>
                                  {/* Emoji */}
                                  <span className="text-xl flex-shrink-0 w-8 text-center">{problem.emoji}</span>
                                  {/* Title + sub */}
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-bold text-sm truncate ${isSolved ? "text-green-700" : "text-gray-900 group-hover:text-amber-700"}`}>
                                      {problem.title}
                                    </p>
                                  </div>
                                  {/* Done indicator / arrow */}
                                  <span className="flex-shrink-0 text-base">
                                    {isSolved
                                      ? <span className="text-green-500 font-bold">✓</span>
                                      : <span className="text-gray-300 group-hover:text-amber-400 transition-colors text-lg">→</span>}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-medium">
          {t("문제 계속 추가 예정...", "More problems coming soon...")}
        </p>
      </main>
      <BottomNav />
    </div>
  )
}
