import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styles: [],
})
export class CustomerCreateComponent implements OnInit {
  form = new FormGroup({
    fullName: new FormControl('', [
      //Validators.required,
      //Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  submitted: boolean = false;

  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }
    console.log(this.form.value);
    this.customersService.create(this.form.value).subscribe(
      (customer) => {
        this.router.navigateByUrl('/customers');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 400 && error.error.violations) {
          for (const v of error.error.violations) {
            const fieldname = v.propertyPath;
            const message = v.message;

            this.form.controls[fieldname].setErrors({
              invalid: message,
            });
          }
        }
      }
    );
  }

  hasError(inputName: string, errorName: string) {
    return this.form.controls[inputName].hasError(errorName) && this.submitted;
  }
}
