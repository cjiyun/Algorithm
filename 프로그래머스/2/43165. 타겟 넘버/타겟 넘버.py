def solution(numbers, target):
    def dfs(i, cur_tar):
        if i == len(numbers):
            return 1 if cur_tar == 0 else 0
        
        return dfs(i + 1, cur_tar + numbers[i]) + dfs(i + 1, cur_tar - numbers[i])
    
    return dfs(0, target)