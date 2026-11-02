import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

class Solution {
    public String solution(String s, String skip, int index) {
        List<Character> alphabet = IntStream.rangeClosed('a', 'z')
            .mapToObj(c -> (char) c)
            .filter(c -> skip.indexOf(c) == -1)
            .collect(Collectors.toList());
        
        StringBuilder sb = new StringBuilder();
        
        for (char c : s.toCharArray()) {
            int idx = alphabet.indexOf(c);
            sb.append(alphabet.get((idx + index) % alphabet.size()));
        }
        
        return sb.toString();
    }
}