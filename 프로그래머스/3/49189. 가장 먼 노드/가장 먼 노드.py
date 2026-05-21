from collections import deque

def solution(n, edge):
    adj = [[] for _ in range(n + 1)]
    
    for a, b in edge:
        adj[a].append(b)
        adj[b].append(a)

    dist = [-1] * (n + 1)
    dist[1] = 0
    q = deque([1])
    
    while q:
        cur = q.popleft()
        
        for nxt in adj[cur]:
            if dist[nxt] != -1: continue
            
            dist[nxt] = dist[cur] + 1
            q.append(nxt)
    
    return dist.count(max(dist))
        