from collections import deque

def solution(n, computers):
    net = 0
    visited = [False] * n

    def bfs(s):
        q = deque([s])
        visited[s] = True
        
        while q:
            cur = q.popleft()

            for i, connect in enumerate(computers[cur]):
                if visited[i] or not connect: continue
                
                visited[i] = True
                q.append(i)
    
    for i in range(n):
        if visited[i]: continue
        
        bfs(i)
        net += 1
    
    return net