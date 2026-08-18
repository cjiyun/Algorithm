def solution(players, callings):
    p_dict = { p: idx for idx, p in enumerate(players) }
    for p in callings:
        i = p_dict[p]
        players[i - 1], players[i] = players[i], players[i - 1]
        
        p_dict[p] -= 1
        p_dict[players[i]] += 1
    
    return players