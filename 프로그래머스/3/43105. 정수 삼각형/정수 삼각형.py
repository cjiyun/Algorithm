def solution(triangle):
    h_len = len(triangle)
    
    for i in range(1, h_len):
        v_len = len(triangle[i])
        
        for j in range(v_len):
            if not j:
                triangle[i][j] = triangle[i][j] + triangle[i - 1][j]
            elif j == v_len - 1:
                triangle[i][j] = triangle[i][j] + triangle[i - 1][j - 1]
            else:
                triangle[i][j] = max(triangle[i][j] + triangle[i - 1][j - 1], triangle[i][j] + triangle[i - 1][j])
    
    return max(triangle[h_len - 1])