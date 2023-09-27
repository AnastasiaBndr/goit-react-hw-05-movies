import React, { useEffect, useState } from 'react';
import { ApiComponent } from 'apiComponent';
import { Route, Routes } from 'react-router-dom';
import Header from 'Header';
import MovieList from 'MovieList';
import CurrentMoviePage from 'CurrentMoviePage';
import Cast from 'Cast';

const apiComponent = new ApiComponent();

export default function App() {

  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(JSON.parse(localStorage.getItem("movie_id")));

  useEffect(() => {
    apiComponent.fetchMovies("")
      .then(data => {
        data.results.map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          return movie;
        });
        setMovies(data.results);
      }
      )
      .catch();
  }, [])

  const onClickMovie = async (movie) => {
    await localStorage.setItem("movie_id", JSON.stringify(movie));
    await setCurrentMovie(movie);

  }

  const handleLoadMore = async () => {
    apiComponent.page = apiComponent.page + 1;

    await apiComponent.fetchMovies("")
      .then(data => {
        data.results.map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          return movie;
        });
        setMovies([...movies, ...data.results])
      })
      .catch();
  }

  return (<Routes>
    <Route path='/' element={<Header />}>
      <Route path="movies" element={<MovieList movies={movies} click={onClickMovie} loadMore={handleLoadMore} />} />
      {currentMovie.id &&
        <Route path={currentMovie.id + ""} element={<CurrentMoviePage movie={currentMovie} />}>
          <Route path={'cast'} element={<Cast movie={currentMovie} apiComponent={apiComponent} />} />
          <Route path={'fgfg'} element={<></>} />
        </Route>}
    </Route>

  </Routes>
  );

}