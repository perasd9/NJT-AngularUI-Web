import { HallStatus } from './HallStatus';
import { HallType } from './HallType';

export class Hall {
  id: number;
  naziv: string;
  brojMesta: number;
  napomena: string;
  brojRacunara?: number;
  statusSaleId?: number;
  statusSale?: HallStatus;
  tipSaleId?: number;
  tipSale?: HallType;

  constructor(
    id: number,
    naziv: string,
    brojMesta: number,
    napomena: string,
    brojRacunara?: number,
    statusSaleId?: number,
    statusSale?: HallStatus,
    tipSaleId?: number,
    tipSale?: HallType
  ) {
    this.id = id;
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
