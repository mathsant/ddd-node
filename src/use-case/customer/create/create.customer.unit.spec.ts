import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";
import { CreateCustomerUseCase } from "./create.customer.usecase";

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

describe("create customer unit test", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();

    const output: OutputCreateCustomerDto = {
      id: expect.any(String),
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    };

    customerRepository.create.mockImplementation(() => {
      output;
    });

    const usecase = new CreateCustomerUseCase(customerRepository);

    const input: InputCreateCustomerDto = {
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();

    const usecase = new CreateCustomerUseCase(customerRepository);

    const input: InputCreateCustomerDto = {
      name: "",
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is invalid");
  });
});
