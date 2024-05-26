import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../model/User';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  changePassword(changePasswordBody: any) {
    return this.http.post<any>(
      `http://localhost:8080/api/v1/user/changePassword`,
      {
        id: (JSON.parse(localStorage.getItem('user')!) as User).id,
        currentPassword: changePasswordBody.currentPassword,
        newPassword: changePasswordBody.newPassword,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      }
    );
  }
}
