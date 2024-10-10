import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import required Reactive Form modules
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/auth-main.scss'],
  providers: [AuthService],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
    this.loginForm = this.fb.group({
      email: ['nomankabeerr_1@gmail.com', [Validators.required, Validators.email]], 
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }


  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/user/listing']);
      },
      (error) => {
        alert('Incorrect Password or Email');
        console.error('Login failed', error);
      }
    );
  }
}
