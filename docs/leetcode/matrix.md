# 矩阵

## 例题

### 73 . 矩阵置零

最简单的想法就是直接遍历矩阵，记录所有为 0 的元素的位置，然后再将对应行列置零。但这样需要额外的空间来存储这些位置。

存储空间如果是存储行列信息的话，空间复杂度是 O(m + n)，如果存储所有位置的话，空间复杂度是 O(mn)。

但是题目想让我们改为常数级的，仍然是经典的在原本矩阵上进行标记的方法.
先处理出两个变量，分别表示第一行和第一列是否需要被置零。
再利用矩阵的第一行和第一列来存储其他行列是否需要被置零的信息。
```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        int flag_col0 = false, flag_row0 = false;
        for (int i = 0; i < m; i++) {
            if (!matrix[i][0]) {
                flag_col0 = true;
            }
        }
        for (int j = 0; j < n; j++) {
            if (!matrix[0][j]) {
                flag_row0 = true;
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (!matrix[i][j]) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (!matrix[i][0] || !matrix[0][j]) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (flag_col0) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
        if (flag_row0) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/set-matrix-zeroes/solutions/669901/ju-zhen-zhi-ling-by-leetcode-solution-9ll7/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 54 . 螺旋矩阵
方法一：
模拟操作，使用一个方向数组来表示四个方向，然后不断改变方向进行遍历，并使用一个visited数组来记录是否访问过
```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();

        vector<vector<int>> move = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

        vector<vector<int>> flag(m, vector<int>(n, 0));
        vector<int> ans; 

        int m_start = 0;
        int n_start = 0;
        int count = 0;
        int choice = 0;
        ans.push_back(matrix[0][0]);
        flag[0][0] = 1;
        while (count < m * n-1) {
            if (m_start + move[choice][0] < 0 ||
                m_start + move[choice][0] >= m ||
                n_start + move[choice][1] < 0 ||
                n_start + move[choice][1] >= n ||
                flag[m_start + move[choice][0]][n_start + move[choice][1]] !=
                    0) {
                choice = (choice + 1) % 4;
            }

            m_start = m_start + move[choice][0];
            n_start = n_start + move[choice][1];
            flag[m_start][n_start] = 1;
            count++;
            ans.push_back(matrix[m_start][n_start]);
        }

        return ans ;
    }
};
```

方法二：按层模拟
对于每层，从左上方开始以顺时针的顺序遍历所有元素。假设当前层的左上角位于 (top,left)，右下角位于 (bottom,right)，按照如下顺序遍历当前层的元素。

从左到右遍历上侧元素，依次为 (top,left) 到 (top,right)。

从上到下遍历右侧元素，依次为 (top+1,right) 到 (bottom,right)。

如果 left<right 且 top<bottom，则从右到左遍历下侧元素，依次为 (bottom,right−1) 到 (bottom,left+1)，以及从下到上遍历左侧元素，依次为 (bottom,left) 到 (top+1,left)。

遍历完当前层的元素之后，将 left 和 top 分别增加 1，将 right 和 bottom 分别减少 1，进入下一层继续遍历，直到遍历完所有元素为止。
![alt text](image-2.png)

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        if (matrix.size() == 0 || matrix[0].size() == 0) {
            return {};
        }

        int rows = matrix.size(), columns = matrix[0].size();
        vector<int> order;
        int left = 0, right = columns - 1, top = 0, bottom = rows - 1;
        while (left <= right && top <= bottom) {
            for (int column = left; column <= right; column++) {
                order.push_back(matrix[top][column]);
            }
            for (int row = top + 1; row <= bottom; row++) {
                order.push_back(matrix[row][right]);
            }
            if (left < right && top < bottom) {
                for (int column = right - 1; column > left; column--) {
                    order.push_back(matrix[bottom][column]);
                }
                for (int row = bottom; row > top; row--) {
                    order.push_back(matrix[row][left]);
                }
            }
            left++;
            right--;
            top++;
            bottom--;
        }
        return order;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/spiral-matrix/solutions/275393/luo-xuan-ju-zhen-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 48 . 旋转图像

方法一：
找到规律，4个块为一组进行交换,跟上一道一样逐层操作
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();

        int left = 0;
        int right = n - 1;
        int top = 0;
        int bottom = n - 1;

        while (left <= right && top <= bottom) {
            
            // 一行（右）
            for (int j = left; j < right; j++) {
                int temp = matrix[left][j];
                cout <<temp <<endl;
                matrix[left][j] = matrix[right-j+left][left]; //左上 = 左下
                matrix[right-j+left][left] = matrix[right][right-j+left]; //左下 = 右下
                matrix[right][right-j+left] = matrix[j][right];//右下 = 右上
                matrix[j][right] = temp;  //右上 = temp
            }
            left++;
            right--;
        }
    }
};
```

方法二：水平翻转 + 主对角线翻转
非常的巧妙
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 水平翻转
        for (int i = 0; i < n / 2; ++i) {
            for (int j = 0; j < n; ++j) {
                swap(matrix[i][j], matrix[n - i - 1][j]);
            }
        }
        // 主对角线翻转
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/rotate-image/solutions/526980/xuan-zhuan-tu-xiang-by-leetcode-solution-vu3m/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 240 . 搜索二维矩阵 II
暴力搜索肯定不优雅，我的解法是不断缩小矩阵，先从右上角开始，如果当前数字大于目标值，则剔除当前列，再看左下角，如果数字大于目标值，则剔除当前行，如此反复
然后同时不断缩小左起点和上起点，直到左起点大于右终点或者上起点大于下终点


标答的有点暴力了，有一个按行二分查找，但是没用到列的信息感觉有点蠢，另一个z字形查找更优雅一些，从右上角开始，如果当前数字大于目标值，则向左移动一列，否则向下移动一行，直到找到目标值或者越界
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size();
        int n = matrix[0].size();
        int left = 0;
        int right = n - 1;
        int top = 0;
        int bottom = m - 1;

        while (left <= right && top <= bottom) {
            int j = right;
            while (j >= 0 && matrix[top][j] > target) {
                j--;
            }
            if (j<0){
                return false;
            }
            if (matrix[top][j] == target) {
                return true;
            }
            int i = bottom;

            while (i >= 0 && matrix[i][left] > target) {
                i--;
            }
            if (i<0){
                return false;
            }
            if (matrix[i][left] == target) {
                return true;
            }
            right = j;
            bottom = i;
            left++;
            top++;
        }
        return false;
    }
};
```
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int x = 0, y = n - 1;
        while (x < m && y >= 0) {
            if (matrix[x][y] == target) {
                return true;
            }
            if (matrix[x][y] > target) {
                --y;
            }
            else {
                ++x;
            }
        }
        return false;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/search-a-2d-matrix-ii/solutions/1062538/sou-suo-er-wei-ju-zhen-ii-by-leetcode-so-9hcx/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```