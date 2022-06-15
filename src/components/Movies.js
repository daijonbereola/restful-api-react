import React, { useEffect, useState } from 'react';

export default function Movies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [movies, setMovies] = useState([]);

    const url = "http://localhost:8900/movies";

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMovies(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {movies.map(movie => (
                    <li key = {movie.id}>
                        <a href={movie.url}>{movie.title}</a>
                    </li>
                ))}
            </ul>
        );
    }
}
