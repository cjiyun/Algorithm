def solution(money):
    def rob(l):
        prev2 = 0
        prev1 = 0

        for m in l:
            cur = max(prev1, prev2 + m)
            prev2 = prev1
            prev1 = cur
        
        return prev1
    
    return max(rob(money[:-1]), rob(money[1:]))