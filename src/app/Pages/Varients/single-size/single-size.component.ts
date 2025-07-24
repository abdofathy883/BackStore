import { Component, OnInit } from '@angular/core';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-size',
  imports: [FormsModule],
  templateUrl: './single-size.component.html',
  styleUrl: './single-size.component.css',
})
export class SingleSizeComponent implements OnInit {
  isLoading: boolean = false;
  id: number = 0;
  currentSize!: { id: number; name: string; isDeleted: boolean };
  constructor(
    private varientService: ProductVarientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.varientService.GetSizeById(this.id).subscribe({
      next: (response) => {
        this.currentSize = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit(form: NgForm) {
    this.varientService.UpdateSize(this.id, this.currentSize.name).subscribe({
      next: (response) => {
        this.currentSize = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  softDeleteSize() {
    this.varientService.SoftDeletSize(this.currentSize.id);
  }

  permanentDeleteSize() {
    this.varientService.PermanentDeleteSize(this.currentSize.id).subscribe({
      next: (respone) => {
        this.router.navigate(['/varient/all-sizes']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
