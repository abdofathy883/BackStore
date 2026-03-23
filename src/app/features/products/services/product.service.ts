import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/api-service/api.service';
import { ICreateProduct, IProduct } from '../interfaces/i-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpoint = 'product';
  constructor(private api: ApiService) {}

  getAll(): Observable<IProduct[]> {
    return this.api.get<IProduct[]>(this.endpoint);
  }

  getById(id: number): Observable<IProduct> {
    return this.api.get<IProduct>(`${this.endpoint}/${id}`);
  }

  create(product: FormData): Observable<IProduct> {
    return this.api.post<IProduct>(this.endpoint, product);
  }

  update(id: string, product: any) {
    return this.api.put(`${this.endpoint}/${id}`, product);
  }

  delete(id: string) {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  toggleVisibility(id: string) {
    return this.api.put(`${this.endpoint}/${id}`, {});
  }

  // searchProducts(query: string) {
  //   return this.api.get(`${this.endpoint}/search?query=${query}`);
  // }
  // getProductsByCategory(category: string) {
  //   return this.api.get(`${this.endpoint}/category/${category}`);
  // }
}
