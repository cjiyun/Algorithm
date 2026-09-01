def solution(number, limit, power):
    ans = 0
    
    for i in range(1, number + 1):
        cnt = 0
        
        for j in range(1, int(i ** 0.5) + 1):
            if i % j != 0:
                continue
            
            if j * j != i:
                cnt += 1
            
            cnt += 1
        
        ans += cnt if cnt <= limit else power
    
    return ans