import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-single-user',
  imports: [ReactiveFormsModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css',
})
export class SingleUserComponent implements OnInit {
  userForm!: FormGroup;
  user!: IUser;
  isLoading: boolean = false;

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.authService.getById(userId).subscribe({
        next: (response) => {
          this.user = response;
          this.patchForm();
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      role: ['']
    });
  }

  patchForm(){
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      roles: this.user.roles
    });
  }

  updateUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // const updatedUser: UpdateUser = {
    //   firstName: this.currentUser.firstName,
    //   lastName: this.currentUser.lastName,
    //   email: this.currentUser.email,
    //   phoneNumber: this.currentUser.phoneNumber,
    // };
    // this.authService.UpdateUserById(updatedUser).subscribe({
    //   next: (response) => {
    //     console.log('User updated successfully:', response);
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error updating user:', error);
    //     this.isLoading = false;
    //   },
    // });
  }
}
