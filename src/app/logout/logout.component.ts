import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <button class="logout-button" (click)="logout()">Logout</button>
  `,
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  async logout(): Promise<void> {
    try {
      const response = await this.authService.logout();
      this.router.navigate(['/login']);
      console.log('logout successful:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
