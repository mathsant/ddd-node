import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../use-case/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "../../../use-case/customer/create/create.customer.dto";
import { FindAllCustomersUseCase } from "../../../use-case/customer/findAll/find.all.customers.usecase";
import { OutputFindAllCustomersDto } from "../../../use-case/customer/findAll/find.all.customers.dto";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        city: req.body.address.city,
        number: req.body.address.number,
        street: req.body.address.street,
        zip: req.body.address.zip,
      },
    };

    const output: OutputCreateCustomerDto = await usecase.execute(customerDto);

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindAllCustomersUseCase(new CustomerRepository());

  try {
    const output: OutputFindAllCustomersDto = await usecase.execute();

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
