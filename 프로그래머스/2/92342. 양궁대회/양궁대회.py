def solution(n, info):
    ans = [0] * 11
    result = 0
    
    def score(r):
        diff = 0
        
        for i in range(11):
            if not r[i] and not info[i]:
                continue
            
            if r[i] > info[i]:
                diff += 10 - i
            else:
                diff -= 10 - i
        
        return diff
    
    def dfs(i, left, r):
        nonlocal ans, result
        
        if not left:
            diff = score(r)
            if diff > result:
                result = diff
                ans = r[:]
            
            return
        
        if i < 0:
            return
        
        for l in range(left, -1, -1):
            r[i] = l
            dfs(i - 1, left - l, r)
            r[i] = 0
    
    dfs(10, n, ans[:])
    
    return ans if result > 0 else [-1]