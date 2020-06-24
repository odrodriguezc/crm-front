import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  template: `
    <p>
      {{ messageId }}
    </p>
  `,
  styles: [],
})
export class MessageComponent implements OnInit {
  messageId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.messageId = +params.get('id');
    });
  }
}
