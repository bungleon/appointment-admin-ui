export class User {
  constructor(
    public id: string,
    public email: string,
    public role: string,
    public firstName: string,
    public lastName: string,
    public enabled: boolean,
    public whoCreatedId: string,
    public created: string,
    public updated: string
  ) {
  }
}

export class UserList {
  constructor(
    public code: number,
    public message: string,
    public users: Array<User>
  ) {
  }
}
