# USACO 2025 US Open Bronze #3 — It's Mooin' Time III
# 선생님 제출 통과 버전 (usaco.org 공식 답안 기반). 로컬 브루트 대비 4000/4000 정확성 검증.
#
# 알고리즘: 반복 문자 t2 를 고정.  k = [ql,qr] 안 t2 의 가장 오른쪽,  i = ql 이후
#   t2 아닌 가장 왼쪽.  f(j)=(k-j)(j-i) 는 아래볼록 포물선 → 꼭대기 (i+k)//2 근처
#   t2 위치 2 개만 검사.  left/right 표로 "임의 위치의 최근 t2" 를 O(1) 조회 → 쿼리당 O(26).
#
# ⚠️ quest 코드(M3_FAST_PY)는 아직 bisect 변형.  이 파일이 confirmed-passing 기준.

n, q = map(int, input().split())
S = input()

left = [[-1] * 26 for _ in range(n)]           # left[i][c]  = ≤ i 중 문자 c 의 가장 오른쪽 위치 (없으면 -1)
right = [[n] * 26 for _ in range(n)]            # right[i][c] = ≥ i 중 문자 c 의 가장 왼쪽 위치 (없으면 n)
right_exclude = [[n] * 26 for _ in range(n)]    # right_exclude[i][c] = ≥ i 중 c 가 아닌 가장 왼쪽 위치

for i, c in enumerate(S):
    left[i] = left[i - 1][:] if i else [-1] * 26
    left[i][ord(c) - ord('a')] = i

for i, c in reversed(list(enumerate(S))):
    right[i] = right[i + 1][:] if i + 1 < len(S) else [n] * 26
    right[i][ord(c) - ord('a')] = i

    best, sbest = n, n
    for j in range(26):
        if right[i][j] < best:
            sbest = best
            best = right[i][j]
        elif right[i][j] < sbest:
            sbest = right[i][j]

    for j in range(26):
        right_exclude[i][j] = sbest if right[i][j] == best else best

for _ in range(q):
    ql, qr = map(int, input().split())
    ql -= 1
    qr -= 1

    best = -1

    for t2 in range(26):
        k = left[qr][t2]           # 가장 오른쪽 t2 → k
        i = right_exclude[ql][t2]  # 가장 왼쪽 (t2 아닌) → i

        if i >= k:
            continue

        for j in (left[(i + k) // 2][t2], right[(i + k) // 2][t2]):  # 꼭대기 근처 t2 후보 2 개
            if j > i and j < k:
                best = max(best, (k - j) * (j - i))

    print(best)
