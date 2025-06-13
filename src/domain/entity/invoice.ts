import Address from "../value-object/address";
import InvoiceItem from "./invoice-item";

export default class Invoice {
  public readonly id: string;
  public readonly name: string;
  public readonly document: string;
  public readonly address: Address;
  public readonly items: InvoiceItem[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    name: string,
    document: string,
    address: Address,
    items: InvoiceItem[],
  ) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.address = address;
    this.items = items;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
