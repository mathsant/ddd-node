import { Customer } from "../../entity/customer";
import { Address } from "../../value-object/address";
import { EventDispatcher } from "../@shared/event-dispatcher";
import { ProductCreatedEvent } from "../product/product-created.event";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { CustomerCreatedEvent } from "./customer-created.event";
import { LogWhenCustomerChangedAddress } from "./handler/log-when-customer-changed-address";
import { LogWhenCustomerIsCreated1 } from "./handler/log-when-customer-is-created-1";
import { LogWhenCustomerIsCreated2 } from "./handler/log-when-customer-is-created-2";

const CUSTOMER_CREATED_EVENT_NAME: string = "CustomerCreatedEvent";
const CUSTOMER_CHANGED_ADDRESS_EVENT_NAME: string =
  "CustomerAddressChangedEvent";

describe("Domain customer events test", () => {
  it("should notify when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new LogWhenCustomerIsCreated1();
    const eventHandler2 = new LogWhenCustomerIsCreated2();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register(CUSTOMER_CREATED_EVENT_NAME, eventHandler1);
    eventDispatcher.register(CUSTOMER_CREATED_EVENT_NAME, eventHandler2);

    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT_NAME][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT_NAME][1]
    ).toMatchObject(eventHandler2);

    const customer = new Customer("123", "Name 1");

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT_NAME]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT_NAME].length
    ).toBe(0);
  });

  it("should notify when customer change the address", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new LogWhenCustomerChangedAddress();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(CUSTOMER_CHANGED_ADDRESS_EVENT_NAME, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CHANGED_ADDRESS_EVENT_NAME][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("123", "Name 1");
    const customerNewAddress = new Address("Street 1", 10, "00000-000", "BH");
    customer.changeAddress(customerNewAddress);

    const customerChangedAddressEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address,
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();

    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CHANGED_ADDRESS_EVENT_NAME]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CHANGED_ADDRESS_EVENT_NAME]
        .length
    ).toBe(0);
  });
});
