import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, StompHeaders } from '@stomp/stompjs';
import { BehaviorSubject, catchError } from 'rxjs';
import SockJS from 'sockjs-client';
import { User } from '../../../model/User';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient!: Client;
  private notificationSubject = new BehaviorSubject<string>('');
  public notifications = this.notificationSubject.asObservable();

  constructor(private http: HttpClient) {
    this.connect();
  }

  connect() {
    const socket = new SockJS(
      `http://127.0.0.1:8080/ws?role=${
        JSON.parse(localStorage.getItem('user')!).role
      }`
    );
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/user/topic/notifications', (message) => {
        this.notificationSubject.next(message.body);
      });
    };
    this.stompClient.activate();
  }

  disconnect() {
    this.stompClient.deactivate();
  }

  sendNotification() {
    return this.http.get<any>(
      `http://localhost:8080/api/v1/notification/sendNotification`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      }
    );
  }

  acceptUser(user: User) {
    user.type = 'Student';
    return this.http.post<any>(
      `http://localhost:8080/api/v1/user/accept`,
      user,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      }
    );
  }
  denyUser(user: User) {
    return this.http.get<any>(
      `http://localhost:8080/api/v1/user/deny/${user.id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }),
        observe: 'response',
      }
    );
  }

  decrementNotificationCount() {
    this.notificationSubject.next(' ');
  }
}
