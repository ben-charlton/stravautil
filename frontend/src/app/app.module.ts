import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeartRateSummaryComponent } from './components/heart-rate-summary/heart-rate-summary.component';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/login/auth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeartRateSummaryComponent,
    LoginComponent, 
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }