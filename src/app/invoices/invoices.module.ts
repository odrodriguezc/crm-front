import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InvoiceCreateComponent } from './invoice-create.component';
import { InvoiceEditComponent } from './invoice-edit.component';
import { InvoicesComponent } from './invoices.component';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceEditComponent,
    InvoiceCreateComponent,
  ],
  imports: [SharedModule],
})
export class InvoicesModule {}
