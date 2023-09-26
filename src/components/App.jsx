import React, { useEffect, useState } from 'react';
import { ApiComponent } from 'apiComponent';
import { Route, Routes } from 'react-router-dom';
import Header from 'Header';
import MovieList from 'MovieList';
import CurrentMoviePage from 'CurrentMoviePage';

const apiComponent = new ApiComponent();

export default function App() {

  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  useEffect(() => {
    apiComponent.fetchMovies("")
      .then(data => {
        data.results.map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`
        });
        setMovies(data.results)
      }
      )
      .catch();
  }, [])

  const onClickMovie = async (movie) => {
    await setCurrentMovie(movie)
  }

  const handleLoadMore = async () => {
    apiComponent.page = apiComponent.page + 1;

    await apiComponent.fetchMovies("")
      .then(data => {
        data.results.map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`
        });
        setMovies([...movies, ...data.results])
      })
      .catch();
  }

  return (<Routes>
    <Route path='/' element={<Header />}>
      <Route path="goit-react-hw-05-movies" element={<MovieList movies={movies} click={onClickMovie} loadMore={handleLoadMore} />} />
      {console.log(currentMovie)}
      <Route path={currentMovie.id + ""} element={<CurrentMoviePage movie={currentMovie} />} />
    </Route>

  </Routes>
  );

}