import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { Product } from "../../../domain/product/entity/product";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import {
  InputFindOneProductDto,
  OutputFindOneProductDto,
} from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";

describe("find product use case integration test", () => {
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

  it("should find a product by id", async () => {
    const product = new Product("123", "Sabão", 10);

    const productRepository = new ProductRepository();

    await productRepository.create(product);

    const input: InputFindOneProductDto = { id: product.id };

    const usecase = new FindProductUseCase(productRepository);

    const output = await usecase.execute(input);

    const resultExpected: OutputFindOneProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    expect(output).toStrictEqual(resultExpected);
  });
});
