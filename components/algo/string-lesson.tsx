"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { highlightCode } from "@/components/practice/practice-runner"

function Code({ code, lang = "cpp" }: { code: string; lang?: "cpp" | "python" }) {
  return (
    <pre
      className="rounded-lg bg-gray-900 px-3 py-2.5 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap my-2"
      dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
    />
  )
}

/** 문자열 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function StringLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 문자열 = 글자 배열", "1. A string is an array of chars")}</H>
        <p>{t("문자열은 인덱스로 한 글자씩 꺼낼 수 있는 배열이에요. 배열에서 쓰던 순회·두 포인터·슬라이딩 윈도우가 그대로 통해요.", "A string is an array of characters you can index. Traversal, two pointers, and sliding window all carry over.")}</p>
        <Code code={t(`string s = "hello";
char c = s[0];        // 'h'
int n = s.size();     // 5
for (char ch : s) { /* 한 글자씩 */ }`, `string s = "hello";
char c = s[0];        // 'h'
int n = s.size();     // 5
for (char ch : s) { /* one char at a time */ }`)} />
      </section>

      <section>
        <H>{t("2. 자르기 · 찾기 — substr · find", "2. Slice & search — substr · find")}</H>
        <p>{t("부분 문자열을 떼어내거나(substr), 어디에 있는지 찾을(find) 때 STL 함수를 써요.", "Use STL functions to slice a substring (substr) or locate one (find).")}</p>
        <Code code={t(`string s = "banana";
s.substr(1, 3);              // "ana"  (1번부터 3글자)
s.find("nan");               // 2     (없으면 string::npos)
s.find("xyz") == string::npos; // 못 찾음`, `string s = "banana";
s.substr(1, 3);              // "ana"  (3 chars from index 1)
s.find("nan");               // 2     (string::npos if not found)
s.find("xyz") == string::npos; // not found`)} />
        <Code lang="python" code={t(`s = "banana"
s[1:4]            # 'ana'   (슬라이싱)
s.find("nan")     # 2       (없으면 -1)`, `s = "banana"
s[1:4]            # 'ana'   (slicing)
s.find("nan")     # 2       (-1 if not found)`)} />
      </section>

      <section>
        <H>{t("3. ASCII · 글자 ↔ 숫자", "3. ASCII — char ↔ number")}</H>
        <p>{t("글자는 사실 숫자(ASCII)예요. 'a'~'z' 빈도를 셀 땐 26칸 배열로 ch − 'a' 를 인덱스로 써요. map 보다 빠르고 단순해요.", "Chars are really numbers (ASCII). To count 'a'–'z', use a 26-slot array indexed by ch − 'a' — faster and simpler than a map.")}</p>
        <Code code={t(`int cnt[26] = {0};
for (char ch : s) cnt[ch - 'a']++;   // 알파벳 빈도수
char up = toupper('a');              // 'A'
int  d  = '7' - '0';                 // 7  (문자 → 숫자)`, `int cnt[26] = {0};
for (char ch : s) cnt[ch - 'a']++;   // letter frequency
char up = toupper('a');              // 'A'
int  d  = '7' - '0';                 // 7  (char → number)`)} />
      </section>

      <section>
        <H>{t("4. 회문 · 윈도우 — 두 포인터 응용", "4. Palindrome & window")}</H>
        <p>{t("회문(앞뒤가 같은 단어)은 양 끝 두 포인터로 안쪽으로 좁히며 비교해요. '중복 없는 가장 긴 부분 문자열' 같은 건 슬라이딩 윈도우 + set.", "Palindromes: two pointers shrinking inward. 'Longest substring without repeats': sliding window + set.")}</p>
        <Code code={t(`// 회문 검사 — 두 포인터
int i = 0, j = s.size() - 1;
bool ok = true;
while (i < j)
    if (s[i++] != s[j--]) { ok = false; break; }`, `// palindrome check — two pointers
int i = 0, j = s.size() - 1;
bool ok = true;
while (i < j)
    if (s[i++] != s[j--]) { ok = false; break; }`)} />
      </section>

      <Link href="/algo/string/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
