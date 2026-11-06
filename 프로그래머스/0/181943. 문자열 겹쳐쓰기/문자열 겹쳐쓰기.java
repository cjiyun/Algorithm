class Solution {
    public String solution(String my_string, String overwrite_string, int s) {
        StringBuilder sb = new StringBuilder(my_string);
        
        for (int i = s; i < s + overwrite_string.length(); i++) {
            sb.setCharAt(i, overwrite_string.charAt(i - s));
        }
        
        return sb.toString();
    }
}