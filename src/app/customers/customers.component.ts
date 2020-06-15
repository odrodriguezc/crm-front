import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';

@Component({
  selector: 'app-customers',
  template: `
    <h1>Mes clients</h1>
    <a routerLink="/customers/new" class="btn btn-link">Ajouter un client</a>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Nom</th>
          <th class="text-center">Email</th>
          <th class="text-center">Factures</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let c of customers; let isOdd = odd"
          [class.table-secondary]="isOdd"
          [class.table-primary]="!isOdd"
          [class.table-danger]="c.invoices.length < 1"
        >
          <td>{{ c.id }}</td>
          <td>{{ c.fullName }}</td>
          <td>{{ c.email }}</td>
          <td class="text-center">
            {{ c.invoices.length }}
          </td>
          <td>
            <a routerLink="/customers/{{ c.id }}" class="btn btn-primary btn-sm"
              >Modifier</a
            >
            <button
              class="ml-1 btn btn-danger btn-sm"
              (click)="handleDelete(c)"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customersService.findAll().subscribe((customers) => {
      this.customers = customers;
    });
  }

  handleDelete(c: Customer) {
    const customersCopy = [...this.customers];

    const index = this.customers.indexOf(c);
    this.customers.splice(index, 1);

    this.customersService.delete(c.id).subscribe(
      () => {
        ///success
      },
      (error) => {
        this.customers = customersCopy;
      }
    );
  }
}
