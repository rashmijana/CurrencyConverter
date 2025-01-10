import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sourceCurrency = 'BNR';
  destinationCurrency = 'BNR';
  amount: number =0 ;
  convertedAmount: number | null = null;
  currencies: string[] = [];
  errorMessage = '';

  constructor(
    private currencyService: CurrencyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currencyService.fetchRates().subscribe(
      (data) => {
        this.currencies = (data);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch currency rates.';
        console.error(error);
      }
    );
  }

  convert(sourceCurrency: string, destinationCurrency: string, amount: number): void {
    console.log(sourceCurrency);
    console.log(destinationCurrency)
    if (this.sourceCurrency && this.destinationCurrency && this.amount) {
      this.currencyService
        .convertCurrency(this.sourceCurrency, this.destinationCurrency, this.amount)
        .subscribe(
          (response) => {
            console.log(response);
            this.convertedAmount = response;
          },
          (error) => {
            this.errorMessage = 'Failed to convert currency.';
            console.error(error);
          }
        );
    } else {
      this.convertedAmount = null;
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  goToHistory():void{
    this.router.navigate(['/history']);
  }
}
