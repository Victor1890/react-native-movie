import { TMBDProvider } from "./TMDB/tmbd.provider";

class MovieProvider extends TMBDProvider{

    constructor() {
        super()
    }
    getPoster(path){
        return this._getPoster(path)
    }

    getNowPlayingMovies() {
        return this._getNowPlayingMovies()
    }

    getAllGenres(){
        return this._getAllGenres()
    }

    getUpcomingMovies(){
        return this._getUpcomingMovies()
    }

    getVideo(key){
        return this._getVideo(key)
    }

    getMovieById(movieId, append_to_response){
        return this._getMovieById(movieId, append_to_response)
    }
    
    getLanguage(lang){
        return this._getLanguage(lang)
    }
}

export default new MovieProvider()