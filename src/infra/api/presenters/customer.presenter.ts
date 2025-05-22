import { toXML } from "jstoxml";
import { OutputFindAllCustomersDto } from "../../../use-case/customer/findAll/find.all.customers.dto";

export class CustomerPresenter {
  static listXML(data: OutputFindAllCustomersDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    const result = toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOption
    );

    return result;
  }
}
