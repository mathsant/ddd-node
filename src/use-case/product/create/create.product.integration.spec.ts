import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

describe("create product use case integration test", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const input: InputCreateProductDto = {
      name: "Sabão",
      price: 10,
    };

    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    const resultExpected: OutputCreateProductDto = {
      id: expect.any(String),
      name: "Sabão",
      price: 10,
    };

    expect(output).toStrictEqual(resultExpected);
  });
});
