import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class LogWhenCustomerChangedAddress
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${JSON.stringify(event.eventData.address)}`
    );
  }
}
