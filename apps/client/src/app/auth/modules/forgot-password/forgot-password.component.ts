import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../styles/auth-main.scss'],
  providers: [AuthService],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        if (response.status) {
          alert('Request Submitted');
          this.router.navigate(['/auth/reset-password'], { queryParams: { email } });
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Forgot password request failed', error);
      }
    );
  }
}
