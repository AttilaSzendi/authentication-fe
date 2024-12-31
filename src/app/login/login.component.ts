import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="login-form">
      <p class="title">Sign In</p>
      <form [formGroup]="loginForm" (ngSubmit)="signIn()">
        <div>
          <input type="email" name="email" formControlName="email" placeholder="email" required>
          <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="error-message">
            <div *ngIf="loginForm.get('email')?.hasError('required')">Email is required.</div>
            <div *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email.</div>
          </div>
        </div>

        <br>

        <div>
          <input type="password" name="password" formControlName="password" placeholder="password" required>
          <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="error-message">
            <div *ngIf="loginForm.get('password')?.hasError('required')">Password is required.</div>
            <div *ngIf="loginForm.get('password')?.hasError('minlength')">Password must be at least 6 characters long.</div>
          </div>
        </div>

        <br>

        <button type="submit">Sign In</button>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>

  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signIn(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const response = await this.authService.login(email, password);
      this.router.navigate(['/']);
      console.log('Login successful:', response);
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials.';
      console.error('Error:', error);
    }
  }
}
