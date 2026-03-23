import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api-service/api.service';
import { IColor, ICreate_UpdateColor } from '../interfaces/i-color';

@Injectable({
  providedIn: 'root',
})

export class ColorService {
  private endpoint = 'color';
  constructor(private api: ApiService) {}

  getAll(): Observable<IColor[]> {
    return this.api.get<IColor[]>(`${this.endpoint}`);
  }

  getById(id: number): Observable<IColor> {
    return this.api.get<IColor>(`${this.endpoint}/${id}`);
  }

  create(color: ICreate_UpdateColor): Observable<IColor> {
    return this.api.post<IColor>(`${this.endpoint}`, color);
  }

  update(color: ICreate_UpdateColor): Observable<ICreate_UpdateColor> {
    return this.api.put<IColor>(`${this.endpoint}`, color);
  }

  delet(id: number) {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  toggleVisibility(id: number) {
    return this.api.patch(`${this.endpoint}/${id}`, null);
  }
}
