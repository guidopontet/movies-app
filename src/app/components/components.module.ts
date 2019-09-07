import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './slider/slider.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    SliderComponent
  ],
  exports: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
