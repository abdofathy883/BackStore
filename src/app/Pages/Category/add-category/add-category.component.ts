import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import Dropzone from 'dropzone';
import { FormsModule, NgForm } from '@angular/forms';
import { Create_UpdateCategory } from '../../../Models/Product/product';
import { CategoryService } from '../../../Services/Category/category.service';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements AfterViewInit{
  dropzone!: Dropzone;
  image: { id: string; file: File } | null = null;
  isLoading: boolean = false;

  newCategory: Create_UpdateCategory = {
    name: '',
    description: '',
    image: ''
  };

  constructor(
    private categoryService: CategoryService,
    private popupService: PopUpService,
    private zone: NgZone,
    private el: ElementRef
  ) {}
  ngAfterViewInit(): void {
    const previewTemplate = this.el.nativeElement.querySelector('#preview-template').innerHTML;

    this.dropzone = new Dropzone(this.el.nativeElement.querySelector('#dropzone-area'), {
      url: '/api/upload',
      previewTemplate,
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: 1,
      maxFilesize: 5, // MB
      acceptedFiles: 'image/*',
      maxFiles: 1,
      init: () => {
        this.dropzone.on('addedfile', (file) => {
          this.zone.run(() => {
            if (this.dropzone.files.length > 1) {
            this.dropzone.removeFile(this.dropzone.files[0]);
          }
            const id = Math.random().toString(36).substring(2);
            (file as any)._customId = id;
            if (this.image) {
              this.dropzone.removeFile(this.dropzone.files[0]);
            }
            this.image = { id, file };
          });
        });

        this.dropzone.on('removedfile', (file) => {
          this.zone.run(() => {
            if (this.image && this.image.id === (file as any)._customId) {
              this.image = null;
            }
          });
        });
      }
    });
  }

  closePopup() {
    this.popupService.closePopup('addCategoryPopup');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    this.categoryService.AddNewCategory(this.newCategory).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('تم إضافة التصنيف بنجاح');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error adding category:', error);
      }
    });
  }
}
