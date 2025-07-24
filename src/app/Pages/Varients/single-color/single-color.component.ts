import { Component, OnInit } from '@angular/core';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-color',
  imports: [FormsModule],
  templateUrl: './single-color.component.html',
  styleUrl: './single-color.component.css'
})
export class SingleColorComponent implements OnInit{
  isLoading: boolean = false;
  currentColor!: {id: number, name: string, colorCode: string, isDeleted: boolean};

  constructor (
    private varientService: ProductVarientService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.varientService.GetColorById(this.currentColor.id).subscribe({
      next: (response) => {
        this.currentColor = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.varientService.UpdateColor(this.currentColor.id, this.currentColor.name, this.currentColor.colorCode, this.currentColor.isDeleted).subscribe({
      next: (response) => {
        this.currentColor = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  softDelete() {
    this.varientService.SoftDeletColor(this.currentColor.id);
  }

  permanentDelete() {
    this.varientService.PermanentDeleteColor(this.currentColor.id);
  }
}
