import java.util.Arrays;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

class Solution {
    public int solution(int a, int b, int c, int d) {
        Map<Integer, Integer> cntMap = Arrays.stream(new int[] {a, b, c, d})
            .boxed()
            .collect(Collectors.groupingBy(n -> n, Collectors.summingInt(n -> 1)));
        
        Map<Integer, List<Integer>> rankMap = cntMap.entrySet().stream()
            .collect(Collectors.groupingBy(Map.Entry::getValue, Collectors.mapping(Map.Entry::getKey, Collectors.toList())));
        
        if (rankMap.containsKey(4)) {
            return rankMap.get(4).get(0) * 1111;
        } else if (rankMap.containsKey(3)) {
            int val = 10 * rankMap.get(3).get(0) + rankMap.get(1).get(0);
                
            return val * val;
        } else if (rankMap.containsKey(2)) {
            List<Integer> twoTimes = rankMap.get(2);
            
            if (twoTimes.size() == 2) {
                return (twoTimes.get(0) + twoTimes.get(1)) * Math.abs(twoTimes.get(0) - twoTimes.get(1));
            }
            
            return rankMap.get(1).get(0) * rankMap.get(1).get(1);
        } else {
            return Collections.min(rankMap.get(1));
        }
    }
}