def solution(n):
    ans = 0
    
    for i in range(1, int(n ** 0.5) + 1):
        if i * i == n:
            ans += i
        elif n % i == 0:
            ans += i
            ans += n // i
    
    return ans