import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div>
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <button class="page-link" (click)="handlePageClick(currentPage - 1)">
            &laquo;
          </button>
        </li>
        <li
          class="page-item"
          [class.active]="page === currentPage"
          *ngFor="let page of pages"
        >
          <button class="page-link" (click)="handlePageClick(page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" [class.disabled]="currentPage === pages.length">
          <button class="page-link" (click)="handlePageClick(currentPage + 1)">
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  currentPage = 1;

  @Input()
  itemsPerPage = 10;

  @Input()
  items: number;

  @Output()
  pageChanged = new EventEmitter<number>();

  pages = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes) {
    if (!changes.items) {
      return;
    }
    this.calculatePages();
  }

  handlePageClick(pageNumber: number) {
    this.pageChanged.emit(pageNumber);
  }

  calculatePages() {
    const pagesCount = Math.ceil(this.items / this.itemsPerPage);

    this.pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }
  }
}
