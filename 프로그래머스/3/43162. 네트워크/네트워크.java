class Solution {
    public int solution(int n, int[][] computers) {
        int ans = 0;
        boolean[] visited = new boolean[n];
        
        for (int i = 0; i < computers.length; i++) {
            if (visited[i]) continue;
            dfs(computers, visited, i);
            ans++;
        }
        
        return ans;
    }
    
    private void dfs(int[][] com, boolean[] v, int cur) {
        v[cur] = true;
        
        for (int nxt = 0; nxt < com.length; nxt++) {
            if (com[cur][nxt] == 0 || v[nxt]) continue;
            dfs(com, v, nxt);
        }
    }
}