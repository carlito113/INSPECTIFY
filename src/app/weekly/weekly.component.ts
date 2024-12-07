import { Component, effect, signal, computed } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent {

  weeklyProfit: any[] = [];
  profitloss: any[] = [];
  totalRevenue: number = 0;
  totalExpense: number = 0;
  totalProfit: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProfitLoss();
  }

  

  getProfitLoss(){
    this.dataService.getProfitLoss().subscribe(
      result => {
        this.profitloss = result;
        console.log("HEY Joyce",this.profitloss)

      }
    )
  }

}
