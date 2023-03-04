import config from "../../config";
import { BaseProvider } from "../base";
import { language } from '../../constants'

const setting = config.movie;

export class TMBDProvider extends BaseProvider {

    constructor(){
        super({
            baseURL: `${setting.url}`,
            withCredentials: true,
            params: {
                api_key: setting.apiKey
            }
        });
    }

    getPoster(path){
        return (`${setting.imageUrl}/original/${path}?api_key=${setting.apiKey}`);
    }

    getNowPlayingMovies() {
        return this.get("/movie/now_playing");
    }

    getAllGenres(){
        return this.get("/genre/movie/list");
    }

    getUpcomingMovies(){
        return this.get("/movie/upcoming")
    }

    getVideo(key){
        return (`${setting.videoUrl}?v=${key}`)
    }

    getMovieById(movieId, append_to_response){
        return this.get(`/movie/${movieId}`, {
            params: { append_to_response }
        });
    }
    
    getLanguage(lang){
        return language.find(item => item.iso_639_1.toLowerCase() == `${lang}`.toLowerCase());
    }
}

export default new TMBDProvider()