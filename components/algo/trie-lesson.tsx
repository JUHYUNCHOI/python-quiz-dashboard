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

/** 트라이 토픽 수업 본문 — 패널/페이지 어디서든 in-context 로 렌더. */
export function TrieLesson() {
  const { t } = useLanguage()
  const H = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-black text-gray-900 text-base mb-1.5">{children}</h3>
  )
  return (
    <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-2xl">
      <section>
        <H>{t("1. 트라이가 뭐야?", "1. What is a trie?")}</H>
        <p>{t("여러 문자열을 글자 단위로 가지치기해서 저장하는 트리예요. 같은 접두사는 길을 공유해요.", "A tree that stores many strings character by character. Strings sharing a prefix share the same path.")}</p>
        <p className="text-gray-500 mt-1 font-mono text-xs">{t('"cat", "car", "dog" → c-a-(t/r), d-o-g', '"cat", "car", "dog" → c-a-(t/r), d-o-g')}</p>
      </section>

      <section>
        <H>{t("2. 왜 써? — 접두사 검색이 빠름", "2. Why? — fast prefix search")}</H>
        <p>{t('"ca 로 시작하는 단어 다 찾기" 같은 접두사 질문에 강해요. 길이 L짜리 단어 검색이 글자 수 L번 만에 끝나요.', 'Great for prefix queries like "all words starting with ca". Searching a length-L word takes just L steps.')}</p>
        <p>{t("자동완성, 사전, IP 라우팅, 비트 XOR 최댓값 문제 등에 쓰여요.", "Used in autocomplete, dictionaries, IP routing, max-XOR problems, etc.")}</p>
      </section>

      <section>
        <H>{t("3. 노드 구조", "3. Node structure")}</H>
        <p>{t("각 노드는 '다음 글자 → 자식 노드' 맵과, '여기서 단어가 끝나는가' 표시를 가져요.", "Each node holds a 'next char → child' map plus a flag 'does a word end here?'.")}</p>
        <Code lang="python" code={`class Node:
    def __init__(self):
        self.children = {}   # 글자 -> 자식 Node
        self.end = False     # 여기서 끝나는 단어가 있나?`} />
      </section>

      <section>
        <H>{t("4. 넣기 / 찾기", "4. Insert / search")}</H>
        <p>{t("글자를 따라 내려가며 없으면 새 노드를 만들고, 마지막에 end 표시. 찾을 때도 글자를 따라 내려가요.", "Walk down char by char, create nodes when missing, mark end at the last. Searching follows the same path.")}</p>
        <Code lang="python" code={`def insert(root, word):
    node = root
    for ch in word:
        node = node.children.setdefault(ch, Node())
        # 없으면 새 Node, 있으면 기존 길 따라감
    node.end = True

def search(root, word):
    node = root
    for ch in word:
        if ch not in node.children:
            return False         # 길이 끊김 → 없음
        node = node.children[ch]
    return node.end              # 정확히 그 단어로 끝나야 True`} />
      </section>

      <Link href="/algo/trie/learn" className="inline-flex items-center gap-1 text-xs text-violet-500 hover:underline">
        🎬 {t("애니메이션으로 단계별 더 보기", "See the step-by-step animation")} →
      </Link>
    </div>
  )
}
