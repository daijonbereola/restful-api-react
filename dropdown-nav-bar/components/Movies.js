import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Movies() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(movies[1])

    const handleChange = (m) => {
    setSelectedMovie(JSON.parse(m.target.value));
    }

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
            <div className='App'>
                <select className="select" value={setSelectedMovie.title} onChange={(e) => handleChange(e)}>
                    <option>Choose a Movie</option>
                    {movies.map((movie) => (
                        <option key={movie.id} value={JSON.stringify(movie)}>{movie.title}</option>
                    ))}
                </select>
                {selectedMovie ? 
                    <div>
                        <a href={selectedMovie.url}>{selectedMovie.title}</a>
                        <img src={selectedMovie.image} alt="movie poster"/>
                    </div>
                        : 
                    <p>Waiting for movie selection...</p>}
                
            </div>
        );
    }
}
