import { Product } from "../../../domain/product/entity/product";
import { ListProductsUseCase } from "./list.products.usecase";

const product1 = new Product("123", "Sabão", 10);
const product2 = new Product("456", "Arroz", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("list products unit test", () => {
  it("should return all products", async () => {
    const productRepository = MockRepository();

    const usecase = new ListProductsUseCase(productRepository);

    const sut = await usecase.execute();

    expect(sut.products).toHaveLength(2);

    expect(sut.products[0].id).toEqual("123");
    expect(sut.products[0].name).toEqual("Sabão");
    expect(sut.products[0].price).toEqual(10);

    expect(sut.products[1].id).toEqual("456");
    expect(sut.products[1].name).toEqual("Arroz");
    expect(sut.products[1].price).toEqual(20);
  });
});
