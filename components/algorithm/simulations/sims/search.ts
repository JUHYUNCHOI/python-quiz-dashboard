import type { SimDefinition, SimFrame, BlockElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string, index?: number): BlockElement {
  return { type: 'block', text, color, subText, index }
}

// ─── 이분 탐색 ────────────────────────────────────────────────
export const binarySearchSim: SimDefinition = {
  id: 'binary-search',
  title: '이분 탐색',
  defaultInput: '7',
  inputLabel: '찾을 숫자 (1~30)',
  generate(input: string): SimFrame[] {
    const target = Math.max(1, Math.min(30, parseInt(input) || 7))
    const a = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29]
    const frames: SimFrame[] = []
    let lo = 0, hi = a.length - 1, step = 0

    frames.push({
      description: `정렬된 배열에서 ${target} 탐색 — 매 단계마다 탐색 범위 절반!`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
    })

    while (lo <= hi) {
      step++
      const mid = Math.floor((lo + hi) / 2)
      frames.push({
        description: `[${step}단계] lo=${lo}, hi=${hi}, mid=${mid} → a[mid]=${a[mid]} vs target=${target}`,
        blocks: a.map((v, i) =>
          makeBlock(String(v),
            i < lo || i > hi ? 'done' :
            i === mid ? 'highlight' : 'active',
            i === lo ? 'lo' : i === hi ? 'hi' : i === mid ? 'mid' : undefined,
            i
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
          description: `발견! a[${mid}] = ${target} — ${step}번만에 탐색 완료 (총 ${a.length}개)`,
          blocks: a.map((v, i) => makeBlock(String(v), i === mid ? 'found' : 'done', undefined, i)),
        })
        return frames
      } else if (a[mid] < target) {
        frames.push({
          description: `a[mid]=${a[mid]} < ${target} → lo = mid+1 = ${mid+1} (왼쪽 절반 제거)`,
          blocks: a.map((v, i) =>
            makeBlock(String(v), i <= mid ? 'done' : i <= hi ? 'active' : 'done', undefined, i)
          ),
        })
        lo = mid + 1
      } else {
        frames.push({
          description: `a[mid]=${a[mid]} > ${target} → hi = mid-1 = ${mid-1} (오른쪽 절반 제거)`,
          blocks: a.map((v, i) =>
            makeBlock(String(v), i >= mid ? 'done' : i >= lo ? 'active' : 'done', undefined, i)
          ),
        })
        hi = mid - 1
      }
    }

    frames.push({
      description: `${target}는 배열에 없음 — ${step}번 탐색. O(log n) = O(log ${a.length}) ≈ ${Math.ceil(Math.log2(a.length))}`,
      blocks: a.map((v, i) => makeBlock(String(v), 'done', undefined, i)),
    })

    return frames
  }
}

// ─── Lower Bound ──────────────────────────────────────────────
export const lowerBoundSim: SimDefinition = {
  id: 'lower-bound',
  title: 'Lower Bound',
  defaultInput: '7',
  inputLabel: '기준 값',
  generate(input: string): SimFrame[] {
    const target = parseInt(input) || 7
    const a = [1, 3, 5, 7, 7, 9, 11, 13, 15]
    const frames: SimFrame[] = []
    let lo = 0, hi = a.length

    frames.push({
      description: `배열 [${a.join(', ')}]에서 ${target} 이상인 첫 위치 (lower_bound) 찾기`,
      blocks: a.map((v, i) => makeBlock(String(v), 'default', undefined, i)),
    })

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      frames.push({
        description: `lo=${lo}, hi=${hi}, mid=${mid}, a[${mid}]=${a[mid]}`,
        blocks: a.map((v, i) =>
          makeBlock(String(v),
            i < lo || i >= hi ? 'done' :
            i === mid ? 'highlight' : 'active',
            undefined, i
          )
        ),
        pointers: [
          { type: 'pointer', index: Math.min(lo, a.length-1), label: 'lo', color: '#3b82f6' },
          { type: 'pointer', index: Math.min(hi-1, a.length-1), label: 'hi', color: '#ef4444' },
          { type: 'pointer', index: mid, label: 'mid', color: '#f97316' },
        ]
      })

      if (a[mid] < target) {
        frames.push({
          description: `a[${mid}]=${a[mid]} < ${target} → lo = mid+1 = ${mid+1}`,
          blocks: a.map((v, i) => makeBlock(String(v), i <= mid ? 'done' : 'active', undefined, i)),
        })
        lo = mid + 1
      } else {
        frames.push({
          description: `a[${mid}]=${a[mid]} >= ${target} → hi = mid = ${mid}`,
          blocks: a.map((v, i) => makeBlock(String(v), i >= mid ? 'active' : 'done', undefined, i)),
        })
        hi = mid
      }
    }

    frames.push({
      description: `lower_bound = ${lo} → a[${lo}]=${a[lo] ?? '없음'} (${target} 이상인 첫 위치)`,
      blocks: a.map((v, i) => makeBlock(String(v), i === lo ? 'found' : 'done', undefined, i)),
    })

    return frames
  }
}

