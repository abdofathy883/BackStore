import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/i-user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-users',
  imports: [RouterLink],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  users: IUser[] = [];
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goToUser(id: string) {
    this.router.navigate(['/users', id]);
  }
}
