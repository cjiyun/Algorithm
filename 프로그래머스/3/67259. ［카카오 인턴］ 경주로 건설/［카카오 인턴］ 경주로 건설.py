import heapq

def solution(board):
    n = len(board)
    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    
    dist = [[[float('inf')] * 4 for _ in range(n)] for _ in range(n)]
    pq = []
    
    for d, (dr, dc) in enumerate(directions):
        nr, nc = dr, dc
        
        if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == 0:
            dist[nr][nc][d] = 100
            heapq.heappush(pq, (100, nr, nc, d))
    
    while pq:
        cost, r, c, prev_dir = heapq.heappop(pq)
        
        if cost > dist[r][c][prev_dir]:
            continue
        
        for nxt_dir, (dr, dc) in enumerate(directions):
            nr, nc = r + dr, c + dc
            
            if not (0 <= nr < n and 0 <= nc < n) or board[nr][nc] == 1:
                continue
            
            nxt_cost = cost + 100
            
            if prev_dir // 2 != nxt_dir // 2:
                nxt_cost += 500
            
            if nxt_cost >= dist[nr][nc][nxt_dir]:
                continue
            
            dist[nr][nc][nxt_dir] = nxt_cost
            heapq.heappush(pq, (nxt_cost, nr, nc, nxt_dir))
    
    return min(dist[n - 1][n - 1])