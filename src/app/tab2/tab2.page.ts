import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { MovieDetailComponent } from '../components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchText = '';
  searchIdeas = ['Spiderman', 'Avengers', 'El señor de los Anillos', 'La vida es bella', 'Rocket Power', 'Kill Bill'];
  movies: Movie[] = [];
  loading = false;

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
  ) {}

  searchMovie(event) {
    if (!event.detail.value) { return; }

    this.loading = true;
    const searchText = event.detail.value;

    this.moviesService.searchMovie(searchText).subscribe(res => {
      this.loading = false;
      this.movies = res['results'];
    });
  }

  async showMovieDetail(movieId: string) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movieId
      }
    });

    modal.present();
  }
}
