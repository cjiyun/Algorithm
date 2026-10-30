import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public int solution(int[] rank, boolean[] attendance) {
        int[] stu = new int[rank.length];
        
        for (int i = 0; i < rank.length; i++) {
            stu[rank[i] - 1] = i;
        }
        
        int ans = 0;
        int cnt = 0;
        
        for (int s : stu) {
            if (attendance[s]) {
                ans = ans * 100 + s;
                cnt++;
            }
            
            if (cnt == 3) {
                break;
            }
        }
        
        return ans;
    }
}