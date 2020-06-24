import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { UiService } from '../ui/ui.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  template: `
    <h1>Mes clients</h1>
    <a routerLink="/customers/new" class="btn btn-link">Ajouter un client</a>
    <table class="table table-hover">
      <thead>
        <tr class="table-dark">
          <th class="text-center">Id</th>
          <th class="text-center">Nom</th>
          <th class="text-center">Email</th>
          <th class="text-center">Factures</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let c of currentCustomers; let isOdd = odd"
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
    <app-pagination
      [currentPage]="currentPage"
      [items]="customers.length"
      itemsPerPage="10"
      (pageChanged)="currentPage = $event; getCustomersForCurrentPage()"
    ></app-pagination>
  `,
  styles: [],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  currentCustomers: Customer[] = [];
  currentPage = 1;

  constructor(
    private customersService: CustomersService,
    private ui: UiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customers = this.route.snapshot.data.customers;
    this.currentCustomers = this.getCustomersForCurrentPage();
  }

  getCustomersForCurrentPage() {
    const startIndex = (this.currentPage - 1) * 10;
    console.log(this.customers.slice(startIndex, startIndex + 10));
    return (this.currentCustomers = this.customers.slice(
      startIndex,
      startIndex + 10
    ));
  }

  handleDelete(c: Customer) {
    const customersCopy = [...this.customers];

    const index = this.customers.indexOf(c);
    this.customers.splice(index, 1);

    this.ui.setLoading(true);

    this.customersService.delete(c.id).subscribe(
      () => {
        this.toastr.success('le Client a bien été supprimé', 'succes');
        this.ui.setLoading(false);
        ///update pagination
      },
      (error) => {
        this.customers = customersCopy;

        this.toastr.warning(
          "Nous n'avons pas pu supprimer le client",
          'Une erreur est survenue'
        );
        this.ui.setLoading(false);
      }
    );
  }
}
