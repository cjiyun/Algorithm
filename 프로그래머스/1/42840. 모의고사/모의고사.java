import java.util.List;
import java.util.ArrayList;

class Solution {
    public int[] solution(int[] answers) {
        int[][] patterns = {
            {1, 2, 3, 4, 5},
            {2, 1, 2, 3, 2, 4, 2, 5},
            {3, 3, 1, 1, 2, 2, 4, 4, 5, 5}
        };
        int[] scores = new int[3];
        
        for (int i = 0; i < answers.length; i++) {
            for (int j = 0; j < 3; j++) {
                scores[j] += (answers[i] == patterns[j][i % patterns[j].length]) ? 1 : 0;
            }
        }
        
        List<Integer> rst = new ArrayList<>();
        
        for (int i = 0; i < 3; i++) {
            if (scores[i] == Math.max(scores[0], Math.max(scores[1], scores[2]))) rst.add(i + 1);
        }
        
        return rst.stream().mapToInt(Integer::intValue).toArray();
    }
}