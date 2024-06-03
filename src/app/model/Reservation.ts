import { Hall } from './Hall';
import { Purpose } from './Purpose';
import { ReservationStatus } from './ReservationStatus';
import { User } from './User';

export class Reservation {
  id: number;
  svrha: Purpose;
  svrhaId?: number;
  razlogOdjave?: string;
  sale?: Hall[];
  statusRezervacije?: ReservationStatus;
  statusRezervacijeId?: number;
  user?: User;
  userId?: number;
  vremeDatum?: Date;

  constructor(
    id: number,
    svrha: Purpose,
    svrhaId?: number,
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
    this.svrhaId = svrhaId;
    this.statusRezervacije = statusRezervacije;
    this.statusRezervacijeId = statusRezervacijeId;
    this.user = user;
    this.userId = userId;
    this.vremeDatum = vremeDatum ? new Date(vremeDatum) : undefined;
    this.svrha = svrha;
    this.razlogOdjave = razlogOdjave;
  }
}
