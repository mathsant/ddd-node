import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import { RepositoryInterface } from "../../domain/repository/repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    const orderItemsMapped = entity.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: orderItemsMapped,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found.");
    }

    const newItemsMapped = orderModel.items.map((item) => {
      const itemOrder = new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );

      return itemOrder;
    });

    const order = new Order(id, orderModel.customer_id, newItemsMapped);

    return order;
  }

  async findAll(): Promise<Order[]> {
    let allOrdersMapped: Order[] = [];

    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    orders.map((order) => {
      const itemsMapped = order.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });

      const orderMapped = new Order(order.id, order.customer_id, itemsMapped);

      allOrdersMapped.push(orderMapped);
    });

    return allOrdersMapped;
  }
}
