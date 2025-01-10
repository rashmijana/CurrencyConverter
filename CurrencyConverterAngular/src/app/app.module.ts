import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule 
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HistoryComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
