from collections import deque

def solution(board):
    n, m = len(board), len(board[0])
    moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    rx, ry = 0, 0
    
    for i, row in enumerate(board):
        if 'R' in row:
            rx, ry = i, row.index('R')
            break
    
    q = deque([(rx, ry, 0)])
    visited = [[False] * m for _ in range(n)]
    visited[rx][ry] = True
    
    while q:
        x, y, cnt = q.popleft()
        if board[x][y] == 'G':
            return cnt
        
        for dx, dy in moves:
            nx, ny = x, y
            
            while True:
                tx, ty = nx + dx, ny + dy
                
                if not (0 <= tx < n and 0 <= ty < m) or board[tx][ty] == 'D':
                    break
                
                nx, ny = tx, ty
            
            if visited[nx][ny]:
                continue
            
            visited[nx][ny] = True
            q.append((nx, ny, cnt + 1))
    
    return -1