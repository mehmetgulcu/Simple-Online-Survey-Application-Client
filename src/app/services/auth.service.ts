import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5126/api/Auth';

  constructor(private http: HttpClient) {}

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
}
