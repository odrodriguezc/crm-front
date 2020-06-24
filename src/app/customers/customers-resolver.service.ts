import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Customer } from './customer';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersResolverService
  implements Resolve<Customer[] | Customer> {
  constructor(private customersService: CustomersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Customer[] | Customer> | Promise<Customer[]> | Customer[] {
    if (route.paramMap.has('id')) {
      return this.customersService.find(+route.paramMap.get('id'));
    }

    return this.customersService.findAll();
  }
}
