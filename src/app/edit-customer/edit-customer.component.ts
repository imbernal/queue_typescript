import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customerForm: FormGroup;
  name: String = '';
  phone: String = '';
  email: String = '';

  constructor(
    private _service: CustomerService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCustomer(this._route.snapshot.params['id']);
    this.customerForm = this._formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });

  }

  getCustomer(id) {
    this._service.getCustomerById(id);
  }

  onFormSubmit(form: NgForm) {
    // this._customerService.updateCustomer(form, this.id)
    //   .subscribe(res => {
    //     if (res.msg) {
    //       this.error = {
    //         valid: true,
    //         msg: res.msg
    //       };
    //     } else {
    //       this._router.navigate(['/customer-details', res._id]);
    //     }

    //   }, (err) => {
    //     console.log(err);
    //   }
    //   );
  }

}
