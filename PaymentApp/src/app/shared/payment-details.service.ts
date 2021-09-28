import { PaymentDetails } from './payment-details.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:40335/api/PaymentDetail';

  formData: PaymentDetails = new PaymentDetails(); //to implement two-way data binding i.e. (get saved values)
  dataList: PaymentDetails[];

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((resp) => {
        this.dataList = resp as PaymentDetails[];
      });
  }

  postPaymentDetails() {
    return this.http.post(this.baseURL, this.formData);
    //simply returning what we get in responce
  }

  putPaymentDetails() {
    //we will call the 'api/paymentDetail/id' i.e. put method for update
    return this.http.put(
      `${this.baseURL}/${this.formData.paymentDetailID}`,
      this.formData
    );
    //simply returning what we get in responce
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
