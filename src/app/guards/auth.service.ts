import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable, catchError, map } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  constructor(private http: HttpClient, private toast: NgToastService) {}

  setUser(user: any) {
    this.user = user;
    if (user != null)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          imePrezime: user.imePrezime,
          role: user.role,
        })
      );
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  isAdmin(): boolean {
    return (
      this.isLoggedIn() &&
      JSON.parse(localStorage.getItem('user')!).role === 'ADMIN'
    );
  }

  isUser(): boolean {
    return (
      this.isLoggedIn() &&
      JSON.parse(localStorage.getItem('user')!).role !== 'ADMIN'
    );
  }

  getUserById() {
    return this.http
      .get<User>(`http://localhost:8080/api/v1/user/${this.user.id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
  getUsers() {
    return this.http
      .get<User[]>(`http://localhost:8080/api/v1/user?odobren=${false}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
