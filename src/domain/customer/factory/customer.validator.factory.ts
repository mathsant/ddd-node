import { Customer } from "../entity/customer";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { CustomerYupValidator } from "../validator/customer.yup.validator";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
