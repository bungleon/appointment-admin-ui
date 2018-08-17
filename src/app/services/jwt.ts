export class Jwt {
  constructor (
    public roles: string,
    public name: string,
    public userId: string,
    public ip: string
  ) {}
}
