export class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _total: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this._total = this.orderItemTotal();

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  validate(): boolean {
    if (this._id.length === 0) throw new Error("Id is required.");

    if (this._name.length === 0) throw new Error("Name is required.");

    if (this._productId.length === 0 || this._productId === undefined)
      throw new Error("ProductID is required.");

    if (this._price <= 0) throw new Error("Price must be greater than 0.");

    return true;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
