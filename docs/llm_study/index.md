# LLM 系统学习笔记

由于在科研研读代码时经常发现 LLM 的基本部分不大看的透彻，上课也是浅尝辄止，所以打算系统地学习一下LLM的基本原理和实现细节。

以下是Gemini给我的寒假突击路线图，计划在寒假期间完成。

## 寒假 LLM 突击路线图 (2026 版)

### 第一阶段：夯实底层架构（第 1 周）
**核心目标**：搞懂 Transformer 每一个矩阵的意义，并能手写一个 Mini-GPT。

*   **理论学习**：深入研读《Attention is All You Need》论文。
*   **重点理解**：Self-Attention, Multi-Head Attention, Positional Encoding。
*   **参考视觉化教程**：Jay Alammar 的 The Illustrated Transformer。
*   **代码实践**：跟着 Andrej Karpathy 的视频 《Let's build GPT: from scratch, in code, spelled out.》 动手写一遍。这是目前公认最扎实的入门课。

> **本周任务**：在你的 GitHub 上复现一个能在《莎士比亚全集》上进行文本生成的字符级模型。

### 第二阶段：模型进阶与训练（第 2 周）
**核心目标**：理解预训练（Pre-training）、微调（SFT）和对齐（Alignment）。

*   **关键技术点**：
    *   **Tokenizer**：理解 BPE、SentencePiece 是如何处理词表的。
    *   **PEFT (参数高效微调)**：彻底搞懂 LoRA 的原理，这是现在的工业界标配。
    *   **对齐算法**：从 RLHF (基于人类反馈的强化学习) 到 DPO (直接偏好优化)。了解 DeepSeek 或 OpenAI 是如何通过强化学习提升逻辑推理（Reasoning）能力的。
*   **工具链**：熟练使用 Hugging Face 的 transformers、peft 和 trl 库。

> **实践项目**：使用 Llama-3-8B 或 Qwen2.5 模型，针对一个特定任务（如法律问答或代码辅助）进行 LoRA 微调。

### 第三阶段：工程应用与 RAG（第 3 周）
**核心目标**：解决大模型的幻觉问题，构建能够处理私有数据的 Agent。

*   **RAG (检索增强生成)**：
    *   理解 Embedding 模型、向量数据库 (Milvus, Pinecone) 的作用。
    *   学习高级 RAG 技巧：多级索引、重排序 (Rerank) 以及混合检索。
*   **Agent 架构**：学习 ReAct 模式、Tool Calling (函数调用) 以及多智能体协作框架 (如 LangGraph 或 AutoGen)。

> **本周任务**：结合你自己的笔记或 PDF 文档，开发一个智能知识库问答系统，要求具备联网搜索和长文本处理能力。

### 第四阶段：量化、推理与性能优化（第 4 周）
**核心目标**：搞懂如何让模型在普通电脑上跑得飞快。

*   **模型压缩**：学习量化技术 (AWQ, GPTQ, GGUF)。
*   **推理框架**：实践使用 vLLM (吞吐量优化) 或 llama.cpp (本地部署)。
*   **前沿动态**：关注 2026 年最流行的 Long Context 处理和 Multimodal (多模态) 融合原理。

> **结课作业**：将你微调的模型进行 4-bit 量化，并使用 vLLM 部署成一个标准 API 接口，配合前端展示。
