import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ICreate_UpdateSize, ISize } from '../../interfaces/i-size';
import { SizeService } from '../../services/size.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-sizes',
  imports: [ReactiveFormsModule],
  templateUrl: './all-sizes.component.html',
  styleUrl: './all-sizes.component.css',
})
export class AllSizesComponent implements OnInit {
  sizeForm!: FormGroup;
  sizes: ISize[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private sizeService = inject(SizeService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loadSizes();
    this.initializeForm();
  }

  loadSizes() {
    this.sizeService.getAll().subscribe({
      next: (response) => {
        this.sizes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initializeForm() {
    this.sizeForm = this.fb.group({
      name: [''],
    });
  }

  goToSingleSize(id: number) {
    this.router.navigate(['sizes/single-size', id]);
  }

  onSubmit() {
    if (this.sizeForm.invalid) {
      this.sizeForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const size: ICreate_UpdateSize = {
      name: this.sizeForm.value.name,
    };

    this.sizeService.create(size).subscribe({
      next: (response) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error;
      },
    });
  }
}
