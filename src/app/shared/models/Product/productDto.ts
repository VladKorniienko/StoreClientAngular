export class Product {
  constructor(
    public id: string,
    public name: string,
    public priceUSD: number,
    public genreId: string,
    public categoryId: string,
    public description: string,
    public icon: string,
    public screenshots: Array<string>
  ) { }

}
