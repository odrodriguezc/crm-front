import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UiService } from '../ui/ui.service';

@Component({
  selector: 'app-login',
  template: `
    <h1>Connexion au CRM</h1>
    <div class="alert alert-danger" *ngIf="error">
      <p>
        Le compte utilisateur n'existe pas ou les données fournies ne
        correspondent pas
      </p>
    </div>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          [class.is-invalid]="submitted && form.controls['username'].invalid"
          placeholder="Adreese de connexion"
          formControlName="username"
        />
        <p
          class="invalid-feedback"
          *ngIf="submitted && form.controls['username'].hasError('required')"
        >
          L'email est obligatoire
        </p>
        <p
          class="invalid-feedback"
          *ngIf="submitted && form.controls['username'].hasError('email')"
        >
          Le format de l'adresse mail n'est pas valide
        </p>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          [class.is-invalid]="submitted && form.controls['password'].invalid"
          placeholder="Mot de passe"
          formControlName="password"
        />
        <p
          class="invalid-feedback"
          *ngIf="submitted && form.controls['password'].hasError('required')"
        >
          Le mot de passe est obligatoire
        </p>
      </div>
      <button class="btn btn-success">Connexion</button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submitted: boolean = false;
  error: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}
  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (data) => {
        this.ui.setLoading(false);
        this.error = false;
        this.router.navigateByUrl('/customers');
      },
      (error) => {
        this.ui.setLoading(false);
        this.error = true;
      }
    );
  }
}
