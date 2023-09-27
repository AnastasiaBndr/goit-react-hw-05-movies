import { useState, useEffect } from "react";
import './styles.css';

const Cast = ({ movie, apiComponent }) => {
    const [fullMovieInfo, setFullMovieInfo] = useState(null);

    useEffect(() => {
        async function fetchMovieInfo() {
            const movieInfo = await apiComponent.findMovieById(movie.id);

            const updatedCast = movieInfo.cast.map(actor => {
                if (actor.profile_path !== null) {
                    actor.ImageFullPath = `https://image.tmdb.org/t/p/w200${actor.profile_path}?api_key=${apiComponent.getkey()}`;
                } else {
                    actor.ImageFullPath = 'http://localhost:3000/goit-react-hw-05-movies/static/media/profile_image_not_found.d3395e8a7ba4b7bc3a15.jpg';
                }
                return actor;
            });

            movieInfo.cast = updatedCast;

            setFullMovieInfo(movieInfo);
            console.log(movieInfo);
        }

        fetchMovieInfo();
    }, [apiComponent, movie.id]);

    return (<>{fullMovieInfo ? <ul className="cast-container">
        {fullMovieInfo.cast.map(actor => {
            return (
                <li className="cast-element" key={actor.id}>
                    <img className="actor-profile-picture"
                        src={actor.ImageFullPath} alt={actor.name} />

                    <p>"{actor.character}"</p>
                    <p>{actor.name}</p>
                </li>)
        })}
    </ul> : <p>No cast info(</p>}</>)
}

export default Cast;