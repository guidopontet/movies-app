import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  movies: MovieDetail[] = [];
  storageCollectionName = 'movies';

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.loadFavorites();
  }

  async presentToast(message, duration = 2000) {
    const toast = await this.toastController.create({ message, duration });
    toast.present();
  }

  saveMovie(movie: MovieDetail) {
    let exist = false;
    let message = '';

    for (const m of this.movies) {
      if (m.id === movie.id) {
        exist = true;
        break;
      }
    }

    if (exist) {
      this.movies = this.movies.filter(m => m.id !== movie.id);
      message = 'Removido de favoritos!';
    } else {
      this.movies.push(movie);
      message = 'Agregado a favoritos!';
    }

    this.presentToast(message);
    this.storage.set(this.storageCollectionName, this.movies);

    return !exist;
  }

  async loadFavorites() {
    this.movies = await this.storage.get(this.storageCollectionName) || [];

    return this.movies;
  }

  async isInFavorites(id) {
    await this.loadFavorites();
    const exist = this.movies.find(movie => movie.id === id);

    return exist ? true : false;
  }
}
