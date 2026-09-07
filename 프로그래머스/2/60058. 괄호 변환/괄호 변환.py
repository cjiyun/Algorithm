def solution(p):
    if not p:
        return ''
    
    l = r = 0
    
    for i, ch in enumerate(p):
        if ch == '(':
            l += 1
        else:
            r += 1
        
        if l == r:
            u = p[:i + 1]
            v = p[i + 1:]
            break
    
    stack = []
    for ch in u:
        if ch == ')':
            if not stack:
                break
            stack.pop()
        else:
            stack.append(ch)
    else:
        return u + solution(v)
    
    return '(' + solution(v) + ')' + ''.join(')' if ch == '(' else '(' for ch in u[1:-1])