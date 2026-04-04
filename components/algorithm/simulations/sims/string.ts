import type { SimDefinition, SimFrame, BlockElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string, index?: number): BlockElement {
  return { type: 'block', text, color, subText, index }
}

// ─── 알파벳 찾기 (BOJ 10809) ─────────────────────────────────
export const alphabetSearchSim: SimDefinition = {
  id: 'alphabet-search',
  title: '알파벳 찾기',
  defaultInput: 'baekjoon',
  inputLabel: '소문자 문자열',
  generate(input: string): SimFrame[] {
    const s = input.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 12) || 'baekjoon'
    const frames: SimFrame[] = []

    // result array: pos[a..z] = -1 initially
    const pos: Record<string, number> = {}
    for (let c = 0; c < 26; c++) pos[String.fromCharCode(97 + c)] = -1

    frames.push({
      description: `문자열 "${s}" — 각 알파벳의 첫 등장 위치를 기록합니다 (없으면 -1)`,
      blocks: s.split('').map((c, i) => makeBlock(c, 'default', String(i), i)),
    })

    for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      const isNew = pos[ch] === -1
      if (isNew) pos[ch] = i

      frames.push({
        description: isNew
          ? `s[${i}]='${ch}' — 첫 등장! pos['${ch}'] = ${i}`
          : `s[${i}]='${ch}' — 이미 기록됨 (pos['${ch}']=${pos[ch]}), 건너뜀`,
        blocks: s.split('').map((c, j) =>
          makeBlock(c, j < i ? 'done' : j === i ? (isNew ? 'found' : 'highlight') : 'default', String(j), j)
        ),
      })
    }

    // show a..z result (show only letters that appear)
    const appeared = [...new Set(s.split(''))].sort()
    frames.push({
      description: `결과: ${appeared.map(c => `${c}→${pos[c]}`).join(', ')} (나머지는 -1)`,
      blocks: appeared.map(c => makeBlock(String(pos[c]), pos[c] >= 0 ? 'found' : 'default', c)),
    })

    return frames
  }
}

// ─── 문자 빈도수 (BOJ 1157) ───────────────────────────────────
export const charFreqSim: SimDefinition = {
  id: 'char-freq',
  title: '문자 빈도수',
  defaultInput: 'Mississipi',
  inputLabel: '문자열',
  generate(input: string): SimFrame[] {
    const s = input.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 15) || 'MISSISSIPI'
    const frames: SimFrame[] = []
    const freq: Record<string, number> = {}

    frames.push({
      description: `"${s}" — 각 문자의 등장 횟수를 셉니다`,
      blocks: s.split('').map((c, i) => makeBlock(c, 'default', undefined, i)),
    })

    for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      freq[ch] = (freq[ch] || 0) + 1

      frames.push({
        description: `s[${i}]='${ch}' — freq['${ch}'] = ${freq[ch]}`,
        blocks: s.split('').map((c, j) =>
          makeBlock(c, j < i ? 'done' : j === i ? 'active' : 'default', undefined, j)
        ),
      })
    }

    frames.push({
      description: `빈도 집계 완료: ${Object.entries(freq).map(([k,v]) => `${k}:${v}`).join(', ')}`,
      blocks: Object.entries(freq).map(([k, v]) => makeBlock(String(v), 'done', k)),
    })

    const maxFreq = Math.max(...Object.values(freq))
    const maxChars = Object.entries(freq).filter(([,v]) => v === maxFreq).map(([k]) => k)

    if (maxChars.length > 1) {
      frames.push({
        description: `최다 빈도 ${maxFreq}인 문자가 여러 개 (${maxChars.join(', ')}) → "?" 출력`,
        blocks: Object.entries(freq).map(([k, v]) =>
          makeBlock(String(v), maxChars.includes(k) ? 'highlight' : 'done', k)
        ),
      })
    } else {
      frames.push({
        description: `최다 빈도 문자: '${maxChars[0]}' (${maxFreq}회) → 출력`,
        blocks: Object.entries(freq).map(([k, v]) =>
          makeBlock(String(v), k === maxChars[0] ? 'found' : 'done', k)
        ),
      })
    }

    return frames
  }
}

