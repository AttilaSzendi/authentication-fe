import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {LogoutComponent} from "./logout/logout.component";
import {AuthService} from "./auth/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    LogoutComponent,
    CommonModule, // Add CommonModule here
  ],
  template: `
    <main>
      <header class="brand-header">
        <a [routerLink]="['/']" class="brand-link">
          <div class="brand-name">
            <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
          </div>
        </a>
        <nav class="nav-links">
          <a *ngIf="!isAuthenticated" [routerLink]="['/login']" routerLinkActive="active">Login</a>
          <a *ngIf="!isAuthenticated" [routerLink]="['/register']" routerLinkActive="active">Register</a>
          <app-logout *ngIf="isAuthenticated"></app-logout>
        </nav>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      (status) => (this.isAuthenticated = status)
    );
  }
}
