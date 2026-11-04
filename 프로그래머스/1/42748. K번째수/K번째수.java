import java.util.Arrays;

class Solution {
    public int[] solution(int[] array, int[][] commands) {
        int[] ans = new int[commands.length];
        for (int r = 0; r < commands.length; r++) {
            int i = commands[r][0], j = commands[r][1], k = commands[r][2];
            
            ans[r] = Arrays.stream(array, i - 1, j).sorted().toArray()[k - 1];
        }
        
        return ans;
    }
}