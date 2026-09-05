from itertools import permutations

def solution(expression):
    tokens = []
    num = ''
    ans = 0
    
    for ch in expression:
        if ch.isdigit():
            num += ch
        else:
            tokens.append(num)
            tokens.append(ch)
            num = ''
    tokens.append(num)
    
    for priority in permutations(['+', '-', '*']):
        exp = tokens[:]
        
        for op in priority:
            temp = []
            i = 0
            
            while i < len(exp):
                if exp[i] == op:
                    l = temp.pop()
                    r = exp[i + 1]
                    
                    if op == '+':
                        temp.append(str(int(l) + int(r)))
                    elif op == '-':
                        temp.append(str(int(l) - int(r)))
                    else:
                        temp.append(str(int(l) * int(r)))
                    
                    i += 2
                else:
                    temp.append(exp[i])
                    i += 1
            
            exp = temp
        
        ans = max(ans, abs(int(exp[0])))
    
    return ans