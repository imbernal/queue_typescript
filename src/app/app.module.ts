import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';




import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerService } from './customer.service';
import { HttpClientModule } from '@angular/common/http';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CacheInterceptor } from './auth/cache.interceptor';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


const routes: Routes = [
  {
    path: 'list', component: CustomerComponent,
  },
  {
    path: 'edit/:id', component: EditCustomerComponent,
  },
  {
    path: 'create', component: AddCustomerComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
