import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  loginWithStrava(): void {
    this.loginService.loginWithStrava().subscribe(() => {
      // Redirect or handle success response
      this.router.navigate(['/dashboard']);
    });
  }
}