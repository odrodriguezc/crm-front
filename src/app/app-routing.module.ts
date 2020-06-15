import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
