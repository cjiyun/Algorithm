def solution(m, n, puddles):
    board = [[0] * (m + 1) for _ in range(n + 1)]
    board[1][1] = 1
    
    puddles = set(map(tuple, puddles))
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if (j, i) in puddles or [i, j] == [1, 1]:
                continue
            board[i][j] = (board[i - 1][j] + board[i][j - 1]) % 1000000007
    
    return board[n][m]