// 요소들간에 우선순위가 생김
// binary heap으로 구현
// 시간 복잡도 O(log n)
// binary heap에서 노드의 값을 값이 아닌 객체(priority, value)로 저장
// 최소힙으로 만들고 일반 노드는 1, 2, 3, 4.. 로 순서를 정해주고 우선순위가 높은 노드는 음수로 값을 넣어주도록 하는 게 좋음

class PriorityQueue {
  arr = [];

  insert(priority, value) {
    const index = this.arr.length;
    this.arr[index] = { priority, value };
    this.#reheapUp(index);
  }

  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if ((this.arr[index]?.priority || 0) > (this.arr[parentIndex]?.priority || 0)) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex);
      }
    }
  }

  // heap에서 삭제는 루트부터 삭제
  remove() {
    if (this.arr.length === 0) {
      return false;
    }
    if (this.arr.length === 1) {
      return this.arr.pop();
    }
    const root = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.#reheapDown(0);

    return root;
  }

  #reheapDown(index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = leftIndex + 1;
    const left = this.arr[leftIndex];
    const right = this.arr[rightIndex];

    if (!left || !right) {
      return;
    }

    const biggerIndex = left > right ? leftIndex : rightIndex;

    if (this.arr[index].priority < this.arr[biggerIndex]?.priority) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[biggerIndex];
      this.arr[biggerIndex] = temp;
      this.#reheapDown(biggerIndex);
    }
  }

  sort() {
    // 힙 정렬, 삭제하고 삭제된 걸 그대로 push하면 정렬된 배열이 만들어짐
    const sortedArray = [];
    while (this.arr.length > 0) {
      const value = this.remove();
      sortedArray.push(value);
    }
    this.arr = sortedArray;
    return sortedArray;
  }

  search(value) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].value === value) {
        return i;
      }
    }
    return null;
  }

  // 특정값 찾아서 업데이트
  update(value, newValue) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr[index].value = newValue;
    // O(1/2n)
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1)
      this.#heapify(i);
    }
  }

  // 특정값 찾아서 삭제
  removeValue(value) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr.splice(index, 1);

    // O(1/2n)
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      this.#heapify(i);
    }
  }

  // leaf가 아닌 뒤에서부터 첫번째 요소를 시작으로 점점 위로 정렬해감
  #heapify(index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = leftIndex + 1;
    const biggerIndex =
      (this.arr[leftIndex]?.priority || 0) > (this.arr[rightIndex]?.priority || 0) ? leftIndex : rightIndex;

    if (this.arr[index] < this.arr[biggerIndex]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[biggerIndex];
      this.arr[biggerIndex] = temp;
    }
  }
}

const pq = new PriorityQueue();
pq.insert(3, "one");
pq.insert(7, "two");
pq.insert(2, "three");
pq.insert(8, "four");
pq.insert(5, "five");
pq.insert(6, "six");
pq.insert(9, "king"); // 우선순위 가장 높음
console.log(pq.remove());
pq;
