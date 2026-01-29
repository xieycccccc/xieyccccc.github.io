# 子串问题

关键在于子串是连续的，故很基本的方法是双重循环枚举所有子串，然后进行处理。

## 示例问题

### 560. 和为K的子数组

基本代码：O(n²) 双重循环枚举所有子数组

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int start = 0;
        int sum = 0;
        int ans = 0;

        for (start = 0; start < nums.size(); start++) {
            sum = 0;
            sum = sum +nums[start];
            if (sum ==k){
                    ans++;
                }
            for (int end = start + 1; end < nums.size(); end++) {
                sum = sum + nums[end];
                if (sum ==k){
                    ans++;
                }
            }
        }
        return ans;
    }
};
```
可以使用前缀和的方法来进行优化：O(n) 时间复杂度

原理：
sum(i,j) = prefix_sum[j] - prefix_sum[i-1]
通过存储前缀和出现的次数，可以在遍历数组时，快速判断有多少个前缀和满足条件。

初始化时需要再哈希表中插入 (0,1)，表示前缀和为0出现过1次。
```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        
        unordered_map<int,int> hash_map;
        int ans = 0;

        hash_map[0] = 1;
        int pre_sum = 0;
        for (int i = 0;i<nums.size();i++){
            pre_sum = pre_sum+nums[i];
            auto it = hash_map.find(pre_sum-k);
            if (it!=hash_map.end()){
                ans = ans + it->second;
            }
            hash_map[pre_sum]++;
        }

        return ans;
    }
};
```


### 239. 滑动窗口最大值

基本代码：O(nk) 双重循环枚举所有子数组

使用优先队列进行操作，同时存储大小和位置信息，在输出时进行判断是不是大且满足要求
![alt text](image-1.png)
笑嘻了

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> ans;
        priority_queue<pair<int, int>> q;
        for (int i = 0; i < k; i++) {
            q.emplace(nums[i],i);
        }
        ans.push_back(q.top().first);

        for (int i = k;i<nums.size();i++){
            q.emplace(nums[i],i);
            while (q.top().second<=i-k){
                q.pop();
            }
            ans.push_back(q.top().first);
        }
        return ans;

    }
};
```
进一步优化，使用双端队列进行维护，队列存储元素的下标，下标由小到大，且对应的值是严格递减的，在移动到新的元素时，弹出所有比当前元素小的元素（因为之前的又老又没用🐶），然后将当前元素入队列，队首元素即为当前窗口的最大值（需要判断队首元素是否在窗口内）
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        deque<int> q;
        for (int i = 0; i < k; ++i) {
            while (!q.empty() && nums[i] >= nums[q.back()]) {
                q.pop_back();
            }
            q.push_back(i);
        }

        vector<int> ans = {nums[q.front()]};
        for (int i = k; i < n; ++i) {
            while (!q.empty() && nums[i] >= nums[q.back()]) {
                q.pop_back();
            }
            q.push_back(i);
            while (q.front() <= i - k) {
                q.pop_front();
            }
            ans.push_back(nums[q.front()]);
        }
        return ans;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/sliding-window-maximum/solutions/543426/hua-dong-chuang-kou-zui-da-zhi-by-leetco-ki6m/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 76 . 最小覆盖子串
