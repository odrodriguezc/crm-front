import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

interface Flash {
  type: string;
  message: string;
}

interface ApiViolation {
  propertyPath: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UiService {
  flash = new Subject<Flash>();
  loadingSubject = new Subject<boolean>();

  constructor() {}

  setLoading(value: boolean) {
    this.loadingSubject.next(value);
  }

  fillViolationsInForm(form: FormGroup, violations: ApiViolation[]) {
    for (const v of violations) {
      const fieldname = v.propertyPath;
      const message = v.message;

      form.controls[fieldname].setErrors({
        invalid: message,
      });
    }
  }

  addFlash(type: string, message: string) {
    this.flash.next({
      type: type,
      message: message,
    });
  }
}
