import { Component } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';

@Component({
  selector: 'app-add-user',
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private popupService: PopUpService
  ) {}

  // Add methods for handling form submission, validation, etc. as needed

  closePopup() {
    this.popupService.closePopup('addUserPopup');
  }
}
