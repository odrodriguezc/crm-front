import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { CustomersService } from '../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from './invoice';
import { Customer } from '../customers/customer';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from '../ui/ui.service';

@Component({
  selector: 'app-invoice-create',
  template: `
    <h1 class="mb-3">Creer une facture</h1>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <label for="title">Titre de la facture</label>
        <input
          type="text"
          id="title"
          class="form-control"
          [class.is-invalid]="submitted && form.controls['title'].invalid"
          formControlName="title"
          placeholder="Titre de la facture"
        />
        <p class="invalid-feedback">
          {{ form.controls['title'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <label for="montant">Montant</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input
            type="number"
            id="amount"
            class="form-control"
            [class.is-invalid]="submitted && form.controls['amount'].invalid"
            formControlName="amount"
            placeholder="Montant"
          />
          <div class="input-group-append">
            <span class="input-group-text">.00</span>
          </div>
          <p class="invalid-feedback">
            {{ form.controls['amount'].getError('invalid') }}
          </p>
          <p
            class="invalid-feedback"
            *ngIf="submitted && form.controls['amount'].hasError('required')"
          >
            Le montant de la facture est obligatoire
          </p>
        </div>
      </div>
      <div class="form-group">
        <label for="customer">Client</label
        ><select
          class="form-control"
          [class.is-invalid]="submitted && form.controls['customer'].invalid"
          id="customer"
          formControlName="customer"
        >
          <option value="">-- Sélectionez un client --</option>
          <option value="/api/customers/{{ c.id }}" *ngFor="let c of customers">
            {{ c.fullName }}
          </option>
        </select>
        <p
          class="invalid-feedback"
          *ngIf="submitted && form.controls['customer'].hasError('required')"
        >
          Le client est obligatoir
        </p>
      </div>
      <button class="btn btn-success">Enregistrer</button>
    </form>
  `,
  styles: [],
})
export class InvoiceCreateComponent implements OnInit {
  customers: Customer[] = [];
  submitted: boolean = false;

  form = new FormGroup({
    title: new FormControl(''),
    amount: new FormControl('', Validators.required),
    customer: new FormControl('', Validators.required),
  });

  constructor(
    private invoicesService: InvoicesService,
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.customersService
      .findAll()
      .subscribe((customers) => (this.customers = customers));
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.invoicesService
      .create({ ...this.form.value, amount: this.form.value.amount * 100 })
      .subscribe(
        (invoice) => {
          //succes
          this.router.navigateByUrl('/invoices');
        },
        (error: HttpErrorResponse) => {
          //fail
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationsInForm(this.form, error.error.violations);
            return;
          }
          //TODO: NOTIFICATION
        }
      );
  }
}
