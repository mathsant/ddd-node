import { Sequelize } from "sequelize-typescript";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { FindAllCustomersUseCase } from "./find.all.customers.usecase";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 1", 1, "12345", "City")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Street 2", 2, "123456", "City 2")
);

describe("Integration test for listing customer use case", () => {
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

  it("should list all customers", async () => {
    const repository = new CustomerRepository();

    await repository.create(customer1);
    await repository.create(customer2);

    const useCase = new FindAllCustomersUseCase(repository);

    const output = await useCase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
