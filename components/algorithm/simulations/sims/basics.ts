import type { SimDefinition, SimFrame, BlockElement, BarElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string, index?: number): BlockElement {
  return { type: 'block', text, color, subText, index }
}

function makeBar(value: number, color: BarElement['color'] = 'default', label?: string): BarElement {
  return { type: 'bar', value, color, label }
}

// ─── 최솟값/최댓값 순회 ──────────────────────────────────────
export const minMaxSim: SimDefinition = {
  id: 'minmax',
  title: '최솟값 / 최댓값',
  defaultInput: '20 10 35 30 7',
  inputLabel: '정수 배열',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 8)
    const a = arr.length >= 2 ? arr : [20, 10, 35, 30, 7]
    const frames: SimFrame[] = []
    let mn = a[0], mx = a[0]

    frames.push({
      description: `배열 [${a.join(', ')}] — 한 번 순회로 최솟값과 최댓값을 동시에 추적`,
      bars: a.map(v => makeBar(v)),
    })

    frames.push({
      description: `초기: min = ${mn}, max = ${mx} (첫 번째 원소로 초기화)`,
      bars: a.map((v, i) => makeBar(v, i === 0 ? 'selected' : 'default')),
    })

    for (let i = 1; i < a.length; i++) {
      const newMin = a[i] < mn
      const newMax = a[i] > mx

      frames.push({
        description: `a[${i}]=${a[i]} — ${newMin ? `새 최솟값!` : newMax ? `새 최댓값!` : `변화 없음`} (현재 min=${mn}, max=${mx})`,
        bars: a.map((v, j) =>
          makeBar(v,
            j < i ? (v === mn ? 'min' : v === mx ? 'selected' : 'sorted') :
            j === i ? (newMin || newMax ? 'found' : 'comparing') :
            'default'
          )
        ),
      })

      if (newMin) mn = a[i]
      if (newMax) mx = a[i]
    }

    frames.push({
      description: `완료! 최솟값 = ${mn}, 최댓값 = ${mx} — O(n)으로 한 번만 순회`,
      bars: a.map(v => makeBar(v, v === mn ? 'min' : v === mx ? 'selected' : 'sorted')),
    })

    return frames
  }
}

// ─── Two Sum (해시 접근) ──────────────────────────────────────
export const twoSumSim: SimDefinition = {
  id: 'two-sum',
  title: 'Two Sum (해시 활용)',
  defaultInput: '2 7 11 15',
  inputLabel: '배열 (목표합 9)',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 8)
    const a = arr.length >= 2 ? arr : [2, 7, 11, 15]
    const target = 9
    const frames: SimFrame[] = []
    const seen: Record<number, number> = {}

    frames.push({
      description: `배열 [${a.join(', ')}]에서 합이 ${target}인 두 수의 인덱스 찾기 — 해시로 O(n)!`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', `[${i}]`, i)),
    })

    for (let i = 0; i < a.length; i++) {
      const need = target - a[i]

      frames.push({
        description: `a[${i}]=${a[i]}, 필요한 값 = ${target} - ${a[i]} = ${need}`,
        blocks: a.map((v, j) =>
          makeBlock(String(v), j < i ? 'done' : j === i ? 'active' : 'default', `[${j}]`, j)
        ),
      })

      if (need in seen) {
        frames.push({
          description: `해시에서 ${need} 발견! → [${seen[need]}, ${i}] 정답!`,
          blocks: a.map((v, j) =>
            makeBlock(String(v), j === seen[need] || j === i ? 'found' : 'done', `[${j}]`, j)
          ),
        })
        return frames
      }

      seen[a[i]] = i
      frames.push({
        description: `${need} 없음 → 해시에 {${a[i]}: ${i}} 저장. 해시: {${Object.entries(seen).map(([k,v])=>`${k}:${v}`).join(', ')}}`,
        blocks: a.map((v, j) =>
          makeBlock(String(v), j <= i ? 'done' : 'default', `[${j}]`, j)
        ),
      })
    }

    frames.push({
      description: `정답 없음`,
      blocks: a.map((v, i) => makeBlock(String(v), 'mismatch', `[${i}]`, i)),
    })

    return frames
  }
}

