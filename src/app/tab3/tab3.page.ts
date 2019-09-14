import { Component, OnInit } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];
  favoritesByGenre: any[] = [];

  constructor(
    private localDataService: LocalDataService,
    private moviesService: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.movies = await this.localDataService.loadFavorites();
    this.genres = await this.moviesService.loadGenres();
    this.moviesByGenre(this.genres, this.movies);
  }

  moviesByGenre(genres: Genre[], movies: MovieDetail[]) {
    genres.forEach(genre => {
      this.favoritesByGenre.push({
        genre: genre.name,
        movies: movies.filter(movie => movie.genres.find(g => g.id === genre.id))
      });
    });
  }
}
