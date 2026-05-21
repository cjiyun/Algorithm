from collections import deque

def solution(land):
    n, m = len(land), len(land[0])
    visited = [[False] * m for _ in range(n)]
    oil_col = [0] * m
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    def bfs(sr, sc):
        q = deque([(sr, sc)])
        visited[sr][sc] = True
        
        size = 1
        cols = {sc}
        
        while q:
            r, c = q.popleft()
            
            for dr, dc in moves:
                nr, nc = r + dr, c + dc
                
                if not (0 <= nr < n and 0 <= nc < m) or visited[nr][nc] or not land[nr][nc]: continue
                
                visited[nr][nc] = True
                q.append((nr, nc))
                
                size += 1
                cols.add(nc)
        return size, cols
    
    for r in range(n):
        for c in range(m):
            if visited[r][c] or not land[r][c]: continue
            
            size, cols = bfs(r, c)
            
            for col in cols:
                oil_col[col] += size
    
    return max(oil_col)