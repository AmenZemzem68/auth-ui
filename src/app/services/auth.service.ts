import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7095/api/User';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  login(userObject: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, userObject);
  }
  signUp(userObject: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObject);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken() || '';
    return jwtHelper.decodeToken(token);
  }
  getUserNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }
  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
  getEmailFromToken() {
    if (this.userPayload) return this.userPayload.email;
  }
}
