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

  /**
   * Function that requests user data from the api
   * @returns an object containing the users information
   */
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

  /**
   * Function that updates the users information
   * @returns an object containing the users updated information
   */
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

  /**
   * Function that deletes the users account
   * @returns confirmation message letting the user know if their account was successfully deleted or not
   */
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

  /**
   * Get a list of the users favorite movies
   * @returns an array of the users favorite movies
   */
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
   * Get a list of the users favorite movies
   * @param movidID
   * @returns confirmation message indicating whether the movie has successfully or unsuccessfully been removed from the users favorites list
   */
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
