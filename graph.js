// 트리의 좀 더 일반적인 모습
// 방향 그래프와 무방향 그래프로 나뉨
// edge: 노드와 노드 사이를 잇는 선
// arc: 그래프에서 노드와 노드의 연결 선(edge와 같음)
// vertex: 그래프에서 요소들을 부르는 말(노드와 같음)
// in degree: 어떤 특정 노드에 들어오는 arc의 갯수
// out degree: 어떤 특정 노드에서 나가는 arc의 갯수
// 무방향 그래프의 경우  in degree와 out degree의 갯수가 같음

// 그래프를 프로그래밍으로 구현하는 방법

// 방법 1 (graph-adjacency-matrix 인접 매트릭스)
// 2차원 배열로 각 arc를 표현함 (A -> B 의 경우 [0, 1] = 1)
// 공간 복잡도 vertex * vertex
// 간단하지만 공간 복잡도가 높음, 시간 복잡도 낮음
// ex) graph-adjacency-matrix.png

// 방법2
// 각 vertex값을 1차원 배열에 arc가 향하는 vertex배열을 넣음
// ex) [{value: A, arc: [B, C, D]}, {value: B, arc: [D]}, {value: C, arc: []}]
// 공간 복잡도 arc의 갯수, 공간 복잡도가 낮지만 시간 복잡도가 높음

// 특정 vertex가 다른 vertex와 연결되어있는 지 확인할 때 방법2는 다소 복잡함.
// A vertex와 D vertex가 연결되어있는 지 확인하기 위해 방법 1의 경우 graph[A][D]만 확인(시간 복잡도 O(1))하면 되지만
// 방법 2의 경우 A로 가서 A의 arc 배열을 전부 확인(시간 복잡도 O(n))해야 함.

class Graph {
  vertecies = [];
  matrix = [];

  insertVertex(key) {
    // key 겹치는지 중복검사 필요
    this.vertecies.push(new Vertex(key));

    // matrix는 기본적으로 1차원 배열이기 때문에 arc에서 2차원 배열로 값 넣을 때 필요
    this.matrix.push([]);
  }

  insertArc(from, to, value, capacity) {
    const fromV = this.#searchVertex(from);
    const toV = this.#searchVertex(to);
    console.log(fromV, toV);
    if (!fromV === null || !toV === null) {
      throw "버텍스가 존재하지 않습니다.";
    }

    this.matrix[fromV][toV] = new Arc(value, capacity);
  }

  #searchVertex(key) {
    for (let i = 0; i < this.vertecies.length; i++) {
      if (this.vertecies[i].key === key) {
        return i;
      }
    }
    return null;
  }
}

class Vertex {
  constructor(key) {
    this.key = key;
  }
}

// arc에 값을 저장함
class Arc {
  constructor(value) {
    this.value = value;
  }
}

const g = new Graph();
g.insertVertex("a");
g.insertVertex("b");
g.insertVertex("c");
g.insertArc("a", "b", 1);
g.insertArc("b", "c", 2);
g.insertArc("c", "d", 3);
g;
