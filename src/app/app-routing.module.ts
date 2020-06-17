import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceCreateComponent } from './invoices/invoice-create.component';
import { InvoiceEditComponent } from './invoices/invoice-edit.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customers/new',
    component: CustomerCreateComponent,
    pathMatch: 'full',
  },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerEditComponent },
  { path: 'invoices', component: InvoicesComponent },
  {
    path: 'invoices/new',
    component: InvoiceCreateComponent,
    pathMatch: 'full',
  },
  { path: 'invoices/:id', component: InvoiceEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
