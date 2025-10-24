import { Component, OnInit, Input } from '@angular/core';
import { FetchApiData } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenreView } from '../genre-view/genre-view';
import { MovieDetailsView } from '../movie-details-view/movie-details-view';
import { DirectorView } from '../director-view/director-view';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  @Input() user: any = {};
  @Input() Birthday: any = '';
  Username: string = '';
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  // Get user info
  getUserData(): void {
    const currentUser: any = localStorage.getItem('user');
    const user: any = JSON.parse(currentUser);
    if (!currentUser) {
      this.router.navigate(['welcome']);
    }
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.user = resp.user;
      this.Username = resp.user.Username;
      this.Birthday = new Date(resp.user.Birthday).toLocaleDateString('en-US', { timeZone: 'UTC' });
      console.log(this.user);
      this.getFavoriteMovies();
    });
  }

  // Update user info
  updateUser(): void {
    this.fetchApiData.updateUserInfo(this.Username, this.user).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
      this.Username = resp.Username;
      console.log(resp);
    });
  }

  // Delete user account
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser(this.Username).subscribe((resp: any) => {
      localStorage.clear();
      this.snackBar.open(resp, 'Successfully deleted account', {
        duration: 2000,
      });
    });
  }

  // Get favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const allMovies: any[] = resp;
      this.favoriteMovies = allMovies.filter((movie) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  // Genre view
  openGenreView(genre: any): void {
    this.dialog.open(GenreView, {
      width: '300px',
      data: genre,
    });
  }

  // Director view
  openDirectorView(director: any): void {
    this.dialog.open(DirectorView, {
      width: '300px',
      data: director,
    });
  }

  // Movie details view
  openMovieDetailsView(movie: any): void {
    this.dialog.open(MovieDetailsView, {
      width: '300px',
      data: movie,
    });
  }

  // Remove movie from favorites
  removeFromFavorites(movidID: string): void {
    let movieID = movidID;
    console.log(movieID);
    this.fetchApiData.deleteAFavoriteMovie(this.Username, movieID).subscribe((resp: any) => {});
  }
}
