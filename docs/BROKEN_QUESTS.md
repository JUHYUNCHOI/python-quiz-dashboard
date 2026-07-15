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

## 숨긴 quest 9개 (= 고쳐야 할 목록)
| id | 제목 | 출처 |
|---|---|---|
| mcc15equation | Complete the Equation | MCC 2015 P2 |
| mcc15bahasaf | Bahasa F | MCC 2015 P3 |
| mcc19palindrome | Palindrome | MCC 2019 P6 |
| mcc22grammar | Grammar | MCC 2022 P1 |
| mcc22aliens | Aliens | MCC 2022 P2 |
| mcc22maze | Maze | MCC 2022 P3 |
| mcc22birthday | Cats' Birthday | MCC 2022 P4 |
| mcc22cardshark | Card Shark | MCC 2022 P5 |
| mcc22lamp | Lamp | MCC 2022 P6 |

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
