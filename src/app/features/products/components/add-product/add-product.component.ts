import { Component, ElementRef, inject, NgZone, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICreateProduct } from '../../interfaces/i-product';
import { CategoryService } from '../../../category/services/category.service';
import { ICategory } from '../../../category/interfaces/i-category';
import { ProductService } from '../../services/product.service';
import { ColorService } from '../../../variants/services/color.service';
import { SizeService } from '../../../variants/services/size.service';
import { IColor } from '../../../variants/interfaces/i-color';
import { ISize } from '../../../variants/interfaces/i-size';
import Dropzone from 'dropzone';
import { ICreateProductVariant } from '../../interfaces/i-product-variant';
import { ICreateProductImage } from '../../interfaces/i-product-image';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  // Track a Dropzone instance per variant index
  dropzones: Map<number, Dropzone> = new Map();
  // Track which variant indices have already had their dropzone initialized
  private initializedDropzones: Set<number> = new Set();
  dropzone!: Dropzone;
  categories: ICategory[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  productForm!: FormGroup;
  isLoading: boolean = false;

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private colorService = inject(ColorService);
  private sizeService = inject(SizeService);
  private fb = inject(FormBuilder);
  private zone = inject(NgZone);
  private el = inject(ElementRef);

  ngOnInit(): void {
    this.initializeForm();
    this.addProductVariant();
    this.loadCategories();
    this.loadColors();
    this.loadSizes();
  }

  ngAfterViewChecked(): void {
    this.productVariantArray.controls.forEach((_, index) => {
      if (!this.initializedDropzones.has(index)) {
        this.initializeDropzone(index);
      }
    });
  }

  initializeForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      productVariants: this.fb.array([]),
    });
  }

  get productVariantArray(): FormArray {
    return this.productForm.get('productVariants') as FormArray;
  }

  addProductVariant() {
    const pv = this.fb.group({
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      originalPrice: ['', Validators.required],
      salePrice: [''],
      wholesalePrice: [''],
      stock: [''],
      sku: [''],
      barcode: [''],
      isFeatured: [false],
      imageAltText: [''],
    });
    this.productVariantArray.push(pv);
  }

  removeProductVariant(index: number) {
    if (this.dropzones.has(index)) {
      this.dropzones.get(index)!.destroy();
      this.dropzones.delete(index);
      this.initializedDropzones.delete(index);
    }

    this.productVariantArray.removeAt(index);

    // Re-key remaining dropzones: indices above the removed one shift down by 1
    const updatedDropzones = new Map<number, Dropzone>();
    const updatedInitialized = new Set<number>();

    this.dropzones.forEach((dz, i) => {
      const newIndex = i > index ? i - 1 : i;
      updatedDropzones.set(newIndex, dz);
      updatedInitialized.add(newIndex);
    });

    this.dropzones = updatedDropzones;
    this.initializedDropzones = updatedInitialized;
  }

  private initializeDropzone(variantIndex: number): void {
    const dropzoneElement = this.el.nativeElement.querySelector(
      `#dropzone-${variantIndex}`,
    );
    // Element not in DOM yet — will retry on next AfterViewChecked cycle
    if (!dropzoneElement) return;

    // Mark as initialized immediately to prevent double-init
    this.initializedDropzones.add(variantIndex);

    const previewTemplate =
      this.el.nativeElement.querySelector('#preview-template')?.innerHTML ?? '';

    const dz = new Dropzone(dropzoneElement, {
      url: '/api/upload', // not used — autoProcessQueue: false
      previewTemplate,
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: 1,
      maxFilesize: 5, // MB
      acceptedFiles: 'image/*',
      maxFiles: 1,
    });

    dz.on('addedfile', (file: File) => {
      this.zone.run(() => {
        // Enforce single-file by removing any previous file first
        if (dz.files.length > 1) {
          dz.removeFile(dz.files[0]);
        }
      });
    });

    dz.on('removedfile', (_file) => {
      this.zone.run(() => {
        // Nothing extra needed; we read dz.files on submit
      });
    });

    this.dropzones.set(variantIndex, dz);
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data;
    });
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

  loadColors() {
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

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const variants: ICreateProductVariant[] =
      this.productVariantArray.controls.map((ctrl, index) => {
        const v = ctrl.value;

        // Grab the File from the Dropzone for this variant (if any)
        const dz = this.dropzones.get(index);
        const imageFile: File | null =
          dz && dz.files.length > 0 ? dz.files[0] : null;

        const productImage: ICreateProductImage | null = imageFile
          ? { productImage: imageFile, altText: v.imageAltText ?? '' }
          : null;

        const variant: ICreateProductVariant = {
          colorId: Number(v.colorId || null),
          sizeId: Number(v.sizeId || null),
          originalPrice: v.originalPrice,
          salePrice: v.salePrice,
          wholesalePrice: v.wholesalePrice,
          stock: v.stock,
          sku: 'zz',
          // sku: v.sku,
          barcode: 'xx',
          // barcode: v.barcode,
          isFeatured: v.isFeatured ?? false,
          imageFile: productImage,
        };

        return variant;
      });

    const newProduct: ICreateProduct = {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      categoryId: Number(this.productForm.value.categoryId),
      productVariants: variants,
    };

    // If any variant has an image we need multipart/form-data, otherwise JSON
    const hasImages = variants.some((v) => v.imageFile?.productImage != null);

    console.log(newProduct);
    if (hasImages) {
      const formData = this.buildFormData(newProduct);
      this.productService.create(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Product created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.isLoading = false;
        },
      });
    }
    // else {
    //   this.productService.create(newProduct).subscribe({
    //     next: (response) => {
    //       this.isLoading = false;
    //       console.log('Product created successfully:', response);
    //     },
    //     error: (error) => {
    //       console.error('Error creating product:', error);
    //       this.isLoading = false;
    //     },
    //   });
    // }
  }

  /** Serialize ICreateProduct into FormData for multipart upload */
  private buildFormData(product: ICreateProduct): FormData {
    const fd = new FormData();
    fd.append('title', product.title);
    fd.append('description', product.description);
    fd.append('categoryId', product.categoryId.toString());

    product.productVariants.forEach((v, i) => {
      const prefix = `ProductVariants[${i}]`;
      if (v.colorId != null)
        fd.append(`${prefix}.ColorId`, v.colorId.toString());
      if (v.sizeId != null) fd.append(`${prefix}.SizeId`, v.sizeId.toString());
      if (v.originalPrice != null)
        fd.append(`${prefix}.OriginalPrice`, v.originalPrice.toString());
      if (v.salePrice != null)
        fd.append(`${prefix}.SalePrice`, v.salePrice.toString());
      if (v.wholesalePrice != null)
        fd.append(`${prefix}.WholesalePrice`, v.wholesalePrice.toString());
      if (v.stock != null) fd.append(`${prefix}.Stock`, v.stock.toString());
      if (v.sku) fd.append(`${prefix}.SKU`, v.sku);
      if (v.barcode) fd.append(`${prefix}.Barcode`, v.barcode);
      fd.append(`${prefix}.IsFeatured`, v.isFeatured.toString());

      if (v.imageFile?.productImage) {
        fd.append(`${prefix}.ImageFile.ProductImage`, v.imageFile.productImage);
        fd.append(
          `${prefix}.ImageFile.AltText`,
          v.imageFile.altText ?? '',
        );
      }
    });

    return fd;
  }
}
