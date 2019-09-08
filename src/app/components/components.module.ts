import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './slider/slider.component';
import { PipesModule } from '../pipes/pipes.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  entryComponents: [
    MovieDetailComponent
  ],
  declarations: [
    SliderComponent,
    MovieDetailComponent
  ],
  exports: [
    SliderComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
