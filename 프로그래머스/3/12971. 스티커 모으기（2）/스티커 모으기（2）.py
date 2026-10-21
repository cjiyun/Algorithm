def solution(sticker):
    if len(sticker) == 1:
        return sticker[0]
    
    def dp(arr):
        prev1, prev2 = 0, 0

        for s in arr:
            cur = max(prev1, prev2 + s)
            prev2 = prev1
            prev1 = cur

        return prev1
    
    return max(dp(sticker[:-1]), dp(sticker[1:]))