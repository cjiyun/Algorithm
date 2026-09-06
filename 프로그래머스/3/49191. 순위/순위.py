def solution(n, results):
    win = [[False] * (n + 1) for _ in range(n + 1)]
    
    for winner, loser in results:
        win[winner][loser] = True
    
    for k in range(1, n + 1):
        for a in range(1, n + 1):
            for b in range(1, n + 1):
                if win[a][k] and win[k][b]:
                    win[a][b] = True
    
    ans = 0
    
    for i in range(1, n + 1):
        cnt = 0
        
        for j in range(1, n + 1):
            if i == j:
                continue
            
            if win[i][j] or win[j][i]:
                cnt += 1
        
        if cnt == n - 1:
            ans += 1
    
    return ans