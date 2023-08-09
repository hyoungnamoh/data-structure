// 공간복잡도 O(n)

export class Queue {
  constructor() {
    this.arr = [];
  }

  enqueue(value) {
    return this.arr.push(value);
  }

  dequeue() {
    return this.arr.shift();
  }

  peek() {
    return this.arr.at[0];
  }

  // getter 함수호출 없이 사용 가능
  get length() {
    return this.arr.length;
  }
}

// const queue = new Queue();
// queue.enqueue(6);
// queue.enqueue(3);
// queue.dequeue();
// queue.peek();
