import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { CategoryService } from '../../Services/Category/category.service';
import { Product } from '../../Models/Product/product';

@Component({
  selector: 'app-add-new-order',
  imports: [],
  templateUrl: './add-new-order.component.html',
  styleUrl: './add-new-order.component.css'
})



export class AddNewOrderComponent implements OnInit {
  allProducts: any[] = [
  {
    id: 1,
    name: 'منتج 1',
    price: 100,
    stock: 10,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 2,
    name: 'منتج 2',
    price: 120,
    stock: 8,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 3,
    name: 'منتج 3',
    price: 75,
    stock: 15,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 4,
    name: 'منتج 4',
    price: 90,
    stock: 5,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 5,
    name: 'منتج 5',
    price: 110,
    stock: 12,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 6,
    name: 'منتج 6',
    price: 60,
    stock: 20,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 7,
    name: 'منتج 7',
    price: 95,
    stock: 9,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 8,
    name: 'منتج 8',
    price: 130,
    stock: 7,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 9,
    name: 'منتج 9',
    price: 105,
    stock: 6,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 10,
    name: 'منتج 10',
    price: 85,
    stock: 10,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 11,
    name: 'منتج 11',
    price: 140,
    stock: 4,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 12,
    name: 'منتج 12',
    price: 115,
    stock: 11,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 13,
    name: 'منتج 13',
    price: 70,
    stock: 14,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 14,
    name: 'منتج 14',
    price: 125,
    stock: 13,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 15,
    name: 'منتج 15',
    price: 155,
    stock: 3,
    image: 'https://th.bing.com/th?id=OIF.P9CCoSGnOlv6b97E%2bOA9nQ&r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
];
  // allProducts: any[] = [];
  allCategories: any[] = [
    {
      name: 'تصنيف 1'
    },
    {
      name: 'تصنيف 2'
    },
    {
      name: 'تصنيف 3'
    },
    {
      name: 'تصنيف 4'
    },
    {
      name: 'تصنيف 5'
    },
    {
      name: 'تصنيف 6'
    },
    {
      name: 'تصنيف 7'
    },
    {
      name: 'تصنيف 8'
    }
  ];
  cartProducts: any[] = [];
  productQuantity: number = 1;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadAllCategories() {
    // this.categoryService.getAllCategories().subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.error('Error fetching categories:', error);
    //   }
    // );
  }

  quantityIncrease() {
    this.productQuantity++;
  }
  quantityDecrease() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  addToCartTable(product: any) {
    const existingProduct = this.cartProducts.find(p => p.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += this.productQuantity;
    } else {
      this.cartProducts.push({ ...product, quantity: this.productQuantity });
    }
    // this.productQuantity = 1; // Reset quantity after adding to cart
  }

  getTotalCartValue(): number {
    return this.cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  removeFromCart(productId: number) {
    this.cartProducts = this.cartProducts.filter(item => item.product.id !== productId);
  }
}
