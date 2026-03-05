function solution(game_board, table) {
    const n = game_board.length;
    const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    const inRange = (r, c) => r >= 0 && r < n && c >= 0 && c < n;
    
    const components = (grid, target) => {
        const visited = Array.from({length: n}, () => Array(n).fill(false));
        const comps = [];
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (visited[i][j] || grid[i][j] !== target) continue;
                const q = [[i, j]];
                visited[i][j] = true;
                const cells = [];
                
                for (let qi = 0; qi < q.length; qi++) {
                    const [cr, cc] = q[qi];
                    cells.push([cr, cc]);
                    
                    for (const [dr, dc] of dir) {
                        const [nr, nc] = [cr + dr, cc + dc];
                        if (!inRange(nr, nc) || visited[nr][nc] || grid[nr][nc] !== target) continue;
                        q.push([nr, nc]);
                        visited[nr][nc] = true;
                    }
                }
                comps.push(cells);
            }
        }
        return comps;
    }
    
    const normalize = cells => {
        let minR = Infinity;
        let minC = Infinity;
        
        for (const [r, c] of cells) {
            if (r < minR) minR = r;
            if (c < minC) minC = c;
        }
        
        const shifted = cells.map(([r, c]) => [r - minR, c - minC]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        return shifted.join('|');
    }
    
    const rotate90 = cells => cells.map(([r, c]) => [c, -r]);
    
    const signature = cells => {
        let cur = cells;
        let best = null;
        
        for (let i = 0; i < 4; i++) {
            const s = normalize(cur);
            if (best === null || s < best) best = s;
            cur = rotate90(cur);
        }
        
        return best;
    }
    
    const holes = components(game_board, 0);
    const blocks = components(table, 1);
    const blockCnt = new Map();
    
    blocks.forEach(cells => {
        const sig = signature(cells);
        blockCnt.set(sig, (blockCnt.get(sig) ?? 0) + 1);
    });
    
    let ans = 0;
    
    holes.forEach(cells => {
        const sig = signature(cells);
        const cnt = blockCnt.get(sig) ?? 0;
        
        if (cnt > 0) {
            ans += cells.length;
            if (cnt === 1) blockCnt.delete(sig);
            else blockCnt.set(sig, cnt - 1);
        }
    });
    
    return ans;
}