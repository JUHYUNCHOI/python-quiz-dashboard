import type { SimDefinition, SimFrame, BarElement } from '../types'

function parseBars(input: string): number[] {
  const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0)
  return nums.length >= 2 ? nums.slice(0, 10) : [5, 3, 8, 1, 9, 2, 7, 4, 6]
}

function makeBar(value: number, color: BarElement['color'] = 'default'): BarElement {
  return { type: 'bar', value, color }
}

// ─── 커트라인 ─────────────────────────────────────────────────
export const cutlineSim: SimDefinition = {
  id: 'cutline',
  title: '커트라인 시뮬레이션',
  defaultInput: '100 76 85 93 98',
  inputLabel: '점수 (스페이스로 구분)',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const k = 2
    const frames: SimFrame[] = []

    frames.push({
      description: `점수 배열: [${arr.join(', ')}] — 상위 ${k}명의 커트라인을 구합니다`,
      bars: arr.map(v => makeBar(v)),
    })

    // sort descending step by step (show sorting happening)
    const sorted = [...arr].sort((a, b) => b - a)

    frames.push({
      description: `내림차순 정렬 중...`,
      bars: arr.map((v, i) => makeBar(v, i < arr.length ? 'comparing' : 'default')),
    })

    frames.push({
      description: `정렬 완료! [${sorted.join(', ')}]`,
      bars: sorted.map(v => makeBar(v, 'sorted')),
    })

    frames.push({
      description: `k=${k}번째 인덱스 (0-based: ${k-1}) 값이 커트라인 → sorted[${k-1}] = ${sorted[k-1]}`,
      bars: sorted.map((v, i) => makeBar(v, i === k-1 ? 'found' : i < k ? 'sorted' : 'default')),
    })

    return frames
  }
}

// ─── 선택 정렬 ────────────────────────────────────────────────
export const selectionSortSim: SimDefinition = {
  id: 'selection-sort',
  title: '선택 정렬',
  defaultInput: '5 3 8 1 9 2 7',
  inputLabel: '숫자 배열',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const a = [...arr]
    const n = a.length
    const frames: SimFrame[] = []

    frames.push({
      description: `선택 정렬 시작: [${a.join(', ')}] — 매 회전마다 최솟값을 찾아 앞으로 이동`,
      bars: a.map(v => makeBar(v)),
    })

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      // find min
      for (let j = i + 1; j < n; j++) {
        frames.push({
          description: `회전 ${i+1}: a[${j}]=${a[j]}와 현재 최솟값 a[${minIdx}]=${a[minIdx]} 비교`,
          bars: a.map((v, k) =>
            makeBar(v, k < i ? 'sorted' : k === minIdx ? 'min' : k === j ? 'comparing' : 'default')
          ),
        })
        if (a[j] < a[minIdx]) minIdx = j
      }

      if (minIdx !== i) {
        frames.push({
          description: `최솟값 a[${minIdx}]=${a[minIdx]}을 a[${i}]=${a[i]} 위치로 교환!`,
          bars: a.map((v, k) =>
            makeBar(v, k < i ? 'sorted' : k === minIdx || k === i ? 'selected' : 'default')
          ),
        });
        [a[i], a[minIdx]] = [a[minIdx], a[i]]
      }

      frames.push({
        description: `a[${i}]=${a[i]} 정렬 완료 ✓`,
        bars: a.map((v, k) => makeBar(v, k <= i ? 'sorted' : 'default')),
      })
    }

    frames.push({
      description: `선택 정렬 완료! [${a.join(', ')}] — 시간복잡도 O(n²)`,
      bars: a.map(v => makeBar(v, 'sorted')),
    })

    return frames
  }
}

