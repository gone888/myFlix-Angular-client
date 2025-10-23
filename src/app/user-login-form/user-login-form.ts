import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiData } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.html',
  styleUrls: ['./user-login-form.scss'],
})
export class UserLoginForm implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<UserLoginForm>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.token));
        console.log(
          'User: ',
          localStorage.getItem('user'),
          'Token: ',
          localStorage.getItem('token')
        );
        this.dialogRef.close();
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
