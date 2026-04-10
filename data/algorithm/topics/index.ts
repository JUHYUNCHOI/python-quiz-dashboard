import type { AlgoTopic } from '../types'

export { stringTopic } from './string'
export { arrayTopic } from './array'
export { stackQueueTopic } from './stackqueue'
export { hashTableTopic } from './hashtable'
// linkedlist removed — not in USACO Bronze; topic removed from ALGO_TOPICS
// export { linkedListTopic } from './linkedlist'
export { prefixSumTopic } from './prefixsum'
export { recursionTopic } from './recursion'
export { sortingTopic } from './sorting'
export { binarySearchTopic } from './binarysearch'
export { graphTopic } from './graph'
export { backtrackingTopic } from './backtracking'
export { dpTopic } from './dp'
export { greedyTopic } from './greedy'
export { divideConquerTopic } from './divideconquer'
export { treeTopic } from './tree'
export { priorityQueueTopic } from './priorityqueue'
export { topologicalSortTopic } from './topologicalsort'
export { trieTopic } from './trie'
export { shortestPathTopic } from './shortestpath'
export { bitManipulationTopic } from './bitmanipulation'
export { unionFindTopic } from './unionfind'

import { stringTopic } from './string'
import { arrayTopic } from './array'
import { stackQueueTopic } from './stackqueue'
import { hashTableTopic } from './hashtable'
import { prefixSumTopic } from './prefixsum'
import { recursionTopic } from './recursion'
import { sortingTopic } from './sorting'
import { binarySearchTopic } from './binarysearch'
import { graphTopic } from './graph'
import { backtrackingTopic } from './backtracking'
import { dpTopic } from './dp'
import { greedyTopic } from './greedy'
import { divideConquerTopic } from './divideconquer'
import { treeTopic } from './tree'
import { priorityQueueTopic } from './priorityqueue'
import { topologicalSortTopic } from './topologicalsort'
import { trieTopic } from './trie'
import { shortestPathTopic } from './shortestpath'
import { bitManipulationTopic } from './bitmanipulation'
import { unionFindTopic } from './unionfind'

export const ALL_TOPICS: AlgoTopic[] = [
  stringTopic,
  arrayTopic,
  stackQueueTopic,
  hashTableTopic,
  prefixSumTopic,
  recursionTopic,
  sortingTopic,
  binarySearchTopic,
  graphTopic,
  backtrackingTopic,
  dpTopic,
  greedyTopic,
  divideConquerTopic,
  treeTopic,
  priorityQueueTopic,
  topologicalSortTopic,
  trieTopic,
  shortestPathTopic,
  bitManipulationTopic,
  unionFindTopic,
]
