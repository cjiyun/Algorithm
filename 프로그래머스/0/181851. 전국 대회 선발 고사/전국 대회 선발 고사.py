def solution(rank, attendance):
    selected = sorted([i for i in range(len(rank)) if attendance[i]], key=lambda i: rank[i])[:3]
    
    return 10000 * selected[0] + 100 * selected[1] + selected[2]