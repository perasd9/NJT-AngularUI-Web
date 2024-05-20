import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  constructor() {}

  setUser(user: any) {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.user.role === 'admin';
  }

  isUser(): boolean {
    return this.isLoggedIn() && this.user.role !== 'admin';
  }
}
