import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int solution(int[][] board, int[] moves) {
        int n = board.length;
        int ans = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int i : moves) {
            i--;
            
            for (int j = 0; j < n; j++) {
                if (board[j][i] == 0) continue;
                
                if (!stack.isEmpty() && stack.peek() == board[j][i]) {
                    stack.pop();
                    ans += 2;
                } else stack.push(board[j][i]);
                
                board[j][i] = 0;
                break;
            }
        }
        
        return ans;
    }
}