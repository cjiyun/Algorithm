import java.util.List;
import java.util.ArrayList;

class Solution {
    public int[] solution(int l, int r) {
        List<Integer> ans = new ArrayList<>();
        
        for (int i = l; i <= r; i++) {
            if (Integer.toString(i).matches("^[50]+$")) {
                ans.add(i);
                i += 4;
            }
        }
        
        return ans.isEmpty() ? new int[]{-1} : ans.stream().mapToInt(Integer::intValue).toArray();
    }
}