import { useState, useEffect } from "react";
import './styles.css'

const Videos = ({ movie, apiComponent }) => {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function fetchMovieInfo() {
            if (movie.media_type === 'movie') {
                const video = await apiComponent.fetchMoviesById(movie.id, apiComponent.links.details, apiComponent.params.videos);
                const availableVideos = video.results.filter(video => video.name.includes("removed") !== true)
                setVideo(availableVideos);
            } else if (movie.media_type === 'tv') {
                const video = await apiComponent.fetchMoviesById(movie.id, apiComponent.links.seriesDetails, apiComponent.params.videos);
                const availableVideos = video.results.filter(video => video.name.includes("removed") !== true)
                setVideo(availableVideos);
            }

        }

        fetchMovieInfo();
    }, [apiComponent, movie.id, movie.media_type]);


    return (<>
        <ul className="videos-container">
            {video ? video.map(video => {
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