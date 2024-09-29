import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';  
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})

export class AuthComponent {
  isLogin: boolean = true;
  isForgotPassword: boolean = false;
  isResetPassword: boolean = false;

  title = 'Authentication'
  username = '';
  email = '';
  password = '';
  confirm_password = '';
  reset_password_code = ''

  constructor(private authService: AuthService, private router: Router) {

  }


  switchToForgotPassword() {
    this.isLogin = false;
    this.isForgotPassword = true;
    this.isResetPassword = false;
  }

  switchToResetPassword() {
    this.isLogin = false;
    this.isForgotPassword = false;
    this.isResetPassword = true;
  }

  switchToSignup() {
    this.isLogin = false;
    this.isForgotPassword = false;
    this.isResetPassword = false;
  }

  switchToLogin() {
    this.isLogin = true;
    this.isForgotPassword = false;
    this.isResetPassword = false;
  }

  resetPassword() {
    if (this.password !== this.confirm_password) {
      alert('Passwords do not match!');
      console.error('Passwords do not match!');
      return;
    }
  
    this.authService.resetPassword(this.reset_password_code, this.email, this.password, this.confirm_password).subscribe(
      (response) => {
        console.log(this.reset_password_code, this.email, this.password, this.confirm_password,'aaaaaaaaaaaaa')
        if(response.status){
          alert('Password Update! Please Login Now With Your New Password')
          this.switchToLogin();
        }else{
          alert(response.message);
        }
      },
      (error) => {
      }
    );
  }


  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/user-listing']);
      },
      (error) => {
        alert('Incorrect Password Or Email')
        console.error('Login failed', error);
      }
    );
  }

  forgotPassword() {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        if(response.status){
          this.email = response.email;
          alert("Request Submitted")
          this.switchToResetPassword();
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }


  signup() {
    if (!this.username || !this.email || !this.password) {
      alert('All fields are required.');
      return;
    }
    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        alert(response.message)
        if(!response.status){
          return;
        }
        this.switchToLogin()
        console.log('Signup successful', response.message, response);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}
