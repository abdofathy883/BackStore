import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ApiService } from '../../../shared/api-service/api.service';
import {
  IAuthResponse,
  ILogin,
  IRegister,
  ITokenPayload,
  IUser,
} from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'user_Id';
  constructor(
    private router: Router,
    private api: ApiService,
  ) {
    this.initializeAuthState();
  }

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this.loggedInSubject.asObservable();

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const userId = this.getStoredUserId();

    if (token && userId && this.isTokenValid(token)) {
      this.loggedInSubject.next(true);
    } else {
      this.clearAuthState();
    }
  }

  hasRole(role: string): Observable<boolean> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return new Observable((observer) => observer.next(false));
    }

    return this.getById(userId).pipe(
      map((user) => user.roles.includes(role)),
      catchError(
        () => new Observable<boolean>((observer) => observer.next(false)),
      ),
    );
  }

  isAdmin(): Observable<boolean> {
    return this.hasRole('Admin');
  }

  isSuperAdmin(): Observable<boolean> {
    return this.hasRole('SuperAdmin');
  }
  isCashier(): Observable<boolean> {
    return this.hasRole('Cashier');
  }
  isManager(): Observable<boolean> {
    return this.hasRole('Manager');
  }

  login(login: ILogin): Observable<IAuthResponse> {
    return this.api.post<IAuthResponse>(`${this.endpoint}/login`, login).pipe(
      tap((response) => this.handleSuccessfulAuth(response)),
      catchError(this.handleError),
    );
  }

  register(register: IRegister): Observable<IAuthResponse> {
    return this.api
      .post<IAuthResponse>(`${this.endpoint}/register`, register)
      .pipe(
        tap((response) => this.handleSuccessfulAuth(response)),
        catchError(this.handleError),
      );
  }

  logout(): void {
    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  getById(userId: string): Observable<IUser> {
    return this.api.get<IUser>(`${this.endpoint}/${userId}`);
  }

  toggleVisibility(userId: string): Observable<void> {
    return this.api
      .delete<void>(`${this.endpoint}/delete-user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // UpdateUserById(updatedUser: UpdateUser): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/update-user`, updatedUser)
  //   // .pipe(
  //   //   tap(response => this.handleSuccessfulAuth(response)),
  //   //   catchError(this.handleError)
  //   // );
  // }

  getAll(): Observable<IUser[]> {
    return this.api.get<IUser[]>(`${this.endpoint}`)
      .pipe(catchError(this.handleError));
  }

  deleteById(userId: string): Observable<void> {
    return this.api
      .delete<void>(`${this.endpoint}/permanent-delete-user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getAuthorizationToken(): string | null {
    return this.getStoredToken();
  }

  getCurrentUserId(): string {
    let userId = localStorage.getItem('user_Id');
    if (!userId) {
      return '';
    }
    return userId;
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const userId = this.getCurrentUserId();
    return token !== null && userId != '' && this.isTokenValid(token);
  }

  private handleSuccessfulAuth(user: IAuthResponse): void {
    if (user.token) {
      this.storeToken(user.token);
      this.storeUserId(user.id);
      if (user.refreshToken) {
        this.storeRefreshToken(user.refreshToken);
      }
      this.setCurrentStatus(user);
    }
  }

  private setCurrentStatus(user: IAuthResponse): void {
    this.currentUserSubject.next(user);
    this.loggedInSubject.next(true);
  }

  private clearAuthState(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  private storeUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getStoredUserId(): string {
    let userId = localStorage.getItem(this.userIdKey);
    return userId || '';
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): ITokenPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    console.log('error: ', error);
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          this.logout();
          break;
        case 403:
          errorMessage = 'Access denied';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = error.error?.message || `Error Code: ${error.status}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  };
}
