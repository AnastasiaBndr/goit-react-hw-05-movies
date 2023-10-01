import './styles.css';
import SearchIcon from './icons.svg';
import { Link, useLocation } from 'react-router-dom'


const Search = ({movies, click, loadMore, onClickSubmit,query,loadMoreIsVisible, inputValue }) => {
    
    const location = useLocation();

    return (<div className="movies-list-container">
        <form className="SearchForm" onSubmit={onClickSubmit}>
            <button type="button" className="SearchForm-button" onClick={onClickSubmit}>
                <span className="button-label">
                    <img src={SearchIcon} alt="Search" width="24" height="24" />
                </span>
            </button>

            <input
                className="SearchForm-input"
                type="text"
                value={inputValue ?? ""}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={query}
            />
        </form>
        <h1 className="movies-list-title-movies-search movies-list-title"> </h1>
        <ul className="movies-list">
            {movies.map(movie => {
                return (<li className="movie-item" key={movie.id} onClick={() => click(movie)} >
                    <Link to={movie.id+""} state={{from:location}}>
                        <img src={movie.smallImageFullPath} alt="" />
                        <h3>{movie.title ?? movie.name}</h3>
                    </Link>
                </li>)
            })}</ul>
        {loadMoreIsVisible && <button className="load-more-button" type="button" onClick={loadMore}>Load more</button>}
    </div>)
}

export default Search;