import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { Address } from "../../../../domain/customer/value-object/address";
import { Product } from "../../../../domain/product/entity/product";

import { OrderRepository } from "./order.repository";
import { OrderModel } from "./order.model";
import OrderItemModel from "./order-item.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Order } from "../../../../domain/checkout/entity/order";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should craete a new order", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "P1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should return all orders created", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "P1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const order2 = new Order("000", "123", [orderItem2]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
    await orderRepository.create(order2);

    const sut = await orderRepository.findAll();

    expect(sut.length).toEqual(2);
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "P1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("Order1ID", "123", [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const sut = await orderRepository.find(order.id);

    expect(sut.id).toEqual("Order1ID");
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "P1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("Order1ID", "123", [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const customer2 = new Customer("000", "Customer 2");
    customer2.changeAddress(address);
    await customerRepository.create(customer2);

    order.changeCustomerId("000");

    await orderRepository.update(order);

    let sut = await orderRepository.find(order.id);

    expect(sut.customerId).toEqual("000");
  });
});
