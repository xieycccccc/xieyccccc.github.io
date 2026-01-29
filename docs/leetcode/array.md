# 数组


## 例题

### 53. 最大子数组和

经典的问题，记得高中技术上做过，但是发现又不会了
最简单的方法是动态规划的思想

存储一个数组sum_max,
sum_max[i]表示以第i个元素结尾的最大子数组和
且有
sum_max[i] = max(sum_max[i-1]+nums[i], nums[i])
据此编程即可（注意初始化max为-100000）
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int ans = -100000 ;
        vector<int> sum_max(nums.size());
        sum_max[0] = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            sum_max[i] = max(sum_max[i-1]+nums[i],nums[i]);
        }
        for (int i = 0 ;i<nums.size();i++){
            if (sum_max[i]>ans){
                ans = sum_max[i];
            }
        }
        return ans ;
    }
};
```


### 56 . 合并区间

本题得到解法和官方不同，还是官方的更简单
我的思路：
对于每个区间的起点和终点进行排序，使用优先队列进行处理
当遇到起点时，标记该区间为开始，当遇到终点时，标记该区间为结束
当所有区间都结束时，记录下该合并区间
还有案例是[1,4],[0,4]加入了特殊的处理
```cpp
class Solution {
public:
    int sum(vector<int>& nums) {
        int ans = 0;
        for (int i = 0; i < nums.size(); i++) {
            ans = ans + nums[i];
        }
        return ans;
    }

    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<vector<int>> ans;

        // 使用优先队列来操作
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>>
            q;
        vector<int> nums(intervals.size());
        for (int i = 0; i < intervals.size(); i++) {
            q.push({intervals[i][0], i * 2});
            q.push({intervals[i][1], i * 2 + 1});
        }
        int start, end;
        bool not_start = 1;
        int last_start = -1;
        int last_end = -1;
        while (!q.empty()) {
            vector<int> temp = q.top();
            q.pop();
            int value = temp[0];
            int number = temp[1];
            cout << number << endl;
            cout << value << endl;
            if (number % 2 == 0) {
                if (not_start) {
                    not_start = 0;
                    start = value;
                    if (last_end == value) {
                        start = last_start;
                        ans.pop_back();
                    }
                }
                nums[number / 2] = 1;

            } else {
                nums[number / 2] = 0;
                if (sum(nums) == 0) {
                    not_start = 1;
                    end = value;
                    last_end = end;
                    last_start = start;
                    ans.push_back({start, end});
                }
            }
        }
        return ans;
    }
};
```

官方解法：
“按左端点排序后，可合并的区间一定是连续的”，一句话总结就是：
排序后，左端点是递增的，如果一个区间和前面的区间合并不了，那它和后面所有的区间都合并不了，所以能合并的区间只能挤在排序后的列表里连续的一段，不会跳着出现。
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // 特判：如果区间为空，直接返回空数组（避免后续操作越界）
        if (intervals.empty()) return {};

        // 步骤1：按区间的左端点升序排序（核心前提）
        // sort默认按vector字典序，先比第一个元素（左端点），正好符合需求
        sort(intervals.begin(), intervals.end());

        // 步骤2：初始化结果数组，放入第一个区间
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);

        // 步骤3：从第二个区间开始，依次遍历
        for (const auto& cur : intervals) {
            // 取结果数组的最后一个区间（用back()，简洁）
            auto& last = merged.back();
            if (cur[0] <= last[1]) {
                // 能合并：更新最后一个区间的右端点为两者的最大值
                last[1] = max(last[1], cur[1]);
            } else {
                // 不能合并：把当前区间加入结果数组末尾
                merged.push_back(cur);
            }
        }

        return merged;
    }
};
```

### 238 除自身以外数组的乘积

前缀和后缀的妙用，不必将所有数字的乘积除以给定索引处的数字得到相应的答案，而是利用索引左侧所有数字的乘积和右侧所有数字的乘积（即前缀与后缀）相乘得到答案。

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {

        vector<int> pre(nums.size());
        vector<int> after(nums.size());
        vector<int> ans(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            if (i == 0) {
                pre[i] = nums[0];
            } else {
                pre[i] = pre[i - 1] * nums[i];
            }
        }
        for (int j = nums.size() - 1; j >= 0; j--) {
            if (j == nums.size() - 1) {
                after[j] = nums[j];
            } else {
                after[j] = after[j + 1] * nums[j];
            }
        }
        for (int i = 0; i < nums.size(); i++) {
            if (i == 0) {
                ans[i] = after[i + 1];
            } else if (i == nums.size() - 1) {
                ans[i] = pre[i - 1];
            } else {
                ans[i] = pre[i - 1] * after[i + 1];
            }
        }
        return ans ;
    }
};
```

题目的进阶方法是：空间复杂度O(1)，即不使用额外的前缀和后缀数组
由于答案数组本身可以用来存储前缀积，因此我们只需要一个变量来存储后缀积即可。
然后从右向左遍历数组，同时更新答案数组和后缀积变量。
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int length = nums.size();
        vector<int> answer(length);

        // answer[i] 表示索引 i 左侧所有元素的乘积
        // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }

        // R 为右侧所有元素的乘积
        // 刚开始右边没有元素，所以 R = 1
        int R = 1;
        for (int i = length - 1; i >= 0; i--) {
            // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
            answer[i] = answer[i] * R;
            // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
            R *= nums[i];
        }
        return answer;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/product-of-array-except-self/solutions/272369/chu-zi-shen-yi-wai-shu-zu-de-cheng-ji-by-leetcode-/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 41 缺失的第一个正数

这题也是非常的神秘，常规的方法就是存哈希然后从1开始找
但是题目要求O(1)的空间复杂度，所以只能在原数组上进行操作
方法一：
思路是用索引代表数字，用记号"-"表示是否存在，非常的巧妙
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int ans = nums.size()+1;

        for (int i = 0 ;i<nums.size();i++){
            if (nums[i]<=0){
                nums[i] = nums.size()+1;
            }
        }
        for (int i = 0 ;i<nums.size();i++){
            int temp = abs(nums[i]);
            if (temp<=nums.size()){
                if (nums[temp-1]>0){
                    nums[temp-1] = -nums[temp-1];
                }

            }
        }

        for (int i = 0 ;i<nums.size();i++){
            if (nums[i]>0){
                ans = i+1;
                break;
            }
        }

        return ans ;


    }
};
```
方法二：置换
对于每个数字num，将其放到下标为num-1的位置上，就是不停swap,
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[nums[i] - 1], nums[i]);
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/first-missing-positive/solutions/304743/que-shi-de-di-yi-ge-zheng-shu-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```