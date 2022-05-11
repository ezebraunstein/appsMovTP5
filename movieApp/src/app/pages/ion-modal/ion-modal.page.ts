import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ion-modal',
  templateUrl: './ion-modal.page.html',
  styleUrls: ['./ion-modal.page.scss'],
})
export class IonModalPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;
 
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
 
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {
      this.movie = res;
    });
  }
 
  openHomepage(url) {
    window.open(url, '_blank');
  }
}
