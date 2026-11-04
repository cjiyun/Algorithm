import java.util.Arrays;
import java.util.stream.IntStream;

class Solution {
    public int solution(int number, int limit, int power) {
        int total = 0;
        
        for (int i = 1; i <= number; i++) {
            int cnt = 0;
            
            for (int j = 1; j * j <= i; j++) {
                cnt += (i % j != 0) ? 0 : (j * j == i) ? 1 : 2;
            }
            
            total += cnt > limit ? power : cnt;
        }
        
        return total;
    }
}