import axios from 'axios';
import Notiflix from 'notiflix';

export class ApiComponent {
  #URL = 'https://api.themoviedb.org/3/trending/all/week?';
  #KEY = 'a4db5bd7e9aa1cc430af00c5a056d010';

  limit = 20;
  page = 1;
  getkey() {
    return this.#KEY;
  }

  baseSearchParams = {
    api_key: this.#KEY,
  };

  fetchMovies(query) {
    const searchParams = new URLSearchParams({
      ...this.baseSearchParams,
      query: query,
      page: this.page,
    });
    return axios
      .get(`${this.#URL + searchParams.toString()}`)
      .then(resp => {
        console.log(this.#URL + searchParams.toString());
        return resp.data;
      })
      .catch(err =>
        Notiflix.Report.failure(
          'Server Error!',
          'There is something wrong..',
          'Okaaay'
        )
      );
  }

  async findMovieById(id) {
    const currentUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
      this.#KEY
    }`;

    return await axios
      .get(currentUrl)
      .then(resp => {
        return resp.data;
      })
      .catch(err => {});
  }
}
