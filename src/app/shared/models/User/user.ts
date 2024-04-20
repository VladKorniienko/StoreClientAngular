export class User {
  constructor(
    public id: string = '',
    public userName: string = '',
    public email: string = '',
    public role: string = '',
    public balance: number = 0) { }
}
