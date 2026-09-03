def solution(info, edges):
    graph = [[] for _ in range(len(info))]
    for p, c in edges:
        graph[p].append(c)
    
    ans = 0
    
    def dfs(n, s, w, candi):
        nonlocal ans
        
        if info[n]:
            w += 1
        else:
            s += 1
        
        if w >= s:
            return
        
        ans = max(ans, s)
        
        next_candi = candi[:]
        next_candi.extend(graph[n])
        
        for next_n in next_candi:
            new_candi = next_candi[:]
            new_candi.remove(next_n)
            dfs(next_n, s, w, new_candi)
    
    dfs(0, 0, 0, [])
    
    return ans