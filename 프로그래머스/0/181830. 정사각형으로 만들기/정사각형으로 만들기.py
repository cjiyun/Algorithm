def solution(arr):
    r_len = len(arr)
    c_len = len(arr[0])
    n = max(r_len, c_len)
    
    for r in arr:
        r.extend([0] * (n - c_len))
    
    arr.extend([0] * n for _ in range(n - r_len))
    
    return arr    