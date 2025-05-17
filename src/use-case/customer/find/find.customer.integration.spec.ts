import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("find customer use case test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer by id", async () => {
    const customer = new Customer("123", "Matheus");
    const address = new Address("Rua da paz", 100, "0000-000", "Manhu");
    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();

    await customerRepository.create(customer);

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
});
