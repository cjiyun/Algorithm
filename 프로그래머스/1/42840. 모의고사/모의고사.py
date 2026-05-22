from itertools import cycle

def solution(answers):
    patterns = [
        cycle([1, 2, 3, 4, 5]),
        cycle([2, 1, 2, 3, 2, 4, 2, 5]),
        cycle([3, 3, 1, 1, 2, 2, 4, 4, 5, 5])
    ]
    
    scores = [0] * 3
    
    for a in answers:
        for i, p in enumerate(patterns):
            if next(p) == a:
                scores[i] += 1
    
    return [i + 1 for i, s in enumerate(scores) if s == max(scores)]