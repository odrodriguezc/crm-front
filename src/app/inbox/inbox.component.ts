import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './message';
import { InboxService } from './inbox.service';

@Component({
  selector: 'app-inbox',
  template: `
    <h1>Mes messages</h1>
    <a routerLink="create" class="btn btn-outline-success">Nouveau message</a>
    <div class="border border-solid rounded row">
      <nav class="list-group col-5">
        <a
          routerLink="{{ m.id }}"
          class="list-group-item"
          *ngFor="let m of messages$ | async"
        >
          <strong>{{ m.author }}</strong>
          <small class="d-block">{{ m.date }}</small>
        </a>
      </nav>
      <div class="col-7">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class InboxComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private service: InboxService) {}

  ngOnInit(): void {
    this.messages$ = this.service.findAll();
  }
}
