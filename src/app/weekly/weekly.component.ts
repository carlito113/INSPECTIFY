import { Component, effect, signal, computed } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent {

  weeklyProfit: any[] = [];
  totalRevenue: number = 0;
  totalExpense: number = 0;
  totalProfit: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchWeeklyData();
  }
  fetchWeeklyData(): void {
    this.getWeeklyRevenues()
      .then(revenueData => this.getWeeklyExpenses(revenueData))
      .then(({ revenueData, expenseData }) => this.processData(revenueData, expenseData))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getWeeklyRevenues(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.dataService.getWeeklyRevenue().subscribe(
        revenueData => resolve(revenueData),
        error => reject(error)
      );
    });
  }

  getWeeklyExpenses(revenueData: any[]): Promise<{ revenueData: any[], expenseData: any[] }> {
    return new Promise((resolve, reject) => {
      this.dataService.getWeeklyExpense().subscribe(
        expenseData => resolve({ revenueData, expenseData }),
        error => reject(error)
      );
    });
  }

  processData(revenueData: any[], expenseData: any[]): void {
    const expenseMap = new Map(expenseData.map(exp => [exp.week, exp.total_expense || 0]));

    this.weeklyProfit = revenueData.map(week => {
      const total_expense = expenseMap.get(week.week) || 0;
      const profit = week.total_amount - total_expense;
      const loss = profit < 0 ? Math.abs(profit) : 0;

      return {
        formatted_week: week.formatted_week,
        total_amount: week.total_amount,
        total_expense: total_expense,
        profit: profit >= 0 ? profit : 0,
        loss: loss,
      };
    });

    // Calculate total loss and share it
    const totalLoss = this.weeklyProfit.reduce((sum, week) => sum + week.loss, 0);
    this.dataService.updateLoss(totalLoss);
    console.log('Total Loss:', totalLoss);
  }
  

  _mymessage!:string;


  
  get mymessage(){
    return this._mymessage;
   
  }
 
  set mymessage(value: string){
    this._mymessage = value;
    
  }


  ngDoCheck(){
   console.log('CHANGE DETECTION CYCLE CALLED');
  }
}
