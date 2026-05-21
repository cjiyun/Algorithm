import sys
sys.setrecursionlimit(10**6)

def solution(tickets):
    n = len(tickets)
    tickets.sort()
    visited = [False] * n
    ans = []
    
    def dfs(route):
        nonlocal ans
        
        if len(route) == n + 1:
            ans = route[:]
            return True
        
        cur = route[-1]
        
        for i in range(n):
            start, end = tickets[i]
            
            if visited[i] or start != cur: continue
            
            visited[i] = True
            route.append(end)
            
            if dfs(route): return True
            
            route.pop()
            visited[i] = False
        
        return False
    
    dfs(['ICN'])
    
    return ans