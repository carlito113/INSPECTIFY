import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://127.0.0.1:8000/api/products';
  
  constructor(private http:HttpClient) {  }


  addProduct(productData: { product: string; quantity: number; amount: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData); // Use the POST method to `/products`
  }
}
