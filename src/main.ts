import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order_item";
import { Address } from "./value-object/address";

let customer = new Customer("123", "Matheus");
const address = new Address("Rua da Paz", 62, "36904-278", "Manhuaçu");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("000", "Arroz", 20.0, 10);
const item2 = new OrderItem("000", "Arroz", 15.0, 10);

const order = new Order("777", "123", [item1, item2]);
