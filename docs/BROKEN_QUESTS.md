# 🚧 미완성 / 깨진 quest — 학생에게 숨김 (안 잊기 위한 기록)

> 선생님 2026-07-13: "숨겼다가 나중에 내가 기억을 못할수도 있는데" → 잊지 않도록 여기 기록.
> Claude 도 메모리에 기록해서 다음 세션에 상기시킴.

## 왜 숨겼나
아래 quest 들은 C++ 풀이가 **파이썬 → C++ 자동번역하다 만 깨진 스텁**이에요.
증상: `// TODO: type args`, C++ 안에 `sys.stdin.read()` / `.append` / `auto x = []` 등 파이썬 문법 섞임.
전부 **미검증**(USACO_VERIFIED 헤더 없음), MCC 문제.

학생이 열면 깨진 C++ 를 보게 되어 **quest 목록에서 숨김** 처리함.

## 어떻게 숨겼나
- `app/quest/page.tsx` 의 `SECTIONS` 에서 각 항목에 **`broken: true`** 플래그.
- 목록 렌더 필터: `s.problems.filter(p => !p.broken && canSeeProblem(p.id))`.
- **삭제 아님** — 항목·라우트(`/quest/<id>`)·튜토리얼 콘텐츠는 그대로. 선생님은 URL 로 직접 열어 고칠 수 있음.

## ✅ 2026-08-18 갱신 — 7개 고쳐서 다시 켬 (병렬 검증)
Python 정확성 검증 + 깨진 C++ 를 진짜 C++ 로 교체 (컴파일·샘플 대조) → `broken:true` 해제:
`mcc15equation`(C++ 이미 정상였음) · `mcc15bahasaf` · `mcc22grammar` · `mcc22maze` · `mcc22birthday` · `mcc22cardshark` · `mcc22lamp`.
> 참고: 이들 App 은 `codeLang="py"` 하드코딩이라 깨진 C++ 는 앱엔 안 보였음(죽은 코드) — 다만 PDF 내보내기엔 나갔음. 이제 PDF C++ 도 정상.

## 아직 숨긴 quest 3개 (= 고쳐야 할 목록)
| id | 제목 | 출처 | 왜 |
|---|---|---|---|
| **mcc19palindrome** | Palindrome | MCC 2019 P6 | **Python 오답** (2026-08-18 검증에서 확인 — 예전 "C++ 스텁"만 문제인 줄 알았는데 py 도 틀림). N/K 입력 순서 뒤바뀜 + 앞자리 0 palindrome 제외 + base-10 정수 출력(정답은 base-k 문자열). 실제 샘플 `7 3`→코드 `3`, 정답 `000`. 재작성 필요. |
| **mcc22aliens** | Aliens | MCC 2022 P2 | Python 알고리즘은 맞지만 **출력 형식 미확정**(문제카드 Y/N vs 코드 YES/NO) + 시뮬 `ALIEN_SCENARIOS` "consistent" 라벨이 실제 모순 시나리오. 공식 형식 확인 + 시뮬 라벨 고친 뒤 켤 것. |
| **subseqmedian** | Subseq Median Sum | MCC 2025 P6 | **Python 오답** (샘플 14인데 21, 증가사슬 안 세고 중복카운트). C++ placeholder. P6(매우 어려움)라 검증된 풀이 필요. 숨김: 2026-07-22 |

## 고쳐서 다시 켜는 법
1. 해당 `quest-problems/<id>/components.jsx` 의 C++ 풀이(`*_CPP` 상수)를 **제대로 작성** (배운 문법만, 람다 helper 금지).
2. **MCC 채점기로 검증** (선생님).
3. `components.jsx` 헤더에 검증 결과 기록.
4. `app/quest/page.tsx` 에서 해당 항목의 `broken: true` **제거** → 학생 목록에 다시 등장.
5. 이 문서에서 해당 줄 삭제.

## 다시 찾는 법 (grep)
```bash
grep -rn "// TODO: type args" quest-problems/*/components.jsx   # 깨진 스텁
grep -n  "broken: true" app/quest/page.tsx                     # 숨긴 목록
```
