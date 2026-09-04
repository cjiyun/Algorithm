from collections import deque

def solution(maps):
    n, m = len(maps), len(maps[0])
    
    if all(l == 'X' * m for l in maps):
        return [-1]
    
    visited = [[False] * m for _ in range(n)]
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    ans = []
    
    def bfs(sr, sc):
        q = deque([(sr, sc)])
        visited[sr][sc] = True
        cnt = int(maps[sr][sc])
        
        while q:
            r, c = q.pop()
            for dr, dc in moves:
                nr, nc = r + dr, c + dc
                
                if not (0 <= nr < n and 0 <= nc < m) or maps[nr][nc] == 'X' or visited[nr][nc]:
                    continue
                
                q.append((nr, nc))
                visited[nr][nc] = True
                cnt += int(maps[nr][nc])
            
        return cnt
    
    for i in range(n):
        for j in range(m):
            if maps[i][j] == 'X' or visited[i][j]:
                continue
            print(i, j)
            ans.append(bfs(i, j))
    
    return sorted(ans)