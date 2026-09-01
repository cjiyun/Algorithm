def solution(number, limit, power):
    factor_cnt = []
    
    for i in range(1, number + 1):
        cnt = 0
        
        for j in range(1, int(i ** 0.5) + 1):
            if i % j != 0:
                continue
            
            if j ** 2 != i:
                cnt += 1
            
            cnt += 1
        
        factor_cnt.append(cnt)
    
    return sum(x if x <= limit else power for x in factor_cnt)