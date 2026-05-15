/**
 * Friendly hints for common C++ compile errors.
 * Match patterns in raw compiler output and return a one-line student-friendly hint.
 *
 * Returns `null` if no pattern matched.
 */

interface ErrorHint {
  ko: string
  en: string
}

const PATTERNS: Array<{ regex: RegExp; hint: ErrorHint }> = [
  // Lambda return type mismatch (the actual student error we saw)
  {
    regex: /inconsistent\s+types\s+'bool'\s+and\s+'int'\s+deduced\s+for\s+lambda\s+return\s+type/i,
    hint: {
      ko: "💡 sort 의 람다는 **bool (true/false) 만** 반환해야 해요. \`return a\` 처럼 값 자체를 돌려주면 안 됨. \`return a < b\` 처럼 **비교 결과** 만 돌려주세요.",
      en: "💡 A sort lambda must return **bool (true/false) only**. Don't return a value like `return a` — return a comparison result like `return a < b`.",
    },
  },
  // Generic inconsistent return types
  {
    regex: /inconsistent\s+types\s+'(\w+)'\s+and\s+'(\w+)'\s+deduced\s+for\s+lambda\s+return\s+type/i,
    hint: {
      ko: "💡 람다 안에서 return 타입이 섞였어요. 모든 return 문이 **같은 타입** 을 돌려줘야 해요.",
      en: "💡 The lambda has mixed return types. All `return` statements must return the **same type**.",
    },
  },
  // Undeclared identifier (e.g. forgot include)
  {
    regex: /'(\w+)'\s+was\s+not\s+declared|use\s+of\s+undeclared\s+identifier\s+'(\w+)'/i,
    hint: {
      ko: "💡 변수나 함수 이름이 선언 안 됐어요. 철자를 확인하고, 필요한 \`#include <...>\` 가 빠지지 않았는지 봐요. (예: \`sort\` 에는 \`#include <algorithm>\`)",
      en: "💡 An identifier is not declared. Check spelling and make sure the right `#include <...>` is present. (e.g. `sort` needs `#include <algorithm>`)",
    },
  },
  // Expected ; before
  {
    regex: /expected\s+';'\s+before|expected\s+';'\s+at\s+end/i,
    hint: {
      ko: "💡 세미콜론 \`;\` 이 빠졌어요. 위 줄 끝에 \`;\` 추가.",
      en: "💡 Missing semicolon `;`. Add `;` at the end of the previous line.",
    },
  },
  // Missing }
  {
    regex: /expected\s+'\}'|expected\s+declaration\s+at\s+end/i,
    hint: {
      ko: "💡 닫는 중괄호 \`}\` 가 부족해요. 함수나 블록을 잘 닫았는지 확인.",
      en: "💡 Missing closing brace `}`. Check that every `{` has a matching `}`.",
    },
  },
  // No matching function (template / overload)
  {
    regex: /no\s+matching\s+function\s+for\s+call\s+to\s+'?(\w+)'?/i,
    hint: {
      ko: "💡 함수 호출 인자가 맞지 않아요. 인자 개수와 타입을 확인하세요.",
      en: "💡 Function call arguments don't match. Check the number and types of arguments.",
    },
  },
  // Cannot convert
  {
    regex: /cannot\s+convert\s+'([^']+)'\s+to\s+'([^']+)'/i,
    hint: {
      ko: "💡 타입 변환이 안 돼요 — 한 타입에서 다른 타입으로 자동 변환할 수 없어요. 명시적 변환 (\`(int)x\` 같은 캐스팅) 이 필요할 수도.",
      en: "💡 Type conversion failed — can't auto-convert between these two types. An explicit cast (like `(int)x`) might be needed.",
    },
  },
  // Reference to undefined (link error)
  {
    regex: /undefined\s+reference\s+to/i,
    hint: {
      ko: "💡 함수 선언만 있고 정의가 없어요. 함수 본체 \`{ ... }\` 를 작성했는지 확인.",
      en: "💡 Function declared but not defined. Make sure the function body `{ ... }` is written.",
    },
  },
  // Comparison between signed and unsigned
  {
    regex: /comparison\s+(?:of|between)\s+(?:integer\s+expressions\s+of\s+different\s+signedness|signed\s+and\s+unsigned)/i,
    hint: {
      ko: "💡 부호 있는/없는 정수 비교 — 보통 \`size()\` 와 \`int\` 를 같이 비교할 때 나와요. \`(int)v.size()\` 로 캐스팅하거나 \`size_t\` 로 통일.",
      en: "💡 Comparing signed and unsigned ints — common when comparing `size()` (unsigned) with an `int` variable. Cast with `(int)v.size()` or use `size_t`.",
    },
  },
]

export function getErrorHint(errorMessage: string | undefined | null, lang: "ko" | "en" = "ko"): string | null {
  if (!errorMessage) return null
  for (const { regex, hint } of PATTERNS) {
    if (regex.test(errorMessage)) {
      return hint[lang]
    }
  }
  return null
}
