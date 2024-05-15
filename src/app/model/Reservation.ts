import { Hall } from './Hall';
import { HallStatus } from './HallStatus';
import { ReservationStatus } from './ReservationStatus';
import { User } from './User';

export class Reservation {
  id: number;
  sala?: Hall;
  salaId?: number;
  statusRezervacije?: ReservationStatus;
  statusRezervacijeId?: number;
  user?: User;
  userId?: number;
  vremeDatum?: Date;

  constructor(
    id: number,
    sala?: Hall,
    salaId?: number,
    statusRezervacije?: ReservationStatus,
    statusRezervacijeId?: number,
    user?: User,
    userId?: number,
    vremeDatum?: Date | string
  ) {
    this.id = id;
    this.sala = sala;
    this.salaId = salaId;
    this.statusRezervacije = statusRezervacije;
    this.statusRezervacijeId = statusRezervacijeId;
    this.user = user;
    this.userId = userId;
    this.vremeDatum = vremeDatum ? new Date(vremeDatum) : undefined;
  }
}
