export * from "./types"
// C++ clusters
export { part1ComboCluster } from "./cluster-part1-combo"
export { conditionalsCluster } from "./cluster-conditionals"
export { loopsCluster } from "./cluster-loops"
export { arraysCluster } from "./cluster-arrays"
export { ioCluster } from "./cluster-io"
export { stringsCluster } from "./cluster-strings"
export { mapSetCluster } from "./cluster-map-set"
export { sortingCluster } from "./cluster-sorting"
export { gridCluster } from "./cluster-grid"
export { simulationCluster } from "./cluster-simulation"
export { functionsCluster } from "./cluster-functions"
export { refsPtrsCluster } from "./cluster-refs-ptrs"
export { structsCluster } from "./cluster-structs"
export { stackQueueCluster } from "./cluster-stackqueue"
export { constructsCluster } from "./cluster-constructs"
export { bankBruteforceCluster } from "./bank-bruteforce"
export { bankSortingCluster } from "./bank-sorting"
export { bankSimulationCluster } from "./bank-simulation"
export { bankStringsCluster } from "./bank-strings"
export { bankGridCluster } from "./bank-grid"
// Python clusters
export { pyBasicsCluster } from "./py-cluster-basics"
export { pyOutputCluster } from "./py-cluster-output"
export { pyTypeConvCluster } from "./py-cluster-typeconv"
export { pyIoCluster } from "./py-cluster-io"
export { pyConditionalsCluster } from "./py-cluster-conditionals"
export { pyLogicCluster } from "./py-cluster-logic"
export { pyLoopsCluster } from "./py-cluster-loops"
export { pyListsCluster } from "./py-cluster-lists"
export { pyStringsCluster } from "./py-cluster-strings"
export { pyDictsCluster } from "./py-cluster-dicts"
export { pyFunctionsCluster } from "./py-cluster-functions"
export { pyOopCluster } from "./py-cluster-oop"

import { part1ComboCluster } from "./cluster-part1-combo"
import { conditionalsCluster } from "./cluster-conditionals"
import { loopsCluster } from "./cluster-loops"
import { arraysCluster } from "./cluster-arrays"
import { ioCluster } from "./cluster-io"
import { stringsCluster } from "./cluster-strings"
import { mapSetCluster } from "./cluster-map-set"
import { sortingCluster } from "./cluster-sorting"
import { gridCluster } from "./cluster-grid"
import { simulationCluster } from "./cluster-simulation"
import { functionsCluster } from "./cluster-functions"
import { refsPtrsCluster } from "./cluster-refs-ptrs"
import { structsCluster } from "./cluster-structs"
import { stackQueueCluster } from "./cluster-stackqueue"
import { constructsCluster } from "./cluster-constructs"
import { bankBruteforceCluster } from "./bank-bruteforce"
import { bankSortingCluster } from "./bank-sorting"
import { bankSimulationCluster } from "./bank-simulation"
import { bankStringsCluster } from "./bank-strings"
import { bankGridCluster } from "./bank-grid"
import { pyBasicsCluster } from "./py-cluster-basics"
import { pyOutputCluster } from "./py-cluster-output"
import { pyTypeConvCluster } from "./py-cluster-typeconv"
import { pyIoCluster } from "./py-cluster-io"
import { pyConditionalsCluster } from "./py-cluster-conditionals"
import { pyLogicCluster } from "./py-cluster-logic"
import { pyLoopsCluster } from "./py-cluster-loops"
import { pyListsCluster } from "./py-cluster-lists"
import { pyStringsCluster } from "./py-cluster-strings"
import { pyDictsCluster } from "./py-cluster-dicts"
import { pyFunctionsCluster } from "./py-cluster-functions"
import { pyOopCluster } from "./py-cluster-oop"
import type { PracticeCluster } from "./types"

/** 코딩 뱅크 클러스터 — cpp-p3 완료 후 해금, 자유 선택 방식 */
export const BANK_CLUSTERS: PracticeCluster[] = [
  bankBruteforceCluster,
  bankSortingCluster,
  bankSimulationCluster,
  bankStringsCluster,
  bankGridCluster,
]

export const ALL_CLUSTERS: PracticeCluster[] = [
  // C++ clusters
  ioCluster,
  conditionalsCluster,
  loopsCluster,
  part1ComboCluster,
  arraysCluster,
  simulationCluster,
  stringsCluster,
  mapSetCluster,
  sortingCluster,
  gridCluster,
  functionsCluster,
  refsPtrsCluster,
  structsCluster,
  stackQueueCluster,
  constructsCluster,
  // Python clusters (early — lessons 1–12)
  pyBasicsCluster,
  pyOutputCluster,
  pyTypeConvCluster,
  pyIoCluster,
  pyConditionalsCluster,
  pyLogicCluster,
  // Python clusters (intermediate — lessons 13+)
  pyLoopsCluster,
  pyListsCluster,
  pyStringsCluster,
  pyDictsCluster,
  pyFunctionsCluster,
  pyOopCluster,
]
