import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { Address } from "../value-object/address";

export class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();

    this._id = id;
    this._name = name;

    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    if (this.id.length === 0)
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });

    if (this._name.length <= 3)
      this.notification.addError({
        context: "customer",
        message: "Name is invalid",
      });
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined)
      throw new Error("Address is mandatory to activate a customer");
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
