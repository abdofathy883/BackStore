import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ILogin } from '../../interfaces/i-user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  isLoading: boolean = false;

  userLogin: ILogin = {
    Email: '',
    Password: ''
  };

  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.userLogin).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['my-profile', response.id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    })
  }
}
