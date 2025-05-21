import express, { Request, Response } from "express";
import { ListProductsUseCase } from "../../../use-case/product/list/list.products.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";
import { OutputListAllProducts } from "../../../use-case/product/list/list.products.dto";
import { CreateProductUseCase } from "../../../use-case/product/create/create.product.usecase";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "../../../use-case/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductsUseCase(new ProductRepository());

  try {
    const output: OutputListAllProducts = await usecase.execute();
    res.status(200).send(output);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const input: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output: OutputCreateProductDto = await usecase.execute(input);
    res.status(200).send(output);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
