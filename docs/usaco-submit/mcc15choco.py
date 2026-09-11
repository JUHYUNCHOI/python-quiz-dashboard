N = int(input())
bars = list(map(int, input().split()))

stack = []      # 아직 짝을 못 찾은 바들
total = 0       # 지금까지 가져간 초콜릿 길이

for bar in bars:
    if stack and stack[-1] == bar:
        # 맨 위 바와 길이가 같아요 → 둘을 가져가요
        total += 2 * bar
        stack.pop()
    else:
        stack.append(bar)

print(total)
