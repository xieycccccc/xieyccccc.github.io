# 回溯

### 46 全排列
哎这题竟然不会了，好像高中的时候还做过的，看答案继续学习吧
感觉思路就是要找到一种有序且不遗漏的方法来遍历
本题中即为从左到右每次固定一个数，剩下的数继续递归，但是有点新意的是如何保证固定的数是未被交换过的，一种方法是使用一个布尔数组来记录，另一种方法是直接交换数组中的数来保证不重复，第二种更省一点空间，👍

```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<vector<int>> permute(vector<int>& nums) {
        backtrack(0,nums,nums);
        return ans;
    }

    void backtrack(int first, vector<int>& nums, vector<int>& output) {
        int n = nums.size();
        if (first == n) {
            ans.push_back(output);
            return;
        } else {
            for (int i = first; i < n; i++) {
                swap(output[first], output[i]);
                backtrack(first+1,nums,output);
                swap(output[first], output[i]);
            }
        }
    }
};
```


### 78 子集

其实观察示例的数据可以看出一些端倪，思路就是不断的递归增加，每次把答案的取出，每个加上当前的字符再放回去
但是要注意放回去的时候不要边取边放，不然会无限长了，之前一直查不出这个错误
```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> temp_ans;
        // 先把空集给进去
        ans.push_back(temp_ans);
        back(0, nums);
        return ans;
    }
    void back(int number, vector<int>& nums) {
        int n = nums.size();
        if (number >= n) {
            //cout<< "over"<<endl;
            return;
        } else {
            vector<vector<int>> temp_ans;
            for (int i = 0; i < ans.size(); i++) {
                vector<int> temp = ans[i];
                temp.push_back(nums[number]);
                temp_ans.push_back(temp);
                
            }
            for (int j = 0 ; j< temp_ans.size();j++){
                ans.push_back(temp_ans[j]);
            }
            back(number + 1, nums);
        }
    }
};
```

