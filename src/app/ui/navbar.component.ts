import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" routerLink="/">SymCRM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLinkActive="active"
              routerLink="/customers"
              >Mes clients</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/invoices"
              >Mes factures</a
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <ng-container *ngIf="!auth.isAuthenticated()">
            <li class="nav-item">
              <a routerLink="/register" class="nav-link">Inscription</a>
            </li>
            <li class="nav-item">
              <a routerLink="/login" class="btn btn-success">Connexion</a>
            </li>
          </ng-container>
          <li class="nav-item" *ngIf="auth.isAuthenticated()">
            <button class="btn btn-warning" (click)="handleLogout()">
              Deconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private route: Router) {}

  ngOnInit(): void {}

  handleLogout() {
    this.auth.logout();
    this.route.navigateByUrl('/login');
  }
}
