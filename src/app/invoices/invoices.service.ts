import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Invoice } from './invoice';
import { map } from 'rxjs/operators';

export interface PaginatedInvoices {
  items: Invoice[];
  total: number;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  findAll(page: number = 1) {
    return this.http
      .get<PaginatedInvoices>(environment.apiUrl + '/invoices?page=' + page)
      .pipe(
        map((data) => {
          const paginatedInvoices: PaginatedInvoices = {
            items: data['hydra:member'],
            total: data['hydra:totalItems'],
            page: page,
          };

          return paginatedInvoices;
        })
      );
  }

  find(id: number) {
    return this.http.get<Invoice>(environment.apiUrl + '/invoices/' + id);
  }

  delete(id: number) {
    return this.http.delete<Invoice>(environment.apiUrl + '/invoices/' + id);
  }

  update(invoice: Invoice) {
    return this.http.put<Invoice>(
      environment.apiUrl + '/invoices/' + invoice.id,
      invoice
    );
  }

  create(invoice: Invoice) {
    return this.http.post<Invoice>(environment.apiUrl + '/invoices', invoice);
  }
}
