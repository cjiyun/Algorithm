function solution(bridge_length, weight, truck_weights) {
    const bridge = Array(bridge_length).fill(0);
    let sum = 0;
    let time = 0;
    
    while (truck_weights.length > 0 || sum > 0) {
        time++;
        
        const out = bridge.shift();
        sum -= out;
        
        if (sum + truck_weights[0] <= weight) {
            const next = truck_weights.shift()
            bridge.push(next);
            sum += next;
        } else bridge.push(0);
    }
    
    return time;
}