import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

  @Input() movieId;
  movie: MovieDetail = {};
  hideContentLength = 150;
  actors: Cast[] = [];
  slideOptions = {
    slidesPerView: 3.3,
    freeMode: true
  };
  star = 'star-outline';

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController,
    private localDataService: LocalDataService
  ) { }

  ngOnInit() {
    this.localDataService.isInFavorites(this.movieId).then(exist => {
      this.star = exist ? 'star' : 'star-outline';
    });

    this.movieService.getMovieDetail(this.movieId).subscribe(res => {
      this.movie = res;
    });

    this.movieService.getMovieCredits(this.movieId).subscribe(res => {
      this.actors = res.cast;
    });
  }

  back() {
    this.modalController.dismiss();
  }

  favorite() {
    const saved = this.localDataService.saveMovie(this.movie);
    this.star = saved ? 'star' : 'star-outline';
  }
}