// ─── 팰린드롬 판별 (투 포인터) ───────────────────────────────
export const palindromeSim: SimDefinition = {
  id: 'palindrome',
  title: '팰린드롬 판별',
  defaultInput: 'racecar',
  inputLabel: '문자열',
  generate(input: string): SimFrame[] {
    const s = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) || 'racecar'
    const frames: SimFrame[] = []
    let lo = 0, hi = s.length - 1
    let isPalin = true

    frames.push({
      description: `"${s}" — 투 포인터로 팰린드롬 판별: 양끝에서 중앙으로`,
      blocks: s.split('').map((c, i) => makeBlock(c, 'default', undefined, i)),
      pointers: [
        { type: 'pointer', index: lo, label: 'L', color: '#3b82f6' },
        { type: 'pointer', index: hi, label: 'R', color: '#ef4444' },
      ]
    })

    while (lo < hi) {
      const match = s[lo] === s[hi]
      frames.push({
        description: match
          ? `s[${lo}]='${s[lo]}' == s[${hi}]='${s[hi]}' ✓ 일치`
          : `s[${lo}]='${s[lo]}' ≠ s[${hi}]='${s[hi]}' ✗ 불일치 → 팰린드롬 아님!`,
        blocks: s.split('').map((c, i) =>
          makeBlock(c,
            i === lo || i === hi ? (match ? 'found' : 'mismatch') :
            i < lo || i > hi ? 'done' : 'default',
            undefined, i
          )
        ),
        pointers: [
          { type: 'pointer', index: lo, label: 'L', color: '#3b82f6' },
          { type: 'pointer', index: hi, label: 'R', color: '#ef4444' },
        ]
      })

      if (!match) { isPalin = false; break }
      lo++; hi--
    }

    frames.push({
      description: isPalin
        ? `"${s}" → 팰린드롬! (앞뒤가 같음)`
        : `"${s}" → 팰린드롬 아님`,
      blocks: s.split('').map((c, i) => makeBlock(c, isPalin ? 'found' : 'mismatch', undefined, i)),
    })

    return frames
  }
}

// ─── 애너그램 (정렬 키) ───────────────────────────────────────
export const anagramSim: SimDefinition = {
  id: 'anagram',
  title: '애너그램 그룹화',
  defaultInput: 'eat tea tan ate nat bat',
  inputLabel: '단어 목록',
  generate(input: string): SimFrame[] {
    const words = input.trim().split(/\s+/).filter(Boolean).slice(0, 8)
    const frames: SimFrame[] = []
    const groups: Record<string, string[]> = {}

    frames.push({
      description: `단어 목록: [${words.join(', ')}] — 정렬된 키로 애너그램 그룹화`,
      blocks: words.map(w => makeBlock(w)),
    })

    for (const word of words) {
      const key = word.split('').sort().join('')
      if (!groups[key]) groups[key] = []
      groups[key].push(word)

      frames.push({
        description: `"${word}" → 정렬 키: "${key}" → 그룹에 추가`,
        blocks: words.map(w => {
          const k = w.split('').sort().join('')
          const gIdx = Object.keys(groups).indexOf(k)
          const colors: BlockElement['color'][] = ['active', 'highlight', 'found', 'done']
          return makeBlock(w, k === key ? (groups[k].length === 1 ? 'active' : colors[gIdx % 4]) : (groups[k] ? colors[Object.keys(groups).indexOf(k) % 4] : 'default'), k)
        }),
      })
    }

    const result = Object.values(groups)
    frames.push({
      description: `${result.length}개 그룹: ${result.map(g => `[${g.join(', ')}]`).join(' / ')}`,
      blocks: words.map(w => {
        const k = w.split('').sort().join('')
        const gIdx = Object.keys(groups).indexOf(k)
        const colors: BlockElement['color'][] = ['found', 'active', 'highlight', 'done']
        return makeBlock(w, colors[gIdx % 4], k)
      }),
    })

    return frames
  }
}

