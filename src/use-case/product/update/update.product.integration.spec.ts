import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
import { Product } from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("update product use case integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const product = new Product("123", "Arroz", 20);

    const productRepository = new ProductRepository();

    await productRepository.create(product);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Sabão",
      price: 10,
    };

    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    const resultExpected: OutputUpdateProductDto = {
      id: expect.any(String),
      name: "Sabão",
      price: 10,
    };

    expect(output).toStrictEqual(resultExpected);
  });
});
