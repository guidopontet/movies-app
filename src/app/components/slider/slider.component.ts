import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Input() poster = false;
  @Input() backdrop = false;
  @Input() pair = false;
  @Input() slidesPerView = 1.15;

  @Output() loadMoreMovies = new EventEmitter();

  slidesOpts = {};

  constructor() { }

  ngOnInit() {
    this.slidesOpts = {
      slidesPerView: this.slidesPerView,
      freeMode: true
    };
  }

  loadMore() {
    this.loadMoreMovies.emit();
  }
}
