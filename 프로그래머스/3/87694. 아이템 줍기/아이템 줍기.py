from collections import deque

def solution(rectangle, characterX, characterY, itemX, itemY):
    N = 102
    board = [[0] * N for _ in range(N)]
    
    for x1, y1, x2, y2 in rectangle:
        x1, y1, x2, y2 = x1 * 2, y1 * 2, x2 * 2, y2 * 2
        
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if x1 < x < x2 and y1 < y < y2: board[x][y] = -1
                elif not board[x][y]: board[x][y] = 1
    
    sx, sy = characterX * 2, characterY * 2
    tx, ty = itemX * 2, itemY * 2
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    q = deque([(sx, sy, 0)])
    visited = [[False] * N for _ in range(N)]
    visited[sx][sy] = True
    
    while q:
        x, y, d = q.popleft()
        if x == tx and y == ty: return d // 2
        
        for dx, dy in moves:
            nx, ny = x + dx, y + dy
            
            if not (0 <= nx < N and 0 <= ny < N) or visited[nx][ny] or board[nx][ny] != 1: continue
            
            visited[nx][ny] = True
            q.append((nx, ny, d + 1))