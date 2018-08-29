export class Merchant {
  constructor(
    public id: string,
    public apiKey: string,
    public secretKey: string,
    public name: string,
    public ipnUrl: string,
    public workingRange: number,
    public whoCreated: string,
    public enabled: boolean,
    public updated: string,
    public created: string
  ) {
  }
}


export class MerchantList {
  constructor(
    public code: number,
    public message: string,
    public merchantList: Array<Merchant>
  ) {
  }
}
