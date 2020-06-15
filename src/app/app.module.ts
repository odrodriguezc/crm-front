import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    CustomersComponent,
    CustomerEditComponent,
    CustomerCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
