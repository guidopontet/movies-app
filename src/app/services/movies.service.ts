import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDbResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) {}

  getFeature() {
    return this.http.get<MovieDbResponse>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte
      =2014-09-15&primary_release_date.lte=2014-10-22&api_key=af5e595a50099b5b49faaa28ce4896a9&language=es&include_image_language=es`);
  }
}
