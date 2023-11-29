import axios from 'axios';

export class ApiComponent {
  #URL = 'https://api.themoviedb.org/3/trending/all/week?';
  #KEY = 'a4db5bd7e9aa1cc430af00c5a056d010';

  limit = 20;
  page = 1;

  links = {
    trendingUrl: 'https://api.themoviedb.org/3/trending/all/week?',
    searchMovieUrl: 'https://api.themoviedb.org/3/search/movie',
    credits: 'https://api.themoviedb.org/3/credit/credit_id',
    reviews: 'https://api.themoviedb.org/3/movie/reviews',
    details: 'https://api.themoviedb.org/3/movie/',
    seriesDetails: 'https://api.themoviedb.org/3/tv/',
  };

  params = {
    reviews: '/reviews',
    credits: '/credits',
    videos: '/videos',
  };

  getkey() {
    return this.#KEY;
  }

  baseSearchParams = {
    api_key: this.#KEY,
  };

  fetchMoviesbyName(query, url) {
    const options = {
      method: 'GET',
      url: url,
      params: {
        query: query,
        page: this.page,
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  fetchMoviesById(id, url, param) {
    const options = {
      method: 'GET',
      url: url + id + param,
      params: {
        page: this.page,
      },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        console.log(options.url);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
