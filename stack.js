// 공간복잡도 O(n)

export class Stack {
  constructor() {
    this.arr = [];
  }

  push(value) {
    return this.arr.push(value);
  }

  pop() {
    return this.arr.pop();
  }

  top() {
    return this.arr.at(-1);
  }

  // getter 함수호출 없이 사용 가능
  get length() {
    return this.arr.length;
  }
}
