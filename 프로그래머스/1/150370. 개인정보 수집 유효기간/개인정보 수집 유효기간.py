def solution(today, terms, privacies):
    terms_dic = {t: int(p) for t, p in (term.split() for term in terms)}
    ans = []
    
    for i, privacy in enumerate(privacies):
        d, t = privacy.split()
        sy, sm, sd = map(int, d.split('.'))
        ey, em = divmod(terms_dic[t] + sy * 12 + sm - 1, 12)
        em, ed = divmod((em + 1) * 28 + sd - 1, 28)
        
        end = ''.join([str(ey), '.', str(em).zfill(2), '.', str(ed).zfill(2)])
        
        if end < today:
            ans.append(i + 1)
    
    return ans