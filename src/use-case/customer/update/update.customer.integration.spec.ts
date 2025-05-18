import { UpdateCustomerUseCase } from "./update.customer.usecase";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";

const customer = CustomerFactory.createWithAddress(
  "Matheus",
  new Address("Street", 123, "Zip", "City")
);

describe("Integration test for customer update use case", () => {
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

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    await customerRepository.create(customer);

    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: "John",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
