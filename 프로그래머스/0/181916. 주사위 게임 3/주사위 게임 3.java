import java.util.Arrays;

class Solution {
    public int solution(int a, int b, int c, int d) {
        int[] cnt = new int[7];
        cnt[a]++; cnt[b]++; cnt[c]++; cnt[d]++;
        
        int p = 0, q = 1, min = 7;
        boolean hasTwo = false;
        
        for (int i = 1; i < 7; i++) {
            if (cnt[i] == 0) continue;
            
            if (cnt[i] == 4) {
                return i * 1111;
            }
            
            if (cnt[i] == 3) {
                p = i;
            } else if (cnt[i] == 1) {
                min = Math.min(min, i);
            } else {
                hasTwo = true;
            }
        }
        
        if (p != 0) {
            return (10 * p + min) * (10 * p + min);
        }
        
        if (!hasTwo) {
            return min;
        }
        
        for (int i = 1; i < 7; i++) {
            if (cnt[i] == 0 || i == p) continue;
            
            if (cnt[i] == 2 && p == 0) {
                p = i;
                continue;
            }
            if (cnt[i] == 2) {
                return (p + i) * Math.abs(p - i);
            }
            
            q *= i;
        }
        
        return q;
    }
}