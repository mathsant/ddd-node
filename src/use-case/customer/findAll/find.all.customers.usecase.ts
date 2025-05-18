import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import {
  CustomerDto,
  OutputFindAllCustomersDto,
} from "./find.all.customers.dto";

export class FindAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(): Promise<OutputFindAllCustomersDto> {
    const customers = await this.customerRepository.findAll();

    const customersMapped = customers.map((customer: Customer) => {
      const customerMapped: CustomerDto = {
        id: customer.id,
        name: customer.name,
        address: {
          city: customer.address.city,
          number: customer.address.number,
          street: customer.address.street,
          zip: customer.address.zip,
        },
      };

      return customerMapped;
    });

    const result: OutputFindAllCustomersDto = { customers: customersMapped };

    return result;
  }
}
