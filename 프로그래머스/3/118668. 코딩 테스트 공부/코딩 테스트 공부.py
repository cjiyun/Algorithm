def solution(alp, cop, problems):
    max_al, max_co = 0, 0
    max_al = max(problem[0] for problem in problems)
    max_co = max(problem[1] for problem in problems)
    
    alp = min(alp, max_al)
    cop = min(cop, max_co)
    
    dp = [[float('inf')] * (max_co + 1) for _ in range(max_al + 1)]
    dp[alp][cop] = 0
    
    for a in range(alp, max_al + 1):
        for c in range(cop, max_co + 1):
            t = dp[a][c]
            
            if a < max_al:
                dp[a + 1][c] = min(dp[a + 1][c], t + 1)
            if c < max_co:
                dp[a][c + 1] = min(dp[a][c + 1], t + 1)
            for al_req, co_req, al_rwd, co_rwd, cost in problems:
                if a < al_req or c < co_req:
                    continue
                
                n_al = min(max_al, a + al_rwd)
                n_co = min(max_co, c + co_rwd)
                dp[n_al][n_co] = min(dp[n_al][n_co], t + cost)
    
    return dp[max_al][max_co]