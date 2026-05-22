from collections import defaultdict

T = int(input())

for tc in range(1, T + 1):
    str1 = set(input())
    str2 = input()

    cnt = defaultdict(int)

    for ch in str2:
        if ch in str1:
            cnt[ch] += 1

    print(f'#{tc} {max(cnt.values())}')
