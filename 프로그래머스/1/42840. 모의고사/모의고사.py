def solution(answers):
    patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ]
    
    scores = [sum(ans == pattern[i % len(pattern)] for i, ans in enumerate(answers)) for pattern in patterns]
    
    return [i + 1 for i, score in enumerate(scores) if score == max(scores)]