import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerCreateComponent } from '../customers/customer-create/customer-create.component';
import { InvoiceCreateComponent } from '../invoices/invoice-create.component';
import { CustomerEditComponent } from '../customers/customer-edit.component';
import { InvoiceEditComponent } from '../invoices/invoice-edit.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component:
      | CustomerCreateComponent
      | InvoiceCreateComponent
      | CustomerEditComponent
      | InvoiceEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.submitted) {
      return true;
    }
    return window.confirm('Etes vous sûr de vouloir partir ?');
  }
}
