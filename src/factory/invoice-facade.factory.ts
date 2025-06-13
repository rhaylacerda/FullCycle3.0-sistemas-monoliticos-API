import { InvoiceFacade } from "../facade/invoice.facade";
import { GenerateInvoiceUseCase } from "../usecase/generate-invoice/generate-invoice.usecase";
import { FindInvoiceUseCase } from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceRepositoryMemory from "../infra/db/invoice-repository.memory";

export class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    const repo = new InvoiceRepositoryMemory();
    const generate = new GenerateInvoiceUseCase(repo);
    const find = new FindInvoiceUseCase(repo);

    return new InvoiceFacade(generate, find);
  }
}
