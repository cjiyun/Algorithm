from collections import deque

def solution(maps):
    n, m = len(maps), len(maps[0])
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    
    q = deque()
    q.append((0, 0))
    
    while q:
        x, y = q.popleft()
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            if not (0 <= nx < n and 0 <= ny < m) or maps[nx][ny] == 0:
                continue
            
            if maps[nx][ny] == 1:
                maps[nx][ny] = maps[x][y] + 1
                q.append((nx, ny))
    
    return maps[n - 1][m - 1] if maps[n - 1][m - 1] != 1 else -1