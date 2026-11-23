class Solution {
    public String solution(String[] survey, int[] choices) {
        String ans = "";
        
        int[] scores = new int['T' + 1];
        
        for (int i = 0; i < survey.length; i++) {
            int choice = choices[i];
            if (choice == 4) continue;
            
            char type = choice < 4 ? survey[i].charAt(0) : survey[i].charAt(1);
            scores[type] += Math.abs(choice - 4);
        }
        
        ans += (scores['R'] >= scores['T'] ? "R" : "T")
            + (scores['C'] >= scores['F'] ? "C" : "F")
            + (scores['J'] >= scores['M'] ? "J" : "M")
            + (scores['A'] >= scores['N'] ? "A" : "N");
        
        return ans;
    }
}