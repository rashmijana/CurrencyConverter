import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  imports: [FormsModule,CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  conversionHistory: any[]=[];
  currentPage: number=1;
  itemsperPage: number=10;

  constructor(private currencyService:CurrencyService,
    private router:Router
  ) {}

  goBackToConverter(): void {
    this.router.navigate(['/']);  // Navigate to the home (converter) page
  }
  ngOnInit(): void {
      this.currencyService.getHistory().subscribe(
        (data)=>{
          this.conversionHistory=data;
        },
        (error)=>{
          console.error(error);
        }
      );
  }

}
