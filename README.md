# editor

This project was bootstrapped with [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app)

# Story

- State Management: Redux
- 加入不同的 Geometry
- 選到加入的東西後跳出 Leva Panel
  - positon
  - rotation
  - color
  - texture
  - delete
- 選到的物品加入 Scale TransformControl（position 跟 rotation 不用）
- 複選
- DOM Panel：選擇 Geometry、重置、Pop 最後一個東西
- Refactor

# Memo

- [Do Not Put Non-Serializable Values in State or Actions](https://www.bam.tech/article/the-redux-best-practice-do-not-put-non-serializable-values-in-state-or-actions-explained)
- 注意有用到讀檔案 hook 時就要考慮 Suspense。
