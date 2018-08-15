import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: any;

  constructor(private _service: CustomerService) { }

  ngOnInit() {
    this._service.getAllCustomers().subscribe(
      res => this.customers = res
    );
  }

}
