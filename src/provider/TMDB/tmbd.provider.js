import config from "../../config";
import { BaseProvider } from "../base";

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


    getNowPlayingMovies() {
        return this.get("/movie/now_playing")
    }

    
}

export default new TMBDProvider()