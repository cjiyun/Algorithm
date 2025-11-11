function solution(tickets) {
    tickets.sort();
    const n = tickets.length;
    let q = ['ICN'];
    let used = Array(n).fill(false);
    
    function dfs(cnt, cur) {
        if (cnt === n) return true;
        for (let i = 0; i < n; i++) {
            const [from, to] = tickets[i];
            if (used[i] || from !== cur) continue;
            q.push(to);
            used[i] = true;
            if (dfs(cnt + 1, to)) return true;
            
            q.pop();
            used[i] = false;
        }
        return false;
    }
    dfs(0, 'ICN');
    return q;
}