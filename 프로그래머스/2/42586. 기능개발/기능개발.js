function solution(progresses, speeds) {
    const ans = [];
    let cnt = 0;
    
    for (let i = 0; i < progresses.length; i++) {
        if (progresses[i] >= 100) {
            cnt++;
            continue;
        }
        if (cnt !== 0) ans.push(cnt);
        cnt = 0;
        
        const p = Math.ceil((100 - progresses[i]) / speeds[i]);
        
        for (let j = i; j < progresses.length; j++) {
            progresses[j] += speeds[j] * p;
        }
        if (progresses[i] >= 100) cnt++;
    }
    ans.push(cnt);
    
    return ans;
}