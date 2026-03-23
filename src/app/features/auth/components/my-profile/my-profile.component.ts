import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  currentUser!: IUser; // Replace with actual user type
  private authService = inject(AuthService);

  ngOnInit(): void {
    // this.authService.getById().subscribe
  }

  LogOut() {
    this.authService.logout();
  }
}
