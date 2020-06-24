import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { MessageComponent } from './message.component';
import { MessageCreateComponent } from './message-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InboxComponent, MessageComponent, MessageCreateComponent],
  imports: [SharedModule],
})
export class InboxModule {}
