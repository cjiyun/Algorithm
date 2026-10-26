import java.util.Arrays;

class Solution {
    public int solution(int[] num_list) {
        return Arrays.stream(num_list).map(i -> 31 - Integer.numberOfLeadingZeros(i)).sum();
    }
}