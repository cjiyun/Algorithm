def solution(m, n, startX, startY, balls):
    ans = []
    
    def dist(x, y):
        return (startX - x) ** 2 + (startY - y) ** 2
    
    for targetX, targetY in balls:
        candidates = []

        if not (startY == targetY and targetX < startX):
            candidates.append(dist(-targetX, targetY))

        if not (startY == targetY and targetX > startX):
            candidates.append(dist(2 * m - targetX, targetY))

        if not (startX == targetX and targetY < startY):
            candidates.append(dist(targetX, -targetY))

        if not (startX == targetX and targetY > startY):
            candidates.append(dist(targetX, 2 * n - targetY))

        ans.append(min(candidates))
    
    return ans