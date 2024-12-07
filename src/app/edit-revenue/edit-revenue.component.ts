import { Component } from '@angular/core';
import { RevenueService } from '../revenue.service';


@Component({
  selector: 'app-edit-revenue',
  templateUrl: './edit-revenue.component.html',
  styleUrl: './edit-revenue.component.css'
})
export class EditRevenueComponent {
  revenues: any[] = [];
  product = '';
  quantity: number | null = null;
  price: number | null = null; // Add price
  amount =  0;
  id = '';
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

  editRevenue(id: number, existingProduct: string, existingQuantity: number, existingPrice: number): void {
    this.revenueIdToEdit = id;
    this.product = existingProduct;
    this.quantity = existingQuantity;
    this.price = existingPrice; // Set price from existing amount
    this.updateAmount(); // Recalculate the amount based on quantity and price
  }


  deleteRevenue(id: any){
    this.revenueService.deleteRevenue(id).subscribe((result) => {
      result;
      console.log('Revenue record deleted successfully:');
      this.fetchRevenues();
    })
  }

  saveRevenueEdit(): void {
    if (this.revenueIdToEdit !== null && this.product && this.quantity !== null && this.price !== null) {
      const updatedRevenue = {
        product: this.product,
        quantity: this.quantity,
        amount: this.amount, // Total amount (quantity * price)
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

  updateAmount(): void {
    if (this.quantity !== null && this.price !== null) {
      this.amount = this.quantity * this.price; // Calculate amount
    }
  }

  resetForm(): void {
    this.product = '';
    this.quantity = null;
    this.price = null;
    this.amount = 0;
    this.revenueIdToEdit = null;
    this.id = '';
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

