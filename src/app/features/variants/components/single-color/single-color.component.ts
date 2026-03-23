import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { IColor, ICreate_UpdateColor } from '../../interfaces/i-color';

@Component({
  selector: 'app-single-color',
  imports: [ReactiveFormsModule],
  templateUrl: './single-color.component.html',
  styleUrl: './single-color.component.css',
})
export class SingleColorComponent implements OnInit {
  color!: IColor;
  colorForm!: FormGroup;
  isLoading: boolean = false;

  private colorService = inject(ColorService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.initializeForm();
    this.loadColor();
  }

  initializeForm() {
    this.colorForm = this.fb.group({
      name: [''],
      colorCode: [''],
    });
  }

  loadColor() {
    const colorIdParam = this.route.snapshot.paramMap.get('id');
    const colorId = colorIdParam ? Number(colorIdParam) : Number(colorIdParam);
    this.colorService.getById(colorId).subscribe({
      next: (response) => {
        this.color = response;
        this.populateColor();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  populateColor() {
    this.colorForm.patchValue({
      name: this.color.name,
      colorCode: this.color.colorCode,
    });
  }

  onSubmit() {
    if (this.colorForm.invalid) {
      this.colorForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const newColor: ICreate_UpdateColor = {
      name: this.colorForm.value.name,
      colorCode: this.colorForm.value.colorCode,
    };

    this.colorService.update(newColor).subscribe({
      next: (response) => {
        this.isLoading = false;
        // this.currentColor = response;
        console.log(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  toggleVisibility() {
    debugger;
    this.colorService.toggleVisibility(this.color.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletColor() {
    debugger;
    this.colorService.delet(this.color.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['varient/all-colors']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