// ─── 재귀 (피보나치 콜스택) ───────────────────────────────────
export const recursionSim: SimDefinition = {
  id: 'recursion',
  title: '재귀 호출 (콜스택)',
  defaultInput: '5',
  inputLabel: 'fib(n), n은 2~7',
  generate(input: string): SimFrame[] {
    const n = Math.max(2, Math.min(7, parseInt(input) || 5))
    const frames: SimFrame[] = []
    const callStack: string[] = []

    frames.push({
      description: `fib(${n}) 재귀 호출 — 콜 스택이 어떻게 쌓이는지 관찰`,
      blocks: [makeBlock(`fib(${n})`, 'default')],
    })

    function fib(k: number): number {
      callStack.push(`fib(${k})`)
      frames.push({
        description: `fib(${k}) 호출 — 스택: [${callStack.join(' → ')}]`,
        blocks: callStack.map((c, i) =>
          makeBlock(c, i === callStack.length - 1 ? 'active' : 'done')
        ).reverse(),
      })

      if (k <= 1) {
        const result = k
        frames.push({
          description: `fib(${k}) = ${result} (기저 사례) — 반환`,
          blocks: callStack.map((c, i) =>
            makeBlock(c, i === callStack.length - 1 ? 'found' : 'done')
          ).reverse(),
        })
        callStack.pop()
        return result
      }

      const left = fib(k - 1)
      const right = fib(k - 2)
      const result = left + right

      callStack.push(`fib(${k})`)
      frames.push({
        description: `fib(${k}) = fib(${k-1}) + fib(${k-2}) = ${left} + ${right} = ${result}`,
        blocks: callStack.map((c, i) =>
          makeBlock(c, i === callStack.length - 1 ? 'highlight' : 'done')
        ).reverse(),
      })
      callStack.pop()
      callStack.pop()
      return result
    }

    const result = fib(n)

    frames.push({
      description: `fib(${n}) = ${result} — 스택 비워짐. 메모이제이션으로 중복 계산 제거 가능!`,
      blocks: [makeBlock(`fib(${n}) = ${result}`, 'found')],
    })

    return frames
  }
}

