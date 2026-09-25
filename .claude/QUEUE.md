# 🔁 지금 도는 큐 — **비울 때까지 안 멈춘다**

> ## 🎯 목표는 하나다 — **모든 USACO 와 MCC**
> 선생님(2026-09-25): ***"우리의 목표는 모든 USACO와 MCC라니까"***
>
> **그래서 큐의 단위는 「WORK.md 항목」이 아니라 「quest」다.**
> 그날 내가 큐를 「오늘 PM 판정 10줄」로 만들어 놓고 **「다 끝났다」고 보고했다.**
> 실제로는 WORK.md 에 39개가 열려 있었고, **더 중요하게는 quest 170개가 목표였다.**
> **단위를 틀리면 「비었다」가 거짓이 된다.**

> **왜 이 파일이 생겼나.** 선생님이 하루에 **여섯 번** 물으셨다 —
> *"왜 자꾸 멈추지?"* · *"야 묻지 말라고"* · *"계획을 안세워서 그래?"* ·
> *"지금도 멈췄는데"* · *"진행해.라는말은 너가 결정해야하는건데"* · *"다 끝났나?"*
>
> **계획이 없어서가 아니었다.** PM 이 전체 계획을 한 번에 줬는데도 멈췄다. 원인 여섯:
> ① 보고를 「턴의 마지막 행동」으로 취급 ② 판정 항목마다 체크포인트
> ③ 「승인 대기」를 전면 정지로 씀 ④ 매 턴 재유추
> ⑤ **PM 은 편집 도구가 없어 턴이 늘 「판정 끝→되돌림」** (PM 이 짚음)
> ⑥ ⭐ **큐의 단위가 틀렸다** — 그래서 「비었다」가 거짓이었다
>
> **턴을 끝내기 전에 `python3 scripts/check-work-queue.py`.**
> 상태는 셋뿐 — `READY` · `BLOCKED(사유)` · `DONE`.
> **「검토자 답 대기」는 BLOCKED 가 아니다.** 기다리는 동안 다른 READY 를 돌린다.

---

## 🎯 목표 대비 현황 — **USACO 122 + MCC 48 = 170** (2026-09-25 실측)

| 잣대 | 남은 quest | 비고 |
|---|---|---|
| **입출력 형식 카드가 없다** | **69** (전부 USACO) | 검사기는 75 라 하는데 **손으로 세니 6개가 오탐**. `favperm2` 는 **`permutation` 폴더 챕터를 통째로 재사용**해서 이미 카드가 있다 — 검사기가 **자기 폴더만 봐서** 못 봤다(그 유형은 이 하나뿐, 전수 확인) |
| **CodeWalk 가 아니다** | **135** (USACO 99 · MCC 31) | 선생님(2026-07-14) *"앞으로 코드는 모두 이런식으로"* |
| **난이도가 추정치** | **117** (USACO 112 · MCO 5) | 화면이 감사값과 **같은 뱃지**로 보여준다 |
| MCC 난이도 | **48/48 감사값** | 이 축은 MCC 에서 끝났다 |

⚠️ **숫자를 그대로 믿지 마라** — 위 오탐 6개가 그 사례다. **묶음 시작 전에 표본을 손으로 세라.**

### ⭐ 세 축이 거의 겹친다 — 그래서 단위가 갈린다
**세 축 교집합 = 69개**(입출력이 빠진 건 전부 나머지 둘에도 걸린다).
→ **그 69개는 quest 단위로 한 번에 셋 다.** 남는 CodeWalk 만 66개 · 난이도만 48개는 **축 단위.**
판정 셋(`pedagogy`·`ux`·`quest-auditor`)이 **서로 안 보고 같은 결론**에 닿았다.

---

## 🔴 READY — 입출력 축, **대회(형제) 단위 11배치**

⚠️ **파일 크기 순으로 묶었다가 다시 짰다.** 화면 담당 판정 —
*"병렬 에이전트가 서로 다른 quest 를 동시에 하면 「형제를 먼저 열어 본다」가 **레이스 컨디션**이 된다.
먼저 손댄 사람의 즉흥적 모양이 곧 「형제」가 되어 버린다."*
→ **대회를 안 쪼갠다. 그리고 참조 템플릿을 하나로 고정한다.**

### 📐 참조 템플릿 — **`photoshoot25`** (`chapters.jsx:80-118`)
    INPUT       amber #fffbeb / #fde68a — 필드마다 한 줄, 오른쪽에 회색 설명
                반복되는 줄은 「↑ 이 줄이 Q 번 반복」
    OUTPUT      green #ecfdf5 / #6ee7b7 — 무엇을 몇 줄 출력하는지 한 문단
    CONSTRAINTS white + border — 「1 ≤ N ≤ 500」 식으로 한 줄씩, monospace
