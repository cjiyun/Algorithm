def solution(numbers):
    pos = {
        1: (0, 0), 2: (0, 1), 3: (0, 2),
        4: (1, 0), 5: (1, 1), 6: (1, 2),
        7: (2, 0), 8: (2, 1), 9: (2, 2),
        0: (3, 1)
    }
    
    def move(a, b):
        if a == b:
            return 1
        
        ax, ay = pos[a]
        bx, by = pos[b]
        
        dx = abs(ax - bx)
        dy = abs(ay - by)
        
        diag = min(dx, dy)
        straight = max(dx, dy) - diag
        
        return diag * 3 + straight * 2
    
    dp = {(4, 6): 0}
    
    for tar in map(int, numbers):
        n_dp = {}
        
        for (l, r), cost in dp.items():
            if l == tar:
                state = (l, r)
                n_dp[state] = min(n_dp.get(state, float('inf')), cost + 1)
                continue
        
            if r == tar:
                state = (l, r)
                n_dp[state] = min(n_dp.get(state, float('inf')), cost + 1)
                continue
            
            state = (tar, r)
            n_dp[state] = min(n_dp.get(state, float('inf')), cost + move(l, tar))
            
            state = (l, tar)
            n_dp[state] = min(n_dp.get(state, float('inf')), cost + move(r, tar))
            
        dp = n_dp
    
    return min(dp.values())