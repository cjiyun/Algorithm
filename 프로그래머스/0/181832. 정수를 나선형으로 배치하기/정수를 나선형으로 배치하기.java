class Solution {
    public int[][] solution(int n) {
        int[][] ans = new int[n][n];
        int[][] dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int d = 0, r = 0, c = 0;
        
        for (int i = 1; i <= n * n; i++) {
            ans[r][c] = i;
            
            int nr = r + dir[d][0], nc = c + dir[d][1];
            if (nr < 0 || nr >= n || nc < 0 || nc >= n || ans[nr][nc] != 0) {
                if (d % 4 == 3) {
                    d = 0;
                } else {
                    d++;
                }
            }
            
            r += dir[d][0];
            c += dir[d][1];
        }
        
        return ans;
    }
}