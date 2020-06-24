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
import { AuthGuard } from './auth/auth.guard';
import { FormGuard } from './ui/form.guard';
import { CustomersResolverService } from './customers/customers-resolver.service';
import { InboxComponent } from './inbox/inbox.component';
import { MessageCreateComponent } from './inbox/message-create.component';
import { MessageComponent } from './inbox/message.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customers/new',
    component: CustomerCreateComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard],
  },
  {
    path: 'customers/:id',
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
    resolve: { customer: CustomersResolverService },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    resolve: { customers: CustomersResolverService },
  },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  {
    path: 'invoices/new',
    component: InvoiceCreateComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices/:id',
    component: InvoiceEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inbox',
    component: InboxComponent,
    children: [
      { path: 'create', component: MessageCreateComponent },
      { path: ':id', component: MessageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
