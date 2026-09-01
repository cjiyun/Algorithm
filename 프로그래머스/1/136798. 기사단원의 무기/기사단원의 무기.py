def solution(number, limit, power):
    factor_cnt = [0] * (number + 1)
    
    for i in range(1, number + 1):
        for j in range(i, number + 1, i):
            factor_cnt[j] += 1
    
    return sum(
        x if x <= limit else power
        for x in factor_cnt[1:]
    )