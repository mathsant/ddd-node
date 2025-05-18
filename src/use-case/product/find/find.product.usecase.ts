import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputFindOneProductDto,
  OutputFindOneProductDto,
} from "./find.product.dto";

export class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(
    input: InputFindOneProductDto
  ): Promise<OutputFindOneProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) throw new Error("Product not found");

    const output: OutputFindOneProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    return output;
  }
}
