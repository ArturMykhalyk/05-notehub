import axios from "axios";

import { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[],
    total_pages: number,
}

export const fetchMovies = async (query: string, page:number): Promise<MoviesHttpResponse>=> {
    const params = {
        query,
        page,
        language: "en-US",
        include_adult: false,
    };
     const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN }`,
      }
    const response = await axios.get<MoviesHttpResponse>(
        "https://api.themoviedb.org/3/search/movie",{params,headers}
    );
    return response.data;
}