같은 표준 형제: `buymilk` · `makedistinct` · `swaptowin` · `mooin4` · `strangefn`.
⛔ **`checkups` 를 따라 쓰지 마라 — 더 오래된 변형이다.** 내가 처음에 그걸 지정했다가 정정했다.

| 배치 | 대회 | quest | 상태 |
|---|---|---|---|
| 1 | Jan 2022 / Dec 2022 / Feb 2021 / Feb 2018 / Jan 2018 | walkhome countliars abcs outofplace bovshuffle | READY 도는중 |
| 2 | Dec 2017 Bronze | bovgenomics crossroad1 modernart | READY 도는중 |
| 3 | Dec 2019 Bronze | cowevolution milkfactory sleepyherd | READY 도는중 |
| 4 | Dec 2020 Bronze | cowntrace socialdist2 triangles | READY 도는중 |
| 5 | Feb 2018 Bronze | billboard lifeguards | READY 도는중 |
| 6 | Feb 2019 Bronze | guessanimal mixmilk sleepysort | READY |
| 7 | Feb 2020 Bronze | cowgym photoshoot20 race | READY |
| 8 | Jan 2020 Bronze | bucketbrigade livestock whereami | READY |
| 9 | Jan 2021 Bronze | daisychains socialdist1 stuckinrut | READY |
| 10 | Open 2017 / Open 2018 | crossroad2 crossroad3 dontbelast billboard2 hoofball tameherd | READY |
| 11 | Open 2019 / Open 2021 / Open 2023 | meastraffic revegetation shellgame clockfence comfycows uddered leaders mooloo stampgrid | READY |
| 12 | 나머지 2개짜리 대회 | familytree teleport acowdemia3 yearcow sleepclass hungrycow moolang cowtipping sqpasture stalling cowcollege mooops blockgame cowsignal milkmeas bucketlist teamttt aircond1 feedcows photoshoot madscientist swapity herdle photoshoot2 nontrans cowntact | READY |

### ⚠️ 배치마다 반드시
1. **참조는 `photoshoot25` 하나** — 형제 보고 따라 하지 마라(레이스).
2. **원문이 출처** — `pdftotext -layout public/problems/<id>.pdf`. **제약을 지어내지 마라.**
   `countliars` 는 제약이 **코드 주석에만** 있었다 — 주석에서 베끼지 말고 원문으로.
3. **숫자는 직접 돌려 확인** — 샘플을 쓰면 그 입력으로 **코드를 실제 실행**해 대조.
4. **분량 전후 재기** — `see-flow.mjs`.
5. ⭐ **위젯 개수 전후 대조** — `rounding` 사고(2236→184줄)의 **실제 증거는 커스텀 위젯이
   사라진 것**이었다. `grep -oE "[A-Z][A-Za-z]*(Sim|Runner|View)" quest-problems/<id>/*.jsx | sort -u`.
   **줄 수만 보면 못 잡는다.**
6. 실측 소요: quest 당 **PDF 5~10분 + 카드 10~15분.**

## 🟡 BLOCKED

| 무엇 | 사유 |
|---|---|
| **동결 7개의 CodeWalk 축** | BLOCKED — 감사: 입출력·난이도는 **이미 다 통과**, **CodeWalk 에서만 막힌다.** 그게 `rounding` 사고와 **같은 범주**(커스텀 위젯 `BruteRunner`·`Cube3D`·`CheeseSim2`…)라 선생님/PM 판정 필요 |
| `readyQuests()` 기본값 뒤집기 (140+) | BLOCKED (제품 방향 — 선생님 몫) |
| Vercel `[ignore]` 로그 | BLOCKED (계정 — 대시보드는 선생님만) |
| `mooin3` 분량·밀도 | BLOCKED (재배열 — 선생님 몫) |

## 🔵 다음 축 — 입출력이 끝나면
- **CodeWalk 66개**(교집합 밖) — ⚠️ **축 단위로 가되 사람이 먼저 훑어 「커스텀 위젯 있는 quest」를 빼라.**
  감사: *"기계가 「커스텀 위젯 있음」을 자동 판별 못 하므로 이 단계는 사람 개입이 필요하다."*
- **난이도 48개**(교집합 밖) — 축 단위 OK(메타데이터라 자산 손실 경로 없음).
  ⚠️ **감사값과 추정치를 구별되게** 저장해라 — 「안 매긴 값이 매긴 값처럼 보이는」 게 원래 문제다.

### 배포
오늘(09-25) 몫은 **이미 썼다**(`f09e71de..c0a524a9`, 32개). 쌓인 건 내일 창에 한 번에.
민 직후 스모크 = `curl -sI` + `see-screen.mjs` **라이브 URL**.
