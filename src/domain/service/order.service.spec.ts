import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order service unit test", () => {
  it("should return the total of all orders", () => {
    const orderItem1 = new OrderItem("1", "orderItem1", 20, "000", 2);
    const orderItem2 = new OrderItem("2", "orderItem2", 10, "000", 2);
    const orderItem3 = new OrderItem("3", "orderItem3", 5, "000", 2);

    const order1 = new Order("1", "123", [orderItem1]);
    const order2 = new Order("1", "123", [orderItem2]);
    const order3 = new Order("1", "123", [orderItem3]);

    const sut = OrderService.total([order1, order2, order3]);

    expect(sut).toBe(70);
  });

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer");

    const item = new OrderItem("i1", "Item", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item]);

    const rewardCustomerExpected = order.total() / 2;

    expect(customer.rewardPoints).toBe(rewardCustomerExpected);
    expect(order.total()).toBe(10);
  });

  it("should throw an error when the items of order is empty", () => {
    expect(() => {
      const customer = new Customer("c1", "Customer");

      OrderService.placeOrder(customer, []);
    }).toThrow("Order must have at least one item");
  });
});
