// key,value를 한쌍으로 이루어진 구조, 자바스크립트의 객체와 비슷
// 저장공간에 제약이 있을 땐 하나의 키에 두개 이상의 값이 들어가야되는 경우가 있음
// 비둘기집의 원리 n개 보다 많은 물건을 n개의 집합에 나누어 넣는다면 적어도 어느 한 집합에는 2개 이상의 물건이 속하게 됨
// 한정된 공간에서 최대한 골고루 값을 저장하는 게 중요(한 곳에 몰리면 시간복잡도가 O(n)이 되어버림)
// hash: hash table에 있는 칸의 갯수
// hash 함수 : table의 key를 hash로 바꾸는 함수
// collision(해쉬 충돌)): hash 함수의 결과값이 겹치는 현상, 이걸 최소화 해야 좋은 hash 함수라고 할 수 있음
// 공간 복잡도 O(n) 또는 O(capa) key 갯수만큼
// 시간 복잡도 insert: (O(1)), search, update, delete: O(n/capa) hash함수에 따라 달라짐

class HashTable {
  constructor(capa) {
    this.data = [];
    this.capa = capa;
  }

  insert(key, value) {
    const hash = hashFunction(key, this.capa);
    if (!this.data[hash]) {
      this.data[hash] = [];
    }
    this.data[hash].push({ key, value });
  }

  search(key) {
    const hash = hashFunction(key, this.capa);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) {
          return this.data[hash][i].value;
        }
      }
    }

    return null;
  }

  update(key, value) {
    const hash = hashFunction(key, this.capa);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) {
          this.data[hash][i].value = value;
        }
      }
    }
  }

  delete(key) {
    const hash = hashFunction(key, this.capa);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) {
          this.data[hash].splice(i, 1);
        }
      }
    }
  }
}

// hash 함수를 만들 땐 데이터의 분포를 잘 확인해야 함.
const hashFunction = (key, mod) => {
  if (typeof key === "number") {
    return key % mod;
  }
  if (typeof key === "string") {
    return key.split("").reduce((a, c) => a + c.charCodeAt(), 0) & mod;
  }
};

const ht = new HashTable(30);
ht.insert(31, "hello");
ht.insert(61, "bye");
ht.insert(93, true);
ht.insert(115, 135);
console.log(ht.search(93));
console.log(ht.search(94));
ht.update(93, false);
ht.delete(31);
ht;
