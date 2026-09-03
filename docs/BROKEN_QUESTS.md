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

## ✅ 2026-09-03 갱신 — 숨긴 quest 0개. 대신 다른 게 나왔음

`app/quest/page.tsx` 에 `broken: true` 가 **하나도 없습니다.** 즉 이 문서가 "숨김" 이라고
적어둔 3개(`mcc19palindrome` · `mcc22aliens` · `subseqmedian`)는 이미 학생에게 라이브였고,
문서와 코드가 어긋나 있었습니다. 세 개를 다시 검증한 결과:

| id | 이전 기록 | 실제 (2026-09-03 검증) |
|---|---|---|
| `subseqmedian` | Python 오답 (샘플 14인데 21) | **이미 고쳐져 있음.** 공식 샘플 14 통과 + 브루트포스 200건 불일치 0 |
| `mcc19palindrome` | Python 오답 (입력 순서·앞자리 0·base) | **알고리즘은 맞음** (k=2..7 × n=1..120 = 720건 불일치 0). 입력 순서만 `k n` 이라 공식(`n k`)과 달라서 이번에 맞춤 |
| `mcc22aliens` | 출력 형식 미확정 + 시뮬 라벨 오류 | **둘 다 이미 해소.** 대신 **문제 설명이 틀려 있었음** — 아래 참고 |

### mcc22aliens — 코드는 무죄, 설명이 유죄였음
공식 PDF(`public/problems/mcc22aliens.pdf`) 기준:
> i 번 외계인이 **"p_i 번은 b_i 타입이야"** 라고 말한다. 순열 `p` 는 **누가 누구를 지목했는지**이고, 잃어버린 건 그것.

그런데 quest 카드는 **"주장 b 를 외계인들에게 어떤 순서로든 나눠줄 수 있다"** 고 적혀 있었습니다.
b 는 말한 사람에게 고정인데 재배분된다고 설명한 것 — **답이 달라지는 다른 문제**입니다
(n ≤ 5 전수에서 222 케이스가 갈림, 예: `a=TTF, b=FFT` → 공식 NO, 카드 문구대로면 YES).
`FULL_PY`·`FULL_CPP`·시뮬 계산은 공식 문제를 정확히 풉니다 (전수 5,960건 불일치 0).
설명 문구 7곳을 '지목' 기준으로 고쳤습니다.

## 전 quest C++ 전수 컴파일 검사 (2026-09-03 신설)
`FULL_CPP` 가 있는 quest 138개를 전부 `g++ -std=c++17` 로 컴파일해 보는 검사를 돌렸습니다.
9개가 깨진 자동번역 스텁이었고 전부 재작성했습니다 — 자세한 건 커밋 `8056c5c9`.
**특히 `mco15*` 5개는 section 이 "MCO" 라 C++ 토글이 학생에게 보입니다** (MCC 만 숨김).
다음에도 같은 검사를 먼저 돌릴 것.

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
