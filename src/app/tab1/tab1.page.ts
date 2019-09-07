import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.moviesService.getRecentMovies().subscribe(res => {
      this.recentMovies = res.results;
    });

    this.getPopularMovies();
  }

  getPopularMovies() {
    this.moviesService.getPopularMovies().subscribe(res => {
      this.popularMovies = [...this.popularMovies, ...res.results];
    });
  }
}
