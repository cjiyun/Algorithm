from collections import deque
def solution(s):
    q = deque(s)
    pairs = {')': '(', '}':'{', ']':'['}
    cnt = 0
    
    def is_valid(t):
        stack = []
        
        for c in t:
            if c in '({[':
                stack.append(c)
            else:
                if not stack or stack[-1] != pairs[c]:
                    return False
                
                stack.pop()
        
        return not stack
    
    for _ in range(len(q)):
        if is_valid(q):
            cnt += 1
        
        q.append(q.popleft())
    
    return cnt