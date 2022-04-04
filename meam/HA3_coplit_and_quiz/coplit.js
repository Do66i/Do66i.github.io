/*
! 01_test01
문제
가로의 길이는 A cm, 세로의 길이는 B cm인 직사각형 모양의 색종이를 남김 없이 똑같은 크기의 정사각형 모양으로 자르려고 합니다. 정사각형의 크기가 가장 크려면 정사각형 한 변은 몇 cm가 되어야 하는지 구하는 함수를 작성하세요.
만약, 가로의 길이가 20 cm이고 세로의 길이가 8 cm이라고 가정했을 때, 가장 큰 정사각형의 변은 4 cm입니다.

입력
인자: A
number 타입의 A
1 <= A <= 1,000,000
인자: B
number 타입의 B
1 <= B <= 1,000,000
출력
number 타입의 정사각형 한 변의 길이를 출력해야 합니다.
입출력 예시
가로 20, 세로 8이 주어졌을 때, 최대 4의 길이를 가진 정사각형 타일을 가질 수 있습니다.
const output1 = test1(20, 8);
console.log(output1); // --> 4

가로 18, 세로 27이 주어졌을 때, 최대 9의 길이를 가진 정사각형 타일을 가질 수 있습니다.
const output2 = test1(18, 27);
console.log(output2); // --> 9
*/

let test1 = (num1, num2) => {
  let gcd = 1;

  for (let i = 2; i <= Math.min(num1, num2); i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      gcd = i;
    }
  }

  return gcd;
};

/*
! 02_test02
문제
1, 2, 3으로만 이루어진 수열 바코드를 만들던 코드스테이츠는 물건의 가짓수가 늘어나자, 기존과는 다른 새로운 수열 바코드를 만드는 알고리즘을 다시 만들고자 합니다.
1부터 N까지의 자연수 중에서 중복 없이 M개를 고른 수열이어야 하고, 길이가 M이어야 한다고 할 때, 만들 수 있는 바코드를 전부 배열에 담아 반환하는 함수를 작성하세요.

조건
수열은 사전 순으로 증가하는 순서로 출력해야 합니다.
바코드는 숫자로 반환해야 합니다.
입력
인자 1: n
Number 타입의 1 이상 10 이하의 자연수
인자 2: m
Number 타입의 1 이상 n 이하의 자연수
출력
숫자(Number) 목록이 담긴 배열을 리턴해야 합니다.
입출력 예시
// 모든 바코드는 같은 숫자가 있으면 안 됩니다.

// N이 2이고 M이 1일 때, 1, 2를 사용하여 1의 길이에 맞는 바코드를 만들어야 합니다.
const output1 = test2(2, 1);
console.log(output1); // --> [1, 2]

// N이 3이고 M이 2일 때, 1, 2, 3을 사용하여 2의 길이에 맞는 바코드를 만들어야 합니다.
const output2 = test2(3, 2);
console.log(output2); // --> [12, 13, 21, 23, 31, 32]

// N이 3고 M이 3일 때 1, 2, 3을 사용하여 3의 길이에 맞는 바코드를 만들어야 합니다.
const output3 = test2(3, 3);
console.log(output3); // --> [123, 132, 213, 231, 312, 321]
*/

function test2(n, m) {
  let arr = Array.from({ length: n }, (_, idx) => idx + 1);

  function permu(arr, m) {
    const results = [];

    if (m === 1) {
      return arr.map((element) => [element]);
    }

    arr.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const permutations = permu(rest, m - 1);
      const attached = permutations.map((permutation) => [fixed, ...permutation]);

      results.push(...attached);
    });

    return results;
  }

  let result = permu(arr, m);
  return result.map((el) => parseInt(el.join("")));
}

/*
! 03_test03
test3
문제
저번에 이어, 또다시 N * N의 크기를 가진 보드판 위에서 게임을 하려고 합니다. 그러나, 게임의 룰은 저번과 조금 달라졌습니다.

좌표 왼쪽 상단(0, 0)에 말을 놓는다.
말은 상, 하, 좌, 우로 이동할 수 있고, 플레이어가 조작할 수 있다.
조작의 기회는 딱 한 번 주어진다.
조작할 때 U, D, L, R은 각각 상, 하, 좌, 우를 의미하며 한 줄에 띄어쓰기 없이 써야 한다.
예시: UDDLLRRDRR, RRRRR
한 번 움직일 때마다 한 칸씩 움직이게 되며, 그 칸 안의 요소인 숫자를 획득할 수 있다.
방문한 곳을 또 방문해도 점수를 획득할 수 없다.
말은 보드 밖으로 나갈 수 없으며, 해당 조작은 무효가 된다.
예시: 2*2 보드판에서 UD를 조작한다면, U는 무효가 되고, D부터 시작한다.
칸 안의 숫자는 0부터 100,000 중에 하나이다.
음수는 없습니다.
획득한 숫자를 합산하여 숫자가 제일 큰 사람이 이기게 된다.
주의사항
처음 말을 (0, 0) 좌표에 놓았을 때 안에 들은 숫자는 계산에 포함하지 않습니다. 두 번째로 (0, 0) 좌표를 밟았을 때만 계산합니다.
보드판이 담긴 board와 조작하려고 하는 문자열 operation이 주어질 때, 말이 해당 칸을 지나가면서 획득한 숫자의 합을 구하는 함수를 작성하세요.

입력
인자 1: board
number 타입의 2차원 배열
2 <= board.length <= 1,000
예: [ [0, 22, 4], [1, 3, 0], [0, 99, 2] ]
인자 2: operation
string 타입의 대문자 영어가 쓰여진 문자열

1 <= operation.length <= board.length * 10

U, L, D, R 이외의 문자열은 없습니다.
출력
Number 타입을 반환해야 합니다.
board와 operation이 입력값의 예시 ([ [0, 22, 4], [1, 3, 0], [0, 99, 2] ], DDR)일 때, (0, 0) -> (1, 0) -> (2, 0) -> (2, 1) 순서로 이동하게 되고, 각 0, 1, 0, 99를 얻어 100을 반환합니다.
입출력 예시
const board1 = [
  [72, 0, 80, 1],
  [1, 9, 11, 10],
  [1, 1, 792, 0],
  [13, 44, 27, 0]
]
const output1 = boardGame(board1, 'RRDLLD');
console.log(output1); // 102


const board2 = [
  [567, 6734, 132],
  [789, 243, 6],
  [89, 33333, 0]
]
const output2 = boardGame(board2, 'UUUDD'
console.log(output2); // 878

const board3 = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
]
const output3 = boardGame(board3, 'DDRRRUDUDUD');
console.log(output3); // 0
 */

function test3(board, operation) {
  let [row, col] = [0, 0];
  let result = 0;

  const R = board.length;
  const C = board[0].length;

  const isValid = (x, y) => x >= 0 && x < R && y >= 0 && y < C;

  for (let i = 0; i < operation.length; i++) {
    let prev = [row, col];
    if (operation[i] === "D") row++;
    else if (operation[i] === "U") row--;
    else if (operation[i] === "L") col--;
    else if (operation[i] === "R") col++;
    if (isValid(row, col)) {
      result += board[row][col];
      board[row][col] = 0;
    } else [row, col] = prev;
  }

  return result;
}
