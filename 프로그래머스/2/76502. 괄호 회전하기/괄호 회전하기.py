def solution(s):
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
    
    for i in range(len(s)):
        cnt += is_valid(s[i:] + s[:i])
    
    return cnt