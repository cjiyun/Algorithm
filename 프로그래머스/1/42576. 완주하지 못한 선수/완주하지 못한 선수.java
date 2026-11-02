import java.util.Map;
import java.util.Arrays;
import java.util.stream.Collectors;

class Solution {
    public String solution(String[] participant, String[] completion) {
       Map<String, Integer> p = Arrays.stream(participant)
           .collect(Collectors.groupingBy(e -> e, Collectors.summingInt(e -> 1)));
        
        for (String name : completion) {
            int cnt = p.get(name);
            
            if (cnt == 1) {
                p.remove(name);
            } else {
                p.put(name, --cnt);
            }
        }
        
        return p.keySet().iterator().next();
    }
}