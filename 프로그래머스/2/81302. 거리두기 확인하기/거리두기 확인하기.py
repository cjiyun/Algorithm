from collections import deque

def solution(places):
    def is_distancing(room):
        moves = [(1, 0), (0, 1), (-1, 0), (0, -1)]
        
        def bfs(sr, sc):
            q = deque([(sr, sc, 0)])
            visited = [[False] * 5 for _ in range(5)]
            visited[sr][sc] = True
            
            while q:
                r, c, d = q.popleft()
                
                if d >= 2:
                    continue
                
                for dr, dc in moves:
                    nr, nc = r + dr, c + dc
                    
                    if not (0 <= nr < 5 and 0 <= nc < 5) or visited[nr][nc] or room[nr][nc] == 'X':
                        continue
                    if room[nr][nc] == 'P':
                        return False
                    
                    visited[nr][nc] = True
                    q.append((nr, nc, d + 1))
            
            return True
        
        for r in range(5):
            for c in range(5):
                if room[r][c] != 'P':
                    continue
                if not bfs(r, c):
                    return False
        
        return True
    
    return [1 if is_distancing(p) else 0 for p in places]