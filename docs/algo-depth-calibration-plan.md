# 알고리즘 토픽 깊이 보정 — 실행 플랜 (2026-06-10, 자율 실행)

원칙(사용자): **이미 아는 것(문법·연습 끝낸 학생)은 재탕 금지, 새 개념은 깊게.** 흐름 문법 → 연습 → 알고리즘.

읽기전용 병렬 감사(11토픽) 결과 기반. Edit만·구조 보존·빌드 게이트.

## 🔴 손볼 곳 (병렬 에이전트)
| 토픽 | 작업 |
|---|---|
| sorting | 사용법 재탕(Ch2·Ch4) 압축 + 정렬 원리(분할정복·logN·안정정렬·정렬후 활용) 보강 + 완료화면 문제버튼 |
| dp | 재귀 폭발 체감 + 메모이제이션 코드 + knapsack 칸 손계산 + 점화식 빈칸 능동스텝 |
| greedy | 교환논증(adjacent swap) 추가 (Ch2·Ch4) + Ch5 Quest 링크 |
| binarysearch | Ch2 '없는 값' 시뮬·`<=`경계 + Ch3 반열린 구간 직관·lower_bound 직접구현 |
| array | Ch1 예고 ↔ 본문 정합성 + Ch5 요약 교체(두포인터/윈도우/Kadane) + Ch1 step1 압축 |
| (good pages 소보강) | stackqueue 완료버튼 · graph 안심박스+visited직관 · hashtable Ch5 링크 |

## 🟢 이미 좋음 (모델, 손 안 댐)
prefixsum · recursion · 대체로 graph/hashtable/stackqueue

## 검증 & 배포
- tsc --noEmit + npm run build. 깨진 파일은 git checkout 되돌리고 기록.
- dev 커밋 + push dev. **배포(main)는 사용자 검토 후.**
