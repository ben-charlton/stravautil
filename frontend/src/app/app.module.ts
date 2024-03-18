// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
    // Add other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
    // Add other modules here (e.g., FormsModule, ReactiveFormsModule)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }