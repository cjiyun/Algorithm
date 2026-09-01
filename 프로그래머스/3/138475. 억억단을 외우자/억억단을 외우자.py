def solution(e, starts):
    factor_cnt = [0] * (e + 1)
    best = [0] * (e + 1)
    
    for i in range(1, e + 1):
        for j in range(i, e + 1, i):
            factor_cnt[j] += 1
    
    max_idx = e
    
    for i in range(e, 0, -1):
        if factor_cnt[i] >= factor_cnt[max_idx]:
            max_idx = i
        
        best[i] = max_idx
    
    return [best[s] for s in starts]