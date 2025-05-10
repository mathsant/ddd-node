import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    const eventFormatted = {
      id: event.eventData.id,
      name: event.eventData.name,
      price: event.eventData.price,
    };

    console.log(`Sending email of product: ${JSON.stringify(eventFormatted)}`);
  }
}
