
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
        // Extract authorization code from query parameters

        const code = this.route.snapshot.queryParams['code'];
    
        if (code) {
          // Call AuthService to exchange code for token
          this.authService.handleOAuthCallback(code).subscribe(
            (accessToken: string) => {
              // Token exchange successful
              // Store access token (e.g., in local storage)
              localStorage.setItem('accessToken', accessToken);
    
              // Redirect to dashboard or any other route
              this.router.navigate(['/dashboard']);
            },
            (error) => {
              // Handle error (e.g., display error message)
              console.error('Failed to exchange code for token:', error);
              // Redirect to error page or login page
              this.router.navigate(['/login']);
            }
          );
        } else {
          // Authorization code not found in query parameters
          console.error('Authorization code not found in query parameters');
          // Redirect to error page or login page
          this.router.navigate(['/login']);
        }
      }
}