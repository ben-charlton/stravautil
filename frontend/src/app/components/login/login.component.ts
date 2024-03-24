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
    window.location.href = 'http://www.strava.com/oauth/authorize?client_id=121489&response_type=code&redirect_uri=http://127.0.0.1:5000/auth/callback&approval_prompt=force&scope=activity:read_all,profile:read_all';

    //this.loginService.loginWithStrava().subscribe(() => {
      // Redirect or handle success response
     // this.router.navigate(['/dashboard']);
    //});
  }
}