import React, {Component} from 'react';
//import MovieListing from './MovieListing';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:8900/genre/`
})

export default class Movies extends Component {
    constructor() {
        super();
        api.get('/').then(res => {
            //console.log(res.data)
            this.setState({
                movies: res.data
            })
        })
    }
    render() {
        return (
            <div>
                {this.state.movies.map(movie => {
                    return(
                    <h2 key={movie.genreId}>
                        {movie.genre}
                    </h2>
                    )
                })}
            </div>
        )
    }
}