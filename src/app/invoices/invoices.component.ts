import { Component, OnInit, OnDestroy } from '@angular/core';
import { Invoice } from './invoice';
import { InvoicesService } from './invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoices',
  template: `
    <h1>Mes Factures</h1>
    <a routerLink="/invoices/new" class="btn btn-link">Ajouter une facture</a>
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
    <app-pagination
      [itemsPerPage]="invoices.length"
      [currentPage]="currentPage"
      [items]="totalItems"
      (pageChanged)="handlePageChange($event)"
    ></app-pagination>
  `,
  styles: [],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = [];
  totalItems: number;
  currentPage = 1;

  invoicesSubscription: Subscription;
  deleteSubscription: Subscription;

  subscriptions: Subscription[] = [];

  constructor(
    private invoicesService: InvoicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const subscription = this.route.queryParamMap
      .pipe(
        map((params) => (params.has('page') ? +params.get('page') : 1)),
        tap((page) => (this.currentPage = page)),
        switchMap((page) => this.invoicesService.findAll(page))
      )
      .subscribe((paginatedInvoices) => {
        this.invoices = paginatedInvoices.items;
        this.totalItems = paginatedInvoices.total;
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  handlePageChange(page: number) {
    this.router.navigateByUrl('invoices?page=' + page);
  }

  handleDelete(i: Invoice) {
    const invoicesBackUp = [...this.invoices];
    const index = this.invoices.indexOf(i);
    this.invoices.splice(index, 1);

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }

    const subscription = this.invoicesService.delete(i.id).subscribe(
      (invoice) => {
        //TODO: gérer une notification UI
      },
      (error) => {
        this.invoices = invoicesBackUp;
        //TODO: notification UI
      }
    );

    this.subscriptions.push(subscription);
  }
}
