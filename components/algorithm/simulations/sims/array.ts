import type { SimDefinition, SimFrame, BlockElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string, index?: number): BlockElement {
  return { type: 'block', text, color, subText, index }
}

// ─── 투 포인터 ────────────────────────────────────────────────
export const twoPointersSim: SimDefinition = {
  id: 'two-pointers',
  title: '투 포인터',
  defaultInput: '1 2 3 4 5 6 7 8 9 10',
  inputLabel: '정렬된 배열 (합 목표: 11)',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n))
    const a = arr.length >= 2 ? arr.slice(0, 10) : [1,2,3,4,5,6,7,8,9,10]
    const target = 11
    const frames: SimFrame[] = []
    let left = 0, right = a.length - 1

    frames.push({
      description: `배열: [${a.join(', ')}], 목표 합: ${target} — 좌우 포인터로 탐색`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
      pointers: [
        { type: 'pointer', index: left, label: 'L', color: '#3b82f6' },
        { type: 'pointer', index: right, label: 'R', color: '#ef4444' },
      ]
    })

    while (left < right) {
      const sum = a[left] + a[right]
      const blocks = a.map((v, i) =>
        makeBlock(String(v), i === left ? 'active' : i === right ? 'highlight' : 'default', undefined, i)
      )

      frames.push({
        description: `L=${a[left]}, R=${a[right]}, 합=${sum} vs 목표=${target}`,
        blocks,
        pointers: [
          { type: 'pointer', index: left, label: 'L', color: '#3b82f6' },
          { type: 'pointer', index: right, label: 'R', color: '#ef4444' },
        ]
      })

      if (sum === target) {
        frames.push({
          description: `합 ${sum} = 목표 ${target} 발견! (${a[left]}, ${a[right]})`,
          blocks: a.map((v, i) =>
            makeBlock(String(v), i === left || i === right ? 'found' : 'done', undefined, i)
          ),
          pointers: [
            { type: 'pointer', index: left, label: 'L', color: '#3b82f6' },
            { type: 'pointer', index: right, label: 'R', color: '#ef4444' },
          ]
        })
        left++
        right--
      } else if (sum < target) {
        frames.push({
          description: `합 ${sum} < ${target} → L 오른쪽으로 이동`,
          blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
          pointers: [
            { type: 'pointer', index: left, label: 'L→', color: '#3b82f6' },
            { type: 'pointer', index: right, label: 'R', color: '#ef4444' },
          ]
        })
        left++
      } else {
        frames.push({
          description: `합 ${sum} > ${target} → R 왼쪽으로 이동`,
          blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
          pointers: [
            { type: 'pointer', index: left, label: 'L', color: '#3b82f6' },
            { type: 'pointer', index: right, label: '←R', color: '#ef4444' },
          ]
        })
        right--
      }
    }

    frames.push({
      description: `L=${left} ≥ R=${right} — 탐색 종료. 시간복잡도 O(n)`,
      blocks: a.map((v, i) => makeBlock(String(v), 'done', undefined, i)),
    })

    return frames
  }
}

// ─── 슬라이딩 윈도우 ──────────────────────────────────────────
export const slidingWindowSim: SimDefinition = {
  id: 'sliding-window',
  title: '슬라이딩 윈도우',
  defaultInput: '2 1 5 1 3 2 3 1',
  inputLabel: '배열 (윈도우 크기 k=3)',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n))
    const a = arr.length >= 3 ? arr.slice(0, 8) : [2,1,5,1,3,2,3,1]
    const k = 3
    const frames: SimFrame[] = []
    let maxSum = -Infinity, maxStart = 0

    // initial window
    let windowSum = a.slice(0, k).reduce((s, v) => s + v, 0)

    frames.push({
      description: `배열: [${a.join(', ')}], 크기 ${k} 윈도우의 최대 합을 구합니다`,
      blocks: a.map((v, i) => makeBlock(String(v), i < k ? 'active' : 'default', undefined, i)),
    })

    frames.push({
      description: `첫 윈도우 [0..${k-1}] 합 = ${windowSum}`,
      blocks: a.map((v, i) => makeBlock(String(v), i < k ? 'active' : 'default', undefined, i)),
    })

    if (windowSum > maxSum) { maxSum = windowSum; maxStart = 0 }

    for (let i = k; i < a.length; i++) {
      const removed = a[i - k]
      const added = a[i]
      windowSum = windowSum - removed + added

      frames.push({
        description: `윈도우 슬라이드: −${removed} +${added} = 합 ${windowSum}`,
        blocks: a.map((v, j) =>
          makeBlock(String(v),
            j === i - k ? 'mismatch' :
            j > i - k && j <= i ? 'active' : 'default',
            undefined, j
          )
        ),
      })

      if (windowSum > maxSum) {
        maxSum = windowSum
        maxStart = i - k + 1
        frames.push({
          description: `새로운 최대 합 ${maxSum} 발견! 윈도우 [${maxStart}..${i}]`,
          blocks: a.map((v, j) =>
            makeBlock(String(v), j >= maxStart && j <= i ? 'found' : 'done', undefined, j)
          ),
        })
      }
    }

    frames.push({
      description: `최대 합 = ${maxSum} (윈도우 [${maxStart}..${maxStart+k-1}]: [${a.slice(maxStart, maxStart+k).join(', ')}])`,
      blocks: a.map((v, j) =>
        makeBlock(String(v), j >= maxStart && j < maxStart+k ? 'found' : 'done', undefined, j)
      ),
    })

    return frames
  }
}

