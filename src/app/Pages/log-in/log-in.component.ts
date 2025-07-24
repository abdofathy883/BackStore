import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserLogin } from '../../Models/Auth/user';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  isLoading: boolean = false;
  userLogin: UserLogin = {
    Email: '',
    Password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.Login(this.userLogin).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        if (response.roles[0] === 'Cashier') {
          this.router.navigate(['/order/add-new-order']);
        } else  {
          this.router.navigate(['/dashboard']);
        } 
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }
}
