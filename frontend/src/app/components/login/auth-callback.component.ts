
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-auth-callback',
  template: '<p>Loading...</p>'
})
export class AuthCallbackComponent implements OnInit {
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
    ) {}
  
    ngOnInit(): void {

        const code = this.route.snapshot.queryParams['code'];
    
        if (code) {
          this.authService.handleOAuthCallback(code).subscribe(
            (accessToken) => {
              localStorage.setItem('accessToken', accessToken.access_token.toString());
              this.router.navigate(['/dashboard']);
            },
            (error) => {
              console.error('Failed to exchange code for token:', error);
              this.router.navigate(['/login']);
            }
          );
        } else {
          console.error('Code not found in query params');
          this.router.navigate(['/login']);
        }
      }
}