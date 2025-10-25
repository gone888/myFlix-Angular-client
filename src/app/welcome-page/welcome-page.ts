import { Component, OnInit } from '@angular/core';
import { UserLoginForm } from '../user-login-form/user-login-form';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * This will open a dialog to allow the user to register for an account
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      width: '280px',
    });
  }

  /**
   * This will open a dialog to allow the user to enter their login details
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: '280px',
    });
  }
}
