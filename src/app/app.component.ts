import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UiService } from './ui/ui.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crm';
  flash = null;
  loading = false;

  constructor(
    private ui: UiService,
    private chRef: ChangeDetectorRef,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.ui.flash.subscribe((flash) => {
      this.flash = flash;
      window.setTimeout(() => (this.flash = null), 3000);
    });

    this.ui.loadingSubject.subscribe((value) => {
      this.loading = value;
      this.chRef.detectChanges();
    });
  }
}
