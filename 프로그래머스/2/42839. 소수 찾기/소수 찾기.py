from itertools import permutations

def is_prime(num):
    if num < 2: return False
    if num == 2: return True
    if num % 2 == 0: return False
    
    for i in range(3, int(num ** 0.5) + 1, 2):
        if num % i == 0:
            return False
    
    return True

def solution(numbers):
    nums = set()
    
    for length in range(1, len(numbers) + 1):
        for perm in permutations(numbers, length):
            nums.add(int(''.join(perm)))
    
    return sum(1 for num in nums if is_prime(num))