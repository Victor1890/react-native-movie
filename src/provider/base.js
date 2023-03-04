import axios, { CreateAxiosDefaults } from "axios";

export class BaseProvider {
    
    #_axios;
    /**
     * @param {CreateAxiosDefaults} config 
     */
    constructor(config){
        this.#_axios = axios.create(config);
    }

    params(params){
        return Object.keys(params).map(key => {
            let value = params[key]
            if(typeof value === 'undefined') return ''
            value = typeof value == typeof {} ? JSON.stringify(value) : value
            return `${key}=${value}`
        }).join("&")
    }

    async get(endpoint, config = {}) {

        return new Promise((resolve) => {
            this.#_axios.get(`${endpoint}`, config)
            .then((res) => {
                resolve({ data: res.data })
            })
            .catch((error) => {
                resolve({
                    error: error.response?.data || error.response || { message: error.message }
                })
            });
        });
    }

    async post(endpoint, data = {}, params = {}, config = {}) {
        let _isParam = Object.keys(params).length > 0

        return new Promise((resolve) => {
            this.#_axios.post(`${endpoint}${_isParam ? `?${this.params(data)}` : ''}`, config)
            .then((res) => {
                resolve({ data: res.data })
            })
            .catch((error) => {
                resolve({
                    error: error.response?.data || error.response || { message: error.message }
                })
            });
        })
    }
}