import { pythonQuestions } from "../data/questions/python-questions"
import { cppQuestions } from "../data/questions/cpp-questions"

const CPP_ORDER: Record<string, number> = {
  "cpp-1":1,"cpp-2":2,"cpp-3":3,"cpp-4":4,"cpp-5":5,"cpp-6":6,"cpp-7":7,"cpp-8":8,"cpp-p1":8.5,
  "cpp-9":9,"cpp-21":10,"cpp-10":11,"cpp-11":12,"cpp-12":13,"cpp-13":14,"cpp-14":15,"cpp-22":16,"cpp-p2":16.5,
  "cpp-15":17,"cpp-23":18,"cpp-16":19,"cpp-17":20,"cpp-18":21,"cpp-19":22,"cpp-20":23,"cpp-p3":23.5,
}

function report(label: string, questions: typeof pythonQuestions, idType: "number"|"string") {
  const map = new Map<string, {easy:number, mid:number, hard:number}>()

  for (const q of questions) {
    const lid = String(q.lessonId)
    if (lid === "algo-preview" || lid === "retired" || lid === "deprecated") continue
    if (!map.has(lid)) map.set(lid, {easy:0, mid:0, hard:0})
    const e = map.get(lid)!
    if (q.difficulty === "쉬움") e.easy++
    else if (q.difficulty === "보통") e.mid++
    else if (q.difficulty === "어려움") e.hard++
  }

  const sorted = [...map.entries()].sort(([a],[b]) =>
    idType === "number" ? Number(a)-Number(b) : (CPP_ORDER[a]??99)-(CPP_ORDER[b]??99)
  )

  console.log(`\n${"=".repeat(68)}`)
  console.log(`📊 ${label}`)
  console.log("=".repeat(68))
  console.log(`${"레슨".padEnd(10)} ${"쉬움".padStart(4)} ${"보통".padStart(4)} ${"어려움".padStart(6)} ${"합계".padStart(4)}  ${"어려움비율".padStart(7)}  문제`)
  console.log("-".repeat(68))

  let noHard = 0, noMid = 0, total = 0

  for (const [lid, d] of sorted) {
    const sum = d.easy + d.mid + d.hard
    const hardPct = sum > 0 ? Math.round(d.hard/sum*100) : 0
    const bar = hardPct === 0 ? "❌ 없음" : hardPct < 20 ? "⚠️  부족" : "✅"
    console.log(
      `${lid.padEnd(10)} ${String(d.easy).padStart(4)} ${String(d.mid).padStart(4)} ${String(d.hard).padStart(6)} ${String(sum).padStart(4)}  ${(hardPct+"%").padStart(6)}   ${bar}`
    )
    if (d.hard === 0) noHard++
    if (d.mid === 0) noMid++
    total++
  }

  const allHard = [...map.values()].reduce((s,d)=>s+d.hard,0)
  const allMid  = [...map.values()].reduce((s,d)=>s+d.mid,0)
  const allEasy = [...map.values()].reduce((s,d)=>s+d.easy,0)
  const allTotal = allHard+allMid+allEasy

  console.log("-".repeat(68))
  console.log(`${"전체합계".padEnd(10)} ${String(allEasy).padStart(4)} ${String(allMid).padStart(4)} ${String(allHard).padStart(6)} ${String(allTotal).padStart(4)}  ${(Math.round(allHard/allTotal*100)+"%").padStart(6)}`)
  console.log(`\n어려움 0개인 레슨: ${noHard}/${total}개`)
  if (noMid > 0) console.log(`보통도 0개인 레슨: ${noMid}/${total}개`)
}

report("Python 난이도 분포", pythonQuestions, "number")
report("C++ 난이도 분포", cppQuestions as typeof pythonQuestions, "string")
