class Dequeue {
  constructor() {
    this.arr = [];
  }

  push(value) {
    return this.arr.push(value);
  }

  pop() {
    return this.arr.pop();
  }

  shift() {
    return this.arr.shift();
  }

  unshift() {
    return this.arr.unshift();
  }

  peek() {
    return this.arr.at(0);
  }

  // getter 함수호출 없이 사용 가능
  get length() {
    return this.arr.length;
  }
}
