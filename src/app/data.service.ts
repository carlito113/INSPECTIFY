import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Base API URL

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Revenue`);
  }

  getExpense(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/expenses`);
  }

  getTotalAmount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/revenue/total`);
  }
  getTotalSales(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sales/total`);
  }
  getTotalExpense(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/expense/total`)
  }

  getWeeklyRevenue(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/weekly`);
  } 

  addExpense(expenseData: { type_of_expense: string;  amount: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-expense`, expenseData); // Use the POST method to 
  }
  
  updateRevenue(
    id: number,
    revenueData: { product: string; quantity: number; amount: number }
  ): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/Revenue/${id}`, revenueData);
  }

  updateExpense(
    id: number,
    expenseData: { type_of_expense: string; amount: number }
  ): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/edit-expense/${id}`, expenseData);
  }

  getWeeklyExpense(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/weekly-expense`);
  }

  private lossSource = new BehaviorSubject<number>(0); // Initial loss value
  currentLoss = this.lossSource.asObservable();

  // Method to update the loss value
  updateLoss(loss: number): void {
    this.lossSource.next(loss);
  }


}