// ─── 삽입 정렬 ────────────────────────────────────────────────
export const insertionSortSim: SimDefinition = {
  id: 'insertion-sort',
  title: '삽입 정렬',
  defaultInput: '5 3 8 1 9 2 7',
  inputLabel: '숫자 배열',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const a = [...arr]
    const n = a.length
    const frames: SimFrame[] = []

    frames.push({
      description: `삽입 정렬 시작: [${a.join(', ')}] — 각 원소를 올바른 위치에 삽입`,
      bars: a.map((v, i) => makeBar(v, i === 0 ? 'sorted' : 'default')),
    })

    for (let i = 1; i < n; i++) {
      const key = a[i]
      frames.push({
        description: `a[${i}]=${key} 선택 — 왼쪽 정렬된 부분에 삽입할 위치 탐색`,
        bars: a.map((v, k) => makeBar(v, k < i ? 'sorted' : k === i ? 'selected' : 'default')),
      })

      let j = i - 1
      while (j >= 0 && a[j] > key) {
        frames.push({
          description: `a[${j}]=${a[j]} > ${key} → 오른쪽으로 이동`,
          bars: a.map((v, k) => makeBar(v, k < i ? 'sorted' : k === j ? 'comparing' : k === i ? 'selected' : 'default')),
        })
        a[j + 1] = a[j]
        j--
      }
      a[j + 1] = key

      frames.push({
        description: `${key}를 a[${j+1}] 위치에 삽입 완료`,
        bars: a.map((v, k) => makeBar(v, k <= i ? 'sorted' : 'default')),
      })
    }

    frames.push({
      description: `삽입 정렬 완료! [${a.join(', ')}] — 시간복잡도 O(n²), 거의 정렬된 배열에서 빠름`,
      bars: a.map(v => makeBar(v, 'sorted')),
    })

    return frames
  }
}

// ─── 버블 정렬 ────────────────────────────────────────────────
export const bubbleSortSim: SimDefinition = {
  id: 'bubble-sort',
  title: '버블 정렬',
  defaultInput: '5 3 8 1 9 2 7',
  inputLabel: '숫자 배열',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const a = [...arr]
    const n = a.length
    const frames: SimFrame[] = []

    frames.push({
      description: `버블 정렬 시작: [${a.join(', ')}] — 인접 원소 비교/교환 반복`,
      bars: a.map(v => makeBar(v)),
    })

    for (let i = 0; i < n - 1; i++) {
      let swapped = false
      for (let j = 0; j < n - i - 1; j++) {
        frames.push({
          description: `회전 ${i+1}: a[${j}]=${a[j]}와 a[${j+1}]=${a[j+1]} 비교`,
          bars: a.map((v, k) =>
            makeBar(v, k >= n - i ? 'sorted' : k === j || k === j+1 ? 'comparing' : 'default')
          ),
        })
        if (a[j] > a[j+1]) {
          ;[a[j], a[j+1]] = [a[j+1], a[j]]
          swapped = true
          frames.push({
            description: `교환! [${a.join(', ')}]`,
            bars: a.map((v, k) =>
              makeBar(v, k >= n - i ? 'sorted' : k === j || k === j+1 ? 'selected' : 'default')
            ),
          })
        }
      }

      frames.push({
        description: `회전 ${i+1} 완료 — a[${n-i-1}]=${a[n-i-1]} 자리 확정`,
        bars: a.map((v, k) => makeBar(v, k >= n - i - 1 ? 'sorted' : 'default')),
      })

      if (!swapped) {
        frames.push({
          description: `교환 없음 → 이미 정렬됨! 조기 종료 (최적화)`,
          bars: a.map(v => makeBar(v, 'sorted')),
        })
        break
      }
    }

    frames.push({
      description: `버블 정렬 완료! [${a.join(', ')}] — 시간복잡도 O(n²)`,
      bars: a.map(v => makeBar(v, 'sorted')),
    })

    return frames
  }
}

