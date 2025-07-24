import { PopUpService } from './../../../Services/PopUp/pop-up.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-vendors',
  imports: [],
  templateUrl: './all-vendors.component.html',
  styleUrl: './all-vendors.component.css'
})
export class AllVendorsComponent {


  constructor(
    private popupService: PopUpService
  ) { }

  openAddVendorPopup() {
    this.popupService.openPopup('addVendorPopup');
  }
}
