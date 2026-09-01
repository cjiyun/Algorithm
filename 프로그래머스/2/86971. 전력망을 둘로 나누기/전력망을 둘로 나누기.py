from collections import deque

def solution(n, wires):
    ans = n
    
    for cut_a, cut_b in wires:
        graph = [[] for _ in range(n + 1)]
        
        for a, b in wires:
            if a == cut_a and b == cut_b:
                continue
            
            graph[a].append(b)
            graph[b].append(a)
        
        q = deque([1])
        visited = [False] * (n + 1)
        visited[1] = True
        cnt = 1
        
        while q:
            cur = q.popleft()
            
            for next in graph[cur]:
                if visited[next]:
                    continue
                
                visited[next] = True
                q.append(next)
                cnt += 1
        
        other = n - cnt
        ans = min(ans, abs(other - cnt))
    
    return ans