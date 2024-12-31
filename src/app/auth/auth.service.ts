import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';

  private apiUrl = environment.apiUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.authSecretKey)
  );

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  async login(email: string, password: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem(this.authSecretKey, data.token);
      this.isAuthenticated = true;
      this.isAuthenticatedSubject.next(true);
      return data;
    } else {
      throw new Error('Login failed');
    }
  }

  async register(name: string, email: string, password: string, passwordConfirmation: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Registration failed');
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  async logout(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(this.authSecretKey), // this should be attached to every api call behind the scene.
      }
    });

    if (response.ok) {
      localStorage.removeItem(this.authSecretKey);
      this.isAuthenticated = false;
      this.isAuthenticatedSubject.next(false);
      return await response.json();
    } else {
      throw new Error('logout failed');
    }
  }
}
