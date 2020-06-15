import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <h1>Inscription</h1>
    <div class="alert alert-info" *ngIf="loading">
      En cour de chargement...
    </div>
    <div class="alert alert-danger" *ngIf="error">
      une erreur inconu est survenue, merci de réesayer plus tard
    </div>
    <form (ngSubmit)="handleSubmit()" [formGroup]="form">
      <div class="form-group">
        <input
          formControlName="fullName"
          type="text"
          class="form-control"
          [class.is-invalid]="getErrorForControl('fullName')"
          placeholder="Nom complet"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('fullName')">
          {{ getErrorForControl('fullName') }}
        </p>
      </div>
      <div class="form-group">
        <input
          formControlName="email"
          type="email"
          class="form-control"
          [class.is-invalid]="getErrorForControl('email')"
          placeholder="Adresse email"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('fullName')">
          {{ getErrorForControl('email') }}
        </p>
      </div>
      <div class="form-group">
        <input
          formControlName="password"
          type="password"
          class="form-control"
          [class.is-invalid]="getErrorForControl('password')"
          placeholder="Mot de passe"
        />
      </div>
      <p class="invalid-feedback" *ngIf="getErrorForControl('fullName')">
        {{ getErrorForControl('password') }}
      </p>
      <div class="form-group">
        <input
          formControlName="confirmation"
          type="password"
          class="form-control"
          [class.is-invalid]="getErrorForControl('confirmation')"
          placeholder="confirmation"
        />
        <p class="invalid-feedback" *ngIf="getErrorForControl('fullName')">
          {{ getErrorForControl('confirmation') }}
        </p>
      </div>

      <button class="btn btn-success">Je m'inscris</button>
    </form>
  `,
  styles: [],
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl(''),
  });

  submitted: boolean = false;
  loading: boolean = false;
  error: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.loading = true;
    this.error = false;

    this.userService.create(this.form.value).subscribe(
      (user) => {
        this.loading = false;
        console.log(user);
        this.error = false;
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        // 2 types d'erreurs posibles: 400 avec des violations --- tout autre
        if (error.status === 400 && error.error.violations) {
          for (const violation of error.error.violations) {
            const fieldName = violation.propertyPath;
            const message = violation.message;

            this.form.controls[fieldName].setErrors({
              invalid: message,
            });
          }

          this.error = false;

          return;
        }
        this.error = true;
      }
    );
  }

  getErrorForControl(controlName: string) {
    return this.form.controls[controlName].getError('invalid');
  }
}
