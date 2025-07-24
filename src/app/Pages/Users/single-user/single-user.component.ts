import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../Models/Auth/user';

@Component({
  selector: 'app-single-user',
  imports: [],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit{
  isLoading: boolean = false;
  currentUser!: User | null;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.currentUser && this.currentUser.UserId) {
      const updatedUser: User = { ...this.currentUser, ...form.value };
      this.authService.UpdateUserById(this.currentUser.UserId, updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error updating user:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('UserId is undefined. Cannot update user.');
      this.isLoading = false;
    }
  }
}
