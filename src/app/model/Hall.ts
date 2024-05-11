import { HallStatus } from './HallStatus';
import { HallType } from './HallType';

export class Hall {
  salaId: number;
  naziv: string;
  brojMesta: number;
  napomena: string;
  brojRacunara?: number;
  statusSaleId?: number;
  statusSale?: HallStatus;
  tipSaleId?: number;
  tipSale?: HallType;

  constructor(
    salaId: number,
    naziv: string,
    brojMesta: number,
    napomena: string,
    brojRacunara?: number,
    statusSaleId?: number,
    statusSale?: HallStatus,
    tipSaleId?: number,
    tipSale?: HallType
  ) {
    this.salaId = salaId;
    this.naziv = naziv;
    this.napomena = napomena;
    this.brojMesta = brojMesta;
    this.brojRacunara = brojRacunara;
    this.statusSaleId = statusSaleId;
    this.statusSale = statusSale;
    this.tipSale = tipSale;
    this.tipSaleId = tipSaleId;
  }
}
