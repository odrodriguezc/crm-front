import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class AuthModule {}
