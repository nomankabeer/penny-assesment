import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrls: ['../../styles/auth-main.scss'],
  providers: [AuthService]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form with form controls and validators
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      alert('All fields are required.');
      return;
    }

    const { username, email, password } = this.signupForm.value;

    this.authService.register(username, email, password).subscribe(
      (response) => {
        alert(response.message);
        if (!response.status) {
          return;
        }
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}