终于自己做出了一道hard，本题是使用的滑动窗口的办法，先使用右指针扩大窗口，直到窗口包含了t的所有字符，然后使用左指针缩小窗口，直到窗口不再包含t的所有字符，记录下此时的最小窗口，重复这个过程直到右指针到达字符串s的末尾。
但是我自己写的代码还是比较冗余且过程不流程化
```cpp
class Solution {
public:
    bool isCovered(const vector<int>& s_list, const vector<int>& t_list) {
        // 遍历所有可能的字符（你之前用了100个位置，对应'A'-'z'左右）
        for (int i = 0; i < 100; ++i) {
            // 只有t中需要的字符（t_list[i]>0），才需要检查是否足够
            if (t_list[i] > 0 && s_list[i] < t_list[i]) {
                return false; // 只要有一个字符数量不够，就不满足
            }
        }
        return true; // 所有需要的字符都足够
    }
    string minWindow(string s, string t) {
        int min_len;
        string ans;
        string temp_str;
        vector<int> t_list(100);
        min_len = 100000;

        // 先标注t的每个元素的个数
        for (int i = 0; i < t.size(); i++) {
            t_list[t[i] - 'A']++;
        }

        // 再先找到一个满足要求的子串，没有就是g了，
        vector<int> s_list(100);
        int end;
        bool flag = false;
        int i = 0;
        while (i < s.size() - 1 && t_list[s[i] - 'A'] == 0) {

            i++;
        }

        for (int j = i; j < s.size(); j++) {
            temp_str.push_back(s[j]);
            s_list[s[j] - 'A']++;
            if (isCovered(s_list, t_list)) {
                end = j; // 找到最后位置
                flag = true;
                if (temp_str.size() < min_len) {
                    ans = temp_str;
                    min_len = temp_str.size();
                }
                break;
            }
        }
        if (!flag) {
            return ans;
        }
        bool flag_2 = true;
        while (flag_2 && i < s.size()) {
            flag_2 = false;
            // 前移
            if (i < s.size()) {
                temp_str.erase(0, 1);
                s_list[s[i] - 'A']--;
                i++;
            } else {
                break;
            }

            while (i < s.size() && t_list[s[i] - 'A'] == 0) {
                temp_str.erase(0, 1);
                s_list[s[i] - 'A']--;
                i++;
            }
            if (isCovered(s_list, t_list)) {
                // cout << temp_str << endl;
                flag_2 = true;
                if (temp_str.size() < min_len) {
                    ans = temp_str;
                    min_len = temp_str.size();
                }
                continue;
            }
            // cout << temp_str << endl;
            for (int j = end + 1; j < s.size(); j++) {
                s_list[s[j] - 'A']++;
                temp_str.push_back(s[j]);
                if (isCovered(s_list, t_list)) {
                    // cout << temp_str << endl;
                    flag_2 = true;
                    end = j;
                    if (temp_str.size() < min_len) {
                        ans = temp_str;
                        min_len = temp_str.size();
                    }
                    break;
                }
            }
        }

        return ans;
    }
};
```
但是官方的代码更加简洁
```cpp
class Solution {
public:
    unordered_map <char, int> ori, cnt; // ori：t的字符需求；cnt：当前窗口的字符统计

    // 核心检查函数：判断当前窗口是否满足t的字符需求
    bool check() {
        for (const auto &p: ori) {
            if (cnt[p.first] < p.second) {
                return false;
            }
        }
        return true;
    }

    string minWindow(string s, string t) {
        // 第一步：统计t中每个字符的需求数量（ori）
        for (const auto &c: t) {
            ++ori[c];
        }

        // 滑动窗口的核心变量：l(左指针)、r(右指针)，len(最小窗口长度)，ansL(最小窗口左边界)
        int l = 0, r = -1;
        int len = INT_MAX, ansL = -1, ansR = -1;

        // 第二步：右指针r遍历整个s，扩展窗口
        while (r < int(s.size())) {
            // 右指针右移，将当前字符加入窗口（仅统计t中需要的字符）
            if (ori.find(s[++r]) != ori.end()) {
                ++cnt[s[r]];
            }

            // 第三步：如果窗口满足条件，尝试左移l缩小窗口，找更小的满足条件的窗口
            while (check() && l <= r) {
                // 更新最小窗口
                if (r - l + 1 < len) {
                    len = r - l + 1;
                    ansL = l; // 只记录左边界，最后用substr截取，避免拼接字符串
                }
                // 左指针右移，移出窗口（仅统计t中需要的字符）
                if (ori.find(s[l]) != ori.end()) {
                    --cnt[s[l]];
                }
                ++l;
            }
        }

        // 第四步：返回结果（如果没找到则返回空串，否则截取最小窗口）
        return ansL == -1 ? string() : s.substr(ansL, len);
    }
};
```
标准的滑动窗口模板，还得练！