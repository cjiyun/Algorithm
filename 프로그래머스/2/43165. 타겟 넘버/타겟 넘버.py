def solution(numbers, target):
    cnt = 0
    
    def dfs(t, i):
        nonlocal cnt
        
        if i == len(numbers):
            if t == target:
                cnt += 1
            return
        
        dfs(t + numbers[i], i + 1)
        dfs(t - numbers[i], i + 1)
    
    dfs(0, 0)
    
    return cnt