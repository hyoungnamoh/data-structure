// 트리 순회

import { BinarySearchTree } from "./binary-search-tree.js";
import { bfs } from "./breadth-first-search.js";
import { dfs } from "./depth-first-search.js";

const bst = new BinarySearchTree();
bst.insert(4);
bst.insert(2);
bst.insert(6);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(7);
bfs(bst);
// dfs(bst);
bst;
