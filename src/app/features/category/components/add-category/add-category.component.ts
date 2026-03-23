import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import Dropzone from 'dropzone';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ICreate_UpdateCategory } from '../../interfaces/i-category';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  dropzone!: Dropzone;
  categoryForm!: FormGroup;
  // imageFile: { file: File } | null = null;
  imageFile!: File;
  isLoading: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  private categoryService = inject(CategoryService);
  private zone = inject(NgZone);
  private el = inject(ElementRef);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initialzeForm();
  }

  initialzeForm() {
    this.categoryForm = this.fb.group({
      title: [''],
      description: [''],
      image: [null],
    });
  }

  ngAfterViewInit(): void {
    const previewTemplate =
      this.el.nativeElement.querySelector('#preview-template').innerHTML;

    this.dropzone = new Dropzone(
      this.el.nativeElement.querySelector('#dropzone-area'),
      {
        url: '/api/upload', // Required by Dropzone but unused (autoProcessQueue: false)
        previewTemplate,
        addRemoveLinks: true,
        autoProcessQueue: false, // We handle upload manually via the form
        maxFiles: 1,
        maxFilesize: 2, // MB
        acceptedFiles: 'image/*',
      },
    );

    this.dropzone.on('addedfile', (file) => {
      this.zone.run(() => {
        // If a file already exists, remove the previous one
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

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const category: ICreate_UpdateCategory = {
      title: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
      image: this.imageFile,
    };

    console.log(category);

    this.categoryService.create(category).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = '';
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        this.errorMessage = error.error;
      },
    });
  }
}
