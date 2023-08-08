// 너비우선탐색
// // tree + queue
// 레벨순으로 내려가며 같은 레벨에 있는 걸 왼쪽에서 오른쪽으로 탐색

import { Queue } from "./queue.js";

export const bfs = (tree) => {
  const queue = new Queue();
  queue.enqueue(tree.root);

  while (queue.length > 0) {
    const node = queue.dequeue();
    console.log(node.value);
    if (node.left) {
      queue.enqueue(node.left);
    }
    if (node.right) {
      queue.enqueue(node.right);
    }
  }
};
