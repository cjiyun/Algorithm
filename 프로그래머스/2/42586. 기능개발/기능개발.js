function solution(progresses, speeds) {
    const ans = [0];
    const days = [];
    for (let i = 0; i < progresses.length; i++) {
        days[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
    }
    let max = days[0];
    
    for (let i = 0, j = 0; i < progresses.length; i++) {
        if (days[i] <= max) ans[j] += 1;
        else {
            max = days[i];
            ans[++j] = 1;
        }
    }
    
    return ans;
}