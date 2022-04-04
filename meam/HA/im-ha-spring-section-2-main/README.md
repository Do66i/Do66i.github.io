# Section 2: Hiring Assessment

![ha2](https://user-images.githubusercontent.com/61301574/119817745-4d841c00-bf29-11eb-9d80-ed9152817613.gif)

이번 Section 2: Hiring Assessment 주제는 Full Stack으로 영화 정보를 보여주는 애플리케이션을 만드는 것입니다.
클라이언트와 서버 각각 구현해야 할 요구사항이 아래 제공되어 있습니다.

## Getting Started

- `npm install`을 이용해 클라이언트 및 서버의 의존성 모듈(dependencies)를 설치할 수 있습니다.

- 서버 디렉토리(`./server`)와 클라이언트 디렉토리(`./client`)에서 서버의 통합 테스트를 진행할 수 있습니다.
  - 클라이언트 테스트: 클라이언트 디렉토리 `./client`에서 `npm test` 실행
  - 서버 테스트: 클라이언트 디렉토리 `./server`에서 `npm test` 실행

- 각 디렉토리에서 `npm run submit`으로 과제를 제출하세요.

## 클라이언트

- 기본적으로 React로 만들어진 앱이 존재하지만, 각 컴포넌트는 하드코딩되어 있는 데이터를 렌더링하고 있습니다.
- 하드코딩된 데이터들을 동적 렌더링으로 변경하세요.
- `npm start`를 이용해 앱을 열어볼 수 있습니다.
- `./client` 디렉토리 안에서 `npm test`로 테스트를 실행할 수 있습니다.
- HINT: 테스트 케이스를 참고해서, 각 컴포넌트가 요구하는 props를 파악하세요.

### Requirements

주어진 모든 테스트를 통과하세요.

1. 하드코딩되어 있는 각각의 컴포넌트가 동적으로 데이터를 받아 렌더링할 수 있도록 개선해야 합니다.
2. MovieRankList 컴포넌트는, movies 배열의 갯수만큼 MovieRankListEntry 컴포넌트를 표시해야 합니다.
3. 오른쪽 영화 목록 중 하나를 클릭했을 때, CurrentMovie의 데이터가 바뀔 수 있도록 구현해야 합니다.
4. 영화 데이터를 movieDataApi.js의 endpoint 주소로부터 받아와야 합니다.
5. 클라이언트 디렉토리 `./client`에서 `npm run submit`를 실행하여 주어진 시간 내에 HA를 제출해야 합니다.

> 과제를 전부 수행하지 못했더라도, 제출해주세요.
> 클라이언트와 서버 모두 제출하셔야 합니다.

## 서버

- `Controller`, `Service`, `Repository` 패키지 안에 인터페이스를 상속 받은 클래스를 작성하여야합니다. 
- 클래스에 역활을 고려하여 코드를 작성하여야합니다.
- `@Autowired`로 의존 관계를 작성하여야합니다. 
- `MoviesTest.java` 테스트 클래스를 실행하여 테스트 결과를 확인하세요.

### Requirements

주어진 모든 테스트를 통과하세요. 
다음과 같은 REST API를 구현해야 합니다.

| 메소드    | endpoint          | 설명                            |
| ------- | ----------------- | ------------------------------ |
| GET     | `/movies`         | 영화 목록을 전부 조회               |
| GET     | `/movies/{id}`    | id가 일치하는 한개의 영화 데이터만 조회 |

- 실제 응답을 위한 데이터는 `MoviesData.java` 클래스 내 `MoviesList` ArrayList 자료형으로 제공됩니다. 
- 서버의 요청을 클라이언트에서 처리할 수 있도록 만드는 것도 잊지 마세요.

`MoviesTest.java` 테스트 클래스를 실행하여 주어진 시간 내에 HA를 제출해야 합니다.

> 과제를 전부 수행하지 못했더라도, 제출해주세요.
> 클라이언트와 서버 모두 제출하셔야 합니다.
# im-ha-spring-section-2
