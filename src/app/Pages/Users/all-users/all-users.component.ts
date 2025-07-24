import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';

@Component({
  selector: 'app-all-users',
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  constructor(
    private authService: AuthService,
    private popUpService: PopUpService
  ) {}
  openAddUserPopup() {
    this.popUpService.openPopup('addUserPopup');
  }
}
