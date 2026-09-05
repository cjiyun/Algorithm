def solution(land):
    n = len(land)
    
    for i in range(1, n):
        prev = land[i - 1]
        prev_max = max(prev)
        idx = prev.index(prev_max)
        sec = max(v for i, v in enumerate(prev) if i != idx)
        
        land[i] = [x + prev_max if j != idx else x + sec for j, x in enumerate(land[i])]
    
    return max(land[n - 1])