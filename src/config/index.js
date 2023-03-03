import { MOVIE_API, MOVIE_API_IMAGE, MOVIE_API_KEY } from '@env'

const config = {
    movie: {
        url: `${MOVIE_API}`,
        imageUrl: `${MOVIE_API_IMAGE}`,
        apiKey: `${MOVIE_API_KEY || "26565995e046ddc80168352e5a937779"}`
    }
}

export default config