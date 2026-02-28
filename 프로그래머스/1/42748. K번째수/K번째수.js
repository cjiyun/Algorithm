function solution(array, commands) {
    const ans = [];
    
    for (const [i, j, k] of commands) {
        if (i === j) {
            ans.push(array[i - 1]);
            continue;
        }
        const a = array.slice(i - 1, j).sort((a, b) => a - b);
        ans.push(a[k - 1]);
    }
    
    return ans;
}