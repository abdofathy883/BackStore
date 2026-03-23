import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api-service/api.service';
import { ICreate_UpdateSize, ISize } from '../interfaces/i-size';
import { IColor } from '../interfaces/i-color';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private endpoint = 'size';
  constructor(private api: ApiService) {}

  // Sizes Related Methods
  getAll(): Observable<ISize[]> {
    return this.api.get<ISize[]>(`${this.endpoint}`);
  }

  getById(id: number): Observable<ISize> {
    return this.api.get<ISize>(`${this.endpoint}/${id}`);
  }

  create(size: ICreate_UpdateSize): Observable<ISize> {
    return this.api.post<ISize>(`${this.endpoint}`, size);
  }

  update(size: ICreate_UpdateSize): Observable<ISize> {
    return this.api.put<ISize>(`${this.endpoint}/update-size`, size);
  }

  delete(id: number) {
    return this.api.delete(`${this.endpoint}/permanent-delete-size/${id}`);
  }

  toggleVisibility(id: number) {
    return this.api.patch(`${this.endpoint}/${id}`, null);
  }
}
