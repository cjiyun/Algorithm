def solution(mats, park):
    n, m = len(park), len(park[0])
    dp = [[0] * m for _ in range(n)]
    max_len = 0
    
    for i in range(n):
        for j in range(m):
            if park[i][j] != "-1":
                continue

            if i == 0 or j == 0:
                dp[i][j] = 1
            else:
                dp[i][j] = min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
            
            max_len = max(max_len, dp[i][j])
    
    candidates = list(filter(lambda x: x <= max_len, mats))
    return max(candidates) if candidates else -1