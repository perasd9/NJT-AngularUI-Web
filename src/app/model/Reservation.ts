import { Hall } from './Hall';
import { ReservationStatus } from './ReservationStatus';
import { User } from './User';

export class Reservation {
  id: number;
  svrha?: string;
  razlogOdjave?: string;
  sale?: Hall[];
  statusRezervacije?: ReservationStatus;
  statusRezervacijeId?: number;
  user?: User;
  userId?: number;
  vremeDatum?: Date;

  constructor(
    id: number,
    svrha?: string,
    razlogOdjave?: string,
    sale?: Hall[],
    salaId?: number,
    statusRezervacije?: ReservationStatus,
    statusRezervacijeId?: number,
    user?: User,
    userId?: number,
    vremeDatum?: Date
  ) {
    this.id = id;
    this.sale = sale;
    this.statusRezervacije = statusRezervacije;
    this.statusRezervacijeId = statusRezervacijeId;
    this.user = user;
    this.userId = userId;
    this.vremeDatum = vremeDatum ? new Date(vremeDatum) : undefined;
    this.svrha = svrha;
    this.razlogOdjave = razlogOdjave;
  }
}
