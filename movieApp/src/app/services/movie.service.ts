import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';
 
export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}
 
@Injectable({
  providedIn: 'root',
})
export class MovieService {

  movie = [];
  constructor(private http: HttpClient) {}
 
  getTopRatedMovies(): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?page=1&api_key=${environment.apiKey}`
    );
  }
 
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}

/*
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?page=${page}&api_key=${environment.apiKey}`
    );
  }
  */
