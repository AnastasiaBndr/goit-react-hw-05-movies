import React, { useEffect, useState } from 'react';
import { ApiComponent } from 'apiComponent';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'Header';
import MovieList from 'MovieList';
import Cast from 'Cast';
import Reviews from 'Reviews';
import Search from 'Search';
import Videos from 'Videos';

const apiComponent = new ApiComponent();
const CurrentMoviePageLazy = lazy(() => import("CurrentMoviePage"));


export default function App() {

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [loadMoreForSearchVisible, setLoadMoreForSearchVisible] = useState(true);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search);
    if (initialQuery) {
      apiComponent.fetchMoviesbyName(initialQuery.get('query'), apiComponent.links.searchMovieUrl)
        .then(data => {
          data.results.filter(movie => movie.poster_path !== null).map(movie => {
            movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`;
            movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`;
            return movie;
          });
          setSearchMovies(data.results);
          setLoadMoreIsVisible(true);
        }
        )
        .catch();
    }
    apiComponent.fetchMoviesbyName("", apiComponent.links.trendingUrl)
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

    await apiComponent.fetchMoviesbyName(currentInput, apiComponent.links.trendingUrl)
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

    await apiComponent.fetchMoviesbyName(currentInput, apiComponent.links.searchMovieUrl)
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
      setLoadMoreForSearchVisible(true);
    } else setLoadMoreForSearchVisible(false)
  }

  const onClickSubmit = async evt => {
    evt.preventDefault();

    localStorage.setItem('searchParams', searchParams.get('query'));
    apiComponent.page = 1;
    var moviesTemp;

    try {
      const data = await apiComponent.fetchMoviesbyName(searchParams.get('query'), apiComponent.links.searchMovieUrl);
      const updatedMovies = data.results
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => ({
          ...movie,
          smallImageFullPath: `https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${apiComponent.getkey()}`,
          largeImageFullPath: `https://image.tmdb.org/t/p/w400${movie.poster_path}?api_key=${apiComponent.getkey()}`,
        }));

      moviesTemp = data.total_pages;
      setSearchMovies(updatedMovies);
      setMovies(updatedMovies);
      setCurrentInput(searchParams.get('query'));
      localStorage.setItem("search-movies", JSON.stringify(updatedMovies));
    } catch (error) {
    }

    if (apiComponent.page < moviesTemp) {
      setLoadMoreIsVisible(true);
    } else setLoadMoreIsVisible(false)

  }

  const updateQueryString = evt => {
    if (evt.target.value === null)

      setSearchParams("");
    else setSearchParams({ query: evt.target.value });
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
    top="50%"
    left="50%"
    style={{ transform: 'translate(-50%, -50%)' }}
  />}>

    <Header />
    <Routes>
      <Route path="/" element={<MovieList movies={trandingMovies} click={onClickMovie} loadMoreIsVisible={loadMoreIsVisible} loadMore={handleLoadMore} />} />
      <Route path="search" element={
        <Search movies={searchMovies}
          onClickSubmit={onClickSubmit}
          inputValue={searchParams.get('query')}
          click={onClickMovie}
          loadMore={handleLoadMoreForSearch}
          loadMoreIsVisible={loadMoreForSearchVisible}
          query={updateQueryString}
          searchParams={searchParams.get('query')} />}></Route>
      <Route path='search/:id' element={<CurrentMoviePageLazy movie={currentMovie} />}>
        <Route path={'cast'} element={<Cast movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'reviews'} element={<Reviews movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'videos'} element={<Videos movie={currentMovie} apiComponent={apiComponent} />} />
      </Route>
      <Route path='movies/:id' element={<CurrentMoviePageLazy movie={currentMovie} />}>
        <Route path={'cast'} element={<Cast movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'reviews'} element={<Reviews movie={currentMovie} apiComponent={apiComponent} />} />
        <Route path={'videos'} element={<Videos movie={currentMovie} apiComponent={apiComponent} />} />
      </Route>


    </Routes></Suspense>
  );

}