看官方题解还有一种解法，应该是偏数学的解法，利用每个数的二进制位来表示是否选取这个数来求解
```cpp
class Solution {
public:
    vector<int> t;
    vector<vector<int>> ans;

    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        for (int mask = 0; mask < (1 << n); ++mask) {//表示 2^n 种情况
            t.clear();
            for (int i = 0; i < n; ++i) {
                if (mask & (1 << i)) {//按位与运算，只有当 mask 的第 i 位为 1 时，结果才不为 0（条件成立）
                    t.push_back(nums[i]);
                }
            }
            ans.push_back(t);
        }
        return ans;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/subsets/solutions/420294/zi-ji-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 17. 电话号码的字母组合
...这题，难度在于把数字和字母列出来，一开始以为都是1对3，但是逻辑一样，就懒得写了，直接用官方解吧
```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> combinations;
        if (digits.empty()) {
            return combinations;
        }
        unordered_map<char, string> phoneMap{
            {'2', "abc"},
            {'3', "def"},
            {'4', "ghi"},
            {'5', "jkl"},
            {'6', "mno"},
            {'7', "pqrs"},
            {'8', "tuv"},
            {'9', "wxyz"}
        };
        string combination;
        backtrack(combinations, phoneMap, digits, 0, combination);
        return combinations;
    }

    void backtrack(vector<string>& combinations, const unordered_map<char, string>& phoneMap, const string& digits, int index, string& combination) {
        if (index == digits.length()) {
            combinations.push_back(combination);
        } else {
            char digit = digits[index];
            const string& letters = phoneMap.at(digit);
            for (const char& letter: letters) {
                combination.push_back(letter);
                backtrack(combinations, phoneMap, digits, index + 1, combination);
                combination.pop_back();
            }
        }
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/letter-combinations-of-a-phone-number/solutions/388738/dian-hua-hao-ma-de-zi-mu-zu-he-by-leetcode-solutio/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 39. 组合总和
这题也是经典的回溯题目，就是根据一个数选的个数来递归，每次选一个数，递归减去（注意不选这个数的情况），直到递归到0或者负数
```cpp
class Solution {
public:
    vector<vector<int>> ans;
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {

        // 先排个序
        sort(candidates.begin(), candidates.end());
        // for (int i = 0; i < candidates.size(); i++) {
        //     cout << candidates[i] << endl;
        // }
        vector<int> chosen;
        back(candidates, 0, target, chosen);

        return ans;
    }

    void back(vector<int>& candidates, int index, int target,
              vector<int>& chosen) {

        if (target == 0) {
            ans.push_back(chosen);
            return;
        }
        if (index == candidates.size()) {
            return;
        }
        vector<int> temp_chosen = chosen;
        while (target >= 0) {
            back(candidates, index + 1, target, temp_chosen);
            target -= candidates[index];
            temp_chosen.push_back(candidates[index]);
        }
    }
};
```


### 22 括号生成
依旧回溯，比之前的区别就是情况分类多一点，有些的时候需要同时增加左括号和右括号，有些时候只能增加左括号，有些时候只能增加右括号，注意不能出现右括号多于左括号的情况
```cpp
class Solution {
public:
    vector<string> ans;
    vector<string> generateParenthesis(int n) {
        string now_str;
        back(n, n, now_str);
        return ans;
    }

    void back(int left, int right, string now_str) {
        if (left == 0 && right == 0) {
            ans.push_back(now_str);
            return;
        } else {
            string temp = now_str;
            if (left < right && left > 0) {
                temp.push_back('(');
                string temp_2 = now_str;
                back(left - 1, right, temp);
                temp_2.push_back(')');
                back(left, right - 1, temp_2);
            } else if (left == 0) {
                temp.push_back(')');
                back(left, right - 1, temp);
            } else if (left == right) {
                temp.push_back('(');
                back(left - 1, right, temp);
            } else {
                return;
            }
        }
    }
};
```

官方还给了挺多解法的
1. 暴力解法，全部列出来再过滤掉不合法的
```cpp
class Solution {
    bool valid(const string& str) {
        int balance = 0;
        for (char c : str) {
            if (c == '(') {
                ++balance;
            } else {
                --balance;
            }
            if (balance < 0) {
                return false;
            }
        }
        return balance == 0;
    }

    void generate_all(string& current, int n, vector<string>& result) {
        if (n == current.size()) {
            if (valid(current)) {
                result.push_back(current);
            }
            return;
        }
        current += '(';
        generate_all(current, n, result);
        current.pop_back();
        current += ')';
        generate_all(current, n, result);
        current.pop_back();
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        generate_all(current, n * 2, result);
        return result;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/generate-parentheses/solutions/192912/gua-hao-sheng-cheng-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
2. 回溯解法，之前的解法已经是回溯了，这里是官方的解法，思路一样但是官方的分类方面比我更好
```cpp
class Solution {
    void backtrack(vector<string>& ans, string& cur, int open, int close, int n) {
        if (cur.size() == n * 2) {
            ans.push_back(cur);
            return;
        }
        if (open < n) {
            cur.push_back('(');
            backtrack(ans, cur, open + 1, close, n);
            cur.pop_back();
        }
        if (close < open) {
            cur.push_back(')');
            backtrack(ans, cur, open, close + 1, n);
            cur.pop_back();
        }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        backtrack(result, current, 0, 0, n);
        return result;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/generate-parentheses/solutions/192912/gua-hao-sheng-cheng-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


3. 按括号序列的长度递归

这个解法感觉有些非人类了，首先任何一个合法的括号序列都能写成 (a)b 的形式，所以我们的求解变为求解a和b的所有可能，a的长度为i（从0到n-1），b的长度为n-i-1（因为括号序列的长度为2n，所以a和b的长度之和为2n-2），然后把所有a和b的组合起来就得到了所有合法的括号序列了，答案中对于a和b的求解又是递归的，所以就得到了一个递归的解法，最后为了避免重复计算，我们使用了一个缓存来存储已经计算过的结果，这样就得到了一个记忆化的递归解法了，👍
```cpp
class Solution {
    // 缓存：存储已经计算过的generate(i)结果，避免重复递归（记忆化）
    shared_ptr<vector<string>> cache[100] = {nullptr};
public:
    // 核心递归函数：返回所有长度为2n的合法括号序列
    shared_ptr<vector<string>> generate(int n) {
        // 1. 记忆化：如果已经计算过n的结果，直接返回缓存
        if (cache[n] != nullptr)
            return cache[n];
        
        // 2. 基准情况：n=0（0对括号），只有空字符串
        if (n == 0) {
            cache[0] = shared_ptr<vector<string>>(new vector<string>{""});
        } else {
            // 3. 递归情况：生成n对括号的所有序列
            auto result = shared_ptr<vector<string>>(new vector<string>);
            // 枚举a的长度i（从0到n-1）
            for (int i = 0; i != n; ++i) {
                // 生成a的所有可能（i对括号）
                auto lefts = generate(i);
                // 生成b的所有可能（n-i-1对括号）
                auto rights = generate(n - i - 1);
                // 拼接所有a和b的组合：(a)b
                for (const string& left : *lefts)
                    for (const string& right : *rights)
                        result -> push_back("(" + left + ")" + right);
            }
            // 4. 把结果存入缓存，方便后续复用
            cache[n] = result;
        }
        return cache[n];
    }
    
    // 对外接口：调用generate(n)并返回结果
    vector<string> generateParenthesis(int n) {
        return *generate(n);
    }
};
```

### 79 单词搜索
经典的回溯题目，使用dfs的方式遍历，遍历从每个头开始，递归4个方向，注意标记已访问的，也要注意撤销
```cpp
class Solution {
public:
    bool flag = false;
    vector<vector<int>> way = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();
        vector<vector<bool>> have_arrived(m, vector<bool>(n, false));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, i, j, word, 0, have_arrived);
                if (flag) {
                    break;
                }
            }
        }
        return flag;
    }

    void dfs(vector<vector<char>>& board, int i, int j, string word, int index,
             vector<vector<bool>>& have_arrived) {
        if (board[i][j] == word[index]) {
            if (index == word.size() - 1) {
                flag = true;
            }
            have_arrived[i][j] = true;
            int m = board.size();
            int n = board[0].size();
            for (int way_index = 0; way_index < 4; way_index++) {
                int now_i = i + way[way_index][0];
                int now_j = j + way[way_index][1];
                if (now_i >= 0 && now_i < m && now_j >= 0 && now_j < n) {
                    if (!have_arrived[now_i][now_j]) {
                        have_arrived[now_i][now_j] = true;
                        dfs(board, now_i, now_j, word, index + 1, have_arrived);
                        have_arrived[now_i][now_j] = false;
                    }
                }
            }
            have_arrived[i][j] = false;
        }
        return;
    }
};
```


### 131 分割回文串
这题也比较经典，就是切分字符串，切分的方式是从左到右每次切一个字符串，判断这个字符串是否是回文串，如果是回文串就继续递归切剩下的字符串，直到切完了，如果切完了就把当前的切分方式加入答案中，注意要撤销当前的切分方式，继续尝试其他的切分方式

```cpp
class Solution {
public:
    vector<vector<string>> ans;
    vector<vector<string>> partition(string s) {
        vector<string> s_list;
        back(s, 0, s_list);
        return ans;
    }

    void back(string s, int index, vector<string>& s_list) {
        for (int i = index + 1; i <= s.size(); i++) {
            if (check(s, index, i)) {
                string temp;
                for (int j = index; j < i; j++) {
                    temp.push_back(s[j]);
                }
                s_list.push_back(temp);
                if (i == s.size()) {
                    ans.push_back(s_list);
                    s_list.pop_back();
                    return ;
                }
                back(s, i, s_list);
                s_list.pop_back();
            }
        }
        return;
    }

    bool check(string s, int index, int i) {
        bool flag = true;
        for (int j = index; j < i; j++) {
            // cout<<j<<i<<endl;
            // cout << s[j] << s[i - j + index-1] << endl;
            if (s[j]!=s[i-j+index-1]){
                flag = false;
                return flag;
            }
        }
        return flag;
    }
};
```


观看答案后发现回文串确实用双指针比较方便，之前索引搞了半天，但是他提供了更巧妙的动态规划的判断方法
即 s[i..j] 为回文串，当且仅当其为空串（i>j），其长度为 1（i=j），或者首尾字符相同且 s[i+1..j−1] 为回文串。

```cpp
class Solution {
private:
    vector<vector<int>> f;
    vector<vector<string>> ret;
    vector<string> ans;
    int n;

public:
    void dfs(const string& s, int i) {
        if (i == n) {
            ret.push_back(ans);
            return;
        }
        for (int j = i; j < n; ++j) {
            if (f[i][j]) {
                ans.push_back(s.substr(i, j - i + 1));
                dfs(s, j + 1);
                ans.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        n = s.size();
        f.assign(n, vector<int>(n, true));

        for (int i = n - 1; i >= 0; --i) {
            for (int j = i + 1; j < n; ++j) {
                f[i][j] = (s[i] == s[j]) && f[i + 1][j - 1];
            }
        }

        dfs(s, 0);
        return ret;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/palindrome-partitioning/solutions/639633/fen-ge-hui-wen-chuan-by-leetcode-solutio-6jkv/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

动态规划是提前算出，也可以记忆化的
```cpp
class Solution {
private:
    vector<vector<int>> f;
    vector<vector<string>> ret;
    vector<string> ans;
    int n;

public:
    void dfs(const string& s, int i) {
        if (i == n) {
            ret.push_back(ans);
            return;
        }
        for (int j = i; j < n; ++j) {
            if (isPalindrome(s, i, j) == 1) {
                ans.push_back(s.substr(i, j - i + 1));
                dfs(s, j + 1);
                ans.pop_back();
            }
        }
    }

    // 记忆化搜索中，f[i][j] = 0 表示未搜索，1 表示是回文串，-1 表示不是回文串
    int isPalindrome(const string& s, int i, int j) {
        if (f[i][j]) {
            return f[i][j];
        }
        if (i >= j) {
            return f[i][j] = 1;
        }
        return f[i][j] = (s[i] == s[j] ? isPalindrome(s, i + 1, j - 1) : -1);
    }

    vector<vector<string>> partition(string s) {
        n = s.size();
        f.assign(n, vector<int>(n));

        dfs(s, 0);
        return ret;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/palindrome-partitioning/solutions/639633/fen-ge-hui-wen-chuan-by-leetcode-solutio-6jkv/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 51 N皇后
非常经典的题目啊，使用回溯其实是利用了其每行只一个的条件来有序回溯的，但是难点其实在于如何判断这个位置的合法性，我的解法直接是搞个数组存储的，有点麻烦了，官方的两种方法好很多

```cpp
class Solution {
public:
    vector<vector<string>> ans;

    vector<vector<string>> solveNQueens(int n) {
        vector<vector<bool>> cant_arrived(n, vector<bool>(n, false));
        for (int j = 0; j < n; j++) {
            vector<string> list_string;
            dfs(n, 0, j, cant_arrived, list_string);
        }
        return ans;
    }

    void dfs(int n, int i, int j, vector<vector<bool>> cant_arrived,
             vector<string> list_string) {
        if (cant_arrived[i][j]) {
            return;
        }
        string temp_string = "";
        for (int index =0 ;index<n;index++ ){
            temp_string.push_back('.');
        }
        temp_string[j] = 'Q';
        list_string.push_back(temp_string);
        if (i == n - 1) {
            ans.push_back(list_string);
            return;
        }

        cant_arrived = check(n, i, j, cant_arrived);
        for (int col = 0; col < n; col++) {
            dfs(n,i + 1, col, cant_arrived, list_string);
        }
    }

    vector<vector<bool>> check(int n, int i, int j,
                               vector<vector<bool>> cant_arrived) {
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (row == i || col == j || row + col == i + j ||
                    row - col == i - j) {
                    cant_arrived[row][col] = true;
                }
            }
        }

        return cant_arrived;
    }
};
```

1. 使用三个集合来表示列、主对角线、副对角线上的皇后位置，这样在判断一个位置是否合法时，只需要检查这三个集合中是否存在对应的元素即可，时间复杂度为O(1)，空间复杂度为O(n)（行是迭代的，肯定不一样）
```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        auto solutions = vector<vector<string>>();
        auto queens = vector<int>(n, -1);
        auto columns = unordered_set<int>();
        auto diagonals1 = unordered_set<int>();
        auto diagonals2 = unordered_set<int>();
        backtrack(solutions, queens, n, 0, columns, diagonals1, diagonals2);
        return solutions;
    }

    void backtrack(vector<vector<string>> &solutions, vector<int> &queens, int n, int row, unordered_set<int> &columns, unordered_set<int> &diagonals1, unordered_set<int> &diagonals2) {
        if (row == n) {
            vector<string> board = generateBoard(queens, n);
            solutions.push_back(board);
        } else {
            for (int i = 0; i < n; i++) {
                if (columns.find(i) != columns.end()) {
                    continue;
                }
                int diagonal1 = row - i;
                if (diagonals1.find(diagonal1) != diagonals1.end()) {
                    continue;
                }
                int diagonal2 = row + i;
                if (diagonals2.find(diagonal2) != diagonals2.end()) {
                    continue;
                }
                queens[row] = i;
                columns.insert(i);
                diagonals1.insert(diagonal1);
                diagonals2.insert(diagonal2);
                backtrack(solutions, queens, n, row + 1, columns, diagonals1, diagonals2);
                queens[row] = -1;
                columns.erase(i);
                diagonals1.erase(diagonal1);
                diagonals2.erase(diagonal2);
            }
        }
    }

    vector<string> generateBoard(vector<int> &queens, int n) {
        auto board = vector<string>();
        for (int i = 0; i < n; i++) {
            string row = string(n, '.');
            row[queens[i]] = 'Q';
            board.push_back(row);
        }
        return board;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/n-queens/solutions/398929/nhuang-hou-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
2. 使用位运算
首先位运算与之前不同的就是我们使用3个n位二进制数来存储当前行不可以的地方
具体为:
- columns：第i位为1表示第i列有皇后了
- diagonals1：第i位为1表示主对角线i上有皇
- diagonals2：第i位为1表示副对角线i上有皇后了
故3个与一下就可以判断这个位置是否合法了，时间复杂度为O(1)，空间复杂度为O(n)，实际运算中，使用((1 << n) - 1) & (~(columns | diagonals1 | diagonals2))加速
在下一行的传递中列就是columns | position，主对角线就是(diagonals1 | position) >> 1，副对角线就是(diagonals2 | position) << 1，注意主对角线和副对角线的变化是因为行数增加了，所以列数也要相应的增加或者减少
使用到了一些特殊的位运算技巧，如获取最低位的1，返回 position 的二进制表示中最低位 1 的位置（从 0 开始计数）等，感觉有点非人类了，👍
```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        auto solutions = vector<vector<string>>();
        auto queens = vector<int>(n, -1);
        solve(solutions, queens, n, 0, 0, 0, 0);
        return solutions;
    }

    void solve(vector<vector<string>> &solutions, vector<int> &queens, int n, int row, int columns, int diagonals1, int diagonals2) {
        if (row == n) {
            auto board = generateBoard(queens, n);
            solutions.push_back(board);
        } else {
            int availablePositions = ((1 << n) - 1) & (~(columns | diagonals1 | diagonals2));
            while (availablePositions != 0) {
                int position = availablePositions & (-availablePositions);//获取最低位的1
                availablePositions = availablePositions & (availablePositions - 1);//把最低位的1置为0
                int column = __builtin_ctz(position);//返回 position 的二进制表示中最低位 1 的位置（从 0 开始计数）
                queens[row] = column;
                solve(solutions, queens, n, row + 1, columns | position, (diagonals1 | position) >> 1, (diagonals2 | position) << 1);
                queens[row] = -1;
            }
        }
    }

    vector<string> generateBoard(vector<int> &queens, int n) {
        auto board = vector<string>();
        for (int i = 0; i < n; i++) {
            string row = string(n, '.');
            row[queens[i]] = 'Q';
            board.push_back(row);
        }
        return board;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/n-queens/solutions/398929/nhuang-hou-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```