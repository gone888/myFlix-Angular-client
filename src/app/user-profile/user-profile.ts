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
    this.fetchApiData.getUser(user.Username).subscribe(
      (resp: any) => {
        this.snackBar.open('Successfully fetched user data ', 'OK', {
          duration: 2000,
        });
        this.user = resp.user;
        this.Username = resp.user.Username;
        this.Birthday = new Date(resp.user.Birthday).toLocaleDateString('en-US', {
          timeZone: 'UTC',
        });
        console.log(this.user);
        this.getFavoriteMovies();
      },
      (result: any) => {
        this.snackBar.open('Error fetching user data ' + result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // Update user info
  updateUser(): void {
    this.fetchApiData.updateUserInfo(this.Username, this.user).subscribe(
      (resp: any) => {
        this.snackBar.open('Successfully updated user info ', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(resp));
        this.user = resp;
        this.Username = resp.Username;
        console.log(resp);
      },
      (result: any) => {
        this.snackBar.open('Error updating user data ' + result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // Delete user account
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser(this.Username).subscribe(
      (resp: any) => {
        localStorage.clear();
        this.snackBar.open('Successfully deleted account', resp, {
          duration: 2000,
        });
      },
      (resp: any) => {
        this.snackBar.open('Error deleting user account ' + resp, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // Get favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        const allMovies: any[] = resp;
        this.favoriteMovies = allMovies.filter((movie) =>
          this.user.FavoriteMovies.includes(movie._id)
        );
        console.log(this.favoriteMovies);
        return this.favoriteMovies;
      },
      (resp: any) => {
        this.snackBar.open('Error fetching favorite movies ' + resp, 'OK', {
          duration: 2000,
        });
      }
    );
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
    this.fetchApiData.deleteAFavoriteMovie(this.Username, movieID).subscribe(
      (result: any) => {
        this.snackBar.open('Movie removed from favorites ', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        this.snackBar.open('Error ' + result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
