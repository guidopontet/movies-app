import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDbResponse, MovieDetail, MovieCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularMoviesPage = 0;

  constructor(
    private http: HttpClient
  ) {}

  private runQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }

  private parseDate(day: number) {
    return (day < 10) ? '0' + day : day;
  }

  getRecentMovies() {
    const today = new Date();
    const lastMonthDate = new Date(new Date().setDate(today.getDate() - 30));

    // We always return last 2 months movies
    // tslint:disable-next-line:max-line-length
    const fromDate = `${lastMonthDate.getFullYear()}-${this.parseDate(lastMonthDate.getMonth() + 1)}-${this.parseDate(lastMonthDate.getDate())}`;
    const todayDate = `${today.getFullYear()}-${this.parseDate(today.getMonth() + 1)}-${this.parseDate(today.getDate())}`;

    return this.runQuery<MovieDbResponse>(`/discover/movie?primary_release_date.gte
                                            =${ fromDate }&primary_release_date.lte=${ todayDate }`);
  }

  getPopularMovies() {
    const query = `/discover/movie?sort_by=popularity.desc&page=${ ++this.popularMoviesPage }`;

    return this.runQuery<MovieDbResponse>(query);
  }

  getMovieDetail(id: string) {
    return this.runQuery<MovieDetail>(`/movie/${ id }?test=1`);
  }

  getMovieCredits(id: string) {
    return this.runQuery<MovieCredits>(`/movie/${ id }/credits?test=1`);
  }
}
