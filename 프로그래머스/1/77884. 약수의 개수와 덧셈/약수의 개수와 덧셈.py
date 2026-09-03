def solution(left, right):
    cnts = [0] * (right + 1)
    
    for i in range(1, right + 1):
        s = i * (left // i)
        if left % i != 0:
            s += i
        
        for j in range(s, right + 1, i):
            cnts[j] += 1
    
    return sum(i if x % 2 == 0 else -i for i, x in enumerate(cnts[left:], start=left))