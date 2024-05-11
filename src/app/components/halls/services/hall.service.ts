import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  constructor(private http: HttpClient) {}

  getHalls() {
    return this.http.get<any>(`http://localhost:8080/api/v1/sala`, {
      headers: new HttpHeaders({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcmExMjMiLCJleHAiOjE3MTYwNDY2NjEsImlzcyI6Ik5KVCJ9.9HTgMNDJqMpcIS2gILgXrR-jcfrN9PycOgRSO5kMreo`,
      }),
    });
  }

  getHallTypes() {
    return this.http.get<any>(`http://localhost:8080/api/v1/tipsale`, {
      headers: new HttpHeaders({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcmExMjMiLCJleHAiOjE3MTYwNDY2NjEsImlzcyI6Ik5KVCJ9.9HTgMNDJqMpcIS2gILgXrR-jcfrN9PycOgRSO5kMreo`,
      }),
    });
  }

  getHallStatuses() {
    return this.http.get<any>(`http://localhost:8080/api/v1/statussale`, {
      headers: new HttpHeaders({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcmExMjMiLCJleHAiOjE3MTYwNDY2NjEsImlzcyI6Ik5KVCJ9.9HTgMNDJqMpcIS2gILgXrR-jcfrN9PycOgRSO5kMreo`,
      }),
    });
  }
}
