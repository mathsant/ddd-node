import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { Product } from "../../../domain/product/entity/product";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "./list.products.usecase";

describe("list products use case integration test", () => {
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

  it("should list all products", async () => {
    const product1 = new Product("123", "Sabão", 10);
    const product2 = new Product("456", "Arroz", 20);

    const productRepository = new ProductRepository();

    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductsUseCase(productRepository);

    const output = await usecase.execute();

    expect(output.products).toHaveLength(2);

    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[1].id).toEqual(product2.id);
  });
});
