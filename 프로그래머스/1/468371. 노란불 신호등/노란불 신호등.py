from math import lcm

def solution(signals):
    limit = 1 
    
    for sig in signals:
        limit = lcm(limit, sum(sig))
    
    for t in range(1, limit + 1):
        if all(
            g <= (t - 1) % (g + y + r) < g + y
            for g, y, r in signals
        ):
            return t
    
    return -1