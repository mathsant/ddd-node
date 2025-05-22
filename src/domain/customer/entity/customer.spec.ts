import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Name");
    }).toThrow("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("customer: Name is required");
  });

  it("should throw error when name and are is empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("customer: Id is required,customer: Name is required");
  });

  it("should throw error when address is undefined in customer activation", () => {
    expect(() => {
      const customer = new Customer("1", "Name 1");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should change name of customer", () => {
    const customer = new Customer("123", "Matheus");

    customer.changeName("João");

    expect(customer.name).toBe("João");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "36900-000", "MG");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
