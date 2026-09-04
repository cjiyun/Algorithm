import math
from collections import defaultdict

def to_min(t):
    h, m = map(int, t.split(':'))
    return h * 60 + m

def solution(fees, records):
    dt, df, ut, uf = fees
    d = defaultdict(lambda: [0, 0, False])
    
    for r in records:
        t, num, status = r.split()
        t = to_min(t)
        
        if status == 'IN':
            if d[num][2]:
                d[num][2] = False
            d[num][0] = t
        else:
            d[num][1] += t - d[num][0]
            d[num][2] = True
    
    ans = []
    for _, [rec_in, acc, is_out] in sorted(d.items()):
        if not is_out:
            acc += 1439 - rec_in
        
        if acc > dt:
            ans.append(df + math.ceil((acc - dt) / ut) * uf)
        else:
            ans.append(df)
    
    return ans