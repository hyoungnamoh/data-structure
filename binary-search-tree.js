// 시간복잡도 log n (balanced인 경우)
// 0~2개의 자식노드를 갖는 트리구조
// 왼쪽 자식은 부모노드 보다 작은 값, 오른쪽 자식은 자신보다 큰 값
// level: 루트로부터의 층 수
// height: 루트로부터 가지 길이
// diff: 왼쪽 노드의 height와 오른쪽 노드 height의 차이
// full, perfect complete, degenerate, balanced
// full: 모든 자식이 0개 또는 2개 (balanced가 아닐 수 있음)
// perfect: leaf가 아닌 노드는 모두 자식이 2개여야 함, leaf들이 같은 레벨(*)이어야 함 (balanced)
// complete: 왼쪽부터 순서대로 데이터가 들어가 있는 구조 (balanced)
// degenerate: 자식 갯수가 모두 하나인 구조, 가장 비효율적임
// balanced: 모든 노드의 diff가 0 또는 1인 트리

export class BinarySearchTree {
  root = null;

  insert(value) {
    // 어떤 값을 넣으려고 할 때, 왼쪽 자식 또는 오른쪽 자식에게 판단을 위임함
    // 왼쪽 자식, 오른쪽 자식이 모두 있을 땐 계속 자식으로 위임하고 마지막에 왼쪽 또는 오른쪽이 없을 때 거기다 값을 넣음
    if (!this.root) {
      this.root = new Node(value);

      return;
    }

    this.#insert(this.root, value);
  }

  #insert(node, value) {
    if (node.value > value) {
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  search(value) {
    if (!this.root) {
      return null;
    }
    if (this.root.value === value) {
      return this.root;
    }
    return this.#search(this.root, value);
  }

  #search(node, value) {
    if (node.value > value) {
      if (node.left) {
        return this.#search(node.left, value);
      } else {
        return null;
      }
    } else if (node.value < value) {
      if (node.right) {
        return this.#search(node.right, value);
      } else {
        return null;
      }
    } else {
      return node;
    }
  }

  /*
  삭제 시
  1. leaf 삭제의 경우 부모에서 해당 left를 삭제 (양쪽 노드 모두 없는 경우)
  2. 왼쪽 노드나 오른쪽 노드 둘 중 하나만 갖고 있는 경우 부모노드에서 타겟노드의 자식노드가 타겟노드를 대체하도록 한다
  3. 양쪽 노드 모두 갖고있는 경우 타겟노드의 왼쪽 자식의 가장 오른쪽 노드와 교체 후 타겟노드 삭제
 */
  remove(value) {
    this.#remove(this.root, value);
  }

  #remove(node, value) {
    // 트리에 없는 값을 받았을 경우 leaf까지 내려가서 자식이 없는 상태에서 node를 받기 때문에 node가 undefined일 수 있음
    if (!node) {
      return null;
    }

    // 자식일 경우 타는 로직
    if (node.value === value) {
      // leaf인 경우, 자식이 없는 경우
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        // 자식 모두 있을 경우
        let exchange = node.left;

        // 왼쪽 자식에서 가장 오른쪽 자식을 찾아서 바꿔줘야함
        while (exchange.right) {
          exchange = exchange.right;
        }
        const temp = node.value;
        node.value = exchange.value;
        exchange.value = temp;
        node.left = this.#remove(node.left, temp);

        return node;
      }
    } else {
      // 부모의 경우 타는 로직
      if (node.value > value) {
        node.left = this.#remove(node.left, value);
        return node;
      } else {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }
}

class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}

// const bst = new BinarySearchTree();
// bst.insert(8);
// bst.insert(1);
// bst.insert(6);
// bst.insert(123);
// bst.insert(42);
// bst.insert(31);
// bst.insert(62);
// bst.insert(32);

// console.log(bst.search(32));
// console.log(bst.search(33));
// console.log(bst.search(62));
// console.log(bst.search(8));

// bst.remove(8);
// console.log(bst.remove(15)); // false
// bst.remove(4);