// ─── 주식 최대 이익 (DP/그리디) ──────────────────────────────
export const stockSim: SimDefinition = {
  id: 'stock',
  title: '주식 최대 이익',
  defaultInput: '7 1 5 3 6 4',
  inputLabel: '날짜별 주가',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 8)
    const a = arr.length >= 2 ? arr : [7, 1, 5, 3, 6, 4]
    const frames: SimFrame[] = []
    let minPrice = a[0], maxProfit = 0, buyDay = 0, sellDay = 0

    frames.push({
      description: `주가: [${a.join(', ')}] — 한 번 사고 팔 때 최대 이익은?`,
      bars: a.map(v => makeBar(v)),
    })

    frames.push({
      description: `초기: 최저가 = ${minPrice} (day 0)`,
      bars: a.map((v, i) => makeBar(v, i === 0 ? 'min' : 'default')),
    })

    for (let i = 1; i < a.length; i++) {
      const profit = a[i] - minPrice
      const isNewMin = a[i] < minPrice
      const isNewProfit = profit > maxProfit

      frames.push({
        description: isNewMin
          ? `day${i}: ${a[i]}원 — 새 최저가! (이전 ${minPrice}원)`
          : `day${i}: ${a[i]}원 — 이익 = ${a[i]} - ${minPrice} = ${profit}원 ${isNewProfit ? '→ 최대 이익 갱신!' : ''}`,
        bars: a.map((v, j) =>
          makeBar(v,
            j < i && j === buyDay ? 'min' :
            j < i && j === sellDay && isNewProfit ? 'selected' :
            j < i ? 'sorted' :
            j === i ? (isNewMin ? 'min' : isNewProfit ? 'found' : 'comparing') :
            'default'
          )
        ),
      })

      if (isNewProfit) { maxProfit = profit; sellDay = i; buyDay = a.indexOf(minPrice) }
      if (isNewMin) minPrice = a[i]
    }

    frames.push({
      description: `최대 이익 = ${maxProfit}원 (day${buyDay} 매수 ${a[buyDay]}원, day${sellDay} 매도 ${a[sellDay]}원)`,
      bars: a.map((v, i) =>
        makeBar(v, i === buyDay ? 'min' : i === sellDay ? 'found' : 'sorted')
      ),
    })

    return frames
  }
}

// ─── 수들의 합 (투 포인터) ────────────────────────────────────
export const sumCountSim: SimDefinition = {
  id: 'sum-count',
  title: '합이 M인 연속 부분 수열 수',
  defaultInput: '1 2 3 2 5',
  inputLabel: '배열 (목표합 M=5)',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => n > 0).slice(0, 8)
    const a = arr.length >= 2 ? arr : [1, 2, 3, 2, 5]
    const M = 5
    const frames: SimFrame[] = []
    let lo = 0, hi = 0, sum = a[0], count = 0

    frames.push({
      description: `배열 [${a.join(', ')}]에서 합이 ${M}인 연속 부분 수열 개수 — 투 포인터 O(n)`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
      pointers: [
        { type: 'pointer', index: 0, label: 'lo', color: '#3b82f6' },
        { type: 'pointer', index: 0, label: 'hi', color: '#ef4444' },
      ]
    })

    while (hi < a.length) {
      frames.push({
        description: `[lo=${lo}, hi=${hi}] 합=${sum} vs M=${M}`,
        blocks: a.map((v, i) =>
          makeBlock(String(v),
            i >= lo && i <= hi ? (sum === M ? 'found' : 'active') : 'default',
            undefined, i
          )
        ),
        pointers: [
          { type: 'pointer', index: lo, label: 'lo', color: '#3b82f6' },
          { type: 'pointer', index: hi, label: 'hi', color: '#ef4444' },
        ]
      })

      if (sum === M) {
        count++
        frames.push({
          description: `합 = ${M} 발견! count = ${count}`,
          blocks: a.map((v, i) =>
            makeBlock(String(v), i >= lo && i <= hi ? 'found' : 'done', undefined, i)
          ),
        })
        sum -= a[lo++]
      } else if (sum < M) {
        hi++
        if (hi < a.length) sum += a[hi]
      } else {
        sum -= a[lo++]
      }
    }

    frames.push({
      description: `총 ${count}개의 연속 부분 수열이 합 ${M}을 가짐`,
      blocks: a.map((v, i) => makeBlock(String(v), 'done', undefined, i)),
    })

    return frames
  }
}

// ─── 좌표 압축 ────────────────────────────────────────────────
export const coordCompressSim: SimDefinition = {
  id: 'coord-compress',
  title: '좌표 압축',
  defaultInput: '2 4 -10 4 -9',
  inputLabel: '정수 배열',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 8)
    const a = arr.length >= 2 ? arr : [2, 4, -10, 4, -9]
    const frames: SimFrame[] = []

    frames.push({
      description: `원본 배열: [${a.join(', ')}] — 큰 범위의 값을 0부터 시작하는 작은 정수로 매핑`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', `a[${i}]`, i)),
    })

    const sorted = [...new Set(a)].sort((x, y) => x - y)
    frames.push({
      description: `중복 제거 후 정렬: [${sorted.join(', ')}]`,
      blocks: sorted.map((v, i) => makeBlock(String(v), 'active', `rank:${i}`, i)),
    })

    const rankMap: Record<number, number> = {}
    for (let i = 0; i < sorted.length; i++) rankMap[sorted[i]] = i

    frames.push({
      description: `매핑: ${sorted.map((v, i) => `${v}→${i}`).join(', ')}`,
      blocks: sorted.map((v, i) => makeBlock(`${v}→${i}`, 'done', undefined, i)),
    })

    const result = a.map(v => rankMap[v])
    frames.push({
      description: `압축 결과: [${a.join(', ')}] → [${result.join(', ')}]`,
      blocks: a.map((v, i) => makeBlock(String(result[i]), 'found', `원본:${v}`, i)),
    })

    return frames
  }
}
