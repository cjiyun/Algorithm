from collections import Counter

T = int(input())

for _ in range(T):
    tc = input()

    grades = Counter(map(int, input().split()))
    max_cnt = max(s for s, c in grades.items() if c == max(grades.values()))

    print(f'#{tc} {max_cnt}')
