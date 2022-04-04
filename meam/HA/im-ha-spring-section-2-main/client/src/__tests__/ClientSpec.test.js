import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils'; // ES6

import MovieRankListEntry from '../MovieRankListEntry';
import MovieRankList from '../MovieRankList';
import CurrentMovie from '../CurrentMovie';
import * as Api from '../api/movieDataApi';
import nock from 'nock';

import { App } from '../App';

// 테스트 통과를 위해 mockup 데이터를 참고하세요.
import mockMovie from '../mockMovie';

describe('MovieRankListEntry test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<MovieRankListEntry movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
    cleanup();
  });

  test('props로 전달받은 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(
      mockMovie[0].title
    );
  });

  test('props로 전달받은 영화의 평점을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.rating')
        .innerHTML.includes(mockMovie[0].rating.toString())
    ).toEqual(true);
  });

  test('props로 전달받은 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.running-time')
        .innerHTML.includes(mockMovie[0].runtime.toString())
    ).toEqual(true);
  });

  test('props로 전달받은 영화의 장르들을 표현해야 합니다.', () => {
    expect(container.querySelectorAll('.tag').length).toEqual(
      mockMovie[0].genres.length
    );
  });

  test('각각의 genre를 key로 지정하여 genres.map을 실행해야 합니다.', async function () {
    const cards = container.querySelectorAll('.tag');
    let genre;

    for (let i = 0; i < Object.keys(cards).length; i++) {
      cards[i].addEventListener('mouseover', (e) => {
        genre = e.target[Object.keys(e.target)[0]].key;
      });

      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

      expect(genre).toEqual(mockMovie[0].genres[i].toString());
    }
  });
});

describe('MovieRankList test', () => {
  let container;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(<MovieRankList movies={[]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
    cleanup();
  });

  test('props로 빈 배열을 받은 경우, MovieRankListEntry가 존재하면 안됩니다.', () => {
    expect(container.querySelectorAll('.card').length).toEqual(0);
  });

  test('props로 빈 배열을 받은 경우, 리스트 대신 `영화 목록이 비었습니다` 라는 문구를 표시해야 합니다.', () => {
    expect(
      container
        .querySelector('.right-movie-list')
        .innerHTML.includes('영화 목록이 비었습니다')
    ).toEqual(true);
  });

  test('props에 담긴 영화정보의 갯수 만큼 MovieRankListEntry를 렌더링해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList movies={mockMovie} />, container);
    });
    expect(container.querySelectorAll('.card').length).toEqual(2);
  });

  test('MovieRankListEntry를 여러개 출력할 때, 고유의 key를 가지고 있어야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList movies={mockMovie} />, container);
    });

    const cards = container.querySelectorAll('.card');
    let id;

    for (let i = 0; i < Object.keys(cards).length; i++) {
      cards[i].addEventListener('mouseover', (e) => {
        id = e.target[Object.keys(e.target)[0]].return.key;
      });

      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      expect(id).toEqual(mockMovie[i].id.toString());
    }
  });
});

describe('CurrentMovie test', () => {
  let container;
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<CurrentMovie movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
    cleanup();
  });

  test('props로 전달받은 현재 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(
      mockMovie[0].title
    );
  });

  test('props로 전달받은 현재 영화의 포스터(medium 사이즈)를 표현해야 합니다.', () => {
    expect(container.querySelector('img').src).toEqual(
      mockMovie[0].medium_cover_image
    );
  });

  test('props로 전달받은 현재 영화의 평점을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.rating')
        .innerHTML.includes(mockMovie[0].rating.toString())
    ).toEqual(true);
  });

  test('props로 전달받은 현재 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.running-time')
        .innerHTML.includes(mockMovie[0].runtime.toString())
    ).toEqual(true);
  });

  test('props로 전달받은 현재 영화의 설명을 표현해야 합니다.', () => {
    expect(container.querySelector('.description').innerHTML).toEqual(
      mockMovie[0].description_full
    );
  });

  test('영화 정보를 넘기지 않으면, `영화를 선택하세요`라는 메시지를 표시해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    });

    expect(container.innerHTML.includes('영화를 선택하세요')).toEqual(true);
  });

  test('아무런 영화 정보를 넘기지 않아도 렌더링할 때에 문제가 없어야 합니다.', () => {
    expect(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    }).not.toThrow();
  });
});

describe('App test', () => {
  const container = document.createElement('div');

  afterEach(() => {
    jest.clearAllMocks();
    ReactDOM.unmountComponentAtNode(container);
    cleanup();
  });

  test('`현재 선택한 영화`라는 상태와 `영화 목록`은 상태로 다뤄져야 합니다.', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState').mockImplementation((init) => {
      return [init, setState];
    });

    render(<App />, { container });

    expect(useStateSpy).toBeCalled();
    useStateSpy.mockRestore();
  });

  test('영화 목록 클릭 시, 현재 영화정보를 업데이트해야 합니다.', () => {
    const { container } = render(<App />);
    const cards = container.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const title = card.querySelector('.title');
      userEvent.click(card);
      const currentMovieCointainer = container.querySelector('.current-movie');
      expect(currentMovieCointainer.querySelector('.title').textContent).toBe(title.textContent);
    }
  });

  test('mockMovie 대신, 직접 REST API를 호출하도록 바꿉니다', (done) => {
    const result = [
      { id: 8462, url: 'https://yts.lt/movie/avengers-infinity-war-2018', title: 'Avengers: Infinity War', year: 2018, rating: 8.5, runtime: 149, genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Sci-Fi'], summary: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.', description_full: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment, the fate of Earth and existence has never been more uncertain.', small_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/avengers_infinity_war_2018/large-cover.jpg' },
      { id: 13106, url: 'https://yts.lt/movie/avengers-endgame-2019', title: 'Avengers: Endgame', year: 2019, rating: 8.5, runtime: 181, genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'], summary: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...", description_full: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...", small_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/avengers_endgame_2019/large-cover.jpg' },
      { id: 7548, url: 'https://yts.lt/movie/den-of-thieves-2018', title: 'Den of Thieves', year: 2018, rating: 7, runtime: 148, genres: ['Action', 'Crime', 'Drama', 'Mystery', 'Thriller'], summary: "A gritty L.A crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan an impossible heist on the Federal Reserve Bank of downtown Los Angeles.", description_full: "A gritty L.A crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan an impossible heist on the Federal Reserve Bank of downtown Los Angeles.", small_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/small-cover.jpg', medium_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/medium-cover.jpg', large_cover_image: 'https://yts.lt/assets/images/movies/den_of_thieves_2018/large-cover.jpg' }
    ];

    const scope = nock('https://okie249pmk.execute-api.ap-northeast-2.amazonaws.com')
      .persist()
      .get('/movies')
      .reply(200, result);

    Api.getMovies()
      .then((json) => {
        expect(json).toEqual(result);
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).toEqual(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).toEqual(200);
        done();
      });
  });
});
