let [num, array] = require('fs').readFileSync(0, 'utf-8').trim().split('\n').map(i => i.split(' '));
const M = +num.pop();
array = array.map(BigInt);
class MinHeap {
    constructor() {
        this.heap = [];
    }
    swap(a, b) {
        let temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }
    push(val) {
        const {heap} = this;
        heap.push(val);
        let idx = heap.length - 1;
        let parent = Math.floor((idx - 1) / 2);
        while(idx > 0 && heap[parent] > heap[idx]) {
            this.swap(idx, parent)
            idx = parent;
            parent = Math.floor((idx - 1) / 2)
        }
    }
    pop() {
        const {heap} = this;
        if(heap.length === 1) return heap.pop();
        const result = heap[0];
        heap[0] = heap.pop();
        let idx = 0;
        while(true) {
            let left = idx * 2 + 1, right = idx * 2 + 2;
            if(left >= heap.length) break;
            let next = idx;
            if(heap[left] < heap[next]) next = left;
            if(right < heap.length && heap[right] < heap[next]) next = right;
            if(next === idx) break;
            this.swap(idx, next);
            idx = next;
        }
        return result;
    }
}

const minHeap = new MinHeap();
array.forEach(item => {
    minHeap.push(item);
})
for(let i = 0; i < M; i++) {
    let x = minHeap.pop(), y = minHeap.pop();
    minHeap.push(x + y);
    minHeap.push(x + y);
}

const sum = minHeap.heap.reduce((a, b) => a + b);
console.log(String(sum));