import { v4 as uuid } from "uuid";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { Customer } from "../../customer/entity/customer";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length <= 0) throw new Error("Order must have at least one item");

    const order = new Order(uuid(), customer.id, items);

    const newCustomerRewardValue: number = order.total() / 2;

    customer.addRewardPoints(newCustomerRewardValue);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
