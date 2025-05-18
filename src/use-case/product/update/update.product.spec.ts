import { Product } from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product("123", "Tênis", 200);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("update product unit test", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Tênis",
      price: 200,
    };

    const usecase = new UpdateProductUseCase(productRepository);

    const sut = await usecase.execute(input);

    expect(sut.id).toEqual("123");
    expect(sut.name).toEqual("Tênis");
    expect(sut.price).toEqual(200);
  });

  it("should throw an error when product not exists", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const input: InputUpdateProductDto = {
      id: "123",
      name: "Tênis",
      price: 200,
    };

    const usecase = new UpdateProductUseCase(productRepository);

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
