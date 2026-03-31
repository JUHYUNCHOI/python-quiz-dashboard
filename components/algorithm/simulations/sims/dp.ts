import type { SimDefinition, SimFrame, BlockElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string, index?: number): BlockElement {
  return { type: 'block', text, color, subText, index }
}

// ─── 피보나치 (메모이제이션) ──────────────────────────────────
export const fibDPSim: SimDefinition = {
  id: 'fib-dp',
  title: '피보나치 DP',
  defaultInput: '8',
  inputLabel: 'n (최대 15)',
  generate(input: string): SimFrame[] {
    const n = Math.max(2, Math.min(15, parseInt(input) || 8))
    const frames: SimFrame[] = []
    const dp = new Array(n + 1).fill(-1)
    dp[0] = 0
    dp[1] = 1

    frames.push({
      description: `fib(${n}) 계산 — DP 테이블: dp[i] = dp[i-1] + dp[i-2]`,
      blocks: [0,1].map((v, i) => makeBlock(String(v), 'done', `dp[${i}]`, i)),
    })

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2]
      frames.push({
        description: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
        blocks: dp.slice(0, i+1).map((v, j) =>
          makeBlock(String(v), j === i ? 'active' : j < i ? 'done' : 'default', `dp[${j}]`, j)
        ),
      })
    }

    frames.push({
      description: `fib(${n}) = ${dp[n]} — DP로 O(n) 시간, 각 하위 문제를 한 번만 계산!`,
      blocks: dp.slice(0, n+1).map((v, j) =>
        makeBlock(String(v), j === n ? 'found' : 'done', `dp[${j}]`, j)
      ),
    })

    return frames
  }
}

