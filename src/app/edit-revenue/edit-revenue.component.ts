import { Component } from '@angular/core';
import { RevenueService } from '../revenue.service';


@Component({
  selector: 'app-edit-revenue',
  templateUrl: './edit-revenue.component.html',
  styleUrl: './edit-revenue.component.css'
})
export class EditRevenueComponent {
  revenues: any[] = []; // List of revenue records
  product = '';
  quantity: number | null = null;
  amount: number | null = null;
  revenueIdToEdit: number | null = null;
  responseMessage = '';

  constructor(private revenueService: RevenueService) {
    this.fetchRevenues(); // Load revenues when the component initializes
  }

  fetchRevenues(): void {
    this.revenueService.getData().subscribe((response) => {
      this.revenues = response;
    });
  }

  editRevenue(id: number, existingProduct: string, existingQuantity: number, existingAmount: number): void {
    this.revenueIdToEdit = id;
    this.product = existingProduct;
    this.quantity = existingQuantity;
    this.amount = existingAmount;
  }

  saveRevenueEdit(): void {
    if (this.revenueIdToEdit !== null && this.product && this.quantity !== null && this.amount !== null) {
      const updatedRevenue = {
        product: this.product,
        quantity: this.quantity,
        amount: this.amount,
      };

      this.revenueService.updateRevenue(this.revenueIdToEdit, updatedRevenue).subscribe(
        (response) => {
          this.responseMessage = response;
          console.log('Revenue record updated successfully:', response);
          this.resetForm();
          this.fetchRevenues(); // Refresh the list
        },
        (error) => {
          console.error('Error updating revenue record:', error);
          this.responseMessage = 'Failed to update revenue record.';
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
    this.revenueIdToEdit = null;
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

}

