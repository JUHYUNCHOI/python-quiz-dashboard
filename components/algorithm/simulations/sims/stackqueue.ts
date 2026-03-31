import type { SimDefinition, SimFrame, BlockElement } from '../types'

function makeBlock(text: string, color: BlockElement['color'] = 'default', subText?: string): BlockElement {
  return { type: 'block', text, color, subText }
}

// ─── 스택 ────────────────────────────────────────────────────
export const stackSim: SimDefinition = {
  id: 'stack',
  title: '스택 (Stack)',
  defaultInput: 'push 3 push 7 push 1 pop push 5 pop pop',
  inputLabel: '명령 (push N / pop)',
  generate(input: string): SimFrame[] {
    const tokens = input.trim().split(/\s+/)
    const frames: SimFrame[] = []
    const stack: number[] = []

    function stackBlocks(): BlockElement[] {
      if (!stack.length) return [makeBlock('(비어 있음)', 'default')]
      return [...stack].reverse().map((v, i) =>
        makeBlock(String(v), i === 0 ? 'active' : 'done', i === 0 ? '← TOP' : undefined)
      )
    }

    frames.push({
      description: `스택: LIFO (Last In First Out) — 나중에 넣은 것이 먼저 나옴`,
      blocks: stackBlocks(),
    })

    let i = 0
    while (i < tokens.length) {
      const cmd = tokens[i]
      if (cmd === 'push' && i + 1 < tokens.length) {
        const val = parseInt(tokens[i+1])
        if (!isNaN(val)) {
          stack.push(val)
          frames.push({
            description: `push(${val}) — 스택 top에 ${val} 추가`,
            blocks: stackBlocks(),
          })
        }
        i += 2
      } else if (cmd === 'pop') {
        if (stack.length) {
          const popped = stack.pop()!
          frames.push({
            description: `pop() → ${popped} 반환 — top 제거`,
            blocks: stackBlocks(),
          })
        } else {
          frames.push({
            description: `pop() 실패 — 스택이 비어 있음!`,
            blocks: [makeBlock('EMPTY', 'mismatch')],
          })
        }
        i++
      } else {
        i++
      }
    }

    frames.push({
      description: `최종 스택: [${stack.join(', ')}] (bottom → top) — 시간복잡도 O(1)`,
      blocks: stackBlocks(),
    })

    return frames
  }
}

// ─── 큐 ──────────────────────────────────────────────────────
export const queueSim: SimDefinition = {
  id: 'queue',
  title: '큐 (Queue)',
  defaultInput: 'enqueue 3 enqueue 7 enqueue 1 dequeue enqueue 5 dequeue',
  inputLabel: '명령 (enqueue N / dequeue)',
  generate(input: string): SimFrame[] {
    const tokens = input.trim().split(/\s+/)
    const frames: SimFrame[] = []
    const queue: number[] = []

    function queueBlocks(): BlockElement[] {
      if (!queue.length) return [makeBlock('(비어 있음)', 'default')]
      return queue.map((v, i) =>
        makeBlock(String(v),
          i === 0 ? 'highlight' : i === queue.length - 1 ? 'active' : 'done',
          i === 0 ? 'FRONT' : i === queue.length-1 ? 'REAR' : undefined
        )
      )
    }

    frames.push({
      description: `큐: FIFO (First In First Out) — 먼저 넣은 것이 먼저 나옴`,
      blocks: queueBlocks(),
    })

    let i = 0
    while (i < tokens.length) {
      const cmd = tokens[i]
      if (cmd === 'enqueue' && i + 1 < tokens.length) {
        const val = parseInt(tokens[i+1])
        if (!isNaN(val)) {
          queue.push(val)
          frames.push({
            description: `enqueue(${val}) — REAR에 ${val} 추가`,
            blocks: queueBlocks(),
          })
        }
        i += 2
      } else if (cmd === 'dequeue') {
        if (queue.length) {
          const dequeued = queue.shift()!
          frames.push({
            description: `dequeue() → ${dequeued} 반환 — FRONT 제거`,
            blocks: queueBlocks(),
          })
        } else {
          frames.push({
            description: `dequeue() 실패 — 큐가 비어 있음!`,
            blocks: [makeBlock('EMPTY', 'mismatch')],
          })
        }
        i++
      } else {
        i++
      }
    }

    frames.push({
      description: `최종 큐: [${queue.join(' → ')}] (front → rear)`,
      blocks: queueBlocks(),
    })

    return frames
  }
}

