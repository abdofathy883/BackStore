import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Create_UpdateCategory } from '../../Models/Product/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7027/api/categoryadmin';
  constructor(private http: HttpClient) { }

  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/get-all-categories`);
  }

  GetCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/get-category-by-id/${categoryId}`);
  }

  AddNewCategory(category: Create_UpdateCategory): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/add-new-category`, category);
  }

  UpdateCategory(categoryId: string, category: Create_UpdateCategory): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/update-category/${categoryId}`, category);
  }

  DeleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-category-permanent/${categoryId}`);
  }

  SoftDeleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-category/${categoryId}`);
  }
}
