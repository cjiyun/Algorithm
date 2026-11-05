class Solution {
    public String solution(String code) {
        String ret = "";
        int mode = 0;
        
        for (int i = 0; i < code.length(); i++) {
            char ch = code.charAt(i);
            
            if (ch == '1') {
                mode = (mode == 0) ? 1 : 0;
                continue;
            }
            
            if (i % 2 == mode) {
                ret += ch;
            }
        }
        
        return ret.isEmpty() ? "EMPTY" : ret;
    }
}