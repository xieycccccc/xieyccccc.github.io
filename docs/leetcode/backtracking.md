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