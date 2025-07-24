import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductVarientService {
  private apiUrl = 'https://localhost:7000/api/varients';
  constructor(private http: HttpClient) {}

  // Colors Related Methods
  getAllColors(): Observable<
    { id: number; colorName: string; colorCode: string }[]
  > {
    return this.http
      .get<{ data: { id: number; colorName: string; colorCode: string }[] }>(
        `${this.apiUrl}/get-all-colors`
      )
      .pipe(map((res) => res.data));
  }

  GetColorById(
    id: number
  ): Observable<{
    id: number;
    name: string;
    colorCode: string;
    isDeleted: boolean;
  }> {
    return this.http
      .get<{
        data: {
          id: number;
          name: string;
          colorCode: string;
          isDeleted: boolean;
        };
      }>(`${this.apiUrl}/get-color-by-id/${id}`)
      .pipe(map((res) => res.data));
  }

  AddNewColor(name: string, colorCode: string) {
    return this.http.post(`${this.apiUrl}/add-new-color/`, { name, colorCode });
  }

  UpdateColor(
    id: number,
    name: string,
    colorCode: string,
    isDeleted: boolean
  ): Observable<{
    id: number;
    name: string;
    colorCode: string;
    isDeleted: boolean;
  }> {
    return this.http
      .put<{
        data: {
          id: number;
          name: string;
          colorCode: string;
          isDeleted: boolean;
        };
      }>(`${this.apiUrl}/update-color`, { id, name, colorCode })
      .pipe(map((res) => res.data));
  }

  SoftDeletColor(id: number) {
    return this.http.put(`${this.apiUrl}/delete-color`, { id });
  }

  PermanentDeleteColor(id: number) {
    return this.http.delete(`${this.apiUrl}/permanent-delete-color/${id}`);
  }

  // Sizes Related Methods
  getAllSizes(): Observable<{ id: number; name: string }[]> {
    return this.http
      .get<{ data: { id: number; name: string }[] }>(
        `${this.apiUrl}/get-all-sizes`
      )
      .pipe(map((res) => res.data));
  }

  GetSizeById(
    id: number
  ): Observable<{ id: number; name: string; isDeleted: boolean }> {
    return this.http
      .get<{ data: { id: number; name: string; isDeleted: boolean } }>(
        `${this.apiUrl}/get-size-by-id/${id}`
      )
      .pipe(map((res) => res.data));
  }

  AddNewSize(name: string) {
    return this.http.post(`${this.apiUrl}/add-new-size/`, { name });
  }

  UpdateSize(
    id: number,
    newName: string
  ): Observable<{ id: number; name: string; isDeleted: boolean }> {
    return this.http
      .put<{ data: { id: number; name: string; isDeleted: boolean } }>(
        `${this.apiUrl}/update-size`,
        { id, newName }
      )
      .pipe(map((res) => res.data));
  }

  SoftDeletSize(id: number) {
    return this.http.put(`${this.apiUrl}/delete-size`, { id });
  }

  PermanentDeleteSize(id: number) {
    return this.http.delete(`${this.apiUrl}/permanent-delete-size/${id}`);
  }
}
