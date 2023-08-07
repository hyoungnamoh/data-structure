// heap => complete binary tree(왼쪽에서 오른쪽으로 채워나감)이므로 인덱싱이 가능함. 따라서 배열로도 변환 가능. 반대도 가능.
// 왼쪽 자식 = 부모노드 * 2 + 1, 오른쪽 자식 = 부모노드 * 2 + 2, 자식에서 부모노드 = Math.floor((자식노드 - 1) / 2)
// 최대 힙 => 위가 크고, 아래가 작음
// 최소 힙 => 아래가 크고, 위가 작음
// 공간 복잡도 O(n)
// 삽입, 삭제 시간 복잡도 O(log n)
// 삭제는 root만 삭제 가능 => root(가장 큰 숫자)만 삭제하다보니 삭제된 값을 나열하면 정렬됨(힙정렬 O(n log n))
// 조회, 수정 시간복잡도 O(n)
// heapify: 힙 수정 후 데이터(또는 heap구조가 아닌 다른 구조의 데이터)를 다시 heap 구조로 만드는 과정
// reheap up: 부모와 자식과 비교해 자식이 더 클 경우 부모와 바꾸는 행위
// 같은 레벨에서 왼쪽에서 오른쪽은 정렬 X, 가장 왼쪽이 큰수가 올 수 있고 작은 수가 올 수 있음

class MaxHeap {
  arr = [];

  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index] > this.arr[parentIndex]) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex);
      }
    }
  }

  insert(value) {
    const index = this.arr.length;
    this.arr[index] = value;
    this.#reheapUp(index);
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

    if (this.arr[index] < this.arr[biggerIndex]) {
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
      if (this.arr[i] === value) {
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
    this.arr[index] = newValue;
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
    const biggerIndex = (this.arr[leftIndex] || 0) > (this.arr[rightIndex] || 0) ? leftIndex : rightIndex;

    if (this.arr[index] < this.arr[biggerIndex]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[biggerIndex];
      this.arr[biggerIndex] = temp;
    }
  }
}

const maxHeap = new MaxHeap();
maxHeap.insert(8);
maxHeap.insert(19);
maxHeap.insert(23);
maxHeap.insert(32);
maxHeap.insert(45);
maxHeap.insert(56);
maxHeap.insert(78);
// console.log(maxHeap.sort());
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.remove();
// maxHeap.update(23, 90);
maxHeap.removeValue(32);
maxHeap;
