from collections import Counter

T = int(input())
order = ['ZRO', 'ONE', 'TWO', 'THR', 'FOR', 'FIV', 'SIX', 'SVN', 'EGT', 'NIN']

for _ in range(T):
    tc, _ = input().split()
    nums = input().split()
    cnt = Counter(nums)
    
    ans = []

    for num in order:
        ans.extend([num] * cnt[num])

    print(tc)
    print(*ans)
