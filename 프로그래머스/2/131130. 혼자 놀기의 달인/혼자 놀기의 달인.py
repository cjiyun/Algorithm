def solution(cards):
    n = len(cards)
    visited = [False] * n
    groups = []
    
    for i in range(n):
        if visited[i]:
            continue
        
        cnt = 0
        
        while not visited[i]:
            visited[i] = True
            cnt += 1
            i = cards[i] - 1
        
        groups.append(cnt)
    
    if len(groups) < 2:
        return 0
    
    groups.sort(reverse=True)
    
    return groups[0] * groups[1]