import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "Matheus");
const address = new Address("Rua da paz", 100, "0000-000", "Manhu");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test find customer use case", () => {
  it("should find a customer by id", async () => {
    const customerRepository = MockRepository();

    const input: InputFindCustomerDto = { id: customer.id };

    const usecase = new FindCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    const resultExpected: OutputFindCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zip,
      },
    };

    expect(output).toStrictEqual(resultExpected);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = { id: "123" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
