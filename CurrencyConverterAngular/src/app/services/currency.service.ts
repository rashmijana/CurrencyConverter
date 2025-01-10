import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'http://localhost:8082/api'; // Update this to match your Spring Boot server URL
  constructor(private http: HttpClient) {}

  // Fetch available currency rates
  fetchRates(): Observable<any> {
    this.http.get(`${this.baseUrl}/rates`);
    return this.http.get(`${this.baseUrl}/fetchcurrency`)
  }
  // Convert currency
  convertCurrency(source: string, destination: string, amount: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/convert?source=${source}&destination=${destination}&amount=${amount}`
    );
  }

  // Fetch conversion history
  getHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/history`);
  }
}

