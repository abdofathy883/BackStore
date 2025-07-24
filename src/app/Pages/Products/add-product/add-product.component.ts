import { AfterViewInit, Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ProductVarientService } from '../../../Services/Varients/product-varient.service';
import { ProductService } from '../../../Services/Product/product.service';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import Dropzone from 'dropzone';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  colors: any[] = [];
  sizes: any[] = [];

  dropzone!: Dropzone;
  images: any[] = [];
  featuredImageId: string | null = null;
  constructor(
    private productVarientService: ProductVarientService,
    private productService: ProductService,
    private popupService: PopUpService,
    private zone: NgZone,
    private el: ElementRef
  ) { }
  ngAfterViewInit(): void {
    const previewTemplate = this.el.nativeElement.querySelector('#preview-template').innerHTML;

    this.dropzone = new Dropzone(this.el.nativeElement.querySelector('#dropzone-area'), {
      url: '/api/upload',
      previewTemplate,
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: 10,
      maxFilesize: 5, // MB
      acceptedFiles: 'image/*',
      init: () => {
        this.dropzone.on('addedfile', (file) => {
          this.zone.run(() => {
            const id = Math.random().toString(36).substring(2);
            (file as any)._customId = id;
            this.images.push({ id, file });
          });
        });

        this.dropzone.on('removedfile', (file) => {
          this.zone.run(() => {
            this.images = this.images.filter(img => img.id !== (file as any)._customId);
            if (this.featuredImageId === (file as any)._customId) this.featuredImageId = null;
          });
        });
      }
    });
  }

  setFeatured(id: string) {
    this.featuredImageId = id;
  }

  isFeatured(id: string): boolean {
    return this.featuredImageId === id;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadAllVarients() {
    this.productVarientService.getAllColors().subscribe((data: any) => {
      this.colors = data;
    });
    this.productVarientService.getAllSizes().subscribe((data: any) => {
      this.sizes = data;
    });
  }

  closePopup() {
    this.popupService.closePopup('addProductPopup');
  }
}
