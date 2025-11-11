function solution(begin, target, words) {
    const n = words.length;
    if (!words.includes(target)) return 0;
    
    function diff1(a, b) {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) diff++;
        }
        return diff === 1;
    }
    
    let q = [[begin, 0]];
    let head = 0;
    const visited = Array(n).fill(false);
    
    while(head < q.length) {
        const [cur, dist] = q[head++];
        if (cur === target) return dist;
        for (let i = 0; i < n; i++) {
            if (!visited[i] && diff1(cur, words[i])) {
                visited[i] = true;
                q.push([words[i], dist+1]);
            }
        }
    }
    return 0;
}