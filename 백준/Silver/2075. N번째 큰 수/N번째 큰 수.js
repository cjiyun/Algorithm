const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    push(value) {
        this.heap.push(value);
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 1) {
            const parentIndex = Math.floor(currentIndex / 2);
            if (this.heap[parentIndex] <= this.heap[currentIndex]) break;
            [this.heap[parentIndex], this.heap[currentIndex]] = 
                [this.heap[currentIndex], this.heap[parentIndex]];
            currentIndex = parentIndex;
        }
    }

    pop() {
        if (this.heap.length <= 1) return null;
        const min = this.heap[1];
        this.heap[1] = this.heap.pop();
        let currentIndex = 1;
 
        while (true) {
            const leftIndex = currentIndex * 2;
            const rightIndex = currentIndex * 2 + 1;
            let minIndex = currentIndex;
            if (leftIndex < this.heap.length && 
                this.heap[leftIndex] < this.heap[minIndex]) {
                minIndex = leftIndex;
            }
            if (rightIndex < this.heap.length && 
                this.heap[rightIndex] < this.heap[minIndex]) {
                minIndex = rightIndex;
            }
            if (minIndex === currentIndex) break;
            [this.heap[currentIndex], this.heap[minIndex]] = 
                [this.heap[minIndex], this.heap[currentIndex]];
            currentIndex = minIndex;
        }
 
        return min;
    }

    size() {
        return this.heap.length - 1;
    }

    peek() {
        return this.heap[1];
    }
}

let N = -1;
const minHeap = new MinHeap();

rl.on("line", (line) => {
    if (N === -1) {
        N = parseInt(line);
        return;
    }

    line.split(" ").forEach((v) => {
        minHeap.push(parseInt(v));
        if (minHeap.size() > N) minHeap.pop();
    });

    N--;
    if (N === 0) rl.close();
}).on("close", () => {
    console.log(minHeap.peek());
    process.exit();
});