// ─── 괄호 유효성 검사 (스택 응용) ────────────────────────────
export const bracketSim: SimDefinition = {
  id: 'bracket-check',
  title: '괄호 유효성 검사',
  defaultInput: '({[]})',
  inputLabel: '괄호 문자열',
  generate(input: string): SimFrame[] {
    const s = input.trim().replace(/[^(){}[\]]/g, '').slice(0, 12) || '({[]})'
    const frames: SimFrame[] = []
    const stack: string[] = []
    const matching: Record<string, string> = { ')': '(', '}': '{', ']': '[' }
    const opens = new Set('({[')
    let valid = true

    frames.push({
      description: `괄호 문자열: "${s}" — 스택으로 유효성 검사`,
      blocks: s.split('').map(c => makeBlock(c)),
    })

    for (let i = 0; i < s.length; i++) {
      const ch = s[i]

      function charBlocks(): BlockElement[] {
        return s.split('').map((c, j) =>
          makeBlock(c, j < i ? 'done' : j === i ? 'active' : 'default')
        )
      }

      if (opens.has(ch)) {
        stack.push(ch)
        frames.push({
          description: `'${ch}' 여는 괄호 → 스택에 push. 스택: [${stack.join(', ')}]`,
          blocks: charBlocks(),
          extra: { stackView: stack.join(' ') }
        })
      } else {
        const expected = matching[ch]
        const top = stack[stack.length - 1]
        if (top === expected) {
          stack.pop()
          frames.push({
            description: `'${ch}' 닫는 괄호, top='${top}' 매칭! 스택에서 pop. 스택: [${stack.join(', ')}]`,
            blocks: charBlocks(),
          })
        } else {
          valid = false
          frames.push({
            description: `'${ch}' 닫는 괄호인데 top='${top}' → 불일치! 유효하지 않음`,
            blocks: charBlocks(),
          })
          break
        }
      }
    }

    if (valid && stack.length > 0) {
      valid = false
      frames.push({
        description: `스택에 남은 괄호: [${stack.join(', ')}] → 유효하지 않음`,
        blocks: [makeBlock('INVALID', 'mismatch')],
      })
    }

    frames.push({
      description: valid
        ? `"${s}" — 유효한 괄호! 스택을 이용하면 O(n)으로 검사 가능`
        : `"${s}" — 유효하지 않은 괄호`,
      blocks: s.split('').map(c => makeBlock(c, valid ? 'found' : 'mismatch')),
    })

    return frames
  }
}

// ─── 해시 테이블 ──────────────────────────────────────────────
export const hashTableSim: SimDefinition = {
  id: 'hash-table',
  title: '해시 테이블',
  defaultInput: 'apple banana cherry apple date banana',
  inputLabel: '단어 목록',
  generate(input: string): SimFrame[] {
    const words = input.trim().split(/\s+/).filter(Boolean).slice(0, 8)
    const frames: SimFrame[] = []
    const table: Record<string, number> = {}

    frames.push({
      description: `단어 목록: [${words.join(', ')}] — 해시 테이블로 빈도 카운트`,
      blocks: words.map(w => makeBlock(w)),
    })

    for (const word of words) {
      const existed = word in table
      table[word] = (table[word] || 0) + 1

      frames.push({
        description: existed
          ? `"${word}" 이미 존재 → count ${table[word]-1} → ${table[word]}`
          : `"${word}" 새로 추가 → count = 1`,
        blocks: Object.entries(table).map(([k, v]) =>
          makeBlock(String(v), k === word ? 'active' : 'done', k)
        ),
      })
    }

    frames.push({
      description: `완성! 해시 테이블 조회/삽입 O(1) — 딕셔너리/map이 내부적으로 해시 사용`,
      blocks: Object.entries(table).map(([k, v]) =>
        makeBlock(String(v), 'found', k)
      ),
    })

    return frames
  }
}

// ─── 덱 (Deque) ───────────────────────────────────────────────
export const dequeSim: SimDefinition = {
  id: 'deque',
  title: '덱 (Deque)',
  defaultInput: 'rf 3 rb 7 pf rb 1 pf pb',
  inputLabel: 'rf=앞추가 rb=뒤추가 pf=앞제거 pb=뒤제거 + 숫자',
  generate(input: string): SimFrame[] {
    const tokens = input.trim().split(/\s+/)
    const frames: SimFrame[] = []
    const deque: number[] = []

    function dequeBlocks(): BlockElement[] {
      if (!deque.length) return [makeBlock('(비어 있음)', 'default')]
      return deque.map((v, i) =>
        makeBlock(String(v),
          i === 0 ? 'highlight' : i === deque.length - 1 ? 'active' : 'done',
          i === 0 ? 'FRONT' : i === deque.length-1 ? 'REAR' : undefined
        )
      )
    }

    frames.push({
      description: `덱: 양쪽에서 삽입/삭제 가능한 자료구조 (Double-Ended Queue)`,
      blocks: dequeBlocks(),
    })

    let i = 0
    while (i < tokens.length) {
      const cmd = tokens[i]
      if ((cmd === 'rf' || cmd === 'rb') && i + 1 < tokens.length) {
        const val = parseInt(tokens[i+1])
        if (!isNaN(val)) {
          if (cmd === 'rf') { deque.unshift(val); frames.push({ description: `appendleft(${val}) — FRONT에 추가`, blocks: dequeBlocks() }) }
          else               { deque.push(val);    frames.push({ description: `append(${val}) — REAR에 추가`,  blocks: dequeBlocks() }) }
        }
        i += 2
      } else if (cmd === 'pf') {
        if (deque.length) { const v = deque.shift()!; frames.push({ description: `popleft() → ${v}`, blocks: dequeBlocks() }) }
        i++
      } else if (cmd === 'pb') {
        if (deque.length) { const v = deque.pop()!; frames.push({ description: `pop() → ${v}`, blocks: dequeBlocks() }) }
        i++
      } else { i++ }
    }

    frames.push({
      description: `최종 덱: [${deque.join(' ↔ ')}] — Python: collections.deque, C++: std::deque`,
      blocks: dequeBlocks(),
    })

    return frames
  }
}
