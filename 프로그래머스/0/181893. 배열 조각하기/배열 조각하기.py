def solution(arr, query):   
    start, end = 0, len(arr) - 1
    
    for i, q in enumerate(query):
        if i % 2 == 0: end = start + q
        else: start = start + q
    
    return arr[start:end + 1]