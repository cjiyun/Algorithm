class Solution {
    public long solution(long price, long money, long count) {
        long result = money - (price * ((count + 1) * count / 2));
        
        return result < 0 ? Math.abs(result) : 0L;
    }
}