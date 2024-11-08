import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private loggedIn = false;

  isLogged() {
    return this.loggedIn;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn = true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn = false;
  }
}
