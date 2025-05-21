import request from "supertest";
import { app, sequelize } from "../express";
import { InputCreateCustomerDto } from "../../../use-case/customer/create/create.customer.dto";

describe("e2e test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerToCreate: InputCreateCustomerDto = {
      name: "Matheus",
      address: {
        street: "Street",
        city: "City",
        number: 100,
        zip: "12345",
      },
    };

    const response = await request(app)
      .post("/customer")
      .send(customerToCreate);

    expect(response.status).toBe(200);

    expect(response.body.name).toBe(customerToCreate.name);
    expect(response.body.address.city).toBe(customerToCreate.address.city);
    expect(response.body.address.street).toBe(customerToCreate.address.street);
    expect(response.body.address.number).toBe(customerToCreate.address.number);
    expect(response.body.address.zip).toBe(customerToCreate.address.zip);
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({ name: "Matheus" });

    expect(response.status).toBe(500);
  });

  it("should list all customer", async () => {
    const customerToCreate: InputCreateCustomerDto = {
      name: "Matheus",
      address: {
        street: "Street",
        city: "City",
        number: 100,
        zip: "12345",
      },
    };

    const secondCustomerToCreate: InputCreateCustomerDto = {
      name: "João",
      address: {
        street: "Street 2",
        city: "City 2",
        number: 101,
        zip: "123456",
      },
    };

    const response = await request(app)
      .post("/customer")
      .send(customerToCreate);

    const secondResponse = await request(app)
      .post("/customer")
      .send(secondCustomerToCreate);

    expect(response.status).toBe(200);
    expect(secondResponse.status).toBe(200);

    const listAllResponse = await request(app).get("/customer").send();

    expect(listAllResponse.status).toBe(200);
    expect(listAllResponse.body.customers.length).toBe(2);

    const firstCustomer = listAllResponse.body.customers[0];
    expect(firstCustomer.name).toEqual("Matheus");

    const secondCustomer = listAllResponse.body.customers[1];
    expect(secondCustomer.name).toEqual("João");
  });
});
