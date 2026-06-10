# 흐름 재정렬 + Python 동등화 + 적응형 평가 — 실행 스펙 (2026-06-10)

사용자 결정:
- **대회로 바로 X.** 수업 → 연습 많이 → **최소 알고리즘(스택/큐까지)** → 대회.
- 모든 알고리즘이 대회 선수조건 ❌ (Bronze는 구현 위주). 알고리즘은 필요할 때/Silver+.
- **Python 전용 학생도 동등하게** (지금 코딩뱅크·메인트랙 배너가 C++ 전용).
- **평가 가능?** → solved·starred·attempts 가 DB(`api/practice/progress`)에 이미 저장 → 적응형 가능.
- "USACO 80%" = 검증 안 된 내부 추정치 → 제거 완료.

## Phase A — 흐름 게이트 (smart-next)
현재: cpp-16 → 코딩뱅크(5) → 알고리즘 **8토픽** → 대회.
변경: 코딩뱅크(5) → 알고리즘 **Wave 1 기초(6토픽: 정렬·배열·스택큐·해시·누적합·문자열) 완료** → 대회.
- Wave 1 = Bronze 기초(스택/큐 포함). 8토픽(Silver 일부 포함)보다 **낮춤 = loosening = 기존 학생 영향 0**.
- Wave 2/3(graph/dp 등)은 "필요할 때/Silver+" — 강제 추천 X.
- 커리큘럼 4단계 박스의 "알고리즘 8개" 스테일 문구도 정리.

## Phase B — Python 동등화
- cpp의 "메인 트랙 → 코딩뱅크" 배너 = C++ 전용 → **Python 트랙용 동등 배너** 추가 (Python 레슨 다 들으면 "연습 많이 → 대회" 안내).
- 도전 문제는 이미 양언어(pySolutionCode) → Python 학생은 같은 KL/연습/algo-contest 문제를 Python으로. 코딩뱅크(C++ STL) 대신 **KL/연습 클러스터**를 Python "도전"으로 안내.

## Phase C — 적응형 평가 v1
- 데이터: solved·starred(힌트0·정답안봄·스캐폴드0)·attempts (DB).
- v1: 연습 **세트 완료(round_complete) 화면**에서 그 라운드 성적으로 추천:
  - 대부분 starred → "이해했네 — 다음 단계로! (건너뛰기 OK)"
  - 여러 개 막힘(낮은 pass / 높은 attempts) → "한 세트 더 / 더 쉬운 것 / 이 개념 복습"
- 추가 위험 낮게: round-complete 화면에 추천 카드만 (강제 잠금 X, 소프트).

## 검증/배포
각 Phase: tsc + next build. dev 커밋. 배포는 사용자 검토 후.