// ─── 그리디 - 동전 거스름돈 ──────────────────────────────────
export const greedyCoinSim: SimDefinition = {
  id: 'greedy-coin',
  title: '그리디 - 거스름돈',
  defaultInput: '1260',
  inputLabel: '거슬러 줄 금액 (원)',
  generate(input: string): SimFrame[] {
    const amount = Math.max(1, Math.min(9999, parseInt(input) || 1260))
    const coins = [500, 100, 50, 10]
    const frames: SimFrame[] = []
    let remaining = amount

    frames.push({
      description: `${amount}원 거스름돈 — 그리디: 항상 가장 큰 동전부터!`,
      blocks: coins.map(c => makeBlock(String(c) + '원', 'default')),
    })

    const counts: number[] = []
    for (const coin of coins) {
      const count = Math.floor(remaining / coin)
      counts.push(count)
      remaining -= coin * count

      frames.push({
        description: `${coin}원: ${Math.floor((remaining + coin * count) / coin)}원 ÷ ${coin} = ${count}개 사용 (나머지 ${remaining}원)`,
        blocks: coins.map((c, i) =>
          makeBlock(
            counts[i] !== undefined ? `${c}원 × ${counts[i]}` : String(c) + '원',
            counts[i] !== undefined ? (i === counts.length - 1 ? 'active' : 'done') : 'default'
          )
        ),
      })
    }

    const total = counts.reduce((s, c) => s + c, 0)
    frames.push({
      description: `총 ${total}개 동전 — ${coins.map((c, i) => `${c}원×${counts[i]}`).filter((_,i) => counts[i] > 0).join(' + ')}`,
      blocks: coins.map((c, i) =>
        makeBlock(`${c}원 × ${counts[i]}`, counts[i] > 0 ? 'found' : 'done')
      ),
    })

    return frames
  }
}

// ─── 그리디 - 회의실 배정 ─────────────────────────────────────
export const greedyMeetingSim: SimDefinition = {
  id: 'greedy-meeting',
  title: '그리디 - 회의실 배정',
  defaultInput: '1 4, 3 5, 0 6, 5 7, 3 8, 5 9, 6 10, 8 11',
  inputLabel: '회의 목록 (시작 끝, ...)',
  generate(input: string): SimFrame[] {
    const pairs = input.split(',').map(s => {
      const [a, b] = s.trim().split(/\s+/).map(Number)
      return [a, b] as [number, number]
    }).filter(([a, b]) => !isNaN(a) && !isNaN(b) && b > a)

    const meetings = pairs.length > 0 ? pairs : [[1,4],[3,5],[0,6],[5,7],[3,8],[5,9],[6,10],[8,11]] as [number,number][]
    const frames: SimFrame[] = []

    frames.push({
      description: `회의 목록 (시작, 끝): ${meetings.map(([s,e]) => `(${s},${e})`).join(', ')} — 끝나는 시간 순 정렬`,
      blocks: meetings.map(([s,e]) => makeBlock(`${s}~${e}`, 'default')),
    })

    // sort by end time
    const sorted = [...meetings].sort((a, b) => a[1] - b[1] || a[0] - b[0])
    frames.push({
      description: `종료 시간 기준 정렬: ${sorted.map(([s,e]) => `(${s},${e})`).join(', ')}`,
      blocks: sorted.map(([s,e]) => makeBlock(`${s}~${e}`, 'active')),
    })

    const selected: [number, number][] = []
    let lastEnd = -1

    for (const [s, e] of sorted) {
      if (s >= lastEnd) {
        selected.push([s, e])
        lastEnd = e
        frames.push({
          description: `(${s},${e}) 선택 — 시작 ${s} ≥ 마지막 끝 ${lastEnd === e ? '(첫 번째)' : lastEnd + '→' + e}`,
          blocks: sorted.map(([ms, me]) =>
            makeBlock(`${ms}~${me}`,
              selected.some(([ss,se]) => ss===ms && se===me) ? 'found' :
              ms===s && me===e ? 'active' : 'default'
            )
          ),
        })
      } else {
        frames.push({
          description: `(${s},${e}) 건너뜀 — 시작 ${s} < 마지막 끝 ${lastEnd} (겹침)`,
          blocks: sorted.map(([ms, me]) =>
            makeBlock(`${ms}~${me}`,
              selected.some(([ss,se]) => ss===ms && se===me) ? 'found' :
              ms===s && me===e ? 'mismatch' : 'default'
            )
          ),
        })
      }
    }

    frames.push({
      description: `최대 ${selected.length}개 회의 선택: ${selected.map(([s,e]) => `(${s},${e})`).join(', ')}`,
      blocks: sorted.map(([s,e]) =>
        makeBlock(`${s}~${e}`, selected.some(([ss,se]) => ss===s && se===e) ? 'found' : 'done')
      ),
    })

    return frames
  }
}
