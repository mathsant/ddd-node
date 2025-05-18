import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

const customer = new Customer("123", "Matheus");
const address = new Address("Rua da paz", 100, "0000-000", "Manhu");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("create product unit test", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();

    const output: OutputCreateProductDto = {
      id: expect.any(String),
      price: 20,
      name: "Arroz",
    };

    productRepository.create.mockImplementation(() => {
      output;
    });

    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Arroz",
      price: 20,
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "",
      price: 20,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is 0 or minus", async () => {
    const productRepository = MockRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Arroz",
      price: -10,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
