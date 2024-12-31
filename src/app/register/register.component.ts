import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="register-form">
      <p class="title">Sign Up</p>
      <form [formGroup]="registerForm" (ngSubmit)="register()">

        <div>
          <input type="text" name="name" formControlName="name" placeholder="Full Name" required>
          <div *ngIf="registerForm.get('name')?.touched && registerForm.get('name')?.invalid" class="error-message">
            <div *ngIf="registerForm.get('name')?.hasError('required')">Name is required.</div>
          </div>
        </div>

        <br>

        <div>
          <input type="email" name="email" formControlName="email" placeholder="Email" required>
          <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="error-message">
            <div *ngIf="registerForm.get('email')?.hasError('required')">Email is required.</div>
            <div *ngIf="registerForm.get('email')?.hasError('email')">Please enter a valid email.</div>
          </div>
        </div>

        <br>

        <div>
          <input type="password" name="password" formControlName="password" placeholder="Password" required>
          <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="error-message">
            <div *ngIf="registerForm.get('password')?.hasError('required')">Password is required.</div>
            <div *ngIf="registerForm.get('password')?.hasError('minlength')">Password must be at least 6 characters long.</div>
          </div>
        </div>

        <br>

        <div>
          <input type="password" name="password_confirmation" formControlName="password_confirmation" placeholder="Confirm Password" required>
          <div *ngIf="registerForm.get('password_confirmation')?.touched && registerForm.get('password_confirmation')?.invalid" class="error-message">
            <div *ngIf="registerForm.get('password_confirmation')?.hasError('required')">Password confirmation is required.</div>
            <div *ngIf="registerForm.get('password_confirmation')?.hasError('passwordMismatch')">Passwords must match.</div>
          </div>
        </div>

        <br>

        <button type="submit" [disabled]="registerForm.invalid">Sign Up</button>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div *ngIf="success" class="success-message">
          {{ successMessage }}
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = 'Successful registration, you will be redirected to the login page...';
  success: boolean = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    }, { validators: this.passwordMatcher });
  }

  passwordMatcher(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('password_confirmation')?.value;
    return password && passwordConfirmation && password !== passwordConfirmation ? { passwordMismatch: true } : null;
  }

  async register(): Promise<void> {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const { name, email, password, password_confirmation } = this.registerForm.value;

    try {
      const response = await this.authService.register(name, email, password, password_confirmation);
      console.log('Registration successful:', response);
      this.errorMessage = '';

      this.registerForm.reset();

      this.success = true;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error) {
      this.errorMessage = 'Registration failed. Please check your details.';
      console.error('Error:', error);
    }
  }
}
