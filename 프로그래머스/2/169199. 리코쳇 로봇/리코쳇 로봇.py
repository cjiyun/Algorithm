from collections import deque

def solution(board):
    n, m = len(board), len(board[0])
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    sx, sy = 0, 0
    
    for i in range(n):
        for j, v in enumerate(board[i]):
            if v == 'R':
                sx, sy = i, j
                break
        else: continue
        break
    
    q = deque([(sx, sy, 0)])
    visited = [[False] * m for _ in range(n)]
    visited[sx][sy] = True
    
    while q:
        x, y, d = q.popleft()
        if board[x][y] == 'G': return d
        
        for dx, dy in moves:
            nx, ny = x, y
            
            while True:
                temp_x = nx + dx
                temp_y = ny + dy
            
                if not (0 <= temp_x < n and 0 <= temp_y < m) or board[temp_x][temp_y] == 'D': break
                
                nx, ny = temp_x, temp_y
            
            if visited[nx][ny]: continue
            
            visited[nx][ny] = True
            q.append((nx, ny, d + 1))
    
    return -1