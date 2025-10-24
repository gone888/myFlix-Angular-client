import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss'],
})
export class MovieCard {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiData) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
