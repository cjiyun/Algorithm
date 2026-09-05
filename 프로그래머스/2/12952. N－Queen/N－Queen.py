def solution(n):
    ans = 0
    
    def dfs(row, queens):
        nonlocal ans
        
        if row == n:
            ans += 1
            return
        
        for c in range(n):
            if c in queens:
                continue
            
            for r in range(row):
                if abs(r - row) == abs(queens[r] - c):
                    is_diagonal = True
                    break
            else:
                queens.append(c)
                dfs(row + 1, queens)
                queens.pop()
    
    dfs(0, [])
    return ans