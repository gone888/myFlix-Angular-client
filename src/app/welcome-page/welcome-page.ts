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
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: '280px',
    });
  }
}
