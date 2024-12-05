import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ExpenseComponent } from './expense/expense.component';
import { SalesComponent } from './sales/sales.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { LossComponent } from './loss/loss.component';
import { AddRevenueComponent } from './add-revenue/add-revenue.component';
import { EditRevenueComponent } from './edit-revenue/edit-revenue.component';
import { CommonModule } from '@angular/common';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';




const appRoutes: Routes = [
  {path: '', component:DashboardComponent},
  { path: 'revenue', component: RevenueComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'weekly', component: WeeklyComponent },
  { path: 'monthly', component: MonthlyComponent },
  {path: 'loss', component: LossComponent}, 
  {path: 'add-revenue', component: AddRevenueComponent},
  {path: 'edit-revenue', component: EditRevenueComponent},
  {path: 'edit-expense', component: EditExpenseComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RevenueComponent,
    NavigationComponent,
    ExpenseComponent,
    SalesComponent,
    WeeklyComponent,
    MonthlyComponent,
    LossComponent,
    AddRevenueComponent,
    EditRevenueComponent,
    EditExpenseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    RouterModule,
    RouterOutlet,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
