import { OrderItem } from "./order_item";

describe("Order Item unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new OrderItem("", "OI1", 10, "123", 2);
    }).toThrow("Id is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new OrderItem("1", "", 10, "123", 2);
    }).toThrow("Name is required.");
  });

  it("should throw error when price is not greater than zero", () => {
    expect(() => {
      new OrderItem("1", "OI1", 0, "123", 2);
    }).toThrow("Price must be greater than 0.");
  });

  it("should throw error when product id is empty", () => {
    expect(() => {
      new OrderItem("1", "OI1", 25, "", 2);
    }).toThrow("ProductID is required.");
  });

  it("should get the order item total price", () => {
    const orderItem = new OrderItem("ID1", "Name1", 23, "PI1", 2);

    const orderItemTotalValue = orderItem.orderItemTotal();

    expect(orderItemTotalValue).toBe(46);
  });
});
