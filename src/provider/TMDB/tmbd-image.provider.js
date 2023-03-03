import config from "../../config";
import { BaseProvider } from "../base";

const setting = config.movie;

class TMBDImageProvider extends BaseProvider {

    constructor(){
        super({
            baseURL: setting.imageUrl,
            params: {
                api_key: setting.apiKey
            }
        });
    }

    getPoster(path){
        return this.get(`/original/${path}`)
    }
}

export default new TMBDImageProvider()