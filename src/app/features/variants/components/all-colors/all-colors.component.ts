import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColor, ICreate_UpdateColor } from '../../interfaces/i-color';
import { ColorService } from '../../services/color.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-colors',
  imports: [ReactiveFormsModule],
  templateUrl: './all-colors.component.html',
  styleUrl: './all-colors.component.css',
})
export class AllColorsComponent implements OnInit {
  colors: IColor[] = [];
  colorForm!: FormGroup;
  isLoading: boolean = false;

  private colorService = inject(ColorService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  

  ngOnInit(): void {
    this.initializeForm();
    this.loadColors();
  }

  loadColors(): void {
    this.colorService.getAll().subscribe({
      next: (response) => {
        this.colors = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initializeForm() {
    this.colorForm = this.fb.group({
      name: ['', [Validators.required]],
      colorCode: ['', [Validators.required]],
    });
  }

  goToColor(id: number) {
    this.router.navigate(['colors/single-color', id]);
  }

  onSubmit() {
    if (this.colorForm.invalid) {
      this.colorForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const color: ICreate_UpdateColor = {
      name: this.colorForm.value.name,
      colorCode: this.colorForm.value.colorCode,
    };

    console.log(color);

    this.colorService.create(color).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.colorForm.reset();
        // dismiss modal
        const modalEl = document.getElementById('exampleModal');
        if (modalEl) {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap && bootstrap.Modal) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
          }
        }
        this.loadColors(); // refresh list
        console.log(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
}
