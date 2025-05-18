import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) throw new Error("Product not found");

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    const output: OutputUpdateProductDto = {
      id: input.id,
      name: input.name,
      price: input.price,
    };

    return output;
  }
}
