export class Purpose {
  type?: string;
  id: number;

  naziv?: string;
  predmet?: string;
  tipspita?: string;
  tip_nastave?: string;

  constructor(
    id: number,
    naziv?: string,
    predmet?: string,
    tipspita?: string,
    tip_nastave?: string
  ) {
    this.id = id;
    this.naziv = naziv;
    this.predmet = predmet;
    this.tipspita = tipspita;
    this.tip_nastave = tip_nastave;
  }
}
