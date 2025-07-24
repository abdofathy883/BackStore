import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AddNewUser, TokenPayload, User, UserLogin } from '../../Models/Auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7027/api/authadmin';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'current_user';
  constructor(
    private http: HttpClient,
    private router: Router) { 
      this.initializeAuthState();
    }

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public readonly currentUser$ = this.currentUserSubject.asObservable();

    private loggedInSubject = new BehaviorSubject<boolean>(false);
    public readonly isLoggedIn$ = this.loggedInSubject.asObservable();

    private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    console.log('Init Auth State. Token:', token, 'User:', user);
    
    if (token && user && this.isTokenValid(token)) {
      console.log('Valid token, setting user');
      this.setCurrentStatus(user);
    } else {
      console.log('Invalid token or missing user');
      this.clearAuthState();
    }
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }
  isSuperAdmin(): boolean {
    return this.hasRole('SuperAdmin');
  }
  isCashier(): boolean {
    return this.hasRole('Cashier');
  }
  isManager(): boolean {
    return this.hasRole('Manager');
  }


  Login(login: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/admin-login`, login)
    .pipe(
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(this.handleError)
    );

  }

  AddNewUser(register: AddNewUser): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add-new-user`, register)
    .pipe(
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(this.handleError)
    );
  }

  LogOut(): void {
    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  GetUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user-by-id/${userId}`)
    .pipe(
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(this.handleError)
    );
  }

  SoftDeleteUserById(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-user/${userId}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  UpdateUserById(userId: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user/${userId}`, updatedUser)
    .pipe(
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(this.handleError)
    );
  }

  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get-all-users`)
    .pipe(
      catchError(this.handleError)
    );
  }

  PermanentDeleteUserById(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/permanent-delete-user/${userId}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAuthorizationToken(): string | null {
    return this.getStoredToken();
  }

  getCurrentUser(): User | null {
    let currentUser = this.currentUserSubject.value;
    
    // If not available, try to get from localStorage and update BehaviorSubject
    if (!currentUser) {
      const storedUser = this.getStoredUser();
      const token = this.getStoredToken();
      
      if (storedUser && token && this.isTokenValid(token)) {
        this.currentUserSubject.next(storedUser);
        this.loggedInSubject.next(true);
        return storedUser;
      }
    }
    
    return currentUser;
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    return token !== null && this.isTokenValid(token);
  }

  refreshToken(): Observable<User> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<User>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        tap(response => this.handleSuccessfulAuth(response)),
        catchError(error => {
          this.LogOut();
          return throwError(() => error);
        })
      );
  }

  private handleSuccessfulAuth(user: User): void {
    console.log('Handling successful auth:', user);
    if (user.token) {
      this.storeToken(user.token);
      console.log('Token stored from handle successful auth:', user.token);

      if (user.refreshToken) {
        this.storeRefreshToken(user.refreshToken);
        console.log('Refresh token stored from handle successful auth:', user.refreshToken);
      }
        this.setCurrentStatus(user);
    }
  }

  private setCurrentStatus(user: User): void {
    this.currentUserSubject.next(user);
    this.loggedInSubject.next(true);
    this.storeUser(user);
  }

  private clearAuthState(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.loggedInSubject.next(false);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token stored:', token);
  }

  private storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
    console.log('Refresh token stored:', refreshToken);
  }

  private storeUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getStoredUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
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

  private decodeToken(token: string): TokenPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          this.LogOut();
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
    
    console.error('AuthService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
