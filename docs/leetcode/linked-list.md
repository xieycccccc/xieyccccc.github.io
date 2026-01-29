# 链表

## 介绍
链表是一种线性数据结构，由一系列节点组成，每个节点包含数据和指向下一个节点的引用（指针）。与数组不同，链表中的元素在内存中不必是连续存储的，这使得链表在插入和删除操作上更为高效。

## 常见操作（C++）
链表的常见操作包括插入、删除、查找和遍历。以下是一个简单的链表节点结构定义：
```cpp
struct ListNode {
     int val;
     ListNode *next;
     ListNode(int x) : val(x), next(NULL) {}
 };

// 插入节点
void insert(ListNode** head, int newData) {
    ListNode* newNode = new ListNode(newData);
    newNode->next = *head;
    *head = newNode;
}

//遍历
void traverse(ListNode* node) {
    while (node != NULL) {
        std::cout << node->val << " ";
        node = node->next;
    }
}

```


### 160 相交链表

法一：哈希表存储法
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        unordered_set<ListNode *> visitied;
        ListNode* temp = headA;
        while (temp!=nullptr){
            visitied.insert(temp);
            temp  = temp->next;
        }

        temp = headB;
        while (temp!=nullptr){
            if (visitied.count(temp)){
                return temp;
            }
            temp = temp->next;
        }
        return nullptr;
    }
};
```
法二：双指针法
headA和headB分别从两个链表的头开始遍历，当到达链表末尾时，跳转到另一个链表的头继续遍历。这样，当两个指针相遇时，就是相交节点；如果没有相交节点，最终会同时到达链表末尾的nullptr。

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == nullptr || headB == nullptr) {
            return nullptr;
        }
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = pA == nullptr ? headB : pA->next;
            pB = pB == nullptr ? headA : pB->next;
        }
        return pA;
    }
};

作者：力扣官方题解
链接：https://leetcode.cn/problems/intersection-of-two-linked-lists/solutions/811625/xiang-jiao-lian-biao-by-leetcode-solutio-a8jn/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```