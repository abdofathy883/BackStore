import { Component } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';

@Component({
  selector: 'app-add-vendor',
  imports: [],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})
export class AddVendorComponent {
  isLoading: boolean = false;

  constructor(
    private popupService: PopUpService
  ) {}

  closePopup() {
    this.popupService.closePopup('addVendorPopup');
  }
}
