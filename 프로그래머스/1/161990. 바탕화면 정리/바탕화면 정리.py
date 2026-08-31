def solution(wallpaper):
    x, y = [], []
    
    for i, row in enumerate(wallpaper):
        if '#' in row:
            x.append(i)
            y.append(row.index('#'))
            y.append(row.rfind('#'))
    
    return [min(x), min(y), max(x) + 1, max(y) + 1]