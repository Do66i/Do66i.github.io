/*
test1
문제
피보나치 수열을 순차적으로 출력하는 클로저 형태의 함수를 작성해야 합니다.

출력
호출될 때마다 다음 피보나치 수를 리턴하는 함수를 리턴해야 합니다.

주의 사항
피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 됩니다.
예시) 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
리턴되는 클로저 내부 함수(inner function)의 구현은 recursive 혹은 iterative한 방법 중 어떤 것이어도 괜찮습니다.

입출력 예시
const fn = test1();
console.log(fn()); // --> 0
console.log(fn()); // --> 1
console.log(fn()); // --> 1
console.log(fn()); // --> 2
console.log(fn()); // --> 3
console.log(fn()); // --> 5
*/


function test1() {
  let start = 0;
  // 시작값을 메모장에 저장
  const memo = [0, 1];

  const aux = (n) => {
    // n번째 값이 메모장에 미리 저장해둔 경우, 그 값을 반환
    if (memo[n] !== undefined) return memo[n];
    // 그렇지 않은 경우
    else {
      memo[n] = aux(n - 2) + aux(n - 1);
      return memo[n];
    }
  };
  // 클로저 형태의 함수 === 함수를 리턴하는 함수
  return () => {
    start++;
    return aux(start - 1);
  };
}

function test1(){
  let a=0
  let b=1
  let c

  return function fibonaci(){
    [c,a,b]=[a,b,a+b]   //[1,1]=[1,0+1]

    return c
  }
}


//! -----------------------------------------------------------------

/*
test2
문제
객체를 요소로 갖는 배열과 id를 입력받아, 해당 id값을 가지고 있는 객체를 리턴해야 합니다.

입력
인자 1 : arr
객체를 요소로 갖는 배열
arr[i]는 'id', 'name', 'children' 등의 속성을 갖는 객체
인자 2 : id
number 타입의 id
출력
object 타입을 리턴해야 합니다.
주의 사항
입력으로 주어지는 배열은 재귀적 구조를 가지고 있습니다. (입출력 예시 참고)
배열이 요소인 객체가 'children' 속성을 가질 경우, 해당 값은 초기 입력(arr)과 같은 구조를 지닌 배열입니다.
중첩 구조의 깊이(depth)에는 제한이 없습니다.
함수 test2는 재귀 함수로 구현되어야 합니다.
입력받은 id를 가진 객체가 없을 경우, null을 리턴해야 합니다.
입출력 예시
let input = [
  {
    id: 1,
    name: 'johnny',
  },
  {
    id: 2,
    name: 'ingi',
    children: [
      {
        id: 3,
        name: 'johnson',
      },
      {
        id: 5,
        name: 'steve',
        children: [
          {
            id: 6,
            name: 'lisa',
          },
        ],
      },
      {
        id: 11,
      },
    ],
  },
  {
    id: '13',
  },
];

let output = test2(input, 1);
console.log(output); // --> { id: 1, name: 'johnny' }

output = test2(input, 5);
console.log(output); // --> { id: 5, name: 'steve', children: [{ id: 6, name: 'lisa' }] }

output = test2(input, 99);
console.log(output); // --> null

*/


function test2(arr, id) {
  // 객체를 요소로 하는 배열을 차례로 순회한다
  // children 속성을 가질 경우, children 배열을 인자로 하는 test2함수를 재귀로 호출한다

  // DFS 방식으로 탐색할 객체들의 임시 기억 장치(queue)를 childeNodes 변수에 담아준다
  let childeNodes = [];

  // 배열을 순회한다
  for (let obj of arr) {
    // 객체 구조 분해
    const { id: head, children: tail } = obj;

    // base case
    // 해당 객체의 id 속성이 입력받은 id와 같은 경우, 객체를 반환(종료)
    if (head === id) return obj;
    // recursive case
    // 그렇지 않은 경우(head !== id) 순회를 계속한다(Loop -Ing)
    // 해당 객체가 children 속성을 가지는 경우, 탐색할 객체들을 childeNodes 안에 추가해준다
    else if (Array.isArray(tail) && tail !== undefined) {
      childeNodes = [...childeNodes, ...tail];
    }
  }
  // childeNodes(queue)의 길이가 0이 될 때까지 재귀를 호출해준다
  if (childeNodes.length) return test2(childeNodes, id);
  // 입력받은 id를 가진 객체가 없을 경우, null을 리턴해야 합니다
  return null;
}

function test2(input,id){
  for(let el of input){
    if(el.id===id)return el
    if(el.children!==undefined){
      let temp=test2(el.children,id)
      if(temp)return temp
    }
  }
  return null
}



//! -----------------------------------------------------------------

