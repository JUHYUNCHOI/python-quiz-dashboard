"use client"

import React from "react"

// ============================================
// 컴포넌트 레지스트리
// 새 컴포넌트 추가 시 여기에 한 줄만 등록하면 끝!
// ============================================

type ComponentEntry = {
  load: () => Promise<{ default: React.ComponentType<any> } | Record<string, React.ComponentType<any>>>
  exportName?: string
  props?: (step: any, lang: string, onSuccess: () => void) => Record<string, any>
}

const registry: Record<string, ComponentEntry> = {
  // 데이터 구조
  dataStructures: {
    load: () => import("@/components/animations/data-structures"),
    exportName: "DataStructuresComparison",
  },

  // 함수 관련
  functionVisualizer: {
    load: () => import("@/components/animations/function-visualizer"),
    exportName: "FunctionVisualizer",
    props: (step) => step.componentProps || {},
  },
  functionStructure: {
    load: () => import("@/components/animations/function-structure"),
    exportName: "FunctionStructure",
    props: (_step, lang) => ({ lang }),
  },
  parameterStructure: {
    load: () => import("@/components/animations/function-structure"),
    exportName: "ParameterStructure",
    props: (_step, lang) => ({ lang }),
  },
  returnStructure: {
    load: () => import("@/components/animations/function-structure"),
    exportName: "ReturnStructure",
    props: (_step, lang) => ({ lang }),
  },
  functionBuilder: {
    load: () => import("@/components/animations/function-builder"),
    exportName: "FunctionBuilder",
  },

  // 반복/패턴
  repetitiveTyping: {
    load: () => import("@/components/animations/repetitive-typing"),
    exportName: "RepetitiveTyping",
  },
  patternDiscovery: {
    load: () => import("@/components/animations/pattern-discovery"),
    exportName: "PatternDiscovery",
  },

  // 따라치기
  typeAlong: {
    load: () => import("@/components/animations/type-along-practice"),
    exportName: "TypeAlongPractice",
    props: (step, _lang, onSuccess) => ({
      title: step.targetTitle || "따라 써보세요",
      description: step.targetDescription || step.description || "",
      targetCode: step.targetCode,
      expectedOutput: step.expectedOutput || "",
      onComplete: onSuccess,
    }),
  },

  // 빈칸 채우기
  fillInBlank: {
    load: () => import("@/components/animations/fill-in-blank"),
    exportName: "FillInBlank",
    props: (step, _lang, onSuccess) => ({
      title: step.title,
      description: step.description || "",
      codeTemplate: step.codeTemplate,
      blanks: step.blanks,
      choices: step.choices,
      expectedOutput: step.expectedOutput,
      onComplete: onSuccess,
    }),
  },

  // Lesson 30: 매개변수/반환값
  defaultValueVisualizer: {
    load: () => import("@/components/animations/lesson30"),
    exportName: "DefaultValueVisualizer",
    props: (_step, lang) => ({ lang }),
  },
  multipleReturnVisualizer: {
    load: () => import("@/components/animations/lesson30"),
    exportName: "MultipleReturnVisualizer",
    props: (_step, lang) => ({ lang }),
  },
  keywordArgVisualizer: {
    load: () => import("@/components/animations/lesson30"),
    exportName: "KeywordArgVisualizer",
    props: (_step, lang) => ({ lang }),
  },

  // Lesson 32: map()
  mapFactory: {
    load: () => import("@/components/animations/map-factory"),
    exportName: "MapFactoryVisualizer",
  },

  // Lesson 34: try-except
  tryExceptFlow: {
    load: () => import("@/components/animations/try-except"),
    exportName: "TryExceptFlow",
  },
  safetyNetAnimation: {
    load: () => import("@/components/animations/try-except"),
    exportName: "SafetyNetAnimation",
  },
  shieldAnimation: {
    load: () => import("@/components/animations/try-except"),
    exportName: "ShieldAnimation",
  },
  errorTypesCards: {
    load: () => import("@/components/animations/try-except"),
    exportName: "ErrorTypesCards",
  },
  multiExceptFlow: {
    load: () => import("@/components/animations/try-except"),
    exportName: "MultiExceptFlow",
  },
  gameCrashDemo: {
    load: () => import("@/components/animations/try-except"),
    exportName: "GameCrashDemo",
  },

  // Lesson 38: 클래스 기초
  classBoonguh: {
    load: () => import("@/components/animations/class-basics"),
    exportName: "ClassBoonguhAnimation",
  },

  // C++ 레슨: 컴파일 시뮬레이터
  compileVisualizer: {
    load: () => import("@/components/animations/compile-visualizer"),
    exportName: "CompileVisualizer",
    props: (_step: any, lang: string) => ({
      lang,
    }),
  },

  // C++ 레슨: 문법 차이 찾기 게임
  syntaxSpotter: {
    load: () => import("@/components/animations/syntax-spotter"),
    exportName: "SyntaxSpotter",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: Hello World 조립 퍼즐
  helloWorldBuilder: {
    load: () => import("@/components/animations/hello-world-builder"),
    exportName: "HelloWorldBuilder",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 게임 캐릭터 cout 미션
  coutMission: {
    load: () => import("@/components/animations/cout-mission"),
    exportName: "CoutMission",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 빌드-실행 플로우 애니메이션
  buildRunFlow: {
    load: () => import("@/components/animations/build-run-flow"),
    exportName: "BuildRunFlow",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // Lesson 35: 파일 읽고 쓰기
  memoryVsFile: {
    load: () => import("@/components/animations/file-io"),
    exportName: "MemoryVsFileAnimation",
  },
  fileModeSimulator: {
    load: () => import("@/components/animations/file-io"),
    exportName: "FileModeSimulator",
  },
  readMethodDemo: {
    load: () => import("@/components/animations/file-io"),
    exportName: "ReadMethodDemo",
  },
}

export default registry
export type ComponentName = keyof typeof registry
