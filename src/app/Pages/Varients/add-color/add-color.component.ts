import { Component } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';

@Component({
  selector: 'app-add-color',
  imports: [FormsModule],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css',
})
export class AddColorComponent {
  isLoading: boolean = false;
  color!: { name: string; colorCode: string };
  constructor(
    private popupService: PopUpService,
    private varientService: ProductVarientService
  ) {}

  closePopup() {
    this.popupService.closePopup('addColorPopup');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    this.varientService
      .AddNewColor(this.color.name, this.color.colorCode)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
