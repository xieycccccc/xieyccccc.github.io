# 哈希表

## 介绍
哈希表（Hash Map）是一种用于存储键值对的数据结构，允许通过键快速访问对应的值。它通过哈希函数将键映射到数组中的一个索引位置，从而实现高效的数据存取。
![alt text](image.png)

## 基本操作（C++实现）

1. 初始化
```cpp
unordered_map<int, int> hash_table; 
```
2. 插入元素
```cpp 
hash_table[key] = value; 
```

3. 查找元素
```cpp
auto it = hash_table.find(key);
if (it != hash_table.end()) {
    // 元素存在，it->second 是对应的值
} else {
    // 元素不存在
}
```
4. 删除元素
```cpp
hash_table.erase(key);
```
5. 遍历哈希表
```cpp
for (const auto& pair : hash_table) {
    int key = pair.first;
    int value = pair.second;
    // 处理 key 和 value
}
```
## 示例代码：两数之和
选用值作为键，索引作为值进行存储（因为我们查的是target-当前值是否存在）
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hash_table;
        int i;
        for (i = 0; i< nums.size();i++){
            auto it = hash_table.find(target-nums[i]);
            if  (it != hash_table.end()){
                return {i,hash_table[i]};
            }
            hash_table[nums[i]] = i; //关键 存储键值对
        }

        return {};
    }
};
```

## KEY的构造技巧 
leetcode 49. 字母异位词分组
排序法
```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        const int first26Primes[] = {2,  3,  5,  7,  11, 13, 17, 19, 23,
                                     29, 31, 37, 41, 43, 47, 53, 59, 61,
                                     67, 71, 73, 79, 83, 89, 97, 101};
        unordered_map<string , vector<string>> hash_table;
        int i, j;
        unsigned long long key;
        for (i = 0; i < strs.size(); i++) {
            string key = strs[i];
            sort(key.begin(),key.end());
            //cout <<key<<endl;
            hash_table[key].push_back(strs[i]);
            // auto it = hash_table.find(key);
            // if (it!=hash_table.end()){
            //     hash_table[it->first].push_back(strs[i]);
            // }else{
            //     hash_table[key].push_back(strs[i]);
            // }
        }

        std::vector<std::vector<std::string>> ans;

        for (const auto& pair : hash_table) {
            //cout << pair.second << endl;
            // int index = pair.first;
            // cout<<index<<endl;
            ans.push_back(pair.second);
            // 处理 key 和 value
        }
        return ans;
    }
};
```
质数法
我自己想的时候感觉是天才，但是实际上问题很大，因为乘积会很大，容易溢出，leetcode上测试用例极端然后就g了

## 哈希表能够达到O(1)的查找效率
leetcode 128. 最长连续序列

关键：找最长的关键在于找到头，但是排序的复杂度是O(NlogN)，不能用排序,直接用哈希表存储所有数字，然后遍历哈希表，找每个数字是否是一个序列的起点（即 x-1 不在哈希表中），如果是起点就不断查找下一个数是否在哈希表中，直到找不到为止，计算这个序列的长度，更新答案。

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end()); // 把 nums 转成哈希集合
        int ans = 0;
        for (int x : st) { // 遍历哈希集合
            if (st.contains(x - 1)) { // 如果 x 不是序列的起点，直接跳过
                continue;
            }
            // x 是序列的起点
            int y = x + 1;
            while (st.contains(y)) { // 不断查找下一个数是否在哈希集合中
                y++;
            }
            // 循环结束后，y-1 是最后一个在哈希集合中的数
            ans = max(ans, y - x); // 从 x 到 y-1 一共 y-x 个数
        }
        return ans;
    }
};

作者：灵茶山艾府
链接：https://leetcode.cn/problems/longest-consecutive-sequence/solutions/3005726/ha-xi-biao-on-zuo-fa-pythonjavacgojsrust-whop/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```