with open('breedflip.in', 'r') as file:
    lines = file.readlines()
N = int(lines[0])
A = lines[1].strip()
B = lines[2].strip()
flips = 0
in_diff = False
for i in range(N):
    if A[i] != B[i]:
        if not in_diff:
            flips += 1
            in_diff = True
    else:
        in_diff = False
with open('breedflip.out', 'w') as file:
    file.write(str(flips) + '\n')
