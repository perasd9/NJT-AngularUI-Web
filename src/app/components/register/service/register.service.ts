import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../model/User';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http
      .post<any>(
        `http://localhost:8080/api/v1/auth/register`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
        },
        { observe: 'response' }
      )
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
