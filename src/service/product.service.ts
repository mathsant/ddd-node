import { Product } from "../entity/product";

export class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product: Product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });

    return products;
  }
}
