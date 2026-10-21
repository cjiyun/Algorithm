def solution(sequence):
    p1 = p2 = 0
    ans = float('-inf')
    
    for i, s in enumerate(sequence):
        if i % 2:
            p1 = max(s, p1 + s)
            p2 = max(-s, p2 - s)
        else:
            p1 = max(-s, p1 - s)
            p2 = max(s, p2 + s)
        
        ans = max(ans, p1, p2)
    
    return ans