import { Product } from "../../entity/product";
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

const EVENT_NAME_DEFAULT: string = "ProductCreatedEvent";

describe("Domain events test", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(EVENT_NAME_DEFAULT, eventHandler);

    expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT].length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(EVENT_NAME_DEFAULT, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister(EVENT_NAME_DEFAULT, eventHandler);

    expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT].length).toBe(0);
  });

  it("should unregister all events", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(EVENT_NAME_DEFAULT, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT]
    ).toBeUndefined();
  });

  it("should notify all events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(EVENT_NAME_DEFAULT, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT][0]
    ).toMatchObject(eventHandler);

    const productCreated = new Product("123", "P1", 20);

    const productCreatedEvent = new ProductCreatedEvent({
      name: productCreated.name,
      price: productCreated.price,
      id: productCreated.id,
    });

    // Quando o notify for executado o sendEmailWhenProductIsCreated.handler() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    // expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT]).toBeDefined();
    // expect(eventDispatcher.getEventHandlers[EVENT_NAME_DEFAULT].length).toBe(0);
  });
});
