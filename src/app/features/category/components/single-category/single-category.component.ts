import { Component, ElementRef, inject, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Dropzone from 'dropzone';
import { ICategory, ICreate_UpdateCategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-single-category',
  imports: [ReactiveFormsModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent implements OnInit {
  category = {} as ICategory;
  categoryForm!: FormGroup;
  dropzone!: Dropzone;
  imageFile!: File;
  isLoading: boolean = false;

  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private zone = inject(NgZone);
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.initializeDropzone();
    this.loadCategory();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      title: [''],
      description: [''],
      image: [null],
    });
  }

  initializeDropzone() {
    const previewTemplate =
      this.el.nativeElement.querySelector('#preview-template').innerHTML;

    this.dropzone = new Dropzone(
      this.el.nativeElement.querySelector('#dropzone-area'),
      {
        url: '/api/upload',
        previewTemplate,
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 1,
        maxFiles: 1,
        maxFilesize: 5, // MB
        acceptedFiles: 'image/*',
      },
    );

    this.dropzone.on('addedfile', (file) => {
      this.zone.run(() => {
        if (this.dropzone.files.length > 1) {
          this.dropzone.removeFile(this.dropzone.files[0]);
        }
        this.imageFile = file;
        this.categoryForm.patchValue({ image: file });
      });
    });

    this.dropzone.on('removedfile', () => {
      this.zone.run(() => {
        this.imageFile = null!;
        this.categoryForm.patchValue({ image: null });
      });
    });
  }

  populateForm() {
    this.categoryForm.patchValue({
      title: this.category.title,
      description: this.category.description,
      // image: this.category.imageUrl,
    });
  }

  populateDropzone(imageUrl: string): void {
    const fileName = imageUrl.split('/').pop() ?? 'image';

    // Create a mock file object — Dropzone needs this shape
    const mockFile = { name: fileName, size: 12345, accepted: true } as any;

    this.dropzone.emit('addedfile', mockFile);
    this.dropzone.emit('thumbnail', mockFile, imageUrl); // Shows the image preview
    this.dropzone.emit('complete', mockFile);
    this.dropzone.files.push(mockFile); // So maxFiles enforcement works
  }

  loadCategory() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.categoryService.getById(categoryId).subscribe({
        next: (category) => {
          this.category = category;
          this.populateForm();
          if (category.imageUrl) {
            this.populateDropzone(category.imageUrl);
          }
          console.log('Category:', category);
        },
        error: (error) => {
          console.error('Error fetching category:', error);
        },
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const category: ICreate_UpdateCategory = {
      title: this.categoryForm.value.title,
      description: this.categoryForm.value.description,
      image: this.imageFile,
    };
  }

  toggleVisibility() {
    this.categoryService.toggleVisibility(this.category.id);
  }

  deleteCategory() {
    this.categoryService.delete(this.category.id).subscribe({
      next: (respone) => {
        this.router.navigate(['/categories/all']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
