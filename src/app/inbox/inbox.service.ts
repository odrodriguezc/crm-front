import { Injectable } from '@angular/core';
import { Message } from './message';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  messages: Message[] = [
    {
      id: 1,
      author: 'Karl Marx',
      email: 'karl@mail.com',
      date: '2020-01-01',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      author: 'Lukas ',
      email: 'lukas@mail.com',
      date: '2020-02-02',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      author: 'Jean Philiip',
      email: 'jean@mail.com',
      date: '2020-03-01',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 4,
      author: 'Louis XVI',
      email: 'leroy@mail.com',
      date: '2020-03-05',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 5,
      author: 'Charles V',
      email: 'charles@mail.com',
      date: '2020-02-06',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  constructor() {}

  findAll() {
    return of(this.messages);
  }

  find(id: number) {
    return of(this.messages.find((m) => m.id === id));
  }
}
