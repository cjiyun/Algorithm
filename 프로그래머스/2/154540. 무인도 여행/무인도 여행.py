from collections import deque

def solution(maps):
    maps = [list(row) for row in maps]
    n, m = len(maps), len(maps[0])
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    ans = []
    
    def bfs(sr, sc):
        q = deque([(sr, sc)])
        cnt = int(maps[sr][sc])
        maps[sr][sc] = 'X'
        
        while q:
            r, c = q.popleft()
            for dr, dc in moves:
                nr, nc = r + dr, c + dc
                
                if not (0 <= nr < n and 0 <= nc < m) or maps[nr][nc] == 'X':
                    continue
                
                q.append((nr, nc))
                cnt += int(maps[nr][nc])
                maps[nr][nc] = 'X'
            
        return cnt
    
    for i in range(n):
        for j in range(m):
            if maps[i][j] == 'X':
                continue
            ans.append(bfs(i, j))
    
    return sorted(ans) if ans else [-1]