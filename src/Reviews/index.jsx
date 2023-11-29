import { useState, useEffect } from "react";
import './styles.css'

const Reviews = ({ movie, apiComponent }) => {
    const [reviews, setReviews] = useState(null);
    useEffect(() => {
        async function fetchMovieInfo() {
            if (movie.media_type === 'movie') {
                const review = await apiComponent.fetchMoviesById(movie.id, apiComponent.links.details, apiComponent.params.reviews);
                setReviews(review);
            } else if (movie.media_type === 'tv') {
                const review = await apiComponent.fetchMoviesById(movie.id, apiComponent.links.seriesDetails, apiComponent.params.reviews);
                setReviews(review)
            }

        }

        fetchMovieInfo();
    }, [apiComponent, movie.id, movie.media_type]);


    return (<><ul className="reviews-container">
        {reviews ? reviews.results.map(review => {
            return (
                <li className="review-item" key={review.id}>
                    <p className="author">{review.author}</p>
                    <p className="username">@{review.author_details.username}</p>
                    <p className="created-at">created at: {review.created_at}</p>
                    <p className="content">{review.content}</p>
                </li>)
        }) : <p>No reviews yet..</p>}</ul>

    </>)
}

export default Reviews;