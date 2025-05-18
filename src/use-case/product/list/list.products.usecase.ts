import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { OutputListAllProducts, ProductDto } from "./list.products.dto";

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<OutputListAllProducts> {
    const products = await this.productRepository.findAll();

    const productsMapped = products.map((product: Product) => {
      const productMapped: ProductDto = {
        id: product.id,
        name: product.name,
        price: product.price,
      };

      return productMapped;
    });

    return { products: productsMapped };
  }
}
