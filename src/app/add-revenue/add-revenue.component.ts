import { Component } from '@angular/core';
import { RevenueService } from '../revenue.service'; 

@Component({
  selector: 'app-add-revenue',
  templateUrl: './add-revenue.component.html',
  styleUrl: './add-revenue.component.css'
})
export class AddRevenueComponent {
  revenues: any;
  product = '';
  quantity: number | null = null;
  amount: number | null = null;
  responseMessage = '';

  constructor(private revenueService: RevenueService) {
    this.fetchRevenues();
  }

  fetchRevenues(): void {
    this.revenueService.getData().subscribe((response) => {
      this.revenues = response;
    });
  }

  addProduct(): void {
    if (this.product && this.quantity !== null && this.amount !== null) {
      const productData = {
        product: this.product,
        quantity: this.quantity,
        amount: this.amount,
      };

      this.revenueService.addProduct(productData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.fetchRevenues();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding product:', error);
          this.responseMessage = 'Failed to add product.';
        }
      );
    } else {
      this.responseMessage = 'Please fill all fields.';
    }
  }

  resetForm(): void {
    this.product = '';
    this.quantity = null;
    this.amount = null;
  }
}
