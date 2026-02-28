function solution(scoville, K) {
    const createHeap = compare => {
        const a = [];
        const size = () => a.length;
        const peek = () => a[0];
        
        const push = v => {
            a.push(v);
            let i = a.length - 1;
            
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (compare(a[p], a[i])) break;
                [a[p], a[i]] = [a[i], a[p]];
                i = p;
            }
        }
        
        const pop = () => {
            if (!a.length) return undefined;
            const top = a[0];
            const last = a.pop();
            if (a.length) {
                a[0] = last;
                let i = 0;
                
                while (true) {
                    let l = i * 2 + 1;
                    let r = l + 1;
                    let best = i;
                    
                    if (l < a.length && !compare(a[best], a[l])) best = l;
                    if (r < a.length && !compare(a[best], a[r])) best = r;
                    if (best === i) break;
                    
                    [a[best], a[i]] = [a[i], a[best]];
                    i = best;
                }
            }
            return top;
        }
        
        return {size, peek, push, pop};
    }
    
    const heap = createHeap((a, b) => a <= b);
    scoville.forEach(v => heap.push(v));
    
    let cnt = 0;
    
    while (heap.size() >= 2 && heap.peek() < K) {
        const a = heap.pop();
        const b = heap.pop();
        heap.push(a + b * 2);
        cnt++;
    }
    
    return heap.peek() >= K ? cnt : -1;
}