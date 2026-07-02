from collections import deque

def solution(m, n, h, w, drops):
    time = [[len(drops) + 1] * n for _ in range(m)]
    
    for i, (r, c) in enumerate(drops):
        time[r][c] = i + 1
    
    row_min = [[0] * (n - w + 1) for _ in range(m)]
    
    for r in range(m):
        dq = deque()
        
        for c in range(n):
            while dq and time[r][dq[-1]] >= time[r][c]:
                dq.pop()
            
            dq.append(c)
            
            if dq[0] <= c - w:
                dq.popleft()
            
            if c >= w - 1:
                row_min[r][c - w + 1] = time[r][dq[0]]
    
    ans = [0, 0]
    best = -1
    
    for c in range(n - w + 1):
        dq = deque()
        
        for r in range(m):
            while dq and row_min[dq[-1]][c] >= row_min[r][c]:
                dq.pop()
            
            dq.append(r)
            
            if dq[0] <= r - h:
                dq.popleft()
            
            if r >= h - 1:
                top_r = r - h + 1
                top_c = c
                
                val = row_min[dq[0]][c]
                
                if val > best or (val == best and [top_r, top_c] < ans):
                    best = val
                    ans = [top_r, top_c]
    
    return ans