import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetails } from 'src/app/shared/payment-details.model';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [],
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(
    public service: PaymentDetailsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.service.formData.paymentDetailID == 0
      ? this.insertRecords(form)
      : this.updateRecords(form);
  }

  insertRecords(form: NgForm) {
    this.service.postPaymentDetails().subscribe(
      (successResp) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toaster.success(
          'Details subimitted successfully.',
          'Payment Details Register'
        );
      },
      (errorResp) => {
        console.log(errorResp);
        this.toaster.error(
          'Form submission failed.',
          'Payment Details Register'
        );
      }
    );
  }

  updateRecords(form: NgForm) {
    console.log(this.service.formData.paymentDetailID);
    this.service.putPaymentDetails().subscribe(
      (successResp) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toaster.info(
          'Details updated successfully.',
          'Payment Details Register'
        );
      },
      (errorResp) => {
        console.log(errorResp);
        this.toaster.error('Form update failed.', 'Payment Details Register');
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset(); //this form reset all the fields in the specific form provided
    this.service.formData = new PaymentDetails(); //after that we assign a fresh model of the class
  }
}
