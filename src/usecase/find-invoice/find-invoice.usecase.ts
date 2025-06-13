import InvoiceRepository from "../../domain/repository/invoice-repository.interface";

export interface FindInvoiceUseCaseInputDTO {
  id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export class FindInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    };
  }
}
