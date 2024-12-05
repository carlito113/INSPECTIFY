import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }
  downloadPdf() {
    return this.http.get('http://localhost:8000/download-pdf', {
      responseType: 'blob', // Handle binary data
    });
  }
}
