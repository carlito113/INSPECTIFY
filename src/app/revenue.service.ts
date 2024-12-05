import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
    
  private apiUrl = 'http://127.0.0.1:8000/api/products';
  
  private baseUrl = 'http://127.0.0.1:8000/api'; // Base API URL

  constructor( private http:HttpClient ) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Revenue`);
  }


  addProduct(productData: { product: string; quantity: number; amount: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData); // Use the POST method to `/products`
  }
  
  updateRevenue(
    id: number,
    revenueData: { product: string; quantity: number; amount: number }
  ): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/api/Revenue/${id}`, revenueData);
  }

  getWeeklyRevenue(): Observable<any> {
    return this.http.get('http://your-laravel-api.test/api/weekly');
  }  
  
  
}
