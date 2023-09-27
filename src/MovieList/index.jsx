import './styles.css'
import { Link } from 'react-router-dom'

const MovieList = ({ movies, click, loadMore }) => {
    return (<div className="movies-list-container">
        <h1 className="movies-list-title">Tranding now</h1>
        <ul className="movies-list">
            {movies.map(movie => {
                return (<li className="movie-item" key={movie.id} onClick={() => click(movie)} >
                    <Link to={`/${movie.id}`}>
                        <img src={movie.smallImageFullPath} alt="" />
                        <h3>{movie.title ?? movie.name}</h3>
                    </Link>
                </li>)
            })}</ul>
        <button className="load-more-button" type="button" onClick={loadMore}>Load more</button>
    </div>)
}

export default MovieList