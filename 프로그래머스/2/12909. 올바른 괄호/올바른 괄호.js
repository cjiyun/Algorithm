function solution(s){
    s = s.split('');
    let answer = true;
    let left = 0;
    
    for (const ch of s) {
        if (ch === '(') left++;
        else {
            if (left <= 0) {
                answer = false;
                break;
            } else left--;
        }
    }
    if (left !== 0) answer = false;

    return answer;
}