import request from "supertest";
import { app, sequelize } from "../express";
import { InputCreateProductDto } from "../../../use-case/product/create/create.product.dto";

describe("e2e test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productToCreate: InputCreateProductDto = {
      name: "Sabão",
      price: 10,
    };

    const secondProductToCreate: InputCreateProductDto = {
      name: "Arroz",
      price: 20,
    };

    const response = await request(app).post("/product").send(productToCreate);

    const secondResponse = await request(app)
      .post("/product")
      .send(secondProductToCreate);

    expect(response.status).toBe(200);
    expect(secondResponse.status).toBe(200);

    const listAllResponse = await request(app).get("/product").send();

    expect(listAllResponse.status).toBe(200);
    expect(listAllResponse.body.products.length).toBe(2);

    const firstProduct = listAllResponse.body.products[0];
    expect(firstProduct.name).toEqual("Sabão");

    const secondProduct = listAllResponse.body.products[1];
    expect(secondProduct.name).toEqual("Arroz");
  });
});