// ─── 퀵 정렬 ─────────────────────────────────────────────────
export const quickSortSim: SimDefinition = {
  id: 'quick-sort',
  title: '퀵 정렬',
  defaultInput: '5 3 8 1 9 2 7',
  inputLabel: '숫자 배열',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const a = [...arr]
    const frames: SimFrame[] = []
    const sorted = new Array(a.length).fill(false)

    frames.push({
      description: `퀵 정렬 시작: [${a.join(', ')}] — 피벗 기준으로 분할 정복`,
      bars: a.map(v => makeBar(v)),
    })

    function quickSort(lo: number, hi: number) {
      if (lo >= hi) {
        if (lo === hi) sorted[lo] = true
        return
      }

      const pivot = a[hi]
      frames.push({
        description: `피벗 = a[${hi}]=${pivot}, 범위 [${lo}..${hi}] 분할`,
        bars: a.map((v, k) =>
          makeBar(v, sorted[k] ? 'sorted' : k === hi ? 'pivot' : k >= lo && k <= hi ? 'default' : 'sorted')
        ),
      })

      let i = lo - 1
      for (let j = lo; j < hi; j++) {
        frames.push({
          description: `a[${j}]=${a[j]} vs 피벗 ${pivot}`,
          bars: a.map((v, k) =>
            makeBar(v, sorted[k] ? 'sorted' : k === hi ? 'pivot' : k === j ? 'comparing' : k <= i ? 'min' : 'default')
          ),
        })
        if (a[j] <= pivot) {
          i++
          ;[a[i], a[j]] = [a[j], a[i]]
          if (i !== j) {
            frames.push({
              description: `a[${j}]=${a[j]} ≤ 피벗 → a[${i}]와 교환`,
              bars: a.map((v, k) =>
                makeBar(v, sorted[k] ? 'sorted' : k === hi ? 'pivot' : k === i || k === j ? 'selected' : k < i ? 'min' : 'default')
              ),
            })
          }
        }
      }
      ;[a[i+1], a[hi]] = [a[hi], a[i+1]]
      sorted[i+1] = true
      frames.push({
        description: `피벗 ${pivot} → a[${i+1}] 위치 확정! 왼쪽: ≤${pivot}, 오른쪽: >${pivot}`,
        bars: a.map((v, k) =>
          makeBar(v, sorted[k] ? 'sorted' : k === i+1 ? 'found' : 'default')
        ),
      })

      quickSort(lo, i)
      quickSort(i+2, hi)
    }

    quickSort(0, a.length - 1)
    for (let k = 0; k < a.length; k++) sorted[k] = true

    frames.push({
      description: `퀵 정렬 완료! [${a.join(', ')}] — 평균 O(n log n), 최악 O(n²)`,
      bars: a.map(v => makeBar(v, 'sorted')),
    })

    return frames
  }
}

// ─── 병합 정렬 ────────────────────────────────────────────────
export const mergeSortSim: SimDefinition = {
  id: 'merge-sort',
  title: '병합 정렬',
  defaultInput: '5 3 8 1 9 2 7 4',
  inputLabel: '숫자 배열',
  generate(input: string): SimFrame[] {
    const arr = parseBars(input)
    const a = [...arr]
    const frames: SimFrame[] = []

    frames.push({
      description: `병합 정렬 시작: [${a.join(', ')}] — 반씩 나누고 합치는 분할 정복`,
      bars: a.map(v => makeBar(v)),
    })

    function mergeSort(lo: number, hi: number) {
      if (lo >= hi) return
      const mid = Math.floor((lo + hi) / 2)

      frames.push({
        description: `[${lo}..${hi}] → 왼쪽 [${lo}..${mid}] / 오른쪽 [${mid+1}..${hi}] 분할`,
        bars: a.map((v, k) =>
          makeBar(v, k >= lo && k <= mid ? 'selected' : k > mid && k <= hi ? 'comparing' : 'default')
        ),
      })

      mergeSort(lo, mid)
      mergeSort(mid+1, hi)

      // merge
      const left = a.slice(lo, mid+1)
      const right = a.slice(mid+1, hi+1)
      let i = 0, j = 0, k = lo

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          a[k++] = left[i++]
        } else {
          a[k++] = right[j++]
        }
      }
      while (i < left.length) a[k++] = left[i++]
      while (j < right.length) a[k++] = right[j++]

      frames.push({
        description: `[${lo}..${hi}] 병합 완료: [${a.slice(lo, hi+1).join(', ')}]`,
        bars: a.map((v, k) =>
          makeBar(v, k >= lo && k <= hi ? 'sorted' : 'default')
        ),
      })
    }

    mergeSort(0, a.length - 1)

    frames.push({
      description: `병합 정렬 완료! [${a.join(', ')}] — 시간복잡도 O(n log n), 안정 정렬`,
      bars: a.map(v => makeBar(v, 'sorted')),
    })

    return frames
  }
}
