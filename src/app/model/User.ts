export class User {
  id: number;
  username: string;
  email: string;
  imePrezime: string;
  password: string;
  odobren: boolean;
  potvrdjenMail: boolean;
  type: string;

  constructor(
    id: number,
    username: string,
    email: string,
    imePrezime: string,
    password: string,
    odobren: boolean,
    potvrdjenMail: boolean,
    type: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.imePrezime = imePrezime;
    this.password = password;
    this.odobren = odobren;
    this.potvrdjenMail = potvrdjenMail;
    this.type = type;
  }
}
