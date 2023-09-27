import { Outlet, Link } from "react-router-dom";
import './styles.css';

const CurrentMoviePage = ({ movie }) => {


    return (<div className="movie-page-container">
        <img className="movie-large-image-item" src={movie.largeImageFullPath} alt={movie.name ?? movie.title} />
        <div className="description">
            <h1>{movie.name ?? movie.title} / {movie.original_name ?? movie.original_title}</h1>

            <p>{movie.overview}</p>
            <p>Language: {movie.original_language}</p>
            <p>First air date: {movie.first_air_date}</p>
            <p>Country: {movie.origin_country}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Vote average:  {movie.vote_average}</p>


            <Link to={"/goit-react-hw-05-movies/" + movie.id + "/cast"}><h3>Cast</h3></Link>
            <Outlet />
        </div>
    </div>);
}

export default CurrentMoviePage;