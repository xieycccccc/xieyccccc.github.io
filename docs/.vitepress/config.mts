import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "xieyccccc's 学习空间",
  description: "记录自己的学习笔记和成长历程💪",
  themeConfig: {
    siteTitle: 'BROOFDOG SPACE',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Will Learn', link: '/will_learn' },
      { text: 'Learned', link: '/learned' },
      { text: 'Learning...', link: '/learning' },
      { text: 'LeetCode Hot 100', link: '/leetcode/' },
      { text: 'LLM彻底学习', link: '/llm_study' },
      {text: '股市研究入门', link: '/money_making'},
      {text:'ComfyUI 学习', link: '/comfyui_learning/'}
    ],

    sidebar: {
      '/will_learn/': [
        {
          text: 'Will Learn',
          items: [
            { text: 'HTML & CSS', link: '/will_learn/html_css' },
            { text: 'JavaScript', link: '/will_learn/javascript' },
            { text: 'TypeScript', link: '/will_learn/typescript' },
            { text: 'Vue', link: '/will_learn/vue' }
          ]
        }
      ],
      '/learned/': [
        {
          text: 'Learned',
          items: [
            { text: 'Git Basics', link: '/learned/git_basics' },
            { text: 'Markdown Guide', link: '/learned/markdown_guide' }
          ]
        }
      ],
      '/learning/': [
        {
          text: 'Learning...',
          items: [
            { text: 'React', link: '/learning/react' },
            { text: 'Node.js', link: '/learning/nodejs' }
          ]
        }
      ],
      '/leetcode/': [
        {
          text: 'LeetCode Hot 100',
          items: [
            { text: '哈希表', link: '/leetcode/hash-maps' },
            { text: '双指针', link: '/leetcode/two-pointers' },
            {text:'滑动窗口', link: '/leetcode/sliding-window' },
            {text:'子串', link: '/leetcode/substring' },
            {text:'数组', link: '/leetcode/array' },
            {text:'矩阵', link: '/leetcode/matrix'},
            {text:'链表', link: '/leetcode/linked-list' },
            {text:'二叉树', link: '/leetcode/binary-tree' },
            {text:'图', link: '/leetcode/graph'},
            {text:'回溯', link: '/leetcode/backtracking'},
            {text:'二分查找', link: '/leetcode/binary-search'},
          ]
        }
      ],
      '/llm_study/': [
        {
          text: 'LLM彻底学习',
          items: [
            { text: '基本理解', link: '/llm_study/overall' }
          ]
        }
      ],
      '/money_making/': [
        {
          text: '股市研究入门',
          items: [
            { text: '基础知识', link: '/money_making/basics' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xieycccccc/xieycccccc.github.io' }
    ]
  }
})
