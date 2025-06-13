import Address from "../../domain/value-object/address";
import InvoiceItem from "../../domain/entity/invoice-item";
import Invoice from "../../domain/entity/invoice";
import InvoiceRepository from "../../domain/repository/invoice-repository.interface";

export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export class GenerateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );

    const items = input.items.map(item => new InvoiceItem(item.id, item.name, item.price));

    const invoice = new Invoice(crypto.randomUUID(), input.name, input.document, address, items);

    await this.invoiceRepository.save(invoice);

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total(),
    };
  }
}
