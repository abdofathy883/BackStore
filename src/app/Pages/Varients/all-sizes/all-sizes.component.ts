import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';

@Component({
  selector: 'app-all-sizes',
  imports: [],
  templateUrl: './all-sizes.component.html',
  styleUrl: './all-sizes.component.css'
})
export class AllSizesComponent implements OnInit{
  sizes!: { id: number, name: string}[];
  constructor(
    private popupService: PopUpService,
    private varientService: ProductVarientService
  ) {}

  ngOnInit(): void {
    this.varientService.getAllSizes().subscribe({
      next: (response) => {
        this.sizes = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openAddSizePopup() {
    this.popupService.openPopup('addSizePopup')
  }
}
