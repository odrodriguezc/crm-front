import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Invoice } from './invoice';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<Invoice[]>(environment.apiUrl + '/invoices')
      .pipe(map((data) => data['hydra:member'] as Invoice[]));
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
