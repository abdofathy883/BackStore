import { Component } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-size',
  imports: [FormsModule],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.css',
})
export class AddSizeComponent {
  isLoading: boolean = false;
  colorName: string = '';
  constructor(
    private popupService: PopUpService,
    private varientService: ProductVarientService
  ) {}

  closePopup() {
    this.popupService.closePopup('addSizePopup');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    this.varientService.AddNewSize(this.colorName).subscribe({
      next: (response) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
