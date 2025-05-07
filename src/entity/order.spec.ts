import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Id is required.");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrow("CustomerID is required.");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("1", "123", []);
    }).toThrow("Items are required.");
  });

  it("should throw error if the item qty is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 10, "Product 1", 0);
      new Order("Order1", "123", [item]);
    }).toThrow("Quantity must be greater than 0.");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 10, "Product 1", 2);
    const order = new Order("Order1", "123", [item]);

    let total = order.total();

    expect(total).toBe(20);

    const item2 = new OrderItem("2", "Item 2", 20, "Product 2", 2);
    const order2 = new Order("Order2", "123", [item, item2]);

    total = order2.total();

    expect(total).toBe(60);
  });
});