// ─── 팰린드롬 만들기 (빈도수 기반) ──────────────────────────
export const palindromeMakeSim: SimDefinition = {
  id: 'palindrome-make',
  title: '팰린드롬 재구성',
  defaultInput: 'aabbccd',
  inputLabel: '문자열',
  generate(input: string): SimFrame[] {
    const s = input.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 10) || 'aabbccd'
    const frames: SimFrame[] = []
    const freq: Record<string, number> = {}

    for (const c of s) freq[c] = (freq[c] || 0) + 1

    frames.push({
      description: `"${s}" — 팰린드롬을 만들 수 있는지 확인. 빈도수: ${Object.entries(freq).map(([k,v]) => `${k}:${v}`).join(', ')}`,
      blocks: Object.entries(freq).map(([k, v]) => makeBlock(String(v), 'default', k)),
    })

    const oddChars = Object.entries(freq).filter(([,v]) => v % 2 !== 0).map(([k]) => k)
    frames.push({
      description: `홀수 빈도 문자: ${oddChars.length > 0 ? oddChars.join(', ') : '없음'} → ${oddChars.length <= 1 ? '팰린드롬 가능!' : '팰린드롬 불가 (홀수 2개 이상)'}`,
      blocks: Object.entries(freq).map(([k, v]) =>
        makeBlock(String(v), v % 2 !== 0 ? 'highlight' : 'done', k)
      ),
    })

    if (oddChars.length <= 1) {
      const left = Object.entries(freq).map(([k, v]) => k.repeat(Math.floor(v/2))).join('')
      const mid = oddChars.length ? oddChars[0] : ''
      const result = left + mid + left.split('').reverse().join('')
      frames.push({
        description: `팰린드롬: "${result}"`,
        blocks: result.split('').map((c, i) => makeBlock(c, 'found', undefined, i)),
      })
    }

    return frames
  }
}

// ─── 팩토리얼 재귀 ───────────────────────────────────────────
export const factorialSim: SimDefinition = {
  id: 'factorial',
  title: '팩토리얼 재귀',
  defaultInput: '5',
  inputLabel: 'N (1~10)',
  generate(input: string): SimFrame[] {
    const n = Math.max(1, Math.min(10, parseInt(input) || 5))
    const frames: SimFrame[] = []
    const callStack: string[] = []

    frames.push({
      description: `factorial(${n}) 재귀 호출 — 콜 스택이 어떻게 쌓이고 해제되는지 확인`,
      blocks: [makeBlock(`factorial(${n})`, 'default')],
    })

    function fact(k: number): number {
      callStack.push(`fact(${k})`)
      frames.push({
        description: `fact(${k}) 호출 → 스택: [${callStack.join(' → ')}]`,
        blocks: [...callStack].reverse().map((c, i) =>
          makeBlock(c, i === 0 ? 'active' : 'done')
        ),
      })

      if (k <= 1) {
        frames.push({
          description: `fact(${k}) = 1 (기저 사례) — 반환 시작!`,
          blocks: [...callStack].reverse().map((c, i) =>
            makeBlock(c, i === 0 ? 'found' : 'done')
          ),
        })
        callStack.pop()
        return 1
      }

      const sub = fact(k - 1)
      const result = k * sub

      callStack.push(`fact(${k})`)
      frames.push({
        description: `fact(${k}) = ${k} × fact(${k-1}) = ${k} × ${sub} = ${result}`,
        blocks: [...callStack].reverse().map((c, i) =>
          makeBlock(c, i === 0 ? 'highlight' : 'done')
        ),
      })
      callStack.pop()
      callStack.pop()
      return result
    }

    const result = fact(n)
    frames.push({
      description: `factorial(${n}) = ${result} — 스택 완전히 해제됨`,
      blocks: [makeBlock(`${n}! = ${result}`, 'found')],
    })

    return frames
  }
}
