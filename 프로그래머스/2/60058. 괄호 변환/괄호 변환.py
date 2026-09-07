def solution(p):
    if not p:
        return ''
    
    bal = 0
    is_cor = True
    
    for i, ch in enumerate(p):
        if ch == '(':
            bal += 1
        else:
            bal -= 1
        
        if bal < 0:
            is_cor = False
        
        if bal == 0:
            u = p[:i + 1]
            v = p[i + 1:]
            break
    
    if is_cor:
        return u + solution(v)
    
    return '(' + solution(v) + ')' + ''.join(')' if ch == '(' else '(' for ch in u[1:-1])