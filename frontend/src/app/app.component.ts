import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    
    isAuthenticated: boolean = false;
  
    constructor(private authService: AuthService) {}
  
    isLoggedIn(): boolean {
        console.trace('isLoggedIn() called');
        return this.authService.isLoggedIn();
    }

  }