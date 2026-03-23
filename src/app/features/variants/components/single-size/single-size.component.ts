import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreate_UpdateSize, ISize } from '../../interfaces/i-size';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-single-size',
  imports: [ReactiveFormsModule],
  templateUrl: './single-size.component.html',
  styleUrl: './single-size.component.css',
})
export class SingleSizeComponent implements OnInit {
  currentSize!: ISize;
  sizeForm!: FormGroup;

  isLoading: boolean = false;
  
  private sizeService = inject(SizeService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const sizeIdParam = this.route.snapshot.paramMap.get('id');
    const sizeId = sizeIdParam ? Number(sizeIdParam) : Number(sizeIdParam);
    this.sizeService.getById(sizeId).subscribe({
      next: (response) => {
        this.currentSize = response;
        console.log(`Size is`, response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.sizeForm.invalid) {
      this.sizeForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const size: ICreate_UpdateSize = {
      name: this.sizeForm.value.name
    };
    // this.sizeService.update(this.currentSize.id, size).subscribe({
    //   next: (response) => {
    //     this.currentSize = response;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }

  toggleVisibility() {
    this.sizeService.toggleVisibility(this.currentSize.id);
  }

  deleteSize() {
    this.sizeService.delete(this.currentSize.id).subscribe({
      next: (respone) => {
        this.router.navigate(['/varient/all-sizes']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
