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
  // 프로시저 & 함수 흐름 애니메이션
  procedureFlow: {
    load: () => import("@/components/animations/procedure-flow"),
    exportName: "ProcedureFlow",
    props: (step, _lang) => ({ ...step.componentProps, lang: _lang }),
  },

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

  // C++ 레슨: 헤더 파일 연결 애니메이션
  headerFiles: {
    load: () => import("@/components/animations/header-files"),
    exportName: "HeaderFilesAnimation",
  },

  // C++ 레슨: 함수 순서 오류 애니메이션
  functionOrder: {
    load: () => import("@/components/animations/function-order"),
    exportName: "FunctionOrderAnimation",
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

  // 문법 조립 애니메이션 (SyntaxBuilder)
  cppIfBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppIfBuilder",
  },
  cppForBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppForBuilder",
  },
  cppWhileBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppWhileBuilder",
  },
  cppFunctionBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppFunctionBuilder",
  },
  pyIfBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyIfBuilder",
  },
  pyForBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyForBuilder",
  },
  pyFunctionBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyFunctionBuilder",
  },
  pyClassBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyClassBuilder",
  },
  cppSwitchBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppSwitchBuilder",
  },
  cppArrayBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppArrayBuilder",
  },
  // Python 레슨 3: 변수 업데이트 시각화 (x = x + 2)
  variableUpdateVisualizer: {
    load: () => import("@/components/animations/variable-update-visualizer"),
    exportName: "VariableUpdateVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // pair vs 두 vector 비교 시각화 (cpp-15 lesson)
  pairVsTwoVectors: {
    load: () => import("@/components/animations/pair-vs-vectors"),
    exportName: "PairVsTwoVectorsAnimation",
  },
  // pair 비교 & 정렬 인터랙티브 애니메이션 (cpp-15 lesson)
  pairCompare: {
    load: () => import("@/components/animations/pair-compare"),
    exportName: "PairCompareAnimation",
  },
  // 선형 탐색 시뮬레이션 (탐색 알고리즘 도입)
  linearSearch: {
    load: () => import("@/components/animations/linear-search"),
    exportName: "LinearSearchAnimation",
  },
  // 이진 탐색 시뮬레이션 (lower_bound 이해)
  binarySearch: {
    load: () => import("@/components/animations/binary-search"),
    exportName: "BinarySearchAnimation",
  },
  cppPointerBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppPointerBuilder",
  },
  cppStructBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppStructBuilder",
  },
  cppStructArrayBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppStructArrayBuilder",
  },
  cppClassBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppClassBuilder",
  },
  cppClassBasicBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppClassBasicBuilder",
  },
  cppObjectCreateBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppObjectCreateBuilder",
  },
  cppMemberAccessBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppMemberAccessBuilder",
  },
  cppObjectCreateCtorBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppObjectCreateCtorBuilder",
  },
  pyWhileBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyWhileBuilder",
  },
  pyTryExceptBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyTryExceptBuilder",
  },
  pyListBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyListBuilder",
  },
  pyDictBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyDictBuilder",
  },
  cppTernaryBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppTernaryBuilder",
  },
  cppVariableBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppVariableBuilder",
  },
  cppCoutBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppCoutBuilder",
  },
  cppCinBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppCinBuilder",
  },
  cppStringBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppStringBuilder",
  },
  cppDoWhileBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppDoWhileBuilder",
  },
  pyVariableBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyVariableBuilder",
  },
  pyPrintBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyPrintBuilder",
  },
  pyInputBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "PyInputBuilder",
  },
  cppEscapeBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppEscapeBuilder",
  },
  cppCharBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppCharBuilder",
  },
  cppTypeConvertBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppTypeConvertBuilder",
  },
  cppIntDivisionBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppIntDivisionBuilder",
  },
  cppElseIfBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppElseIfBuilder",
  },
  cppVectorBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppVectorBuilder",
  },
  cppRangeForBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppRangeForBuilder",
  },
  cppAutoBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppAutoBuilder",
  },
  cppReferenceBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppReferenceBuilder",
  },
  cppCallByRefBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppCallByRefBuilder",
  },
  cppPublicPrivateBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppPublicPrivateBuilder",
  },
  cppBraceTrapBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppBraceTrapBuilder",
  },
  cppConstructorBuilder: {
    load: () => import("@/components/animations/syntax-builder"),
    exportName: "CppConstructorBuilder",
  },

  // C++ 레슨 21: 2D 배열 이중 for문 시각화
  gridLoopVisualizer: {
    load: () => import("@/components/animations/grid-loop-visualizer"),
    exportName: "GridLoopVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨 14: struct 배열 + for 루프 시각화
  cppStructArrayLoop: {
    load: () => import("@/components/animations/struct-array-loop"),
    exportName: "StructArrayLoop",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨 14: cin으로 struct 배열/vector 채우기 시각화
  cinFillVisualizer: {
    load: () => import("@/components/animations/cin-fill-visualizer"),
    exportName: "CinFillVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨 22: 생성자 있을 때 vs 없을 때 비교 시각화
  constructorVisualizer: {
    load: () => import("@/components/animations/constructor-visualizer"),
    exportName: "ConstructorVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: auto 타입 추론 시각화
  autoTypeVisualizer: {
    load: () => import("@/components/animations/auto-type-visualizer"),
    exportName: "AutoTypeVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 복사 vs 참조 메모리 주소 시뮬레이션
  copyRefMemory: {
    load: () => import("@/components/animations/copy-ref-memory"),
    exportName: "CopyRefMemory",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 복사/참조/Java 주소복사 상자 비교 (cpp-12)
  referenceBoxVisualizer: {
    load: () => import("@/components/animations/reference-box-visualizer"),
    exportName: "ReferenceBoxVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: range-based for 루프 복사 vs 참조 시각화
  rangeForVisualizer: {
    load: () => import("@/components/animations/range-for-visualizer"),
    exportName: "RangeForVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 함수 호출 시 복사 시각화 (Call by Value)
  callByValueVisualizer: {
    load: () => import("@/components/animations/call-by-value-visualizer"),
    exportName: "CallByValueVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 함수 호출 시 참조 시각화 (Call by Reference)
  callByRefVisualizer: {
    load: () => import("@/components/animations/call-by-ref-visualizer"),
    exportName: "CallByRefVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨 11: string 메서드 인터랙티브 체험 (substr / find / replace)
  stringMethodVisualizer: {
    load: () => import("@/components/animations/string-method-visualizer"),
  },

  // C++ 레슨 13: 참조 vs 포인터 비교 시뮬
  pointerRefVisualizer: {
    load: () => import("@/components/animations/pointer-ref-visualizer"),
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 배열 부분 초기화 기본값 시각화
  arrayInitVisualizer: {
    load: () => import("@/components/animations/array-init-visualizer"),
    exportName: "ArrayInitVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: 데이터 타입별 메모리 시각화
  memoryTypeVisualizer: {
    load: () => import("@/components/animations/memory-type-visualizer"),
    exportName: "MemoryTypeVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // C++ 레슨: cin 버퍼 시각화 (cin.ignore 설명용)
  cinBufferVisualizer: {
    load: () => import("@/components/animations/cin-buffer-visualizer"),
    exportName: "CinBufferVisualizer",
    props: (_step: any, lang: string) => ({ lang }),
  },

  // 코드 실행 추적 시뮬레이터 (조건문/반복문 단계별 실행)
  codeTracePyIfElse: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyIfElse",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyNestedIf: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyNestedIf",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyForSum: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyForSum",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyWhile: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyWhile",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyForIf: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyForIf",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppIfElse: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppIfElse",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppFor: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppFor",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppArrayLoop: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppArrayLoop",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppWhile: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppWhile",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppBraceTrapNo: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppBraceTrapNo",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppBraceTrapYes: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppBraceTrapYes",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppBraceTrapNoCombo: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppBraceTrapNoCombo",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppBraceTrapYesCombo: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppBraceTrapYesCombo",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppScoreGrade: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppScoreGrade",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyIfElseLow: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyIfElseLow",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTracePyNestedIfFalse: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTracePyNestedIfFalse",
    props: (_step: any, lang: string) => ({ lang }),
  },
  codeTraceCppScoreGradeHigh: {
    load: () => import("@/components/animations/code-trace/preset-components"),
    exportName: "CodeTraceCppScoreGradeHigh",
    props: (_step: any, lang: string) => ({ lang }),
  },
}

export default registry
export type ComponentName = keyof typeof registry
