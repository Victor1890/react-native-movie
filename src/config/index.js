import { MOVIE_API, MOVIE_API_IMAGE, MOVIE_API_KEY, VIDEO_BASE_URL } from '@env'

const config = {
    movie: {
        url: `${MOVIE_API}`,
        imageUrl: `${MOVIE_API_IMAGE}`,
        videoUrl: `${VIDEO_BASE_URL}`,
        apiKey: `${MOVIE_API_KEY || "26565995e046ddc80168352e5a937779"}`
    }
}

export default config