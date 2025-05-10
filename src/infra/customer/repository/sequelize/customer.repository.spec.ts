import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "./customer.repository";
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Product repository test", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "ZipCode1", "City1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "ZipCode1", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 10");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 10",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const sut = await customerRepository.find(customer.id);

    expect(sut).toStrictEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("RANDOM_ID");
    }).rejects.toThrow("Customer not found.");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("000", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(22);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);

    expect(customers[0].id).toBe(customer1.id);
    expect(customers[0].isActive()).toBe(true);
    expect(customers[0].rewardPoints).toBe(10);

    expect(customers[1].id).toBe(customer2.id);
    expect(customers[1].isActive()).toBe(false);
    expect(customers[1].rewardPoints).toBe(22);
  });
});
