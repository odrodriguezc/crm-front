import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomersService } from './customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { constants } from 'buffer';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-customer-edit',
  template: `
    <h1>Modifier un client</h1>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nom complet"
          formControlName="fullName"
          [class.is-invalid]="submitted && form.controls['fullName'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['fullName'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="Adresse email"
          formControlName="email"
          [class.is-invalid]="submitted && form.controls['email'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['email'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Entreprise / Societé"
          formControlName="company"
          [class.is-invalid]="submitted && form.controls['company'].invalid"
        />
      </div>
      <p class="invalid-feedback">
        {{ form.controls['company'].getError('invalid') }}
      </p>
      <button class="btn btn-success">Enregistrer</button>
    </form>
  `,
  styles: [],
})
export class CustomerEditComponent implements OnInit {
  customer: Customer;
  submitted = false;

  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    company: new FormControl(''),
  });

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //TODO : chercher les customers via l'API
    this.route.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.customersService.find(id))
      )
      .subscribe((customer) => {
        //TODO: creer le chargement des donées
        this.customer = customer;
        this.form.patchValue(this.customer);
      });
  }

  handleSubmit() {
    this.submitted = true;
    this.customersService
      .update({ ...this.form.value, id: this.customer.id })
      .subscribe(
        (customer) => {
          this.router.navigateByUrl('/customers');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.violations) {
            for (const violation of error.error.violations) {
              const fieldname = violation.propertyPath;
              const message = violation.message;

              this.form.controls[fieldname].setErrors({
                invalid: message,
              });
            }
          }
        }
      );
  }
}
