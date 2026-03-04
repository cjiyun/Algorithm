function solution(n, computers) {
    const visited = Array(n).fill(false);
    let cnt = 0;
    
    const dfs = i => {
        visited[i] = true;
        for (let j = 0; j < n; j++) {
            if (visited[j] || !computers[i][j]) continue;
            dfs(j);
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        dfs(i);
        cnt++;
    }
    
    return cnt;
}