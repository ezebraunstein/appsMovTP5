import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Toast } from '@capacitor/toast';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
 
  constructor(
    private movieService: MovieService, private modalCtrl: ModalController, private alertCtrl: AlertController
  ) {}
 
  ngOnInit() {
    this.loadMovies();
  }
 
  async openModal(id:number) {
    const modal =await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        id: id
      }

    })

    await modal.present();
  }

  async loadMovies() {
    this.movieService.getTopRatedMovies().subscribe((res) => {
      this.movies = [...this.movies, ...res.results];
      console.log(res);
      Storage.set({
        key: 'moviesList',
        value: JSON.stringify(res.results),
      });
    }

  );

  }
  
  async showConfirmToast () {
    await Toast.show({
      text: 'Elemento eliminado con exito!',
      duration: 'short',
      position:  'bottom'
    });
  }

  async deleteItem(id:number, slidingItem) {
    const index = this.movies.findIndex(element => element.id == id)
    const alert = await  this.alertCtrl.create({
      header: 'Eliminar',
      message: 'Esta seguro que desea eliminar el elemento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
            slidingItem.close()
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.movies.splice(index, 1)
            console.log('Confirm Okay');
            this.showConfirmToast();
          }
          
        }
      ]
    });
    alert.present()
  }
  
}

/*
    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
        this.movies = [...this.movies, ...res.results];
        console.log(res);
      }
    );
*/