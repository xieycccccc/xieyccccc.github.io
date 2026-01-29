# 滑动窗口

## 介绍
滑动窗口是一种用于处理数组或字符串中子数组或子字符串问题的算法技巧。它通过维护一个动态调整的窗口来高效地解决问题，避免了重复计算。

## 题目解析

### 3. 无重复字符的最长子串

有点类似双指针，左指针指向开头，右指针指向要处理的，右指针每次向右移动一位，检查当前字符是否在窗口内出现过，如果出现过，就移动左指针直到不重复为止。

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        string temp = "";
        int count = 0;
        int ans = 0;
        int i = 0;
        int j = i + 1;
        while (i < s.size()) {
            temp = "";
            temp.push_back(s[i]);
            j = i + 1;
            while (j < s.size()) {
                //cout << "process" << s[j] << endl;

                if (find(temp.begin(), temp.end(), s[j]) == temp.end()) {
                    temp.push_back(s[j]);
                } else {
                    if (temp.size() > ans) {
                        ans = temp.size();
                    }
                    //cout << temp << endl;
                    temp = "";
                    break;
                }
                j++;
            }
            if (temp.size() > ans) {
                ans = temp.size();
            }
            i++;
        }
        if (temp.size() > ans) {
            ans = temp.size();
        }

        return ans;
    }
};
```

### 438. 找到字符串中所有字母异位词

由于题目中说的是字母异位词，且字符的个数是已知的，所以窗口大小是固定的，为 p 的长度。我们可以使用两个列表来记录当前窗口和目标字符串 p 中每个字符的出现次数。当两个计数器相等时，说明找到了一个异位词。
每次只需要pop掉左边的字符，加入右边的字符，更新计数器，然后比较两个计数器是否相等。
```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // cout << s<<endl;
        // cout <<p <<endl;
        vector<int> ans;

        vector<int> s_list(26);
        vector<int> p_list(26);
        int len = p.size();
        int l = 0;
        int r = len;
        string temp;

        if (p.size()>s.size()){

            return ans;
        }

        for (int i = 0; i < len; i++) {
            p_list[p[i] - 'a']++;
        }

        for (int i = 0; i < r; i++) {
            s_list[s[i] - 'a']++;
        }

        while (r < s.size()) {
            if (p_list == s_list) {
                cout << l << endl;
                ans.push_back(l);
            }
            s_list[s[l] - 'a']--;
            s_list[s[r] - 'a']++;
            l++;
            r++;
        }
        if (p_list == s_list) {
            cout << l << endl;
            ans.push_back(l);
        }

        return ans;
    }
};
```