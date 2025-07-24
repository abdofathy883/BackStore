import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get(this.apiUrl);
  }
  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }
  updateProduct(id: string, product: any) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  searchProducts(query: string) {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
  getProductsByCategory(category: string) {
    return this.http.get(`${this.apiUrl}/category/${category}`);
  }
  
}