// ─── 계단 오르기 ──────────────────────────────────────────────
export const stairsSim: SimDefinition = {
  id: 'stairs',
  title: '계단 오르기',
  defaultInput: '6',
  inputLabel: '계단 수 (최대 10)',
  generate(input: string): SimFrame[] {
    const n = Math.max(1, Math.min(10, parseInt(input) || 6))
    const frames: SimFrame[] = []

    frames.push({
      description: `계단 ${n}칸 오르기 — 한 번에 1칸 또는 2칸 이동 가능, 경우의 수는?`,
      blocks: Array.from({length: n+1}, (_, i) =>
        makeBlock(i === 0 ? '0' : '?', i === 0 ? 'done' : 'default', `dp[${i}]`, i)
      ),
    })

    const dp = new Array(n + 1).fill(0)
    dp[0] = 1
    dp[1] = 1

    frames.push({
      description: `기저: dp[0]=1 (시작), dp[1]=1 (1칸)`,
      blocks: dp.slice(0, n+1).map((v, i) =>
        makeBlock(i <= 1 ? String(v) : '?', i <= 1 ? 'done' : 'default', `dp[${i}]`, i)
      ),
    })

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2]
      frames.push({
        description: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]} (1칸 오거나 2칸 오거나)`,
        blocks: dp.slice(0, n+1).map((v, j) =>
          makeBlock(j <= i ? String(v) : '?',
            j === i ? 'active' : j < i ? 'done' : 'default',
            `dp[${j}]`, j
          )
        ),
      })
    }

    frames.push({
      description: `계단 ${n}칸 오르는 방법: ${dp[n]}가지 — dp[n] = dp[n-1] + dp[n-2]`,
      blocks: dp.map((v, j) => makeBlock(String(v), j === n ? 'found' : 'done', `dp[${j}]`, j)),
    })

    return frames
  }
}

// ─── LIS (최장 증가 부분 수열) ────────────────────────────────
export const lisSim: SimDefinition = {
  id: 'lis',
  title: 'LIS (최장 증가 부분 수열)',
  defaultInput: '3 5 2 4 1 7 6',
  inputLabel: '배열',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 8)
    const a = arr.length >= 2 ? arr : [3,5,2,4,1,7,6]
    const n = a.length
    const frames: SimFrame[] = []

    frames.push({
      description: `배열 [${a.join(', ')}]의 LIS(최장 증가 부분 수열) 길이 계산`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', `a[${i}]`, i)),
    })

    const dp = new Array(n).fill(1)

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (a[j] < a[i]) {
          frames.push({
            description: `a[${j}]=${a[j]} < a[${i}]=${a[i]} → dp[${i}] = max(dp[${i}], dp[${j}]+1) = max(${dp[i]}, ${dp[j]+1})`,
            blocks: a.map((v, k) =>
              makeBlock(String(v),
                k === i ? 'active' : k === j ? 'highlight' : k < i ? 'done' : 'default',
                `dp:${k <= i ? dp[k] : '?'}`, k
              )
            ),
          })
          dp[i] = Math.max(dp[i], dp[j] + 1)
        }
      }

      frames.push({
        description: `dp[${i}] = ${dp[i]} 확정`,
        blocks: a.map((v, k) =>
          makeBlock(String(v),
            k <= i ? 'done' : 'default',
            `dp:${k <= i ? dp[k] : '?'}`, k
          )
        ),
      })
    }

    const lisLen = Math.max(...dp)
    const lisEnd = dp.indexOf(lisLen)

    // backtrack to find one LIS
    const lis: number[] = []
    let remaining = lisLen
    for (let i = n - 1; i >= 0; i--) {
      if (dp[i] === remaining) {
        lis.unshift(a[i])
        remaining--
      }
    }

    frames.push({
      description: `dp = [${dp.join(', ')}] — 최댓값 ${lisLen} → LIS 예시: [${lis.join(', ')}]`,
      blocks: a.map((v, k) =>
        makeBlock(String(v),
          lis.includes(v) && dp[k] === (lis.indexOf(v) + 1) ? 'found' : 'done',
          `dp:${dp[k]}`, k
        )
      ),
    })

    return frames
  }
}

// ─── 냅색 (0/1 Knapsack) ─────────────────────────────────────
export const knapsackSim: SimDefinition = {
  id: 'knapsack',
  title: '0/1 냅색',
  defaultInput: '5',
  inputLabel: '가방 용량 W',
  generate(input: string): SimFrame[] {
    const W = Math.max(1, Math.min(10, parseInt(input) || 5))
    const items = [
      { w: 1, v: 1, name: '반지' },
      { w: 3, v: 4, name: '노트북' },
      { w: 4, v: 5, name: '카메라' },
      { w: 2, v: 3, name: '시계' },
    ]
    const n = items.length
    const frames: SimFrame[] = []

    frames.push({
      description: `용량 ${W}인 가방, 물건: ${items.map(it => `${it.name}(${it.w}kg,${it.v}원)`).join(', ')}`,
      blocks: items.map(it => makeBlock(`${it.name}`, 'default', `${it.w}kg/${it.v}원`)),
    })

    // dp[i][j] = first i items, capacity j
    const dp: number[][] = Array.from({length: n+1}, () => new Array(W+1).fill(0))

    for (let i = 1; i <= n; i++) {
      const item = items[i-1]
      for (let j = 0; j <= W; j++) {
        if (item.w <= j) {
          dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-item.w] + item.v)
        } else {
          dp[i][j] = dp[i-1][j]
        }
      }
      frames.push({
        description: `${item.name}(${item.w}kg,${item.v}원) 고려 후 — dp[${i}][${W}] = ${dp[i][W]}`,
        blocks: Array.from({length: W+1}, (_, j) =>
          makeBlock(String(dp[i][j]), j === W ? 'active' : 'done', `W=${j}`, j)
        ),
      })
    }

    frames.push({
      description: `최대 가치 = ${dp[n][W]} — dp[items][W] 답`,
      blocks: Array.from({length: W+1}, (_, j) =>
        makeBlock(String(dp[n][j]), j === W ? 'found' : 'done', `W=${j}`, j)
      ),
    })

    return frames
  }
}

// ─── 최소 동전 수 (코인 DP) ───────────────────────────────────
export const coinDPSim: SimDefinition = {
  id: 'coin-dp',
  title: '최소 동전 수 (DP)',
  defaultInput: '11',
  inputLabel: '목표 금액',
  generate(input: string): SimFrame[] {
    const amount = Math.max(1, Math.min(20, parseInt(input) || 11))
    const coins = [1, 5, 6, 9]
    const INF = 9999
    const dp = new Array(amount + 1).fill(INF)
    dp[0] = 0
    const frames: SimFrame[] = []

    frames.push({
      description: `동전 [${coins.join(', ')}]으로 ${amount}원 만들기 — 최소 동전 수?`,
      blocks: dp.map((v, i) =>
        makeBlock(i === 0 ? '0' : '∞', i === 0 ? 'done' : 'default', String(i), i)
      ),
    })

    for (let i = 1; i <= amount; i++) {
      for (const c of coins) {
        if (c <= i && dp[i-c] + 1 < dp[i]) {
          dp[i] = dp[i-c] + 1
        }
      }
      const usable = coins.filter(c => c <= i)
      frames.push({
        description: `dp[${i}]: ${usable.map(c => `dp[${i-c}]+1=${dp[i-c]+1}`).join(', ')} → 최솟값 ${dp[i]}`,
        blocks: dp.slice(0, amount+1).map((v, j) =>
          makeBlock(v === INF ? '∞' : String(v),
            j === i ? 'active' : j < i ? 'done' : 'default',
            String(j), j
          )
        ),
      })
    }

    frames.push({
      description: `dp[${amount}] = ${dp[amount]} — ${amount}원 만들려면 최소 ${dp[amount]}개 동전 필요`,
      blocks: dp.map((v, j) =>
        makeBlock(v === INF ? '∞' : String(v), j === amount ? 'found' : 'done', String(j), j)
      ),
    })

    return frames
  }
}
