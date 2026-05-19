from collections import Counter

def solution(a, b, c, d):
    items = sorted(Counter([a, b, c, d]).items(), key=lambda x: x[1], reverse=True)
    
    if len(items) == 1: return 1111 * items[0][0]
    
    if len(items) == 2:
        p, pc = items[0]
        q, qc = items[1]
        
        return (10 * p + q) ** 2 if pc == 3 else (p + q) * abs(p - q)
    
    if len(items) == 3: return items[1][0] * items[2][0]
    
    return min(a, b, c, d)