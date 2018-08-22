import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: any;

  constructor(private _service: CustomerService, private http: HttpClient) { }

  ngOnInit() {
    this._service.getAllCustomers().subscribe(
      res => this.customers = res
    );
  }

}
