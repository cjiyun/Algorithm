from collections import Counter

def solution(participant, completion):
    p_cnt = Counter(participant)
    c_cnt = Counter(completion)
    
    for c, cnt in c_cnt.items():
         p_cnt[c] -= cnt
    
    for p, cnt in p_cnt.items():
        if cnt > 0:
            return p
        
    