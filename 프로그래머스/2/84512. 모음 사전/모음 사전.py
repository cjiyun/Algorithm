def solution(word):
    words = []
    alphabets = ['A', 'E', 'I', 'O', 'U']
    
    def dfs(cur):
        if len(cur) > 5:
            return
        
        if cur: words.append(cur)
        
        for a in alphabets:
            dfs(cur + a)
    
    dfs('')
    
    return words.index(word) + 1