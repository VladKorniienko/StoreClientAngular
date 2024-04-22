export class Product {
  constructor(
    public id: string,
    public name: string,
    public priceUSD: number,
    public genreName: string,
    public categoryName: string,
    public description: string,
    public icon: string,
    public screenshots: Array<string>
  ) {}
}
