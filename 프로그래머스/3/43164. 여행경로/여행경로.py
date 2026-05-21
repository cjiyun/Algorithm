from collections import defaultdict

def solution(tickets):
    routes = defaultdict(list)
    
    for start, end in tickets:
        routes[start].append(end)
    
    for start in routes:
        routes[start].sort(reverse=True)
    
    path = []
    
    def dfs(airport):
        while routes[airport]:
            dfs(routes[airport].pop())
        
        path.append(airport)
    
    dfs('ICN')
    
    return path[::-1]