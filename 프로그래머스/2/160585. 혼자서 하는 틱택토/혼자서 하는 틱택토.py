def solution(board):
    win_lines = [
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)]
    ]
    
    o = sum(row.count('O') for row in board)
    x = sum(row.count('X') for row in board)
    
    def is_win(m):
        return any(
            all(board[r][c] == m for r, c in line)
            for line in win_lines
        )
    
    o_win = is_win('O')
    x_win = is_win('X')
    
    if o < x or o > x + 1 or (o_win and x_win) or (o_win and o != x + 1) or (x_win and x != o):
        return 0
    
    return 1