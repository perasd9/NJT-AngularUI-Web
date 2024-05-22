import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, StompHeaders } from '@stomp/stompjs';
import { BehaviorSubject, catchError } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient!: Client;
  private notificationSubject = new BehaviorSubject<string>('');
  public notifications = this.notificationSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('CONNECTED' + JSON.parse(localStorage.getItem('user')!).role);
    const socket = new SockJS('http://127.0.0.1:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      connectHeaders: {
        cookie: `${JSON.parse(localStorage.getItem('user')!).role}`,
      },
    });

    this.stompClient.onConnect = () => {
      document.cookie = `${JSON.parse(localStorage.getItem('user')!).role}`;

      console.log('CONNECTED');
      this.stompClient.subscribe('/user/topic/notifications', (message) => {
        this.notificationSubject.next(message.body);
      });
    };
    this.stompClient.activate();
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
}
