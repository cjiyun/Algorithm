def solution(rank, attendance):
    selected = sorted([(x, i) for i, x in enumerate(rank) if attendance[i]])
    
    return 10000 * selected[0][1] + 100 * selected[1][1] + selected[2][1]