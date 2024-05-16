import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hall } from '../../../model/Hall';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  constructor(private http: HttpClient) {}

  getHalls() {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/sala`, {
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

  getActiveHalls() {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/sala/active`, {
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

  getHallsByName(name: string) {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/sala/search?naziv=${name}`, {
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

  getHallTypes() {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/tipsale`, {
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

  getHallStatuses() {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/statussale`, {
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

  addHall(hall: Hall) {
    return this.http
      .post<any>(`http://localhost:8080/api/v1/sala`, hall, {
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

  updateHall(hall: Hall) {
    return this.http
      .put(`http://localhost:8080/api/v1/sala`, hall, {
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

  deleteHall(id: number) {
    return this.http
      .delete<any>(`http://localhost:8080/api/v1/sala`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        body: id,
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
