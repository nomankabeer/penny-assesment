import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';  // Import take operator


import { CommonModule } from '@angular/common';
import { UserService } from './user-listing.service';
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UserListingComponent {
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router, private UserService: UserService) {}
  
  users: any[] = [];
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }

  
  ngOnInit(): void {

    this.UserService.getListing().subscribe(
      (data) => {
        this.users = data;
        console.log('User listing:', data);
      },
      (error) => {
        alert('Session expired');
        this.logout()
        console.error('Error fetching user listing:', error);
      }
    );
  }
  
}
