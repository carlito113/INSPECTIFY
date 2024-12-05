import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {

  expenses: any[] = []; // List of expense records
  type_of_expense = '';
  amount: number | null = null;
  expenseIdtoEdit: number | null = null;
  responseMessage = '';

  constructor(private dataService:DataService){
    this.fetchExpense(); 
  }

  fetchExpense(): void {
    this.dataService.getExpense().subscribe((response) => {
      this.expenses = response;
    });
  }

  resetForm(): void {
    this.type_of_expense = '';
    this.amount = null;
    this.expenseIdtoEdit = null;
  }
  
  addExpense(): void {
    if (this.type_of_expense && this.amount !== null) {
      const expenseData = {
        type_of_expense: this.type_of_expense,
        amount: this.amount,
      };

      this.dataService.addExpense(expenseData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.fetchExpense();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding expense:', error);
          this.responseMessage = 'Failed to add expense.';
        }
      );
    } else {
      this.responseMessage = 'Please fill all fields.';
    }
  }
 

  
  editExpense(id: number, existingExpenseType: string, existingAmount: number): void {
    this.expenseIdtoEdit = id;
    this.type_of_expense = existingExpenseType;
    this.amount = existingAmount;
  }

  saveExpenseEdit(): void {
    if (this.expenseIdtoEdit !== null && this.type_of_expense && this.amount !== null) {
      const updateExpense = {
        type_of_expense: this.type_of_expense,
        amount: this.amount,
      };

      this.dataService.updateExpense(this.expenseIdtoEdit, updateExpense).subscribe(
        (response) => {
          this.responseMessage = response;
          console.log('Revenue record updated successfully:', response);
          this.resetForm();
          this.fetchExpense(); // Refresh the list
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
}
