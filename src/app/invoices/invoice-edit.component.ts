import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { CustomersService } from '../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from './invoice';
import { Customer } from '../customers/customer';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice-edit',
  template: `
    <h1 class="mb-3">Modifier une facture</h1>
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
export class InvoiceEditComponent implements OnInit {
  invoice: Invoice;
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customersService
      .findAll()
      .subscribe((customers) => (this.customers = customers));

    this.route.paramMap
      .pipe(
        map((params) => +params.get('id')),
        switchMap((id) => this.invoicesService.find(id)),
        map((invoice) => {
          return {
            ...invoice,
            customer: `/api/customers/${(invoice.customer as Customer).id}`,
            amount: invoice.amount / 100,
          };
        })
      )
      .subscribe((invoice) => {
        this.invoice = invoice;
        this.form.patchValue(this.invoice);
      });
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.invoicesService
      .update({
        ...this.invoice,
        ...this.form.value,
        amount: this.form.value.amount * 100,
      })
      .subscribe(
        (invoice) => {
          //succes
          this.router.navigateByUrl('/invoices');
        },
        (error: HttpErrorResponse) => {
          //fail
          if (error.status === 400 && error.error.violations) {
            for (const v of error.error.violations) {
              const fieldname = v.propertyPath;
              const message = v.message;

              this.form.controls[fieldname].setErrors({
                invalid: message,
              });
            }
            return;
          }
          //TODO: NOTIFICATION
        }
      );
  }
}