// ─── 누적합 ───────────────────────────────────────────────────
export const prefixSumSim: SimDefinition = {
  id: 'prefix-sum',
  title: '누적합 (Prefix Sum)',
  defaultInput: '3 1 4 1 5 9 2 6',
  inputLabel: '배열',
  generate(input: string): SimFrame[] {
    const arr = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n))
    const a = arr.length >= 2 ? arr.slice(0, 8) : [3,1,4,1,5,9,2,6]
    const frames: SimFrame[] = []

    frames.push({
      description: `원본 배열: [${a.join(', ')}] — 누적합 배열을 만들어 구간 합을 O(1)로!`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', `a[${i}]`, i)),
    })

    const prefix = [0, ...a]
    for (let i = 1; i <= a.length; i++) {
      prefix[i] = prefix[i-1] + a[i-1]
      frames.push({
        description: `prefix[${i}] = prefix[${i-1}] + a[${i-1}] = ${prefix[i-1]} + ${a[i-1]} = ${prefix[i]}`,
        blocks: prefix.slice(1).map((v, j) =>
          makeBlock(String(v), j < i ? 'done' : j === i ? 'active' : 'default', `p[${j+1}]`, j)
        ),
      })
    }

    frames.push({
      description: `누적합 완성! [${prefix.slice(1).join(', ')}]`,
      blocks: prefix.slice(1).map((v, j) => makeBlock(String(v), 'done', `p[${j+1}]`, j)),
    })

    // demo: query [2, 5] (1-indexed)
    const l = 2, r = 5
    const answer = prefix[r] - prefix[l-1]
    frames.push({
      description: `구간 합 query(${l},${r}) = prefix[${r}] − prefix[${l-1}] = ${prefix[r]} − ${prefix[l-1]} = ${answer}`,
      blocks: a.map((v, j) =>
        makeBlock(String(v), j+1 >= l && j+1 <= r ? 'found' : 'default', `a[${j+1}]`, j)
      ),
    })

    return frames
  }
}

// ─── 배열 이진 탐색 (기초) ────────────────────────────────────
export const linearSearchSim: SimDefinition = {
  id: 'linear-search',
  title: '선형 탐색 vs 이진 탐색',
  defaultInput: '7',
  inputLabel: '찾을 숫자 (1~15)',
  generate(input: string): SimFrame[] {
    const target = parseInt(input) || 7
    const a = [1, 3, 5, 7, 9, 11, 13, 15]
    const frames: SimFrame[] = []

    frames.push({
      description: `정렬된 배열 [${a.join(', ')}]에서 ${target} 탐색`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
    })

    // linear
    let linearSteps = 0
    for (let i = 0; i < a.length; i++) {
      linearSteps++
      frames.push({
        description: `[선형 탐색] a[${i}]=${a[i]} 확인 (${linearSteps}번째)`,
        blocks: a.map((v, j) =>
          makeBlock(String(v), j < i ? 'done' : j === i ? 'active' : 'default', undefined, j)
        ),
      })
      if (a[i] === target) {
        frames.push({
          description: `발견! ${linearSteps}번 비교. 이진 탐색이라면?`,
          blocks: a.map((v, j) => makeBlock(String(v), j === i ? 'found' : 'done', undefined, j)),
        })
        break
      }
    }

    // binary
    let lo = 0, hi = a.length - 1, binSteps = 0
    frames.push({
      description: `[이진 탐색] 같은 배열에서 ${target} 탐색`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
    })

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2)
      binSteps++
      frames.push({
        description: `lo=${lo}, hi=${hi}, mid=${mid}, a[${mid}]=${a[mid]} 확인 (${binSteps}번째)`,
        blocks: a.map((v, j) =>
          makeBlock(String(v),
            j < lo || j > hi ? 'done' :
            j === mid ? 'highlight' : 'active',
            undefined, j
          )
        ),
        pointers: [
          { type: 'pointer', index: lo, label: 'lo', color: '#3b82f6' },
          { type: 'pointer', index: hi, label: 'hi', color: '#ef4444' },
          { type: 'pointer', index: mid, label: 'mid', color: '#f97316' },
        ]
      })

      if (a[mid] === target) {
        frames.push({
          description: `발견! ${binSteps}번 비교 vs 선형 ${linearSteps}번 — O(log n) vs O(n)`,
          blocks: a.map((v, j) => makeBlock(String(v), j === mid ? 'found' : 'done', undefined, j)),
        })
        break
      } else if (a[mid] < target) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }

    return frames
  }
}
