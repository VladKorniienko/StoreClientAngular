import { Category } from '../Category/category';
import { Genre } from '../Genre/genre';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public priceUSD: number,
    public genre: Genre,
    public category: Category,
    public description: string,
    public icon: string,
    public screenshots: string[]
  ) {}
}
