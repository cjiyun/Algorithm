function solution(prices) {
    const ans = [];
    
    for (let i = 0; i < prices.length - 1; i++) {
        let j = i + 1;
        for (j; j < prices.length - 1; j++) {
            if (prices[j] < prices[i]) break;
        }
        ans.push(j - i);
    }
    ans.push(0);
    
    return ans;
}