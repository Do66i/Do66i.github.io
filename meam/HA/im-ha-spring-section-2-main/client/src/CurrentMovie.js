import React from 'react';

export default function CurrentMovie({ movie }) {
  if (!movie) return '영화를 선택하세요';

  const { description_full, runtime, rating, title, medium_cover_image } =
    movie;
  return (
    <>
      <div className="left-current-side">
        <div className="current-movie">
          <h1 className="title">{title}</h1>
          <img className="thumbnail" src={medium_cover_image} alt="thumbnail" />
          <p className="rating">rating : {rating}</p>
          <p className="running-time">runtime : {runtime}</p>
          <p>Description</p>
          <p className="description">{description_full}</p>
        </div>
      </div>
    </>
  );
}
