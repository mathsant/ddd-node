import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const productId: string = uuidv4();

    const newProduct = new Product(productId, input.name, input.price);

    await this.productRepository.create(newProduct);

    const response: OutputCreateProductDto = {
      id: productId,
      name: newProduct.name,
      price: newProduct.price,
    };

    return response;
  }
}
