from collections import Counter

def solution(n, l, r):
    def is_one(x):
        while x > 0:
            if x % 5 == 2:
                return 0
            x //= 5
        return 1
    
    ans = 0
    
    for i in range(l - 1, r):
        ans += is_one(i)
    
    return ans