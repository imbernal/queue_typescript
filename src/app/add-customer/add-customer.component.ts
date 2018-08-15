import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  name: String = '';
  phone: String = '';
  email: String = '';

  constructor(private _service: CustomerService, private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.customerForm = this._formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    // this._service.saveCustomer(form).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

}
