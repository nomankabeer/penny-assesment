import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: "./reset-password.component.html",
  styleUrls: ['../../styles/auth-main.scss'],
  providers: [AuthService]
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  email= '';
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      reset_password_code: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log('Email received:', this.email);
      if(this.email == null){
        this.router.navigate(['/auth/login'])
      }
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const { reset_password_code, password, confirm_password } = this.resetPasswordForm.value;
console.log(reset_password_code, password, confirm_password, 'aaaaaaaa')
    this.authService.resetPassword(reset_password_code, this.email, password, confirm_password).subscribe(
      (response) => {
        if(response.status){
          alert('Password updated! Please log in with your new password.');
          this.router.navigate(['/auth/login']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Reset password failed', error);
      }
    );
  }
}
