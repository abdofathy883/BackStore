import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api-service/api.service';
import { ICategory, ICreate_UpdateCategory } from '../interfaces/i-category';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private endPoint = 'category';
  constructor(private apiService: ApiService) { }

  getAll(): Observable<ICategory[]> {
    return this.apiService.get<ICategory[]>(`${this.endPoint}`);
  }

  getById(categoryId: string): Observable<ICategory> {
    return this.apiService.get<ICategory>(`${this.endPoint}/${categoryId}`);
  }

  create(category: ICreate_UpdateCategory): Observable<ICreate_UpdateCategory> {
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("description", category.description);
    if (category.image) {
      formData.append("image", category.image);
    }
    return this.apiService.post<ICreate_UpdateCategory>(`${this.endPoint}`, formData);
  }

  update(categoryId: string, category: ICreate_UpdateCategory): Observable<ICategory> {
    return this.apiService.put<ICategory>(`${this.endPoint}/${categoryId}`, category);
  }

  delete(categoryId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endPoint}/${categoryId}`);
  }

  toggleVisibility(categoryId: string): Observable<void> {
    return this.apiService.patch<void>(`${this.endPoint}/${categoryId}`, null);
  }
}
