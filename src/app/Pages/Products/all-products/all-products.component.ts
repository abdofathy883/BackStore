import { Component } from '@angular/core';
import { ProductService } from '../../../Services/Product/product.service';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';

@Component({
  selector: 'app-all-products',
  imports: [],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  products: any[] = [];
  constructor(private productService: ProductService,
    private popUpService: PopUpService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  openAddProductPopup() {
    this.popUpService.openPopup('addProductPopup');
  }
}
