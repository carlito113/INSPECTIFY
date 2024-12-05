import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  expense: any;

  constructor( private dataService:DataService){}

  
  ngOnInit(): void{
    this.getExpenseData();
  }

  getExpenseData(){
    this.dataService.getExpense().subscribe(result => {
      this.expense = result
      console.log("hello")
      console.log(this.expense)
    });
  }

}
