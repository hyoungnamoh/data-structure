// 수정, 삭제, 삽입, 조회 O(n)
// 공간복잡도 O(n)
// 다음값은 찾는데 이전값을 찾기 어려움
// value와 pointer가 한 쌍을 이룬 형태, pointer 부분에 다음 노드를 가리키는 값이 들어있다.
// 배열은 고정된 크기를 갖기 때문에 메모리가 낭비될 수 있고, 배열이 메모리상에 순차적으로 데이터가 저장됨. 따라서 캐시 적중률이 높습니다.
// 링크드리스트의 경우 크기가 가변적이고 데이터가 비연속적이기 때문에 메모리 낭비가 없고, 데이터 자체는 순서가 있지만 메모리상에 순서대로 올라가진 않는다. 따라서 캐시 적중률이 낮다.

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  add(value) {
    if (this.head && this.tail) {
      // let current = this.head;
      // while (current.next) {
      //   current = current.next; // current.next가 있을 때까지만 돌기 때문에 결국 current는 next가 없는 값이 된다.
      // }

      // tail 추가로 삽입 시 시간복잡도 O(1)
      const prevTail = this.tail;
      this.tail = new Node(value);
      prevTail.next = this.tail;
    } else {
      // 처음 값 들어올 때 처리
      this.head = new Node(value);
      this.tail = this.head;
    }

    this.length++;
    return this.length;
  }

  search(index) {
    return this.#search(index)[1]?.value;

    // 리팩토링 전 코드
    // let count = 0;
    // let current = this.head;

    // while (count < index) {
    //   current = current?.next;
    //   count++;
    // }

    // return current?.value;
  }

  remove(index) {
    const [prev, current] = this.#search(index);

    if (prev && current) {
      if (!current.next) {
        this.tail = prev;
      }
      prev.next = current.next;
      this.length--;

      return this.length;
    } else if (current) {
      if (!current.next) {
        this.tail = null;
      }
      // index가 0인 경우 (current만 있고 prev 없는 경우)
      this.head = current.next;
      this.length--;

      return this.length;
    }
    // current가 없는 경우, 삭제할 대상이 없는 경우
    // length 안바꾸고 리턴도 안함

    // 리팩토링 전 코드
    // let count = 0;
    // let prev;
    // let current = this.head;

    // while (count < index) {
    //   prev = current;
    //   current = current?.next;
    //   count++;
    // }

    // prev.next = current.next;
    // this.length--;

    // return this.length;
  }

  // search함수와 remove함수의 중복되는 코드를 하나의 프라이빗 함수로 정의
  #search(index) {
    let count = 0;
    let prev;
    let current = this.head;

    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }

    return [prev, current];
  }
}

class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

const ll = new LinkedList();

ll.add(9);
ll.add(10);
ll.add(3);
ll.add(4);

ll.search(3);
ll.search(7);
ll.remove(0);
ll.remove(0);
ll.remove(0);
ll.remove(0);
ll.remove(0);
