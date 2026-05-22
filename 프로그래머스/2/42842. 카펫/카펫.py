def solution(brown, yellow):
    total = brown + yellow
    
    for h in range(3, int(total ** 0.5) + 1):
        if total % h != 0: continue
        
        w = total // h
        
        if (w - 2) * (h - 2) == yellow: return [w, h]