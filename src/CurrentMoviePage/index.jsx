import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import { useRef } from "react";
import './styles.css';

const CurrentMoviePage = ({ movie }) => {
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from ?? "/search");


    return (<><Link to={backLinkLocationRef.current}><button className="go-back-button">Go back</button></Link>
        <div className="movie-page-container">
            <img className="movie-large-image-item" src={movie.largeImageFullPath} alt={movie.name ?? movie.title} />
            <div className="description">
                <h1>{movie.name ?? movie.title} / {movie.original_name ?? movie.original_title}</h1>
                {console.log(movie)}
                <p>{movie.overview}</p>
                <p>Language: {movie.original_language}</p>
                <p>First air date: {movie.first_air_date}</p>
                <p>Country: {movie.origin_country}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>Vote average:  {movie.vote_average}</p>

                <nav className="movie-page-navigation">
                    <NavLink className="movie-links-item" to={"cast"}>
                        <h3>Cast</h3></NavLink>
                    <NavLink className="movie-links-item" to={"reviews"}>
                        <h3>Reviews</h3>
                    </NavLink>
                    <NavLink className="movie-links-item" to={"videos"}>
                        <h3>Videos</h3>
                    </NavLink>
                </nav>

                <Outlet />
            </div>
        </div></>);
}

export default CurrentMoviePage;