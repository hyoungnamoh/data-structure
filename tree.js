// root가 존재하고 in degree가 1인 특수한 그래프
// leaf: 자식이 없는 노드

class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
}

class Node {
  constructor(value) {
    this.children = [];
    this.value = value;
  }

  push(value) {
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);
tree.root.push(11);
tree.root.push(22);
tree.root.children[0].push(33);
tree.root.children[1].push(44);
