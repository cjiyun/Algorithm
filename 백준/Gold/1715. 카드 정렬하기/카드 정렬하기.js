const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n').map(Number);
class MinHeap {
    constructor() {
        this.heap = [];
    }
    swap(a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }
    push(val) {
        const {heap} = this;
        heap.push(val);
        let idx = heap.length - 1;
        let parent = Math.floor((idx-1) / 2);
        while(idx > 0 && heap[idx] < heap[parent]) {
            this.swap(idx, parent);
            idx = parent;
            parent = Math.floor((idx-1) / 2);
        }
    }
    pop() {
        const {heap} = this;
        if(heap.length === 1) return heap.pop();
        const result = heap[0];
        heap[0] = heap.pop();
        let idx = 0;
        while(true) {
            let left = idx*2+1, right = idx*2+2;
            let next = idx;
            if(left >= heap.length) break;
            if(heap[left] < heap[next]) {
                next = left;
            }
            if(right < heap.length && heap[right] < heap[next]) {
                next = right;
            }
            if(idx === next) break;
            this.swap(idx, next);
            idx = next;
        }
        return result;
    }
}
function sol(input) {
    const minHeap = new MinHeap();
    for(let i=1; i < input.length; i++) {
        minHeap.push(input[i]);
    }
    let totalCount = 0;
    while(minHeap.heap.length > 1) {
        let aCount = minHeap.pop();
        let bCount = minHeap.pop();
        let compareCount = aCount + bCount;
        totalCount += compareCount;
        minHeap.push(compareCount);
    }
    console.log(totalCount);
}

sol(input);