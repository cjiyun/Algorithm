function solution(priorities, location) {
    const q = priorities.map((v, idx) => ({v, idx}));
    const sorted = priorities.sort((a, b) => b - a);
    let sIdx = 0;
    let order = 0;
    let head = 0;
    
    while (head < q.length) {
        const cur = q[head];
        if (cur.v === sorted[sIdx]) {
            sIdx++;
            order++;
            if (cur.idx === location) return order;
        } else q.push(cur);
        head++;
    }
}