import React, { useEffect, useState } from 'react';
import { ApiComponent } from 'apiComponent';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'Header';
import MovieList from 'MovieList';
import Cast from 'Cast';
import Reviews from 'Reviews';
import Search from 'Search';

const apiComponent = new ApiComponent();
const CurrentMoviePageLazy=lazy(()=>import("CurrentMoviePage"));

export default function App() {

  const [movies, setMovies] = useState([]);
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [query, setQuery] = useState("");
  const [currentInput, setCurrentInput] = useState('');
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);

  useEffect(() => {
    apiComponent.fetchMoviesbyName1("", apiComponent.links.trendingUrl)
      .then(data => {
        data.results.filter(movie => movie.poster_path !== null).map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          return movie;
        });
        setMovies(data.results);
        setTrandingMovies(data.results);
        setLoadMoreIsVisible(true);
        if (localStorage.getItem("current_movie") !== null)
          setCurrentMovie(JSON.parse(localStorage.getItem("current_movie")));
      }
      )
      .catch();

  }, [])

  const onClickMovie = async (movie) => {
    await localStorage.setItem("current_movie", JSON.stringify(movie));
    await setCurrentMovie(movie);

  }

  const handleLoadMore = async () => {
    apiComponent.page = apiComponent.page + 1;

    await apiComponent.fetchMoviesbyName1(currentInput, apiComponent.links.trendingUrl)
      .then(data => {
        data.results.filter(movie => movie.poster_path !== null).map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          return movie;
        });
        setTrandingMovies([...trandingMovies, ...data.results])
      })
      .catch();
  }

  const handleLoadMoreForSearch = async () => {
    apiComponent.page = apiComponent.page + 1;

    var moviesTemp;
    var page;

    await apiComponent.fetchMoviesbyName1(currentInput, apiComponent.links.searchMovieUrl)
      .then(data => {
        data.results.filter(movie => movie.poster_path !== null).map(movie => {
          movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
          return movie;
        });
        setMovies([...movies, ...data.results])
        moviesTemp = data.total_pages;
        page = data.page;
      })
      .catch();

    if (page < moviesTemp) {
      setLoadMoreIsVisible(true);
    } else setLoadMoreIsVisible(false)
  }

  const onClickSubmit = async evt => {
    evt.preventDefault();

    apiComponent.page = 1;
    var moviesTemp;

    try {
      const data = await apiComponent.fetchMoviesbyName1(query, apiComponent.links.searchMovieUrl);

      const updatedMovies = data.results
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => ({
          ...movie,
          smallImageFullPath: `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`,
          largeImageFullPath: `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`,
        }));

      moviesTemp = data.total_pages;
      setMovies(updatedMovies);
      setCurrentInput(query);
    } catch (error) {
    }

    if (apiComponent.page < moviesTemp) {
      setLoadMoreIsVisible(true);
    } else setLoadMoreIsVisible(false)

  }

  return (<Suspense fallback={<CirclesWithBar
    height="100"
    width="100"
    color="#4fa94d"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    outerCircleColor=""
    innerCircleColor=""
    barColor=""
    ariaLabel='circles-with-bar-loading'
    position="absolute"
    top= "50%"
    left="50%"
    style={{ transform: 'translate(-50%, -50%)' }}
  />}>

  <Routes>
    <Route path='/' element={<Header />}>
      <Route path="home" element={<MovieList movies={trandingMovies} click={onClickMovie} loadMoreIsVisible={loadMoreIsVisible} loadMore={handleLoadMore} />} />
      <Route path="search" element={<Search movies={movies} onClickSubmit={onClickSubmit} click={onClickMovie} loadMore={handleLoadMoreForSearch} loadMoreIsVisible={loadMoreIsVisible} query={evt => setQuery(evt.target.value)} />}></Route>
      <Route path='search/:id' element={<CurrentMoviePageLazy movie={currentMovie} />}>
        <Route path={'cast'} element={<Cast movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'reviews'} element={<Reviews movie={currentMovie} apiComponent={apiComponent} />} />
      </Route>
      <Route path='home/:id' element={<CurrentMoviePageLazy movie={currentMovie} />}>
        <Route path={'cast'} element={<Cast movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'reviews'} element={<Reviews movie={currentMovie} apiComponent={apiComponent} />} />
      </Route>
    </Route>

  </Routes></Suspense>
  );

}