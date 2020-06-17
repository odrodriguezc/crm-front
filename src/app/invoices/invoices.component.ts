import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice';
import { InvoicesService } from './invoices.service';

@Component({
  selector: 'app-invoices',
  template: `
    <h1>Mes Factures</h1>
    <table class="table table-hover">
      <thead>
        <tr class="table-dark">
          <th class="text-center">Id</th>
          <th class="text-center">Numero</th>
          <th class="text-center">Client</th>
          <th class="text-center">Titre</th>
          <th class="text-center">Montant</th>
          <th class="text-center">Date</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let i of invoices; let isOdd = odd"
          [class.table-secondary]="isOdd"
          [class.table-primary]="!isOdd"
        >
          <td>{{ i.id }}</td>
          <td>{{ i.chrono }}</td>
          <td>{{ i.customer.fullName }}</td>
          <td>{{ i.title }}</td>
          <td class="text-center">
            {{ i.amount / 100 | currency: 'EUR':'symbol' }}
          </td>
          <td class="text-center">{{ i.createdAt | date: 'dd/MM/yyyy' }}</td>
          <td>
            <a routerLink="/invoices/{{ i.id }}" class="btn btn-primary btn-sm"
              >Modifier</a
            >
            <button
              class="ml-1 btn btn-danger btn-sm"
              (click)="handleDelete(i)"
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
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  constructor(private invoicesService: InvoicesService) {}

  ngOnInit(): void {
    this.invoicesService.findAll().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }

  handleDelete(i: Invoice) {
    const invoicesBackUp = [...this.invoices];
    const index = this.invoices.indexOf(i);
    this.invoices.splice(index, 1);

    this.invoicesService.delete(i.id).subscribe(
      (invoice) => {
        //TODO: gérer une notification UI
      },
      (error) => {
        this.invoices = invoicesBackUp;
        //TODO: notification UI
      }
    );
  }
}
