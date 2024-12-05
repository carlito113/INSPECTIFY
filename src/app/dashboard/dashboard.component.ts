import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { WeeklyComponent } from '../weekly/weekly.component';
import { LossComponent } from '../loss/loss.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    totalRevenue: any = null; // Initialize as an empty array
    totalSales: any = null;  // or undefined
    totalExpense: any = null;
    totalLoss: any = null;
    weeklyProfit: any[] = [];


  constructor(private dataService: DataService) {

  } 

  ngOnInit(): void {
    this.getTotalAmount(); // Call the method properly
    this.getTotalSales(); // Call the method properly
    this.getTotalExpense(); // Call the method properly
    this.getTotalSales();

  }

  getTotalAmount(): void {
    this.dataService.getTotalAmount().subscribe(
      (res) => {
        console.log('API Response Revenue:', res);
        this.totalRevenue = res; // Assuming `res` has a `total` property
      },
      (error) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }

  getTotalExpense(): void {
    this.dataService.getTotalExpense().subscribe(
      (res) => {
        console.log('API Response Revenue:', res);
        this.totalExpense = res; // Assuming `res` has a `total` property
      },
      (error) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }

  getTotalSales(): void {
    this.dataService.getTotalSales().subscribe(
      (res) => {
        console.log('API Response Sales:', res);
        this.totalSales = res; // Assuming `res` has a `total` property
      },
      (error) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }

getloss(): void {
  const totalLoss = this.weeklyProfit.reduce((sum, week) => sum + week.loss, 0);
  this.dataService.updateLoss(totalLoss);
  console.log('Total Loss:', totalLoss);
    console.log('Total Loss in Dashboard:', this.totalLoss);
    console.log("Hwllo")


}
}
