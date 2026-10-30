import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public record Info(int num, boolean a) {}
    
    public int solution(int[] rank, boolean[] attendance) {
        List<Info> infoList = new ArrayList<>(Arrays.asList(new Info[rank.length]));
        
        for (int i = 0; i < rank.length; i++) {
            infoList.set(rank[i] - 1, new Info(i, attendance[i]));
        }
        
        int ans = 0;
        int cnt = 0;
        int[] w = {10000, 100, 1};
        
        for (int i = 0; i < infoList.size(); i++) {
            if (infoList.get(i).a()) {
                ans += w[cnt] * infoList.get(i).num();
                cnt++;
            }
            
            if (cnt == 3) {
                break;
            }
        }
        
        return ans;
    }
}