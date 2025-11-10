function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    
    const visited = Array.from(Array(n), () => new Array(m).fill(false));
    const dist = Array.from(Array(n), () => new Array(m).fill(0));
    
    let q = new Array(n*m);
    let head = 0, tail = 0;
    q[tail++] = [0, 0];
    
    visited[0][0] = true;
    dist[0][0] = 1;
    
    while(head < tail) {
        const [curX, curY] = q[head++];
        if (curX === n - 1 && curY === m - 1) return dist[curX][curY];
        for (let i = 0; i < 4; i ++) {
            const x = curX + dx[i];
            const y = curY + dy[i];
            if (x < 0 || x >= n || y < 0 || y >= m) continue;
            if(maps[x][y] !== 1 || visited[x][y]) continue;
            visited[x][y] = true;
            dist[x][y] = dist[curX][curY] + 1;
            q[tail++] = [x, y];
        }
    }
    return -1;
}