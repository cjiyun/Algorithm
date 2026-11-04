import java.util.Arrays;
import java.util.stream.IntStream;

class Solution {
    public int solution(int number, int limit, int power) {
        int[] cnt = new int[number + 1];
        int total = 0;
        
        for (int i = 1; i <= number; i++) {
            for (int j = i; j <= number; j += i) {
                cnt[j]++;
            }
        }
        
        for (int i = 1; i <= number; i++) {
            total += cnt[i] > limit ? power : cnt[i];
        }
        
        return total;
    }
}