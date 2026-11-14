class Solution {
    public int solution(int[] wallet, int[] bill) {
        int ans = 0;
        
        while (Math.min(bill[0], bill[1]) > Math.min(wallet[0], wallet[1]) || Math.max(bill[0], bill[1]) > Math.max(wallet[0], wallet[1])) {
            int max = Math.max(bill[0], bill[1]);
            
            bill[max == bill[0] ? 0 : 1] = max / 2;
            ans++;
        }
        
        return ans;
    }
}