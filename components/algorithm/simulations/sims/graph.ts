import type { SimDefinition, SimFrame, NodeElement, EdgeElement } from '../types'

// 작은 그래프 (6노드) — 좌표 설정
const SAMPLE_NODES = [
  { id: 'A', x: 50,  y: 100, label: 'A' },
  { id: 'B', x: 150, y: 50,  label: 'B' },
  { id: 'C', x: 150, y: 150, label: 'C' },
  { id: 'D', x: 250, y: 50,  label: 'D' },
  { id: 'E', x: 250, y: 150, label: 'E' },
  { id: 'F', x: 350, y: 100, label: 'F' },
]
const SAMPLE_EDGES: [string, string][] = [
  ['A','B'], ['A','C'], ['B','D'], ['B','E'], ['C','E'], ['D','F'], ['E','F']
]

function makeNodes(visited: Set<string>, visiting: string | null, path: Set<string> = new Set()): NodeElement[] {
  return SAMPLE_NODES.map(n => ({
    type: 'node' as const,
    ...n,
    color: path.has(n.id) ? 'path' as const
      : n.id === visiting ? 'visiting' as const
      : visited.has(n.id) ? 'visited' as const
      : 'default' as const
  }))
}

function makeEdges(highlighted: [string,string][] = []): EdgeElement[] {
  return SAMPLE_EDGES.map(([from, to]) => ({
    type: 'edge' as const,
    from, to,
    highlight: highlighted.some(([f,t]) => (f===from && t===to) || (f===to && t===from))
  }))
}

// ─── DFS ─────────────────────────────────────────────────────
export const dfsSim: SimDefinition = {
  id: 'dfs',
  title: 'DFS (깊이 우선 탐색)',
  generate(): SimFrame[] {
    const frames: SimFrame[] = []
    const visited = new Set<string>()
    const adj: Record<string, string[]> = {}
    for (const [f, t] of SAMPLE_EDGES) {
      ;(adj[f] = adj[f] || []).push(t)
      ;(adj[t] = adj[t] || []).push(f)
    }
    for (const k of Object.keys(adj)) adj[k].sort()

    frames.push({
      description: `DFS: 시작 노드 A에서 깊이 우선 탐색 — 스택/재귀 이용`,
      nodes: makeNodes(visited, null),
      edges: makeEdges(),
    })

    const order: string[] = []

    function dfs(node: string) {
      visited.add(node)
      order.push(node)

      frames.push({
        description: `방문: ${node} — 순서: [${order.join(' → ')}]`,
        nodes: makeNodes(visited, node),
        edges: makeEdges(),
      })

      for (const next of (adj[node] || [])) {
        if (!visited.has(next)) {
          frames.push({
            description: `${node} → ${next} 이동 (미방문)`,
            nodes: makeNodes(visited, next),
            edges: makeEdges([[node, next]]),
          })
          dfs(next)
        }
      }
    }

    dfs('A')

    frames.push({
      description: `DFS 완료! 방문 순서: ${order.join(' → ')} — 시간복잡도 O(V+E)`,
      nodes: makeNodes(visited, null, visited),
      edges: makeEdges(),
    })

    return frames
  }
}

// ─── BFS ─────────────────────────────────────────────────────
export const bfsSim: SimDefinition = {
  id: 'bfs',
  title: 'BFS (너비 우선 탐색)',
  generate(): SimFrame[] {
    const frames: SimFrame[] = []
    const visited = new Set<string>()
    const dist: Record<string, number> = {}
    const adj: Record<string, string[]> = {}
    for (const [f, t] of SAMPLE_EDGES) {
      ;(adj[f] = adj[f] || []).push(t)
      ;(adj[t] = adj[t] || []).push(f)
    }
    for (const k of Object.keys(adj)) adj[k].sort()

    frames.push({
      description: `BFS: 시작 노드 A에서 너비 우선 탐색 — 큐 이용, 최단 거리 보장`,
      nodes: makeNodes(visited, null),
      edges: makeEdges(),
    })

    const queue = ['A']
    visited.add('A')
    dist['A'] = 0
    const order: string[] = []

    while (queue.length) {
      const node = queue.shift()!
      order.push(node)

      frames.push({
        description: `큐에서 꺼냄: ${node} (거리=${dist[node]}) — 큐: [${queue.join(', ')}]`,
        nodes: SAMPLE_NODES.map(n => ({
          type: 'node' as const,
          ...n,
          color: n.id === node ? 'visiting' as const
            : visited.has(n.id) && order.includes(n.id) ? 'visited' as const
            : visited.has(n.id) ? 'path' as const
            : 'default' as const
        })),
        edges: makeEdges(),
      })

      for (const next of (adj[node] || [])) {
        if (!visited.has(next)) {
          visited.add(next)
          dist[next] = dist[node] + 1
          queue.push(next)

          frames.push({
            description: `${node} → ${next} 발견 (거리=${dist[next]}) — 큐에 추가: [${queue.join(', ')}]`,
            nodes: SAMPLE_NODES.map(n => ({
              type: 'node' as const,
              ...n,
              color: n.id === next ? 'path' as const
                : order.includes(n.id) ? 'visited' as const
                : visited.has(n.id) ? 'path' as const
                : 'default' as const
            })),
            edges: makeEdges([[node, next]]),
          })
        }
      }
    }

    frames.push({
      description: `BFS 완료! 방문 순서: ${order.join(' → ')} — 거리: ${Object.entries(dist).map(([k,v])=>`${k}:${v}`).join(', ')}`,
      nodes: makeNodes(visited, null, visited),
      edges: makeEdges(),
    })

    return frames
  }
}

