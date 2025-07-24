import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';

@Component({
  selector: 'app-all-colors',
  imports: [],
  templateUrl: './all-colors.component.html',
  styleUrl: './all-colors.component.css'
})
export class AllColorsComponent implements OnInit{
  colors!: {id: number, colorName: string, colorCode: string}[];
  constructor(
    private popupService: PopUpService,
    private varientService: ProductVarientService
  ) {}
  ngOnInit(): void {
    this.varientService.getAllColors().subscribe({
      next: (response) => {
        this.colors = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openAddColorPopup() {
    this.popupService.openPopup('addColorPopup');
  }
}
