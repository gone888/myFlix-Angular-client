import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenreView } from '../genre-view/genre-view';
import { MovieDetailsView } from '../movie-details-view/movie-details-view';
import { DirectorView } from '../director-view/director-view';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss'],
})
export class MovieCard implements OnInit {
  movies: any[] = [];
  user: any = {};
  constructor(
    public fetchApiData: FetchApiData,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Function that fetches a list of all movies from the database
   * @returns Array of movies
   */
  getMovies(): void {
    const currentUser: any = localStorage.getItem('user');
    if (!currentUser) {
      this.router.navigate(['welcome']);
    }
    this.fetchApiData.getAllMovies().subscribe(
      (result: any) => {
        this.movies = result;
        console.log(this.movies);
        return this.movies;
      },
      (result) => {
        this.snackBar.open('Error ' + result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * This is a function will open a dialog giving users more information on the details of the genre of a particular movie
   * @param genre
   */
  openGenreView(genre: any): void {
    this.dialog.open(GenreView, {
      width: '300px',
      data: genre,
    });
  }

  /**
   * This is a function will open a dialog giving users more information on the details of the director of a particular movie
   * @param director
   */
  openDirectorView(director: any): void {
    this.dialog.open(DirectorView, {
      width: '300px',
      data: director,
    });
  }

  /**
   * This is a function will open a dialog giving users more information on the details of a particular movie
   * @param movie
   */
  openMovieDetailsView(movie: any): void {
    this.dialog.open(MovieDetailsView, {
      width: '300px',
      data: movie,
    });
  }

  /**
   * Function to add movie to favoritemovies array
   * @param movieID
   * @returns true or false
   */
  addToFavorites(movieID: any): void {
    const currentUser: any = localStorage.getItem('user');
    const user: any = JSON.parse(currentUser);
    function checkIfMovieAlreadyExists(FavoriteMovies: any[], movieID: any) {
      for (let i = 0; i < user.FavoriteMovies.length; i++) {
        if (user.FavoriteMovies[i] === movieID) {
          return true;
        }
      }
      return false;
    }

    /**
     * Function to check if the movie is already in the users favorites list
     * @param movieID
     * @param this.user.FavoriteMovies
     * if it is alert the user that the movie is already in their favorites
     * else add the movie to their FavoriteMovies
     */
    if (checkIfMovieAlreadyExists(this.user.FavoriteMovies, movieID) === true) {
      this.snackBar.open('Movie is already in favorites ', 'OK', {
        duration: 2000,
      });
    } else {
      this.fetchApiData.addToFavorites(user.Username, movieID).subscribe(
        (result: any) => {
          console.log(result);
          this.snackBar.open('Movie added to favorites ', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open('Error ' + result, 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}
