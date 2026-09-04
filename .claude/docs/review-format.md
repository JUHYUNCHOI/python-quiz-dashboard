# 복습 파일 작성 형식

> **언제 여나:** app/review/**/lesson*.ts 를 쓰거나 고칠 때. answer 필드를 잘못 쓰면 학생이 맞는 답을 넣어도 오답 처리된다
> 원래 `CLAUDE.md` 안에 있던 내용을 2026-09-04 에 옮겼다. 내용은 그대로다.

---

## ⚠️ 복습 레슨 파일 작성 규칙 — practice/interleaving answer 필드

`app/review/[lessonId]/data/lessons/` 파일에서 practice/interleaving 스텝 작성 시 **반드시** 다음 규칙을 지켜야 한다.

### isAnswerCorrect() 동작 방식
```
// 학생이 빈칸에 입력한 텍스트 vs content.answer 비교
normalize(content.answer) === normalize(student_input)
// blanksAnswer는 length > 1 일 때만 join하여 비교 (단일 항목은 사용 안 됨!)
```

### ✅ 올바른 패턴

**단일 빈칸 (template에 ___ 1개):**
```typescript
template: "for (int i = 1; i <= 10; i++) {\n    sum ___ i;\n}",
answer: "+=",           // ← 빈칸에 들어갈 텍스트만!
expect: "55",           // ← 정답 후 보여줄 출력/코드 (비교에 사용 안 됨)
```

**복수 빈칸 (template에 ___ 2개 이상):**
```typescript
template: "for (int i = ___; i <= ___; i++)",
blanksAnswer: ["1", "5"],                    // ← 각 빈칸 값
answer: "for (int i = 1; i <= 5; i++)",     // ← 전체 코드 (blanksAnswer join으로 비교됨)
expect: "1\n2\n3\n4\n5",
```

**전체 코드 작성 (template: null):**
```typescript
template: null,
answer: "int n, sum = 0;\ncin >> n;\nfor...",  // ← 전체 코드 (직접 비교)
alternateAnswers: ["int n;\ncin>>n;..."],
expect: "15",
```

### ❌ 절대 하면 안 되는 패턴 (54개 버그의 원인)
```typescript
// 단일 빈칸인데 answer가 전체 코드 → 학생이 올바른 답 입력해도 오답 처리됨!
template: "sum ___ i;",
blanksAnswer: ["+="],    // 단일 항목 → 비교에 사용 안 됨
answer: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum += i;\n}\ncout << sum << endl;",  // ← 버그!
```

### 검증 명령어
```bash
npm run check-review    # answer 필드 구조 버그 (빈칸 개수 ↔ answer 형태)
npm run check-outputs   # 화면에 적힌 출력 ↔ 실제 실행 결과 대조
```

레슨/복습 파일 수정·추가 후 **반드시 둘 다 실행할 것.**

`check-outputs` 는 `data/lesson*.ts` + `data/lessons/lessonNN/ch*.ts`(챕터별로 쪼개진
레슨 27~52 서브폴더 포함) 와 `app/review/.../lesson*.ts` 의 정답 코드를
전부 실제로 python3 로 돌려서, `expect` / `result` / `expectedOutput` 과 글자 단위로
비교한다 (**827개 실행**: 복습 647 + 수업 180. 2026-09-04 실측 — 레슨 파일 구조가
또 바뀌면 이 숫자도 달라진다).

⚠️ **지금 clean 하지 않다.** 2026-09-04 기준 **12개가 고정 실패** 중이다
(lesson36 · 39 · 40 · 45 와 en 파일들 — 파일 I/O, random seed, 정렬 출력).
게다가 검사기 자신이 `PYTHONHASHSEED` 를 안 고정해서 lesson21 · 26 두 개는
돌릴 때마다 나타났다 사라진다 — **검사기가 잡으라는 버그를 검사기가 갖고 있다.**
"실행했더니 통과" 라고 보고하기 전에 이 12개를 뺀 건지 확인해라. 눈으로는 못 잡는 것들을 잡는다:

- **집합·딕셔너리를 그냥 `print` 하면 순서가 매번 달라진다** (문자열 해시 랜덤화).
  한 번 돌려본 순서를 정답으로 박아두면 학생 화면과 늘 어긋난다 → `sorted()` 로 감쌀 것.
- **`random` 을 seed 없이 쓰거나, seed 값의 실제 결과를 확인 안 하고 적은 경우.**
- **오늘 날짜(`date.today()`)에 의존하는 출력** — 날마다 답이 달라져 영원히 안 맞는다.
- **아무도 만들지 않는 파일을 읽는 문제** — 학생은 무조건 FileNotFoundError.
- save→load 처럼 여러 줄이 나오는데 한 줄만 적어둔 `expect`.

한 레슨의 스텝들은 **같은 임시 폴더에서 순서대로** 실행한다 — 학생 실행기가
Pyodide 인스턴스를 재사용해 가상 파일시스템이 유지되는 동작을 흉내낸 것.

---