// ─── 최단 경로 (BFS) ──────────────────────────────────────────
export const shortestPathBFSSim: SimDefinition = {
  id: 'shortest-path-bfs',
  title: '최단 경로 (BFS)',
  generate(): SimFrame[] {
    const frames: SimFrame[] = []
    const dist: Record<string, number> = {}
    const prev: Record<string, string | null> = {}
    const adj: Record<string, string[]> = {}
    for (const [f, t] of SAMPLE_EDGES) {
      ;(adj[f] = adj[f] || []).push(t)
      ;(adj[t] = adj[t] || []).push(f)
    }

    const start = 'A', goal = 'F'
    const visited = new Set<string>()

    frames.push({
      description: `${start}에서 ${goal}까지 최단 경로 찾기 — BFS는 가중치 없는 그래프에서 최단 경로 보장`,
      nodes: makeNodes(new Set(), null),
      edges: makeEdges(),
    })

    const queue = [start]
    visited.add(start)
    dist[start] = 0
    prev[start] = null

    while (queue.length) {
      const node = queue.shift()!
      if (node === goal) break

      for (const next of (adj[node] || [])) {
        if (!visited.has(next)) {
          visited.add(next)
          dist[next] = dist[node] + 1
          prev[next] = node
          queue.push(next)

          frames.push({
            description: `${start}→${next}: 거리 ${dist[next]} (경유: ${node})`,
            nodes: SAMPLE_NODES.map(n => ({
              type: 'node' as const,
              ...n,
              color: n.id === next ? 'path' as const
                : visited.has(n.id) ? 'visited' as const
                : 'default' as const
            })),
            edges: makeEdges([[node, next]]),
          })
        }
      }
    }

    // reconstruct path
    const path: string[] = []
    let cur: string | null = goal
    while (cur !== null) { path.unshift(cur); cur = prev[cur] ?? null }

    const pathSet = new Set(path)
    const pathEdges: [string,string][] = []
    for (let i = 0; i < path.length - 1; i++) pathEdges.push([path[i], path[i+1]])

    frames.push({
      description: `최단 경로: ${path.join(' → ')} (거리: ${dist[goal]})`,
      nodes: SAMPLE_NODES.map(n => ({
        type: 'node' as const,
        ...n,
        color: pathSet.has(n.id) ? 'found' as const : 'visited' as const
      })),
      edges: SAMPLE_EDGES.map(([from, to]) => ({
        type: 'edge' as const,
        from, to,
        highlight: pathEdges.some(([f,t]) => (f===from && t===to) || (f===to && t===from))
      })),
    })

    return frames
  }
}

// ─── 트리 순회 (DFS — Inorder/Preorder) ──────────────────────
const TREE_NODES: NodeElement[] = [
  { type: 'node', id: '4', x: 150, y: 30,  label: '4', color: 'default' },
  { type: 'node', id: '2', x: 75,  y: 90,  label: '2', color: 'default' },
  { type: 'node', id: '6', x: 225, y: 90,  label: '6', color: 'default' },
  { type: 'node', id: '1', x: 40,  y: 150, label: '1', color: 'default' },
  { type: 'node', id: '3', x: 110, y: 150, label: '3', color: 'default' },
  { type: 'node', id: '5', x: 190, y: 150, label: '5', color: 'default' },
  { type: 'node', id: '7', x: 260, y: 150, label: '7', color: 'default' },
]
const TREE_EDGES: EdgeElement[] = [
  { type: 'edge', from: '4', to: '2' },
  { type: 'edge', from: '4', to: '6' },
  { type: 'edge', from: '2', to: '1' },
  { type: 'edge', from: '2', to: '3' },
  { type: 'edge', from: '6', to: '5' },
  { type: 'edge', from: '6', to: '7' },
]
const TREE_ADJ: Record<string, string[]> = {
  '4': ['2', '6'], '2': ['1', '3'], '6': ['5', '7'],
  '1': [], '3': [], '5': [], '7': []
}

export const inorderSim: SimDefinition = {
  id: 'inorder',
  title: '이진 트리 순회',
  generate(): SimFrame[] {
    const frames: SimFrame[] = []
    const visited = new Set<string>()
    const inorderResult: string[] = []
    const preorderResult: string[] = []

    function makeTreeNodes(cur: string | null): NodeElement[] {
      return TREE_NODES.map(n => ({
        ...n,
        color: n.id === cur ? 'visiting' as const
          : visited.has(n.id) ? 'visited' as const
          : 'default' as const
      }))
    }

    frames.push({
      description: `이진 탐색 트리 순회 — 전위(preorder): 루트→왼→오 / 중위(inorder): 왼→루트→오`,
      nodes: makeTreeNodes(null),
      edges: TREE_EDGES,
    })

    function inorder(node: string) {
      const [left, right] = TREE_ADJ[node] || []
      if (left) inorder(left)
      visited.add(node)
      inorderResult.push(node)
      frames.push({
        description: `중위 방문: ${node} — [${inorderResult.join(', ')}] (BST에서 오름차순 출력!)`,
        nodes: makeTreeNodes(node),
        edges: TREE_EDGES,
      })
      if (right) inorder(right)
    }

    function preorder(node: string) {
      preorderResult.push(node)
      const [left, right] = TREE_ADJ[node] || []
      if (left) preorder(left)
      if (right) preorder(right)
    }

    inorder('4')
    preorder('4')

    frames.push({
      description: `중위(inorder): [${inorderResult.join(', ')}] ← BST는 항상 정렬! | 전위(preorder): [${preorderResult.join(', ')}]`,
      nodes: TREE_NODES.map(n => ({ ...n, color: 'visited' as const })),
      edges: TREE_EDGES,
    })

    return frames
  }
}
