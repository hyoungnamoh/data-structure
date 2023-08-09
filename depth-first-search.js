// 깊이우선탐색
// tree + stack
// 자식을 우선으로 탐색하고 자식이 없을 때까지 탐색 후 다시 자식이 있는 가장 낮은 레벨 노드로

import { Stack } from "./stack.js";

export const dfs = (tree) => {
  const stack = new Stack();
  stack.push(tree.root);

  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node.value);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
};
