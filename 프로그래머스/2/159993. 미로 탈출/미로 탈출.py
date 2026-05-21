from collections import deque

def bfs(maps, start, target):
    n, m = len(maps), len(maps[0])
    visited = [[False] * m for _ in range(n)]
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    q = deque([(start[0], start[1], 0)])
    visited[start[0]][start[1]] = True
    
    while q:
        x, y, d = q.popleft()
        
        if maps[x][y] == target:
            return d
        
        for dx, dy in moves:
            nx, ny = x + dx, y + dy
            
            if not (0 <= nx < n and 0 <= ny < m) or visited[nx][ny] or maps[nx][ny] == 'X': continue
            
            visited[nx][ny] = True
            q.append((nx, ny, d + 1))
    
    return -1

def solution(maps):
    start, lever = None, None
    
    for i in range(len(maps)):
        for j in range(len(maps[0])):
            if maps[i][j] == 'S': start = (i, j)
            elif maps[i][j] == 'L': lever = (i, j)
    
    route1 = bfs(maps, start, 'L')
    if route1 == -1: return -1
    
    route2 = bfs(maps, lever, 'E')
    if route2 == -1: return -1
    
    return route1 + route2