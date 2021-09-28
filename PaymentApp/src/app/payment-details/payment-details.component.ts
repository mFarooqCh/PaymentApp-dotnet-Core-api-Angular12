import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from '../shared/payment-details.model';
import { PaymentDetailsService } from '../shared/payment-details.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [],
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public service: PaymentDetailsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    //immediatly called after rendering of this component
    this.service.refreshList();
  }

  populateForm(data: PaymentDetails) {
    this.service.formData = data; // direct assignment will reflect in real time update //which we don't want, we want update on button click
    //this.service.formData = Object.assign({}, data);
  }

  deleteRecord(id: number) {
    if (confirm('Are uou sure you want to remove this record?')) {
      this.service.deletePaymentDetail(id).subscribe(
        (successResp) => {
          this.service.refreshList();
          this.toaster.warning(
            'Payment details removed successfully.',
            'Payment Detail Register'
          );
        },
        (errorResp) => {
          console.log(errorResp);
        }
      );
    }
  }
}
