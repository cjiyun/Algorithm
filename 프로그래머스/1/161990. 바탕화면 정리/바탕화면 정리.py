def solution(wallpaper):
    lux, luy, rdx, rdy = len(wallpaper), len(wallpaper[0]), 0, 0
    for i, row in enumerate(wallpaper):
        if '#' not in row:
            continue
        
        lux = min(lux, i)
        luy = min(luy, row.index('#'))
        rdx = i + 1
        rdy = max(rdy, row.rfind('#') + 1)
    
    return [lux, luy, rdx, rdy]