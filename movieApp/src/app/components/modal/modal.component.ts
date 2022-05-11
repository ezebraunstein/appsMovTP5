import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  movies;
  theMovie;
  @Input() id: Number;
  imageBaseUrl = environment.images;
 
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}
 
  ngOnInit(): void {
    this.getListOfMovies();
  }

async getListOfMovies(){
  const { value } = await Storage.get({ key: 'moviesList' });
  if (value && value.length > 0) {
    this.theMovie = JSON.parse(value);
    for (const i in this.theMovie) {
      if (this.theMovie[i].id == this.id ) {
        this.movies = this.theMovie[i];
      }
    }
  } else {
    this.http.get(`${environment.baseUrl}/movie/${this.id}?api_key=${environment.apiKey}`)
    .subscribe(res => this.movies = res);
  }  
}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}


