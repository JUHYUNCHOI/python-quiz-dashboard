// 알고리즘 토픽별 contest 클러스터 20개 집계.
// ALL_CLUSTERS 에 포함시켜 (1) /practice 딥링크 조회 (2) 🎯 KL 필터(kl:true) 가 찾게 함.
// 단, 수업별 그리드(CPP/PYTHON_CLUSTERS)에는 ALGO_CONTEST_IDS 로 제외한다.

import { arrayContestCluster } from "./algo-array-contest"
import { backtrackingContestCluster } from "./algo-backtracking-contest"
import { binarySearchContestCluster } from "./algo-binarysearch-contest"
import { bitManipulationContestCluster } from "./algo-bitmanipulation-contest"
import { divideConquerContestCluster } from "./algo-divideconquer-contest"
import { dpContestCluster } from "./algo-dp-contest"
import { graphContestCluster } from "./algo-graph-contest"
import { greedyContestCluster } from "./algo-greedy-contest"
import { hashTableContestCluster } from "./algo-hashtable-contest"
import { prefixSumContestCluster } from "./algo-prefixsum-contest"
import { priorityQueueContestCluster } from "./algo-priorityqueue-contest"
import { recursionContestCluster } from "./algo-recursion-contest"
import { shortestPathContestCluster } from "./algo-shortestpath-contest"
import { sortingContestCluster } from "./algo-sorting-contest"
import { stackQueueContestCluster } from "./algo-stackqueue-contest"
import { stringContestCluster } from "./algo-string-contest"
import { topologicalSortContestCluster } from "./algo-topologicalsort-contest"
import { treeContestCluster } from "./algo-tree-contest"
import { trieContestCluster } from "./algo-trie-contest"
import { unionFindContestCluster } from "./algo-unionfind-contest"
import type { PracticeCluster } from "./types"

export const ALGO_CONTEST_CLUSTERS: PracticeCluster[] = [
  arrayContestCluster,
  backtrackingContestCluster,
  binarySearchContestCluster,
  bitManipulationContestCluster,
  divideConquerContestCluster,
  dpContestCluster,
  graphContestCluster,
  greedyContestCluster,
  hashTableContestCluster,
  prefixSumContestCluster,
  priorityQueueContestCluster,
  recursionContestCluster,
  shortestPathContestCluster,
  sortingContestCluster,
  stackQueueContestCluster,
  stringContestCluster,
  topologicalSortContestCluster,
  treeContestCluster,
  trieContestCluster,
  unionFindContestCluster,
]

export const ALGO_CONTEST_IDS = new Set(ALGO_CONTEST_CLUSTERS.map(c => c.id))
