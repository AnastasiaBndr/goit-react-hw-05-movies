import { useState, useEffect } from "react";
import './styles.css'

const Videos = ({ movie, apiComponent }) => {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function fetchMovieInfo() {
            const video = await apiComponent.fetchMoviesById(movie.id, apiComponent.links.details, apiComponent.params.videos);

            setVideo(video);
        }

        fetchMovieInfo();
    }, [apiComponent, movie.id]);


    return (<>
        <ul className="videos-container">
            {video ? video.results.map(video => {
                return (
                    <li className="video-item" key={video.id}>
                        <p className="author">{video.name}</p>
                        <iframe width="420" height="315" title={video.name}
                            src={`https://www.youtube.com/embed/${video.key}`}>
                        </iframe>
                    </li>)
            }) : <p>No videos yet..</p>}</ul>

    </>)
}

export default Videos;