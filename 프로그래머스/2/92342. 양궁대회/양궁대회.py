def solution(n, info):
    best = [-1]
    max_diff = 0
    ryan = [0] * 11
    
    def get_score_diff():
        r_s = 0
        a_s = 0
        
        for i in range(11):
            s = 10 - i
            
            if ryan[i] > info[i]:
                r_s += s
            elif info[i] > 0:
                a_s += s
        
        return r_s - a_s
    
    def is_better(candi, cur):
        for i in range(10, -1, -1):
            if candi[i] > cur[i]:
                return True
            if candi[i] < cur[i]:
                return False
        return False
    
    def dfs(i, arrows):
        nonlocal best, max_diff
        
        if i == 11:
            ryan[10] += arrows
            diff = get_score_diff()
            
            if diff > 0:
                if diff > max_diff:
                    max_diff = diff
                    best = ryan[:]
                elif diff == max_diff and is_better(ryan, best):
                    best = ryan[:]
            
            ryan[10] -= arrows
            return
        
        need = info[i] + 1
        if arrows >= need:
            ryan[i] = need
            dfs(i + 1, arrows - need)
            ryan[i] = 0
        
        dfs(i + 1, arrows)
    
    dfs(0, n)
    
    return best