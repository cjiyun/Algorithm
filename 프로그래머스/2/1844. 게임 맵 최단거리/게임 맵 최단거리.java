import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    public int solution(int[][] maps) {
        int n = maps.length;
        int m = maps[0].length;
        
        int[][] moves = {
            {0, 1}, {1, 0}, {0, -1}, {-1, 0}
        };
        
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            
            if (cur[0] == n - 1 && cur[1] == m - 1) return maps[cur[0]][cur[1]];
            
            for (int[] move : moves) {
                int nr = cur[0] + move[0], nc = cur[1] + move[1];
                
                if (nr < 0 || nr >= n || nc < 0 || nc >= m || maps[nr][nc] != 1) continue;
                
                maps[nr][nc] = maps[cur[0]][cur[1]] + 1;
                q.offer(new int[]{nr, nc});
            }
        }
        
        return -1;
    }
}