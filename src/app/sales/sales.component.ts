import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  revenues: any[] = [];  // Initialize as an empty array
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getRevenueData();
  }

  getRevenueData() {
    this.dataService.getData().subscribe({
      next: (result) => {
        console.log('Received data:', result);
        this.revenues = result;  // Update the revenues array
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  getTotalSales(): number {
    if (!this.revenues || this.revenues.length === 0) {
      return 0;
    }

    // Ensure amount is treated as a number (using parseFloat)
    return this.revenues.reduce((total, revenue) => total + (parseFloat(revenue.amount) || 0), 0);
  }

  getTotalQuantity(): number {
    if (!this.revenues || this.revenues.length === 0) {
      return 0;
    }

    return this.revenues.reduce((total, revenue) => total + (revenue.quantity || 0), 0);
  }
}
