import axios from 'axios'

// Same-origin by default: nginx proxies /api -> api-server:5000.
// Because the browser calls the SAME host it loaded the page from,
// there is no cross-origin request and therefore no CORS at all.
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis
