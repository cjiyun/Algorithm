def solution(k, dungeons):
    n = len(dungeons)
    visited = [False] * n
    ans = 0
    
    def dfs(cur, cnt):
        nonlocal ans
        ans = max(ans, cnt)
        
        for i, (req, cost) in enumerate(dungeons):
            if visited[i] or cur < req: continue
            
            visited[i] = True
            dfs(cur - cost, cnt + 1)
            visited[i] = False
    
    dfs(k, 0)
    
    return ans