export interface CustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export interface OutputFindAllCustomersDto {
  customers: CustomerDto[];
}
