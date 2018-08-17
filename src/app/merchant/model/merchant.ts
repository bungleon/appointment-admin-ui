export class Merchant {
  constructor(
    public id: number,
    public apiKey: string,
    public name: string,
    public ipnUrl: string,
    public workingRange,
    public enabled: boolean,
    public updated: string,
    public created: string
  ) {}
}


export class MerchantList {
  constructor(
    public code: number,
    public message: string,
    public merchantList: Array<Merchant>
  ) {}
}
