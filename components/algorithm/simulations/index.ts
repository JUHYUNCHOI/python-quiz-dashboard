import type { SimDefinition } from './types'

// Sorting
import {
  cutlineSim,
  selectionSortSim,
  insertionSortSim,
  bubbleSortSim,
  quickSortSim,
  mergeSortSim,
} from './sims/sorting'

// Array / String
import {
  twoPointersSim,
  slidingWindowSim,
  prefixSumSim,
  linearSearchSim,
} from './sims/array'

// Stack / Queue / Hash
import {
  stackSim,
  queueSim,
  bracketSim,
  hashTableSim,
  dequeSim,
} from './sims/stackqueue'

// Search / Recursion / Greedy
import {
  binarySearchSim,
  lowerBoundSim,
  recursionSim,
  greedyCoinSim,
  greedyMeetingSim,
} from './sims/search'

// DP
import {
  fibDPSim,
  stairsSim,
  lisSim,
  knapsackSim,
  coinDPSim,
} from './sims/dp'

// Graph / Tree
import {
  dfsSim,
  bfsSim,
  shortestPathBFSSim,
  inorderSim,
} from './sims/graph'

const ALL_SIMS: SimDefinition[] = [
  // sorting
  cutlineSim,
  selectionSortSim,
  insertionSortSim,
  bubbleSortSim,
  quickSortSim,
  mergeSortSim,
  // array
  twoPointersSim,
  slidingWindowSim,
  prefixSumSim,
  linearSearchSim,
  // stack / queue / hash
  stackSim,
  queueSim,
  bracketSim,
  hashTableSim,
  dequeSim,
  // search / recursion / greedy
  binarySearchSim,
  lowerBoundSim,
  recursionSim,
  greedyCoinSim,
  greedyMeetingSim,
  // dp
  fibDPSim,
  stairsSim,
  lisSim,
  knapsackSim,
  coinDPSim,
  // graph / tree
  dfsSim,
  bfsSim,
  shortestPathBFSSim,
  inorderSim,
]

const SIM_REGISTRY: Record<string, SimDefinition> = {}
for (const sim of ALL_SIMS) {
  SIM_REGISTRY[sim.id] = sim
}

// ─── 토픽 파일에서 사용 중인 type 키와 시뮬레이터 매핑 ────────
const ALIASES: Record<string, SimDefinition> = {
  // sorting
  cutline:        cutlineSim,
  selection:      selectionSortSim,
  coordSort:      selectionSortSim,
  stableSort:     insertionSortSim,
  mergeIntervals: mergeSortSim,

  // array / prefix
  range:          prefixSumSim,
  window:         slidingWindowSim,
  charSum:        prefixSumSim,
  '2DSum':        prefixSumSim,

  // stack / queue / hash
  stackImpl:      stackSim,
  zero:           stackSim,
  parentheses:    bracketSim,
  bracket:        bracketSim,
  card2:          queueSim,
  minStack:       stackSim,
  numCard:        hashTableSim,
  containsDup:    hashTableSim,
  company:        hashTableSim,
  longestSub:     slidingWindowSim,
  subarraySum:    prefixSumSim,

  // binary search
  basicSearch:    binarySearchSim,
  bounds:         lowerBoundSim,
  cable:          binarySearchSim,
  treeCut:        binarySearchSim,
  router:         binarySearchSim,
  kth:            binarySearchSim,
  'lIS':          lisSim,

  // recursion / greedy
  coin:           greedyCoinSim,
  aTM:            greedyCoinSim,
  meeting:        greedyMeetingSim,

  // DP
  fib1:           fibDPSim,
  fun:            fibDPSim,
  '1to':          stairsSim,
  tile:           stairsSim,
  stair:          stairsSim,
  easyStair:      stairsSim,
  knapsack:       knapsackSim,
  lCS:            lisSim,
  bitonic:        lisSim,

  // graph / tree
  virus:          dfsSim,
  dFS1:           dfsSim,
  dFS2:           dfsSim,
  dFSBFS:         dfsSim,
  cabbage:        dfsSim,
  bFS1:           bfsSim,
  bFS2:           bfsSim,
  maze:           shortestPathBFSSim,
  treeTraversal:  inorderSim,
  levelOrder:     inorderSim,
}

for (const [alias, sim] of Object.entries(ALIASES)) {
  if (!(alias in SIM_REGISTRY)) {
    SIM_REGISTRY[alias] = sim
  }
}

export function getSim(type: string): SimDefinition | undefined {
  return SIM_REGISTRY[type]
}

export { SIM_REGISTRY, ALL_SIMS }
