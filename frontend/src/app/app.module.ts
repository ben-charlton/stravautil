import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeartRateSummaryComponent } from './components/heart-rate-summary/heart-rate-summary.component';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/login/auth-callback.component';
import { CadenceSummaryComponent } from './components/cadence-summary/cadence-summary.component';
import { DistanceSummaryComponent } from './components/distance-summary/distance-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeartRateSummaryComponent,
    LoginComponent, 
    AuthCallbackComponent,
    CadenceSummaryComponent,
    DistanceSummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})

export class AppModule { }