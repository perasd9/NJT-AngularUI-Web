import { HallStatus } from './HallStatus';
import { HallType } from './HallType';

export class Hall {
  salaId: number;
  naziv: string;
  brojMesta: number;
  napomena: string;
  brojRacunara?: number;
  statusId?: number;
  status?: HallStatus;
  tipSaleId?: number;
  tipSale?: HallType;

  constructor(
    salaId: number,
    naziv: string,
    brojMesta: number,
    napomena: string,
    brojRacunara?: number,
    statusId?: number,
    status?: HallStatus,
    tipSaleId?: number,
    tipSale?: HallType
  ) {
    this.salaId = salaId;
    this.naziv = naziv;
    this.napomena = napomena;
    this.brojMesta = brojMesta;
    this.brojRacunara = brojRacunara;
    this.statusId = statusId;
    this.status = status;
    this.tipSale = tipSale;
    this.tipSaleId = tipSaleId;
  }
}
