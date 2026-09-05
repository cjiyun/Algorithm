def solution(n, costs):
    p = [i for i in range(n)]
    
    def find(x):
        if p[x] != x:
            p[x] = find(p[x])
        return p[x]
    
    def union(a, b):
        root_a = find(a)
        root_b = find(b)
        
        if root_a == root_b:
            return False
        
        p[root_b] = root_a
        return True
    
    costs.sort(key=lambda x: x[2])
    
    ans = 0
    cnt = 0
    
    for a, b, cost in costs:
        if union(a, b):
            ans += cost
            cnt += 1
            
            if cnt == n - 1:
                break
    
    return ans