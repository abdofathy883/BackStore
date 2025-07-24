import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  CurrentUser: any = null; // Replace with actual user type

  constructor(private authService: AuthService) {
    this.CurrentUser = this.authService.getCurrentUser();
  }

  LogOut() {
    this.authService.LogOut();
  }
}
