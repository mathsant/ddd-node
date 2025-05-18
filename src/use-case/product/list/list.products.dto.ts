export interface ProductDto {
  id: string;
  name: string;
  price: number;
}

export interface OutputListAllProducts {
  products: ProductDto[];
}
