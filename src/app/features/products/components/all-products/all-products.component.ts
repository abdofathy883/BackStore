import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/i-product';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { ColorService } from '../../../variants/services/color.service';
import { CategoryService } from '../../../category/services/category.service';
import { SizeService } from '../../../variants/services/size.service';
import { ISize } from '../../../variants/interfaces/i-size';
import { ICategory } from '../../../category/interfaces/i-category';
import { IColor } from '../../../variants/interfaces/i-color';

@Component({
  selector: 'app-all-products',
  imports: [RouterLink, CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  products: IProduct[] = [];
  sizes: ISize[] = [];
  categories: ICategory[] = [];
  colors: IColor[] = [];
  productsLength: number = 0;
  private productService = inject(ProductService);
  private colorService = inject(ColorService);
  private categoryService = inject(CategoryService);
  private sizeService = inject(SizeService);
  private router = inject(Router);

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadColors();
    this.loadSizes();
  }

  loadProducts(){
    this.productService.getAll().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
      },
    });
  }

  loadSizes() {
    this.sizeService.getAll().subscribe({
      next: (response) => {
        this.sizes = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadColors(){
    this.colorService.getAll().subscribe({
      next: (response) => {
        this.colors = response;
        console.log(response)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response)
      },
    });
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getColorName(id: number): string {
    return this.colors.find((c) => c.id === id)?.name || 'N/A';
  }

  getSizeName(id: number): string {
    return this.sizes.find((s) => s.id === id)?.name || 'N/A';
  }
}
