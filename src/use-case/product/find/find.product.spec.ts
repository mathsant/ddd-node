import { Product } from "../../../domain/product/entity/product";
import { InputFindOneProductDto } from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "Sabão", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("find product unit test", () => {
  it("should return a product", async () => {
    const productRepository = MockRepository();

    const input: InputFindOneProductDto = { id: "123" };

    const usecase = new FindProductUseCase(productRepository);

    const sut = await usecase.execute(input);

    expect(sut.id).toEqual("123");
    expect(sut.name).toEqual("Sabão");
    expect(sut.price).toEqual(10);
  });

  it("should throw an error when product not exists", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const input: InputFindOneProductDto = { id: "@@@" };

    const usecase = new FindProductUseCase(productRepository);

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
