import { useState, useEffect } from 'react';
import Header from './Header';
import MovieRankList from './MovieRankList';
import CurrentMovie from './CurrentMovie';

// 기본값으로 주어지는 영화 목록은 다음을 이용하세요.
import mockMovie from './mockMovie';
import { getMovies } from './api/movieDataApi';

export const App = () => {
  const [thisMovies, setThisMovies] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((data) => {
      setMovies(data);
      setThisMovies(data[0]);
    });
  }, []);
  const handleCardClick = (movie) => {
    // TODO: 현재 선택한 영화가 바뀌어야 합니다
    setThisMovies(movie);
  };

  if (!movies) return <div>loading ...</div>;
  global.handleCardClick = handleCardClick; // 이 코드는 테스트를 위한 코드입니다. 실행에는 지장이 없지만, 지우면 테스트를 통과하지 않을 수 있습니다.

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <CurrentMovie movie={thisMovies} />
        <MovieRankList handleCardClick={handleCardClick} movies={movies} />
      </div>
    </>
  );
};
