def solution(park, routes):
    n, m = len(park), len(park[0])
    cr, cc = 0, 0
    
    directions = {
        'N': (-1, 0),
        'S': (1, 0),
        'W': (0, -1),
        'E': (0, 1)
    }
    
    for i, r in enumerate(park):
        if 'S' in r:
            cr, cc = i, r.index('S')
            break
    
    for route in routes:
        op, k = route.split(' ')
        dr, dc = directions.get(op)
        nr, nc = cr, cc
        can_move = True
        
        for _ in range(int(k)):
            nr, nc = nr + dr, nc + dc
            
            if not (0 <= nr < n and 0 <= nc < m) or park[nr][nc] == 'X':
                can_move = False
                break
        
        if can_move:
            cr, cc = nr, nc
    
    return [cr, cc]