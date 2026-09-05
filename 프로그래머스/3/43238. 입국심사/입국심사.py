def solution(n, times):
    left = 1
    right = min(times) * n
    ans = right
    
    while left <= right:
        mid = (left + right) // 2
        cnt = 0
        
        for t in times:
            cnt += mid // t
        
        if cnt >= n:
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    
    return ans