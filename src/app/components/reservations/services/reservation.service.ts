import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Reservation } from '../../../model/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getReservations(date: Date): Observable<Reservation[]> {
    date.setHours(date.getHours() + 2);
    const formattedDate = `${date.toISOString().slice(0, 10)} ${date
      .toISOString()
      .slice(11, 16)}`;

    return this.http
      .get<Reservation[]>(
        `http://localhost:8080/api/v1/rezervacija?date=${formattedDate}`,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }),
          observe: 'response',
        }
      )
      .pipe(
        map((reservations: HttpResponse<Reservation[]>) => {
          return reservations.body!.map((reservation: Reservation) => {
            reservation.vremeDatum = new Date(
              reservation.vremeDatum?.toString()!
            );
            return reservation;
          });
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  getReservationsRequests(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(
        `http://localhost:8080/api/v1/rezervacija/naCekanju`,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }),
          observe: 'response',
        }
      )
      .pipe(
        map((reservations: HttpResponse<Reservation[]>) => {
          return reservations.body!.map((reservation: Reservation) => {
            reservation.vremeDatum = new Date(
              reservation.vremeDatum?.toString()!
            );
            return reservation;
          });
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  sendReservationRequest(reservation: Reservation) {
    return this.http
      .post<any>(
        `http://localhost:8080/api/v1/rezervacija/kreiraj`,
        reservation,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }),
          observe: 'response',
        }
      )
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
