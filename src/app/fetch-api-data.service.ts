import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Defining API used for each method below
const apiUrl = 'https://movie-api-jbxn.onrender.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) {}

  /**
   * Registering user
   * @param userData
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Logging a user in
   * @param userDetails
   * @returns Object containing user data + auth token
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a list of all movies
   * @returns user data + auth token
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get data on a single movie by its title
   * @param title
   * @returns data on a single movie
   */
  public getAMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get data on a director by their name
   * @param directorsName
   * @returns data on a director
   */
  public getDirector(directorsName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `director/${directorsName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get data on a genre by its name
   * @param genreName
   * @returns data on a genre
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get data on a user by their username
   * @param username
   * @returns data about a user
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `user/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get favourite movies for a user
   * @param username
   * @returns the users FavoriteMovies array
   */
  public getUserFavorites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add a movie to favourite Movies
   * @param username
   * @param MovieID
   * @returns object containing the users updated data and favorites list
   */
  public addToFavorites(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user details
   * @param username
   * @param userDetails
   * @returns object containing the users updated data
   */
  public updateUserInfo(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a users account
   * @param username
   * @returns confirmation that the user has successfully deleted their account
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a movie from the favorite movies
   * @param username
   * @param movieID
   * @returns confirmation that the user has successfully deleted a movie from their FavoriteMovies array
   */
  public deleteAFavoriteMovie(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extraction
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handling function
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
