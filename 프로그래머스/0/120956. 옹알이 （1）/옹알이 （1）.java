import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public int solution(String[] babbling) {
        String[] pron = {"aya", "ye", "woo", "ma"};
        int ans = 0;
        
        for (String b : babbling) {
            String[] bArr = b.split("");
            List<String> check = new ArrayList<>();
            boolean isPossible = true;
            
            for (int i = 0; i < b.length(); i++) {
                if (check.size() > 3) {
                    isPossible = false;
                    break;
                }
                
                check.add(bArr[i]);
                
                if (Arrays.stream(pron).anyMatch(p -> p.equals(String.join("", check)))) {
                    check.clear();
                }
            }
            
            if (isPossible && check.isEmpty()) {
                ans++;
            }
        }
        
        return ans;
    }
}