from collections import deque

def can_convert(w1, w2):
    diff = 0
    
    for c1, c2 in zip(w1, w2):
        if c1 != c2:
            diff += 1
            if diff > 1:
                return False
    
    return diff == 1

def solution(begin, target, words):
    if target not in words:
        return 0
    
    q = deque([(begin, 0)])
    visited = [False] * len(words)
    
    while q:
        cur, cnt = q.popleft()
        
        if cur == target:
            return cnt
        
        for i, word in enumerate(words):
            if not visited[i] and can_convert(cur, word):
                visited[i] = True
                q.append((word, cnt + 1))
    
    return 0