/*
문제
간선들의 목록들을 받아 2차원 배열의 무향 그래프 매트릭스를 출력하는 함수를 작성해야 합니다. 입력값은 모두 2차원 배열이며, 배열의 인덱스를 그래프의 버텍스로 간주합니다.
첫 번째 입력값은 만드려는 매트릭스의 간선을 나타내었고, 두 번째 입력값은 삭제하려는 간선을 나타냅니다.

조건
각 간선은 2가지 정보를 담고 있습니다.

0번째: 간선의 시작 정점 (0 이상의 정수)
1번째: 간선의 도착 정점 (0 이상의 정수)
출력
2차원 배열의 무향 그래프를 출력하는 함수를 리턴해야 합니다.
주의 사항
두 번째 입력값의 삭제하려는 간선이 첫 번째 입력값에 없다면 무시합니다.
두 번째 입력값의 최대 버텍스는 첫 번째 입력값의 최대 버텍스와 동일합니다.
정점 0에서 정점 4로 이어주는 간선이 존재할 경우 정점 1, 2, 3도 존재합니다.
출력하는 버텍스의 개수는 입력값의 최대 버텍스 값을 초과하지 않습니다. (예: insertEdges의 최대 버텍스가 3이라면, 최대 크기가 3인 그래프입니다.)
반환하는 인접행렬은 2차원 배열이며, 행(row)는 바깥 배열, 열(column)은 안쪽 배열입니다.

let matrix = [[0, 0], [0, 0]]
matrix[0] === 0번째 행
matrix[0][0] === 0번째 행의 0번째 열
두 정점간의 간선의 유무는 0과 1로 표시합니다.

0: 두 정점간에 간선이 존재하지 않을 경우
1: 두 정점간에 간선이 존재할 경우
아래의 2차원 배열에서 세로축은 시작 정점, 가로축은 도착 정점입니다.
// matrix 예시
const matrix = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];
입출력 예시
const insertEdges = [
  [0, 3],
  [0, 2],
  [1, 3],
  [2, 1],
];
const removeEdges = [[1, 3], [1, 0]];
let output1 = test3(insertEdges, removeEdges);

console.log(output1);
/**
//  * [
//  *  [0, 0, 1, 1],
//  *  [0, 0, 1, 0],
//  *  [1, 1, 0, 0],
//  *  [1, 0, 0, 0]
//  * ]
 */

//  const insertEdges2 = [
//   [0, 2],
//   [2, 4],
//   [1, 3],
//   [2, 1],
// ];
// const removeEdges2 = [
//   [0, 3],
//   [2, 1],
//   [1, 0],
//   [4, 2]
// ];

// let output2 = test3(insertEdges2, removeEdges2);

// console.log(output2);
/**
 * [
 *  [0, 0, 1, 0, 0],
 *  [0, 0, 0, 1, 0],
 *  [1, 0, 0, 0, 0],
 *  [0, 1, 0, 0, 0],
 *  [0, 0, 0, 0, 0],
 * ]

*/
//!------------------------------------------------------
/*
문제
- 간선들의 목록들을 받아 2차원 배열의 
  무향 그래프 매트릭스를 출력하는 함수를 작성해야 합니다. 
  입력값은 모두 2차원 배열이며, 
  배열의 인덱스를 그래프의 버텍스로 간주합니다.
  첫 번째 입력값은 만드려는 매트릭스의 간선을 나타내었고, 
  두 번째 입력값은 삭제하려는 간선을 나타냅니다.
출력
- 2차원 배열의 무향 그래프를 출력하는 함수를 리턴해야 합니다.

*/
//!------------------------------------------------------

// directed graph (방향 그래프)
// unweighted (비가중치)
// adjacency matrix (인접 행렬)
// 이해를 돕기 위해 기존 배열의 인덱스를 정점으로 사용합니다 (0, 1, 2, ... --> 정점)

class GraphWithAdjacencyMatrix {
	constructor() {
		this.matrix = []; //2차원배열?
	}

	addVertex() {
        //버텍스를 추가합니다.
		const currentLength = this.matrix.length;
		for (let i = 0; i < currentLength; i++) {
			this.matrix[i].push(0); //[0]
		}
		this.matrix.push(new Array(currentLength + 1).fill(0)); // [[0]] => [[0,0],[0,0]] => [[0,0,0],[0,0,0],[0,0,0]] ......
	}

	// contains(vertex) {
  //   return this.matrix.length > vertex; // 있는지만 확인
	// }
// [[0, 1, 1], [0, 0, 1],[0, 0, 0]] 배열의 각 항이 from (점), from의 각 항들 to (점이 연결되어있나 아닌가 ) 
// from -> to 방향 ????
	addEdge(from, to) {
		const currentLength = this.matrix.length;
		if (from === undefined || to === undefined) {
			console.log("2개의 인자가 있어야 합니다.");
			return;
		}
        //TODO: 간선을 추가할 수 없는 상황에서는 추가하지 말아야 합니다.
		if 
      (from + 1> currentLength || to + 1> currentLength || from < 0 || to < 0) {
			console.log("범위가 매트릭스 밖에 있습니다.");
			return;
		} this.matrix[from][to] = 1; //[0] => 간선없음, [1] => 간선있음
      this.matrix[to][from] = 1;
      console.log("확인용")
        //TODO: 간선을 추가해야 합니다.
	} 

	// hasEdge(from, to) {
  //   return this.matrix[from][to] === 1
	// 	//TODO: 두 버텍스 사이에 간선이 있는지 확인합니다.
	// }

	removeEdge(from, to) {
    console.log("확인용", from, to)
		const currentLength = this.matrix.length;
		if (from === undefined || to === undefined) {
			console.log("2개의 인자가 있어야 합니다.");
			return;
		}
        //TODO: 간선을 지울 수 없는 상황에서는 지우지 말아야 합니다.
		if (from + 1 > currentLength || to + 1 > currentLength || from < 0 || to < 0) {
      return
		}
        //TODO: 간선을 지워야 합니다.
      this.matrix[from][to] = 0
      this.matrix[to][from] = 0
	}
}
function test3(insertEdges, removeEdges) {
  const adjMatrix = new GraphWithAdjacencyMatrix();
  let vertex = isVertexCount(insertEdges);
  for (let i = 0; i <= vertex; i++) {
    adjMatrix.addVertex();
  }
  insertEdges.forEach((arr) => adjMatrix.addEdge(arr[0], arr[1]));
  removeEdges.forEach((arr) => adjMatrix.removeEdge(arr[0], arr[1]));

  return adjMatrix.matrix;
}

const isVertexCount = (edges) => {
  let max = 0;
  edges.forEach((arr) => {
    arr.forEach((n) => {
      if (max < n) {
        max = n;
      }
    });
  });
  return max
};