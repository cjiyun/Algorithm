import math

def solution(n, w, num):
    stacks = [[] for _ in range(w)]
    
    for box in range(1, n + 1):
        r, pos = divmod(box - 1, w)
        
        if r % 2 == 0:
            c = pos
        else:
            c = w - 1 - pos
        
        stacks[c].append(box)
    
    for s in stacks:
        if num in s:
            idx = s.index(num)
            return len(s) - idx